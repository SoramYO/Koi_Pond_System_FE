import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 flex flex-col p-5 shadow-lg">
      <h2 className="text-center mb-5 text-lg font-semibold">
        Staff Dashboard
      </h2>
      <ul className="list-none p-0">
        <li className="mb-4">
          <Link
            to="/consultingstaff"
            className="text-white text-lg hover:text-blue-400 transition-colors duration-200"
          >
            Order
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/assign-design"
            className="text-white text-lg hover:text-blue-400 transition-colors duration-200"
          >
            Assign Design
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/assign-construction"
            className="text-white text-lg hover:text-blue-400 transition-colors duration-200"
          >
            Assign Construction
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/consultingstaff/chat"
            className="text-white text-lg hover:text-blue-400 transition-colors duration-200"
          >
            Chat
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
