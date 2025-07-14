import React, { useState } from 'react';
import { motion, number } from 'framer-motion';
import { useTransx } from '../../contexts/TransxContext';
import { Copy, CheckCircle, AlertCircle, Bitcoin, DollarSign, Clock, Shield } from 'lucide-react';

const WithdrawFunds: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('bitcoin');
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState('');
  const { addTransaction, withdrawal } = useTransx()
  const [copied, setCopied] = useState(false);

  const withdrawalMethods = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', icon: Bitcoin, color: 'text-orange-500', fee: '0.0005 BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: Bitcoin, color: 'text-blue-500', fee: '0.01 ETH' },
    { id: 'USDT', name: 'Tether', symbol: 'USDT', icon: Bitcoin, color: 'text-gray-500', fee: '0.001 USDT' }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const parseNum = parseFloat(amount)
  const symbol: string | undefined = withdrawalMethods.find(m => m.id === selectedMethod)?.symbol

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction(parseNum, "withdrawal", String(symbol), "Pending")
    alert(`Withdrawal of ${amount} ${withdrawalMethods.find(m => m.id === selectedMethod)?.symbol} submitted! Please wait while we process your request.`);
    setAmount('');
    setWalletAddress('');
    setSelectedMethod('bitcoin'); // Reset to default method
    console.log('Withdrawal submitted:', { method: selectedMethod, amount, walletAddress });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Withdraw Funds</h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Withdrawal Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Withdrawal Request</h2>

          <div className="space-y-4 mb-6">
            {withdrawalMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <method.icon className={`${method.color}`} size={24} />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{method.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{method.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Fee: {method.fee}</p>
                    {selectedMethod === method.id && (
                      <CheckCircle className="text-blue-500 mt-1" size={20} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Withdrawal Amount (USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter amount"
                  min="100"
                  required
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Minimum withdrawal: $100
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your {withdrawalMethods.find(m => m.id === selectedMethod)?.name} Wallet Address
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your wallet address"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Request Withdrawal
            </button>
          </form>
        </motion.div>

        {/* Withdrawal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Withdrawal Information</h2>

          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="text-yellow-600 dark:text-yellow-400" size={20} />
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Processing Time</h3>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Withdrawals are processed within 24-48 hours during business days.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="text-blue-600 dark:text-blue-400" size={20} />
                  <h3 className="font-medium text-blue-800 dark:text-blue-200">Processing Hours</h3>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Monday - Friday<br />
                  9:00 AM - 6:00 PM EST
                </p>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="text-green-600 dark:text-green-400" size={20} />
                  <h3 className="font-medium text-green-800 dark:text-green-200">Security</h3>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  All withdrawals require<br />
                  email verification
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Withdrawal Limits</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Minimum: $100</li>
                <li>• Daily limit: $10,000</li>
                <li>• Monthly limit: $50,000</li>
                <li>• Network fees apply</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Withdrawals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Withdrawals</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Method</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {withdrawal?.map((withdraw, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{new Date(withdraw.created_at).toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{withdraw.method}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{withdraw.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${withdraw.status === 'Completed'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      }`}>
                      {withdraw.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleCopy(withdraw.id)}
                      className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      <span>{withdraw.id}</span>
                      <Copy size={14} />
                    </button>
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

export default WithdrawFunds;