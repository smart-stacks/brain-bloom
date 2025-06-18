import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, List } from 'lucide-react';
import { ResourceCard } from '../components/ResourceCard';
import { useApp } from '../context/AppContext';
import { mockApi } from '../services/mockApi';

export function ResourceScreen() {
  const { state, dispatch } = useApp();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

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
      <div className="min-h-screen bg-gradient-calm flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Finding resources near you...</p>
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Resources</h1>
          <p className="text-gray-600">Find mental health support near you</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl p-4 shadow-md space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search therapists, centers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              <option value="therapist">Therapists</option>
              <option value="crisis_center">Crisis Centers</option>
              <option value="support_group">Support Groups</option>
              <option value="hospital">Hospitals</option>
            </select>

            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-md ${viewMode === 'map' ? 'bg-white shadow-sm' : ''}`}
              >
                <MapPin size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {viewMode === 'map' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-4 shadow-md h-60 flex items-center justify-center"
          >
            <div className="text-center text-gray-500">
              <MapPin size={48} className="mx-auto mb-2" />
              <p>Map view would be implemented here</p>
              <p className="text-sm">Showing {filteredResources.length} resources</p>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredResources.length} Resources Found
          </h2>

          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ResourceCard resource={resource} onBook={handleBook} />
            </motion.div>
          ))}

          {filteredResources.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-gray-500">No resources found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                }}
                className="mt-2 text-primary-500 hover:text-primary-600 font-medium"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}