import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('eventify-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      // Mock login - replace with actual API call
      const mockUser = {
        id: '1',
        name: credentials.email.split('@')[0],
        email: credentials.email,
        role: credentials.role || 'student',
        avatar: `https://ui-avatars.com/api/?name=${credentials.email.split('@')[0]}&background=CF0F47&color=fff`,
        clubId: credentials.role === 'admin' ? 'club-1' : null
      };

      setUser(mockUser);
      localStorage.setItem('eventify-user', JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData) => {
    setIsLoading(true);
    try {
      // Mock signup - replace with actual API call
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=CF0F47&color=fff`,
        clubId: userData.role === 'admin' ? null : null
      };

      setUser(newUser);
      localStorage.setItem('eventify-user', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eventify-user');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('eventify-user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      isStudent: user?.role === 'student',
      login,
      signup,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
