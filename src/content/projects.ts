import type { Project, ProjectDomain, ProjectStatus } from "../types/content";

export const domainLabels: Record<ProjectDomain, string> = {
  "ai-product": "AI 产品",
  "data-analysis": "数据分析",
  "automation-tools": "自动化工具",
  "business-research": "商业与研究",
  "creative-coding": "创意技术",
};

export const domainOptions = (Object.entries(domainLabels) as Array<[ProjectDomain, string]>).map(
  ([value, label]) => ({ value, label }),
);

export const statusLabels: Record<ProjectStatus, string> = {
  live: "在线运行",
  maintaining: "持续迭代",
  private: "内部项目 · 已脱敏",
  research: "研究 / 方案",
};

export const projects: Project[] = [
  {
    slug: "mine",
    title: "Mine",
    englishTitle: "AI Material Studio",
    timeframe: "2026 至今",
    tier: "flagship",
    status: "maintaining",
    domains: ["ai-product", "automation-tools"],
    logo: { src: "/images/project-logos/mine.png", alt: "Mine" },
    showcaseRank: 1,
    featuredRank: 1,
    privacy: "公开",
    tagline: "面向内容收藏、检索与再创作的 AI 素材工作台。",
    summary:
      "Mine 是一款面向内容创作者的 AI 素材管理与创作工作台，覆盖外部内容导入、自动摘要与标签、来源问答、Markdown 编辑和多形态草稿生成，并通过账号隔离保护个人素材。",
    role: "产品设计与独立开发",
    skills: ["产品流程", "RAG", "内容工作流", "React", "PostgreSQL"],
    cover: {
      base: "/images/projects/mine-overview",
      alt: "Mine 从外部内容到可发布草稿的产品流程",
      sizes: "(max-width: 768px) 92vw, 54vw",
    },
    gallery: [
      {
        base: "/images/projects/mine-overview",
        alt: "Mine 收集、整理、关联、问答和输出流程",
      },
      {
        base: "/images/projects/mine-prototype",
        alt: "Mine 三栏素材工作台产品原型",
      },
      {
        base: "/images/projects/mine-flow",
        alt: "Mine 五步内容处理流程",
      },
      {
        base: "/images/projects/mine-workbench",
        alt: "Mine 正在编辑产品思维素材的真实工作台界面",
      },
    ],
    links: [
      { label: "产品官网", href: "https://mine-knowledge-studio.onrender.com/" },
      { label: "查看 GitHub", href: "https://github.com/Cccoan1120/mine-knowledge-studio" },
    ],
    problem:
      "内容创作者经常把素材分散在收藏夹、本地文件和不同平台。内容虽然保存下来了，后续查找、引用和重新加工仍然费时，收藏与创作之间缺少连续流程。",
    actions: [
      "通过小红书发布项目介绍并征集反馈，梳理文章收藏、灵感记录、知识检索和内容输出需求。",
      "使用 React 与 Express 搭建网页应用，统一多种内容的导入和 Markdown 编辑体验。",
      "为素材增加 AI 摘要与标签，并让问答返回来源。检索基础设施不可用时，产品会切换到可用的基础检索方式。",
      "将公众号、小红书和短视频脚本等输出形式接入同一工作流程，并把模型密钥统一放在服务端管理。",
    ],
    outcomes: [
      "完成支持注册登录、账号隔离和部署的端到端产品。",
      "打通从素材进入、整理、检索到多种内容草稿生成的完整流程。",
      "公开说明内容导入、模型配置和来源可靠性的使用边界。",
      "当前项目持续迭代，在线体验暂停展示，恢复健康检查后再重新开放。",
    ],
    boundaries: [
      "只处理公开可访问内容，不承诺绕过登录、付费或强反爬限制。",
      "服务端统一管理模型凭据，普通用户不在浏览器填写平台密钥。",
      "在线体验当前暂停展示；恢复并重新通过健康检查后再开放入口。",
    ],
  },
  {
    slug: "orbito",
    title: "Orbito",
    englishTitle: "Personal Orbit System",
    timeframe: "2026 至今",
    tier: "flagship",
    status: "live",
    domains: ["ai-product"],
    logo: { src: "/images/project-logos/orbito.png", alt: "Orbito" },
    showcaseRank: 2,
    featuredRank: 2,
    privacy: "公开",
    tagline: "围绕每日行动组织任务、习惯、学习与生活记录。",
    summary:
      "Orbito 是一款本地优先的个人日常管理 PWA，以 Today 页面串联任务、习惯、时间线、计划、学习与生活记录，支持离线启动，并可选择仅在本地保存数据或进行私有云同步。",
    role: "产品设计与独立开发",
    skills: ["PWA", "本地优先", "移动体验", "Next.js", "Supabase"],
    cover: {
      base: "/images/projects/orbito-today",
      alt: "Orbito 今日页面，展示每日重点、习惯与时间线",
      sizes: "(max-width: 768px) 76vw, 28vw",
      portrait: true,
    },
    gallery: [
      {
        base: "/images/projects/orbito-today",
        alt: "Orbito 今日行动与习惯页面",
        portrait: true,
      },
      {
        base: "/images/projects/orbito-calendar",
        alt: "Orbito 月历与计划页面",
        portrait: true,
      },
      {
        base: "/images/projects/orbito-records",
        alt: "Orbito 生活记录页面",
        portrait: true,
      },
      {
        base: "/images/projects/orbito-feed",
        alt: "Orbito 资讯与学习内容页面",
        portrait: true,
      },
    ],
    links: [
      { label: "在线体验", href: "https://www.orbito.com.cn" },
      { label: "查看 GitHub", href: "https://github.com/Cccoan1120/orbito" },
    ],
    problem:
      "任务、日历、习惯、资料和生活记录通常分散在多个工具里。切换工具会割裂每天的使用过程，单纯依赖云端的产品也会在未登录或网络不稳定时影响记录。",
    actions: [
      "以 Today 页面为中心，组织每日重点、习惯、时间线和复盘。",
      "将计划、资讯、学习与生活记录设计成围绕 Today 运转的独立模块，减少功能之间的干扰。",
      "采用本地优先的数据方案，让用户在没有云配置时仍可记录和查看内容。",
      "使用 Next.js 与 Supabase 完成 PWA 安装、离线启动、邮箱免密登录和私有云同步。",
    ],
    outcomes: [
      "完成可安装、可离线启动并公开运行的 PWA。",
      "覆盖习惯、日历、学习、花销、复盘和资料收藏等连续日常流程。",
      "本地模式和云同步模式的主要操作保持一致，用户无需先配置账号即可开始记录。",
    ],
    boundaries: [
      "无云配置时使用本地模式，数据不会因为缺少账号而不可用。",
      "云同步使用邮箱免密登录与私有存储，服务端密钥不会进入浏览器。",
      "公开截图排除了账号邮箱与个人设置数据。",
    ],
  },
  {
    slug: "offer-atlas",
    title: "Offer Atlas",
    englishTitle: "Interview Learning System",
    timeframe: "2026 至今",
    tier: "satellite",
    status: "maintaining",
    domains: ["ai-product", "automation-tools"],
    logo: { src: "/images/project-logos/offer-atlas.png", alt: "Offer Atlas" },
    showcaseRank: 3,
    spotlightRank: 1,
    privacy: "公开",
    tagline: "把刷题、复习和面试复盘接成一条线。",
    summary:
      "Offer Atlas 是一套面向求职准备的单用户知识与复盘系统，将 200 道启用题目、FSRS 复习、面试快记、答案版本和经确认的经历事实整合进同一工作流，并提供可安装的移动端 PWA。",
    role: "产品设计与独立开发",
    skills: ["FSRS", "知识系统", "面试复盘", "PWA", "Next.js"],
    links: [{ label: "查看 GitHub", href: "https://github.com/Cccoan1120/offer-atlas" }],
    metrics: [{ value: "200", label: "启用题目" }],
    boundaries: [
      "公开仓库只包含通用题库和虚构示例数据。",
      "个人简历、面试记录、附件、数据库和生产密钥不会进入公开仓库。",
    ],
    actions: [
      "梳理刷题、复习、模拟面试和真实面试复盘之间的信息流，建立统一的题目与答案版本模型。",
      "接入 FSRS 复习调度，并把面试快记、经历事实确认和复盘记录纳入同一套工作台。",
      "设计公开数据与私人求职资料的隔离边界，并完成可安装到手机的 PWA。",
    ],
    outcomes: [
      "形成覆盖准备、练习、复习和复盘的连续求职学习系统。",
      "公开仓库只保留通用题库和虚构示例，个人资料与生产数据不进入公开版本。",
    ],
  },
  {
    slug: "music-market-radar",
    title: "Music Market Radar",
    englishTitle: "Cross-platform Music Signals",
    timeframe: "2026",
    tier: "satellite",
    status: "maintaining",
    domains: ["data-analysis", "automation-tools"],
    logo: { src: "/images/project-logos/music-market-radar.png", alt: "Music Market Radar" },
    showcaseRank: 4,
    spotlightRank: 2,
    privacy: "公开",
    tagline: "统一跨平台音乐信号，并明确不同数据口径的可比边界。",
    summary:
      "Music Market Radar 是一套覆盖网易云、QQ 音乐与 YouTube 的跨平台音乐市场研究台。系统分别呈现国内榜单相对热度与 YouTube 官方公开视频统计，并对曲风聚合推断标注置信度和适用边界。",
    role: "产品设计与独立开发",
    skills: ["数据采集", "指标口径", "趋势分析", "Next.js", "Supabase"],
    links: [{ label: "查看 GitHub", href: "https://github.com/Cccoan1120/music-market-radar" }],
    boundaries: [
      "演示数据会明确标识，不作为实时市场结论。",
      "只读取公开榜单和官方接口，不绕过登录、验证码或平台风控。",
    ],
    actions: [
      "定义国内榜单 0 至 100 相对热度与 YouTube 官方公开视频统计的独立指标口径。",
      "搭建跨平台采集、清洗与趋势展示流程，并为演示数据增加显式标识。",
      "将年龄层判断限定为带置信度的曲风聚合估算，避免将推断表达为真实用户画像。",
    ],
    outcomes: [
      "完成可持续维护的跨平台音乐市场研究台。",
      "建立数据来源、指标含义和推断结论的公开说明边界。",
    ],
  },
  {
    slug: "tenni-signal",
    title: "Tenni Signal",
    englishTitle: "Social Risk Operations Desk",
    timeframe: "2026",
    tier: "satellite",
    status: "private",
    domains: ["ai-product", "data-analysis", "automation-tools"],
    logo: { src: "/images/project-logos/tenni-signal.svg", alt: "Tenni Signal" },
    showcaseRank: 5,
    spotlightRank: 3,
    privacy: "已脱敏",
    tagline: "风险判断必须能回到原内容、证据和处置记录。",
    summary:
      "我为 Tenni 搭建了国内社交舆情风险工作台原型，覆盖风险收件箱、P0-P3 判断、评论证据、处置工单、趋势和监测设置。采集遇到登录、验证码或限流会停止，未配置的外部服务不会收到数据。",
    role: "产品架构与全栈原型",
    skills: ["风险分级", "证据链", "Human-in-the-loop", "FastAPI", "Next.js"],
    boundaries: [
      "公开展示使用演示内容，不包含真实用户、账号或内部处置记录。",
      "儿童安全与隐私风险保持独立高优先级，不由普通热度指标覆盖。",
    ],
  },
  {
    slug: "kol-review-desk",
    title: "KOL Review Desk",
    englishTitle: "Human-in-the-loop Outreach Review",
    timeframe: "2026",
    tier: "satellite",
    status: "live",
    domains: ["automation-tools", "ai-product"],
    logo: { src: "/images/project-logos/kol-review-desk-transparent.png", alt: "KOL Review Desk" },
    showcaseRank: 6,
    featuredRank: 3,
    privacy: "已脱敏",
    tagline: "为海外达人合作建立可审核、可追溯的 AI 辅助运营流程。",
    summary:
      "KOL Review Desk 是一套面向海外达人合作运营的本地审核工具，统一汇总邮件、达人资料与平台数据，由 AI 生成沟通草稿，并将发送和飞书写入保留为人工确认操作。",
    role: "工作流设计与独立开发",
    skills: ["运营自动化", "Human-in-the-loop", "本地数据", "飞书"],
    links: [
      { label: "查看 GitHub", href: "https://github.com/Cccoan1120/kol-review-desk" },
    ],
    actions: [
      "梳理邮件处理、达人资料核对、回复起草和合作记录写入的运营流程。",
      "设计 AI 草稿与人工批准分离的 Human-in-the-loop 机制，关键外部动作必须由运营人员确认。",
      "将本地数据、审批状态和操作记录组织为可追溯的审核工作台。",
    ],
    outcomes: [
      "完成覆盖信息汇总、草稿生成、人工审核和记录写入的本地运营工具。",
      "关键发送动作与飞书写入均保留人工控制和审计记录。",
    ],
  },
  {
    slug: "teeni-insight-suite",
    title: "Teeni 对话分析套件",
    englishTitle: "Conversation Insight Suite",
    timeframe: "2026",
    tier: "satellite",
    status: "private",
    domains: ["data-analysis", "ai-product"],
    logo: { src: "/images/project-logos/teeni-insight-suite.png", alt: "Teeni 对话分析套件" },
    showcaseRank: 7,
    featuredRank: 4,
    privacy: "已脱敏",
    tagline: "面向儿童对话质量评估的可配置、可重跑分析流程。",
    summary:
      "Teeni 对话分析套件是一套面向儿童对话质量评估的可配置分析流程，覆盖口径确认、运行进度、异常复核和报告导出，并保留失败状态与审计信息，将儿童安全作为不可降低的硬性门槛。",
    role: "分析框架与产品流程设计",
    skills: ["数据口径", "对话分析", "质量评估", "报告系统"],
    actions: [
      "统一分析指标、输入字段与场景映射，减少不同批次之间的口径偏差。",
      "设计可重跑的任务流程，保留进度、失败状态、异常样本和审计信息。",
      "将儿童安全设为独立硬门槛，并组织异常复核与报告导出流程。",
    ],
    outcomes: [
      "形成可配置、可恢复并能够回溯异常结果的对话分析框架。",
      "安全判断不会被普通质量或留存指标覆盖。",
    ],
  },
  {
    slug: "smart-agriculture-live",
    title: "智播兴农",
    englishTitle: "AI Assistant for Rural Livestreaming",
    timeframe: "2025 至今",
    tier: "satellite",
    status: "research",
    domains: ["business-research", "data-analysis", "ai-product"],
    logo: { src: "/images/project-logos/smart-agriculture-live.svg", alt: "智播兴农" },
    showcaseRank: 8,
    featuredRank: 5,
    privacy: "公开",
    tagline: "面向乡村直播经营需求的 AI 辅助与数据研究方案。",
    summary:
      "智播兴农面向乡村直播经营中的工具门槛、运营成本与转化问题，将实地访谈、营销与合规知识工作流以及直播样本分析整合为 AI 辅助方案，覆盖文本、音频和视觉特征。",
    role: "团队成员 · 需求研究、知识工作流与数据分析",
    skills: ["用户访谈", "Coze RAG", "多模态分析", "SHAP"],
    cover: {
      base: "/images/evidence/field-interview",
      alt: "智播兴农团队在北京怀柔进行用户访谈",
    },
    gallery: [
      {
        base: "/images/evidence/field-interview",
        alt: "智播兴农团队在北京怀柔进行用户访谈",
      },
      {
        base: "/images/evidence/field-team",
        alt: "智播兴农团队完成实地调研后的合影",
      },
      {
        base: "/images/evidence/presentation",
        alt: "智播兴农项目在现场进行答辩展示",
      },
    ],
    metrics: [{ value: "1535", label: "直播样本" }],
    actions: [
      "在北京怀柔四渡河村访谈农户及返乡青年，整理工具门槛、运营成本和直播转化方面的实际困难。",
      "基于 Coze 搭建 RAG 知识库与分析工作流，将营销和合规知识转成可执行的判断规则。",
      "参与清洗分析 1535 个直播样本，构建文本、音频和视觉特征，并使用 LightGBM、SHAP 与因果推断寻找可解释因素。",
    ],
    outcomes: [
      "形成从现场调研、知识整理到样本分析的完整研究过程。",
      "团队相关软件平台成果取得计算机软件著作权登记。",
    ],
  },
  {
    slug: "offerexpert",
    title: "OfferExpert",
    englishTitle: "Interview Preparation Plugin",
    timeframe: "2026",
    tier: "archive",
    status: "live",
    domains: ["ai-product", "automation-tools"],
    logo: { src: "/images/project-logos/offerexpert.png", alt: "OfferExpert" },
    showcaseRank: 9,
    privacy: "公开",
    tagline: "把访谈和播客整理成可以追溯的面试建议。",
    summary: "OfferExpert 是一款面试准备插件，将获准使用的访谈、播客与文章整理为可追溯的专家规则，再结合经用户确认的简历和岗位信息，生成自我介绍、问题预测与回答策略。",
    role: "产品与规则设计",
    skills: ["Codex Plugin", "事实核验", "隐私设计"],
    links: [{ label: "GitHub", href: "https://github.com/Cccoan1120/OfferExpert" }],
    actions: [
      "设计从访谈、播客和文章中提取证据、规则与适用边界的专家蒸馏流程。",
      "将经用户确认的简历事实与岗位要求映射为面试问题、回答策略和追问准备。",
      "为输出保留来源依据与事实确认步骤，避免将未经核实的信息写入回答。",
    ],
    outcomes: [
      "形成可复用的访谈专家蒸馏与面试准备工作流。",
      "公开插件保持来源可追溯、事实可确认和个人资料边界清晰。",
    ],
  },
  {
    slug: "spider-frame",
    title: "Spider Frame",
    englishTitle: "Gesture-driven Comic Camera",
    timeframe: "2026",
    tier: "archive",
    status: "research",
    domains: ["creative-coding"],
    logo: { src: "/images/project-logos/spider-frame.svg", alt: "Spider Frame" },
    showcaseRank: 10,
    privacy: "公开",
    tagline: "对着镜头做手势，画面就切进漫画关键帧。",
    summary:
      "我做了一个浏览器端手势交互实验，用 MediaPipe 识别手势、姿态和面部关键点，再触发漫画化人像、面罩、战衣和蛛丝等连续状态。后续重点优化了识别抖动、交互卡顿与不同屏幕尺寸下的构图。",
    role: "交互设计与前端开发",
    skills: ["MediaPipe", "手势识别", "Canvas", "性能优化"],
    boundaries: ["摄像头画面只在浏览器本地处理；该作品是非商业的粉丝向交互实验。"],
  },
  {
    slug: "multi-rag-service",
    title: "Multi-RAG Service",
    englishTitle: "Configurable Knowledge Routing",
    timeframe: "2026",
    tier: "archive",
    status: "private",
    domains: ["ai-product", "automation-tools"],
    logo: { src: "/images/project-logos/multi-rag-service.svg", alt: "Multi-RAG Service" },
    showcaseRank: 11,
    privacy: "已脱敏",
    tagline: "问题先分流，材料不够就不硬答。",
    summary: "我设计并开发了一套多知识库 RAG 服务，使用意图路由把问题发送到对应知识范围，答案返回来源依据，材料不足时停止作答。服务支持独立配置和评测，便于继续扩展新的知识库。",
    role: "方案设计与开发",
    skills: ["RAG", "意图路由", "FastAPI", "Qdrant"],
  },
  {
    slug: "retention-scoring",
    title: "大规模留存评分管线",
    englishTitle: "Retention Scoring Pipeline",
    timeframe: "2026",
    tier: "archive",
    status: "private",
    domains: ["data-analysis", "automation-tools"],
    logo: { src: "/images/project-logos/retention-scoring.svg", alt: "大规模留存评分管线" },
    showcaseRank: 12,
    privacy: "已脱敏",
    tagline: "大文件跑到一半停了，下次接着来。",
    summary: "我为超大 CSV 评分任务设计了可恢复的数据管线，使用 DuckDB 分批处理，并在运行前检查容量。任务中断后可以继续，输入、处理状态和输出能够逐项核对。",
    role: "产品与数据管线设计",
    skills: ["DuckDB", "大文件处理", "任务恢复"],
  },
  {
    slug: "wsrec-strategy",
    title: "WSREC 留存指标策略",
    englishTitle: "Safe Retention North Star",
    timeframe: "2026",
    tier: "archive",
    status: "research",
    domains: ["data-analysis", "business-research"],
    logo: { src: "/images/project-logos/wsrec-strategy.svg", alt: "WSREC 留存指标策略" },
    showcaseRank: 13,
    privacy: "已脱敏",
    tagline: "先过儿童安全这一关，再计算留存。",
    summary: "我为儿童学习产品设计了 WSREC 周度安全留存指标，把跨日使用、有效参与和儿童安全放入同一计算规则。方案明确要求用真实数据校准阈值，通过安全条件后才能计入留存。",
    role: "指标策略设计",
    skills: ["指标体系", "留存策略", "安全约束"],
  },
  {
    slug: "supply-chain-agents",
    title: "智链中枢",
    englishTitle: "Multi-agent Supply Chain Hub",
    timeframe: "2026.04 至 2026.05",
    tier: "archive",
    status: "research",
    domains: ["ai-product", "business-research"],
    logo: { src: "/images/project-logos/supply-chain-agents.svg", alt: "智链中枢" },
    showcaseRank: 14,
    privacy: "公开",
    tagline: "面向供应链异常协同的多智能体决策原型。",
    summary: "智链中枢是一套面向供应链异常协同的多智能体原型，以中央协调智能体连接销售、库存和生产智能体，并通过需求激增、物流中断和设备停机等压力场景验证异常识别、任务分发与资源调度。",
    role: "个人项目 · 业务拆解与方案设计",
    skills: ["多智能体", "供应链", "压力场景"],
    actions: [
      "将销售、库存和生产拆成职责明确的业务智能体。",
      "设计中枢调度逻辑，汇总异常信息并向相关智能体分发任务。",
      "使用需求激增、物流中断和设备停机等压力场景验证协作过程。",
    ],
    outcomes: [
      "完成多智能体供应链协作原型，并演示异常识别、任务分发与资源调度。",
      "当前成果用于方案研究与场景验证，尚未接入真实企业系统。",
    ],
  },
  {
    slug: "e-companion",
    title: "E 小伴",
    englishTitle: "Edge Device + SaaS Model",
    timeframe: "2026.04 至 2026.06",
    tier: "archive",
    status: "research",
    domains: ["business-research", "ai-product"],
    logo: { src: "/images/project-logos/e-companion.svg", alt: "E 小伴" },
    showcaseRank: 15,
    privacy: "公开",
    tagline: "结合边缘硬件与 SaaS 订阅的商业与财务模型。",
    summary: "E 小伴是一套由边缘硬件与 SaaS 订阅构成的产品商业方案，覆盖收入结构、三年财务报表和压力测试，并对硬件成本、订阅收入与回款周期变化进行情景测算。",
    role: "商业模式与财务负责人",
    skills: ["商业模式", "三表建模", "压力测试"],
    metrics: [{ value: "约 18 个月", label: "盈亏平衡", qualifier: "方案测算" }],
    actions: [
      "设计边缘硬件销售与 SaaS 订阅结合的收入结构。",
      "搭建三年资产负债表、利润表和现金流量表模型。",
      "围绕硬件成本上升、订阅收入下降和回款延迟设置压力情景，并据此调整关键假设。",
    ],
    outcomes: [
      "形成完整的三年财务模型与压力测试方案。",
      "方案测算约在第 18 个月达到盈亏平衡。",
    ],
  },
  {
    slug: "liyuan-study-tour",
    title: "梨源记",
    englishTitle: "Rural Study Tour Model",
    timeframe: "2026.04 至 2026.06",
    tier: "archive",
    status: "research",
    domains: ["business-research"],
    logo: { src: "/images/project-logos/liyuan-study-tour.svg", alt: "梨源记" },
    showcaseRank: 16,
    privacy: "公开",
    tagline: "面向乡村研学的多方协作、定价与盈利方案。",
    summary: "梨源记是一套乡村研学商业方案，围绕目标客群、分层定价、营销渠道、多方协作与盈利模型展开，并通过收入、成本和现金回收测算评估项目可持续性。",
    role: "商业模式与财务负责人",
    skills: ["客群分层", "定价", "乡村运营"],
    metrics: [{ value: "2.5 年", label: "预计回本周期", qualifier: "方案测算" }],
    actions: [
      "按政府、机构、消费者和村集体等角色梳理价值与合作关系。",
      "细分目标客群，设计对应产品、分层价格与营销渠道。",
      "建立收入、成本和现金回收模型，并将多方分工与财务测算整理成参赛方案。",
    ],
    outcomes: [
      "形成 G、B、C、F 多方参与的商业模式与盈利模型。",
      "方案测算预计 2.5 年回本，项目获得挑战杯专项赛市赛特等奖。",
    ],
  },
  {
    slug: "rural-employment-research",
    title: "新型职业农民就业质量研究",
    englishTitle: "Rural Employment Research",
    timeframe: "2024 至 2025",
    tier: "archive",
    status: "research",
    domains: ["data-analysis", "business-research"],
    logo: { src: "/images/project-logos/rural-employment-research.svg", alt: "新型职业农民就业质量研究" },
    showcaseRank: 17,
    privacy: "公开",
    tagline: "基于 2000 多份问卷的新型职业农民就业质量实证研究。",
    summary: "该研究面向河北省新型职业农民就业质量问题，基于 2000 多份问卷开展数据清洗、交叉分析与可视化，比较不同群体的就业质量差异并为课题报告提供数据证据。",
    role: "团队成员 · 数据清洗、交叉分析与可视化",
    skills: ["问卷研究", "数据清洗", "交叉分析"],
    metrics: [{ value: "2000+", label: "问卷样本" }],
    actions: [
      "检查并清理缺失、重复和口径不一致的问卷记录。",
      "按关键人群与就业特征开展交叉分析，比较不同群体的就业质量差异。",
      "将主要发现整理成图表，支持课题报告和结项材料表达。",
    ],
    outcomes: [
      "完成 2000 多份问卷的数据清洗、交叉分析与可视化。",
      "为河北省人力资源和社会保障课题提供数据证据。",
    ],
  },
];

