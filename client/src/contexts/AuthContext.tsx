import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import supabase from '../config/supabaseClient';
import { AuthContextType, User } from '../types';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000'; // update if needed

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const BACKEND_URL = 'https://bonnex-crypto-investment-production.up.railway.app';

  const isOnResetPage = window?.location?.pathname.includes('/reset-password');
  const isRecoveryFlow = window?.location?.hash?.includes('type=recovery');

  // ✅ 1. Refresh token & fetch user ONLY if not in recovery mode
  useEffect(() => {
    const initialize = async () => {
      try {
        if (isOnResetPage && isRecoveryFlow) {
          console.log("🛑 Skipping refresh during password reset recovery flow.");
          return setIsLoading(false); // don't load session here
        }

        await axios.post(`${BACKEND_URL}/auth/refresh-token`);
        const { data } = await axios.get(`${BACKEND_URL}/user/profile`);
        setUser(data.user);
      } catch (err) {
        console.error("🚫 Session refresh failed:", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [isOnResetPage, isRecoveryFlow]);

  // ✅ 2. Handle Supabase auth state changes
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("⚡ Supabase Auth Event:", event);

      // 🔐 Don't do anything if user is on reset page during recovery
      if (isOnResetPage && isRecoveryFlow) {
        console.log("🛑 Ignoring auth state change during password recovery.");
        return;
      }

      if (session?.user) {
        try {
          const { data } = await axios.get(`${BACKEND_URL}/user/profile`);
          setUser(data.user);
        } catch (err) {
          console.error("🚫 Failed to fetch user after auth event:", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [isOnResetPage, isRecoveryFlow]);

  // ✅ 3. Fetch user manually
  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/user/profile`);
      setUser(data.user);
    } catch (err) {
      console.error("🚫 Fetch user failed:", err);
      setUser(null);
    }
  };

  // ✅ 4. Login
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BACKEND_URL}/auth/log-in`, { email, password });
      setUser(data.user);
      return true;
    } catch (err: any) {
      console.error("🚫 Login Error:", err.response?.data?.error || err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ 5. Signup
  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BACKEND_URL}/auth/sign-up`, { email, password, name });
      setUser(data.user);
      return true;
    } catch (err: any) {
      console.error("🚫 Signup Error:", err.response?.data?.error || err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ 6. Forgot Password
  const forgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BACKEND_URL}/auth/forgot-password`, { email });
      return { success: true, message: data.message || "Reset link sent successfully." };
    } catch (err: any) {
      console.error("🚫 Forgot Password Error:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to send reset link.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ 7. Logout
  const logout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/auth/logout`);
    } catch (err) {
      console.error("🚫 Logout Error:", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isLoading, fetchUser, forgotPassword, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
