import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, List, Sliders, X } from 'lucide-react';
import { ResourceCard } from '../components/ResourceCard';
import { useApp } from '../context/AppContext';
import { mockApi } from '../services/mockApi';

export function ResourceScreen() {
  const { state, dispatch } = useApp();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      try {
        const resources = await mockApi.getResources(state.userLocation || undefined);
        dispatch({ type: 'SET_RESOURCES', payload: resources });
      } catch (error) {
        console.error('Failed to load resources:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, [dispatch, state.userLocation]);

  const handleBook = (resourceId: string) => {
    // Would typically navigate to booking flow
    alert('Booking feature would be implemented here');
  };

  const filteredResources = state.resources.filter((resource) => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || resource.type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-support flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <MapPin size={24} className="text-primary-500" />
            </motion.div>
          </div>
          <p className="text-gray-600 font-medium">Finding resources near you...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-support p-4">
      <div className="max-w-md mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Resources
          </h1>
          <p className="text-gray-600">Find mental health support near you</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-gray-100 space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search therapists, centers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
            />
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </motion.button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-xl border transition-colors ${
                showFilters
                  ? 'bg-primary-50 border-primary-200 text-primary-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sliders size={18} />
              <span className="font-medium">Filters</span>
              {filterType !== 'all' && (
                <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full text-xs">
                  1
                </span>
              )}
            </motion.button>

            <div className="flex bg-gray-100 rounded-xl p-1">
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <List size={18} className={viewMode === 'list' ? 'text-primary-600' : 'text-gray-600'} />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'map' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MapPin size={18} className={viewMode === 'map' ? 'text-primary-600' : 'text-gray-600'} />
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resource Type
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="therapist">Therapists</option>
                    <option value="crisis_center">Crisis Centers</option>
                    <option value="support_group">Support Groups</option>
                    <option value="hospital">Hospitals</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {viewMode === 'map' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-gray-100 h-60 flex items-center justify-center"
          >
            <div className="text-center text-gray-500">
              <MapPin size={48} className="mx-auto mb-2 text-primary-500" />
              <p className="font-medium">Map view coming soon</p>
              <p className="text-sm mt-1">Showing {filteredResources.length} resources in your area</p>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-semibold text-gray-900 flex items-center justify-between"
          >
            <span>{filteredResources.length} Resources Found</span>
            {filterType !== 'all' && (
              <motion.button
                onClick={() => setFilterType('all')}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear filters
              </motion.button>
            )}
          </motion.h2>

          <AnimatePresence mode="popLayout">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
              >
                <ResourceCard resource={resource} onBook={handleBook} />
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredResources.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-gray-100"
            >
              <Search size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 font-medium">No resources found matching your criteria</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search terms</p>
              <motion.button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                  setShowFilters(false);
                }}
                className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset all filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}