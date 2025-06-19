import React from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle, Heart, Calendar } from 'lucide-react';

export function MeetAgentsScreen() {
  const agents = [
    {
      name: 'Crisis Detection Agent',
      description: 'Analyzes emotional tone in messages to detect urgency',
      icon: Brain,
      color: 'from-blue-100 to-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      name: 'Escalation Agent',
      description: 'Determines when to activate emergency protocols or hotlines',
      icon: AlertTriangle,
      color: 'from-orange-100 to-orange-200',
      iconColor: 'text-orange-600'
    },
    {
      name: 'Support Agent',
      description: 'Finds relevant resources and peer connections',
      icon: Heart,
      color: 'from-purple-100 to-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      name: 'Follow-up Agent',
      description: 'Ensures continued care after a crisis',
      icon: Calendar,
      color: 'from-green-100 to-green-200',
      iconColor: 'text-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-support p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Meet the Agents
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            BrainBloom is powered by a team of AI agents working together to provide immediate support during emotional distress. Each agent plays a unique role in understanding, evaluating, and responding to users' needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-gray-100/50"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${agent.color} rounded-xl flex items-center justify-center shadow-sm mb-4`}>
                  <Icon size={24} className={agent.iconColor} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{agent.name}</h3>
                <p className="text-gray-600 text-sm">{agent.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-gray-100/50"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How We Work Together</h3>
          <p className="text-gray-600 text-sm mb-4">
            Our AI agents collaborate seamlessly to provide comprehensive support. When you reach out, they work in harmony to understand your needs, assess the situation, and provide appropriate care and resources.
          </p>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-lg p-4">
            <p className="text-primary-800 text-sm">
              Remember: While our AI agents are here to help, they're designed to work alongside human support systems. In crisis situations, they'll always prioritize connecting you with real human support.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 