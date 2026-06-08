import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const stored = localStorage.getItem('sngpt_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem('sngpt_user');
      }
    }
    // Simulate a short loading check for realism
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const login = async () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
        const mockUser: User = {
            id: 'mock-user-1',
            name: 'Alex Rivera',
            email: 'alex@smartnotes.demo',
            avatar: 'https://i.pravatar.cc/150?img=11', 
            plan: 'pro'
        };
        setUser(mockUser);
        localStorage.setItem('sngpt_user', JSON.stringify(mockUser));
        setIsLoading(false);
    }, 800);
  };

  const logout = async () => {
    setIsLoading(true);
    setTimeout(() => {
        setUser(null);
        localStorage.removeItem('sngpt_user');
        setIsLoading(false);
    }, 500);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};