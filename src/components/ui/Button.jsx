import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';

  const variants = {
    primary: 'text-white shadow-sm hover:shadow-md active:scale-95',
    secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-300 dark:focus:ring-gray-600',
    outline: 'bg-transparent border-2 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-[var(--primary-accent-1)]',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-gray-300 dark:focus:ring-gray-600',
    danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white focus:ring-red-500 shadow-sm hover:shadow-md',
    success: 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white focus:ring-green-500 shadow-sm hover:shadow-md',
    warning: 'bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 text-white focus:ring-yellow-500 shadow-sm hover:shadow-md'
  };

  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  const getVariantStyles = () => {
    if (variant === 'primary') {
      return {
        background: 'var(--primary-accent-1)',
        borderColor: 'var(--primary-accent-1)'
      };
    }
    if (variant === 'outline') {
      return {
        borderColor: 'var(--primary-accent-1)',
        color: 'var(--primary-accent-1)'
      };
    }
    return {};
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  const LoadingSpinner = () => (
    <Loader2 className="animate-spin h-4 w-4" />
  );

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <LoadingSpinner />
          <span className="ml-2">Loading...</span>
        </>
      );
    }

    return (
      <>
        {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </>
    );
  };

  return (
    <button
      className={classes}
      style={getVariantStyles()}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
