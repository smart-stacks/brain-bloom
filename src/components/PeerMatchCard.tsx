import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Circle, Star, Clock } from 'lucide-react';
import { PeerProfile } from '../types';

interface PeerMatchCardProps {
  peer: PeerProfile;
  onConnect: (peerId: string) => void;
}

export function PeerMatchCard({ peer, onConnect }: PeerMatchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-gray-100"
    >
      <div className="flex items-start space-x-4">
        <motion.div 
          className="text-4xl bg-gradient-primary rounded-xl p-3 shadow-sm"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {peer.avatar}
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Circle
                  size={8}
                  className={`${
                    peer.isOnline ? 'text-green-500 fill-current' : 'text-gray-400'
                  }`}
                />
                <span className="text-sm text-gray-600">
                  {peer.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              {peer.isOnline && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xs text-gray-500"
                >
                  <Clock size={12} className="inline mr-1" />
                  Active now
                </motion.div>
              )}
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-primary bg-clip-text text-transparent px-3 py-1 rounded-full text-sm font-medium border border-primary-200"
            >
              {peer.matchPercentage}% match
            </motion.div>
          </div>
          
          <p className="text-gray-700 text-sm leading-relaxed mb-4">{peer.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {peer.specialties.map((specialty) => (
              <motion.span
                key={specialty}
                whileHover={{ scale: 1.05 }}
                className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium border border-primary-100"
              >
                {specialty}
              </motion.span>
            ))}
          </div>
          
          <motion.button
            onClick={() => onConnect(peer.id)}
            className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors ${
              peer.isOnline
                ? 'bg-gradient-primary text-white hover:shadow-md'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={peer.isOnline ? { scale: 1.02 } : {}}
            whileTap={peer.isOnline ? { scale: 0.98 } : {}}
            disabled={!peer.isOnline}
          >
            <MessageCircle size={18} />
            <span>{peer.isOnline ? 'Connect Now' : 'Currently Unavailable'}</span>
            {peer.isOnline && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="ml-1"
              >
                <Star size={14} className="text-yellow-300" />
              </motion.div>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}