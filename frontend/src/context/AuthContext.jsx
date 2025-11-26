import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Check localStorage to see if user was already logged in
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("isAdminAuthenticated")
  );

  const login = () => {
    localStorage.setItem("isAdminAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access the context
export const useAuth = () => {
  return useContext(AuthContext);
};
