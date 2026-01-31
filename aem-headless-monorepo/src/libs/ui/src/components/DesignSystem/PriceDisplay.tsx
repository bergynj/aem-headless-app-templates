import React from 'react';

export interface PriceDisplayProps {
  originalPrice?: string;
  currentPrice: string;
  period?: string;
  className?: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ originalPrice, currentPrice, period = '/month', className = '' }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {originalPrice && (
        <span className="text-[var(--color-text-secondary)] line-through text-sm">
          Usually {originalPrice}
        </span>
      )}
      <div className="flex items-baseline gap-1">
        <span className="text-[var(--color-text-primary)] text-3xl font-bold">
          {currentPrice}
        </span>
        <span className="text-[var(--color-text-secondary)] text-sm">
          {period}
        </span>
      </div>
    </div>
  );
};

export default PriceDisplay;
