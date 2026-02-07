import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const stackVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
    gap: {
      none: "gap-0",
      xs: "gap-[var(--spacing-xs)]",
      sm: "gap-[var(--spacing-sm)]",
      md: "gap-[var(--spacing-md)]",
      lg: "gap-[var(--spacing-lg)]",
      xl: "gap-[var(--spacing-xl)]",
      "2xl": "gap-[var(--spacing-2xl)]",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      baseline: "items-baseline",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    },
  },
  defaultVariants: {
    direction: 'column',
    gap: 'md',
  },
});

export interface StackProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

export const Stack: React.FC<StackProps> = ({ 
  direction, gap, align, justify, className, ...props 
}) => {
  return (
    <div 
      className={cn(stackVariants({ direction, gap, align, justify, className }))} 
      {...props} 
    />
  );
};
