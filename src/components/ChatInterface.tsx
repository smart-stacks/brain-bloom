import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Heart, Flower2, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockApi } from '../services/mockApi';
import { Message } from '../types';

// Background animation variants
const backgroundVariants = {
  animate: {
    x: [0, 40, 0],
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "mirror" as const
    }
  }
};

const glowVariants = {
  animate: {
    opacity: [0.2, 0.35, 0.2],
    scale: [1, 1.05, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "mirror" as const
    }
  }
};

export function ChatInterface() {
  const { state, dispatch } = useApp();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages, state.isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    dispatch({ type: 'SET_TYPING', payload: true });
    setInputValue('');

    try {
      const response = await mockApi.sendMessage(userMessage.content);
      dispatch({ type: 'ADD_MESSAGE', payload: response.message });
      
      if (response.crisisAlert) {
        dispatch({ type: 'SET_CRISIS_ALERT', payload: response.crisisAlert });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      dispatch({ type: 'SET_TYPING', payload: false });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderWelcomeMessage = () => {
    if (state.messages.length > 0) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-4 mt-8"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-soft"
        >
          <Flower2 size={32} className="text-primary-600" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 text-center"
        >
          You're not alone
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base italic text-gray-600 text-center max-w-md mx-auto mt-2 leading-relaxed"
        >
          We're here to listen, support, and help you through whatever you're experiencing.
        </motion.p>
      </motion.div>
    );
  };

  return (
    <div className="relative flex flex-col h-full isolate">
      {/* Background Effects Container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base Gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-200/90 via-white to-purple-200/90"
          style={{ zIndex: -3 }}
        />

        {/* Animated Gradient Motion Veil */}
        <motion.div
          initial="animate"
          animate="animate"
          variants={backgroundVariants}
          className="absolute inset-0 bg-gradient-to-br from-indigo-100/40 via-transparent to-purple-100/40"
          style={{ zIndex: -2 }}
        />

        {/* Breathing Glow Effect */}
        <motion.div
          initial="animate"
          animate="animate"
          variants={glowVariants}
          className="absolute inset-0"
          style={{ 
            zIndex: -1,
            background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)'
          }}
        />

        {/* Corner Gradients */}
        <div 
          className="absolute -bottom-24 -left-24 w-96 h-96 blur-2xl"
          style={{ 
            zIndex: -1,
            background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute -bottom-24 -right-24 w-96 h-96 blur-2xl"
          style={{ 
            zIndex: -1,
            background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.15) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative flex-1 flex flex-col min-h-0 bg-white/20 backdrop-blur-[2px]">
        <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col min-h-0">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {renderWelcomeMessage()}
            
            <AnimatePresence mode="popLayout">
              {state.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 1
                  }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} group mb-4`}
                >
                  <motion.div
                    className={`relative max-w-[280px] sm:max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-soft ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white ml-8 sm:ml-12'
                        : message.type === 'crisis'
                        ? 'bg-gradient-to-r from-orange-50 to-red-50 text-orange-800 border border-orange-200 mr-8 sm:mr-12'
                        : 'bg-white/95 backdrop-blur-sm text-gray-800 border border-gray-100/50 mr-8 sm:mr-12'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="flex items-start space-x-3">
                      {message.sender === 'ai' && (
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center shadow-sm">
                          <Flower2 size={18} className="text-indigo-600 sm:w-5 sm:h-5" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                        <div className="flex items-center justify-end mt-1.5 space-x-1.5">
                          {message.type === 'crisis' && (
                            <Sparkles size={12} className="text-orange-500 sm:w-3 sm:h-3" />
                          )}
                          <span className={`text-[11px] sm:text-xs ${
                            message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>

            {state.isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start mb-4"
              >
                <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-soft border border-gray-100/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center shadow-sm">
                      <Flower2 size={18} className="text-indigo-600 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex space-x-1.5">
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-indigo-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-indigo-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-indigo-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Container */}
          <div className="mt-auto border-t border-gray-200/30">
            <div className="max-w-2xl mx-auto px-4 py-4">
              <div className="flex space-x-3">
                <motion.input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="How are you feeling today?"
                  className="flex-1 min-h-[44px] px-4 py-3 bg-white/90 border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent shadow-soft text-sm sm:text-base placeholder-gray-400"
                  disabled={state.isTyping}
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || state.isTyping}
                  className={`min-h-[44px] min-w-[44px] p-3 rounded-xl shadow-soft flex items-center justify-center ${
                    inputValue.trim() && !state.isTyping
                      ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  whileHover={inputValue.trim() && !state.isTyping ? { scale: 1.05 } : {}}
                  whileTap={inputValue.trim() && !state.isTyping ? { scale: 0.95 } : {}}
                >
                  <Send size={18} className="sm:w-5 sm:h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}