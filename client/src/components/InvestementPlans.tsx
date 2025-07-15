import {
  Shield, Star, Crown, Award, Gem, Target, Zap

} from "lucide-react";
export const investmentPlans = [
  {
    id: 'none',
    name: 'No Plan',
    price: 0,
    roi: 0,
    period: 'none',
    tier: 0,
    icon: Shield,
    color: 'bg-gray-500',
    popular: false,
    savings: 0,
    features: ['No active investment plan'],
    benefits: ['Free account access', 'Explore plans anytime']
  },

  {
    id: 'starter',
    name: 'Starter Plan',
    price: 500,
    roi: 5,
    period: 'weekly',
    tier: 1,
    icon: Star,
    color: 'bg-blue-500',
    popular: false,
    savings: 0,
    features: [
      'Minimum investment: $500',
      '5% ROI weekly',
      'Basic customer support',
      'Standard analytics dashboard',
      'Mobile app access',
      'Email notifications',
      'Basic market insights'
    ],
    benefits: [
      'Perfect for beginners',
      'Low risk investment',
      'Steady returns'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 3000,
    roi: 10,
    period: 'weekly',
    tier: 2,
    icon: Crown,
    color: 'bg-yellow-500',
    popular: true,
    savings: 0,
    features: [
      'Minimum investment: $3,000',
      '10% ROI weekly',
      'Priority customer support',
      'Advanced analytics dashboard',
      'Dedicated account manager',
      'Investment signals included',
      'Real-time notifications',
      'Weekly market reports'
    ],
    benefits: [
      'Most popular choice',
      'Balanced risk-reward',
      'Professional support'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum Plan',
    price: 5000,
    roi: 15,
    period: 'weekly',
    tier: 3,
    icon: Award,
    color: 'bg-purple-500',
    popular: false,
    savings: 200,
    features: [
      'Minimum investment: $5,000',
      '15% ROI weekly',
      'VIP customer support',
      'Premium analytics suite',
      'Personal investment advisor',
      'Exclusive market insights',
      'Priority signal access',
      'Custom risk assessment',
      'Monthly strategy calls'
    ],
    benefits: [
      'Higher returns',
      'VIP treatment',
      'Exclusive insights'
    ]
  },
  {
    id: 'diamond',
    name: 'Diamond Plan',
    price: 10000,
    roi: 20,
    period: 'weekly',
    tier: 4,
    icon: Gem,
    color: 'bg-indigo-500',
    popular: false,
    savings: 500,
    features: [
      'Minimum investment: $10,000',
      '20% ROI weekly',
      'Elite customer support',
      'Advanced AI analytics',
      'Dedicated investment team',
      'Private market access',
      'Institutional-grade signals',
      'Risk management tools',
      'Weekly profit reviews',
      'Custom portfolio optimization'
    ],
    benefits: [
      'Maximum returns',
      'Elite status',
      'Institutional access'
    ]
  },
  {
    id: 'elite',
    name: 'Elite Plan',
    price: 25000,
    roi: 25,
    period: 'weekly',
    tier: 5,
    icon: Target,
    color: 'bg-red-500',
    popular: false,
    savings: 1000,
    features: [
      'Minimum investment: $25,000',
      '25% ROI weekly',
      'White-glove service',
      'AI-powered predictions',
      'Private investment team',
      'Exclusive trading opportunities',
      'Market maker insights',
      'Advanced risk management',
      'Daily profit optimization',
      'Private mastermind access',
      'Guaranteed profit protection'
    ],
    benefits: [
      'Ultimate returns',
      'Exclusive access',
      'Guaranteed protection'
    ]
  },
  {
    id: 'vip',
    name: 'VIP Plan',
    price: 50000,
    roi: 30,
    period: 'weekly',
    tier: 6,
    icon: Zap,
    color: 'bg-green-500',
    popular: false,
    savings: 2000,
    features: [
      'Minimum investment: $50,000',
      '30% ROI weekly',
      'Concierge service',
      'Quantum AI analysis',
      'Private wealth management',
      'Exclusive investment vehicles',
      'Direct market access',
      'Hedge fund strategies',
      'Real-time profit optimization',
      'Private equity opportunities',
      'Wealth preservation strategies',
      'Tax optimization services'
    ],
    benefits: [
      'Wealth management',
      'Exclusive opportunities',
      'Tax optimization'
    ]
  }
];