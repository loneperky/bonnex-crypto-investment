import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import TickerBar from './components/TickerBar';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardLayout from './components/DashboardLayout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardHome from './pages/dashboard/DashboardHome';
import DepositFunds from './pages/dashboard/DepositFunds';
import WithdrawFunds from './pages/dashboard/WithdrawFunds';
import FundLog from './pages/dashboard/FundLog';
import PurchaseSignals from './pages/dashboard/PurchaseSignals';
import MyPlan from './pages/dashboard/MyPlan';
import ProfitHistory from './pages/dashboard/ProfitHistory';
import UpgradeAccount from './pages/dashboard/UpgradeAccount';
import { TransxProvider } from './contexts/TransxContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" /> : <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TransxProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <TickerBar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <>
                  <Header />
                  <LandingPage />
                  <Footer />
                </>
              } />

              <Route path="/login" element={
                <PublicRoute>
                  <Header />
                  <Login />
                </PublicRoute>
              } />

              <Route path="/signup" element={
                <PublicRoute>
                  <Header />
                  <Signup />
                </PublicRoute>
              } />

              {/* Protected Dashboard Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<DashboardHome />} />
                <Route path="deposit" element={<DepositFunds />} />
                <Route path="withdraw" element={<WithdrawFunds />} />
                <Route path="fund-log" element={<FundLog />} />
                <Route path="signals" element={<PurchaseSignals />} />
                <Route path="upgrade" element={<UpgradeAccount />} />
                <Route path="plan" element={<MyPlan />} />
                <Route path="profit-history" element={<ProfitHistory />} />
              </Route>
            </Routes>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            pauseOnHover
            theme="colored"
          />
        </Router>
        </TransxProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;