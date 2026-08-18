# COAN EXPANSE 个人网站交接文档

更新日期 2026 年 8 月 18 日

这份文档供 Codex-API 接手当前个人网站使用。它记录的是本次交接时的源码事实和验证结果。历史规划文档中的复选框没有持续回填，不能单独作为完成状态依据。

## 项目概况

- 项目名称使用 `COAN EXPANSE Portfolio`
- 网站中文标识使用 `霄汉无垠`
- 站点主人为陈宵瀚，英文名使用 `Coan Chen`
- 技术栈为 React 19、TypeScript、Vite 8、React Router 7、原生 CSS、Vitest 和 Playwright
- 当前形态为完整摘要单页，首页依次包含首屏、作品、生活、关于和联系内容
- 主导航只显示作品、生活和联系，关于内容仍保留在首页
- 网站运行素材全部放在本地，不依赖 Google Fonts、CDN 图片或远程视觉资源

公开仓库计划使用 `https://github.com/Cccoan1120/coan-expanse-portfolio`。如果仓库地址与这行不同，应以 Git 远程地址为准并更新本文。

## 当前页面已经实现的内容

首页项目数据共有 17 项，排序依据是 `showcaseRank`。公开首页展示其中 12 项。

- 7 个作品卡片，Mine 固定为编号 01 和两列重点项目
- 5 个可展开方案
- 5 个历史项目继续保留在数据文件中，但不出现在首页项目墙
- 6 条生活记录，图片和视频均使用本地资源
- 关于区包含个人照片、简介、标签和当前数量统计
- 联系区提供微信、简历、GitHub、抖音、小红书与邮箱入口
- 邮箱需要用户点击后才显示，不会直接触发 `mailto:` 跳转

页面还包含 WebGL 深空背景、细指针设备上的星轨效果、滚动进度条、内容渐进显现、项目星球响应效果和移动菜单。粗指针设备与减少动态效果偏好都有降级处理。WebGL 不可用时也有静态回退。

## 路由和兼容规则

当前公开入口为 `/`，主要锚点如下。

- `#projects`
- `#life`
- `#about`
- `#contact`
- `#project-<slug>`

旧地址仍受支持。

- `/projects` 替换式跳转到 `/#projects`
- `/life` 跳转到生活区或有效生活记录锚点
- `/projects/:slug` 对首页可见项目跳转到对应项目锚点
- 数据中存在但首页隐藏的项目跳回 `/#projects`
- 不存在的项目 slug 保持 404

## 代码入口

| 位置 | 用途 |
| --- | --- |
| `src/main.tsx` | 字体、全局样式、路由和 React 入口 |
| `src/App.tsx` | 全局视觉层、路由兼容、规范链接和微信弹窗 |
| `src/pages/HomePage.tsx` | 首页首屏与关于区组合 |
| `src/components/ProjectShowcase.tsx` | 作品卡与方案列表 |
| `src/components/LifeShowcase.tsx` | 生活记录 |
| `src/components/SiteNav.tsx` | 桌面与移动导航、同页锚点滚动 |
| `src/components/SiteFooter.tsx` | 联系区和邮箱展示 |
| `src/components/ObservatoryShader.tsx` | WebGL 深空背景与回退 |
| `src/components/CosmicPointerField.tsx` | 指针响应和星轨画布 |
| `src/components/RevealObserver.tsx` | 滚动显现 |
| `src/content/projects.ts` | 17 个项目的唯一集中数据源 |
| `src/content/life.ts` | 6 条生活记录 |
| `src/content/profile.ts` | 个人资料、品牌和社交链接 |
| `src/styles/cosmic-redesign.css` | 当前单页视觉与响应式规则 |
| `scripts/check-content.mjs` | 内容、隐私、本地素材和项目排序检查 |
| `tests/portfolio.spec.ts` | 浏览器端功能、响应式和无障碍验证 |

`src/pages/ProjectPage.tsx`、`src/pages/ProjectsIndexPage.tsx`、`src/pages/LifePage.tsx`、`src/components/ProjectCinema.tsx` 和 `src/components/OrbitCanvas.tsx` 属于早期实现保留代码，目前没有接入 `App.tsx` 的公开路由。后续如要清理，应先确认没有内容或媒体映射仍被需要，再单独提交删除，不要顺手处理。

## 内容和素材边界

- 项目文案只在 `src/content/projects.ts` 维护，当前顺序必须保持 1 到 17 连续且唯一
- 项目 Logo 位于 `public/images/project-logos/`
- 生活与个人照片位于 `public/images/profile/` 和 `public/images/life/`
- 生活视频位于 `public/videos/life/`
- 简历位于 `public/resume/chen-xiaohan-resume.pdf`
- 微信二维码位于 `public/contact/wechat-qr.jpg`
- 旧项目截图位于 `public/images/project-media/`，当前项目墙不请求这些截图

