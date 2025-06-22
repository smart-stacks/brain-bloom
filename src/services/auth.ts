export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

class AuthService {
  private readonly STORAGE_KEY = 'brainbloom_user';
  private readonly TOKEN_KEY = 'brainbloom_token';

  // Get current user from localStorage
  getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem(this.STORAGE_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  // Get auth token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Save user data to localStorage
  private saveUser(user: User, token?: string): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    if (token) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  // Remove user data from localStorage
  private clearUser(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Mock login with email/password
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }

    if (credentials.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Mock successful login
    const user: User = {
      id: '1',
      name: credentials.email.split('@')[0], // Use email prefix as name
      email: credentials.email,
      avatar: undefined,
    };

    const token = `mock_token_${Date.now()}`;
    
    this.saveUser(user, token);
    
    return { user, token };
  }

  // Mock Google OAuth login
  async loginWithGoogle(): Promise<AuthResponse> {
    // Simulate Google OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock Google user data
    const user: User = {
      id: 'google-1',
      name: 'Alex Johnson',
      email: 'alex.johnson@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    };

    const token = `google_token_${Date.now()}`;
    
    this.saveUser(user, token);
    
    return { user, token };
  }

  // Logout
  logout(): void {
    this.clearUser();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  // Refresh user data (for future use with real API)
  async refreshUser(): Promise<User | null> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    // In a real app, you would make an API call here
    // For now, just return the current user
    return currentUser;
  }
}

export const authService = new AuthService(); 