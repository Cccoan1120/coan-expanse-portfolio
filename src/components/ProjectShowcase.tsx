import {
  domainLabels,
  solutionShowcaseProjects,
  statusLabels,
  workShowcaseProjects,
} from "../content/projects";
import type { Project } from "../types/content";
import { MaterialIcon } from "./MaterialIcon";

function ProjectLinks({ project }: { project: Project }) {
  if (!project.links?.length) return null;

  return (
    <div className="showcase-links" aria-label={`${project.title} 项目链接`}>
      {project.links.map((link) => (
        <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
          {link.label}
          <MaterialIcon>open_in_new</MaterialIcon>
        </a>
      ))}
    </div>
  );
}

function ProjectLogo({ project, eager = false }: { project: Project; eager?: boolean }) {
  return (
    <div className="showcase-logo-stage" data-cosmic-reactive data-planet={project.domains[0]} data-project={project.slug}>
      <span className="showcase-logo-glow" aria-hidden="true" />
      <span className="showcase-logo-surface" aria-hidden="true" />
      <span className="showcase-logo-orbit" aria-hidden="true" />
      <span className="showcase-logo-orbit showcase-logo-orbit--polar" aria-hidden="true" />
      <span className="showcase-logo-moon" aria-hidden="true" />
      <span className="showcase-logo-moon showcase-logo-moon--small" aria-hidden="true" />
      <img
        src={project.logo.src}
        alt={project.logo.alt}
        width={512}
        height={512}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}

function ProjectWorkDetails({ project }: { project: Project }) {
  const actions = project.actions ?? [];
  const outcomes = project.outcomes ?? [];
  if (!actions.length && !outcomes.length) return null;

  return (
    <details className="project-work-details">
      <summary>
        <span>查看我的工作</span>
        <MaterialIcon>add</MaterialIcon>
      </summary>
      <div className="project-work-details__content">
        {actions.length ? (
          <section>
            <h4>我做了什么</h4>
            <ul>{actions.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        ) : null}
        {outcomes.length ? (
          <section>
            <h4>形成结果</h4>
            <ul>{outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        ) : null}
      </div>
    </details>
  );
}

function SkillList({ project, limit }: { project: Project; limit: number }) {
  return (
    <ul className="showcase-skills" aria-label={`${project.title} 技术与能力`}>
      {project.skills.slice(0, limit).map((skill) => <li key={skill}>{skill}</li>)}
    </ul>
  );
}

function MineFeature({ project }: { project: Project }) {
  return (
    <article className="showcase-feature" id={`project-${project.slug}`} data-reveal>
      <span className="showcase-number" aria-hidden="true">01</span>
      <ProjectLogo project={project} eager />
      <div className="showcase-feature__copy">
        <div className="showcase-meta">
          <span>{domainLabels[project.domains[0]]}</span>
          <span className="showcase-status">{statusLabels[project.status]}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="showcase-english-title">{project.englishTitle}</p>
        <p className="showcase-tagline">{project.tagline}</p>
        <p className="showcase-summary">{project.summary}</p>
        <dl className="showcase-facts">
          <div><dt>我的角色</dt><dd>{project.role}</dd></div>
          <div><dt>项目周期</dt><dd>{project.timeframe}</dd></div>
          <div><dt>公开状态</dt><dd>{project.privacy}</dd></div>
        </dl>
        <SkillList project={project} limit={5} />
        <ProjectWorkDetails project={project} />
        {project.boundaries?.length ? (
          <div className="showcase-boundary">
            <strong>公开边界</strong>
            <p>{project.boundaries[0]}</p>
          </div>
        ) : null}
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

function ProjectCard({ project, number }: { project: Project; number: number }) {
  return (
    <article className="showcase-card" id={`project-${project.slug}`} data-reveal>
      <span className="showcase-number" aria-hidden="true">{String(number).padStart(2, "0")}</span>
      <ProjectLogo project={project} />
      <div className="showcase-card__copy">
        <div className="showcase-meta">
          <span>{domainLabels[project.domains[0]]}</span>
          <span className="showcase-status">{statusLabels[project.status]}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="showcase-english-title">{project.englishTitle}</p>
        <p className="showcase-summary">{project.summary}</p>
        <SkillList project={project} limit={4} />
        <ProjectWorkDetails project={project} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

function SolutionRow({ project }: { project: Project }) {
  return (
    <details className="solution-row" id={`project-${project.slug}`} data-reveal>
      <summary>
        <span className="solution-row__type">{domainLabels[project.domains[0]]}</span>
        <span className="solution-row__heading">
          <strong>{project.title}</strong>
          <small>{project.englishTitle}</small>
        </span>
        <span className="solution-row__tagline">{project.tagline}</span>
        <span className="solution-row__toggle" aria-hidden="true"><MaterialIcon>add</MaterialIcon></span>
      </summary>
      <div className="solution-row__content">
        <p>{project.summary}</p>
        <dl className="solution-row__facts">
          <div><dt>我的角色</dt><dd>{project.role}</dd></div>
          <div><dt>项目周期</dt><dd>{project.timeframe}</dd></div>
          {project.metrics?.[0] ? <div><dt>{project.metrics[0].label}</dt><dd>{project.metrics[0].value}</dd></div> : null}
        </dl>
        <div className="solution-row__columns">
          <section>
            <h5>我做了什么</h5>
            <ul>{project.actions?.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section>
            <h5>形成什么</h5>
            <ul>{project.outcomes?.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>
        <SkillList project={project} limit={4} />
      </div>
    </details>
  );
}

export function ProjectShowcase() {
  const [mine, ...remainingProjects] = workShowcaseProjects;

  return (
    <section className="project-showcase cosmic-section page-shell" id="projects" aria-labelledby="projects-title">
      <header className="project-showcase__header" data-reveal>
        <h2 id="projects-title">把生活过得辽阔一点，把热爱做得具体一点。</h2>
        <p className="project-showcase__subtitle">作品展示</p>
      </header>
      <MineFeature project={mine} />
      <div className="showcase-grid">
        {remainingProjects.map((project, index) => (
          <ProjectCard project={project} number={index + 2} key={project.slug} />
        ))}
      </div>
      <section className="solution-showcase" aria-labelledby="solutions-title">
        <header data-reveal>
          <h3 id="solutions-title">方案展示</h3>
          <p>商业研究、数据分析与产品构想，点击任一方案查看我的工作与结果。</p>
        </header>
        <div className="solution-showcase__list">
          {solutionShowcaseProjects.map((project) => <SolutionRow project={project} key={project.slug} />)}
        </div>
      </section>
    </section>
  );
}
