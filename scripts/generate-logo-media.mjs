import { stat } from "node:fs/promises";
import sharp from "sharp";

const logos = [
  "mine", "orbito", "offer-atlas", "music-market-radar",
  "kol-review-desk-transparent", "teeni-insight-suite", "offerexpert",
];
const assets = [
  { base: "public/images/brand/coan-expanse-mark", width: 128 },
  ...logos.map((name) => ({ base: `public/images/project-logos/${name}`, width: 512 })),
];

for (const { base, width } of assets) {
  const input = `${base}.png`;
  const output = `${base}.webp`;
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 100, effort: 6 })
    .toFile(output);
  const before = (await stat(input)).size;
  const after = (await stat(output)).size;
  console.log(`${output}: ${before} -> ${after} bytes (${Math.round((1 - after / before) * 100)}% smaller)`);
}
