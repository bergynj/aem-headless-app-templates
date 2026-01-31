# 📋 Design System Plan for Xero Pricing Page

### **1. Component Variants & Interaction Patterns**

### **A. Feature Expansion Variants**

- **Variant 1: Inline Description** - Feature row expands to show description text below (no modal)
- **Variant 2: Modal Overlay** - Feature row opens bottom-anchored modal with full details
- **Toggle-able** - Users can choose which experience they prefer

### **B. Card Selection State**

- **Subtle Raise Effect** - When selected, card lifts ~4-8px with enhanced shadow
- **Selection Indicator** - Border highlight or glow effect on selected plan
- **State Persistence** - Selected plan stays highlighted across interactions

---

### **2. Carousel Layout Strategy**

### **Horizontal Carousel (Mobile/Tablet)**

- **Starting Position**: Middle card (Grow) in center, partially visible on each side
- **Visible Cards**:
    - Left: Ignite (small preview ~20% visible)
    - Center: Grow (full width ~100% visible)
    - Right: Comprehensive (small preview ~20% visible)
- **Navigation**: Swipe/scroll to rotate through plans
- **Snap Points**: Cards snap to center position

### **Desktop View**

- Show all 3 cards simultaneously (grid layout)
- Carousel optional or secondary view

---

### **3. Progressive Enhancement (No-JS Fallback)**

### **Core Challenge: Make everything work WITHOUT JavaScript**

- ✅ **HTML-only expandable rows**: Use `<details>` HTML element
- ✅ **CSS-only carousel**: Use `scroll-snap-type` & `scroll-behavior`
- ✅ **CSS-only modal**: Use `:target` pseudo-selector or `<dialog>` element
- ✅ **Form-based selection**: Use radio buttons + `:checked` CSS selector for styling
- ✅ **Pricing updates**: Use CSS custom properties or server-side rendering

### **Enhancement Layers:**

1. **Base (HTML)**: Semantic structure, `<details>`, `<dialog>`, form inputs
2. **Enhancement (CSS)**: Styling, transitions, carousel snap, hover states
3. **Progressive (JS)**: Smooth transitions, analytics, UX polish (optional)

---

### **4. Component Breakdown & Reusability**

### **Atomic Components**

1. **Button** (`<button>`)
    - Variants: Primary (Buy now), Secondary (Learn more)
    - States: Default, Hover, Active, Disabled
    - Fallback: Works as `<button type="submit">` in forms
2. **Badge** (`<span>`)
    - Variants: "Most Popular", "Save $XXX", "New"
    - Positioning: Absolute, sticky, inline
    - No JS required
3. **PriceDisplay** (`<div>`)
    - Parts: "Usually $XX" (strikethrough), "Now $X.XX", "/month"
    - CSS Strikethrough: `text-decoration: line-through`
    - Data attribute: `data-price="7.50"` for dynamic updates
4. **Icon** (`<svg>` or icon font)
    - Variants: Checkmark (✓), Cross (✗), Info (i)
    - Inline SVG for better styling control
    - No image dependencies

### **Composite Components**

1. **PricingCard** (Main card component)
    - Header: Plan name + "Most Popular" badge
    - Pricing: PriceDisplay component
    - CTA: Button component
    - Features: FeatureList component
    - Selected State: `:checked` on radio input
2. **FeatureRow** (Expandable row)
    - **Variant A**: `<details>` element with inline description
    - **Variant B**: Link to `<dialog>` modal with full info
    - Icon + Text + Expand control
    - CSS animation for smooth open/close
3. **FeatureList** (Container)
    - Maps multiple FeatureRow components
    - Shows first N items, rest hidden (CSS `max-height` or `display: none`)
4. **PricingCarousel** (Layout wrapper)
    - `scroll-snap-type: x mandatory` on container
    - `scroll-snap-align: center` on cards
    - `overflow-x: auto` for native scrolling
    - Mobile: 3 cards with center snap
    - Desktop: Grid fallback
5. **Toggle** (Plan type selector)
    - `<input type="radio">` for HTML state
    - `:checked` pseudo-selector for styling
    - Labels control the state change
