import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { showError, showSuccess } from '../utils/toast';
import supabase from '../config/supabaseClient';

const ResetPasswordPage: React.FC = () => {
  const { fetchUser } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();

  // ✅ Detect recovery session on mount
  useEffect(() => {
    const checkRecovery = async () => {
      const hash = window.location.hash;
      if (hash.includes('type=recovery')) {
        setIsRecovery(true);

        // Refresh recovery session from Supabase
        await supabase.auth.refreshSession();

        const { data, error } = await supabase.auth.getSession();
        if (!data?.session) {
          console.warn("No session found during recovery.");
        }
      }
    };

    checkRecovery();
  }, []);

  // ✅ Handle password reset
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showError('Passwords do not match');
      return;
    }

    // 1. Update user password in Supabase
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      showError(updateError.message);
      return;
    }

    // 2. Optional: Check if user has a profile in DB (not critical)
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      showError('Failed to retrieve user data after reset.');
      return;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userData.user.id)
      .single();

    if (profileError) {
      console.warn('No profile found in Supabase for this user.');
    }

    // 3. Fetch full backend profile and update context
    await fetchUser();

    // 4. Success
    showSuccess('Password updated!');
    navigate('/dashboard', { replace: true });

    // 5. Clean up URL hash (optional)
    window.history.replaceState(null, '', window.location.pathname);
  };

  // 🛑 Invalid recovery attempt
  if (!isRecovery) {
    return (
      <div className="text-center mt-10 text-red-600">
        Invalid password recovery session.
      </div>
    );
  }

  // ✅ UI
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Reset Your Password</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Enter your new password below</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleReset}>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Enter new password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm new password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!newPassword || !confirmPassword}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Reset Password
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
