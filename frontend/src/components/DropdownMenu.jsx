// src/components/DropdownMenu/DropdownMenu.jsx
import React from 'react';

const DropdownMenu = ({ onViewProfile, onMuteChat, onBlockUser, onClearChat, onReport }) => {
  const handleClick = (action) => (e) => {
    e.stopPropagation();
    action();
  };

  return (
    <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
      <ul>
        <li onClick={handleClick(onViewProfile)}>View Profile</li>
        <li onClick={handleClick(onMuteChat)}>Mute Chat</li>
        <li onClick={handleClick(onBlockUser)}>Block User</li>
        <li onClick={handleClick(onClearChat)}>Clear Chat</li>
        <li onClick={handleClick(onReport)}>Report</li>
      </ul>
    </div>
  );
};

export default DropdownMenu;