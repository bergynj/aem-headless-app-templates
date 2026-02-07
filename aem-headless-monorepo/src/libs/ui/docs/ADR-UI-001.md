# ADR-UI-001 — Structuring a “Vibe-like” Design System using shadcn/ui in Nx

## Status

**Accepted**

## Context

We need a scalable UI architecture in an **Nx monorepo** that:

* Feels **“Vibe-like”**: centralized semantic tokens, constrained & typed APIs, strong consistency
* Preserves **shadcn/ui flexibility** for fast iteration
* Supports **Storybook**, **TypeScript**, **Vite**, and **latest React**
* Uses **zero-runtime styling** (today: Tailwind; future: vanilla-extract)
* Allows a **future migration** to a fully owned design system (Radix UI + zero-runtime CSS) with minimal app impact

shadcn/ui alone is **not a design system**; it is a code distribution pattern.
Therefore, structure and governance must be introduced intentionally.

---

## Decision

Adopt a **layered UI architecture inside a single Nx library (`libs/ui`)**, treating it as a *mini-monorepo* with strict internal boundaries.

### High-level structure

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

## Layer Responsibilities

### 1. `design-tokens/` — Foundation (Single Source of Truth)

* Semantic CSS variables only (e.g. `--color-brand`, `--space-3`)
* Tailwind preset maps semantic tokens → utilities
* No React, no components
* Stable across all future migrations

**Rationale:**
Mirrors VibeUI’s centralized tokens while remaining implementation-agnostic.

---

### 2. `layout/` — Structural Primitives

* Layout-only components (`Stack`, `Grid`, `Container`)
* Token-driven spacing and sizing
* No product or business semantics

**Rationale:**
Prevents layout entropy and replaces ad-hoc utility usage.
Aligns with Vercel-style primitive composition.

---

### 3. `components/core/` — Implementation Primitives

* shadcn-generated components
* Built on Radix UI
* Flexible, low-level
* Uses `cva` for variants mapped to semantic tokens
* **Not the preferred app API**

**Rationale:**
Encapsulates “how components work” without enforcing opinion.

---

### 4. `components/ds/` — Design System Surface (Key Vibe-like Layer)

* Opinionated wrappers over `core`
* Reduced prop surface area
* Enforced defaults, sizes, variants
* Encodes consistency and constraints
* Preferred import surface for applications

**Rationale:**
This layer provides the **Vibe-like experience** without losing ownership.

---

### 5. `components/composite/` — Reusable UI Patterns

* Compositions of `layout + ds`
* Represent common UI patterns (not business logic)
* Example: `SearchBar`, `UserMenu`, `FilterPanel`
* Optional long-term; easiest layer to relocate later

**Rationale:**
Documents approved patterns and avoids duplication across apps.

---

## Storybook

* Lives at `libs/ui/.storybook`
* Imports `tokens.css` once in `preview.ts`
* Provides theme switching (e.g. `data-theme`)
* Documents each layer independently

**Rationale:**
Storybook acts as the **design system contract**, not just a gallery.

---

## Consequences

### Positive

* Strong consistency with controlled extensibility
* Clear public API via `ds/`
* Easy migration to:

  * Radix UI + vanilla-extract
  * Fully packaged “Vibe-like” DS later
* Minimal app changes during future refactors
* Zero-runtime styling preserved

### Trade-offs

* Requires discipline (export boundaries, lint rules)
* More upfront structure vs “copy-paste shadcn”
* shadcn convenience features are intentionally constrained

---

## Migration Readiness

This structure explicitly supports a future move to:

**Radix UI + vanilla-extract (zero-runtime CSS)**

* `design-tokens` → reused
* `layout` → styling rewritten, API preserved
* `ds` → internals replaced, exports unchanged
* Apps → minimal to no changes

---

## Final Conclusion

Using **shadcn/ui as an implementation detail** within this layered architecture allows us to:

> Build a **Vibe-like design system today**
> without locking ourselves out of a **fully owned, zero-runtime system tomorrow**.

This decision aligns more closely with **Vercel’s internal design system philosophy**, while retaining the option to harden into a VibeUI-style packaged system later.

---

## Notes

* Apps should prefer imports from `components/ds` and `layout`
* `core` is considered internal
* Semantic tokens are the only stable contract across time
