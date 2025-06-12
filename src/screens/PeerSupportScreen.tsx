import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Shield } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-calm flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Finding your support matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-calm p-4">
      <div className="max-w-md mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Peer Support</h1>
          <p className="text-gray-600">Connect with others who understand your journey</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-blue-50 rounded-xl p-4 border border-blue-200"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="text-blue-600" size={20} />
            <h3 className="font-semibold text-blue-900">Safety Guidelines</h3>
          </div>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• All conversations are monitored for safety</li>
            <li>• No personal information sharing required</li>
            <li>• Report any concerning behavior immediately</li>
            <li>• Professional help is always available</li>
          </ul>
        </motion.div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Users size={20} />
            <span>Your Matches</span>
          </h2>

          {state.peers.map((peer, index) => (
            <motion.div
              key={peer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PeerMatchCard peer={peer} onConnect={handleConnect} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-4 shadow-md"
        >
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <MessageCircle size={20} />
            <span>Active Support Groups</span>
          </h3>
          
          <div className="space-y-3">
            {[
              { name: 'Anxiety Support Circle', members: 12, active: true },
              { name: 'Depression Recovery Group', members: 8, active: true },
              { name: 'Mindfulness & Coping', members: 15, active: false },
            ].map((group) => (
              <div
                key={group.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{group.name}</h4>
                  <p className="text-sm text-gray-600">{group.members} members</p>
                </div>
                <button
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    group.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {group.active ? 'Join' : 'Next: Tomorrow'}
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}