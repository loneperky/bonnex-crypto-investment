import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { showError, showSuccess } from '../utils/toast';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const { forgotPassword, isLoading } = useAuth();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await forgotPassword(email);

    if (!response.success) {
      showError(response.message);
      console.error('Forgot Password Error:', response.message);
      return;
    }

    showSuccess(response.message);
    setEmail('');
    console.log('Reset password email sent:', response);
  } catch (err) {
    console.error('Unexpected Error:', err);
    showError('Something went wrong. Try again later.');
  }
};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Account Recovery
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Enter your registered email address
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-600 dark:text-gray-300">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
