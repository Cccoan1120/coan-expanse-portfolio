import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve(".visual", "latest-stitch-final");
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://127.0.0.1:4331/", { waitUntil: "networkidle" });
await page.mouse.move(780, 420);
await page.waitForTimeout(80);
await page.screenshot({ path: path.join(outputDirectory, "observatory-cursor-desktop.png") });
await browser.close();

console.log(`Saved observatory cursor preview to ${outputDirectory}`);
