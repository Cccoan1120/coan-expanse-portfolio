import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const outputDirectory = join(process.cwd(), "public", "images", "life");
const assets = new Map([
  ["grassland-sunset", "https://p3-pc-sign.douyinpic.com/tos-cn-i-0813c000-ce/o8KqtqABfACaAeDQAJusSyIw2F9BLbjApnEEEO~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=327834062&lk3s=138a59ce&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=2101953600&x-signature=LcjWXLo8GVzWxNo7nEO5yyPfbWA%3D"],
  ["live-comedy", "https://sns-webpic-qc.xhscdn.com/202608131221/91fca78114fac4459605535bb368dad2/notes_pre_post/1040g3k8321h8ihr57a805n8sjfhlh9ci5drkmog!nc_n_webp_mw_1"],
  ["reading-notes", "https://sns-webpic-qc.xhscdn.com/202608131221/e1183c42f7132565bca46d25f386998b/notes_pre_post/1040g3k8320ccjqckm87g5n8sjfhlh9cie92cq60!nc_n_webp_mw_1"],
  ["first-vibe-product", "https://sns-webpic-qc.xhscdn.com/202608131221/1fd86217b1d2a1b6989e3953e872f90a/1040g008322i1can07a005n8sjfhlh9cie63ptcg!nc_n_webp_mw_1"],
]);

await mkdir(outputDirectory, { recursive: true });

for (const [name, url] of assets) {
  const response = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!response.ok) throw new Error(`${name} download failed with ${response.status}`);
  const input = Buffer.from(await response.arrayBuffer());
  const image = sharp(input).rotate().resize({ width: 1400, withoutEnlargement: true });
  const metadata = await image.metadata();
  const full = await image.toBuffer();
  const smallWidth = Math.min(640, metadata.width ?? 640);
  await Promise.all([
    sharp(full).avif({ quality: 72, effort: 5 }).toFile(join(outputDirectory, `${name}.avif`)),
    sharp(full).webp({ quality: 84, smartSubsample: true }).toFile(join(outputDirectory, `${name}.webp`)),
    sharp(full).resize({ width: smallWidth }).avif({ quality: 66, effort: 5 }).toFile(join(outputDirectory, `${name}-sm.avif`)),
    sharp(full).resize({ width: smallWidth }).webp({ quality: 78, smartSubsample: true }).toFile(join(outputDirectory, `${name}-sm.webp`)),
  ]);
}

console.log(`Generated ${assets.size} local life media sets in ${outputDirectory}`);
