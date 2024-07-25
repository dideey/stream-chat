// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatList from "./components/list/chatList/ChatList"; // Make sure this path is correct
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import LoadingScreen from './components/LoadingScreen';
import AuthPage from './pages/AuthPage';
import logo from './assets/logo.png'; // Path to your logo
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleLogin = async (credentials) => {
    try {
      // Add the API endpoint for login
      const response = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (data.success) {
        setUser({ id: data.userId, name: data.userName });
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error occurred during logging in', error);
    }
  };

  return (
    <Router>
      <div className="container">
        {user ? (
          <>
            <Routes>
              <Route path="/" element={<LoadingScreen logo={logo} />} />
              <Route path="/login" element={<AuthPage />} />
              {/* Add more routes as needed */}
            </Routes>
            <ChatList onSelectChat={setSelectedChat} />
            <Chat userId={user.id} selectedChat={selectedChat} />
            <Detail selectedChat={selectedChat} />
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
        <Notification />
      </div>
    </Router>
  );
};

export default App;
