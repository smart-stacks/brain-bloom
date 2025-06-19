import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageCircle, Shield, AlertCircle, Heart, Star } from 'lucide-react';
import { PeerMatchCard } from '../components/PeerMatchCard';
import { useApp } from '../context/AppContext';
import { mockApi } from '../services/mockApi';

export function PeerSupportScreen() {
  const { state, dispatch } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPeers = async () => {
      try {
        const peers = await mockApi.getPeers();
        dispatch({ type: 'SET_PEERS', payload: peers });
      } catch (error) {
        console.error('Failed to load peers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPeers();
  }, [dispatch]);

  const handleConnect = (peerId: string) => {
    // Would typically navigate to a private chat or request connection
    alert('Connection request sent! They will be notified.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-support flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Heart size={24} className="text-primary-500" />
            </motion.div>
          </div>
          <p className="text-gray-600 font-medium">Finding your support matches...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-support p-4">
      <div className="max-w-md mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Peer Support
          </h1>
          <p className="text-gray-600">Connect with others who understand your journey</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-indigo-100"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-sm">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Safety Guidelines</h3>
              <p className="text-sm text-gray-600">Your well-being is our priority</p>
            </div>
          </div>
          <ul className="space-y-3">
            {[
              { icon: Shield, text: 'All conversations are monitored for safety' },
              { icon: AlertCircle, text: 'No personal information sharing required' },
              { icon: Star, text: 'Report any concerning behavior immediately' },
              { icon: Heart, text: 'Professional help is always available' },
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 text-sm text-gray-700"
              >
                <item.icon size={16} className="text-primary-500 mt-1 flex-shrink-0" />
                <span>{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-semibold text-gray-900 flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-sm">
              <Users size={18} className="text-white" />
            </div>
            <span>Your Matches</span>
          </motion.h2>

          <AnimatePresence mode="popLayout">
            {state.peers.map((peer, index) => (
              <motion.div
                key={peer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
              >
                <PeerMatchCard peer={peer} onConnect={handleConnect} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-gray-100"
        >
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-sm">
              <MessageCircle size={18} className="text-white" />
            </div>
            <span>Active Support Groups</span>
          </h3>
          
          <div className="space-y-3">
            {[
              { name: 'Anxiety Support Circle', members: 12, active: true, time: 'Now' },
              { name: 'Depression Recovery Group', members: 8, active: true, time: 'In 30 min' },
              { name: 'Mindfulness & Coping', members: 15, active: false, time: 'Tomorrow' },
            ].map((group, index) => (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-100"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{group.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <Users size={14} className="text-gray-500" />
                    <p className="text-sm text-gray-600">{group.members} members</p>
                    <span className="text-xs text-gray-500">• {group.time}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    group.active
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {group.active ? 'Join Now' : 'Set Reminder'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}