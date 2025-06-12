import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, TrendingUp, Circle } from 'lucide-react';
import { AgentStatus } from '../types';

interface AgentStatusCardProps {
  agent: AgentStatus;
}

export function AgentStatusCard({ agent }: AgentStatusCardProps) {
  const statusColors = {
    active: 'text-green-500',
    processing: 'text-yellow-500',
    idle: 'text-gray-500',
    error: 'text-red-500',
  };

  const statusLabels = {
    active: 'Active',
    processing: 'Processing',
    idle: 'Idle',
    error: 'Error',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{agent.name}</h3>
        <div className="flex items-center space-x-1">
          <Circle
            size={8}
            className={`${statusColors[agent.status]} ${
              agent.status === 'active' || agent.status === 'processing' ? 'fill-current' : ''
            }`}
          />
          <span className={`text-sm font-medium ${statusColors[agent.status]}`}>
            {statusLabels[agent.status]}
          </span>
        </div>
      </div>

      {agent.currentTask && (
        <div className="mb-3">
          <p className="text-sm text-gray-600">{agent.currentTask}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center space-x-2">
          <Clock size={16} className="text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Response Time</p>
            <p className="text-sm font-medium">{agent.responseTime}s</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <TrendingUp size={16} className="text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Success Rate</p>
            <p className="text-sm font-medium">{agent.successRate}%</p>
          </div>
        </div>
      </div>

      {agent.status === 'processing' && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-500 h-2 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}