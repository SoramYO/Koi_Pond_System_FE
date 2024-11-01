import axios from "axios";
import React, { useContext } from "react";
import { FiFileText, FiHome, FiLogOut, FiUsers } from "react-icons/fi"; // Import icons
import { SiSpond } from "react-icons/si";
import { LuFish } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContext";
import { FaHeadphonesAlt, FaHeadset } from "react-icons/fa";
const AdminSidebar = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("user");
    toast.success("Đăng xuất thành công");
  };

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col justify-between h-screen">
      <nav className="mt-5">
        {/* Dashboard link */}
        <a
          href="/admin"
          className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200"
        >
          <FiHome className="mr-2" /> {/* Home icon for Dashboard */}
          Dashboard
        </a>
        {/* Consultation */}
        <a
          href="/admin/manage-consultation"
          className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200"
        >
          <FaHeadset className="mr-2" /> {/* Consultation icon */}
          Consultation
        </a>
        {/* Users link */}
        <a
          href="/admin/manage-users"
          className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200"
        >
          <FiUsers className="mr-2" /> {/* Users icon */}
          Users
        </a>

        {/* Projects link */}
        <a
          href="/admin/manager-pond"
          className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200"
        >
          <SiSpond className="mr-2" /> {/* Projects icon */}
          Pond
        </a>
        <a
          href="/admin/manager-fish"
          className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200"
        >
          <LuFish className="mr-2" /> {/* Projects icon */}
          Fish
        </a>

        {/* Blog link */}
        <a
          href="/admin/blogs"
          className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200"
        >
          <FiFileText className="mr-2" /> {/* Blog icon */}
          Blog
        </a>
        {/* Package link */}
        <a
          href="/admin/packages"
          className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200"
        >
          <FiFileText className="mr-2" /> {/* Blog icon */}
          Package
        </a>
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full py-2 px-4 text-gray-600 hover:bg-gray-200"
        >
          <FiLogOut className="mr-2" /> {/* Logout icon */}
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
