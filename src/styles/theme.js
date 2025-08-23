// Centralized theme configuration for Nondan platform

export const theme = {
  colors: {
    primary: {
      dark: '#000000',
      accent1: '#CF0F47',
      accent2: '#FF0B55',
      soft: '#FFDEDE'
    },
    light: {
      background: '#FFFFFF',
      text: '#000000',
      card: '#F8F9FA',
      border: '#E5E7EB',
      muted: '#6B7280'
    },
    dark: {
      background: '#000000',
      text: '#FFFFFF',
      card: '#1A1A1A',
      border: '#374151',
      muted: '#9CA3AF'
    },
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6'
  },
  fonts: {
    primary: 'Inter, system-ui, sans-serif',
    mono: 'Fira Code, monospace'
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  animation: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms'
  }
};

export const clubThemes = {
  tech: {
    primary: '#007bff',
    secondary: '#6c757d',
    accent: '#0056b3',
    gradient: 'from-blue-500 to-blue-700'
  },
  cultural: {
    primary: '#28a745',
    secondary: '#6c757d',
    accent: '#1e7e34',
    gradient: 'from-green-500 to-green-700'
  },
  business: {
    primary: '#ffc107',
    secondary: '#6c757d',
    accent: '#e0a800',
    gradient: 'from-yellow-500 to-yellow-700'
  },
  arts: {
    primary: '#e83e8c',
    secondary: '#6c757d',
    accent: '#c42672',
    gradient: 'from-pink-500 to-pink-700'
  },
  sports: {
    primary: '#fd7e14',
    secondary: '#6c757d',
    accent: '#e66500',
    gradient: 'from-orange-500 to-orange-700'
  },
  science: {
    primary: '#6f42c1',
    secondary: '#6c757d',
    accent: '#5a2d91',
    gradient: 'from-purple-500 to-purple-700'
  }
};

