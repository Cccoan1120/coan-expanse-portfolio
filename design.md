# Design · Coan Expanse

本文件记录当前单页作品集的视觉实现约束。网站保留星系和轨道语言，并把项目、生活、关于与联系合并到首页。旧版项目索引、独立生活页和案例页只作为回退源码保留。

## Visual direction

- 类型为 Atmospheric Minimalism 和生活影像叙事。
- 气质克制、开阔、有人味。真实照片和日常文字优先，技术细节留在项目页。
- 栅格：桌面 12 栏，最大内容宽度 1440px；全站只使用一套固定顶部导航。
- 导航固定为“项目 / 生活 / 关于 / 联系”四项，全部跳转首页锚点；品牌标识返回顶部。
- 形状：项目与生活卡统一使用 8px 圆角、细边框和克制内阴影，按钮同样使用 8px 圆角，标签使用胶囊形。
- 间距：以 8px 为基础单位，页面级间距从设计 token 读取。

## Color and type

- 深空黑用于画布和底层表面。
- 冰蓝用于技术标签、坐标和辅助状态。
- 银白用于主要内容。
- 琥珀用于在线状态、关键动作和研究标记。
- 中文标题与正文：本地 Noto Sans SC Variable，中文承担主要叙事。
- 英文品牌与 Display：本地 Hanken Grotesk Variable，仅作为辅助识别层。
- 英文项目标题：本地 Cormorant Garamond Variable，仅用于 Logo 项目墙的英文副标题。
- Metadata：本地 JetBrains Mono Variable，仅用于编号、年份和真实状态；不把等宽字作为科技感装饰。
- Icon：本地 Material Symbols Outlined。

完整取值集中在根目录 `tokens.css`，页面不得直接请求远程字体或图标服务。

## Page composition

- 首页顺序固定为首屏、项目、生活、关于、联系。
- 项目区展示 7 个 Logo 作品。Mine 为唯一跨两列重点卡，其余 6 项组成桌面双列、移动单列的编号项目墙。
- 另有 5 个方案以无 Logo 的可展开文字行展示；5 个支撑型历史项目保留在数据与旧源码中，不进入首页。
- Logo 作品不展示产品截图。行星舞台使用材质、明暗面与单一克制轨道，不复制参考站的宝剑元素。
- 生活区按“在路上 / 长期输入”合并 6 条记录，每段保留本地媒体、短文和真实公开来源入口。
- 关于区域使用自然色红墙肖像，画面周围保留深色留白，不把照片处理成证件照或招聘头像。
- 旧搜索、分类和完整案例不进入正常浏览路径；源码和截图资产保留，以便以后恢复。

公开页面为 `/`。首页锚点包括 `/#projects`、`/#life`、`/#about`、`/#contact` 和 `/#project-<slug>`；旧地址使用替换式跳转回对应锚点，无效项目进入 404。

## Motion and shader

- WebGL 背景使用 Stitch 导出的 GLSL 逻辑，并限制设备像素比；背景不显示网格，采用静态分布星点与缓慢星云。
- 星云与两层星点以不同的低速轨迹持续漂移；页面隐藏时暂停渲染，`prefers-reduced-motion` 下固定为静态帧。
- 所有设备使用原生指针。
- WebGL 不可用时使用本地 CSS 静态星空背景回退。
- 其他动效只用于首屏进入、图片显现和交互反馈，不使用滚动视差或批量淡入。
- 导航高亮使用 `IntersectionObserver`，不监听连续滚动，也不因观察结果频繁修改 URL。

## Responsive and accessibility

- 桌面端不使用重复侧栏；移动端使用紧凑顶栏与单列内容，修复原型导出中的横向溢出。
- 菜单支持键盘、Escape 关闭与焦点恢复。
- 所有交互状态具有可见焦点；触控目标至少 44px。
- 生活切片在桌面使用不对称影像带，手机使用一张主图和两张并列小图，图片保持自然比例与可理解裁切。
- 在 320、375、390、414、768、1024、1440、1920px 验证无横向溢出。

## Project media boundary

- 生产图片位于 `public/images/project-media/`，提供 AVIF、WebP 及小尺寸版本。
- `src/content/projectMedia.ts` 是真实媒体映射层，不修改 `Project` 数据结构。
- `src/content/projects.ts` 为每个项目提供必填 Logo 与 `showcaseRank`；Logo 位于 `public/images/project-logos/`。
- 项目墙不引用 `projectMedia`，该映射层仅供旧案例源码和生活记录中的既有媒体使用。
- KOL 仅使用不可逆遮盖后的扁平化图片，原始敏感截图不进入网站目录。
- Stitch 原型图片继续作为历史备份保留，但生产页面不再引用。
- 生产页面不得请求 `lh3.googleusercontent.com`、Google Fonts、Tailwind CDN、`unpkg.com` 或其他远程视觉资源。

## Profile and life media boundary

- 肖像和骑马首图使用 `public/images/profile/` 下的 AVIF 与 WebP 响应式资源。骑马首图另有移动端焦点裁切。
- 社交平台精选素材下载到 `public/images/life/`，生产页面不热链平台图片，也不自动同步主页内容。
- 所有生活照衍生图移除 EXIF、GPS、IPTC、XMP、ICC 与方向信息，不保留平台 Cookie、二维码、粉丝数或个人主页统计。
- 若某条公开内容无法稳定提取，使用语义相符的现有本地照片，并保留平台公开入口。
