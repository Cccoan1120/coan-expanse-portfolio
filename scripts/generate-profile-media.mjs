import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import sharp from "sharp";

const workspace = process.cwd();
const sourceDirectory = resolve("D:/桌面/个人网站资料/生活照片");
const outputDirectory = join(workspace, "public", "images", "profile");

const sources = new Map([
  ["life-explore", join(sourceDirectory, "da33aecfacd9f845c339143d882e3b2c.jpg")],
  ["life-input", join(sourceDirectory, "0591639d8be4715d1ec6c72693346190.jpg")],
  ["life-action", join(sourceDirectory, "d7ff94a837f88082586367116df26da1.jpg")],
]);

async function writeResponsive(name, input) {
  const fullWidth = 1400;
  const smallWidth = 640;

  await Promise.all([
    sharp(input)
      .rotate()
      .resize({ width: fullWidth })
      .avif({ quality: 72, effort: 5 })
      .toFile(join(outputDirectory, `${name}.avif`)),
    sharp(input)
      .rotate()
      .resize({ width: fullWidth })
      .webp({ quality: 84, smartSubsample: true })
      .toFile(join(outputDirectory, `${name}.webp`)),
    sharp(input)
      .rotate()
      .resize({ width: smallWidth })
      .avif({ quality: 66, effort: 5 })
      .toFile(join(outputDirectory, `${name}-sm.avif`)),
    sharp(input)
      .rotate()
      .resize({ width: smallWidth })
      .webp({ quality: 78, smartSubsample: true })
      .toFile(join(outputDirectory, `${name}-sm.webp`)),
  ]);
}

async function writeHorsebackMobile() {
  const input = join(outputDirectory, "horseback.webp");
  const fullWidth = 900;
  const fullHeight = 1125;
  const smallWidth = 640;
  const smallHeight = 800;
  const crop = { fit: "cover", position: sharp.strategy.attention };
  await Promise.all([
    sharp(input).resize(fullWidth, fullHeight, crop).avif({ quality: 72, effort: 5 }).toFile(join(outputDirectory, "horseback-mobile.avif")),
    sharp(input).resize(fullWidth, fullHeight, crop).webp({ quality: 84, smartSubsample: true }).toFile(join(outputDirectory, "horseback-mobile.webp")),
    sharp(input).resize(smallWidth, smallHeight, crop).avif({ quality: 66, effort: 5 }).toFile(join(outputDirectory, "horseback-mobile-sm.avif")),
    sharp(input).resize(smallWidth, smallHeight, crop).webp({ quality: 78, smartSubsample: true }).toFile(join(outputDirectory, "horseback-mobile-sm.webp")),
  ]);
}

await mkdir(outputDirectory, { recursive: true });

for (const [name, input] of sources) await writeResponsive(name, input);
await writeHorsebackMobile();

console.log(`Generated ${sources.size} responsive profile media sets and a mobile horseback crop in ${outputDirectory}`);
