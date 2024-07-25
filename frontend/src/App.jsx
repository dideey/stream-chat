import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatList from "./components/list/chatList/ChatList";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Notification from "./components/notification/Notification";
import LoadingScreen from "./components/LoadingScreen";
import AuthPage from "./pages/AuthPage";
import logo from "./assets/logo.png";
import "./pages/AuthPage.css";
import ChatComponent from './components/ChatComponent'


const App = () => {
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleLogin = async (credentials) => {
    try {
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
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error occurred during logging in", error);
    }
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<LoadingScreen logo={logo} />} />
          <Route path="/login" element={<AuthPage onLogin={handleLogin} />} />
          <Route path="/home" element={<ChatList onSelectChat={setSelectedChat} />} />

          {/* Additional routes */}
          <Route
            path="/chat/:chatId"
            element={
              user ? (
                  <Chat userId={user.id} selectedChat={selectedChat} />
              ) : (
                <AuthPage onLogin={handleLogin} />
              )
            }
          />
        </Routes>
        <Notification />
      </div>
    </Router>
  );
};

export default App;
