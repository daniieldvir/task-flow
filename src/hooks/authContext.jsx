import { createContext, useContext, useEffect, useState } from "react";
import { STORAGE_KEYS } from "../constants/config.js";

const AuthContext = createContext({
  loginUser: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

const AuthProvider = ({ children }) => {
  // Load user from localStorage on mount
  const [loginUser, setLoginUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    // Persist user to localStorage whenever it changes
    if (loginUser) {
      try {
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(loginUser));
      } catch (error) {
        console.error("Error saving user to localStorage:", error);
      }
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    }
  }, [loginUser]);

  const login = (user) => {
    setLoginUser(user);
  };

  const logout = () => {
    setLoginUser(null);
  };

  const isAuthenticated = !!loginUser;

  return (
    <AuthContext.Provider value={{ loginUser, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export { AuthProvider };
