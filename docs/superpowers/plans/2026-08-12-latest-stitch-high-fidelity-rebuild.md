# Latest Stitch High-Fidelity Rebuild Implementation Plan

> **For agentic workers:** Execute inline in this session. Do not dispatch subagents, deploy, commit, or delete the preserved baseline.

**Goal:** Rebuild the React portfolio from the 2026-08-12 Stitch export while preserving the 13-project content model, public routes, resume, and contact details.

**Architecture:** Keep `projects.ts` and `profile.ts` as content sources, add a separate temporary Stitch media map, and render four route-specific layouts through shared navigation, footer, responsive image, and WebGL background components. All generated images, fonts, icons, and shader code are local production assets.

**Tech Stack:** React 19, TypeScript, Vite 8, React Router 7, CSS, WebGL 1, Vitest, Playwright, axe.

## Global Constraints

- Treat the latest Stitch HTML, screenshots, `DESIGN.md`, and shader as the sole visual reference.
- Preserve `/`, `/projects`, `/projects/mine`, `/projects/orbito`, the 13 real projects, `q`, `category`, resume path, and contact information.
- Show three archive records initially and reveal the remaining eight through one accessible control.
- Localize every runtime image and font; allow no Google Fonts, Tailwind CDN, `lh3.googleusercontent.com`, `unpkg.com`, or NASA request.
- Preserve the external verified backup and all existing real project assets.
- Do not deploy or commit Git.

---

### Task 1: Preserve baseline and prepare local visual assets

- [x] Create an external timestamped archive excluding dependency/build caches.
- [x] Validate archive entries and compute SHA-256.
- [ ] Install the local Material Symbols font and image-processing dependency.
- [ ] Download the eleven Stitch images and emit responsive AVIF/WebP variants under a new temporary asset namespace.
- [ ] Add a typed media map without changing `Project`.

### Task 2: Rebuild the shared observatory system

- [ ] Rewrite design tokens and global layout rules from the latest `DESIGN.md`.
- [ ] Implement a reusable, performance-limited WebGL background with reduced-motion and unsupported-WebGL fallbacks.
- [ ] Rebuild the fixed header, expandable 80px desktop rail, mobile menu, and Stitch footer with real links.

### Task 3: Rebuild the four public page layouts

- [ ] Rebuild the homepage hero, five Observations, and four-cell Telemetry section.
- [ ] Rebuild Project Observatory with four filters, query restoration, two flagship cards, three-row preview, and eight-row reveal.
- [ ] Rebuild Mine with four complete chapters and the Stitch hero/rail composition.
- [ ] Rebuild Orbito with status chips, asymmetric panels, telemetry evidence, outcomes, and boundaries.

### Task 4: Validate and visually audit

- [ ] Update content/privacy scanning and route-level E2E selectors.
- [ ] Pass typecheck, content scan, unit tests, production build, and the complete E2E suite.
- [ ] Verify keyboard navigation, Escape/focus restoration, axe serious/critical findings, reduced motion, WebGL fallback, local requests, and widths 320 through 1920px.
- [ ] Capture and inspect all four routes at 1440x1000 and 390x844 against same-size Stitch renders.
