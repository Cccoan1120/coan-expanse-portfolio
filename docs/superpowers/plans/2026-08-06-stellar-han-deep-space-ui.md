# Stellar Han Deep-Space UI Implementation Plan

> **For agentic workers:** Implement inline in the existing worktree. Preserve all content, route, privacy, and project-data behavior.

**Goal:** Replace the flat orbit-diagram visual layer with a photographic deep-space observatory system shared by the home and flagship case-study routes.

**Architecture:** Keep the current React/Vite route and content boundaries. Add one typed astronomy asset registry, transform the existing `OrbitCanvas` in place, and apply a single `design.md` system through tokens and additive global CSS overrides. NASA imagery is self-hosted and responsive.

**Tech Stack:** React 19, Vite 8, TypeScript, React Router, native CSS, Canvas 2D, Playwright, Vitest.

## Global Constraints

- Do not change public project facts, content hierarchy, routes, or privacy boundaries.
- Do not add Three.js, WebGL models, video backgrounds, sound, or generated imagery.
- Do not delete production files or clean the uncommitted worktree.
- Respect `prefers-reduced-motion` and 44px touch targets.

### Task 1: Lock design and assets

- [ ] Add `design.md` and typed `src/content/space.ts`.
- [ ] Download Cosmic Cliffs and Webb's First Deep Field from official sources.
- [ ] Generate 640px and 2400px AVIF/WebP/JPEG variants and verify dimensions.
- [ ] Extend the content check to validate every local astronomy asset and credit URL.

### Task 2: Rebuild the shared shell

- [ ] Update `tokens.css` with the locked atmospheric palette and motion tokens.
- [ ] Convert `SiteNav` to edge-aligned INDEX navigation with Escape and focus restoration.
- [ ] Convert `SiteFooter` to a masthead footer with source credits.
- [ ] Extend `ResponsiveImage` for art-directed mobile sources without breaking existing callers.

### Task 3: Rebuild the home page

- [ ] Make Cosmic Cliffs the full-bleed `100svh` hero and reduce headline dominance.
- [ ] Transform `OrbitCanvas` into deterministic three-layer stars, partial observation arcs, and accessible project targets.
- [ ] Restyle About, flagship, satellite, archive, experience, and contact as a continuous observatory narrative.
- [ ] Verify desktop and mobile hierarchy before continuing.

### Task 4: Rebuild case studies

- [ ] Add the subdued Deep Field environment to both flagship routes.
- [ ] Implement desktop sticky narrative plus scrolling product evidence.
- [ ] Provide a single-column non-sticky mobile fallback.
- [ ] Preserve actions, next-case navigation, and direct-route refresh behavior.

### Task 5: Verification and handoff

- [ ] Add tests for local astronomy assets, credits, menu keyboard behavior, reduced motion, routes, and responsive overflow.
- [ ] Run `npm run typecheck`, `npm test`, `npm run build`, and `npm run test:e2e`.
- [ ] Capture 1280px desktop and 375px mobile screenshots, inspect them, and iterate.
- [ ] Run the Hallmark slop test, update its log, and document asset maintenance in README.

