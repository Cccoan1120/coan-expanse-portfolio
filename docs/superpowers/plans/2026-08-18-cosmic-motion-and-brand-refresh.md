# Cosmic Motion and Brand Refresh Implementation Plan

> **For Codex:** Execute this plan directly in the current React 19 + Vite workspace. Preserve unrelated files and do not deploy or commit.

**Goal:** Replace the four supplied project logos, apply the new site mark everywhere the personal brand appears, revise the life-to-about copy from the supplied shared conversation, and deepen the existing cosmic motion without adding an animation dependency.

**Architecture:** Keep the current single-page composition and project data model. Add one small DOM-driven pointer layer that writes CSS custom properties with `requestAnimationFrame`; CSS consumes those variables for local tilt, glow and parallax. Existing media stays local, and `prefers-reduced-motion` plus coarse-pointer fallbacks remain authoritative.

**Tech Stack:** React 19, TypeScript, Vite, native CSS animations, Playwright, Vitest.

---

### Task 1: Lock the content and asset expectations

**Files:**
- Modify: `tests/portfolio.spec.ts`
- Inspect: `src/content/life.ts`
- Inspect: `src/content/profile.ts`

- [ ] Assert the four project cards use the supplied PNG paths at the same rendered size.
- [ ] Assert the site wordmark and footer use the new local brand mark.
- [ ] Assert the revised life and about copy appears on the homepage.
- [ ] Assert reactive planet stages exist while reduced-motion remains static.

### Task 2: Replace the supplied visual assets

**Files:**
- Replace: `public/images/project-logos/music-market-radar.png`
- Replace: `public/images/project-logos/kol-review-desk.png`
- Replace: `public/images/project-logos/teeni-insight-suite.png`
- Replace: `public/images/project-logos/offerexpert.png`
- Add: `public/images/brand/coan-expanse-mark.png`
- Modify: `src/components/SiteNav.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Modify: `index.html`

- [ ] Copy the four supplied project images in the requested order.
- [ ] Copy the supplied orbit mark to the public brand directory.
- [ ] Replace the header, footer and favicon brand surfaces with the new mark.
- [ ] Keep project-specific logos independent from the personal site mark.

### Task 3: Apply the shared life and about copy

**Files:**
- Modify: `src/content/life.ts`
- Modify: `src/components/LifeShowcase.tsx`
- Modify: `src/content/profile.ts`
- Modify: `src/pages/HomePage.tsx`

- [ ] Replace both chapter descriptions and all six record excerpts.
- [ ] Add specific external-link labels instead of platform-generic labels.
- [ ] Update the About role, two visible paragraphs, personality tag, statistics labels and final CTA.

### Task 4: Add restrained cosmic interaction

**Files:**
- Add: `src/components/CosmicPointerField.tsx`
- Modify: `src/App.tsx`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/components/ProjectShowcase.tsx`
- Modify: `src/styles/cosmic-redesign.css`

- [ ] Add a requestAnimationFrame pointer controller with no React render loop.
- [ ] Add local tilt and moving illumination to project, hero and about planet stages.
- [ ] Add orbit layers and moons where the current markup is missing them.
- [ ] Disable pointer physics for coarse pointers and all non-essential motion for reduced-motion users.

### Task 5: Verify the completed page

**Files:**
- Verify: `src/**/*`
- Verify: `public/**/*`
- Verify: `tests/portfolio.spec.ts`

- [ ] Run typecheck, content/privacy checks and unit tests.
- [ ] Build the current source before browser tests.
- [ ] Run the full Playwright suite against the fresh build.
- [ ] Review desktop and mobile screenshots after scrolling every section into view.

