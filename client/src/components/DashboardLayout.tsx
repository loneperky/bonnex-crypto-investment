import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import {
  Home,
  CreditCard,
  Banknote,
  FileText,
  Signal,
  TrendingUp,
  User,
  BarChart3,
  Bell,
  Menu,
  X,
  LogOut,
  Sun
} from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: CreditCard, label: 'Deposit Funds', path: '/dashboard/deposit' },
    { icon: Banknote, label: 'Withdraw Funds', path: '/dashboard/withdraw' },
    { icon: FileText, label: 'Fund Log', path: '/dashboard/fund-log' },
    { icon: Signal, label: 'Purchase Signals', path: '/dashboard/signals' },
    { icon: TrendingUp, label: 'Upgrade Account', path: '/dashboard/upgrade' },
    { icon: User, label: 'My Plan', path: '/dashboard/plan' },
    { icon: BarChart3, label: 'Profit History', path: '/dashboard/profit-history' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  useEffect(() => {
    const getUserDetails = () => {
      if (user) {
        return {
          full_name: user.email || 'Username',
          email: user.email || 'No email provided'
        };
      } else {
        return {
          full_name: 'Guest',
          email: 'No email provided'
        };
      }
    };
    getUserDetails()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Bonnex Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            <Bell size={24} className="text-gray-600 dark:text-gray-400" />

          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Bonnex</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 border-b border-gray-200 dark:border-gray-700">

          <div className="flex items-center space-x-3">

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{user?.full_name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
         
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;