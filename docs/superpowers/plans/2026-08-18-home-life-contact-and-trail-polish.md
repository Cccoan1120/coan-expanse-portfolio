# Home, Life, Contact, and Trail Polish Implementation Plan

> **For agentic workers:** Execute this plan inline in the current React 19 + Vite workspace. Current workspace instructions prohibit subagent dispatch. Do not deploy or commit.

**Goal:** Keep direct homepage entry at the hero, replace the segmented cursor trail with a smooth continuous light ribbon, apply the supplied life/about content and photo, and visually connect the contact footer to the single-page canvas.

**Architecture:** Preserve the existing routes, content data model, fixed background, and section composition. Add one synchronous home-entry scroll reset, keep the trail inside the existing canvas component with fixed-distance path sampling and quadratic smoothing, generate local responsive image derivatives, and remove only the footer surface styling that makes the contact area read as a detached card.

**Tech Stack:** React 19, TypeScript, Vite 8, Canvas 2D, native CSS, Sharp, Vitest, Playwright.

## Global Constraints

- Preserve `/#projects`, `/#life`, `/#about`, `/#contact`, and legacy route behavior.
- Preserve fine-pointer-only trail rendering and coarse-pointer/reduced-motion fallbacks.
- Keep all runtime media local and remove metadata from the supplied photo derivatives.
- Do not rename the brand, deploy, commit, delete historical assets, or add dependencies.
- Verify desktop and mobile at representative viewports and retain 320-1920px overflow coverage.

---

### Task 1: Lock homepage and content expectations

**Files:**
- Modify: `tests/portfolio.spec.ts`
- Modify: `src/main.tsx`

**Interfaces:**
- Consumes: direct `/` navigation and the existing `history.scrollRestoration = "manual"` behavior.
- Produces: a synchronous no-hash home reset while explicit hash navigation remains unchanged.

- [x] Assert that direct `/` entry and a reload after scrolling both settle at `scrollY <= 1`.
- [x] Assert that the revised life titles, excerpts, source label, image path, About role, paragraphs, tags, and removed CTA are present.
- [x] Assert that `/#projects` still reaches the project section.
- [x] Add a pre-render `window.scrollTo(0, 0)` only when pathname is `/` and there is no hash.

### Task 2: Update copy and local life media

**Files:**
- Modify: `src/content/life.ts`
- Modify: `src/content/profile.ts`
- Modify: `src/pages/HomePage.tsx`
- Add: `public/images/life/grassland-drive.avif`
- Add: `public/images/life/grassland-drive-sm.avif`
- Add: `public/images/life/grassland-drive.webp`
- Add: `public/images/life/grassland-drive-sm.webp`

**Interfaces:**
- Consumes: the source photo supplied for the grassland story.
- Produces: `ImageAsset` base `/images/life/grassland-drive` with 1280px and 640px AVIF/WebP variants.

- [x] Remove only the requested opening sentence from the climbing excerpt.
- [x] Replace the live-comedy title, full paragraph, and source label exactly as supplied.
- [x] Rename the podcast entry to `听别人聊聊世界` without inventing new body copy.
- [x] Generate Sharp derivatives without metadata and point the grassland entry at them with an accurate alt description.
- [x] Render the three supplied body paragraphs plus the emphasized closing sentence, update the role and five tags, and remove the About CTA.

### Task 3: Replace segmented trail rendering

**Files:**
- Modify: `src/components/CosmicPointerField.tsx`
- Modify: `src/styles/cosmic-redesign.css`
- Test: `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: pointer samples, Canvas 2D, existing aura variables, fine-pointer and reduced-motion media queries.
- Produces: a fixed-distance sampled path rendered through one quadratic curve with layered glow/core strokes and a direction-aware head flare.

- [x] Store sample birth time and width, interpolate long pointer jumps at fixed spacing, and cap retained points.
- [x] Trace a continuous midpoint-smoothed path instead of stroking every pair independently.
- [x] Draw a restrained outer glow, colored body, white core, and short head flare using the incumbent ice/violet palette.
- [x] Fade the whole path after pointer movement stops and clear it on resize/unmount.
- [x] Assert desktop canvas drawing after pointer motion and reduced-motion remains static.

### Task 4: Connect About and Contact visually

**Files:**
- Modify: `src/styles/cosmic-redesign.css`
- Test: `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: the fixed WebGL/CSS starfield and existing contact actions.
- Produces: an unframed contact layout on the same cosmic surface, retaining individual action controls and footer semantics.

- [x] Remove the footer top divider and detached opaque band.
- [x] Remove the contact panel border, radius, shadow, blur, and boxed background while keeping its grid and orbit line.
- [x] Reduce the dead gap above contact and use a transparent-to-deep-space wash so About flows into Contact.
- [x] Override the mobile panel padding/radius consistently and verify the longer About copy does not overlap.

### Task 5: Full verification

**Files:**
- Verify: `src/**/*`
- Verify: `public/images/life/grassland-drive*`
- Verify: `tests/**/*`

**Interfaces:**
- Consumes: the fresh production build.
- Produces: a clean source diff, complete automated verification, and desktop/mobile screenshots.

- [x] Run `npm run typecheck`, `npm test`, and `npm run build`.
- [x] Run `npm run test:e2e` against the fresh `dist`.
- [x] Run the Impeccable detector once over changed UI targets.
- [x] Inspect 1440×1000 and 390×844 screenshots for hero arrival, life photo/copy, About copy, Contact transition, overflow, and overlap.
- [x] Capture a desktop trail screenshot and canvas pixel count after a smooth pointer sweep.

## Self-Review

- Spec coverage: all seven user requirements map to Tasks 1-4; Task 5 covers the requested cross-device verification.
- Placeholder scan: no deferred implementation or unspecified validation remains.
- Type consistency: the existing `ImageAsset`, `LifeEntry`, `SiteProfile`, and component interfaces remain unchanged.
