import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ChatIcon({ onClick }) {
  return (
    <div
      className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full p-4 cursor-pointer shadow-lg z-50 transition-colors duration-300 ease-in-out hover:bg-blue-700"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faCommentDots} size="2x" />
    </div>
  );
}

export default ChatIcon;
