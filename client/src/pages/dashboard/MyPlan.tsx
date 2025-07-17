import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, Calendar, TrendingUp, DollarSign, Clock, Target, Award, CheckCircle } from 'lucide-react';
import { investmentPlans } from '../../components/InvestementPlans';
import { useAuth } from '../../contexts/AuthContext';
import { useTransx } from '../../contexts/TransxContext'
const MyPlan: React.FC = () => {
  const { transactions } = useTransx()
  const { user } = useAuth()
  const navigate = useNavigate()

  const userPlan = investmentPlans.find(p => p.id === user?.plan);

  // 1. Calculate total earned from transactions
  const totalEarned = transactions
    .filter(tx => tx.type === 'withdrawal' && tx.status === 'Completed') // or however you tag payouts
    .reduce((sum, tx) => sum + tx.amount, 0);

  // 2. Get plan start date from user's first investment transaction
  const investmentTx = transactions.find(tx => tx.type === "signal purchase"); // adjust based on your db
  const planStart = investmentTx ? new Date(investmentTx.created_at) : null;

  // 3. Estimate next payout as +7 days from latest payout
  const lastPayout = transactions
    .filter(tx => tx.type === "withdrawal")
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

  const nextPayout = lastPayout
    ? new Date(new Date(lastPayout.created_at).getTime() + 7 * 24 * 60 * 60 * 1000)
    : null;

  // 4. Estimate days remaining assuming a 1-year plan
  const today = new Date();
  const totalDays = 365;
  const daysRemaining = planStart
    ? Math.max(totalDays - Math.floor((today.getTime() - planStart.getTime()) / (1000 * 60 * 60 * 24)), 0)
    : 0;


  const planDetails = {
    name: userPlan?.name || 'No Plan',
    price: userPlan?.price || 0,
    roi: userPlan?.roi || 0,
    period: userPlan?.period || 'weekly',
    startDate: planStart ? planStart.toLocaleDateString() : 'Not available',
    nextPayout: nextPayout ? nextPayout.toLocaleDateString() : 'Not available',
    totalEarned,
    status: 'Active',
    daysRemaining,
    totalDays
  };


  const planFeatures = [
    'Minimum investment: $3,000',
    '10% ROI weekly',
    'Priority customer support',
    'Advanced analytics dashboard',
    'Dedicated account manager',
    'Investment signals included',
    'Risk management tools',
    'Mobile app access'
  ];

  // const payoutHistory = [
  //   { date: '2024-01-15', amount: 300, status: 'Completed' },
  //   { date: '2024-01-08', amount: 300, status: 'Completed' },
  //   { date: '2024-01-01', amount: 300, status: 'Completed' },
  //   { date: '2023-12-25', amount: 300, status: 'Completed' },
  //   { date: '2023-12-18', amount: 300, status: 'Completed' }
  // ];

  const availablePlans = [
    {
      name: 'Starter Plan',
      price: 500,
      roi: 5,
      period: 'weekly',
      features: ['Basic support', 'Standard analytics', 'Mobile access']
    },
    {
      name: 'Platinum Plan',
      price: 5000,
      roi: 15,
      period: 'weekly',
      features: ['VIP support', 'Premium analytics', 'Personal advisor', 'Exclusive insights']
    }
  ];

  const progressPercentage = ((365 - planDetails.daysRemaining) / 365) * 100;

  const handleSignalClick = (price: number) => {
    navigate(`/dashboard/deposit?amount=${price}`)
    console.log('Signal clicked:', price);
  };


  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Investment Plan</h1>
      </motion.div>

      {/* Current Plan Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-full">
              <Crown className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{planDetails.name}</h2>
              <p className="text-blue-100">Active since {planDetails.startDate}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{planDetails.roi}%</p>
            <p className="text-blue-100">ROI {planDetails.period}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-blue-100 mb-1">Investment Amount</p>
            <p className="text-2xl font-bold">${planDetails.price.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-blue-100 mb-1">Total Earned</p>
            <p className="text-2xl font-bold text-green-300">${planDetails.totalEarned.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-blue-100 mb-1">Next Payout</p>
            <p className="text-2xl font-bold">{planDetails.nextPayout}</p>
          </div>
          <div className="text-center">
            <p className="text-blue-100 mb-1">Days Remaining</p>
            <p className="text-2xl font-bold">{planDetails.daysRemaining}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-blue-100 mb-2">
            <span>Plan Progress</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plan Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Award className="text-blue-600" size={20} />
            <span>Plan Features</span>
          </h2>

          <ul className="space-y-3">
            {planFeatures.map((feature, index) => (
              <li key={index} className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Plan Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <TrendingUp className="text-green-600" size={20} />
            <span>Performance Stats</span>
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300">Total ROI</span>
              <span className="font-bold text-green-600 dark:text-green-400">
                {((planDetails.totalEarned / planDetails.price) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300">Weekly Earnings</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                ${(planDetails.price * planDetails.roi / 100).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300">Expected Annual Return</span>
              <span className="font-bold text-yellow-600 dark:text-yellow-400">
                ${(planDetails.price * planDetails.roi / 100 * 52).toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Payout History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <DollarSign className="text-green-600" size={20} />
          <span>Recent Payouts</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">ROI</th>
              </tr>
            </thead>
            <tbody>
              {transactions
                .filter(tx => tx.type === 'withdrawal' && tx.status === 'Completed')
                .map((payout, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span>{new Date(payout?.created_at).toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-green-600 dark:text-green-400">
                      +${payout.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        {payout.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      {planDetails.roi}%
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Upgrade Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Target className="text-purple-600" size={20} />
          <span>Upgrade Your Plan</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availablePlans.map((plan, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {plan.roi}% <span className="text-sm text-gray-500">weekly</span>
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Minimum: ${plan.price.toLocaleString()}
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => handleSignalClick(plan.price)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Upgrade to {plan.name}
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MyPlan;