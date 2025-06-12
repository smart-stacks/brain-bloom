import React from 'react';
import { ChatInterface } from '../components/ChatInterface';
import { CrisisOverlay } from '../components/CrisisOverlay';
import { useApp } from '../context/AppContext';

export function ChatScreen() {
  const { state, dispatch } = useApp();

  const handleCloseCrisisAlert = () => {
    dispatch({ type: 'SET_CRISIS_ALERT', payload: null });
  };

  return (
    <div className="h-full bg-gradient-calm">
      <ChatInterface />
      <CrisisOverlay 
        alert={state.crisisAlert} 
        onClose={handleCloseCrisisAlert} 
      />
    </div>
  );
}