import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Star, Clock, Target, Shield, Zap, Crown, Award, Gem } from 'lucide-react';

const PurchaseSignals: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('');

  const signalPlans = [
    {
      id: 'basic',
      name: 'Basic Signals',
      price: 500,
      period: 'month',
      icon: Star,
      color: 'bg-blue-500',
      popular: false,
      features: [
        '5 signals per week',
        'Basic market analysis',
        'Email notifications',
        '24/7 customer support'
      ],
      accuracy: '75%',
      avgProfit: '8-12%'
    },
    {
      id: 'premium',
      name: 'Premium Signals',
      price: 1500,
      period: 'month',
      icon: Crown,
      color: 'bg-yellow-500',
      popular: true,
      features: [
        '10 signals per week',
        'Advanced technical analysis',
        'Real-time notifications',
        'Priority support',
        'Risk management tips',
        'Market trend reports'
      ],
      accuracy: '85%',
      avgProfit: '15-20%'
    },
    {
      id: 'professional',
      name: 'Professional Signals',
      price: 5000,
      period: 'month',
      icon: Award,
      color: 'bg-purple-500',
      popular: false,
      features: [
        '15 signals per week',
        'Expert market analysis',
        'Instant push notifications',
        'VIP support channel',
        'Personal trading advisor',
        'Weekly strategy calls',
        'Custom risk assessment'
      ],
      accuracy: '90%',
      avgProfit: '20-25%'
    },
    {
      id: 'elite',
      name: 'Elite Signals',
      price: 10000,
      period: 'month',
      icon: Gem,
      color: 'bg-red-500',
      popular: false,
      features: [
        'Unlimited signals',
        'AI-powered analysis',
        'Multi-channel alerts',
        'Dedicated account manager',
        'Private trading group',
        'Daily market briefings',
        'Portfolio optimization',
        'Exclusive market insights'
      ],
      accuracy: '95%',
      avgProfit: '25-35%'
    },
    {
      id: 'vip',
      name: 'VIP Signals',
      price: 15000,
      period: 'month',
      icon: Zap,
      color: 'bg-green-500',
      popular: false,
      features: [
        'Premium unlimited signals',
        'Real-time market data',
        'Advanced AI predictions',
        'Personal trading mentor',
        'Exclusive VIP community',
        'Live trading sessions',
        'Custom strategy development',
        'Priority market access',
        '1-on-1 consultations'
      ],
      accuracy: '98%',
      avgProfit: '30-40%'
    },
    {
      id: 'master',
      name: 'Master Trader',
      price: 25000,
      period: 'month',
      icon: Target,
      color: 'bg-indigo-500',
      popular: false,
      features: [
        'Master-level signals',
        'Institutional-grade analysis',
        'Multi-asset coverage',
        'Expert trading team access',
        'Private mastermind group',
        'Weekly profit reviews',
        'Advanced risk management',
        'Market maker insights',
        'Exclusive trading tools',
        'Performance guarantees'
      ],
      accuracy: '99%',
      avgProfit: '35-50%'
    }
  ];

  const recentSignals = [
    {
      id: 1,
      pair: 'BTC/USDT',
      type: 'BUY',
      entry: 42350,
      target: 45000,
      stopLoss: 40500,
      status: 'Active',
      profit: '+6.2%',
      time: '2 hours ago'
    },
    {
      id: 2,
      pair: 'ETH/USDT',
      type: 'SELL',
      entry: 2645,
      target: 2500,
      stopLoss: 2750,
      status: 'Completed',
      profit: '+5.5%',
      time: '4 hours ago'
    },
    {
      id: 3,
      pair: 'BNB/USDT',
      type: 'BUY',
      entry: 315,
      target: 335,
      stopLoss: 305,
      status: 'Active',
      profit: '+3.8%',
      time: '6 hours ago'
    }
  ];

  const navigate = useNavigate()

  const handlePurchase = (planId: string) => {
    setSelectedPlan(planId);
    console.log('Purchasing plan:', planId);
  };

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Purchase Trading Signals</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get professional trading signals from our expert analysts and boost your trading success.
        </p>
      </motion.div>

      {/* Signal Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {signalPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all ${plan.popular ? 'ring-2 ring-yellow-400' : ''
              }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <div className={`inline-flex p-3 rounded-full ${plan.color} mb-4`}>
                <plan.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                ${plan.price}
                <span className="text-lg text-gray-500 dark:text-gray-400">/{plan.period}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">{plan.accuracy}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Profit</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{plan.avgProfit}</p>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => { handlePurchase(plan.id); handleSignalClick(plan.price); }}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${plan.popular
                ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400'
                }`}
            >
              Choose Plan
            </button>
          </motion.div>
        ))}
      </div>

      {/* Recent Signals Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Signal Performance</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Pair</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Entry</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Target</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Stop Loss</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Profit</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentSignals.map((signal) => (
                <tr key={signal.id} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{signal.pair}</td>
                  <td className="py-3 px-4">
                    <span className={`flex items-center space-x-1 ${signal.type === 'BUY' ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {signal.type === 'BUY' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      <span>{signal.type}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">${signal.entry.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">${signal.target.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">${signal.stopLoss.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${signal.status === 'Completed'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      }`}>
                      {signal.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-green-600 dark:text-green-400">
                    {signal.profit}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{signal.time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Why Choose Our Signals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Our Trading Signals?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-2">High Accuracy</h3>
            <p className="text-blue-100">Our signals maintain an average accuracy rate of 85-99% across all plans.</p>
          </div>
          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Risk Management</h3>
            <p className="text-blue-100">Every signal includes proper risk management with stop-loss and take-profit levels.</p>
          </div>
          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Alerts</h3>
            <p className="text-blue-100">Get instant notifications via email, SMS, and mobile app push notifications.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseSignals;