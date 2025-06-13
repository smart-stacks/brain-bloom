export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai' | 'system';
  timestamp: Date;
  type?: 'normal' | 'crisis' | 'warning';
}

export interface PeerProfile {
  id: string;
  avatar: string;
  description: string;
  matchPercentage: number;
  isOnline: boolean;
  specialties: string[];
}

export interface Resource {
  id: string;
  name: string;
  type: 'therapist' | 'crisis_center' | 'hospital' | 'support_group';
  address: string;
  phone: string;
  rating: number;
  availability: 'immediate' | 'same_day' | 'within_week';
  acceptsInsurance: boolean;
  latitude: number;
  longitude: number;
  specialties: string[];
}

export interface MoodEntry {
  id: string;
  date: Date;
  mood: number; // 1-10
  notes?: string;
  triggers?: string[];
}

export interface AgentStatus {
  id: string;
  name: string;
  status: 'active' | 'processing' | 'idle' | 'error';
  currentTask?: string;
  responseTime: number;
  successRate: number;
}

export interface CrisisAlert {
  id: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  actions: string[];
}

// Common types used throughout the application

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Add more type definitions as needed