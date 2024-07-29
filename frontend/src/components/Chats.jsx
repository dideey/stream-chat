import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext) || {};
  const { dispatch } = useContext(ChatContext) || {};

  useEffect(() => {
    if (!currentUser) return;

    // Example logic
    const getChats = () => {
      // Simulate chat fetching
      setChats([{ id: '1', userInfo: { displayName: 'John', photoURL: 'avatar1.png' }, lastMessage: { text: 'Hello' } }]);

    };

    getChats();
  }, [currentUser]);

  if (!currentUser) {
    return <div>Loading...</div>; // or handle loading state
  }

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
