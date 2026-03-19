import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[var(--color-primary)]/20 text-[var(--color-primary)] py-1',
        secondary: 'border-transparent bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]',
        success: 'border-transparent bg-[var(--color-success)]/20 text-[var(--color-success)]',
        danger: 'border-transparent bg-[var(--color-danger)]/20 text-[var(--color-danger)]',
        outline: 'text-foreground border-[var(--color-card-border)] text-gray-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
