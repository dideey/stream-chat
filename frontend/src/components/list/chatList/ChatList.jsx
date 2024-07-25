import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./chatList.css";
import AddUser from "./addUser/AddUser";

const ChatList = ({ onSelectChat }) => {
    const [addMode, setAddMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const chatItems = [
        { id: 1, img: './avatar4.png', name: 'Yetunde Adams', msg: 'Hello' },
        { id: 2, img: './avatar 3.png', name: 'Timile Ben', msg: 'Hello' },
        { id: 3, img: './avatar5.jpeg', name: 'Imole K.', msg: 'Chimobi!' },
        { id: 4, img: './avatar6.png', name: 'Esther.', msg: 'how are you!' },
        { id: 5, img: './avatar8.png', name: 'jimi.', msg: 'how are you!' },
        { id: 6, img: './avatar9.jpeg', name: 'lusee.', msg: 'how are you!' },
        { id: 7, img: './avatar10.png', name: 'ife.', msg: 'how are you!' },
        { id: 8, img: './avatar11.jpeg', name: 'mark.', msg: 'how are you!' },
        { id: 9, img: './avatar1.png', name: 'veekey.', msg: 'how are you!' },
    ];

    const filteredChatItems = chatItems.filter(chat => 
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChatSelection = (chat) => {
        console.log('Selected chat:', chat); // Debugging
        onSelectChat(chat); // Set the selected chat in the parent component
        navigate(`/chat/${chat.id}`); // Navigate to the chat route
    }

  

    return (
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="Search icon" />
                    <input 
                        type="search" 
                        placeholder="search" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <img
                    src={addMode ? "./minus.png" : "./plus.png"}
                    alt="Toggle add mode"
                    className="add"
                    onClick={() => setAddMode(prev => !prev)}
                />
            </div>

            {filteredChatItems.map((obj) => (
                <div
                    className="item"
                    key={obj.id}
                    onClick={() => handleChatSelection(obj)}
                >
                    <img src={obj.img} alt={obj.name} />
                    <div className="texts">
                        <span>{obj.name}</span>
                        <p>{obj.msg}</p>
                    </div>
                </div>
            ))}

            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;
