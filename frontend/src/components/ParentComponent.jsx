// src/components/ParentComponent.jsx
import React from 'react';
import ChatComponent from './ChatComponent';

const ParentComponent = () => {
    const handleSelectChat = (chatId) => {
        console.log(`Chat selected: ${chatId}`);
    };

    return (
        <div>
            <ChatComponent onSelectChat={handleSelectChat} />
        </div>
    );
};

export default ParentComponent;