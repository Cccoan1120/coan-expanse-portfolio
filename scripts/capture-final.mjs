import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve(".visual", "life-redesign-final");
const routes = [
  ["home", "/"],
  ["life", "/life"],
  ["projects", "/projects"],
  ["mine", "/projects/mine"],
  ["orbito", "/projects/orbito"],
];
const viewports = [
  ["desktop", { width: 1440, height: 1000 }],
  ["mobile", { width: 390, height: 844 }],
];

await mkdir(outputDirectory, { recursive: true });

const preview = spawn(process.execPath, [path.resolve("node_modules", "vite", "bin", "vite.js"), "preview", "--host", "127.0.0.1", "--port", "4317"], {
  cwd: process.cwd(),
  stdio: "ignore",
});

let ready = false;
for (let attempt = 0; attempt < 40; attempt += 1) {
  try {
    const response = await fetch("http://127.0.0.1:4317/");
    if (response.ok) { ready = true; break; }
  } catch {}
  await new Promise((resolve) => setTimeout(resolve, 250));
}
if (!ready) throw new Error("Preview server did not become ready");

const browser = await chromium.launch();
try {
  for (const [viewportName, viewport] of viewports) {
    const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
    const page = await context.newPage();

    for (const [pageName, route] of routes) {
      await page.goto(`http://127.0.0.1:4317${route}`, { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight * 0.7) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 40));
        }
        window.scrollTo(0, 0);
      });
      await page.screenshot({
        path: path.join(outputDirectory, `${pageName}-${viewportName}.png`),
        fullPage: true,
        animations: "disabled",
      });
    }

    await context.close();
  }
} finally {
  await browser.close();
  preview.kill();
}

console.log(`Saved ${routes.length * viewports.length} screenshots to ${outputDirectory}`);
