import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  "px-6 py-3 rounded-md font-semibold transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-primary-blue)] text-white hover:bg-[var(--color-navy)] focus:ring-[var(--color-primary-blue)]",
        secondary: "bg-white text-[var(--color-primary-blue)] border border-[var(--color-primary-blue)] hover:bg-[var(--color-background-light)] focus:ring-[var(--color-primary-blue)]",
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, 
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, className, children, ...props }) => {
  return (
    <button
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;