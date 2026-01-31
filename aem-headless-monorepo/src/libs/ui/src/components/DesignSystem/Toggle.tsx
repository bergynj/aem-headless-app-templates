import React from 'react';

export interface ToggleOption {
  label: string;
  value: string;
}

export interface ToggleProps {
  options: [ToggleOption, ToggleOption];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({ options, value, onChange, className = '' }) => {
  return (
    <div className={`inline-flex p-1 bg-gray-100 rounded-full ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200
            ${value === option.value 
              ? 'bg-white text-[var(--color-navy)] shadow-sm' 
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Toggle;
