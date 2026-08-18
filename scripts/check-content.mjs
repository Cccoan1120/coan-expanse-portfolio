import { access, readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const readableExtensions = new Set([".css", ".html", ".js", ".json", ".md", ".mjs", ".svg", ".ts", ".tsx"]);
const ignoredDirectories = new Set([".git", "dist", "node_modules", "test-results"]);
const allowedEmails = new Set(["17631646028@163.com"]);
const lifeMediaBases = ["life-explore", "life-input", "life-action", "horseback", "off-duty"];
const mobileLifeMediaBases = ["horseback-mobile"];
const publicLifeMediaBases = ["grassland-sunset", "live-comedy", "east-monkey-peak", "podcast-listening"];
const publicLifeVideos = ["hiking.mp4", "hiking-poster.webp", "grassland-sunset.mp4", "grassland-sunset-poster.webp"];
const privateLifeSourceNames = new Set([
  "da33aecfacd9f845c339143d882e3b2c.jpg",
  "0591639d8be4715d1ec6c72693346190.jpg",
  "d7ff94a837f88082586367116df26da1.jpg",
]);
const failures = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (ignoredDirectories.has(entry.name)) continue;
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(absolute);
      continue;
    }
    const path = relative(root, absolute);
    const isPublicFile = path.split(/[\\/]/)[0] === "public";
    if (isPublicFile && privateLifeSourceNames.has(entry.name)) failures.push(`${path}: private source photo copied into public assets`);
    if (isPublicFile && /^life-(?:explore|input|action)\.(?:jpe?g|png|heic)$/i.test(entry.name)) {
      failures.push(`${path}: life image must only use metadata-stripped AVIF/WebP derivatives`);
    }
    if (!readableExtensions.has(extname(entry.name))) continue;

    const value = await readFile(absolute, "utf8");
    if (path === "scripts\\check-content.mjs" || path.endsWith(".test.ts") || path.endsWith(".test.tsx")) continue;
    const emails = value.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g) ?? [];
    for (const email of emails) {
      if (!allowedEmails.has(email)) failures.push(`${path}: unexpected public email ${email}`);
    }

    const withoutEmails = value.replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g, "");
    if (/\b1[3-9]\d{9}\b/.test(withoutEmails)) failures.push(`${path}: possible phone number`);
    if (/\b(?:sk|xox[baprs])-[-A-Za-z0-9_]{16,}\b/.test(value)) failures.push(`${path}: possible API secret`);
    if (/https?:\/\/(?:www\.)?example\.com|placeholder\.com/i.test(value)) failures.push(`${path}: placeholder URL`);
    if (path.startsWith("src\\") && /(?:lh3\.googleusercontent\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.tailwindcss\.com|unpkg\.com)/i.test(value)) {
      failures.push(`${path}: forbidden remote production asset`);
    }
  }
}

await walk(root);

const projectSource = await readFile(join(root, "src/content/projects.ts"), "utf8");
const showcaseRanks = [...projectSource.matchAll(/showcaseRank:\s*(\d+)/g)].map((match) => Number(match[1]));
const logoAssets = [...projectSource.matchAll(/logo:\s*\{\s*src:\s*"([^"]+)",\s*alt:\s*"([^"]+)"\s*\}/g)];
const expectedRanks = Array.from({ length: 17 }, (_, index) => index + 1);
if (showcaseRanks.length !== 17 || new Set(showcaseRanks).size !== 17 || showcaseRanks.sort((a, b) => a - b).join(",") !== expectedRanks.join(",")) {
  failures.push("src/content/projects.ts: showcaseRank must contain every unique rank from 1 to 17");
}
if (logoAssets.length !== 17) failures.push("src/content/projects.ts: every project must define a non-empty logo asset");
for (const [, src, alt] of logoAssets) {
  if (!alt.trim()) failures.push(`${src}: project logo alt text is empty`);
  if (!src.startsWith("/images/project-logos/")) failures.push(`${src}: project logo must use the local project logo directory`);
  try {
    await access(join(root, "public", src.replace(/^\//, "")));
  } catch {
    failures.push(`${src}: missing local project logo`);
  }
}

const projectMediaBases = [
  "home-mine",
  "home-offer-atlas",
  "home-orbito",
  "home-kol",
  "home-teeni",
  "home-smart-agriculture",
  "projects-mine",
  "projects-orbito",
  "spotlight-offer-atlas",
  "spotlight-music-radar",
  "spotlight-tenni-signal",
  "mine-hero",
  "mine-hero-mobile",
  "mine-evidence-workbench",
  "mine-evidence-auth",
  "mine-evidence-mobile",
  "orbito-dashboard",
  "orbito-dashboard-mobile",
];
for (const base of projectMediaBases) {
  for (const suffix of ["", "-sm"]) {
    for (const extension of [".avif", ".webp"]) {
      const path = `public/images/project-media/${base}${suffix}${extension}`;
      try {
        await access(join(root, path));
      } catch {
        failures.push(`${path}: missing responsive real-project image`);
      }
    }
  }
}

for (const base of lifeMediaBases) {
  for (const suffix of ["", "-sm"]) {
    for (const extension of [".avif", ".webp"]) {
      const path = `public/images/profile/${base}${suffix}${extension}`;
      const absolute = join(root, path);
      try {
        await access(absolute);
        const metadata = await sharp(absolute).metadata();
        if (metadata.exif || metadata.iptc || metadata.xmp || metadata.icc || metadata.gps || metadata.orientation) {
          failures.push(`${path}: embedded metadata was not stripped`);
        }
      } catch {
        failures.push(`${path}: missing responsive life image`);
      }
    }
  }
}

for (const base of mobileLifeMediaBases) {
  for (const suffix of ["", "-sm"]) {
    for (const extension of [".avif", ".webp"]) {
      const path = `public/images/profile/${base}${suffix}${extension}`;
      const absolute = join(root, path);
      try {
        await access(absolute);
        const metadata = await sharp(absolute).metadata();
        if (metadata.exif || metadata.iptc || metadata.xmp || metadata.icc || metadata.gps || metadata.orientation) {
          failures.push(`${path}: embedded metadata was not stripped`);
        }
      } catch {
        failures.push(`${path}: missing responsive mobile life image`);
      }
    }
  }
}

for (const base of publicLifeMediaBases) {
  for (const suffix of ["", "-sm"]) {
    for (const extension of [".avif", ".webp"]) {
      const path = `public/images/life/${base}${suffix}${extension}`;
      try {
        await access(join(root, path));
      } catch {
        failures.push(`${path}: missing local public life image`);
      }
    }
  }
}

for (const file of publicLifeVideos) {
  const path = `public/videos/life/${file}`;
  try {
    await access(join(root, path));
  } catch {
    failures.push(`${path}: missing local life video asset`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Content and privacy scan passed.");
}
