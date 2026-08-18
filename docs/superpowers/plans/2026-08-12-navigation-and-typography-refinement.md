# Navigation and Typography Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merge the duplicated desktop navigation into one top navigation and refine the portfolio typography and modules without changing the background, cursor, routes, or project data.

**Architecture:** `SiteNav.tsx` remains the single navigation owner and drops the desktop rail. Existing page components keep their data and behavior while their markup and CSS are simplified into a Chinese-first editorial hierarchy. Tests continue to verify routing, filtering, keyboard behavior, accessibility, local assets, and responsive layout.

**Tech Stack:** React 19, React Router, TypeScript, native CSS, Playwright, Vitest.

## Global Constraints

- Preserve `/`, `/projects`, `/projects/mine`, and `/projects/orbito`.
- Preserve the WebGL starfield and observatory cursor implementation unchanged.
- Preserve 13 real projects, query parameters, resume, and contact behavior.
- Use Noto Sans SC for Chinese, Hanken Grotesk for English brand text, and JetBrains Mono only for numbers and state metadata.
- Do not deploy or commit Git changes.

---

### Task 1: Unified navigation

**Files:**
- Modify: `src/components/SiteNav.tsx`
- Modify: `src/styles/global.css`
- Test: `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: current route and hash from `useLocation()`.
- Produces: one desktop header with 首页、项目、能力、联系 and one matching mobile menu.

- [ ] Replace the rail and duplicated header links with one navigation model.
- [ ] Keep Escape close and focus restoration in the mobile menu.
- [ ] Assert `.observatory-rail` is absent and the top navigation owns all four destinations.

### Task 2: Typography and module refinement

**Files:**
- Modify: `tokens.css`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/ProjectsIndexPage.tsx`
- Modify: `src/pages/ProjectPage.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Modify: `src/styles/global.css`
- Modify: `design.md`

**Interfaces:**
- Consumes: existing `profile`, `projects`, and case-study content.
- Produces: Chinese-first headings and prose, Hanken brand accents, and mono-only numeric/status metadata.

- [ ] Reduce the hero to brand, name, position/value statement, and one primary action.
- [ ] Remove repetitive technical eyebrows, boxed badges, and card framing that do not communicate state.
- [ ] Replace boxed filter controls and card-like capability tiles with quieter editorial grouping.
- [ ] Keep every factual claim and project field unchanged.

### Task 3: Verification

**Files:**
- Modify: `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: the rebuilt production output.
- Produces: verified desktop/mobile artifacts and passing automated checks.

- [ ] Run `npm run typecheck`, expecting exit code 0.
- [ ] Run `npm test`, expecting the content scan and 7 unit tests to pass.
- [ ] Run `npm run build`, expecting a successful Vite production build.
- [ ] Run `npm run test:e2e`, expecting all Playwright tests to pass.
- [ ] Run the Impeccable detector once on the changed UI files and resolve relevant findings.
- [ ] Capture and inspect 1440px and 390px screenshots of all four public routes.
