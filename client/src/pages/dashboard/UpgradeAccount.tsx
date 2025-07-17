import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Zap, Target, Shield, TrendingUp, CheckCircle, ArrowRight, Award, Gem } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { investmentPlans } from '../../components/InvestementPlans';
import { useTransx } from '../../contexts/TransxContext';
import AdComponent from '../../components/AdComponent';
const UpgradeAccount: React.FC = () => {
  const { user, fetchUser } = useAuth();
  const { handleUpgrade } = useTransx();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [showComparison, setShowComparison] = useState(false);



 

  const currentPlan = investmentPlans.find(p => p.id === user?.plan) || {
    name: 'No Plan',
    price: 0,
    roi: 0,
    tier: 0,
  };



  const upgradeStats = {
    totalUsers: 12500,
    avgIncrease: 85,
    satisfaction: 98.5,
    avgUpgradeTime: '24 hours'
  };

  const handleUpgradeFunc = async (planId: string) => {
    try {
      await handleUpgrade(planId)
      await fetchUser(); // Refresh user data after upgrade
      setSelectedPlan(planId);
      console.log(`Successfully upgraded to plan: ${planId}`);
    } catch (error: any) {
      console.error('Upgrade failed:', error.response?.data?.error || error.message);
      return;
    }

  };

  const getUpgradeDiscount = (plan: any) => {
    if (plan.tier <= currentPlan.tier) return 0;
    const tierDiff = plan.tier - currentPlan.tier;
    return Math.min(tierDiff * 5, 20); // Max 20% discount
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Upgrade Your Account</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Unlock higher returns and premium features with our advanced investment plans.
        </p>
      </motion.div>

      {/* Current Plan Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Current Plan: {currentPlan.name}</h2>
            <p className="text-blue-100">
              You're earning {currentPlan.roi}% weekly returns on your ${currentPlan.price.toLocaleString()} investment
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{currentPlan.roi}%</p>
            <p className="text-blue-100">Weekly ROI</p>
          </div>
        </div>
      </motion.div>

      {/* Upgrade Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Users Upgraded', value: upgradeStats.totalUsers.toLocaleString(), icon: TrendingUp },
          { label: 'Avg Profit Increase', value: `${upgradeStats.avgIncrease}%`, icon: ArrowRight },
          { label: 'Satisfaction Rate', value: `${upgradeStats.satisfaction}%`, icon: Star },
          { label: 'Avg Upgrade Time', value: upgradeStats.avgUpgradeTime, icon: Shield }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <stat.icon className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Plan Comparison Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex justify-center"
      >
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {showComparison ? 'Hide' : 'Show'} Plan Comparison
        </button>
      </motion.div>

      {/* Investment Plans Grid */}
      <AdComponent />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investmentPlans.map((plan, index) => {
          const discount = getUpgradeDiscount(plan);
          const isUpgrade = plan.tier > currentPlan.tier;
          const isDowngrade = plan.tier < currentPlan.tier;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border transition-all hover:shadow-lg ${user?.plan === plan.id
                ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                : plan.popular
                  ? 'border-yellow-400 ring-2 ring-yellow-200 dark:ring-yellow-800'
                  : 'border-gray-200 dark:border-gray-700'
                }`}
            >
              {user?.plan === plan.id && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Current Plan
                  </span>
                </div>
              )}

              {plan.popular && user?.plan !== plan.id && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {discount > 0 && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {discount}% OFF
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
                  {plan.roi}%
                  <span className="text-lg text-gray-500 dark:text-gray-400"> weekly</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  From ${plan.price.toLocaleString()}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Benefits:</h4>
                <ul className="space-y-2">
                  {plan.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="text-green-500 mr-2" size={16} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {showComparison && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">All Features:</h4>
                  <ul className="space-y-1 max-h-32 overflow-y-auto">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-xs text-gray-600 dark:text-gray-400">
                        <div className="w-1 h-1 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => handleUpgradeFunc(plan.id)}
                disabled={user?.plan === plan.id}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${user?.plan === plan.id
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : isUpgrade
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : isDowngrade
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}

              >
                {user?.plan === plan.id
                  ? 'Current Plan'
                  : isUpgrade
                    ? `Upgrade to ${plan.name}`
                    : isDowngrade
                      ? `Downgrade to ${plan.name}`
                      : `Switch to ${plan.name}`
                }

              </button>

              {isUpgrade && (
                <p className="text-center text-sm text-green-600 dark:text-green-400 mt-2">
                  Increase your weekly returns by {plan.roi - currentPlan.roi}%
                </p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Upgrade Process */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">How Upgrading Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: 1, title: 'Choose Plan', description: 'Select your desired investment plan' },
            { step: 2, title: 'Add Funds', description: 'Deposit the difference to your account' },
            { step: 3, title: 'Instant Activation', description: 'Your new plan activates immediately' },
            { step: 4, title: 'Higher Returns', description: 'Start earning increased weekly profits' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        className="bg-gradient-to-r from-green-600 to-green-800 text-white p-8 rounded-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Why Upgrade Your Plan?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Higher Returns</h3>
            <p className="text-green-100">Earn significantly more with higher ROI percentages on your investments.</p>
          </div>
          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Premium Support</h3>
            <p className="text-green-100">Get priority customer service and dedicated account management.</p>
          </div>
          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Exclusive Features</h3>
            <p className="text-green-100">Access advanced analytics, signals, and investment opportunities.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UpgradeAccount;