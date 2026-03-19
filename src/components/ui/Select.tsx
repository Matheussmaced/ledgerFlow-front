import * as React from 'react';
import { cn } from '@/utils/cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  options: { label: string; value: string | number }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, options, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <select
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-md border border-[var(--color-card-border)] bg-[var(--color-card)] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50 appearance-none',
            error && 'border-[var(--color-danger)] focus:ring-[var(--color-danger)]',
            className
          )}
          ref={ref}
          {...props}
        >
          <option value="" disabled selected hidden>Selecione uma opção</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-gray-800 text-white">
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-xs text-[var(--color-danger)] mt-1">{error}</span>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Select };
