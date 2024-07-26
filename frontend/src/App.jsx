import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatList from "./components/list/chatList/ChatList";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import Groupchat from "./components/groupchat/Groupchat";
import Navigation from "./components/navigation/Navigation";
import Settings from "./components/settings/SettingsPage";
import Requests from "./components/requests/Requests";
import "./App.css";

const App = () => {
  const user = true; // Change this based on your authentication logic
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <Router>
      <div className="container">
        <Navigation />
        {user ? (
          <Routes>
            <Route path="/" element={
              <>
                <ChatList onSelectChat={setSelectedChat} />
                <Chat selectedChat={selectedChat} />
                <Detail selectedChat={selectedChat} />
              </>
            } />
            <Route path="/settings" element={<Settings />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/groupchat" element={<Groupchat />} />
          </Routes>
        ) : (
          <Login />
        )}
        <Notification />
      </div>
    </Router>
  );
};

export default App;