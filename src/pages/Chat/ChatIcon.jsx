import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import './ChatIcon.css'; 

function ChatIcon({ onClick }) {
  return (
    <div className="chat-icon" onClick={onClick}>
      <FontAwesomeIcon icon={faCommentDots} size="2x" />
    </div>
  );
}

export default ChatIcon;