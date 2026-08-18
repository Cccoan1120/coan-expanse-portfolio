import type { ImageAsset } from "../types/content";

const asset = (name: string, alt: string, portrait = false): ImageAsset => ({
  base: `/images/stitch-prototype/${name}`,
  alt,
  portrait,
});

export const stitchMedia = {
  sensorHome: asset("sensor-home", "深空观测传感器"),
  sensorIndex: asset("sensor-index", "项目观测站传感器"),
  homeProjects: {
    mine: asset("home-mine", "Mine 深色分析工作台原型图"),
    orbito: asset("home-orbito", "Orbito 轨道系统概念图"),
    "kol-review-desk": asset("home-kol", "KOL Review Desk 审核工作台原型图"),
    "teeni-insight-suite": asset("home-teeni", "Teeni 对话网络分析原型图"),
    "smart-agriculture-live": asset("home-smart-agriculture", "智播兴农农业数据地图原型图"),
  },
  flagshipProjects: {
    mine: asset("projects-mine", "Mine 数据工作台原型图"),
    orbito: asset("projects-orbito", "Orbito 轨道系统原型图"),
  },
  mineHero: asset("mine-hero", "Mine 深空观测站中的移动端产品原型"),
  orbitoDashboard: asset("orbito-dashboard", "Orbito 高密度数据分析工作台原型"),
} as const;
