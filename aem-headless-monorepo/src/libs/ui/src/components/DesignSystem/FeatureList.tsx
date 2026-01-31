import React, { useState } from 'react';
import FeatureRow, { FeatureRowProps } from './FeatureRow';

export interface FeatureListProps {
  features: FeatureRowProps[];
  limit?: number;
  variant?: 'inline' | 'modal';
}

const FeatureList: React.FC<FeatureListProps> = ({ features, limit = 5, variant }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedFeatures = showAll ? features : features.slice(0, limit);

  return (
    <div className="flex flex-col">
      {displayedFeatures.map((feature, index) => (
        <FeatureRow key={index} {...feature} variant={variant} />
      ))}
      {!showAll && features.length > limit && (
        <button
          onClick={() => setShowAll(true)}
          className="text-left py-3 text-[var(--color-primary-blue)] font-semibold text-sm hover:underline"
        >
          See all features
        </button>
      )}
    </div>
  );
};

export default FeatureList;
