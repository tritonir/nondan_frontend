import React from 'react';

const Card = ({
  children,
  className = '',
  padding = 'p-6',
  hover = false,
  ...props
}) => {
  const hoverClass = hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';

  return (
    <div
      className={`card ${padding} ${hoverClass} transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
