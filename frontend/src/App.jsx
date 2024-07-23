// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import AuthPage from './pages/AuthPage';
import logo from './assets/logo.png'; // Path to your logo

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingScreen logo={logo} />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
