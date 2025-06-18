import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, MapPin, BarChart3, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'peers', icon: Users, label: 'Peers' },
    { id: 'resources', icon: MapPin, label: 'Resources' },
    { id: 'progress', icon: BarChart3, label: 'Progress' },
    { id: 'monitor', icon: Settings, label: 'Monitor' },
  ];

  return (
    <nav className="bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <Icon size={20} />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"
                  />
                )}
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}