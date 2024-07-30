import React, { useState, useContext } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import { AuthContext } from './context/AuthContext';
import './style.css'; // Keep this for any other global styles if needed

function App() {
  const context = useContext(AuthContext);
  const [route, setRoute] = useState('/');

  if (!context) {
    return <div>Loading...</div>; // or some other loading indicator
  }

  const { currentUser, loading } = context;

  if (loading) {
    return <div>Authenticating...</div>;
  }

  const renderPage = () => {
    if (route === '/') {
      if (currentUser) {
        return <Home />;
      } else {
        return <Login />;
      }
    } else if (route === '/login') {
      return <Login />;
    } else if (route === '/register') {
      return <Register />;
    } else if (route === '/settings') {
      return <Settings />;
    } else {
      return <div>404 Not Found</div>;
    }
  };

  const buttonStyle = {
    backgroundColor: 'gray',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '5px',
  };

  return (
    <div>
      <nav>
        <button style={buttonStyle} onClick={() => setRoute('/')}>Home</button>
        <button style={buttonStyle} onClick={() => setRoute('/login')}>Login</button>
        <button style={buttonStyle} onClick={() => setRoute('/register')}>Register</button>
        <button style={buttonStyle} onClick={() => setRoute('/settings')}>Settings</button>
      </nav>
      {renderPage()}
    </div>
  );
}

export default App;
