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
  await expect(page.getByRole("heading", { name: "喜欢坐在观众席里" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "听别人聊聊世界" })).toBeVisible();
  await expect(page.locator("#grassland-horseback img")).toHaveAttribute("src", "/images/life/grassland-drive.webp");
  await expect(page.locator("#life-在路上 + p")).toHaveText("喜欢往外走。去草原、爬山、攀岩，也在一次次出发里认识新的地方和新的人。");
  await expect(page.locator("#climbing .life-story-card__copy > p")).not.toContainText("第一次攀岩没多久就办了月卡");
  await expect(page.locator("#live-comedy .life-story-card__copy > p")).toHaveText("我一直很喜欢喜剧和脱口秀，也会经常去看不同的展演和现场演出。比起隔着屏幕看，我更喜欢坐在观众席里，和一群陌生人一起笑、一起感受现场的节奏。很多有意思的观点和表达，也是在这些轻松的时刻里被记住的。");
  await expect(page.getByRole("link", { name: /看看我的现场记录/ })).toHaveAttribute("href", /xiaohongshu\.com/);
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
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.reload();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(1);
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
    const trail = page.locator(".meteor-pointer-trail");
    await trail.evaluate((canvas: HTMLCanvasElement) => {
      const context = canvas.getContext("2d");
      if (!context) return;
      const originalStroke = context.stroke.bind(context);
      context.stroke = (path?: Path2D) => {
        canvas.dataset.strokeCount = String(Number(canvas.dataset.strokeCount ?? 0) + 1);
        if (path) originalStroke(path);
        else originalStroke();
      };
    });
    await page.locator(".hero-planet-stage").hover({ position: { x: 500, y: 320 } });
    await expect(page.locator(".hero-planet-stage")).toHaveAttribute("data-cosmic-active", "true");
    await page.mouse.move(220, 260);
    await page.mouse.move(860, 420, { steps: 24 });
    await expect(trail).toHaveAttribute("data-visible", "true");
    await expect.poll(() => trail.evaluate((canvas) => Number(canvas.dataset.strokeCount ?? 0))).toBeGreaterThan(0);
  } else {
    await expect(page.locator(".hero-planet-stage")).not.toHaveAttribute("data-cosmic-active", "true");
  }
  await expect(page.locator(".about-role")).toHaveText("ENFJ，一个喜欢认识新朋友，也喜欢把新想法做出来的人。");
  await expect(page.locator(".about-traits li")).toHaveText(["ENFJ", "产品", "AI", "Vibe Coding", "保持好奇"]);
  await expect(page.locator(".about-facts")).toContainText("生活切片 / Moments");
  await expect(page.locator(".about-copy > a")).toHaveCount(0);
  await expect(page.locator(".about-copy")).toContainText("我是一个挺外向的人，喜欢聊天、认识新朋友，也很享受和不同的人交换经历和想法。");
  await expect(page.locator(".about-copy")).toContainText("比起做一个看起来很厉害的产品，我更喜欢解决那些真实又具体的小问题");
  await expect(page.locator(".about-closing")).toHaveText("大概就是这样：喜欢认识人，喜欢体验新的东西，也喜欢把脑子里的想法变成真的。");
  await expect(page.locator(".about-experience-list li")).toHaveCount(3);
  await expect(page.locator(".about-experience-list")).toContainText("北京汀灵智能科技有限公司");
  await expect(page.locator(".about-experience-list")).toContainText("产品运营实习生");
  await expect(page.locator(".about-experience-list")).toContainText("北京五八信息技术有限公司（58 同城）");
  await expect(page.locator(".about-experience-list")).toContainText("海外增长运营实习生");
  await expect(page.locator(".about-experience-list")).toContainText("致同会计师事务所（特殊普通合伙）");
  await expect(page.locator(".about-experience-list")).toContainText("审计实习生");
  await expect(page.locator(".about-honors-list li")).toHaveText([
    "2024年国家奖学金",
    "2025年河北省优秀毕业生",
    "2026年“挑战杯”首都大学生创业计划竞赛专项赛特等奖",
    "2026年“挑战杯”首都大学生创业计划竞赛主赛道三等奖",
  ]);
  const historySurface = await page.locator(".about-history").evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      backdropFilter: style.backdropFilter,
      backgroundColor: style.backgroundColor,
      borderRadius: style.borderRadius,
      borderWidth: style.borderTopWidth,
    };
  });
  expect(historySurface.backdropFilter).toContain("blur");
  expect(historySurface.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  expect(historySurface.borderRadius).toBe("8px");
  expect(historySurface.borderWidth).toBe("1px");
  await expect(page.locator(".hero-orbit")).toHaveCount(1);
  await expect(page.locator(".scroll-progress")).toHaveCount(1);
  await expect(page.locator(".meteor-pointer-trail")).toHaveCount(1);
});

