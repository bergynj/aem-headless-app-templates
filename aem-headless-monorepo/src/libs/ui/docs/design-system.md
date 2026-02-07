# Design System — UI Architecture & Rules

This repository follows a **Vibe-like design system with shadcn/ui flexibility**.

This document defines the **non-negotiable rules** for how UI is structured, styled, and consumed.
All UI changes must comply with this document.

---

## 1. What “Vibe-like” Means Here

This design system intentionally combines:

### From VibeUI

* Centralised **semantic design tokens**
* Typed, constrained component APIs
* Strong consistency across applications
* Design system owns visual and interaction rules

### From shadcn/ui

* Full code ownership
* Radix UI primitives for behaviour & accessibility
* Composition over configuration
* Incremental evolution

### Additional Constraints

* Zero-runtime or near-zero-runtime styling
* Strong portability (styling tech can change)
* Clear migration path to a fully owned design system

> **Important:**
> shadcn/ui is an *implementation detail*, not the design system itself.

---

## 2. Repository Structure (Single Source of Truth)

All UI lives inside **one Nx library**:

```
libs/ui
```

Internally, it is treated as a **mini-monorepo** with strict layering.

```
libs/ui/
  design-tokens/
  layout/
  components/
    core/
    ds/
    composite/
  .storybook/
```

---

## 3. Layer Responsibilities (Read This Carefully)

### 3.1 `design-tokens/` — Foundation

**Single source of truth**

* Semantic CSS variables only
  (`--color-brand`, `--surface`, `--space-3`, etc.)
* Tailwind preset maps semantic tokens → utilities
* No React, no components, no layout logic

✔ Stable across all future migrations
✖ No hard-coded values anywhere else

---

### 3.2 `layout/` — Structural Primitives

**How things are arranged**

* Components like `Stack`, `Grid`, `Container`
* Token-driven spacing & sizing
* No product or business semantics

✔ Prevents layout drift
✖ No ad-hoc layout utilities in apps

---

### 3.3 `components/core/` — Implementation Primitives

**How components work**

* shadcn-generated / Radix-based components
* Flexible APIs, rich variants
* Escape hatches allowed (`className`)

⚠ **Internal only** — apps should not import from here directly
✔ Replaceable implementation layer

---

### 3.4 `components/ds/` — Design System Surface (Critical)

**How teams are expected to build UI**

* Opinionated wrappers over `core`
* Reduced prop surface area
* Enforced defaults, sizes, variants
* Typed, semantic APIs

✔ This is the **primary public API**
✔ This is where the system becomes “Vibe-like”

---

### 3.5 `components/composite/` — Reusable UI Patterns

**How real UI is assembled**

* Composed from `layout + ds (+ core if needed)`
* Reusable UI patterns, not domain logic

Examples:

* `SearchBar`
* `UserMenu`
* `FilterPanel`
* `EmptyState`

✔ Avoid duplication
✖ No business or product logic

---

## 4. Import Rules (Strict)

### Applications may import ONLY from:

* `components/ds`
* `components/composite`
* `layout`
* approved token CSS entry

### Applications MUST NOT import:

* `components/core`
* internal utils (`lib/*`)
* design token internals

> If an app imports `core`, the design system has already failed.

---

## 5. Styling Rules (Non-Negotiable)

### Token Discipline

* No hard-coded colours (`#fff`, `bg-red-500`, etc.)
* No arbitrary values (`gap-[14px]`, `px-[17px]`)
* Semantic tokens only

### Escape Hatch Policy

| Layer     | className   |
| --------- | ----------- |
| core      | Allowed     |
| ds        | Restricted  |
| composite | Rare        |
| apps      | Discouraged |

If styling requires `className` overrides, the design system likely needs a new variant or token.

---

## 6. Variants & APIs

* All visual variants must be **typed**
* Prefer `cva` (or equivalent)
* No boolean styling props (`primary`, `danger`)
* Variant names must be semantic and consistent

`ds` components must **add opinion**, not re-export flexibility.

---

## 7. Storybook = Contract

Storybook lives at:

```
libs/ui/.storybook
```

Rules:

* Tokens imported once in `preview.ts`
* Theme switching supported
* Stories required for:

  * tokens
  * layout
  * core
  * ds
  * composite

If it isn’t in Storybook, it isn’t part of the system.

---

## 8. Migration Guarantee

This architecture guarantees a future migration to:

**Radix UI + zero-runtime CSS (e.g. vanilla-extract)**

Because:

* Apps depend on semantic APIs
* Tokens are stable contracts
* Implementation details are encapsulated

Expected migration impact:

* Tokens reused
* Layout APIs preserved
* DS internals replaced
* Apps unchanged or minimally affected

---

## 9. Golden Rule

> **If an application can bypass the design system, it eventually will.**

This system exists to:

* make the correct thing easy
* make the wrong thing difficult
* keep the UI consistent, portable, and future-proof

All UI changes must respect this document.

---

**Referenced by:**

* ADR-UI-001
* Linting & Enforcement Rules
* PR Review Checklist
