import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import type { ApiResponse } from '../types';

// Add Vite env type declaration
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const get = async <T>(url: string, params?: any): Promise<ApiResponse<T>> => {
  return api.get(url, { params });
};

export const post = async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
  return api.post(url, data);
};

export const put = async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
  return api.put(url, data);
};

export const del = async <T>(url: string): Promise<ApiResponse<T>> => {
  return api.delete(url);
};

export default api; 