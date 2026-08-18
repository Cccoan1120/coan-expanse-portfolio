# Stellar Cinema Portfolio Implementation Plan

> **For Codex:** Execute this plan inline, preserving existing project facts, privacy boundaries, and the Mine/Orbito case routes.

**Goal:** Reframe STELLAR HAN as a project-first cinematic portfolio with five featured scenes and a searchable 13-project index.

**Architecture:** Keep the existing React + Vite + TypeScript stack. Drive the homepage and index from `src/content/projects.ts`, extend the existing canvas instead of adding a particle dependency, and preserve the existing case-page content model.

**Tech Stack:** React 19, React Router, TypeScript, native CSS, Canvas, Vitest, Playwright.

---

### Task 1: Lock the design and content contracts

- Update `design.md` for Constellation Hero + Project Cinema, Index-First `/projects`, and Feature Stack case pages.
- Add project domains and unique `featuredRank` values to the content model.
- Verify exactly 13 projects and ranks 1 through 5.

### Task 2: Build the project-first homepage

- Replace the long catalogue with a low-exposure constellation hero and five near-screen-height project scenes.
- Add a keyboard-operable 01-05 navigation rail driven by `IntersectionObserver`.
- Compress About, experience, recognition, and contact below the project cinema.

### Task 3: Build the complete project index

- Add `/projects` with URL-synchronised `q` and `category` filters.
- Link Mine and Orbito to full cases; expose expandable evidence summaries for the remaining projects.
- Add the route to the global INDEX menu, homepage, and case-page navigation.

### Task 4: Performance, accessibility, and documentation

- Pause Canvas work off-screen, when the document is hidden, and in reduced-motion mode.
- Keep 44px targets, visible focus, local imagery, NASA attribution, and existing privacy limits.
- Update README and Hallmark decision log.

### Task 5: Verification

- Run `npm run typecheck`, `npm test`, `npm run build`, then `npm run test:e2e` against the rebuilt `dist`.
- Capture and inspect 375px and 1280px screenshots for the homepage, project index, and case pages.
- Run the Hallmark slop test and handoff contract before delivery.
