import React from 'react';

const ColorSwatch = ({ name, variable, hex }: { name: string; variable: string; hex: string }) => (
  <div className="flex flex-col gap-2">
    <div 
      className="w-full h-24 rounded-lg shadow-inner border border-border" 
      style={{ backgroundColor: `hsl(var(--${variable}))` }}
    />
    <div className="flex flex-col">
      <span className="font-bold text-sm">{name}</span>
      <span className="text-xs text-muted-foreground uppercase">{hex}</span>
      <span className="text-xs font-mono">--{variable}</span>
    </div>
  </div>
);

export const DesignTokens = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b pb-2">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ColorSwatch name="Primary Blue" variable="primary" hex="#0176BE" />
          <ColorSwatch name="Navy" variable="secondary" hex="#0B2C4C" />
          <ColorSwatch name="Mint Green" variable="accent" hex="#27C686" />
          <ColorSwatch name="Background" variable="background" hex="#FFFFFF" />
          <ColorSwatch name="Foreground" variable="foreground" hex="#0B2C4C" />
          <ColorSwatch name="Muted" variable="muted" hex="#F1F5F9" />
          <ColorSwatch name="Border" variable="border" hex="#E2E8F0" />
          <ColorSwatch name="Destructive" variable="destructive" hex="#EF4444" />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 border-b pb-2">Typography</h2>
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-mono">Heading Lg (48px / Bold)</p>
            <h1 className="text-[48px] font-bold leading-tight">Pick the right plan for your business</h1>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-mono">Heading Md (24px / Semibold)</p>
            <h2 className="text-[24px] font-semibold">Standard Pricing Plan</h2>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-mono">Base (16px / Regular)</p>
            <p className="text-base">All plans include core features to help you run your business more efficiently. Connect your bank accounts to automatically import transactions.</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-mono">Small (14px / Regular)</p>
            <p className="text-sm text-muted-foreground">Usually $15.00 / month. Taxes may apply based on your location.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 border-b pb-2">Spacing & Radius</h2>
        <div className="flex flex-wrap gap-8 items-end">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-primary rounded-sm" />
            <span className="text-xs font-mono">Radius Sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-primary rounded-md" />
            <span className="text-xs font-mono">Radius Md</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-primary rounded-lg" />
            <span className="text-xs font-mono">Radius Lg</span>
          </div>
        </div>
      </section>
    </div>
  );
};
