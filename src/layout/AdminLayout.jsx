import React from "react";
import { Outlet } from "react-router-dom";
// Import the AdminNavbar component
import AdminSidebar from './../components/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 ">
      <AdminSidebar className="fixed" />
      <main className="flex-1 p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
