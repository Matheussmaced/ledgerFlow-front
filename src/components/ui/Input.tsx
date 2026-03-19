import * as React from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-[var(--color-card-border)] bg-[var(--color-card)] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-[var(--color-danger)] focus-visible:ring-[var(--color-danger)]',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="text-xs text-[var(--color-danger)] mt-1">{error}</span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
