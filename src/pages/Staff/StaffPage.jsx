import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatSidebar from "./ChatSidebar"; // Assuming this is still needed in your layout
import Sidebar from "./Sidebar";

const StaffPage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState(null);

  const customers = [
    { id: "002", name: "Customer A" },
    { id: "003", name: "Customer B" },
    { id: "004", name: "Customer C" },
  ];

  const handleLogout = () => {
    navigate("/login");
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
    <div className="flex flex-col h-screen">
      <div className="flex justify-end p-2 bg-gray-200 border-b border-gray-300">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow p-4 bg-gray-100">
          {/* Here you can place content related to the staff page */}
          {/* E.g., chat button, other components */}
          <button
            className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleChatOpen}
          >
            Open Chat
          </button>

          {isChatOpen && (
            <ChatSidebar
              customers={customers}
              onSelectCustomer={handleSelectCustomer}
              onClose={handleCloseChatModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffPage;
