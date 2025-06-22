import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Message, PeerProfile, Resource, MoodEntry, AgentStatus, CrisisAlert } from '../types';
import { authService, User } from '../services/auth';

interface AppState {
  messages: Message[];
  isTyping: boolean;
  crisisAlert: CrisisAlert | null;
  peers: PeerProfile[];
  resources: Resource[];
  moods: MoodEntry[];
  agents: AgentStatus[];
  userLocation: { lat: number; lng: number } | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type AppAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_CRISIS_ALERT'; payload: CrisisAlert | null }
  | { type: 'SET_PEERS'; payload: PeerProfile[] }
  | { type: 'SET_RESOURCES'; payload: Resource[] }
  | { type: 'ADD_MOOD_ENTRY'; payload: MoodEntry }
  | { type: 'SET_AGENTS'; payload: AgentStatus[] }
  | { type: 'SET_LOCATION'; payload: { lat: number; lng: number } }
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'INIT_USER'; payload: User | null };

const initialState: AppState = {
  messages: [],
  isTyping: false,
  crisisAlert: null,
  peers: [],
  resources: [],
  moods: [],
  agents: [],
  userLocation: null,
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true to check auth state
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
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
    case 'LOGIN':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true,
        isLoading: false 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false,
        isLoading: false 
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'INIT_USER':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: !!action.payload,
        isLoading: false 
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize user from localStorage on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        dispatch({ type: 'INIT_USER', payload: currentUser });
      } catch (error) {
        console.error('Error initializing auth:', error);
        dispatch({ type: 'INIT_USER', payload: null });
      }
    };

    initializeAuth();
  }, []);

  // Login function using auth service
  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await authService.login({ email, password });
      dispatch({ type: 'LOGIN', payload: response.user });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  // Google login function using auth service
  const loginWithGoogle = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await authService.loginWithGoogle();
      dispatch({ type: 'LOGIN', payload: response.user });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

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
    <AppContext.Provider value={{ state, dispatch, login, loginWithGoogle, logout }}>
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