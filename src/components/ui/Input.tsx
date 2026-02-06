import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-gray-400 ml-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'flex w-full rounded-xl bg-surface/50 border border-white/10 px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200',
            error && 'border-red-500 focus:ring-red-500/50 focus:border-red-500/50',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-red-400 text-xs ml-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
