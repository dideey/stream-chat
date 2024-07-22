import React, { useState } from "react";
import ChatList from "./components/list/chatList/ChatList"; // Make sure this path is correct
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleLogin = async (credentials) => {
    try{
      //add the api endpoint for login
      const response = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (data.success){
        setUser({id: data.userId, name: data.userName});
      } else{
        console.error('Login failed');
      }
      } catch (error) {
        console.error('Error occured during loggint in', error);
      
      }
    }

  return (
    <div className="container">
      {user ? (
        <>
          <ChatList onSelectChat={setSelectedChat} />
          <Chat userId={user.id} selectedChat={selectedChat} />
          <Detail selectedChat={selectedChat} />
        </>
      ) : (
        <Login  onLogin={handleLogin}/>
      )}
      <Notification />
    </div>
  );
};

export default App;