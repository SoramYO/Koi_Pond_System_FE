import React, { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-end items-end z-50 p-5">
      <div
        ref={modalRef}
        className="bg-white w-1/3 max-w-md h-2/3 max-h-[500px] rounded-t-lg shadow-2xl flex flex-col animate-slide-up"
      >
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-lg font-semibold">Chat</h2>
          <button
            className="text-gray-500 hover:text-gray-800 transition-colors"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-3">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
