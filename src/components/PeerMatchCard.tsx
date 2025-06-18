import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Circle } from 'lucide-react';
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
      className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
    >
      <div className="flex items-start space-x-3">
        <div className="text-3xl">{peer.avatar}</div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
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
            <div className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">
              {peer.matchPercentage}% match
            </div>
          </div>
          
          <p className="text-gray-700 text-sm mb-3">{peer.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {peer.specialties.map((specialty) => (
              <span
                key={specialty}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                {specialty}
              </span>
            ))}
          </div>
          
          <motion.button
            onClick={() => onConnect(peer.id)}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!peer.isOnline}
          >
            <MessageCircle size={16} />
            <span>{peer.isOnline ? 'Connect' : 'Unavailable'}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}