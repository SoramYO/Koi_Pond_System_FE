import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

import ChatSidebar from './ChatSidebar'; 
import './StaffPage.css';

const StaffPage = () => {
  const navigate = useNavigate();

 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState(null);


  const customers = [
    { id: '002', name: 'Customer A' },
    { id: '003', name: 'Customer B' },
    { id: '004', name: 'Customer C' },
  ];

  
  const handleLogout = () => {
    navigate('/login');
  };

  
  const handleChatOpen = () => setIsSidebarOpen(true);
  const handleChatClose = () => setIsSidebarOpen(false);


  const handleSelectCustomer = (customerId) => {
    setCurrentCustomerId(customerId);
    setIsChatOpen(true); 
    setIsSidebarOpen(false); 
  };

  
  const handleCloseChatModal = () => {
    setIsChatOpen(false);
    setCurrentCustomerId(null);
  };

  return (
    <div className="staff-page">
      <div className="top-bar">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="layout">
       
        <Sidebar />
      </div>
    </div>
  );
};

export default StaffPage;