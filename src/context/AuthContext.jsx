import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('nondan-user');
    const savedToken = localStorage.getItem('nondan-token');

    if (savedUser && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Validate token expiry if exists
        const tokenExpiry = localStorage.getItem('nondan-token-expiry');
        if (tokenExpiry && new Date(tokenExpiry) > new Date()) {
          setUser(parsedUser);
        } else {
          // Token expired, clear storage
          logout();
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      // Mock login - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

      // Mock validation
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }

      const mockUser = {
        id: Date.now().toString(),
        name: credentials.name || credentials.email.split('@')[0],
        email: credentials.email,
        role: credentials.role || 'student',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(credentials.name || credentials.email.split('@')[0])}&background=CF0F47&color=fff`,
        clubId: credentials.role === 'admin' ? 'club-1' : null,
        joinedAt: new Date().toISOString(),
        preferences: {
          notifications: true,
          theme: 'light',
          language: 'en'
        }
      };

      const mockToken = `mock-jwt-${Date.now()}`;
      const tokenExpiry = new Date();
      tokenExpiry.setDate(tokenExpiry.getDate() + 7); // 7 days

      setUser(mockUser);
      localStorage.setItem('nondan-user', JSON.stringify(mockUser));
      localStorage.setItem('nondan-token', mockToken);
      localStorage.setItem('nondan-token-expiry', tokenExpiry.toISOString());

      toast.success(`Welcome back, ${mockUser.name}!`);
      return { success: true, user: mockUser };
    } catch (error) {
      toast.error(error.message || 'Login failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      // Mock signup - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

      // Mock validation
      if (!userData.email || !userData.password || !userData.name) {
        throw new Error('All fields are required');
      }

      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const mockUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'student',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=CF0F47&color=fff`,
        clubId: userData.role === 'admin' ? 'club-1' : null,
        joinedAt: new Date().toISOString(),
        preferences: {
          notifications: true,
          theme: 'light',
          language: 'en'
        }
      };

      const mockToken = `mock-jwt-${Date.now()}`;
      const tokenExpiry = new Date();
      tokenExpiry.setDate(tokenExpiry.getDate() + 7); // 7 days

      setUser(mockUser);
      localStorage.setItem('nondan-user', JSON.stringify(mockUser));
      localStorage.setItem('nondan-token', mockToken);
      localStorage.setItem('nondan-token-expiry', tokenExpiry.toISOString());

      toast.success(`Welcome to Nondan, ${mockUser.name}!`);
      return { success: true, user: mockUser };
    } catch (error) {
      toast.error(error.message || 'Signup failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nondan-user');
    localStorage.removeItem('nondan-token');
    localStorage.removeItem('nondan-token-expiry');
    toast.info('You have been logged out');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('nondan-user', JSON.stringify(updatedUser));
    toast.success('Profile updated successfully');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    loading,
    login,
    signup,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
