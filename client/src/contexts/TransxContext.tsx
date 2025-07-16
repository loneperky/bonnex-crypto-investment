// context/TransxContext.tsx
import axios from 'axios';
import React, {
  createContext, useContext, useState, useEffect, ReactNode,
} from 'react';
import { Transaction } from '../types';
import { TransxContextType } from '../types';
import { useAuth } from './AuthContext';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000';

const TransxContext = createContext<TransxContextType | undefined>(undefined);

// Hook to use context
export const useTransx = () => {
  const context = useContext(TransxContext);
  if (!context) {
    throw new Error('useTransx must be used within a TransxProvider');
  }
  return context;
};

interface ProviderProps {
  children: ReactNode;
}

export const TransxProvider: React.FC<ProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [withdrawal, setWithdrawal] = useState()
  const [selectedPlan, setSelectedPlan] = useState("")
  const [deposit, setDeposit] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchUser } = useAuth();
  const BACKEND_URL = 'https://bonnex-crypto-investment-production.up.railway.app';
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/transactions/all`);
        setTransactions(data.transactions);
      } catch (err: any) {
        console.error('Error fetching transactions:', err.response?.data?.error || err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser(); // Fetch user data on mount
    fetchTransactions();
  }, []);

  // Get transaction by type

  useEffect(() => {
    const getWithdrawal = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/transactions/type/withdrawal`)
        setWithdrawal(data.transactions)
        console.log('Withdrawal transactions fetched:', data.transactions);
        fetchUser(); // Refresh user data after fetching transactions
        console.log(data);
      } catch (error: any) {
        console.log(error);
        console.error('Error fetching transactions:', error.response?.data?.error || error.message);
      }
    };
    getWithdrawal()
  }, [])

  useEffect(() => {
    const getDeposit = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/transactions/type/deposit`)
        setDeposit(data.transactions)
        fetchUser(); // Refresh user data after fetching transactions
        console.log(data)
      } catch (error: any) {
        console.log(error)
        console.error('Error fetching transactions:', error.response?.data?.error || error.message);
      }
    }
    getDeposit()
  }, [])


  const addTransaction = async (
    amount: number,
    type: 'deposit' | 'withdrawal' | 'signal purchase' | 'profit',
    method: string,
    status: 'Pending' | 'Completed' | 'Failed'
  ) => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/transactions/add`, { amount, type, method, status });
      setTransactions((prev) => [data.transaction, ...prev]);
      fetchUser(); // Refresh user data after adding transaction
      console.log('Transaction added successfully:', data.transaction);
    } catch (err: any) {
      console.error('Failed to add transaction:', err.response?.data?.error || err.message);
    }
  };

  const handleUpgrade = async (planId: string) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/user/upgrade-plan`, { planId }
      );
      console.log(res.data.message); // Plan updated successfully
      // Optionally update local state
      setSelectedPlan(planId);
      fetchUser(); // Refresh user data after upgrade
    } catch (error) {
      console.error('Upgrade failed:', error);
    }
  };

  return (
    <TransxContext.Provider value={{ transactions, withdrawal, deposit, addTransaction, isLoading, handleUpgrade, selectedPlan, setSelectedPlan }}>
      {children}
    </TransxContext.Provider>
  );
};
