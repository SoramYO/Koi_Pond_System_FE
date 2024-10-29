import {
  CheckCircleFilled,
  CheckSquareOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { getDatabase, onValue, push, ref } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";

const ChatPanel = ({ chatId, customerName, orderId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const db = getDatabase();

  useEffect(() => {
    if (chatId) {
      const messagesRef = ref(db, `messages/${chatId}`);
      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messagesArray = Object.entries(data)
            .map(([key, value]) => ({
              id: key,
              ...value,
            }))
            .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
          setMessages(messagesArray);
          scrollToBottom();
        }
      });

      return () => unsubscribe();
    }
  }, [chatId, db]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const isScrolledNearBottom =
        chatContainerRef.current.scrollHeight -
          chatContainerRef.current.scrollTop -
          chatContainerRef.current.clientHeight <
        100;

      if (isScrolledNearBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const groupMessagesByDate = () => {
    const groups = [];
    let currentGroup = null;

    messages.forEach((message) => {
      const messageDate = new Date(message.timestamp).toDateString();

      if (!currentGroup || currentGroup.date !== messageDate) {
        currentGroup = {
          date: messageDate,
          timestamp: message.timestamp,
          messages: [],
        };
        groups.push(currentGroup);
      }
      currentGroup.messages.push(message);
    });

    return groups;
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() && chatId) {
      try {
        const messagesRef = ref(db, `messages/${chatId}`);
        const newMessage = {
          message: inputMessage.trim(),
          sender: "Staff",
          timestamp: Date.now(),
          read: false,
        };
        await push(messagesRef, newMessage);
        setInputMessage("");
        scrollToBottom();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100%-24rem)] bg-gray-50">
      <div className="bg-white px-6 py-4 border-b border-gray-200 shadow-sm">
        <h3 className="font-medium text-gray-900">{customerName}</h3>
        <p className="text-sm text-gray-500">Order #{orderId}</p>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-6"
      >
        {groupMessagesByDate().map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-4">
            <div className="flex justify-center">
              <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                {formatDate(group.timestamp)}
              </span>
            </div>

            {group.messages.map((msg, index) => {
              const isStaff = msg.sender === "Staff";
              const isSystem = msg.sender === "System";
              const showAvatar =
                index === 0 || group.messages[index - 1]?.sender !== msg.sender;

              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    isStaff ? "justify-end" : "justify-start"
                  } ${isSystem ? "justify-center" : ""}`}
                >
                  {isSystem ? (
                    <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-lg">
                      {msg.message}
                    </div>
                  ) : (
                    <div
                      className={`flex ${
                        isStaff ? "flex-row-reverse" : "flex-row"
                      } items-end max-w-[70%] gap-2`}
                    >
                      {showAvatar && !isStaff && (
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 text-sm font-medium">
                            {customerName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div
                        className={`flex flex-col ${
                          isStaff ? "items-end" : "items-start"
                        }`}
                      >
                        {showAvatar && (
                          <span className="text-xs text-gray-500 mb-1">
                            {isStaff ? "Staff" : customerName}
                          </span>
                        )}
                        <div
                          className={`rounded-lg px-4 py-2 max-w-full break-words ${
                            isStaff
                              ? "bg-blue-600 text-white"
                              : "bg-white border border-gray-200 text-gray-900"
                          }`}
                        >
                          {msg.message}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-gray-400">
                            {formatTimestamp(msg.timestamp)}
                          </span>
                          {isStaff && (
                            <span className="text-xs text-gray-400">
                              {msg.read ? (
                                <CheckSquareOutlined className="w-3 h-3" />
                              ) : (
                                <CheckCircleFilled className="w-3 h-3" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={sendMessage}
        className="p-4 bg-white border-t border-gray-200"
      >
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full bg-transparent px-4 py-3 max-h-32 resize-none focus:outline-none"
              rows={1}
            />
          </div>
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <SendOutlined className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;
