import React from 'react';

const Avatar = ({
  src,
  alt = '',
  size = 'md',
  fallback,
  className = ''
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl'
  };

  const getFallback = () => {
    if (fallback) return fallback;
    if (alt) return alt.charAt(0).toUpperCase();
    return '?';
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizes[size]} rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      <div className={`${src ? 'hidden' : 'flex'} items-center justify-center w-full h-full bg-[var(--primary-accent-1)] text-white font-medium`}>
        {getFallback()}
      </div>
    </div>
  );
};

export default Avatar;
