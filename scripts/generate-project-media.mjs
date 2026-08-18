import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import sharp from "sharp";

const workspace = process.cwd();
const outputDirectory = join(workspace, "public", "images", "project-media");
const documents = resolve(workspace, "..", "..");

const sources = {
  mineWorkbench: join(workspace, "public", "images", "projects", "mine-workbench.webp"),
  mineDesktop: join(documents, "VibeCoding", "mine-ui-desktop.png"),
  mineMobile: join(documents, "VibeCoding", "mine-ui-mobile.png"),
  mineAuth: join(documents, "VibeCoding", "mine-auth-desktop-after.png"),
  orbitoToday: join(workspace, "public", "images", "projects", "orbito-today.webp"),
  orbitoCalendar: join(workspace, "public", "images", "projects", "orbito-calendar.webp"),
  orbitoRecords: join(workspace, "public", "images", "projects", "orbito-records.webp"),
  orbitoFeed: join(workspace, "public", "images", "projects", "orbito-feed.webp"),
  kol: join(documents, "KOL", "artifacts", "app-current.png"),
  teeni: join(outputDirectory, "home-teeni.webp"),
  fieldInterview: join(workspace, "public", "images", "evidence", "field-interview.webp"),
  offerAtlas: join(workspace, "tmp", "source-captures", "offer-atlas.png"),
  musicRadar: join(workspace, "tmp", "source-captures", "music-market-radar.png"),
  tenniSignal: join(
    documents,
    "Codex",
    "2026-08-11",
    "new-chat",
    "work",
    "screenshots",
    "desktop-content-detail.png",
  ),
};

const background = { r: 8, g: 11, b: 17, alpha: 1 };

async function framed(input, width, height, padding = 22) {
  const image = await sharp(input)
    .rotate()
    .resize(width - padding * 2, height - padding * 2, {
      fit: "contain",
      background,
    })
    .png()
    .toBuffer();
  const metadata = await sharp(image).metadata();
  return sharp({ create: { width, height, channels: 4, background } })
    .composite([{
      input: image,
      left: Math.round((width - metadata.width) / 2),
      top: Math.round((height - metadata.height) / 2),
    }])
    .png()
    .toBuffer();
}

async function crop(input, width, height, position = "centre") {
  return sharp(input)
    .rotate()
    .resize(width, height, { fit: "cover", position })
    .png()
    .toBuffer();
}

async function phoneComposite(inputs, width, height, columns) {
  const rows = Math.ceil(inputs.length / columns);
  const outer = width >= 1200 ? 34 : 28;
  const gap = width >= 1200 ? 22 : 18;
  const cellWidth = (width - outer * 2 - gap * (columns - 1)) / columns;
  const cellHeight = (height - outer * 2 - gap * (rows - 1)) / rows;
  const layers = [];

  for (let index = 0; index < inputs.length; index += 1) {
    const metadata = await sharp(inputs[index]).metadata();
    const scale = Math.min(cellWidth / metadata.width, cellHeight / metadata.height);
    const imageWidth = Math.round(metadata.width * scale);
    const imageHeight = Math.round(metadata.height * scale);
    const column = index % columns;
    const row = Math.floor(index / columns);
    const left = Math.round(outer + column * (cellWidth + gap) + (cellWidth - imageWidth) / 2);
    const top = Math.round(outer + row * (cellHeight + gap) + (cellHeight - imageHeight) / 2);
    const image = await sharp(inputs[index])
      .rotate()
      .resize(imageWidth, imageHeight, { fit: "fill" })
      .png()
      .toBuffer();
    layers.push({ input: image, left, top });
  }

  return sharp({ create: { width, height, channels: 4, background } })
    .composite(layers)
    .png()
    .toBuffer();
}

