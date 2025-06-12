import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Star, Clock, CreditCard } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{resource.name}</h3>
          <div className="flex items-center space-x-1 mt-1">
            <Star size={16} className="text-yellow-500 fill-current" />
            <span className="text-sm text-gray-600">{resource.rating}</span>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${availabilityColors[resource.availability]}`}>
          {availabilityLabels[resource.availability]}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin size={16} />
          <span>{resource.address}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone size={16} />
          <span>{resource.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <CreditCard size={16} />
          <span>{resource.acceptsInsurance ? 'Accepts Insurance' : 'Private Pay'}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {resource.specialties.map((specialty) => (
          <span
            key={specialty}
            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
          >
            {specialty}
          </span>
        ))}
      </div>

      <div className="flex space-x-2">
        <motion.button
          onClick={() => window.open(`tel:${resource.phone}`, '_self')}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Phone size={16} />
          <span>Call</span>
        </motion.button>
        
        {onBook && (
          <motion.button
            onClick={() => onBook(resource.id)}
            className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Book
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}