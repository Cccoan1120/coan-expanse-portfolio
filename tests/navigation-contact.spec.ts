import { expect, test } from "@playwright/test";

test("contains mobile keyboard focus and restores the page on Escape or resize", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.locator(".mobile-menu-button");
  const menu = page.locator("#mobile-navigation");
  const links = menu.getByRole("link");
  await trigger.click();
  await expect(links).toHaveCount(4);
  await expect(links.first()).toBeFocused();
  await expect(page.locator("main")).toHaveJSProperty("inert", true);
  await expect(page.locator(".site-footer")).toHaveJSProperty("inert", true);
  await expect(page.locator(".site-wordmark")).toHaveJSProperty("inert", true);

  await page.keyboard.press("Shift+Tab");
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(links.last()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(links.first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-hidden", "true");
  await expect(trigger).toBeFocused();
  await expect(page.locator("main")).toHaveJSProperty("inert", false);

  await trigger.click();
  await expect(links.first()).toBeFocused();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(menu).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator("main")).toHaveJSProperty("inert", false);
  await expect(page.locator(".site-footer")).toHaveJSProperty("inert", false);
  await expect(page.locator(".site-wordmark")).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
});

test("moves focus to the about heading after mobile section navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "打开导航" }).click();
  await page.locator("#mobile-navigation").getByRole("link", { name: /关于/ }).click();
  await expect(page).toHaveURL(/\/#about$/);
  await expect(page.locator("#mobile-navigation")).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator("main")).toHaveJSProperty("inert", false);
  await expect(page.locator("#about h2").first()).toBeFocused();
});

test("copies the revealed email with accessible success feedback", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async (text: string) => { document.documentElement.dataset.copiedEmail = text; } },
    });
  });
  await page.goto("/#contact");
  await expect(page.getByRole("button", { name: "复制邮箱" })).toHaveCount(0);
  await page.getByRole("button", { name: /我的邮箱/ }).click();
  const address = await page.locator(".contact-email__address").innerText();
  await page.getByRole("button", { name: "复制邮箱", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-copied-email", address);
  await expect(page.locator(".contact-email").getByRole("status")).toHaveText("邮箱已复制");
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
});

test("keeps an email copy failure retryable and the address available for manual copy", async ({ page }) => {
  await page.addInitScript(() => {
    let attempts = 0;
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          attempts += 1;
          if (attempts === 1) throw new DOMException("Permission denied", "NotAllowedError");
        },
      },
    });
  });
  await page.goto("/#contact");
  await page.getByRole("button", { name: /我的邮箱/ }).click();
  const copyButton = page.getByRole("button", { name: "复制邮箱", exact: true });
  await copyButton.click();
  await expect(page.locator(".contact-email").getByRole("status")).toHaveText("复制失败，请重试，或选中邮箱手动复制。");
  await expect(page.locator(".contact-email__address")).toBeVisible();
  await expect(copyButton).toBeEnabled();
  await copyButton.click();
  await expect(page.locator(".contact-email").getByRole("status")).toHaveText("邮箱已复制");
});
