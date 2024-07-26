import React, { useState } from "react";
import ChatList from "./ChatList";
import Chat from "./Chat";

const App = () => {
    const [selectedChat, setSelectedChat] = useState(null);

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
    };

    return (
        <div className="app">
            <div className="sidebar">
                <ChatList onSelectChat={handleSelectChat} />
            </div>
            <div className="main">
                {selectedChat ? <Chat chat={selectedChat} /> : <p>Select a chat to view details</p>}
            </div>
        </div>
    );
};

export default App;