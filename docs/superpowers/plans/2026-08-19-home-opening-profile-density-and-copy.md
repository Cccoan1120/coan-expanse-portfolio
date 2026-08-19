# Home Opening, Profile Density, and Footer Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Execute this plan inline in the current session because the work extends uncommitted user-approved changes in the active checkout. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the About history panel slightly smaller, replace and reorder the four honors, add a staged first-load hero opening inspired by the reference site's hierarchy, and update the footer motto.

**Architecture:** Keep the existing single-page React composition and native-CSS motion system. Update factual copy in the existing content/component owners, expose the three Chinese name characters as accessible animated spans, and replace the current whole-copy fade with a short CSS-only staged reveal. Do not add GSAP, a loading screen, persistence, or a new route.

**Tech Stack:** React 19, TypeScript, Vite 8, native CSS animations, Vitest, Playwright.

## Global Constraints

- Preserve the current `霄汉无垠 / COAN EXPANSE` branding, routes, WebGL background, pointer effects, and public-profile privacy boundary.
- Render honors in this exact order: `2024年国家奖学金`; `2025年河北省优秀毕业生`; `2026年“挑战杯”首都大学生创业计划竞赛专项赛特等奖`; `2026年“挑战杯”首都大学生创业计划竞赛主赛道三等奖`.
- Replace the footer sentence exactly with `纵有疾风起，人生不言弃`.
- Opening motion must run on a fresh home mount, use no new dependency, leave content visible when animation support fails, and disable spatial motion for `prefers-reduced-motion: reduce`.
- Preserve the existing 8px radius, frosted-glass surface, mobile stacking, reduced-transparency fallback, and 320–1920px no-overflow contract.

---

### Task 1: Copy and content order

**Files:**
- Modify: `src/content/profile.ts:9-14`
- Modify: `src/components/SiteFooter.tsx:77`
- Test: `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: Existing `honors` array rendered by `HomePage` and existing footer markup.
- Produces: Four ordered `{ year, title }` entries and the new visible footer motto.

- [ ] **Step 1: Update the browser assertions first**

Assert the exact ordered honor strings and the new footer sentence:

```ts
await expect(page.locator(".about-honors-list li")).toHaveText([
  "2024年国家奖学金",
  "2025年河北省优秀毕业生",
  "2026年“挑战杯”首都大学生创业计划竞赛专项赛特等奖",
  "2026年“挑战杯”首都大学生创业计划竞赛主赛道三等奖",
]);
await expect(page.locator(".footer-bottom")).toContainText("纵有疾风起，人生不言弃");
```

- [ ] **Step 2: Run the focused tests and confirm the old copy fails**

Run: `npx playwright test -g "revised about copy|resume and contact actions"`

Expected: failure because the current award order/names and footer sentence are still the previous versions.

- [ ] **Step 3: Apply the exact content changes**

Use these entries in `profile.ts`:

```ts
export const honors = [
  { year: "2024年", title: "国家奖学金" },
  { year: "2025年", title: "河北省优秀毕业生" },
  { year: "2026年", title: "“挑战杯”首都大学生创业计划竞赛专项赛特等奖" },
  { year: "2026年", title: "“挑战杯”首都大学生创业计划竞赛主赛道三等奖" },
] as const;
```

Replace the footer paragraph with:

```tsx
<p>纵有疾风起，人生不言弃</p>
```

- [ ] **Step 4: Rerun the focused copy tests**

Run: `npx playwright test -g "revised about copy|resume and contact actions"`

Expected: both desktop and mobile variants pass.

### Task 2: Staged home opening

**Files:**
- Modify: `src/pages/HomePage.tsx:35-60`
- Modify: `src/styles/cosmic-redesign.css:275-521`
- Modify: `src/styles/cosmic-redesign.css:1655-1664`
- Modify: `src/styles/cosmic-redesign.css:1810-1828`
- Test: `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: Existing hero DOM, `--ease`, hero planet stage, and reduced-motion media query.
- Produces: `.hero-name-character` spans and CSS animations named `hero-name-unfold`, `hero-content-unfold`, and `hero-stage-unfold`.

