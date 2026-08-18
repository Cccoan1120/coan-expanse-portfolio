import type { LifeEntry } from "../types/content";

const xiaohongshu = "https://www.xiaohongshu.com/user/profile/5d1c9be3000000001600a592";

export const lifeEntries: LifeEntry[] = [
  {
    slug: "grassland-horseback", title: "风从锡林郭勒吹来",
    excerpt: "一次临时起意，最后真的开车去了锡林郭勒。四个人、几件行李，一路从北京开进草原。同行的有认识很多年的朋友，也有刚认识不久的人。后来发现，一趟旅行好玩的不只是去了哪里，还有一路上遇见了谁。",
    category: "在路上", media: { base: "/images/life/grassland-drive", fullWidth: 1280, portrait: true, alt: "陈宵瀚在锡林郭勒草原自驾途中探出车窗" },
    alt: "陈宵瀚在锡林郭勒草原自驾途中探出车窗", sourcePlatform: "抖音", sourceUrl: "https://www.douyin.com/video/7669294722351150693", sourceLabel: "看看这次出发",
  },
  {
    slug: "grassland-sunset", title: "暮色落在草原上",
    excerpt: "傍晚的草原是这趟旅行里最喜欢的一段。云从蓝紫一点点变成橙红，风很大，我们沿着草原继续往前走。没有什么特别的目的地，只是想在天彻底黑下来以前，再多走一会儿。",
    category: "在路上", media: { base: "/images/life/grassland-sunset", alt: "陈宵瀚在草原日落时的旅行记录", portrait: true, fullWidth: 323 },
    alt: "陈宵瀚在草原日落时的旅行记录", sourcePlatform: "抖音", sourceUrl: "https://www.douyin.com/video/7668702800804975481", sourceLabel: "看看那天的晚霞",
    video: { src: "/videos/life/grassland-sunset.mp4", poster: "/videos/life/grassland-sunset-poster.webp" },
  },
  {
    slug: "east-monkey-peak-night-hike", title: "夜爬东猴顶",
    excerpt: "周五下班后临时决定出发，晚上九点开始往山里走。头灯照得到的地方很小，剩下的都是夜色。一路爬到天快亮，终于站上东猴顶。现在回头看，最难忘的反而是这种“今晚就走”的冲动。",
    category: "在路上", media: { base: "/images/life/east-monkey-peak", alt: "陈宵瀚夜爬东猴顶时提着灯照明", portrait: true, fullWidth: 1200 },
    alt: "陈宵瀚夜爬东猴顶时提着灯照明", sourcePlatform: "小红书", sourceUrl: "https://xhslink.cn/o/4XT9O0g8hh9", sourceLabel: "看看这次夜爬",
  },
  {
    slug: "climbing", title: "在岩壁上寻找下一步",
    excerpt: "攀岩好玩的地方是，每次卡住都得重新观察：脚放哪里、重心怎么移、下一块岩点在哪里。很多时候，不需要一下看到终点，先找到下一步就够了。",
    category: "在路上", media: { base: "/images/profile/life-action", alt: "陈宵瀚在攀岩馆观察线路", portrait: true },
    alt: "陈宵瀚在攀岩馆观察线路", sourcePlatform: "抖音", sourceUrl: "https://www.douyin.com/video/7643351971013908731", sourceLabel: "看看我的攀岩记录",
  },
  {
    slug: "live-comedy", title: "喜欢坐在观众席里",
    excerpt: "我一直很喜欢喜剧和脱口秀，也会经常去看不同的展演和现场演出。比起隔着屏幕看，我更喜欢坐在观众席里，和一群陌生人一起笑、一起感受现场的节奏。很多有意思的观点和表达，也是在这些轻松的时刻里被记住的。",
    category: "长期输入", media: { base: "/images/life/live-comedy", alt: "陈宵瀚参加喜剧和播客线下活动的记录", fullWidth: 1266 },
    alt: "陈宵瀚参加喜剧和播客线下活动的记录", sourcePlatform: "小红书", sourceUrl: xiaohongshu, sourceLabel: "看看我的现场记录",
  },
  {
    slug: "podcast-listening", title: "听别人聊聊世界",
    excerpt: "走路、通勤、训练，很多零碎时间都有播客陪着。过去一段时间累计听了 186 小时 7 分钟。比起这个数字本身，我更喜欢的是那些偶然听到的新观点——它们经常让我重新理解一件原本习以为常的事。",
    category: "长期输入", media: { base: "/images/life/podcast-listening", alt: "陈宵瀚的播客收听时长截图", portrait: true, fullWidth: 1200 },
    alt: "陈宵瀚的播客收听时长截图", sourcePlatform: "个人照片",
  },
];

export const homeLifeEntries = lifeEntries;
