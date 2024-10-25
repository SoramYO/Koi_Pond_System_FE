import React from "react";
import { Outlet } from "react-router-dom";
import StaffSidebar from "../components/StaffSidebar";

const StaffLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div>
        <StaffSidebar />
      </div>
      <main className="flex-1 p-10 overflow-y-auto ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default StaffLayout;
