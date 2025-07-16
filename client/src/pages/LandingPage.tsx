import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, DollarSign, Users, Star, ArrowRight, Check, LogOut } from 'lucide-react';

const LandingPage: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Professional Trader",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "Bonnex has transformed my investment strategy. The consistent returns and professional support are exceptional.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "I've been investing with Bonnex for 6 months and the results speak for themselves. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Financial Advisor",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "The platform is intuitive and the investment plans are well-structured. Great for both beginners and experts.",
      rating: 5
    }
  ];

  const plans = [
    {
      name: "Starter Plan",
      price: "$500",
      roi: "5%",
      period: "weekly",
      features: [
        "Minimum investment: $500",
        "5% ROI weekly",
        "24/7 customer support",
        "Basic analytics dashboard",
        "Mobile app access"
      ],
      popular: false
    },
    {
      name: "Premium Plan",
      price: "$3,000",
      roi: "10%",
      period: "weekly",
      features: [
        "Minimum investment: $3,000",
        "10% ROI weekly",
        "Priority customer support",
        "Advanced analytics",
        "Dedicated account manager",
        "Investment signals"
      ],
      popular: true
    },
    {
      name: "Platinum Plan",
      price: "$5,000",
      roi: "15%",
      period: "weekly",
      features: [
        "Minimum investment: $5,000",
        "15% ROI weekly",
        "VIP customer support",
        "Premium analytics suite",
        "Personal investment advisor",
        "Exclusive market insights",
        "Early access to new features"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Invest Smart in <span className="text-yellow-400">Cryptocurrency</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of investors who trust Bonnex for secure, profitable cryptocurrency investments.
                Start earning consistent returns with our proven investment strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center"
                >
                  Get Started Today
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <a
                  href="#about"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors text-center"
                >
                  Learn More
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Investment Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Investments</span>
                    <span className="font-bold text-yellow-400">$2.4M+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Investors</span>
                    <span className="font-bold text-yellow-400">1,200+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average ROI</span>
                    <span className="font-bold text-green-400">12.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Success Rate</span>
                    <span className="font-bold text-green-400">98.7%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='about' className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Why Choose Bonnex?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with proven investment strategies to deliver consistent results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure & Trusted",
                description: "Bank-level security with multi-layer encryption and secure wallet management."
              },
              {
                icon: TrendingUp,
                title: "Proven Results",
                description: "Consistent returns with transparent reporting and real-time performance tracking."
              },
              {
                icon: DollarSign,
                title: "Profitable Returns",
                description: "Competitive ROI rates with flexible investment plans to suit your goals."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="text-blue-600 dark:text-blue-400" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Plans Section */}
      <section id='plans' className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Investment Plans
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose the perfect investment plan that matches your financial goals and risk tolerance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow ${plan.popular ? 'border-2 border-yellow-400' : ''
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {plan.roi}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    ROI {plan.period}
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-200 mt-2">
                    Starting from {plan.price}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                      <Check className="text-green-500 mr-3" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`w-full py-3 rounded-lg font-semibold transition-colors text-center block ${plan.popular
                      ? 'bg-yellow-500 text-blue-900 hover:bg-yellow-400'
                      : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400'
                    }`}
                >
                  Choose Plan
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id='testimonial' className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              What Our Investors Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of satisfied investors who trust Bonnex with their cryptocurrency investments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>

                <p className="text-gray-700 dark:text-gray-300 italic">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join Bonnex today and start earning consistent returns on your cryptocurrency investments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center justify-center"
              >
                Start Investing Now
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;