test("plays a staged opening across the home hero", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator(".hero-name-character")).toHaveText(["陈", "宵", "瀚"]);
  await expect(page.locator("#home-title")).toHaveAttribute("aria-label", "陈宵瀚");
  const openingAnimations = await page.locator(".hero-name-character, .hero-eyebrow, .hero-planet-stage")
    .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).animationName));
  expect(openingAnimations).toContain("hero-name-unfold");
  expect(openingAnimations).toContain("hero-content-unfold");
  expect(openingAnimations).toContain("hero-stage-unfold");
  await expect(page.locator("#home-title")).toBeVisible();
  await expect(page.locator(".hero-planet-stage")).toBeVisible();
});

test("keeps the about history rail compact on wide screens", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/#about");
  const widths = await page.locator("#about").evaluate((about) => ({
    section: about.getBoundingClientRect().width,
    history: about.querySelector(".about-history")?.getBoundingClientRect().width ?? 0,
  }));
  expect(widths.history).toBeLessThanOrEqual(1313);
  expect(widths.section - widths.history).toBeGreaterThanOrEqual(100);
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

test("keeps resume and contact actions in the footer", async ({ page }, testInfo) => {
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
  const socialTitle = footer.locator(".contact-panel__social h3");
  await expect(socialTitle).toHaveText("也可以在这些平台找到我。");
  await expect(socialTitle.locator("span")).toHaveText(["也可以在这些平台", "找到我。"]);
  await expect(footer.locator(".footer-bottom")).toContainText("纵有疾风起，人生不言弃");
  await expect(footer.locator(".footer-bottom")).not.toContainText("想出发就出发");
  if (testInfo.project.name === "desktop") {
    const contactRhythm = await footer.evaluate((element) => {
      const direct = element.querySelector(".contact-panel__direct")?.getBoundingClientRect();
      const social = element.querySelector(".contact-panel__social")?.getBoundingClientRect();
      const contactTitle = element.querySelector(".contact-panel__intro h2");
      const socialTitle = element.querySelector(".contact-panel__social h3");
      return {
        gap: direct && social ? social.top - direct.bottom : Number.POSITIVE_INFINITY,
        contactTitleSize: contactTitle ? Number.parseFloat(getComputedStyle(contactTitle).fontSize) : 0,
        socialTitleSize: socialTitle ? Number.parseFloat(getComputedStyle(socialTitle).fontSize) : Number.POSITIVE_INFINITY,
      };
    });
    expect(contactRhythm.gap).toBeGreaterThanOrEqual(24);
    expect(contactRhythm.gap).toBeLessThanOrEqual(72);
    expect(contactRhythm.socialTitleSize).toBeLessThan(contactRhythm.contactTitleSize / 2);
  }
  const footerSurface = await footer.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      backgroundColor: style.backgroundColor,
      backgroundImage: style.backgroundImage,
      decoration: getComputedStyle(element, "::before").content,
    };
  });
  expect(footerSurface).toEqual({
    backgroundColor: "rgba(0, 0, 0, 0)",
    backgroundImage: "none",
    decoration: "none",
  });
  const contactSurface = await footer.locator(".contact-panel").evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      borderWidth: style.borderTopWidth,
      borderRadius: style.borderRadius,
      boxShadow: style.boxShadow,
      backdropFilter: style.backdropFilter,
      decoration: getComputedStyle(element, "::before").content,
    };
  });
  expect(contactSurface).toEqual({
    borderWidth: "0px",
    borderRadius: "0px",
    boxShadow: "none",
    backdropFilter: "none",
    decoration: "none",
  });
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
  const openingDurations = await page.locator(".hero-name-character, .hero-planet-stage")
    .evaluateAll((elements) => elements.map((element) => Number.parseFloat(getComputedStyle(element).animationDuration)));
  expect(openingDurations.every((value) => value <= 0.00001)).toBe(true);
});
