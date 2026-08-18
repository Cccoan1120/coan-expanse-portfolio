# Contact, Motion, and Navigation Polish Implementation Plan

> **For Codex:** Execute this plan directly in the current React 19 + Vite workspace. Preserve unrelated files and do not deploy or commit.

**Goal:** Finish the missing shared-conversation copy, repair same-page navigation, refine the hero and KOL logo, and add an original deep-space contact/motion system that matches the current COAN EXPANSE visual language.

**Architecture:** Keep the existing single-page React structure and native CSS motion. Make navigation scrolling explicit instead of relying on repeated hash transitions. Extend the current pointer controller with a canvas meteor trail, add a fixed scroll-progress indicator, and progressively reveal existing `data-reveal` blocks without adding a new animation dependency. Rebuild the footer as a semantic contact panel with a user-triggered email reveal.

**Tech Stack:** React 19, TypeScript, React Router, Canvas 2D, native CSS, Vitest, Playwright.

---

### Task 1: Lock exact content and interaction expectations

**Files:**
- Modify: `tests/portfolio.spec.ts`
- Modify: `tests/app.test.tsx`

- [ ] Assert exact life and About wording from the shared conversation.
- [ ] Assert the KOL card uses the new local image path.
- [ ] Assert “作品” scrolls to `#projects`, including when the hash is already present.
- [ ] Assert the footer exposes “我的邮箱” and reveals, rather than navigates to, the address.
- [ ] Assert the progress bar and meteor canvas exist and reduced-motion behavior remains safe.

### Task 2: Apply copy and asset corrections

**Files:**
- Modify: `src/content/life.ts`
- Modify: `src/content/profile.ts`
- Modify: `src/content/projects.ts`
- Add: `public/images/project-logos/kol-review-desk-2026.png`

- [ ] Match the shared-conversation punctuation and phrasing exactly for the visible life/About copy.
- [ ] Add the supplied KOL image as a new preserved asset and crop its outer white margin in the logo viewport.
- [ ] Keep all public content local and avoid deleting the previous logo asset.

### Task 3: Repair navigation and simplify the hero orbit

**Files:**
- Modify: `src/components/SiteNav.tsx`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/styles/cosmic-redesign.css`

- [ ] Explicitly scroll same-page navigation targets after routing, including repeated clicks.
- [ ] Keep mobile menu focus restoration and Escape behavior intact.
- [ ] Remove the fastest hero orbit while retaining two visually distinct orbital layers.
- [ ] Redesign the Explore arrow as an integrated circular action with a restrained hover trajectory.

### Task 4: Build the contact panel

**Files:**
- Modify: `src/components/SiteFooter.tsx`
- Modify: `src/styles/cosmic-redesign.css`

- [ ] Replace the flat footer links with an original two-level contact panel inspired only by the reference layout.
- [ ] Add a “我的邮箱” button that conditionally reveals the email in an `aria-live` region and never uses `mailto:`.
- [ ] Preserve WeChat, resume, GitHub, Douyin and Xiaohongshu actions with accurate labels and focus states.
- [ ] Keep the brand/legal row compact below the contact panel.

### Task 5: Add deep-space motion and progressive reveal

**Files:**
- Modify: `src/components/CosmicPointerField.tsx`
- Add: `src/components/ScrollProgress.tsx`
- Modify: `src/components/RevealObserver.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles/cosmic-redesign.css`

- [ ] Draw a bounded, requestAnimationFrame-driven meteor trail for fine pointers only.
- [ ] Add a fixed scroll-progress line beneath the header with a single passive scroll listener.
- [ ] Enhance existing `data-reveal` blocks with subtle blur/clip and child staggering.
- [ ] Disable all non-essential trail/reveal motion for reduced-motion users and on coarse pointers.

### Task 6: Verify the final artifact

**Files:**
- Verify: `src/**/*`
- Verify: `public/**/*`
- Verify: `tests/**/*`

- [ ] Run `npm run typecheck`.
- [ ] Run content/privacy checks and unit tests.
- [ ] Run `npm run build` before browser tests.
- [ ] Run the complete Playwright suite against the fresh `dist`.
- [ ] Review 1440×1000 and 390×844 screenshots after revealing each section and check horizontal overflow.

