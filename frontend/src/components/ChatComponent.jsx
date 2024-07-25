import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatComponent = ({ onSelectChat }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const chatId = 1; // Example chat ID
        if (typeof onSelectChat === 'function') {
            onSelectChat(chatId); // Update state or handle chat selection
            navigate(`/chat/${chatId}`); // Navigate to the chat page
        } else {
            console.error('onSelectChat is not a function');
        }
    };

    return (
        <div onClick={handleClick}>
            Select Chat
        </div>
    );
};

export default ChatComponent;
