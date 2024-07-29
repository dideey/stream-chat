import { createContext, useEffect, useState } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Mock user data for simulation
const mockUser = {
  uid: "12345",
  displayName: "Rafeal Nadal",
  photoURL: "https://via.placeholder.com/150",
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const simulateAuthCheck = () => {
      // Simulate a user being logged in after 1 second
      setTimeout(() => {
        setCurrentUser(mockUser);
        setLoading(false);
        console.log(mockUser);
      }, 1000);
    };

    simulateAuthCheck();

    return () => {
      setCurrentUser(null);
      setLoading(true);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
