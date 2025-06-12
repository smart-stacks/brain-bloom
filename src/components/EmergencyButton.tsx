import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface EmergencyButtonProps {
  onClick: () => void;
  variant?: 'header' | 'large';
}

export function EmergencyButton({ onClick, variant = 'header' }: EmergencyButtonProps) {
  if (variant === 'large') {
    return (
      <motion.button
        onClick={onClick}
        className="w-full bg-crisis-500 hover:bg-crisis-600 text-white font-bold py-6 px-8 rounded-xl shadow-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(239, 68, 68, 0.7)',
            '0 0 0 10px rgba(239, 68, 68, 0)',
            '0 0 0 0 rgba(239, 68, 68, 0)'
          ]
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <div className="flex items-center justify-center space-x-3">
          <AlertTriangle size={32} />
          <span className="text-2xl">GET HELP NOW</span>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className="bg-crisis-500 hover:bg-crisis-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ 
        scale: { 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <AlertTriangle size={16} />
      <span>Emergency</span>
    </motion.button>
  );
}