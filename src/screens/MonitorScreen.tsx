import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Server, Zap, AlertCircle } from 'lucide-react';
import { AgentStatusCard } from '../components/AgentStatusCard';
import { useApp } from '../context/AppContext';
import { mockApi } from '../services/mockApi';

export function MonitorScreen() {
  const { state, dispatch } = useApp();
  const [loading, setLoading] = useState(true);
  const [systemHealth, setSystemHealth] = useState<'healthy' | 'warning' | 'critical'>('healthy');

  useEffect(() => {
    const loadAgentStatus = async () => {
      try {
        const agents = await mockApi.getAgentStatus();
        dispatch({ type: 'SET_AGENTS', payload: agents });
        
        // Simulate system health based on agent status
        const errorAgents = agents.filter(a => a.status === 'error').length;
        if (errorAgents > 0) {
          setSystemHealth('critical');
        } else if (agents.some(a => a.successRate < 90)) {
          setSystemHealth('warning');
        } else {
          setSystemHealth('healthy');
        }
      } catch (error) {
        console.error('Failed to load agent status:', error);
        setSystemHealth('critical');
      } finally {
        setLoading(false);
      }
    };

    loadAgentStatus();

    // Simulate real-time updates every 5 seconds
    const interval = setInterval(loadAgentStatus, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const healthColors = {
    healthy: 'text-green-500',
    warning: 'text-yellow-500',
    critical: 'text-red-500',
  };

  const healthLabels = {
    healthy: 'All Systems Operational',
    warning: 'Performance Issues Detected',
    critical: 'Critical System Errors',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-calm flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading system status...</p>
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">System Monitor</h1>
          <p className="text-gray-600">Real-time AI agent status</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Server size={20} />
              <span>System Health</span>
            </h2>
            <div className={`flex items-center space-x-2 ${healthColors[systemHealth]}`}>
              <div className="w-3 h-3 rounded-full bg-current animate-pulse"></div>
              <span className="font-medium">{healthLabels[systemHealth]}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {state.agents.filter(a => a.status === 'active').length}
              </div>
              <div className="text-sm text-gray-500">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {state.agents.filter(a => a.status === 'processing').length}
              </div>
              <div className="text-sm text-gray-500">Processing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {state.agents.filter(a => a.status === 'error').length}
              </div>
              <div className="text-sm text-gray-500">Errors</div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Activity size={20} />
            <span>Agent Status</span>
          </h2>

          {state.agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AgentStatusCard agent={agent} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-4 shadow-md"
        >
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <Zap className="text-orange-500" size={20} />
            <span>Performance Metrics</span>
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Response Time</span>
              <span className="font-semibold">0.85s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Success Rate</span>
              <span className="font-semibold text-green-600">94.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Conversations</span>
              <span className="font-semibold">127</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Crisis Interventions Today</span>
              <span className="font-semibold text-red-600">3</span>
            </div>
          </div>
        </motion.div>

        {systemHealth !== 'healthy' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-xl p-4 ${
              systemHealth === 'critical' 
                ? 'bg-red-50 border border-red-200' 
                : 'bg-yellow-50 border border-yellow-200'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle 
                className={systemHealth === 'critical' ? 'text-red-500' : 'text-yellow-500'} 
                size={20} 
              />
              <h3 className={`font-semibold ${
                systemHealth === 'critical' ? 'text-red-900' : 'text-yellow-900'
              }`}>
                System Alert
              </h3>
            </div>
            <p className={`text-sm ${
              systemHealth === 'critical' ? 'text-red-700' : 'text-yellow-700'
            }`}>
              {systemHealth === 'critical' 
                ? 'Critical system errors detected. Support team has been notified.'
                : 'Performance degradation detected. Monitoring closely.'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}