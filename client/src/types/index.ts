export interface User {
  id: string;
  email: string;
  full_name: string;
  balance: number;
  plan: string;
  joinDate: string;
  totalInvestment: number;
  totalProfit: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

// Transaction type for financial transactions
export interface Transaction {
  type: 'deposit' | 'withdrawal' | 'signal purchase' | 'profit';
  id: string;
  method: string;
  status: 'Pending' | 'Completed' | 'Failed';
  amount: number;
  created_at: string;
}

export interface TransxContextType {
  transactions: Transaction[];
  withdrawal?: Transaction[];
  deposit?: Transaction[];
  addTransaction: (amount: number, type: Transaction['type'], method: string, status: Transaction['status']) => Promise<void>;
  isLoading: boolean;
}
