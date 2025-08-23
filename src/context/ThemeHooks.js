import { useContext } from 'react';
import { ThemeContext, ClubThemeContext } from './ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useClubTheme = () => {
  return useContext(ClubThemeContext); // Can be null if not within a club context
};

