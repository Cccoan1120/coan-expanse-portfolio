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
    "我是一个挺外向的人，喜欢聊天、认识新朋友，也很享受和不同的人交换经历和想法。旅行、攀岩、脱口秀、播客……很多时候，一个新的兴趣、一段新的关系，甚至一个新的项目，都是从一次偶然的聊天开始的。",
    "我也很喜欢折腾新东西，尤其是 AI 和 Vibe Coding。脑子里冒出一个想法，我通常不会让它停留太久，而是先动手做出来，再一点点修改。Mine、Orbito，还有这里展示的大多数项目，都是这样从一个很小的念头慢慢长出来的。",
    "比起做一个看起来很厉害的产品，我更喜欢解决那些真实又具体的小问题——“这件事能不能更简单一点？”“能不能少做几步？”先做一个自己愿意用的版本，再交给朋友试试，听听他们怎么想，然后继续改。",
    "大概就是这样：喜欢认识人，喜欢体验新的东西，也喜欢把脑子里的想法变成真的。",
  ],
  socialLinks: [
    { platform: "douyin", label: "抖音", href: "https://www.douyin.com/user/MS4wLjABAAAAehv4WLaesuFCm7x3B0MDo7zBX_e623sQg_DaFOkFdIY" },
    { platform: "xiaohongshu", label: "小红书", href: "https://www.xiaohongshu.com/user/profile/5d1c9be3000000001600a592" },
    { platform: "github", label: "GitHub", href: "https://github.com/Cccoan1120" },
    { platform: "email", label: "邮件", href: "mailto:17631646028@163.com" },
  ],
};
