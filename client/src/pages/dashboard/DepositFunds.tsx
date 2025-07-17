import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTransx } from '../../contexts/TransxContext'
import { Copy, CheckCircle, AlertCircle, Bitcoin, DollarSign } from 'lucide-react';
import AdComponent from '../../components/AdComponent';
const DepositFunds: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedMethod, setSelectedMethod] = useState('bitcoin');
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const { deposit, addTransaction } = useTransx()

  const walletAddresses = {
    bitcoin: '1DLjafrbENzz2bhLctxpUMZ2SSrxPPsWBQ',
    ethereum: '0x710b6e01c301a0658c714c7186aa24996376e985',
    litecoin: 'LiZ9Kk14UfCK6PuNvZPSZnReyknwuoLav3',
    usdt: '0x710b6e01c301a0658c714c7186aa24996376e985'
  };

  const depositMethods = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', icon: Bitcoin, color: 'text-orange-500', network: "BTC" },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: Bitcoin, color: 'text-blue-500', network: "ERC20" },
    { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', icon: Bitcoin, color: 'text-gray-500', network: "LTC" },
    { id: 'usdt', name: 'Tether', symbol: 'USDT', icon: Bitcoin, color: 'text-green-500', network: "ERC20" }
  ];

  useEffect(() => {
    const amountParam = searchParams.get('amount');
    if (amountParam) {
      setAmount(amountParam);
    }
  }, [searchParams]);

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle deposit confirmation
    addTransaction(parseFloat(amount), 'deposit', selectedMethod, 'Pending');
    alert(`Deposit of $${amount} worth of ${depositMethods.find(m => m.id === selectedMethod)?.symbol} submitted!,wait while we confirm your deposit`);
    console.log('Deposit submitted:', { method: selectedMethod, amount });
    setAmount('');
    setSelectedMethod('bitcoin'); // Reset to default method

  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Deposit Funds</h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deposit Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Deposit Method</h2>
          <AdComponent />
          
          {/* Deposit Methods */}
          <div className="space-y-4 mb-6">
            {depositMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <method.icon className={`${method.color}`} size={24} />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{method.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{method.symbol}</p>
                  </div>
                  <div className="ml-auto">
                    {selectedMethod === method.id && (
                      <CheckCircle className="text-blue-500" size={20} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deposit Amount (USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter amount"
                  min="500"
                  required
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Minimum deposit: $500
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Confirm Deposit
            </button>
          </form>


          <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You are about to deposit <span className="font-semibold">{amount}</span> {depositMethods.find(m => m.id === selectedMethod)?.symbol}.
            </p>
          </div>
        </motion.div>

        {/* Wallet Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Information</h2>

          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="text-yellow-600 dark:text-yellow-400" size={20} />
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Important</h3>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Send your payment to the wallet address below. Your deposit will be credited after 3 confirmations.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {depositMethods.find(m => m.id === selectedMethod)?.name} Wallet Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={walletAddresses[selectedMethod as keyof typeof walletAddresses]}
                  readOnly
                  className="w-full pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />

                <button
                  type="button"
                  onClick={() => handleCopy(walletAddresses[selectedMethod as keyof typeof walletAddresses])}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Copy size={20} />
                </button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  Address copied to clipboard!
                </p>
              )}
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Deposit Instructions</h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Send only {depositMethods.find(m => m.id === selectedMethod)?.symbol} to this address</li>
                <li>* Confirm that it's the correct network  {depositMethods.find(m => m.id === selectedMethod)?.network}</li>
                <li>• Minimum deposit amount is $500</li>
                <li>• Deposits are processed after 3 network confirmations</li>
                <li>• Contact support if you need assistance</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Deposits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Deposits</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Date & Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Method</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {deposit?.map((deposit, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">
                    {new Date(deposit.created_at).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{deposit.method}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{deposit.amount}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      {deposit.status}
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

export default DepositFunds;