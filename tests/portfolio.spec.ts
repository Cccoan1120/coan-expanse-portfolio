import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const navTargets = ["projects", "life", "contact"];

test("renders the complete single-page portfolio in the approved order", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("陈宵瀚");
  await expect(page.locator(".hero-statement")).toHaveText("世界动荡 我不摇晃");
  await expect(page.locator(".observatory-shader")).toHaveAttribute("data-background", "starfield");
  await expect(page.locator(".showcase-feature")).toHaveCount(1);
  await expect(page.locator(".showcase-card")).toHaveCount(6);
  await expect(page.locator("#projects article")).toHaveCount(7);
  await expect(page.locator(".project-work-details")).toHaveCount(7);
  await expect(page.locator(".solution-row")).toHaveCount(5);
  await expect(page.locator("#life .life-story-card")).toHaveCount(6);
  await expect(page.locator("#about")).toBeAttached();
  await expect(page.locator("#contact")).toBeAttached();

  const sectionOrder = await page.locator("main > section").evaluateAll((sections) => sections.map((section) => section.id));
  expect(sectionOrder.indexOf("projects")).toBeLessThan(sectionOrder.indexOf("life"));
  expect(sectionOrder.indexOf("life")).toBeLessThan(sectionOrder.indexOf("about"));
  await expect(page.locator("#project-mine .showcase-number")).toHaveText("01");
  await expect(page.getByRole("heading", { name: "把生活过得辽阔一点，把热爱做得具体一点。" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "天地辽阔 好像怎么走都不会错" })).toBeVisible();
  await expect(page.locator("#projects")).not.toContainText("本地来源");
});

test("renders all local life records with their existing media and public links", async ({ page }) => {
  await page.goto("/#life");
  await expect(page.locator(".life-chapter")).toHaveCount(2);
  await expect(page.locator(".life-story-card")).toHaveCount(6);
  await expect(page.locator(".life-story-card :is(img, video)")).toHaveCount(6);
  await expect(page.locator(".life-story-card video")).toHaveCount(1);
  await expect(page.locator(".life-story-card a")).toHaveCount(5);
  await expect(page.getByRole("link", { name: /看看我的攀岩记录/ })).toHaveAttribute("href", /douyin\.com/);
  await expect(page.getByRole("link", { name: /看看这次夜爬/ })).toHaveAttribute("href", "https://xhslink.cn/o/4XT9O0g8hh9");
  await expect(page.getByRole("heading", { name: "耳机里的 186 小时" })).toBeVisible();
  await expect(page.locator("#life-在路上 + p")).toHaveText("喜欢往外走。去草原、爬山、攀岩，也在一次次出发里认识新的地方和新的人。");
  await expect(page.locator("#live-comedy .life-story-card__copy > p")).toContainText("瞬间——原本只存在于耳机里的世界");
  await expect(page.locator("#podcast-listening .life-story-card__copy > p")).toContainText("我更喜欢的是那些偶然听到的新观点——");
});

test("uses logos only inside the project wall", async ({ page }) => {
  await page.goto("/#projects");
  const projectImages = page.locator("#projects img");
  await expect(projectImages).toHaveCount(7);
  const sources = await projectImages.evaluateAll((images) => images.map((image) => image.getAttribute("src")));
  expect(sources.every((source) => source?.startsWith("/images/project-logos/"))).toBe(true);
  expect(sources.some((source) => source?.includes("project-media"))).toBe(false);
});