6. **Modal** (`<dialog>`)
    - Bottom-anchored, backdrop overlay
    - HTML native `<dialog>` element
    - No JS needed (just `open` attribute or JavaScript `.showModal()`)
    - Fallback to inline expansion if JS unavailable

---

### **5. Design Tokens (System-Wide)**

### **Colors**

```
--color-primary-blue:     #0176BE
--color-navy:             #0B2C4C
--color-mint-green:       #27C686
--color-background-light: #CAF4FE
--color-white:            #FFFFFF
--color-text-primary:     #0B2C4C
--color-text-secondary:   #666666
--color-border:           #E0E0E0
--color-shadow:           rgba(11, 44, 76, 0.1)

```

### **Typography**

```
--font-family:            'General Sans', sans-serif
--font-size-lg:           48px (plan name)
--font-size-md:           24px (price)
--font-size-base:         16px (body)
--font-size-sm:           14px (labels)
--font-size-xs:           12px (helper text)

--font-weight-bold:       700
--font-weight-semibold:   600
--font-weight-medium:     500
--font-weight-regular:    400

--line-height-tight:      1.2
--line-height-normal:     1.5
--line-height-relaxed:    1.8

```

### **Spacing**

```
--spacing-xs:   4px
--spacing-sm:   8px
--spacing-md:   16px
--spacing-lg:   24px
--spacing-xl:   32px
--spacing-2xl:  48px

--padding-card: 24px
--gap-items:    16px

```

### **Effects & Transitions**

```
--transition-fast:    0.15s ease-out
--transition-normal:  0.3s ease-out
--transition-slow:    0.5s ease-out

--shadow-sm:          0 2px 4px rgba(0,0,0,0.08)
--shadow-md:          0 4px 12px rgba(0,0,0,0.12)
--shadow-lg:          0 8px 24px rgba(0,0,0,0.16)

--radius-sm:          4px
--radius-md:          8px
--radius-lg:          12px

```

---

### **6. Progressive Enhancement Architecture**

### **Layer 1: HTML (Semantic Markup)**

```
<form>
  <fieldset>
    <input type="radio" name="plan" value="grow" checked>
    <label>Select Grow Plan</label>

    <div class="pricing-card" aria-selected="true">
      <h2>Grow</h2>
      <details>
        <summary>Feature Name</summary>
        <p>Description text here</p>
      </details>
      <dialog>
        <h3>Feature Details</h3>
        <p>Full modal content</p>
      </dialog>
    </div>
  </fieldset>
</form>

<div class="carousel" role="region">
  <!-- Cards with scroll-snap -->
</div>

```

### **Layer 2: CSS (Baseline Styling + No-JS Fallback)**

**css**

```
/* Radio button selection styling */
input[type="radio"]:checked ~ .pricing-card {
  box-shadow: 0 8px 24px var(--shadow-lg);
  transform: translateY(-4px);
}

/* Details element (native HTML expansion) */
details[open] summary::before {
  content: "▼";
  transform: rotate(0deg);
}

/* Carousel without JS */
.carousel {
  scroll-snap-type: x mandatory;
  overflow-x: auto;
}

.carousel-item {
  scroll-snap-align: center;
  scroll-snap-stop: always;
}

/* Modal fallback (bottom-anchored) */
dialog {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-height: 60vh;
  border: none;
  border-radius: 12px 12px 0 0;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

```

### **Layer 3: JavaScript (Enhancement Only)**

- Smooth scroll behavior
- Analytics tracking
- Accessibility enhancements
- Touch gesture support for carousel
- Form submission handling

---

### **7. Feature Expansion Variants Deep-Dive**

### **Option A: Inline `<details>` Element**

✅ **Pros**:

- Works without JS
- Native browser support
- Semantic HTML
- Keyboard accessible by default

**html**

```
<details>
  <summary>Send invoices and quotes
    <svg><!-- checkmark icon --></svg>
  </summary>
  <p>Send professional invoices with custom branding...</p>
</details>

```

❌ **Cons**: Limited styling control, no modal backdrop

### **Option B: Bottom-Anchored `<dialog>`**

✅ **Pros**:

- Full modal experience with backdrop
- Better for long-form content
- Native HTML element
- Works without JS (with `open` attribute)

**html**

