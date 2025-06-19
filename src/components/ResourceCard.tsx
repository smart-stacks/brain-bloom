import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Star, Clock, CreditCard, Building2, Users, Heart, AlertCircle } from 'lucide-react';
import { Resource } from '../types';

interface ResourceCardProps {
  resource: Resource;
  onBook?: (resourceId: string) => void;
}

export function ResourceCard({ resource, onBook }: ResourceCardProps) {
  const availabilityColors = {
    immediate: 'bg-green-100 text-green-800',
    same_day: 'bg-yellow-100 text-yellow-800',
    within_week: 'bg-blue-100 text-blue-800',
  };

  const availabilityLabels = {
    immediate: 'Available Now',
    same_day: 'Same Day',
    within_week: 'Within Week',
  };

  const typeIcons = {
    therapist: Building2,
    crisis_center: AlertCircle,
    hospital: Heart,
    support_group: Users,
  };

  const TypeIcon = typeIcons[resource.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-soft border border-gray-100"
    >
      <div className="flex items-start space-x-3 sm:space-x-4">
        <motion.div 
          className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-sm"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <TypeIcon size={20} className="text-white sm:w-6 sm:h-6" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{resource.name}</h3>
            <motion.div 
              className={`px-2 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium ${availabilityColors[resource.availability]}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {availabilityLabels[resource.availability]}
            </motion.div>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              <Star size={14} className="text-yellow-500 fill-current sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">{resource.rating}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-xs sm:text-sm text-gray-600 capitalize">{resource.type.replace('_', ' ')}</span>
          </div>

          <div className="space-y-2 mb-4">
            <motion.div 
              className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <MapPin size={14} className="text-primary-500 sm:w-4 sm:h-4" />
              <span className="truncate">{resource.address}</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Phone size={14} className="text-primary-500 sm:w-4 sm:h-4" />
              <span>{resource.phone}</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <CreditCard size={14} className="text-primary-500 sm:w-4 sm:h-4" />
              <span>{resource.acceptsInsurance ? 'Accepts Insurance' : 'Private Pay'}</span>
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            {resource.specialties.map((specialty) => (
              <motion.span
                key={specialty}
                className="bg-primary-50 text-primary-700 px-2 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium"
                whileHover={{ scale: 1.05, backgroundColor: '#E0E7FF' }}
                whileTap={{ scale: 0.95 }}
              >
                {specialty.replace('-', ' ')}
              </motion.span>
            ))}
          </div>

          <div className="flex space-x-2 sm:space-x-3">
            <motion.button
              onClick={() => window.open(`tel:${resource.phone}`, '_self')}
              className="flex-1 min-h-[44px] bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-3 sm:px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>Call</span>
            </motion.button>
            
            {onBook && (
              <motion.button
                onClick={() => onBook(resource.id)}
                className="flex-1 min-h-[44px] bg-gradient-primary text-white font-medium py-2.5 px-3 sm:px-4 rounded-xl flex items-center justify-center space-x-2 text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Clock size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>Book</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}