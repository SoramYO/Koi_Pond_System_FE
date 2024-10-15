import axios from "axios";
import React, { useContext } from "react";
import { FiFileText, FiHome, FiLogOut, FiUsers } from "react-icons/fi"; // Import icons
import { SiSpond } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContext";
const AdminSidebar = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    const res = await axios.post(
      "http://localhost:5222/api/v1/authenticate/logout"
    );
    toast.success(res.data.message);
    navigate("/login");
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

        {/* Blog link */}
        <a
          href="/admin/blogs"
          className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200"
        >
          <FiFileText className="mr-2" /> {/* Blog icon */}
          Blog
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