```
<button onclick="document.getElementById('modal-1').showModal()">
  Send invoices and quotes
</button>
<dialog id="modal-1">
  <button onclick="this.parentElement.close()">Close</button>
  <h3>Send invoices and quotes</h3>
  <p>Full description here...</p>
</dialog>

```

✅ **Progressive**: Dialog works without JS if you use `open` attribute initially; JS enhances it

---

### **8. Pricing Update Strategy (No JS Required)**

### **Option 1: Data Attributes + CSS Variables**

**html**

```
<div class="price-display" data-price-small-biz="7.50" data-price-self-emp="10.00">
  <span>$7.50</span>
</div>

```

**css**

```
/* Updated server-side or with CSS custom properties */
.plan-grow { --price: 7.50; }

```

### **Option 2: Server-Side Rendering**

- Toggle buttons are form inputs
- Form submission re-renders page with new prices
- No JS needed; CSS handles styling of active toggle

### **Option 3: CSS Custom Properties (Hybrid)**

**css**

```
:root {
  --plan-grow-price: $7.50;
  --plan-comprehensive-price: $10.00;
}

.price-display::before {
  content: var(--plan-grow-price);
}

```

---

### **9. Carousel Implementation (Progressive)**

### **HTML Structure**

**html**

```
<div class="carousel" role="region" aria-label="Pricing plans">
  <div class="carousel-track">
    <div class="carousel-item" data-plan="ignite"><!-- Card --></div>
    <div class="carousel-item" data-plan="grow"><!-- Card --></div>
    <div class="carousel-item" data-plan="comprehensive"><!-- Card --></div>
  </div>
</div>

```

### **CSS (No JS)**

**css**

```
.carousel {
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  overflow-x: auto;
  overflow-y: hidden;
  height: 100vh; /* Adjust as needed */
}

.carousel-item {
  scroll-snap-align: center;
  scroll-snap-stop: always;
  flex: 0 0 100vw; /* Full viewport width */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* On desktop, show 3 items at once */
@media (min-width: 1024px) {
  .carousel-item {
    flex: 0 0 calc(33.333% - 1rem);
  }
  .carousel {
    scroll-snap-type: none;
    overflow-x: visible;
  }
}

```

### **JavaScript Enhancement (Optional)**

- Programmatic scrolling
- Keyboard navigation (arrow keys)
- Touch swipe support
- Current item indicator

---

### **10. Reusable Component Variants Summary**

| **Component** | **Variants** | **States** | **Notes** |
| --- | --- | --- | --- |
| **Button** | Primary, Secondary | Default, Hover, Active, Disabled | Form-compatible |
| **Badge** | Popular, Savings, New | Static (no states) | Positioning flexible |
| **Card** | Standard | Default, Selected, Hover | Lift effect on select |
| **FeatureRow** | Inline (details), Modal (dialog) | Expanded, Collapsed | Keyboard accessible |
| **ToggleSwitch** | 2-option | Active/Inactive | Radio button backed |
| **PricingDisplay** | Standard | Static | Data-driven (CSS vars) |
| **Carousel** | Mobile, Desktop | — | CSS scroll-snap based |
| **Modal** | Bottom-anchored | Open, Closed | Native `<dialog>` |

---

### **11. Accessibility Considerations**

- ✅ Semantic HTML (`<details>`, `<dialog>`, `<form>`, `<button>`)
- ✅ ARIA labels: `aria-selected`, `aria-expanded`, `aria-label`
- ✅ Keyboard navigation: Tab, Enter, Space, Arrow keys
- ✅ Color contrast: WCAG AA minimum
- ✅ Focus indicators: Visible outline on interactive elements
- ✅ Screen reader support: Proper heading hierarchy, labels

---

## **🎯 Next Steps (When Ready to Build)**

1. **Create base component library** (Buttons, Badges, Icons)
2. **Build layout components** (Card, PricingContainer, Carousel)
3. **Implement feature expansion variants** (Details vs Modal)
4. **Add pricing toggle logic** (Form-based state)
5. **Test progressive enhancement** (Works without JS first)
6. **Add visual polish** (Animations, transitions, micro-interactions)
7. **Document component API** (Props, variants, usage)