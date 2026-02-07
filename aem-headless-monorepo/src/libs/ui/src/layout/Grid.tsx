import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      none: "grid-cols-none",
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
  },
  defaultVariants: {
    cols: 1,
    gap: 'md',
  },
});

export interface GridProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

export const Grid: React.FC<GridProps> = ({ cols, gap, className, ...props }) => {
  return (
    <div className={cn(gridVariants({ cols, gap, className }))} {...props} />
  );
};
