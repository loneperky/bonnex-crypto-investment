import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Wallet, Target, Bell, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useTransx } from '../../contexts/TransxContext';
import { useAuth } from '../../contexts/AuthContext';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const { transactions } = useTransx();

  const stats = [
    {
      title: 'Total Balance',
      value: `$${(user?.balance ?? 0).toLocaleString()}`,
      icon: Wallet,
      color: 'bg-blue-500',
      change: '+12.5%',
      isPositive: true
    },
    {
      title: 'Active Investment',
      value: `$${(user?.totalInvestment ?? 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+5.2%',
      isPositive: true
    },
    {
      title: 'Total Profit',
      value: `$${(user?.totalProfit ?? 0).toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-yellow-500',
      change: '+18.7%',
      isPositive: true
    },
    {
      title: 'ROI',
      value: '0%',
      icon: Target,
      color: 'bg-purple-500',
      change: '+2.1%',
      isPositive: false
    }
  ];

  const recentTransactions = [
    { id: 1, type: 'Deposit', amount: 5000, date: '2024-01-15', status: 'Completed' },
    { id: 2, type: 'Profit', amount: 750, date: '2024-01-14', status: 'Completed' },
    { id: 3, type: 'Withdrawal', amount: 2000, date: '2024-01-13', status: 'Pending' },
    { id: 4, type: 'Profit', amount: 600, date: '2024-01-12', status: 'Completed' }
  ];

  const notifications = [
    { id: 1, message: 'Weekly profit of $750 has been credited to your account', time: '2 hours ago' },
    { id: 2, message: 'Your Premium Plan is active and performing well', time: '1 day ago' },
    { id: 3, message: 'Investment signal alert: BTC showing strong bullish trend', time: '2 days ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.full_name}!</h1>
        <p className="text-blue-100">
          Your investments are performing well. You've earned ${(user?.totalProfit ?? 0).toLocaleString()} in profits since joining.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.trnxId} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'Deposit' ? 'bg-green-100 text-green-600' :
                    transaction.type === 'Withdrawal' ? 'bg-red-100 text-red-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                    {transaction.type === 'Deposit' ? '↓' :
                      transaction.type === 'Withdrawal' ? '↑' : '$'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{transaction.type}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.type === 'Withdrawal' ? 'text-red-600' : 'text-green-600'
                    }`}>
                    {transaction.type === 'Withdrawal' ? '-' : '+'}${transaction.amount.toLocaleString()}
                  </p>
                  <p className={`text-sm ${transaction.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Bell className="text-gray-600 dark:text-gray-400" size={20} />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
          </div>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-900 dark:text-white mb-2">{notification.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                  <Calendar size={12} />
                  <span>{notification.time}</span>
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Investment Plan Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Investment Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">{user?.plan}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">10%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Weekly ROI</p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">Next Payout</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">3 days</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Estimated: $1,500</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h3 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">Plan Status</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">Active</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Since {user?.joinDate}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;