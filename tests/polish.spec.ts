import { expect, test } from "@playwright/test";

test("keeps the mobile portrait, introduction and project action in the first viewport", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: width === 768 ? 900 : 844 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const layout = await page.evaluate(() => {
      const portrait = document.querySelector(".hero-planet")!.getBoundingClientRect();
      const action = document.querySelector(".hero-explore")!.getBoundingClientRect();
      const description = document.querySelector(".hero-current__description")!;
      return {
        portraitBottom: portrait.bottom,
        actionBottom: action.bottom,
        descriptionFont: Number.parseFloat(getComputedStyle(description).fontSize),
        height: innerHeight,
      };
    });
    expect(layout.portraitBottom).toBeLessThan(layout.height);
    expect(layout.actionBottom).toBeLessThan(layout.height);
    expect(layout.descriptionFont).toBeGreaterThanOrEqual(14);
  }
});

test("loads compact logos and keeps restored Mine status consistent", async ({ page }) => {
  const fontRequests: string[] = [];
  page.on("request", (request) => {
    if (/material-symbols.*woff/i.test(request.url())) fontRequests.push(request.url());
  });
  await page.goto("/");
  const mine = page.locator("#project-mine");
  await expect(mine.locator(".showcase-status")).toHaveText("在线运行");
  await mine.locator("summary").click();
  await expect(mine).not.toContainText("暂停");
  await expect(mine.getByRole("link", { name: "产品官网" })).toHaveAttribute("href", "https://mine-knowledge-studio.onrender.com/");
  for (const image of await page.locator("#projects img, .site-brand-mark").all()) {
    const response = await page.request.get((await image.getAttribute("src"))!);
    expect(response.ok()).toBe(true);
    expect((await response.body()).byteLength).toBeLessThan(100_000);
  }
  expect(fontRequests).toEqual([]);
});
