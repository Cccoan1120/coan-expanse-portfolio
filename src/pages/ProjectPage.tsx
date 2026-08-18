import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MaterialIcon } from "../components/MaterialIcon";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { getProject, statusLabels } from "../content/projects";
import { projectMedia } from "../content/projectMedia";
import type { ImageAsset, Project } from "../types/content";
import { NotFoundPage } from "./NotFoundPage";

function CaseMeta({ project }: { project: Project }) {
  return (
    <dl className="case-meta">
      <div><dt>角色 <span>ROLE</span></dt><dd>{project.role}</dd></div>
      <div><dt>状态 <span>STATUS</span></dt><dd>{statusLabels[project.status]}</dd></div>
      <div><dt>周期 <span>TIMEFRAME</span></dt><dd>{project.timeframe}</dd></div>
      <div><dt>信息边界 <span>PRIVACY</span></dt><dd>{project.privacy}</dd></div>
    </dl>
  );
}

function CaseLinks({ project }: { project: Project }) {
  if (!project.links?.length) return null;
  return (
    <div className="case-links">
      {project.links.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} <MaterialIcon>open_in_new</MaterialIcon></a>)}
    </div>
  );
}

const mineEvidence: Array<{ image: ImageAsset; label: string }> = [
  { image: projectMedia.mineEvidence[0], label: "素材编辑与来源问答" },
  { image: projectMedia.mineEvidence[1], label: "账号隔离入口" },
  { image: projectMedia.mineEvidence[2], label: "移动端工作台" },
];

function MineCase({ project }: { project: Project }) {
  return (
    <main id="main-content" className="case-page mine-page">
      <header className="mine-intro case-shell" data-reveal>
        <Link className="return-link" to="/projects"><MaterialIcon>arrow_back</MaterialIcon> 回项目页</Link>
        <h1>Mine<br />把收藏接回创作</h1>
        <p className="case-position">{project.tagline}</p>
        <CaseMeta project={project} />
        <figure className="mine-hero-frame"><ResponsiveImage {...projectMedia.mineHero} eager sizes="(max-width: 768px) 100vw, 86vw" /></figure>
      </header>

      <div className="mine-case-grid case-shell">
        <nav className="mine-chapter-nav" aria-label="Mine 案例章节">
          <a href="#mine-problem"><strong>为什么要做</strong><small>PROBLEM</small></a>
          <a href="#mine-decisions"><strong>怎么做的</strong><small>DECISIONS</small></a>
          <a href="#mine-evidence"><strong>现在长什么样</strong><small>EVIDENCE</small></a>
          <a href="#mine-outcomes"><strong>做到哪了</strong><small>OUTCOMES</small></a>
        </nav>
        <article className="mine-story">
          <section id="mine-problem" data-reveal>
            <h2>收藏了很多，真要用时却找不到</h2>
            <p>{project.problem}</p>
          </section>
          <section id="mine-decisions" data-reveal>
            <h2>先做一个自己会用的版本</h2>
            <div className="mine-decision-grid">
              {project.actions?.map((action, index) => (
                <article key={action}><span>{String(index + 1).padStart(2, "0")}</span><p>{action}</p></article>
              ))}
            </div>
          </section>
          <section id="mine-evidence" data-reveal>
            <h2>它现在长这样</h2>
            <div className="mine-evidence-grid">
              {mineEvidence.map((item, index) => (
                <figure key={item.label}>
                  <ResponsiveImage {...item.image} sizes="(max-width: 768px) 100vw, 64vw" />
                  <figcaption>{String(index + 1).padStart(2, "0")} / {item.label}</figcaption>
                </figure>
              ))}
            </div>
          </section>
          <section id="mine-outcomes" data-reveal>
            <h2>目前做到这里</h2>
            <ul className="case-outcome-list">{project.outcomes?.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
            <CaseLinks project={project} />
          </section>
        </article>
      </div>
      <nav className="case-next case-shell" aria-label="案例导航"><Link to="/projects">回项目页</Link><Link to="/projects/orbito">再看 <strong>Orbito</strong></Link></nav>
    </main>
  );
}

function OrbitoCase({ project }: { project: Project }) {
  return (
    <main id="main-content" className="case-page orbito-page">
      <div className="orbito-shell case-shell">
        <section className="orbito-intro" data-reveal>
          <Link className="return-link" to="/projects"><MaterialIcon>arrow_back</MaterialIcon> 回项目页</Link>
          <h1>ORBITO</h1>
          <p className="orbito-subtitle">个人日常工作台 · PERSONAL DAILY WORKBENCH</p>
          <div className="orbito-badges">
            <span><MaterialIcon>person</MaterialIcon>{project.role}</span>
            <strong><MaterialIcon>experiment</MaterialIcon>状态 {statusLabels[project.status]}</strong>
            <span><MaterialIcon>shield</MaterialIcon>信息边界 {project.privacy}</span>
          </div>
          <p>{project.summary}</p>
          <CaseLinks project={project} />
        </section>

        <section className="orbito-decisions" aria-label="问题与关键决策" data-reveal>
          <article>
            <p className="case-label">为什么做</p>
            <h2>每天来回切软件，太麻烦了</h2>
            <p>{project.problem}</p>
            <div className="decision-orbits" aria-hidden="true"><i /><i /><i /></div>
          </article>
          <article>
            <p className="case-label">怎么做的</p>
            <h2>先把每天真会打开的东西放在一起</h2>
            <ol>{project.actions?.map((action, index) => <li key={action}><span>{String(index + 1).padStart(2, "0")}</span>{action}</li>)}</ol>
          </article>
        </section>

        <section className="orbito-telemetry" data-reveal>
          <header><p className="case-label">现在长这样</p></header>
          <figure><ResponsiveImage {...projectMedia.orbitoDashboard} sizes="(max-width: 768px) 100vw, 86vw" /></figure>
        </section>

        <section className="orbito-resolution" data-reveal>
          <article>
            <p className="case-label">目前能做的</p>
            <ul>{project.outcomes?.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
          </article>
          <article>
            <p className="case-label case-label--amber">还有这些限制</p>
            <ul>{project.boundaries?.map((boundary) => <li key={boundary}>{boundary}</li>)}</ul>
          </article>
        </section>
        <nav className="case-next" aria-label="案例导航"><Link to="/projects">回项目页</Link><Link to="/projects/mine">再看 <strong>Mine</strong></Link></nav>
      </div>
    </main>
  );
}

export function ProjectPage() {
  const { slug = "" } = useParams();
  const project = getProject(slug);
  useEffect(() => { document.title = project ? `${project.title}｜霄汉无垠 COAN EXPANSE` : "未找到项目｜霄汉无垠 COAN EXPANSE"; }, [project]);
  if (!project || project.tier !== "flagship") return <NotFoundPage />;
  return project.slug === "mine" ? <MineCase project={project} /> : <OrbitoCase project={project} />;
}
