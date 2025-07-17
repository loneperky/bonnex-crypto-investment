import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, DollarSign, BarChart3, Filter, Download } from 'lucide-react';
import AdComponent from '../../components/AdComponent';

const ProfitHistory: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('30');
  const [viewType, setViewType] = useState('table');

  const profitData = [
    { date: '2024-01-15', amount: 300, type: 'Weekly ROI', plan: 'Premium Plan', percentage: 10 },
    { date: '2024-01-14', amount: 45, type: 'Referral Bonus', plan: 'Referral Program', percentage: 5 },
    { date: '2024-01-08', amount: 300, type: 'Weekly ROI', plan: 'Premium Plan', percentage: 10 },
    { date: '2024-01-07', amount: 25, type: 'Signal Profit', plan: 'Trading Signals', percentage: 8 },
    { date: '2024-01-01', amount: 300, type: 'Weekly ROI', plan: 'Premium Plan', percentage: 10 },
    { date: '2023-12-31', amount: 60, type: 'Bonus Profit', plan: 'Year-end Bonus', percentage: 12 },
    { date: '2023-12-25', amount: 300, type: 'Weekly ROI', plan: 'Premium Plan', percentage: 10 },
    { date: '2023-12-24', amount: 35, type: 'Signal Profit', plan: 'Trading Signals', percentage: 7 },
    { date: '2023-12-18', amount: 300, type: 'Weekly ROI', plan: 'Premium Plan', percentage: 10 },
    { date: '2023-12-15', amount: 80, type: 'Referral Bonus', plan: 'Referral Program', percentage: 8 },
    { date: '2023-12-11', amount: 300, type: 'Weekly ROI', plan: 'Premium Plan', percentage: 10 },
    { date: '2023-12-08', amount: 40, type: 'Signal Profit', plan: 'Trading Signals', percentage: 6 }
  ];

  const totalProfit = profitData.reduce((sum, profit) => sum + profit.amount, 0);
  const weeklyAverage = profitData.filter(p => p.type === 'Weekly ROI').reduce((sum, p) => sum + p.amount, 0) / 
                       profitData.filter(p => p.type === 'Weekly ROI').length;
  const monthlyTotal = profitData.filter(p => new Date(p.date).getMonth() === new Date().getMonth())
                                 .reduce((sum, p) => sum + p.amount, 0);

  const profitByType = profitData.reduce((acc, profit) => {
    acc[profit.type] = (acc[profit.type] || 0) + profit.amount;
    return acc;
  }, {} as Record<string, number>);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Weekly ROI':
        return 'text-blue-600 dark:text-blue-400';
      case 'Referral Bonus':
        return 'text-green-600 dark:text-green-400';
      case 'Signal Profit':
        return 'text-purple-600 dark:text-purple-400';
      case 'Bonus Profit':
        return 'text-yellow-600 dark:text-yellow-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Weekly ROI':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'Referral Bonus':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'Signal Profit':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      case 'Bonus Profit':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profit History</h1>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Profit</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${totalProfit.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <DollarSign className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Weekly Average</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${weeklyAverage.toFixed(0)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                ${monthlyTotal.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <BarChart3 className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Profit by Type */}

      <AdComponent />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profit Breakdown by Type</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(profitByType).map(([type, amount]) => (
            <div key={type} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{type}</h3>
              <p className={`text-xl font-bold ${getTypeColor(type)}`}>
                ${amount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {((amount / totalProfit) * 100).toFixed(1)}% of total
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Filters and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewType('table')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewType === 'table'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setViewType('chart')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewType === 'chart'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                Chart View
              </button>
            </div>
          </div>

          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </motion.div>

      {/* Profit History Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Detailed Profit History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700 dark:text-gray-300">Date</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700 dark:text-gray-300">Type</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700 dark:text-gray-300">Plan</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700 dark:text-gray-300">Amount</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700 dark:text-gray-300">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {profitData.map((profit, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Calendar size={16} />
                      <span>{profit.date}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeBadge(profit.type)}`}>
                      {profit.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-900 dark:text-white">
                    {profit.plan}
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      +${profit.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {profit.percentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfitHistory;