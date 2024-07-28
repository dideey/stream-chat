// App.js
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from 'react';
import ChatList from "./components/list/chatList/ChatList";
import Chat from "./components/chat/Chat";
import LoadingScreen from "./components/LoadingScreen";
import AuthPage from "./pages/AuthPage";
import Notification from "./components/notification/Notification";
import logo from "./assets/logo.png";
import { AuthProvider, useAuth } from './pages/AuthContext';

function App() {
  const { user, login } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      console.log('Sending login request with credentials:', credentials);

      const response = await fetch("http://195.35.37.100:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        return;
      }

      const data = await response.json();
      console.log('Data received:', data);

      if (data.access && data.refresh) {
        const userData = { id: credentials.username, name: credentials.username };
        login(userData, { access: data.access, refresh: data.refresh });
        navigate('/home');
      } else {
        console.error("Login failed: No tokens received");
      }
    } catch (error) {
      console.error("Error occurred during logging in", error);
    }
  };

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<LoadingScreen logo={logo} />} />
        <Route path="/login" element={<AuthPage onLogin={handleLogin} />} />
        <Route path="/home" element={<ChatList onSelectChat={setSelectedChat} />} />
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
  );
}

function AppWithProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithProvider;
