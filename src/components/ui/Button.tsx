import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20',
      secondary: 'bg-surface text-white border border-white/10 hover:bg-white/5',
      outline: 'border border-primary text-primary hover:bg-primary/10',
      ghost: 'hover:bg-white/5 text-gray-300 hover:text-white',
      gradient: 'bg-gradient-to-r from-primary via-accent to-blue-600 text-white shadow-lg shadow-accent/20 hover:opacity-90',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg font-medium',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
