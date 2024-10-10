import React, { useState, useEffect } from "react";
import { db, auth } from "./FirebaseConfig";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, query, orderBy, onSnapshot, where, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions
import "./ChatWindow.css";

function ChatWindow() {
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [usernames, setUsernames] = useState({}); // State to store usernames for UIDs
  const navigate = useNavigate();
  const storage = getStorage(); // Initialize Firebase Storage

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        // Fetch the user role from Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          setUserRole(userSnapshot.data().role);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedConversationId) {
      const messagesRef = collection(db, "conversations", selectedConversationId, "messages");
      const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

      const unsubscribe = onSnapshot(messagesQuery, async (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          formattedTime: doc.data().timestamp ? formatTimestamp(doc.data().timestamp.toDate()) : "",
        }));
        setMessages(messagesData);

        // Fetch usernames for each senderId in the messages
        const senderIds = new Set(messagesData.map((msg) => msg.senderId));
        const newUsernames = { ...usernames };

        await Promise.all(
          Array.from(senderIds).map(async (senderId) => {
            if (!newUsernames[senderId]) {
              const userRef = doc(db, "users", senderId);
              const userSnapshot = await getDoc(userRef);
              if (userSnapshot.exists()) {
                newUsernames[senderId] = userSnapshot.data().displayName || senderId;
              }
            }
          })
        );

        setUsernames(newUsernames); // Update usernames state
      });

      return () => unsubscribe();
    }
  }, [selectedConversationId, usernames]);

  const handleSendMessage = async () => {
    if (message.trim() !== "" && user && selectedConversationId) {
      const messagesRef = collection(db, "conversations", selectedConversationId, "messages");
      await addDoc(messagesRef, {
        text: message,
        senderId: user.uid,
        senderEmail: user.email,
        timestamp: new Date(),
      });

      const conversationRef = doc(db, "conversations", selectedConversationId);
      await setDoc(
        conversationRef,
        {
          latestMessageTimestamp: new Date(), // Update timestamp in conversation document
        },
        { merge: true }
      );

      setMessage("");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${selectedConversationId}/${file.name}`);
    await uploadBytes(storageRef, file);

    // Get the URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);

    // Save the image URL to Firestore
    if (user && selectedConversationId) {
      const messagesRef = collection(db, "conversations", selectedConversationId, "messages");
      await addDoc(messagesRef, {
        text: "", // No text content since it's an image
        senderId: user.uid,
        senderEmail: user.email,
        timestamp: new Date(),
        imageUrl: downloadURL, // Store image URL in Firestore
      });

      const conversationRef = doc(db, "conversations", selectedConversationId);
      await setDoc(
        conversationRef,
        {
          latestMessageTimestamp: new Date(),
        },
        { merge: true }
      );
    }
  };

  const startConversation = async (selectedUser) => {
    const currentUser = auth.currentUser;
    if (currentUser && selectedUser) {
      if (userRole === "customer" && selectedUser.role !== "staff") {
        alert("You can only chat with staff members.");
        return;
      }

      const conversationsRef = collection(db, "conversations");
      const conversationQuery = query(conversationsRef, where("participants", "array-contains", currentUser.uid));
      const snapshot = await getDocs(conversationQuery);

      let conversationId = null;
      snapshot.forEach((doc) => {
        const participants = doc.data().participants;
        if (participants.includes(selectedUser.id)) {
          conversationId = doc.id;
        }
      });

      if (!conversationId) {
        const newConversationRef = await addDoc(conversationsRef, {
          participants: [currentUser.uid, selectedUser.id],
        });
        conversationId = newConversationRef.id;
      }

      setSelectedConversationId(conversationId);
      setSelectedUser(null);
    }
  };

  // Helper function to format the timestamp to HH:mm
  const formatTimestamp = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="chat-window">
      {/* Sidebar */}
      <Sidebar className="chat-sidebar" onSelectConversation={setSelectedConversationId} onSelectUser={startConversation} currentUserRole={userRole} />

      {/* Main Chat Window */}
      <div className="chat-content" style={{ width: "70%", padding: "20px", display: "flex", flexDirection: "column" }}>
        {/* Chat Header */}
        <div className="chat-header">
          <h3>Chat Window</h3>
          {selectedConversationId && (
            <button onClick={() => setSelectedConversationId(null)} className="chat-close-button">
              Close Conversation
            </button>
          )}
        </div>

        {/* Messages Display */}
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className="chat-message">
              <strong>{usernames[msg.senderId] || msg.senderEmail}:</strong>
              <span> {msg.text}</span>
              {msg.formattedTime && <span style={{ marginLeft: "10px", color: "#757575" }}>({msg.formattedTime})</span>}
              {/* Display image if the message contains an image URL */}
              {msg.imageUrl && <img src={msg.imageUrl} alt="Sent Image" style={{ maxWidth: "200px", marginTop: "10px" }} />}
            </div>
          ))}
        </div>

        {/* Message Input and Send Button */}
        {selectedConversationId && (
          <div className="chat-input-container">
            {/* Input for text message */}
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="chat-input"
            />

            {/* File input for image upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload" className="chat-upload-button">
              +
            </label>

            {/* Send Button */}
            <button onClick={handleSendMessage} className="chat-send-button">
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatWindow;