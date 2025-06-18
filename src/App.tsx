import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { EmergencyButton } from './components/EmergencyButton';
import { ChatScreen } from './screens/ChatScreen';
import { EmergencyScreen } from './screens/EmergencyScreen';
import { PeerSupportScreen } from './screens/PeerSupportScreen';
import { ResourceScreen } from './screens/ResourceScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { MonitorScreen } from './screens/MonitorScreen';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [showEmergency, setShowEmergency] = useState(false);

  const handleEmergencyClick = () => {
    setShowEmergency(true);
  };

  const renderScreen = () => {
    if (showEmergency) {
      return <EmergencyScreen />;
    }

    switch (activeTab) {
      case 'chat':
        return <ChatScreen />;
      case 'peers':
        return <PeerSupportScreen />;
      case 'resources':
        return <ResourceScreen />;
      case 'progress':
        return <ProgressScreen />;
      case 'monitor':
        return <MonitorScreen />;
      default:
        return <ChatScreen />;
    }
  };

  return (
    <AppProvider>
      <div className="h-screen flex flex-col bg-gradient-primary">
        {/* Header */}
        <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BB</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">BrainBloom</h1>
          </div>
          
          {!showEmergency && (
            <EmergencyButton onClick={handleEmergencyClick} />
          )}
          
          {showEmergency && (
            <button
              onClick={() => setShowEmergency(false)}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Back
            </button>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {renderScreen()}
        </main>

        {/* Navigation */}
        {!showEmergency && (
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        )}
      </div>
    </AppProvider>
  );
}

export default App;