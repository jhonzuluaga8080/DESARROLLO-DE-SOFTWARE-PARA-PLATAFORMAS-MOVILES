import { createContext, useContext } from 'react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';

// Contexto 1: Login / Register / Logout
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = useFirebaseAuth(); // { user, loading, login, register, logout }
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