async function redactKol() {
  const rowMasks = Array.from({ length: 8 }, (_, index) => {
    const y = 319 + index * 68;
    return `
      <rect x="250" y="${y}" width="382" height="47" rx="3" fill="#11140f"/>
      <rect x="748" y="${y}" width="648" height="47" rx="3" fill="#11140f"/>
    `;
  }).join("");
  const overlaySvg = Buffer.from(`
    <svg width="1440" height="810" xmlns="http://www.w3.org/2000/svg">
      <g fill="#11140f">
        <rect x="448" y="143" width="48" height="34" rx="3"/>
        <rect x="748" y="143" width="48" height="34" rx="3"/>
        <rect x="1048" y="143" width="58" height="34" rx="3"/>
        <rect x="1340" y="143" width="58" height="34" rx="3"/>
      </g>
      ${rowMasks}
    </svg>
  `);
  const overlay = await sharp(overlaySvg).resize(1440, 810, { fit: "fill" }).png().toBuffer();

  const base = await sharp(sources.kol)
    .rotate()
    .extract({ left: 0, top: 0, width: 1440, height: 810 })
    .png()
    .toBuffer();
  const baseMetadata = await sharp(base).metadata();
  const normalizedOverlay = await sharp(overlay).resize(baseMetadata.width, baseMetadata.height, { fit: "fill" }).png().toBuffer();

  const redacted = await sharp(base)
    .composite([{ input: normalizedOverlay, left: 0, top: 0 }])
    .png()
    .toBuffer();
  return sharp(redacted).resize(1400, 788, { fit: "fill" }).png().toBuffer();
}

async function teeniHome() {
  return sharp(sources.teeni)
    .rotate()
    .resize(1400, 788, { fit: "fill" })
    .png()
    .toBuffer();
}

async function writeResponsive(name, input, smallWidth = 640) {
  const metadata = await sharp(input).metadata();
  const smallHeight = Math.round((metadata.height / metadata.width) * smallWidth);
  await Promise.all([
    sharp(input).rotate().avif({ quality: 72, effort: 5 }).toFile(join(outputDirectory, `${name}.avif`)),
    sharp(input).rotate().webp({ quality: 84, smartSubsample: true }).toFile(join(outputDirectory, `${name}.webp`)),
    sharp(input)
      .rotate()
      .resize(smallWidth, smallHeight, { fit: "fill" })
      .avif({ quality: 66, effort: 5 })
      .toFile(join(outputDirectory, `${name}-sm.avif`)),
    sharp(input)
      .rotate()
      .resize(smallWidth, smallHeight, { fit: "fill" })
      .webp({ quality: 78, smartSubsample: true })
      .toFile(join(outputDirectory, `${name}-sm.webp`)),
  ]);
}

await mkdir(outputDirectory, { recursive: true });

const orbitoThree = [sources.orbitoToday, sources.orbitoCalendar, sources.orbitoRecords];
const orbitoFour = [...orbitoThree, sources.orbitoFeed];
const assets = new Map([
  ["home-offer-atlas", await crop(sources.offerAtlas, 1400, 788, "north")],
  ["home-mine", await framed(sources.mineWorkbench, 1400, 788)],
  ["home-orbito", await phoneComposite(orbitoThree, 1400, 788, 3)],
  ["home-kol", await redactKol()],
  ["home-teeni", await teeniHome()],
  ["home-smart-agriculture", await crop(sources.fieldInterview, 1400, 788, "centre")],
  ["projects-mine", await framed(sources.mineDesktop, 1400, 788)],
  ["projects-orbito", await phoneComposite(orbitoThree, 1400, 788, 3)],
  ["spotlight-offer-atlas", await crop(sources.offerAtlas, 1400, 788, "north")],
  ["spotlight-music-radar", await crop(sources.musicRadar, 1400, 788, "north")],
  ["spotlight-tenni-signal", await crop(sources.tenniSignal, 1400, 788, "north")],
  ["mine-hero", await framed(sources.mineDesktop, 1400, 648)],
  ["mine-hero-mobile", await framed(sources.mineMobile, 900, 1125, 24)],
  ["mine-evidence-workbench", await framed(sources.mineWorkbench, 1400, 700)],
  ["mine-evidence-auth", await framed(sources.mineAuth, 1400, 700)],
  ["mine-evidence-mobile", await framed(sources.mineMobile, 1400, 700)],
  ["orbito-dashboard", await phoneComposite(orbitoFour, 1400, 788, 4)],
  ["orbito-dashboard-mobile", await phoneComposite(orbitoFour, 900, 1125, 2)],
]);

for (const [name, input] of assets) await writeResponsive(name, input);

console.log(`Generated ${assets.size} responsive real-project media sets in ${outputDirectory}`);