export const flagshipProjects = projects.filter((project) => project.tier === "flagship");
export const satelliteProjects = projects.filter((project) => project.tier === "satellite");
export const archiveProjects = projects.filter((project) => project.tier === "archive");
export const featuredProjects = projects
  .filter((project) => project.featuredRank !== undefined)
  .sort((a, b) => (a.featuredRank ?? 0) - (b.featuredRank ?? 0));
export const spotlightProjects = projects
  .filter((project) => project.spotlightRank !== undefined)
  .sort((a, b) => (a.spotlightRank ?? 0) - (b.spotlightRank ?? 0));
export const rankedProjects = [...projects].sort((a, b) => a.showcaseRank - b.showcaseRank);

const hiddenShowcaseSlugs = new Set([
  "tenni-signal",
  "spider-frame",
  "multi-rag-service",
  "retention-scoring",
  "wsrec-strategy",
]);

const solutionShowcaseSlugs = new Set([
  "smart-agriculture-live",
  "supply-chain-agents",
  "e-companion",
  "liyuan-study-tour",
  "rural-employment-research",
]);

export const workShowcaseProjects = rankedProjects.filter(
  (project) => !hiddenShowcaseSlugs.has(project.slug) && !solutionShowcaseSlugs.has(project.slug),
);
export const solutionShowcaseProjects = rankedProjects.filter((project) => solutionShowcaseSlugs.has(project.slug));
export const hiddenShowcaseProjects = rankedProjects.filter((project) => hiddenShowcaseSlugs.has(project.slug));
export const showcaseProjects = [...workShowcaseProjects, ...solutionShowcaseProjects];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
