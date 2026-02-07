# 📋 Design System Plan for Xero Pricing Page (Aligned)

This document outlines the implementation plan for the Xero Pricing Page components, following the **Vibe-like layered architecture** defined in `ADR-UI-001.md`.

---

## 1. Component Layering

### 1.1 `components/ds/` (Design System Surface)
These are the primary building blocks for the pricing page, providing opinionated and typed APIs.

*   **`Button`**: Standardised action buttons with `primary` and `secondary` variants.
*   **`Badge`**: Status indicators for "Most Popular" or "Savings".
*   **`PriceDisplay`**: Semantic component for showing current and original pricing.
*   **`Toggle`**: A constrained 2-option selector for billing cycles (Monthly/Annual).
*   **`FeatureRow`**: Individual feature items with `inline` (details) or `modal` (dialog) expansion variants.
*   **`PricingCard`**: The main container for a plan, composing `Badge`, `PriceDisplay`, and `FeatureList`.

### 1.2 `components/composite/` (UI Patterns)
*   **`FeatureList`**: Manages the display and "See all" logic for a collection of `FeatureRow`s.
*   **`PricingCarousel`**: A layout pattern that switches between a `scroll-snap` carousel on mobile and a grid on desktop.

---

## 2. Implementation Details

### A. Feature Expansion Variants
Following the **Progressive Enhancement** rule, we support two methods of displaying feature details:
- **Variant: `inline`**: Uses the native HTML `<details>` element for zero-JS expansion.
- **Variant: `modal`**: Uses the native HTML `<dialog>` element for a bottom-anchored modal experience.

### B. Selection & Interaction
- **State Persistence**: Selected plans use a `selected` variant on the `PricingCard`, which adds a border highlight and subtle lift effect using semantic shadow tokens.
- **Card Selection**: Use radio-button-like behavior for plan selection to ensure form compatibility.

### C. Layout Strategy
- **Mobile/Tablet**: `PricingCarousel` uses `scroll-snap-type: x mandatory` for a native-feeling horizontal scroll.
- **Desktop**: Automatically switches to a 3-column grid layout via Tailwind responsive utilities.

---

## 3. Design Tokens (Stable Contract)

All components must strictly use the tokens defined in `libs/ui/src/styles/design-tokens.css`.

### Core Colors
- `--color-primary-blue` (#0176BE)
- `--color-navy` (#0B2C4C)
- `--color-mint-green` (#27C686)

### Typography & Spacing
- Use `--font-family: 'General Sans'`.
- Spacing must follow the `--spacing-*` scale.
- Radius must use `--radius-lg` for cards.

---

## 4. Import Rules
Applications building the pricing page **must only** import from:
- `@aem-headless/ui/ds` (e.g., `PricingCard`, `Button`)
- `@aem-headless/ui/composite` (e.g., `PricingCarousel`)

---

## 5. Storybook Contract
The full pricing page assembly is documented as a Story in:
`libs/ui/src/components/DesignSystem/Pricing.stories.tsx`

This story serves as the visual regression target and functional documentation for the Xero Pricing Page implementation.
