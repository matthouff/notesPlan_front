import { createContext, useContext, useState } from 'react';
import PropTypes from "prop-types";

const AuthContext = createContext();

AuthProvider.propTypes = {
  children: PropTypes.object,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    // ... Stockez le token dans les cookies ou le stockage local
    setUser(token);
  };

  const logout = () => {
    // ... Effacez le token des cookies ou du stockage local
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
