import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Message, PeerProfile, Resource, MoodEntry, AgentStatus, CrisisAlert } from '../types';

interface AppState {
  messages: Message[];
  isTyping: boolean;
  crisisAlert: CrisisAlert | null;
  peers: PeerProfile[];
  resources: Resource[];
  moods: MoodEntry[];
  agents: AgentStatus[];
  userLocation: { lat: number; lng: number } | null;
}

type AppAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_CRISIS_ALERT'; payload: CrisisAlert | null }
  | { type: 'SET_PEERS'; payload: PeerProfile[] }
  | { type: 'SET_RESOURCES'; payload: Resource[] }
  | { type: 'ADD_MOOD_ENTRY'; payload: MoodEntry }
  | { type: 'SET_AGENTS'; payload: AgentStatus[] }
  | { type: 'SET_LOCATION'; payload: { lat: number; lng: number } };

const initialState: AppState = {
  messages: [],
  isTyping: false,
  crisisAlert: null,
  peers: [],
  resources: [],
  moods: [],
  agents: [],
  userLocation: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    case 'SET_CRISIS_ALERT':
      return { ...state, crisisAlert: action.payload };
    case 'SET_PEERS':
      return { ...state, peers: action.payload };
    case 'SET_RESOURCES':
      return { ...state, resources: action.payload };
    case 'ADD_MOOD_ENTRY':
      return { ...state, moods: [...state.moods, action.payload] };
    case 'SET_AGENTS':
      return { ...state, agents: action.payload };
    case 'SET_LOCATION':
      return { ...state, userLocation: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch({
            type: 'SET_LOCATION',
            payload: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
        () => {
          // Default to San Francisco if location access denied
          dispatch({
            type: 'SET_LOCATION',
            payload: { lat: 37.7749, lng: -122.4194 },
          });
        }
      );
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}