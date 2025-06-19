import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, MessageCircle, AlertTriangle, Users, CreditCard } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ElementType;
  color: string;
}

export function FAQScreen() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'Is my information private?',
      answer: 'Yes, BrainBloom is anonymous and encrypted. We take your privacy seriously and use industry-standard encryption to protect your data. Your conversations are confidential and we never share your personal information.',
      icon: Shield,
      color: 'from-blue-100 to-blue-200'
    },
    {
      question: 'Is this a real therapist?',
      answer: 'BrainBloom uses AI agents with human support escalation. While our AI agents are trained to provide emotional support, they work alongside human professionals. In crisis situations, you\'ll be connected with real human support immediately.',
      icon: MessageCircle,
      color: 'from-purple-100 to-purple-200'
    },
    {
      question: 'What happens if I\'m in a crisis?',
      answer: 'The system will detect urgency and offer real-time emergency options. Our Crisis Detection Agent monitors conversations for signs of crisis and can immediately connect you with emergency services, crisis hotlines, or nearby crisis centers.',
      icon: AlertTriangle,
      color: 'from-orange-100 to-orange-200'
    },
    {
      question: 'Can I talk to a real person?',
      answer: 'Yes, you may be connected to a peer or professional depending on need. Our system is designed to provide both AI support and human connection. You can request to speak with a real person at any time, and in crisis situations, human support is prioritized.',
      icon: Users,
      color: 'from-green-100 to-green-200'
    },
    {
      question: 'Is this free to use?',
      answer: 'Yes, BrainBloom is free and accessible for everyone. We believe mental health support should be available to all, regardless of financial circumstances. Our service is completely free to use, with no hidden costs or premium features.',
      icon: CreditCard,
      color: 'from-indigo-100 to-indigo-200'
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
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Find answers to common questions about BrainBloom
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-soft border border-gray-100/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 bg-gradient-to-br ${faq.color} rounded-lg flex items-center justify-center shadow-sm flex-shrink-0`}>
                      <Icon size={20} className="text-gray-700" />
                    </div>
                    <span className="text-left font-medium text-gray-900">{faq.question}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} className="text-gray-500" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-600 text-sm">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl p-6"
        >
          <h3 className="font-semibold text-primary-900 mb-2">Still have questions?</h3>
          <p className="text-primary-800 text-sm">
            We're here to help. If you can't find what you're looking for, please reach out through our chat interface. Our support team is always ready to assist you.
          </p>
        </motion.div>
      </div>
    </div>
  );
} 