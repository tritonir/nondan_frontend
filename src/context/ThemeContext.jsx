import React, { createContext, useContext, useState, useEffect } from 'react';
import { theme, clubThemes } from '../styles/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nondan-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [clubTheme, setClubTheme] = useState(null);

  useEffect(() => {
    // Apply theme to document root
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }

    // Save preference
    localStorage.setItem('nondan-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    // Apply club theme colors if available
    if (clubTheme) {
      const root = document.documentElement;
      root.style.setProperty('--club-primary', clubTheme.primary);
      root.style.setProperty('--club-secondary', clubTheme.secondary);
      root.style.setProperty('--club-accent', clubTheme.accent);
    }

    return () => {
      // Cleanup club theme variables
      const root = document.documentElement;
      root.style.removeProperty('--club-primary');
      root.style.removeProperty('--club-secondary');
      root.style.removeProperty('--club-accent');
    };
  }, [clubTheme]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{
      isDark,
      toggleTheme,
      theme,
      clubTheme,
      setClubTheme,
      clubThemes
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Club Theme Context for dynamic club colors
const ClubThemeContext = createContext();

export const ClubThemeProvider = ({ clubColors, children }) => {
  useEffect(() => {
    if (clubColors) {
      document.documentElement.style.setProperty('--club-primary', clubColors.primary);
      document.documentElement.style.setProperty('--club-secondary', clubColors.secondary);
      document.documentElement.style.setProperty('--club-accent', clubColors.accent);
    }

    return () => {
      document.documentElement.style.removeProperty('--club-primary');
      document.documentElement.style.removeProperty('--club-secondary');
      document.documentElement.style.removeProperty('--club-accent');
    };
  }, [clubColors]);

  return (
    <ClubThemeContext.Provider value={clubColors}>
      {children}
    </ClubThemeContext.Provider>
  );
};

export { ThemeContext, ClubThemeContext };
