import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  loginUser: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

const AuthProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(null);

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
