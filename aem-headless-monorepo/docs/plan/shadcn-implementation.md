# shadcn/ui Implementation Plan

1. **Save Plan Artifact**: Write this plan to `docs/plan/shadcn-implementation.md`.
2. **Install Dependencies**: Install `tailwindcss-animate`, `class-variance-authority`, `clsx`, `tailwind-merge`, and `lucide-react`.
3. **Initialize shadcn/ui Configuration**: Create a `components.json` file in `src/libs/ui`.
4. **Configure Tailwind**: Create/Update Tailwind config with shadcn presets and custom tokens (General Sans, Primary Blue, etc.).
5. **Create Theme CSS**: Define CSS variables in `src/libs/ui/src/styles/globals.css` mapping to the design plan.
6. **Create Utility Helper**: Implement the `cn` utility in `src/libs/ui/src/lib/utils.ts`.
7. **Setup Storybook Integration**: Import the new CSS in Storybook preview.
8. **Create Showcase**: Build a component and story to visualize Design Tokens (Colors, Typography, Spacing).
9. **Review**: Verify in Storybook.

