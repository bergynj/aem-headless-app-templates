import React from 'react';
import Badge from './Badge';
import PriceDisplay from './PriceDisplay';
import FeatureList from './FeatureList';
import Button from './Button';
import { FeatureRowProps } from './FeatureRow';

export interface PricingCardProps {
  title: string;
  badge?: string;
  badgeVariant?: 'popular' | 'savings' | 'new';
  originalPrice?: string;
  currentPrice: string;
  period?: string;
  features: FeatureRowProps[];
  isMostPopular?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  featureVariant?: 'inline' | 'modal';
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  badge,
  badgeVariant,
  originalPrice,
  currentPrice,
  period,
  features,
  isMostPopular,
  isSelected,
  onSelect,
  featureVariant = 'inline',
}) => {
  return (
    <div
      onClick={onSelect}
      className={`relative flex flex-col p-6 rounded-2xl bg-white transition-all duration-300 cursor-pointer border-2 
        ${isSelected 
          ? 'border-[var(--color-primary-blue)] shadow-[var(--shadow-lg)] -translate-y-2' 
          : 'border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1'
        }
      `}
    >
      {isMostPopular && (
        <Badge variant="popular" className="absolute -top-3 left-6">
          Most Popular
        </Badge>
      )}
      {badge && !isMostPopular && (
        <Badge variant={badgeVariant} className="absolute -top-3 left-6">
          {badge}
        </Badge>
      )}

      <div className="mb-4 pt-2">
        <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{title}</h3>
      </div>

      <PriceDisplay 
        originalPrice={originalPrice} 
        currentPrice={currentPrice} 
        period={period} 
        className="mb-6"
      />

      <Button variant={isSelected ? 'primary' : 'secondary'} className="mb-8 w-full">
        Buy now
      </Button>

      <div className="flex-grow">
        <FeatureList features={features} limit={5} variant={featureVariant} />
      </div>

      {isSelected && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-[var(--color-primary-blue)] pointer-events-none" />
      )}
    </div>
  );
};

export default PricingCard;
