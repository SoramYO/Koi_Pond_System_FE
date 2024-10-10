import React, { useState, useEffect } from "react";
import { db, auth } from "./FirebaseConfig";
import { collection, query, where, onSnapshot, orderBy, getDoc, doc, limit, getDocs } from "firebase/firestore";
import UserSearch from "./UserSearch"; // Import UserSearch component

function Sidebar({ onSelectConversation, onSelectUser, currentUserRole }) {
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState(null);
  const [usernames, setUsernames] = useState({}); // State to store usernames for UIDs

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        loadConversations(user.uid); // Load conversations for the logged-in user
      }
    });
    return () => unsubscribe();
  }, []);

  const loadConversations = (userId) => {
    const conversationsRef = collection(db, "conversations");
    const q = query(
      conversationsRef,
      where("participants", "array-contains", userId),
      orderBy("latestMessageTimestamp", "desc") // Order by latest message timestamp in descending order
    );

    console.log("Loading conversations for user:", userId); // Debugging log

    onSnapshot(q, async (snapshot) => {
      if (snapshot.empty) {
        console.log("No conversations found for the current user.");
        setConversations([]); // Set empty conversations if no results found
        return;
      }

      console.log("Conversations snapshot received:", snapshot.docs.length, "documents"); // Log the number of documents

      const conversationsData = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const data = doc.data();
          let latestMessage = "";
          let latestMessageTime = "";

          // Fetch the latest message from the 'messages' subcollection
          const messagesRef = collection(db, "conversations", doc.id, "messages");
          const latestMessageQuery = query(messagesRef, orderBy("timestamp", "desc"), limit(1));
          const latestMessageSnapshot = await getDocs(latestMessageQuery);

          // Get the content of the latest message if available
          if (!latestMessageSnapshot.empty) {
            const latestMessageData = latestMessageSnapshot.docs[0].data();
            latestMessage = latestMessageData.text || "No message yet.";
            
            // Format the timestamp to HH:mm
            if (latestMessageData.timestamp) {
              const date = latestMessageData.timestamp.toDate();
              const hours = date.getHours().toString().padStart(2, "0");
              const minutes = date.getMinutes().toString().padStart(2, "0");
              latestMessageTime = `${hours}:${minutes}`;
            }
          }

          return { id: doc.id, ...data, latestMessage, latestMessageTime };
        })
      );

      setConversations(conversationsData);

      // Fetch usernames for each participant and store them in the `usernames` state
      const userUIDs = new Set();
      conversationsData.forEach((conversation) => {
        conversation.participants.forEach((participant) => {
          if (!usernames[participant]) {
            userUIDs.add(participant);
          }
        });
      });

      // Fetch user data for each unique UID
      const usernameMap = { ...usernames };
      await Promise.all(
        Array.from(userUIDs).map(async (uid) => {
          const userRef = doc(db, "users", uid);
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            usernameMap[uid] = userSnapshot.data().displayName || uid; // Store the display name or UID if no displayName is found
          }
        })
      );

      console.log("Usernames map:", usernameMap); // Log the usernames map
      setUsernames(usernameMap); // Update state with usernames
    });
  };

  return (
    <div style={{ width: "300px", borderRight: "1px solid #ccc", padding: "10px", display: "flex", flexDirection: "column" }}>
      {/* User Search on top of Sidebar */}
      <UserSearch onSelectUser={onSelectUser} currentUserRole={currentUserRole} />

      {/* Conversation List */}
      <h3>Your Conversations</h3>
      <ul style={{ listStyle: "none", padding: 0, overflowY: "scroll", flex: 1 }}>
        {conversations.map((conv) => (
          <li
            key={conv.id}
            style={{ cursor: "pointer", padding: "10px", borderBottom: "1px solid #eee" }}
            onClick={() => onSelectConversation(conv.id)}
          >
            {/* Display usernames instead of UIDs */}
            <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
              {conv.participants
                .filter((p) => p !== user?.uid) // Exclude the current user from the displayed participants
                .map((participant) => usernames[participant] || participant) // Map UIDs to usernames
                .join(", ")}
            </div>
            {/* Display latest message preview along with time */}
            <div style={{ fontSize: "small", color: "#757575" }}>
              {conv.latestMessage} {conv.latestMessageTime ? `(${conv.latestMessageTime})` : ""}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;