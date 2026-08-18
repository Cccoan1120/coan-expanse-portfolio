# Portfolio Visual Polish Implementation Plan

> **For agentic workers:** Implement this plan task-by-task in the current session. Do not dispatch subagents because this workspace currently requires inline execution.

**Goal:** Refine the single-page portfolio copy hierarchy, project logos, portrait planet treatment, initial scroll position, and three-item anchor navigation.

**Architecture:** Keep the existing React 19, Vite, content model, local asset policy, and hash-based single-page routing. Make surgical component and CSS changes, copy the four supplied PNG assets into the existing local project-logo directory, and extend the Playwright coverage before running the full validation sequence.

**Tech Stack:** React 19, React Router, TypeScript, native CSS, Vite, Vitest, Playwright.

## Global Constraints

- Preserve the dark deep-space identity, current project order, local media policy, keyboard support, and reduced-motion behavior.
- Keep the About section on the homepage even though it is removed from the primary navigation.
- Do not deploy, commit Git, delete historical assets, or introduce a new animation dependency.
- The primary navigation must contain exactly 作品, 生活, 联系 and point to homepage anchors.

---

### Task 1: Copy hierarchy, navigation, and initial scroll

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/components/ProjectShowcase.tsx`
- Modify: `src/components/SiteNav.tsx`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`
- Test: `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: existing `#home`, `#projects`, `#life`, and `#contact` anchors.
- Produces: a three-item `navigation` array and deterministic top position for a hashless page load.

- [ ] Update the hero statement to `世界动荡 我不摇晃` and project heading to `把生活过得辽阔一点，把热爱做得具体一点。`.
- [ ] Replace the navigation array with 作品, 生活, 联系 while retaining React Router links to `/#projects`, `/#life`, and `/#contact`.
- [ ] Set `history.scrollRestoration` to `manual` before rendering and keep hash navigation explicit in `App`.
- [ ] Update Playwright assertions for the swapped copy, three links, hashless initial `scrollY <= 1`, brand return-to-top, and anchor navigation.
- [ ] Run `npx playwright test tests/portfolio.spec.ts --grep "single-page|anchor links"` and expect desktop and mobile passes.

### Task 2: Project logo assets and sizing

**Files:**
- Create: `public/images/project-logos/music-market-radar.png`
- Create: `public/images/project-logos/kol-review-desk.png`
- Create: `public/images/project-logos/teeni-insight-suite.png`
- Create: `public/images/project-logos/offerexpert.png`
- Modify: `src/content/projects.ts`
- Modify: `src/styles/cosmic-redesign.css`
- Test: `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: the four user-supplied square PNG files.
- Produces: local `/images/project-logos/*.png` URLs referenced by `Project.logo.src`.

- [ ] Copy each supplied source into the local project-logo directory using the project slug as the filename.
- [ ] Change the four project records from SVG paths to the new PNG paths.
- [ ] Remove the Offer Atlas size exception and use one square, rounded, clipped image rule for every regular project card.
- [ ] Crop visually with CSS inside the existing stage so outer white margins are hidden without modifying the supplied artwork.
- [ ] Assert all seven project images are local, the four PNG paths are rendered, and Offer Atlas and Orbito image boxes have matching dimensions.

### Task 3: Life subtitle and portrait planet

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/styles/cosmic-redesign.css`
- Test: `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: the existing responsive portrait image and `prefers-reduced-motion` rules.
- Produces: a simplified portrait planet with one ring, atmospheric rim, shadow terminator, and two small moons.

- [ ] Apply the same type scale, weight, and letter spacing to `生活记录` and `作品展示`.
- [ ] Remove the three floating portrait text tags and replace the crowded orbit with decorative, aria-hidden atmospheric elements.
- [ ] Add a restrained planet rim, terminator shadow, orbit ring, and moons using pseudo-elements and existing color tokens.
- [ ] Disable any new orbit motion under `prefers-reduced-motion`.
- [ ] Assert the two subtitle font sizes match and About remains attached to the page.

### Task 4: Full verification and visual review

**Files:**
- Modify only test expectations required by Tasks 1-3.
- Output screenshots under the configured visualization workspace.

**Interfaces:**
- Consumes: the latest production `dist` build.
- Produces: verified desktop and mobile screenshots plus the final test report.

- [ ] Run `npm run typecheck` and expect exit code 0.
- [ ] Run `npm test -- --run` and expect content/privacy and unit tests to pass.
- [ ] Run `npm run build` and expect Vite production output.
- [ ] Run `npm run test:e2e` against the latest build and expect all desktop/mobile tests to pass.
- [ ] Capture 1440x1000 and 390x844 screenshots of the hero, project cards, life heading, and About portrait; verify no blank reveal state, oversized logo, white outer logo border, or horizontal overflow.

## Self-Review

- Spec coverage: all seven requested changes map to Tasks 1-3; Task 4 covers final validation.
- Placeholder scan: no deferred implementation steps or unspecified tests remain.
- Type consistency: existing `Project.logo`, `navigation`, and section IDs remain unchanged in shape.
