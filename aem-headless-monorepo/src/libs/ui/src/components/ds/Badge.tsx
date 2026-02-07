import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  "inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
  {
    variants: {
      variant: {
        popular: "bg-[var(--color-navy)] text-white",
        savings: "bg-[var(--color-mint-green)] text-white",
        new: "bg-[var(--color-primary-blue)] text-white",
      },
    },
    defaultVariants: {
      variant: 'popular',
    },
  }
);

export interface BadgeProps 
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ variant, children, className, ...props }) => {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {children}
    </span>
  );
};

export default Badge;