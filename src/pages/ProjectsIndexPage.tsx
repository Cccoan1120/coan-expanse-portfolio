import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MaterialIcon } from "../components/MaterialIcon";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { domainLabels, domainOptions, projects, spotlightProjects, statusLabels } from "../content/projects";
import { projectMedia } from "../content/projectMedia";
import type { ImageAsset, Project, ProjectDomain } from "../types/content";

const domainValues = new Set<ProjectDomain>(domainOptions.map((option) => option.value));
const flagshipImages: Record<string, ImageAsset> = projectMedia.flagshipProjects;
const spotlightImages: Record<string, ImageAsset> = projectMedia.spotlightProjects;

function FlagshipCard({ project }: { project: Project }) {
  return (
    <article className="flagship-card" data-reveal>
      <Link to={`/projects/${project.slug}`}>
        <figure><ResponsiveImage {...flagshipImages[project.slug]} sizes="(max-width: 768px) 92vw, 44vw" /></figure>
        <div className="flagship-card__body">
          <header><div><h2>{project.title}</h2><small>{project.englishTitle}</small></div><span>编号 {String(project.featuredRank).padStart(2, "0")}</span></header>
          <p className="flagship-card__role">{project.role}</p>
          <p>{project.summary}</p>
          <ul>{project.skills.slice(0, 3).map((skill) => <li key={skill}>{skill}</li>)}</ul>
          <strong>展开看看 <MaterialIcon>arrow_forward</MaterialIcon></strong>
        </div>
      </Link>
    </article>
  );
}

function SpotlightCard({ project, index }: { project: Project; index: number }) {
  const primaryLink = project.links?.[0];
  return (
    <article className={`spotlight-card spotlight-card--${index + 1}`} id={project.slug} data-reveal>
      <figure><ResponsiveImage {...spotlightImages[project.slug]} sizes={index === 0 ? "(max-width: 768px) 92vw, 54vw" : "(max-width: 768px) 92vw, 32vw"} /></figure>
      <div className="spotlight-card__body">
        <small>{statusLabels[project.status]} / {project.role}</small>
        <h3>{project.title}</h3>
        <p className="spotlight-card__tagline">{project.tagline}</p>
        <p>{project.summary}</p>
        <ul>{project.skills.slice(0, 3).map((skill) => <li key={skill}>{skill}</li>)}</ul>
        {primaryLink ? <a href={primaryLink.href} target="_blank" rel="noreferrer">{primaryLink.label} <MaterialIcon>open_in_new</MaterialIcon></a> : null}
      </div>
    </article>
  );
}

