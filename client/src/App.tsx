import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { TransxProvider } from './contexts/TransxContext';

import TickerBar from './components/TickerBar';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardLayout from './components/DashboardLayout';
import ScrollToTop from './components/ScrollTop';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPasswordPage from './pages/ResetPassword';
import ForgotPasswordPage from './pages/ForgotPassword';
import DashboardHome from './pages/dashboard/DashboardHome';
import DepositFunds from './pages/dashboard/DepositFunds';
import WithdrawFunds from './pages/dashboard/WithdrawFunds';
import FundLog from './pages/dashboard/FundLog';
import PurchaseSignals from './pages/dashboard/PurchaseSignals';
import MyPlan from './pages/dashboard/MyPlan';
import ProfitHistory from './pages/dashboard/ProfitHistory';
import UpgradeAccount from './pages/dashboard/UpgradeAccount';

// 🔐 Route protection components
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

  const isRecovery = window.location.hash.includes('type=recovery');
  const isResetPage = window.location.pathname === '/reset-password';

  if (user && !(isRecovery && isResetPage)) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

// 📊 Google Analytics Tracker Hook
const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize('G-9Z4JDR9ND6'); // ✅ Replace with your GA4 ID
  }, []);

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);
};

function AppContent() {
  useAnalytics(); // 🧠 Track route changes

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TickerBar />
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Header />
            <LandingPage />
            <Footer />
          </>
        } />
        <Route path="/forgot-password" element={
          <PublicRoute>
            <Header />
            <ForgotPasswordPage />
          </PublicRoute>
        } />
        <Route path="/reset-password" element={
          <PublicRoute>
            <Header />
            <ResetPasswordPage />
          </PublicRoute>
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TransxProvider>
          <Router>
            <AppContent />
          </Router>
        </TransxProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
