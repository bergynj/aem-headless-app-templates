import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PricingCard from './PricingCard';
import PricingCarousel from './PricingCarousel';
import Toggle from './Toggle';

const meta: Meta = {
  title: 'Design System/Pricing',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const features = [
  { title: 'Send invoices and quotes', description: 'Send professional invoices with custom branding, and get paid faster with online payments.' },
  { title: 'Enter bills', description: 'Track your bills and keep on top of what you owe.' },
  { title: 'Reconcile bank transactions', description: 'Automatically import and categorize your latest bank transactions.' },
  { title: 'Capture receipts with Hubdoc', description: 'Store your receipts online and extract data automatically.' },
  { title: 'Bulk reconcile transactions', description: 'Save time by reconciling multiple transactions at once.' },
  { title: 'Short-term cash flow and business snapshot', description: 'Get a quick view of your cash flow and business performance.' },
];

export const FullPricingPage: StoryObj = {
  render: () => {
    const [billing, setBilling] = useState('monthly');
    const [selectedPlan, setSelectedPlan] = useState('grow');
    const [featureVariant, setFeatureVariant] = useState<'inline' | 'modal'>('inline');

    const getPrice = (base: number) => {
      const price = billing === 'annual' ? base * 0.8 : base;
      return `$${price.toFixed(2)}`;
    };

    return (
      <div className="bg-[var(--color-background-light)] min-h-screen py-12 px-4 font-['General_Sans']">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-4">
            Pick the right plan for your business
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
            All plans include core features to help you run your business more efficiently.
          </p>
          
          <div className="flex flex-col items-center gap-6">
            <Toggle 
              options={[
                { label: 'Monthly', value: 'monthly' },
                { label: 'Annual (Save 20%)', value: 'annual' }
              ]}
              value={billing}
              onChange={setBilling}
            />

            <div className="flex items-center gap-4 bg-white/50 p-2 rounded-lg">
              <span className="text-sm font-medium">Feature Style:</span>
              <button 
                onClick={() => setFeatureVariant('inline')}
                className={`px-3 py-1 rounded ${featureVariant === 'inline' ? 'bg-[var(--color-navy)] text-white' : 'bg-gray-200'}`}
              >
                Inline
              </button>
              <button 
                onClick={() => setFeatureVariant('modal')}
                className={`px-3 py-1 rounded ${featureVariant === 'modal' ? 'bg-[var(--color-navy)] text-white' : 'bg-gray-200'}`}
              >
                Modal
              </button>
            </div>
          </div>
        </div>

        <PricingCarousel>
          <PricingCard
            title="Ignite"
            currentPrice={getPrice(15)}
            period={billing === 'monthly' ? '/month' : '/year'}
            features={features.slice(0, 3)}
            isSelected={selectedPlan === 'ignite'}
            onSelect={() => setSelectedPlan('ignite')}
            featureVariant={featureVariant}
          />
          <PricingCard
            title="Grow"
            isMostPopular
            currentPrice={getPrice(45)}
            period={billing === 'monthly' ? '/month' : '/year'}
            features={features}
            isSelected={selectedPlan === 'grow'}
            onSelect={() => setSelectedPlan('grow')}
            featureVariant={featureVariant}
          />
          <PricingCard
            title="Comprehensive"
            badge="Best Value"
            badgeVariant="savings"
            currentPrice={getPrice(75)}
            period={billing === 'monthly' ? '/month' : '/year'}
            features={features}
            isSelected={selectedPlan === 'comprehensive'}
            onSelect={() => setSelectedPlan('comprehensive')}
            featureVariant={featureVariant}
          />
        </PricingCarousel>
      </div>
    );
  }
};
