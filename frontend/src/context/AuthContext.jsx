// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const checkVerificationStatus = async () => {
    try {
      const { data } = await api.get('/user');
      setUser(data);
      setIsVerified(data.email_verified_at && data.phone_verified_at);
    } catch (error) {
      console.error('Not authenticated');
    }
  };

  useEffect(() => {
    checkVerificationStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isVerified, checkVerificationStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}