import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChatList from "./components/list/chatList/ChatList";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import Groupchat from "./components/groupchat/Groupchat";
import Navigation from "./components/navigation/Navigation";
import Settings from "./components/setingspage/SettingsPage";
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
          <Switch>
            <Route exact path="/">
              <ChatList onSelectChat={setSelectedChat} />
              <Chat selectedChat={selectedChat} />
              <Detail selectedChat={selectedChat} />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/requests">
              <Requests />
            </Route>
            <Route path="/groupchat">
              <Groupchat />
            </Route>
          </Switch>
        ) : (
          <Login />
        )}
        <Notification />
      </div>
    </Router>
  );
};

export default App;

