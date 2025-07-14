// context/TransxContext.tsx
import axios from 'axios';
import React, {
  createContext, useContext, useState, useEffect, ReactNode,
} from 'react';
import { Transaction } from '../types';
import { TransxContextType } from '../types';


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
  const [deposit, setDeposit] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/transactions/all');
        setTransactions(data.transactions);
      } catch (err: any) {
        console.error('Error fetching transactions:', err.response?.data?.error || err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Get transaction by type

  useEffect(() => {
    const getWithdrawal = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/transactions/type/withdrawal`)
        setWithdrawal(data.transactions)
        console.log(data)
      } catch (error: any) {
        console.log(error)
        console.error('Error fetching transactions:', error.response?.data?.error || error.message);
      }
    }
    getWithdrawal()
  }, [])

  useEffect(() => {
    const getDeposit = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/transactions/type/deposit`)
        setDeposit(data.transactions)
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
      const { data } = await axios.post('http://localhost:5000/transactions/add', { amount, type, method, status });
      setTransactions((prev) => [data.transaction, ...prev]);
      console.log('Transaction added successfully:', data.transaction);
    } catch (err: any) {
      console.error('Failed to add transaction:', err.response?.data?.error || err.message);
    }
  };

  return (
    <TransxContext.Provider value={{ transactions, withdrawal, deposit, addTransaction, isLoading }}>
      {children}
    </TransxContext.Provider>
  );
};
