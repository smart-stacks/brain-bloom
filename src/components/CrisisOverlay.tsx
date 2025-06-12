import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageSquare, MapPin, AlertTriangle } from 'lucide-react';
import { CrisisAlert } from '../types';

interface CrisisOverlayProps {
  alert: CrisisAlert | null;
  onClose: () => void;
}

export function CrisisOverlay({ alert, onClose }: CrisisOverlayProps) {
  const handleEmergencyAction = (action: string) => {
    switch (action) {
      case 'Call 988':
        window.open('tel:988', '_self');
        break;
      case 'Contact Emergency Services':
        window.open('tel:911', '_self');
        break;
      case 'Find Nearby Crisis Center':
        // Would navigate to resources with crisis center filter
        break;
    }
  };

  return (
    <AnimatePresence>
      {alert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-crisis-500" size={24} />
                <h2 className="text-xl font-bold text-gray-900">Crisis Support Needed</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-gray-700 mb-6">{alert.message}</p>

            <div className="space-y-3 mb-6">
              <motion.button
                onClick={() => handleEmergencyAction('Call 988')}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={20} />
                <span>Call 988 Suicide & Crisis Lifeline</span>
              </motion.button>

              <motion.button
                onClick={() => handleEmergencyAction('Contact Emergency Services')}
                className="w-full bg-crisis-500 hover:bg-crisis-600 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AlertTriangle size={20} />
                <span>Call 911 Emergency</span>
              </motion.button>

              <motion.button
                onClick={() => handleEmergencyAction('Find Nearby Crisis Center')}
                className="w-full bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MapPin size={20} />
                <span>Find Nearby Crisis Center</span>
              </motion.button>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-blue-800">
                <strong>Remember:</strong> You are not alone. Help is available 24/7. 
                These feelings are temporary, and there are people who care about you.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}