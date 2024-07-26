import React, { useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/AddUser";

const ChatList = ({ onSelectChat }) => {
    const [addMode, setAddMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

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

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://your-backend-api.com/search-user?query=${searchQuery}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

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
                    <button onClick={handleSearch}>Search</button>
                </div>
                <img
                    src={addMode ? "./minus.png" : "./plus.png"}
                    alt="Toggle add mode"
                    className="add"
                    onClick={() => setAddMode(prev => !prev)}
                />
            </div>

            {searchResults.length > 0 ? (
                searchResults.map((user) => (
                    <div
                        className="item"
                        key={user.id}
                        onClick={() => onSelectChat(user)}
                    >
                        <img src={user.img} alt={user.name} />
                        <div className="texts">
                            <span>{user.name}</span>
                            <p>{user.msg}</p>
                        </div>
                    </div>
                ))
            ) : (
                filteredChatItems.map((obj) => (
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
                ))
            )}

            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;