简历、二维码和公开邮箱属于当前网站有意公开的内容。新增素材前仍要检查元数据、凭据、电话号码、内部数据和未经脱敏的截图。`scripts/check-content.mjs` 已覆盖已知的隐私与本地素材规则，但它不能替代人工审阅。

## 本地启动与验证

README 要求 Node.js 20.19 以上或 22.12 以上。本次交接验证使用 Node.js 24.18.0 和 npm 11.16.0。

```powershell
npm ci
npm run dev
```

开发地址默认为 `http://127.0.0.1:5173`。

完整验证顺序如下。浏览器测试读取最新的 `dist/`，所以必须先构建。

```powershell
npm run typecheck
npm test
npm run build
npm run test:e2e
```

2026 年 8 月 18 日交接前的实际结果如下。

- TypeScript 类型检查通过
- 内容与隐私扫描通过
- Vitest 共 2 个测试文件、9 项测试，全部通过
- Vite 生产构建通过
- Playwright 共 46 项测试，全部通过
- 浏览器覆盖桌面与移动环境、320 至 1920 像素横向溢出、键盘交互、WebGL 回退、减少动态效果和 axe 严重级无障碍检查

测试输出中的 `NO_COLOR` 提示只是 Playwright 子进程环境警告，不影响结果。

## 当前已知风险和待确认事项

### 品牌命名尚未统一

当前用户可见界面使用 `霄汉无垠 / COAN EXPANSE`，`profile.ts`、导航、页脚和页面标题都按这一版本呈现。`package.json` 仍使用 `xiaohan-expanse-portfolio`，部分历史文档记录的是 `XIAOHAN EXPANSE`。不要直接全局替换。下一次涉及品牌文案时，先请用户确认最终英文品牌，再同步源码、包名、README、元数据和文档。

### 历史计划不是进度表

`docs/superpowers/plans/` 保存了多轮实施计划。许多任务复选框仍为空，但对应代码和测试已经存在。判断现状时先看源码和测试，再参考计划理解设计意图。

### 当前公开提交是首个 Git 基线

本地仓库在交接前没有任何提交和远程地址。Git 无法提供此前版本的逐步历史。首个公开提交应视为当前完整基线，后续工作要小步提交，避免再次失去演进记录。

### 部署尚未完成

项目包含 `vercel.json`，但没有 `.vercel/project.json`，也没有经用户确认的 Vercel 项目。不要把网站部署到名称相近但归属不明的项目。正式部署前需要用户提供现有站点地址，或明确同意新建 Vercel 项目。

部署时需要设置真实的 `VITE_SITE_URL`。仓库里的 `.env.example` 只提供占位写法，不能直接用于生产。

### 生成物和审阅截图不进入仓库

`dist/`、`.visual/`、`tmp/`、Playwright 报告、测试结果、预览日志和工具状态都已排除。需要视觉复核时重新运行项目并生成新截图，不要依赖本机旧截图判断当前页面。

### 样式文件较大

`src/styles/global.css` 和 `src/styles/cosmic-redesign.css` 都保留了多轮样式。当前构建正常，但后续改视觉时应尽量在现有规则附近做小范围修改，并通过桌面、移动和减少动态效果三种场景复核。不要在没有回归测试的情况下大规模整理 CSS。

## 建议的接手顺序

1. 在 Codex-API 中打开仓库根目录，先读本文、`README.md`、`src/content/projects.ts` 和最近三份 2026 年 8 月 17 至 18 日实施计划。
2. 执行 `npm ci`，随后按既定顺序跑完四项验证，确认 API 环境与本次基线一致。
3. 启动本地预览，亲自查看桌面和手机尺寸，再开始视觉修改。
4. 先向用户确认下一阶段目标。若目标涉及品牌，先解决 `COAN` 与 `XIAOHAN` 的命名差异。
5. 修改时只触及目标直接需要的文件，保留项目顺序、隐私边界、旧路由兼容和减少动态效果支持。
6. 每轮完成后先重新构建，再跑 Playwright，并保存一个范围清晰的 Git 提交。

## 可直接交给 Codex-API 的第一条消息

```text
请接手这个个人网站项目。先完整阅读 docs/CODEX_API_HANDOFF.md 和 README.md，再检查当前 git 状态、源码入口与最近三份 docs/superpowers/plans/ 下的实施计划。先不要改代码或部署。请运行 npm ci、npm run typecheck、npm test、npm run build、npm run test:e2e，并打开当前页面做桌面与移动端视觉核对。随后用当前证据向我汇报已实现内容、风险和建议的下一步。历史计划中的空复选框不等于未实现，当前品牌 COAN EXPANSE 与历史 XIAOHAN EXPANSE 的差异也不要自行统一。
```

## 交接完成标准

Codex-API 能从公开仓库安装依赖、完成四项验证、看见与本次一致的单页网站，并能明确区分当前实现、历史保留代码、品牌待确认项与部署待确认项，才算接手完成。
