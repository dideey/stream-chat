import React, { useState } from "react";
import ChatList from "./components/list/chatList/ChatList"; // Make sure this path is correct
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import "./App.css";

const App = () => {
  const user = true;
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="container">
      {user ? (
        <>
          <ChatList onSelectChat={setSelectedChat} />
          <Chat selectedChat={selectedChat} />
          <Detail selectedChat={selectedChat} />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;