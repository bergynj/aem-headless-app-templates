import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "px-6 py-3 rounded-md font-semibold transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-[var(--color-primary-blue)] text-white hover:bg-[var(--color-navy)] focus:ring-[var(--color-primary-blue)]",
    secondary: "bg-white text-[var(--color-primary-blue)] border border-[var(--color-primary-blue)] hover:bg-[var(--color-background-light)] focus:ring-[var(--color-primary-blue)]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