export function ProjectsIndexPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showAll, setShowAll] = useState(false);
  const [expandedSlug, setExpandedSlug] = useState("");
  const query = searchParams.get("q") ?? "";
  const rawCategory = searchParams.get("category") as ProjectDomain | null;
  const category = rawCategory && domainValues.has(rawCategory) ? rawCategory : null;
  const hasFilters = Boolean(query.trim() || category);

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("zh-CN");
    return projects.filter((project) => {
      if (category && !project.domains.includes(category)) return false;
      if (!needle) return true;
      return [project.title, project.englishTitle, project.tagline, project.summary, project.role, ...project.skills]
        .join(" ")
        .toLocaleLowerCase("zh-CN")
        .includes(needle);
    });
  }, [category, query]);

  const flagships = filtered.filter((project) => project.tier === "flagship");
  const spotlights = filtered
    .filter((project) => project.spotlightRank !== undefined)
    .sort((a, b) => (a.spotlightRank ?? 0) - (b.spotlightRank ?? 0));
  const archive = filtered.filter((project) => project.tier !== "flagship" && project.spotlightRank === undefined);
  const visibleArchive = hasFilters || showAll ? archive : archive.slice(0, 4);

  useEffect(() => { document.title = "项目｜霄汉无垠"; }, []);
  useEffect(() => {
    const slug = window.location.hash.slice(1);
    if (!slug) return;
    setShowAll(true);
    setExpandedSlug(slug);
    window.requestAnimationFrame(() => {
      const target = document.getElementById(slug);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "auto" });
    });
  }, []);

  const updateParams = (changes: { q?: string; category?: ProjectDomain | null }) => {
    const next = new URLSearchParams(searchParams);
    if (changes.q !== undefined) changes.q ? next.set("q", changes.q) : next.delete("q");
    if (changes.category !== undefined) changes.category ? next.set("category", changes.category) : next.delete("category");
    setSearchParams(next, { replace: true });
    setShowAll(false);
  };

  return (
    <main id="main-content" className="projects-page rail-page">
      <div className="projects-shell">
        <header className="projects-intro" data-reveal>
          <div>
            <h1>边想<br />边做</h1>
            <p className="projects-kicker">PROJECTS</p>
            <p className="projects-count"><MaterialIcon>database</MaterialIcon> 目前一共 <strong>{projects.length}</strong> 个 <span>{spotlightProjects.length} 个近期完成</span></p>
          </div>
          <div className="project-query" role="search">
            <label>
              <span className="visually-hidden">搜索项目</span>
              <MaterialIcon>search</MaterialIcon>
              <input value={query} onChange={(event) => updateParams({ q: event.target.value })} placeholder="搜项目或关键词" />
            </label>
            <div className="domain-filter" aria-label="领域筛选">
              <button type="button" aria-pressed={!category} onClick={() => updateParams({ category: null })}>全部领域</button>
              {domainOptions.map((option) => (
                <button key={option.value} type="button" aria-pressed={category === option.value} onClick={() => updateParams({ category: option.value })}>{option.label}</button>
              ))}
            </div>
          </div>
        </header>

        {spotlights.length ? (
          <section className="spotlight-section" aria-labelledby="spotlight-title" data-reveal>
            <header><h2 id="spotlight-title"><strong>最近刚做完的</strong><span>RECENT BUILDS</span></h2></header>
            <div className="spotlight-grid">{spotlights.map((project, index) => <SpotlightCard project={project} index={index} key={project.slug} />)}</div>
          </section>
        ) : null}

        {flagships.length ? (
          <section className="flagship-section" aria-labelledby="flagship-title" data-reveal>
            <header><h2 id="flagship-title"><strong>做得比较久的</strong></h2></header>
            <div>{flagships.map((project) => <FlagshipCard project={project} key={project.slug} />)}</div>
          </section>
        ) : null}

        <section className="archive-section" id="archive" aria-labelledby="archive-title" data-reveal>
          <header><h2 id="archive-title"><strong>其余项目</strong></h2></header>
          <div className="archive-records">
            {visibleArchive.map((project) => {
              const rank = String(projects.indexOf(project) + 1).padStart(2, "0");
              const expanded = expandedSlug === project.slug;
              return (
                <article className="archive-record" id={project.slug} key={project.slug}>
                  <div className="archive-record__row">
                    <span>{rank}</span>
                    <div><h3>{project.title}</h3><p>{project.englishTitle}</p></div>
                    <p>{project.role}</p>
                    <div className="archive-record__state"><strong data-status={project.status}>{statusLabels[project.status]}</strong><span>{project.timeframe.split(" ")[0]}</span></div>
                    <button type="button" aria-expanded={expanded} aria-controls={`record-${project.slug}`} aria-label={`${expanded ? "收起" : "展开"}${project.title}`} onClick={() => setExpandedSlug(expanded ? "" : project.slug)}>
                      <MaterialIcon>{expanded ? "expand_less" : "expand_more"}</MaterialIcon>
                    </button>
                  </div>
                  <div className="archive-record__details" id={`record-${project.slug}`} hidden={!expanded}>
                    <p>{project.summary}</p>
                    <dl>
                      <div><dt>领域 <span>DOMAINS</span></dt><dd>{project.domains.map((domain) => domainLabels[domain]).join(" / ")}</dd></div>
                      <div><dt>能力 <span>SKILLS</span></dt><dd>{project.skills.join(" / ")}</dd></div>
                      <div><dt>信息边界 <span>BOUNDARY</span></dt><dd>{project.privacy}</dd></div>
                    </dl>
                    {project.links?.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} <MaterialIcon>open_in_new</MaterialIcon></a>)}
                  </div>
                </article>
              );
            })}
            {!filtered.length ? <p className="no-results">没搜到。换个词再试试。</p> : null}
          </div>
          {!hasFilters && !showAll && archive.length > 3 ? (
            <button className="load-records" type="button" onClick={() => setShowAll(true)}>把剩下的也展开</button>
          ) : null}
        </section>
      </div>
    </main>
  );
}
