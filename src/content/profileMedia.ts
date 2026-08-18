import type { ImageAsset } from "../types/content";

const asset = (name: string, alt: string): ImageAsset => ({
  base: `/images/profile/${name}`,
  alt,
  portrait: true,
});

export const profileMedia = {
  portrait: asset("portrait", "陈宵瀚的个人肖像"),
  horseback: {
    ...asset("horseback", "陈宵瀚和朋友去草原骑马时的剪影"),
    portrait: false,
    fullWidth: 1280,
    mobileBase: "/images/profile/horseback-mobile",
  },
  offDuty: asset("off-duty", "陈宵瀚在草原旅行途中坐在车里"),
  lifeExplore: asset("life-explore", "陈宵瀚在山地徒步途中休息"),
  lifeInput: asset("life-input", "陈宵瀚在旅途中观察与记录"),
  lifeAction: asset("life-action", "陈宵瀚在室内攀岩训练前观察线路"),
} as const;
