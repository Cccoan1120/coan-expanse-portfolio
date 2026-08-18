# Coan Expanse Portfolio

陈宵瀚的单页个人作品集。当前版本沿用“霄汉无垠 / COAN EXPANSE”的深空视觉，在首页依次展示首屏、项目、生活、关于和联系内容。项目区包含 7 个 Logo 作品、5 个可展开方案，另有 5 个历史项目保留在数据中但不公开展示；生活区展示 6 条本地化真实记录。

Codex-API 接续开发前请先阅读 [`docs/CODEX_API_HANDOFF.md`](docs/CODEX_API_HANDOFF.md)。

## Local development

需要 Node.js 20.19+ 或 22.12+。

```bash
npm install
npm run dev
```

开发服务器默认运行在 `http://127.0.0.1:5173`。

## Quality checks

```bash
npm run typecheck
npm test
npm run build
npm run test:e2e
```

验证范围包括：

- 首页固定展示 7 个 Logo 作品、5 个可展开方案和 6 条生活记录，Mine 为唯一跨两列重点项目。
- 项目数据具有连续唯一的 `showcaseRank`，每项都有本地 Logo 和替代文本。
- 项目区不请求产品截图；旧项目与生活地址跳回首页对应锚点，无效项目仍显示 404。
- 四项单页导航、移动菜单、键盘、Escape 和焦点恢复。
- WebGL 正常、不可用回退与减少动画模式。
- 首页 axe 严重级检查。
- 320、375、390、414、768、1024、1440、1920px 无横向溢出。
- 字体、图标和图片全部本地加载，无 Stitch、Google Fonts 或 CDN 视觉资源请求。

## Content and media

- 项目资料：`src/content/projects.ts`
- 个人资料：`src/content/profile.ts`
- 项目 Logo：`public/images/project-logos/`
- 旧案例媒体映射：`src/content/projectMedia.ts`，仅作为回退源码保留
- 旧项目截图：`public/images/project-media/`，不在项目墙中加载
- 简历：`public/resume/chen-xiaohan-resume.pdf`
- 微信二维码：`public/contact/wechat-qr.jpg`

新增 Logo 作品必须维护集中式项目数据、展示排序和本地 Logo；方案展示不加载 Logo。真实素材统一保留在 `public/images/` 下。

## Public routes

- `/`

首页公开锚点为 `#projects`、`#life`、`#about`、`#contact` 和每个 `#project-<slug>`。旧 `/projects`、`/life`、`/projects/:slug` 地址使用替换式跳转回对应首页锚点；无效项目 slug 保持 404。

Vite 生产构建输出到 `dist/`。本轮实现不包含部署或 Git 提交。
