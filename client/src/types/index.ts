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

// types.ts
export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}


// Inside AuthContextType (maybe in AuthContext.ts or types.ts)


export interface AuthContextType {
  user: (User & { profile?: any }) | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  forgotPassword: (email: string) => Promise<ForgotPasswordResponse>; // ✅ updated
  setUser: React.Dispatch<React.SetStateAction<(User & { profile?: any }) | null>>;
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
  handleUpgrade: (planId: string) => Promise<void>,
  isLoading: boolean;
  selectedPlan?: string;
  setSelectedPlan: React.Dispatch<React.SetStateAction<string>>;
}
