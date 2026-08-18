export type ProjectTier = "flagship" | "satellite" | "archive";
export type ProjectStatus = "live" | "maintaining" | "private" | "research";
export type ProjectDomain = "ai-product" | "data-analysis" | "automation-tools" | "business-research" | "creative-coding";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ImageAsset {
  base: string;
  alt: string;
  sizes?: string;
  portrait?: boolean;
  fullWidth?: number;
  mobileBase?: string;
}

export type SocialPlatform = "douyin" | "xiaohongshu" | "github" | "email";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface LifeEntry {
  slug: string;
  title: string;
  excerpt: string;
  category: "在路上" | "长期输入" | "动手做";
  media: ImageAsset;
  alt: string;
  sourcePlatform: "抖音" | "小红书" | "个人照片";
  sourceUrl?: string;
  sourceLabel?: string;
  video?: {
    src: string;
    poster: string;
  };
}

export interface ProjectMetric {
  value: string;
  label: string;
  qualifier?: string;
}

export interface ProjectLogoAsset {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  englishTitle: string;
  timeframe: string;
  tier: ProjectTier;
  status: ProjectStatus;
  domains: ProjectDomain[];
  logo: ProjectLogoAsset;
  showcaseRank: number;
  featuredRank?: number;
  spotlightRank?: number;
  privacy: "公开" | "已脱敏";
  tagline: string;
  summary: string;
  role: string;
  skills: string[];
  cover?: ImageAsset;
  gallery?: ImageAsset[];
  links?: ProjectLink[];
  problem?: string;
  actions?: string[];
  outcomes?: string[];
  boundaries?: string[];
  metrics?: ProjectMetric[];
}

export interface SiteProfile {
  name: string;
  englishName: string;
  brand: string;
  location: string;
  email: string;
  github: string;
  statement: string;
  shortBio: string;
  aboutParagraphs: string[];
  socialLinks: SocialLink[];
}
