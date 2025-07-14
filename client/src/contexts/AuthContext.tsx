// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { AuthContextType } from '../types';
import { User } from '../types'

axios.defaults.withCredentials = true; // send cookies with every request
axios.defaults.baseURL = 'http://localhost:5000'; // set your API base URL


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const BACKEND_URL = 'https://bonnex-crypto-investment-production.up.railway.app';
  // ✅ Auto-login on app start
  useEffect(() => {
    const refreshAndFetchUser = async () => {
      try {
        // First try to refresh token
        await axios.post(`${BACKEND_URL}/auth/refresh-token`);
        // Then fetch the user
        const { data } = await axios.get(`${BACKEND_URL}/user/profile`  );
        setUser(data?.user);
      } catch (err: any) {
        console.error('Auto-login failed', err.response?.data?.error || err.message);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    refreshAndFetchUser();
  }, []);

  // ✅ Login
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BACKEND_URL}/auth/log-in`, { email, password });
      setUser(data.user);
      return true;
    } catch (err: any) {
      console.error(err.response?.data?.error || 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Signup
  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BACKEND_URL}/auth/sign-up`, { email, password, name });
      setUser(data.user);
      return true;
    } catch (err: any) {
      console.error(err.response?.data?.error || 'Signup failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };



  // ✅ Logout
  const logout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/auth/logout`);
    } catch (err) {
      console.error('Logout failed', err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
