import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <motion.nav 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 px-4 py-3 pb-safe shadow-soft"
    >
      <div className="max-w-md mx-auto">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex flex-col items-center space-y-1 min-h-[44px] min-w-[44px] p-3 sm:p-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="relative p-2.5 sm:p-2 rounded-lg"
                  animate={{
                    backgroundColor: isActive ? 'rgba(102, 126, 234, 0.1)' : 'transparent'
                  }}
                >
                  <Icon size={24} className="relative z-10 sm:w-6 sm:h-6" />
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary-100 rounded-lg"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.div>
                <motion.span 
                  className="text-xs sm:text-sm font-medium"
                  animate={{
                    color: isActive ? '#4c51bf' : '#6b7280'
                  }}
                >
                  {tab.label}
                </motion.span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 sm:w-1 sm:h-1 bg-primary-600 rounded-full"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}