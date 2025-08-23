import React from 'react';

const Card = ({
  children,
  className = '',
  padding = 'default',
  hover = false,
  variant = 'default',
  shadow = 'default',
  onClick,
  ...props
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-200';

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const variantClasses = {
    default: '',
    elevated: 'shadow-lg border-0',
    outlined: 'border-2',
    glass: 'backdrop-blur-md bg-white/80 dark:bg-gray-800/80'
  };

  const hoverClasses = hover || onClick ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';
  const clickableClasses = onClick ? 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' : '';

  const classes = [
    baseClasses,
    paddingClasses[padding],
    shadowClasses[shadow],
    variantClasses[variant],
    hoverClasses,
    clickableClasses,
    className
  ].filter(Boolean).join(' ');

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};

// Card Header component
export const CardHeader = ({ children, className = '' }) => (
  <div className={`border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 ${className}`}>
    {children}
  </div>
);

// Card Footer component
export const CardFooter = ({ children, className = '' }) => (
  <div className={`border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 ${className}`}>
    {children}
  </div>
);

// Card Title component
export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`}>
    {children}
  </h3>
);

// Card Description component
export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-gray-600 dark:text-gray-400 ${className}`}>
    {children}
  </p>
);

export default Card;