test("keeps three keyboard-accessible anchor links and the brand home link", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(1);
  expect(await page.evaluate(() => history.scrollRestoration)).toBe("manual");
  const navigation = page.locator(".desktop-nav");
  await expect(navigation.getByRole("link")).toHaveCount(3);
  for (const target of navTargets) {
    await expect(navigation.locator(`a[href="/#${target}"]`)).toHaveCount(1);
  }
  await expect(navigation.getByRole("link", { name: /作品/ })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /生活/ })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /联系/ })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /关于/ })).toHaveCount(0);
  await expect(page.locator(".site-wordmark")).toHaveAttribute("href", "/");
  await expect(page.locator(".site-brand-mark")).toHaveCount(2);
  await expect(page.locator(".site-brand-mark").first()).toHaveAttribute("src", "/images/brand/coan-expanse-mark.png");

  await navigation.locator('a[href="/#life"]').click();
  await expect(page).toHaveURL(/\/#life$/);
  await expect(page.locator("#life")).toBeInViewport();
  await expect.poll(async () => navigation.locator('a[href="/#life"]').getAttribute("aria-current")).toBe("location");

  await navigation.locator('a[href="/#projects"]').click();
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(page.locator("#projects")).toBeInViewport();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await navigation.locator('a[href="/#projects"]').click();
  await expect(page.locator("#projects")).toBeInViewport();

  await page.locator(".site-wordmark").click();
  await expect(page).toHaveURL(/\/$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(1);
  await expect(navigation.locator('a[aria-current="location"]')).toHaveCount(0);
});

test("shows formal project introductions with expandable work details", async ({ page }) => {
  await page.goto("/#projects");
  const subtitleSize = await page.locator(".project-showcase__subtitle").evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
  expect(subtitleSize).toBeGreaterThanOrEqual(16.8);
  await expect(page.locator("#project-offer-atlas .showcase-summary")).toContainText("求职准备");
  await page.locator("#project-offer-atlas .project-work-details summary").click();
  await expect(page.locator("#project-offer-atlas .project-work-details")).toHaveAttribute("open", "");
  await expect(page.locator("#project-offer-atlas .project-work-details")).toContainText("我做了什么");
  await expect(page.locator("#project-offer-atlas .project-work-details")).toContainText("FSRS");

  const logoStyle = await page.locator("#project-offer-atlas .showcase-logo-stage img").evaluate((image) => {
    const style = getComputedStyle(image);
    return { borderRadius: style.borderRadius, width: Number.parseFloat(style.width) };
  });
  expect(Number.parseFloat(logoStyle.borderRadius)).toBeGreaterThan(0);
  expect(logoStyle.width).toBeGreaterThan(70);

  const logoSources = await page.locator("#projects img").evaluateAll((images) => images.map((image) => image.getAttribute("src")));
  expect(logoSources).toContain("/images/project-logos/music-market-radar.png");
  expect(logoSources).toContain("/images/project-logos/kol-review-desk-transparent.png");
  expect(logoSources).toContain("/images/project-logos/teeni-insight-suite.png");
  expect(logoSources).toContain("/images/project-logos/offerexpert.png");

  const logoWidths = await page.locator("#project-orbito .showcase-logo-stage img, #project-offer-atlas .showcase-logo-stage img")
    .evaluateAll((images) => images.map((image) => Number.parseFloat(getComputedStyle(image).width)));
  expect(Math.abs(logoWidths[0] - logoWidths[1])).toBeLessThanOrEqual(1);

  const subtitleSizes = await page.locator(".project-showcase__subtitle, .life-showcase__header > p")
    .evaluateAll((elements) => elements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize)));
  expect(Math.abs(subtitleSizes[0] - subtitleSizes[1])).toBeLessThanOrEqual(0.1);
  await expect(page.locator(".about-orbit-tag")).toHaveCount(0);
  await expect(page.locator(".about-planet-moon")).toHaveCount(2);
  await expect(page.locator(".showcase-logo-orbit")).toHaveCount(14);
  await expect(page.locator(".showcase-logo-moon")).toHaveCount(14);
});

test("uses pointer-responsive cosmic stages and the revised about copy", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator("[data-cosmic-reactive]")).toHaveCount(9);
  if (testInfo.project.name === "desktop") {
    await page.locator(".hero-planet-stage").hover({ position: { x: 500, y: 320 } });
    await expect(page.locator(".hero-planet-stage")).toHaveAttribute("data-cosmic-active", "true");
  } else {
    await expect(page.locator(".hero-planet-stage")).not.toHaveAttribute("data-cosmic-active", "true");
  }
  await expect(page.locator(".about-role")).toHaveText("在产品、AI 和真实问题之间不断折腾的人。");
  await expect(page.locator(".about-traits")).toContainText("持续折腾");
  await expect(page.locator(".about-facts")).toContainText("生活切片 / Moments");
  await expect(page.locator(".about-copy > a")).toHaveText(/继续看看，我还在折腾什么/);
  await expect(page.locator(".about-copy")).toContainText("做产品大概就是这样——从一个真实的小问题开始，然后一点点把它变得更好");
  await expect(page.locator(".hero-orbit")).toHaveCount(1);
  await expect(page.locator(".scroll-progress")).toHaveCount(1);
  await expect(page.locator(".meteor-pointer-trail")).toHaveCount(1);
});

