import React from 'react';

export interface BadgeProps {
  variant?: 'popular' | 'savings' | 'new';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'popular', children, className = '' }) => {
  const baseStyles = "inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider";
  const variants = {
    popular: "bg-[var(--color-navy)] text-white",
    savings: "bg-[var(--color-mint-green)] text-white",
    new: "bg-[var(--color-primary-blue)] text-white",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
