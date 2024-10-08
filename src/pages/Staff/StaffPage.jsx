import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import './StaffPage.css'; 
import { useState } from 'react';
import ChatIcon from '../Chat/ChatIcon';
import ChatModal from '../Chat/ChatModal';

const StaffPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatOpen = () => setIsChatOpen(true);
  const handleChatClose = () => setIsChatOpen(false);

  return (
    <div className="staff-page">

      <div className="top-bar">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      
      <div className="layout">
     
        <Sidebar />

       
        <div className="content">
          <h1>Welcome to the Staff Dashboard</h1>
          <ChatIcon onClick={handleChatOpen} />
      
      <ChatModal
        isOpen={isChatOpen}
        onClose={handleChatClose}
        userEmail={localStorage.getItem('userEmail')}
        userRole="staff"
      />
         
         
        </div>
      </div>
    </div>
  );
};

export default StaffPage;