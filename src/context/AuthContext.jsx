import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const API_BASE_URL = 'https://nondan-backend.vercel.app/api/user';

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
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const userData = {
        id: data.user._id || data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role || 'student',
        avatar: data.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.name)}&background=CF0F47&color=fff`,
        clubId: data.user.clubId || null,
        joinedAt: data.user.joinedAt || data.user.createdAt,
        preferences: data.user.preferences || {
          notifications: true,
          theme: 'light',
          language: 'en'
        }
      };

      const token = data.token;
      const tokenExpiry = new Date();
      tokenExpiry.setDate(tokenExpiry.getDate() + 7); // 7 days

      setUser(userData);
      localStorage.setItem('nondan-user', JSON.stringify(userData));
      localStorage.setItem('nondan-token', token);
      localStorage.setItem('nondan-token-expiry', tokenExpiry.toISOString());

      toast.success(`Welcome back, ${userData.name}!`);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/singup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: userData.name,
          email: userData.email,
          password: userData.password,
          confirpassword: userData.confirmPassword, // ⚠ must match backend spelling
          avatar: userData.avatar|| "",
          role: userData.role || "student",
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message || 'Signup failed');
      }

      const userInfo = data.user

      const token = data.token;
      const tokenExpiry = new Date();
      tokenExpiry.setDate(tokenExpiry.getDate() + 7); // 7 days

      setUser(userInfo);
      localStorage.setItem('nondan-user', JSON.stringify(userInfo));
      localStorage.setItem('nondan-token', token);
      //localStorage.setItem('nondan-token-expiry', tokenExpiry.toISOString());

      toast.success(`Welcome to Nondan, !`);
      return { success: true, user: JSON.stringify(userInfo) };
    } catch (error) {
      console.error('Signup error:', error);
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
