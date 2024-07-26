import { Route, Routes, useNavigate } from "react-router-dom";
import ChatList from "./components/list/chatList/ChatList";
import Chat from "./components/chat/Chat";
import LoadingScreen from "./components/LoadingScreen";
import AuthPage from "./pages/AuthPage";
import Notification from "./components/notification/Notification";
import logo from "./assets/logo.png";
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogin = async (credentials) => {
    try {
      console.log('Sending login request with credentials:', credentials);
      const response = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      console.log('Response status:', response.status);

      if (!response.ok) {
        console.error("Login failed");
        return;
      }
      const data = await response.json();
      console.log('Data:', data);

      // Adjust the condition based on the actual response structure
      if (data.status && data.status.includes('Welcome back')) {
        const userData = { id: credentials.username, name: credentials.username };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/home');
      } else {
        console.error("Login failed");
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

export default App;