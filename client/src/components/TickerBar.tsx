import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TickerBar: React.FC = () => {
  const [prices, setPrices] = useState([
    { symbol: 'BTC', price: 42350.50, change: 2.5 },
    { symbol: 'ETH', price: 2645.30, change: -1.2 },
    { symbol: 'BNB', price: 315.80, change: 3.8 },
    { symbol: 'AAPL', price: 192.75, change: 1.5 },
    { symbol: 'TSLA', price: 248.90, change: -0.8 },
    { symbol: 'GOOGL', price: 142.15, change: 2.1 },
    { symbol: 'MSFT', price: 378.25, change: 1.8 },
    { symbol: 'AMZN', price: 153.40, change: -0.5 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prevPrices => 
        prevPrices.map(price => ({
          ...price,
          price: price.price + (Math.random() - 0.5) * 10,
          change: (Math.random() - 0.5) * 8
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-blue-900 dark:bg-gray-900 text-white py-2 overflow-hidden">
      <motion.div
        className="flex space-x-8 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {prices.concat(prices).map((price, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm">
            <span className="font-semibold">{price.symbol}</span>
            <span className="text-yellow-400">${price.price.toFixed(2)}</span>
            <span className={`text-sm ${price.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {price.change >= 0 ? '+' : ''}{price.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TickerBar;