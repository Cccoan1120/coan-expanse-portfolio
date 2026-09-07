import type { SiteProfile } from "../types/content";

export const internships = [
  { company: "北京汀灵智能科技有限公司", role: "产品运营实习生" },
  { company: "北京五八信息技术有限公司（58 同城）", role: "海外增长运营实习生" },
  { company: "致同会计师事务所（特殊普通合伙）", role: "审计实习生" },
] as const;

export const honors = [
  { year: "2024年", title: "国家奖学金" },
  { year: "2025年", title: "河北省优秀毕业生" },
  { year: "2026年", title: "“挑战杯”首都大学生创业计划竞赛专项赛特等奖" },
  { year: "2026年", title: "“挑战杯”首都大学生创业计划竞赛主赛道三等奖" },
] as const;

export const profile: SiteProfile = {
  name: "陈宵瀚",
  englishName: "Coan Chen",
  brand: "霄汉无垠 COAN EXPANSE",
  location: "北京",
  email: "17631646028@163.com",
  github: "https://github.com/Cccoan1120",
  statement: "我想把生活过得更辽阔，也更顺手。",
  shortBio: "我叫陈宵瀚，最近在北京上学、实习。周末去徒步、攀岩，空下来就折腾一点 Vibe Coding。",
  aboutParagraphs: [
    "我喜欢聊天、认识新朋友，听他们讲各自的经历。周末去徒步、攀岩，也喜欢旅行。空下来听播客、看脱口秀，许多新兴趣都是从一次聊天开始的。",
    "做产品时，我通常从一个具体的小麻烦开始，试着用 AI 和 Vibe Coding 把事情变简单。先做出自己愿意用的版本，再请朋友试试，根据反馈继续改。Mine、Orbito 和这里的大多数项目，都是这样一点点做出来的。",
  ],
  socialLinks: [
    { platform: "douyin", label: "抖音", href: "https://www.douyin.com/user/MS4wLjABAAAAehv4WLaesuFCm7x3B0MDo7zBX_e623sQg_DaFOkFdIY" },
    { platform: "xiaohongshu", label: "小红书", href: "https://www.xiaohongshu.com/user/profile/5d1c9be3000000001600a592" },
    { platform: "github", label: "GitHub", href: "https://github.com/Cccoan1120" },
    { platform: "email", label: "邮件", href: "mailto:17631646028@163.com" },
  ],
};
