import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Award, Smile, Frown, Meh } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockApi } from '../services/mockApi';

export function ProgressScreen() {
  const { state, dispatch } = useApp();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodNotes, setMoodNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moodOptions = [
    { value: 1, icon: Frown, label: 'Very Low', color: 'text-red-500' },
    { value: 2, icon: Frown, label: 'Low', color: 'text-orange-500' },
    { value: 3, icon: Meh, label: 'Okay', color: 'text-yellow-500' },
    { value: 4, icon: Smile, label: 'Good', color: 'text-green-500' },
    { value: 5, icon: Smile, label: 'Great', color: 'text-blue-500' },
  ];

  const handleMoodSubmit = async () => {
    if (!selectedMood) return;

    setIsSubmitting(true);
    try {
      const moodEntry = await mockApi.saveMoodEntry(selectedMood, moodNotes);
      dispatch({ type: 'ADD_MOOD_ENTRY', payload: moodEntry });
      setSelectedMood(null);
      setMoodNotes('');
    } catch (error) {
      console.error('Failed to save mood:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageMood = state.moods.length > 0 
    ? state.moods.reduce((sum, mood) => sum + mood.mood, 0) / state.moods.length 
    : 0;

  const streakDays = 7; // Mock streak data

  return (
    <div className="min-h-screen bg-gradient-calm p-4">
      <div className="max-w-md mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Progress</h1>
          <p className="text-gray-600">Track your mental health journey</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Mood Check-in</h2>
          
          <div className="grid grid-cols-5 gap-2 mb-4">
            {moodOptions.map((option) => {
              const Icon = option.icon;
              return (
                <motion.button
                  key={option.value}
                  onClick={() => setSelectedMood(option.value)}
                  className={`p-3 rounded-xl border-2 transition-colors ${
                    selectedMood === option.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={24} className={`mx-auto ${option.color}`} />
                  <p className="text-xs mt-1 text-gray-600">{option.label}</p>
                </motion.button>
              );
            })}
          </div>

          <textarea
            value={moodNotes}
            onChange={(e) => setMoodNotes(e.target.value)}
            placeholder="How are you feeling today? (optional)"
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={3}
          />

          <motion.button
            onClick={handleMoodSubmit}
            disabled={!selectedMood || isSubmitting}
            className="w-full mt-4 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
            whileHover={{ scale: selectedMood ? 1.02 : 1 }}
            whileTap={{ scale: selectedMood ? 0.98 : 1 }}
          >
            {isSubmitting ? 'Saving...' : 'Save Check-in'}
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-4 shadow-md"
          >
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="text-green-500" size={20} />
              <span className="font-semibold text-gray-900">Average Mood</span>
            </div>
            <p className="text-2xl font-bold text-primary-600">
              {averageMood > 0 ? averageMood.toFixed(1) : '--'}
            </p>
            <p className="text-sm text-gray-500">This week</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-4 shadow-md"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="text-blue-500" size={20} />
              <span className="font-semibold text-gray-900">Check-in Streak</span>
            </div>
            <p className="text-2xl font-bold text-primary-600">{streakDays}</p>
            <p className="text-sm text-gray-500">Days</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-md"
        >
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <Award className="text-yellow-500" size={20} />
            <span>Achievements</span>
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'First Check-in', earned: true, icon: '🎯' },
              { name: '7-Day Streak', earned: true, icon: '🔥' },
              { name: 'Resource Explorer', earned: false, icon: '🗺️' },
              { name: 'Support Connector', earned: false, icon: '🤝' },
            ].map((achievement) => (
              <div
                key={achievement.name}
                className={`p-3 rounded-lg border ${
                  achievement.earned
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="text-2xl mb-1">{achievement.icon}</div>
                <p className={`text-sm font-medium ${
                  achievement.earned ? 'text-yellow-800' : 'text-gray-500'
                }`}>
                  {achievement.name}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 shadow-md"
        >
          <h3 className="font-semibold text-gray-900 mb-3">Upcoming Appointments</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">Dr. Sarah Johnson</p>
                <p className="text-sm text-blue-700">Tomorrow, 2:00 PM</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Reschedule
              </button>
            </div>
            
            <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600">
              + Schedule New Appointment
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}