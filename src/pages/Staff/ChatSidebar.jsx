import React from 'react';
import './ChatSidebar.css'; 

function ChatSidebar({ customers, onSelectCustomer }) {
  return (
    <div className="chat-sidebar">
      <h3>Customer List</h3>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <button className="customer-button" onClick={() => onSelectCustomer(customer.id)}>
              {customer.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatSidebar;