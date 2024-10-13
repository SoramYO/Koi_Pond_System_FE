import {
  limitToLast,
  onChildAdded,
  push,
  query,
  ref,
  serverTimestamp,
} from "firebase/database";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { db } from "./FirebaseConfig";

const ChatWindow = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const chatId = user ? `${user.id} ${user.firstName} ${user.lastName}` : null;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (user) {
      const messagesRef = ref(db, `messages/${chatId}`);
      const messagesQuery = query(messagesRef, limitToLast(20));

      const unsubscribe = onChildAdded(messagesQuery, (snapshot) => {
        const newMessage = snapshot.val();
        setMessages((prevMessages) => {
          if (!prevMessages.some((msg) => msg.id === snapshot.key)) {
            return [...prevMessages, { ...newMessage, id: snapshot.key }];
          }
          return prevMessages;
        });
        scrollToBottom();
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user, chatId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        message: inputMessage.trim(),
        sender: `${user.firstName} ${user.lastName}`,
        timestamp: serverTimestamp(),
        read: true,
      };

      try {
        await push(ref(db, `messages/${chatId}`), newMessage);
        setInputMessage("");
        scrollToBottom();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const renderMessage = (msg) => {
    if (msg.message.startsWith("https://")) {
      return (
        <a href={msg.message} target="_blank" rel="noopener noreferrer">
          {msg.message.includes(".jpg") || msg.message.includes(".png")
            ? "View Image"
            : "Download File"}
        </a>
      );
    }
    return msg.message;
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg mb-4">Please login to chat.</p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-2"
        >
          Login
        </button>
        <p className="text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-500 underline"
          >
            Sign up now
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto bg-gray-100 p-4"
        style={{ maxHeight: "100%" }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 rounded-lg shadow-sm transition-all duration-200 mb-2 ${
              msg.sender === "System"
                ? "bg-red-200 text-red-800"
                : msg.sender === `${user.firstName} ${user.lastName}`
                ? "bg-blue-200 text-blue-800 self-end"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            <span className="font-semibold">{msg.sender}</span>
            <div className="mt-1">{renderMessage(msg)}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={sendMessage}
        className="flex items-center p-4 bg-white border-t border-gray-300"
        style={{ flexShrink: 0 }}
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