- [ ] **Step 1: Add failing structure and motion assertions**

Add browser checks for three animated name characters, authored animation names, and a reduced-motion duration of zero:

```ts
await expect(page.locator(".hero-name-character")).toHaveCount(3);
const openingAnimations = await page.locator(".cosmic-hero").evaluate((hero) =>
  Array.from(hero.getAnimations({ subtree: true }))
    .filter((animation): animation is CSSAnimation => animation instanceof CSSAnimation)
    .map((animation) => animation.animationName),
);
expect(openingAnimations).toContain("hero-name-unfold");
expect(openingAnimations).toContain("hero-stage-unfold");
```

- [ ] **Step 2: Run the focused hero test and confirm it fails**

Run: `npx playwright test -g "pointer-responsive cosmic stages|reduced motion"`

Expected: failure because the character spans and new animation names do not exist.

- [ ] **Step 3: Split only the visible name into accessible animated spans**

Use an explicit accessible name while keeping each character decorative to assistive technology:

```tsx
<h1 id="home-title" aria-label="陈宵瀚">
  {["陈", "宵", "瀚"].map((character) => (
    <span className="hero-name-character" aria-hidden="true" key={character}>{character}</span>
  ))}
</h1>
```

- [ ] **Step 4: Replace the whole-copy fade with one staged CSS sequence**

Remove `animation: cosmic-copy-in ...` from `.cosmic-hero__copy`. Animate the eyebrow, name characters, supporting copy, list items, button, and planet with short nth-child delays. Use transform/opacity for content and a bounded `clip-path` plus transform for the planet; default styles remain visible outside the animation.

- [ ] **Step 5: Add an intentional reduced-motion path**

Set every new hero animation to `none !important` inside the existing `prefers-reduced-motion: reduce` media query while keeping all content visible.

- [ ] **Step 6: Rerun focused hero and reduced-motion tests**

Run: `npx playwright test -g "pointer-responsive cosmic stages|reduced motion"`

Expected: desktop and mobile variants pass.

### Task 3: Compact About history layout and final verification

**Files:**
- Modify: `src/styles/cosmic-redesign.css:1229-1332`
- Test: `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: Existing `.about-history` markup and reduced-transparency fallback.
- Produces: A centered `max-width: 82rem` glass rail with smaller padding/type and unchanged mobile stacking.

- [ ] **Step 1: Add a desktop density assertion**

At a 1920px viewport, assert the history panel is no wider than 1313px and remains narrower than its About section.

- [ ] **Step 2: Apply the restrained size reduction**

Set the panel width to `min(100%, 82rem)`, center it, reduce maximum group padding from `2.25rem` to `1.8rem`, reduce row padding from `0.85rem` to `0.68rem`, and lower local text sizes by approximately 0.03–0.1rem. Keep the 8px radius, blur, edge, and shadow.

- [ ] **Step 3: Run static and browser verification**

Run:

```powershell
npm run typecheck
npm test
npm run build
npx playwright test -g "revised about copy|resume and contact actions|pointer-responsive cosmic stages|horizontal overflow|reduced motion"
```

Expected: all commands pass.

- [ ] **Step 4: Run the Impeccable detector exactly once**

Scan `src/pages/HomePage.tsx`, `src/components/SiteFooter.tsx`, and `src/styles/cosmic-redesign.css`. Address only findings introduced by this task.

- [ ] **Step 5: Capture one bounded visual QA round**

Capture the hero sequence at early/mid/final frames on 1440x1000, then capture the About rail and footer at 1920x1080 and 390x844. Verify readable wrapping, no overlap, no blank first frame, no horizontal overflow, and a visible reduced-motion fallback.

- [ ] **Step 6: Inspect the final diff**

Run: `git diff --check` and `git status --short --untracked-files=all`.

Expected: only the previously active About changes plus files directly required by this request; generated screenshots remain ignored under `.visual/`.
