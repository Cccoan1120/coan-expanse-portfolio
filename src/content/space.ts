export interface SpaceAsset {
  id: "cosmic-cliffs" | "webb-deep-field";
  base: string;
  alt: string;
  credit: string;
  source: string;
  sourceLabel: string;
}

export const spaceAssets: Record<SpaceAsset["id"], SpaceAsset> = {
  "cosmic-cliffs": {
    id: "cosmic-cliffs",
    base: "/images/space/cosmic-cliffs",
    alt: "韦布空间望远镜拍摄的船底座星云宇宙悬崖，蓝色恒星区悬于琥珀色星云之上",
    credit: "NASA, ESA, CSA, STScI",
    source: "https://science.nasa.gov/asset/webb/cosmic-cliffs-in-the-carina-nebula-nircam-image/",
    sourceLabel: "Cosmic Cliffs",
  },
  "webb-deep-field": {
    id: "webb-deep-field",
    base: "/images/space/webb-deep-field",
    alt: "韦布空间望远镜拍摄的首张深空场，黑色宇宙中分布着大量不同形状和颜色的遥远星系",
    credit: "NASA, ESA, CSA, STScI",
    source: "https://science.nasa.gov/asset/webb/webbs-first-deep-field-unveiled-nircam-image/",
    sourceLabel: "Webb's First Deep Field",
  },
};

export const spaceAssetList = Object.values(spaceAssets);
