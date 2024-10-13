import {
  getDatabase,
  onValue,
  push,
  ref,
  serverTimestamp,
  update,
} from "firebase/database";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../context/authContext";

const StaffChat = () => {
  const { user } = useContext(AuthContext);
  const [activeChats, setActiveChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatActive, setIsChatActive] = useState(true);
  const [unreadCounts, setUnreadCounts] = useState({});
  const db = getDatabase();
  const messagesEndRef = useRef(null);
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (location.state && location.state.openChatId) {
      setCurrentChat(location.state.openChatId);
      setIsChatActive(true);
    }
  }, [location]);

  useEffect(() => {
    const chatsRef = ref(db, "messages");

    const unsubscribe = onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      const newUnreadCounts = {};
      const chatsArray = [];

      if (data) {
        Object.entries(data).forEach(([chatId, chatData]) => {
          const chat = { chatId, ...chatData };
          chatsArray.push(chat);

          const unreadCount = Object.values(chatData).filter(
            (msg) =>
              msg.read === true &&
              msg.sender !== `${user.firstName} ${user.lastName}`
          ).length;
          newUnreadCounts[chatId] = unreadCount;
        });
      }

      setActiveChats(chatsArray);
      setUnreadCounts(newUnreadCounts);
    });

    return () => unsubscribe();
  }, [db, user]);

  useEffect(() => {
    if (currentChat) {
      const messagesRef = ref(db, `messages/${currentChat}`);

      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messagesArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setMessages(messagesArray);

          const updates = {};
          messagesArray.forEach((message) => {
            if (
              message.read === true &&
              message.sender !== `${user.firstName} ${user.lastName}`
            ) {
              updates[`${message.id}/read`] = false;
            }
          });
          if (Object.keys(updates).length > 0) {
            update(messagesRef, updates);
          }

          const unreadCount = messagesArray.filter(
            (msg) =>
              msg.read === true &&
              msg.sender !== `${user.firstName} ${user.lastName}`
          ).length;
          setUnreadCounts((prevCounts) => ({
            ...prevCounts,
            [currentChat]: unreadCount,
          }));
        }
      });

      return () => unsubscribe();
    }
  }, [currentChat, db, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentChat]);

  const joinChat = (chatId) => {
    setCurrentChat(chatId);
    setIsChatActive(true);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && currentChat && isChatActive) {
      const newMessage = {
        message: inputMessage,
        sender: `${user.firstName} ${user.lastName}`,
        timestamp: serverTimestamp(),
        read: false,
      };
      push(ref(db, `messages/${currentChat}`), newMessage);
      setInputMessage("");
    }
  };

  const renderMessage = (msg) => {
    if (msg.message.startsWith("https://firebasestorage.googleapis.com")) {
      const fileName = msg.message
        .split("/")
        .pop()
        .split("?")[0]
        .split("%2F")
        .pop()
        .split("%20")
        .join(" ")
        .split("%3A")
        .join(":");
      return (
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon="fa-solid fa-file" />
          <div className="flex flex-col">
            <span className="font-semibold">{fileName}</span>
            <a
              href={msg.message}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View
            </a>
          </div>
        </div>
      );
    } else {
      return <p>{msg.message}</p>;
    }
  };

  return (
    <div className="flex h-[80vh] font-sans">
      <div className="w-[300px] border-r border-gray-300 p-5 bg-gray-200">
        <h3 className="text-lg font-bold mb-4">Active Chats</h3>
        <div className="flex flex-col">
          {activeChats.map((chat) => (
            <button
              key={chat.chatId}
              onClick={() => joinChat(chat.chatId)}
              className="flex justify-between items-center p-2 mb-2 bg-white border border-gray-300 rounded hover:bg-gray-300 transition"
            >
              <span className="font-semibold">{chat.chatId}</span>
              {unreadCounts[chat.chatId] > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 text-xs">
                  {unreadCounts[chat.chatId]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {currentChat && (
        <div className="flex-grow flex flex-col p-5">
          <h3 className="text-lg font-bold mb-4">Chat with {currentChat}</h3>
          <div className="flex-grow overflow-y-auto p-4 bg-gray-100 border border-gray-300 rounded-lg mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 p-3 rounded-lg max-w-[70%] flex flex-col ${
                  msg.sender === "System"
                    ? "bg-gray-300 mx-auto text-center"
                    : msg.sender === `${user.firstName} ${user.lastName}`
                    ? "bg-white ml-auto"
                    : "bg-green-100"
                }`}
              >
                <span className="font-semibold">{msg.sender}</span>
                {renderMessage(msg)}
                <div ref={messagesEndRef} />
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex mb-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-grow p-2 border border-gray-300 rounded-l-lg"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StaffChat;
