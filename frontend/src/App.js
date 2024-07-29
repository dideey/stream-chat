import React, { useState, useContext } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext } from './context/AuthContext';
import './style.css';

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
    } else {
      return <div>404 Not Found</div>;
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => setRoute('/')}>Home</button>
        <button onClick={() => setRoute('/login')}>Login</button>
        <button onClick={() => setRoute('/register')}>Register</button>
      </nav>
      {renderPage()}
    </div>
  );
}

export default App;