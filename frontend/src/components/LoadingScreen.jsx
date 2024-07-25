// src/components/LoadingScreen.jsx
import React, { useEffect, useState } from 'react';
import './LoadingScreen.css'; // Importing CSS for this component

const LoadingScreen = ({ logo }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Redirect to the authentication page after 1 second
      window.location.href = '/login';
    }, 3000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-screen ${isLoading ? 'show' : 'hide'}`}>
      <img src={logo} alt="Logo" className="logo" />
    </div>
  );
};

export default LoadingScreen;
