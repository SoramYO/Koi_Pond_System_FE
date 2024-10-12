import { message } from "antd";
import { onValue, push, ref, serverTimestamp } from "firebase/database";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext"; // Import AuthContext
import { db, storage } from "./FirebaseConfig";

const ChatWindow = () => {
  const { user } = useContext(AuthContext);
  const chatId = `${user.id} ${user.firstName} ${user.lastName}`;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [downloadURL, setDownloadURL] = useState("");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const checkUserCredentials = async () => {
      if (user) {
        const userRef = ref(db, `users/${user.id}`);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          if (userData) {
            if (
              userData.email === user.email &&
              userData.password === user.password
            ) {
              loadMessages();
            } else {
              message.error("Thông tin tài khoản không hợp lệ.");
            }
          }
        });
      }
    };

    checkUserCredentials();
  }, [user]);

  const loadMessages = () => {
    const messagesRef = ref(db, `messages/${chatId}`);

    const unsubscribe = onValue(
      messagesRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messagesArray = Object.entries(data).map(([key, value]) => ({
            ...value,
            id: key,
          }));
          setMessages(messagesArray);
        } else {
          setMessages([]);
        }
      },
      (error) => {
        console.error("Error loading messages:", error);
      }
    );

    return () => unsubscribe();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() || fileList.length > 0) {
      let messageToSend = inputMessage.trim();

      if (fileList.length > 0) {
        try {
          const file = fileList[0].originFileObj;

          if (!file) {
            throw new Error("File object is undefined or null.");
          }

          const newMessage = {
            message: downloadURL,
            sender: `${user.firstName} ${user.lastName}`,
            timestamp: serverTimestamp(),
            read: true,
          };

          push(ref(db, `messages/${chatId}`), newMessage);
          setInputMessage("");
          setFileList([]);
        } catch (error) {
          console.error("Error uploading file:", error);
          message.error("Failed to upload file.");
        }
      } else {
        const newMessage = {
          message: messageToSend,
          sender: `${user.firstName} ${user.lastName}`,
          timestamp: serverTimestamp(),
          read: true,
        };
        push(ref(db, `messages/${chatId}`), newMessage);
        setInputMessage("");
      }
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const uploadImage = async ({ onError, onSuccess, file }) => {
    try {
      if (!file) {
        throw new Error("File object is undefined or null.");
      }
      const fileStorageRef = storageRef(storage, `files/${file.name}`);
      const snapshot = await uploadBytes(fileStorageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      onSuccess("ok");
      setDownloadURL(downloadURL);
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("Failed to upload file.");
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
          <img src="" alt="File" className="w-6 h-6" />
          <div className="flex flex-col">
            <span className="font-semibold">{fileName}</span>
            <a
              href={msg.message}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
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

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-bold">You are not logged in!</h2>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Go to Login
        </button>
        <p className="mt-2">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Register
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <div className="max-h-12 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-sm transition-all duration-200 ${
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
      </div>
      <form
        onSubmit={sendMessage}
        className="flex items-center p-4 bg-white border-t border-gray-300"
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
