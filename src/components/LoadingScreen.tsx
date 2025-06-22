import React from 'react';
import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-support">
      <div className="text-center">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-soft"
        >
          <span className="text-white font-bold text-2xl">BB</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold gradient-text mb-2"
        >
          BrainBloom
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-lg mb-8"
        >
          Loading your peaceful space...
        </motion.p>
        
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex justify-center space-x-2"
        >
          <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
          <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
          <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
        </motion.div>
      </div>
    </div>
  );
} 