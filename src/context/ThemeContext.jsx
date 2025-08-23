import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('eventify-theme');
      return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('eventify-theme', JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Club Theme Context for dynamic club colors
const ClubThemeContext = createContext();

export const useClubTheme = () => {
  const context = useContext(ClubThemeContext);
  return context; // Can be null if not within a club context
};

export const ClubThemeProvider = ({ clubColors, children }) => {
  useEffect(() => {
    if (clubColors) {
      document.documentElement.style.setProperty('--club-primary', clubColors.primary);
      document.documentElement.style.setProperty('--club-secondary', clubColors.secondary);
    }

    return () => {
      // Reset to default colors when unmounting
      document.documentElement.style.removeProperty('--club-primary');
      document.documentElement.style.removeProperty('--club-secondary');
    };
  }, [clubColors]);

  return (
    <ClubThemeContext.Provider value={clubColors}>
      <div className="club-themed">
        {children}
      </div>
    </ClubThemeContext.Provider>
  );
};
