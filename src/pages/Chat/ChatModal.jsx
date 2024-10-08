import React, { useState, useEffect } from 'react';
import './ChatModal.css';

function ChatModal({ isOpen, onClose, userEmail, userRole }) {
  const userId = localStorage.getItem('userId');
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem(`chatMessages_${userId}`);
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem(`chatMessages_${userId}`, JSON.stringify(messages));
  }, [messages, userId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = { text: input, sender: userEmail, role: userRole };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-modal">
      <div className="chat-modal-content">
        <div className="chat-modal-header">
          <h3>Chat</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="chat-modal-body">
          <div className="chat-messages">
            {/* Render each message */}
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender === userEmail ? 'sent' : 'received'}`}>
                <div className="message-text">
                  <strong>{message.role}</strong>: {message.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        <form className="chat-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ChatModal;