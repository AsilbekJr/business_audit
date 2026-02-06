import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card = ({ children, className = '', title }: CardProps) => {
  return (
    <div className={`p-6 rounded-2xl ${className}`}>
        {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
        {children}
    </div>
  );
};
