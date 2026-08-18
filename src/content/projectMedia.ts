import type { ImageAsset } from "../types/content";

const asset = (
  name: string,
  alt: string,
  options: Pick<ImageAsset, "portrait"> & { mobileName?: string } = {},
): ImageAsset => ({
  base: `/images/project-media/${name}`,
  alt,
  portrait: options.portrait,
  ...(options.mobileName ? { mobileBase: `/images/project-media/${options.mobileName}` } : {}),
});

export const projectMedia = {
  homeProjects: {
    "offer-atlas": asset("home-offer-atlas", "Offer Atlas 今日复习与面试复盘工作台"),
    mine: asset("home-mine", "Mine 真实素材工作台界面"),
    orbito: asset("home-orbito", "Orbito 今日、计划与记录真实界面"),
    "kol-review-desk": asset("home-kol", "KOL Review Desk 脱敏后的真实审核队列界面"),
    "teeni-insight-suite": asset("home-teeni", "Teeni 对话分析套件的真实数据导入界面"),
    "smart-agriculture-live": asset("home-smart-agriculture", "智播兴农团队在北京怀柔开展实地访谈"),
  },
  flagshipProjects: {
    mine: asset("projects-mine", "Mine 真实桌面端素材工作台"),
    orbito: asset("projects-orbito", "Orbito 三个主要页面的真实移动端界面"),
  },
  spotlightProjects: {
    "offer-atlas": asset("spotlight-offer-atlas", "Offer Atlas 今日复习与面试复盘工作台"),
    "music-market-radar": asset("spotlight-music-radar", "Music Market Radar 跨平台音乐趋势概览"),
    "tenni-signal": asset("spotlight-tenni-signal", "Tenni Signal 舆情风险证据与处置工作台"),
  },
  mineHero: asset("mine-hero", "Mine 桌面端素材工作台全景", { mobileName: "mine-hero-mobile" }),
  mineEvidence: [
    asset("mine-evidence-workbench", "Mine 素材编辑与基于来源问答界面"),
    asset("mine-evidence-auth", "Mine 登录注册与账号隔离入口"),
    asset("mine-evidence-mobile", "Mine 移动端素材工作台界面"),
  ],
  orbitoDashboard: asset("orbito-dashboard", "Orbito 今日、计划、记录与资讯真实界面", {
    mobileName: "orbito-dashboard-mobile",
  }),
} as const;
