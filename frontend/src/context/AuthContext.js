import React, { createContext, useEffect, useState } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Mock user data for simulation
const mockUser = {
  uid: "12345",
  displayName: "Rafael Nadal",
  photoURL: "https://via.placeholder.com/150",
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const simulateAuthCheck = () => {
      setTimeout(() => {
        setCurrentUser(mockUser);
        setLoading(false);
      }, 1000);
    };

    simulateAuthCheck();

    return () => {
      setCurrentUser(null);
      setLoading(true);
    };
  }, []);

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

