import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Create a CSS file for styling

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Staff Dashboard</h2>
      <ul>
    
        <li>
          <Link to="/assign-design">Assign Design</Link>
        </li>
        <li>
          <Link to="/assign-construction">Assign Construction</Link>
        </li>
        <li>
          <Link to="/chatfirebaselogin">Chat</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;