test("redirects legacy routes and preserves valid record anchors", async ({ page }) => {
  await page.goto("/projects");
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(page.locator("#projects")).toBeVisible();

  await page.goto("/life#grassland-sunset");
  await expect(page).toHaveURL(/\/#grassland-sunset$/);
  await expect(page.locator("#grassland-sunset")).toBeVisible();

  await page.goto("/projects/orbito");
  await expect(page).toHaveURL(/\/#project-orbito$/);
  await expect(page.locator("#project-orbito")).toBeVisible();

  await page.goto("/projects/tenni-signal");
  await expect(page).toHaveURL(/\/#projects$/);

  await page.goto("/projects/supply-chain-agents");
  await expect(page).toHaveURL(/\/#project-supply-chain-agents$/);
  await expect(page.locator("#project-supply-chain-agents")).toBeVisible();

  await page.goto("/projects/not-a-project");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("这页什么也没有。");
});

test("keeps resume and contact actions in the footer", async ({ page }) => {
  await page.goto("/#contact");
  const footer = page.locator(".site-footer");
  await expect(footer.getByRole("link", { name: /简历/ })).toHaveAttribute("href", "/resume/chen-xiaohan-resume.pdf");
  const email = footer.getByRole("button", { name: /我的邮箱/ });
  await expect(email).toHaveAttribute("aria-expanded", "false");
  await expect(footer).not.toContainText("17631646028@163.com");
  await email.click();
  await expect(email).toHaveAttribute("aria-expanded", "true");
  await expect(footer).toContainText("17631646028@163.com");
  await expect(footer.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(footer.getByRole("button", { name: /微信/ })).toBeVisible();
});

test("loads every home image after it enters the viewport", async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto("/");
  const images = page.locator("main img");
  for (let index = 0; index < await images.count(); index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((node) => node.complete && node.naturalWidth > 0)).toBe(true);
  }
});

test("opens and closes the WeChat dialog with the keyboard", async ({ page }) => {
  await page.goto("/#contact");
  const trigger = page.locator(".site-footer").getByRole("button", { name: /微信/ });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("opens the mobile menu and restores focus on Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "打开导航" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#mobile-navigation").getByRole("link")).toHaveCount(3);
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-navigation")).toHaveAttribute("aria-hidden", "true");
  await expect(trigger).toBeFocused();
});

test("uses only self-hosted runtime media", async ({ page }) => {
  const forbidden: string[] = [];
  page.on("request", (request) => {
    if (/douyinpic|xhscdn|googleusercontent|fonts\.googleapis|fonts\.gstatic|cdn\.tailwindcss|unpkg\.com/i.test(request.url())) forbidden.push(request.url());
  });
  await page.goto("/");
  for (const section of ["projects", "life", "about", "contact"]) await page.locator(`#${section}`).scrollIntoViewIfNeeded();
  expect(forbidden).toEqual([]);
});

test("falls back cleanly when WebGL is unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (contextId: string, ...args: unknown[]) {
      if (contextId === "webgl" || contextId === "experimental-webgl") return null;
      return original.call(this, contextId as "2d", ...args as []) as never;
    } as typeof HTMLCanvasElement.prototype.getContext;
  });
  await page.goto("/");
  await expect(page.locator(".observatory-shader")).toHaveAttribute("data-webgl", "fallback");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("has no serious or critical accessibility violations", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((item) => ["critical", "serious"].includes(item.impact ?? ""))).toEqual([]);
});

for (const width of [320, 375, 390, 414, 768, 1024, 1440, 1920]) {
  test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test("freezes transitions for reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".observatory-shader")).toHaveAttribute("data-motion", "static");
  const duration = await page.locator(".showcase-logo-stage img").first().evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.00001);
});
