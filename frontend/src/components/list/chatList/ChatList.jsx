import React, { useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/AddUser";

const ChatList = ({ onSelectChat }) => {
    const [addMode, setAddMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const chatItems = [
        { img: './avatar4.png', name: 'Yetunde Adams', msg: 'Hello' },
        { img: './avatar 3.png', name: 'Timile Ben', msg: 'Hello' },
        { img: './avatar5.jpeg', name: 'Imole K.', msg: 'Chimobi!' },
        { img: './avatar6.png', name: 'Esther.', msg: 'how are you!' },
        { img: './avatar8.png', name: 'jimi.', msg: 'how are you!' },
        { img: './avatar9.jpeg', name: 'lusee.', msg: 'how are you!' },
        { img: './avatar10.png', name: 'ife.', msg: 'how are you!' },
        { img: './avatar11.jpeg', name: 'mark.', msg: 'how are you!' },
        { img: './avatar1.png', name: 'veekey.', msg: 'how are you!' },
    ];

    const filteredChatItems = chatItems.filter(chat => 
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    key={obj.name}
                    onClick={() => onSelectChat(obj)}
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