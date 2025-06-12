import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, MapPin, AlertTriangle, Shield } from 'lucide-react';
import { EmergencyButton } from '../components/EmergencyButton';

export function EmergencyScreen() {
  const emergencyContacts = [
    {
      title: '988 Suicide & Crisis Lifeline',
      subtitle: '24/7 free and confidential support',
      phone: '988',
      icon: Phone,
      color: 'bg-primary-500 hover:bg-primary-600',
    },
    {
      title: 'Crisis Text Line',
      subtitle: 'Text HOME to 741741',
      phone: '741741',
      icon: MessageSquare,
      color: 'bg-secondary-500 hover:bg-secondary-600',
    },
    {
      title: 'Emergency Services',
      subtitle: 'For immediate danger',
      phone: '911',
      icon: AlertTriangle,
      color: 'bg-crisis-500 hover:bg-crisis-600',
    },
  ];

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleMarkSafe = () => {
    // Would typically update user status and navigate back
    alert('Glad you\'re safe. We\'re here if you need us again.');
  };

  return (
    <div className="min-h-screen bg-gradient-calm p-4">
      <div className="max-w-md mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Emergency Support</h1>
          <p className="text-gray-600">Help is available right now. You are not alone.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <EmergencyButton onClick={() => {}} variant="large" />
        </motion.div>

        <div className="space-y-3">
          {emergencyContacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.button
                key={contact.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCall(contact.phone)}
                className={`w-full ${contact.color} text-white p-4 rounded-xl flex items-center space-x-4 shadow-md`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={24} />
                <div className="text-left">
                  <h3 className="font-semibold">{contact.title}</h3>
                  <p className="text-sm opacity-90">{contact.subtitle}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 shadow-md"
        >
          <div className="flex items-center space-x-2 mb-3">
            <MapPin className="text-primary-500" size={20} />
            <h3 className="font-semibold text-gray-900">Nearby Crisis Centers</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Based on your location, we found 3 crisis centers within 5 miles.
          </p>
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg">
            View Crisis Centers
          </button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={handleMarkSafe}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Shield size={20} />
          <span>I'm Safe Now</span>
        </motion.button>
      </div>
    </div>
  );
}