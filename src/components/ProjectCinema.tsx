import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { domainLabels, featuredProjects, statusLabels } from "../content/projects";
import type { Project } from "../types/content";
import { ResponsiveImage } from "./ResponsiveImage";
import { KolEvidence, TeeniEvidence } from "./SyntheticEvidence";

function ProjectVisual({ project }: { project: Project }) {
  if (project.slug === "kol-review-desk") return <KolEvidence />;
  if (project.slug === "teeni-insight-suite") return <TeeniEvidence />;

  if (project.slug === "smart-agriculture-live" && project.gallery) {
    return (
      <div className="cinema-field-grid">
        {project.gallery.map((image, index) => (
          <figure key={image.base} data-primary={index === 0 ? "true" : "false"}>
            <ResponsiveImage {...image} sizes={index === 0 ? "(max-width: 768px) 92vw, 48vw" : "(max-width: 768px) 44vw, 20vw"} />
            <figcaption>{index === 0 ? "1535 份直播样本与实地调研" : image.alt}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  if (!project.cover) return null;
  const secondary = project.gallery?.find((image) => image.base !== project.cover?.base);
  return (
    <div className={`cinema-product-stage cinema-product-stage--${project.slug}`}>
      <figure className="cinema-product-stage__primary">
        <ResponsiveImage {...project.cover} sizes={project.cover.portrait ? "(max-width: 768px) 74vw, 28vw" : "(max-width: 768px) 92vw, 58vw"} />
        <figcaption>LIVE PRODUCT EVIDENCE / {project.privacy}</figcaption>
      </figure>
      {secondary ? (
        <figure className="cinema-product-stage__secondary" aria-label={`${project.title} 补充界面`}>
          <ResponsiveImage {...secondary} sizes="(max-width: 768px) 54vw, 20vw" />
        </figure>
      ) : null}
    </div>
  );
}

export function ProjectCinema() {
  const [activeSlug, setActiveSlug] = useState(featuredProjects[0]?.slug ?? "");
  const cinemaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scenes = Array.from(cinemaRef.current?.querySelectorAll<HTMLElement>("[data-cinema-scene]") ?? []);
    if (!scenes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSlug(visible.target.id.replace("project-", ""));
      },
      { rootMargin: "-28% 0px -48% 0px", threshold: [0, 0.25, 0.5, 0.75] },
    );
    scenes.forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, []);

  const scrollToProject = (slug: string) => {
    const target = document.getElementById(`project-${slug}`);
    if (!target) return;
    const offset = 72;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section className="project-cinema" id="featured-work" aria-labelledby="cinema-title">
      <header className="cinema-heading page-shell">
        <p className="coordinate-label">PROJECT CINEMA / 01-05</p>
        <h2 id="cinema-title">五个项目，五种把判断变成产品的方式。</h2>
        <p>从个人知识资产到真实业务分析，向下滚动进入每个观测场景。</p>
      </header>

      <div className="cinema-reel" ref={cinemaRef}>
        {featuredProjects.map((project) => {
          const rank = String(project.featuredRank).padStart(2, "0");
          const hasCase = project.tier === "flagship";
          return (
            <article
              className={`cinema-scene cinema-scene--${project.slug}`}
              id={`project-${project.slug}`}
              data-cinema-scene
              data-active={activeSlug === project.slug ? "true" : "false"}
              key={project.slug}
            >
              <div className="cinema-scene__inner page-shell">
                <div className="cinema-scene__copy">
                  <p className="coordinate-label">OBSERVATION / {rank}</p>
                  <h3>{project.title}</h3>
                  <p className="cinema-scene__english">{project.englishTitle}</p>
                  <p className="cinema-scene__tagline">{project.tagline}</p>
                  <p>{project.summary}</p>
                  <dl className="cinema-scene__facts">
                    <div><dt>ROLE</dt><dd>{project.role}</dd></div>
                    <div><dt>STATUS</dt><dd>{statusLabels[project.status]}</dd></div>
                    <div><dt>TIMEFRAME</dt><dd>{project.timeframe}</dd></div>
                    <div><dt>EVIDENCE</dt><dd>{project.privacy}</dd></div>
                  </dl>
                  <ul className="domain-list" aria-label={`${project.title} 项目领域`}>
                    {project.domains.map((domain) => <li key={domain}>{domainLabels[domain]}</li>)}
                  </ul>
                  <div className="cinema-scene__actions">
                    {hasCase ? (
                      <Link className="case-link" to={`/projects/${project.slug}`}>
                        查看完整案例 <ArrowUpRight aria-hidden="true" />
                      </Link>
                    ) : (
                      <Link className="case-link" to={`/projects?q=${encodeURIComponent(project.title)}#${project.slug}`}>
                        查看项目证据 <ArrowUpRight aria-hidden="true" />
                      </Link>
                    )}
                    {project.links?.[0] && !hasCase ? (
                      <a className="text-action" href={project.links[0].href} target="_blank" rel="noreferrer">
                        {project.links[0].label} <ArrowUpRight aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </div>
                <div className="cinema-scene__visual">
                  <ProjectVisual project={project} />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <nav className="cinema-rail" aria-label="精选项目轨道">
        {featuredProjects.map((project) => (
          <button
            type="button"
            key={project.slug}
            aria-label={`前往项目 ${project.featuredRank}：${project.title}`}
            aria-current={activeSlug === project.slug ? "true" : undefined}
            onClick={() => scrollToProject(project.slug)}
          >
            <span>{String(project.featuredRank).padStart(2, "0")}</span>
            <strong>{project.title}</strong>
          </button>
        ))}
      </nav>

      <footer className="cinema-outro page-shell">
        <p>精选放映结束。其余八个项目与后续更新集中在完整星图。</p>
        <Link className="primary-action" to="/projects">浏览全部 13 个项目 <ArrowUpRight aria-hidden="true" /></Link>
      </footer>
    </section>
  );
}
