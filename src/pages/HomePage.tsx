import { useEffect } from "react";
import { LifeShowcase } from "../components/LifeShowcase";
import { MaterialIcon } from "../components/MaterialIcon";
import { ProjectShowcase } from "../components/ProjectShowcase";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { lifeEntries } from "../content/life";
import { honors, internships, profile } from "../content/profile";
import { profileMedia } from "../content/profileMedia";
import { solutionShowcaseProjects, workShowcaseProjects } from "../content/projects";

export function HomePage() {
  useEffect(() => { document.title = "霄汉无垠｜COAN CHEN 的生活与作品"; }, []);

  return (
    <main id="main-content" className="home-page cosmic-home">
      <section className="cosmic-hero" id="home" aria-labelledby="home-title">
        <div className="cosmic-hero__grid page-shell">
          <div className="cosmic-hero__copy">
            <p className="hero-eyebrow">你好，我是</p>
            <h1 id="home-title" aria-label={profile.name}>
              {Array.from(profile.name).map((character) => (
                <span className="hero-name-character" aria-hidden="true" key={character}>{character}</span>
              ))}
            </h1>
            <p className="hero-english-name">COAN CHEN</p>
            <p className="hero-statement">世界动荡 我不摇晃</p>
          </div>
          <div className="hero-current">
            <p className="hero-current__label">现在的我</p>
            <p className="hero-current__education">北京语言大学 · 2027 届会计专硕</p>
            <p className="hero-current__description">用 AI 做一些自己愿意用的小产品。空下来去徒步、攀岩，听播客、看脱口秀。</p>
            <a className="hero-explore" href="#projects">
              <span className="hero-explore__copy"><strong>看看我的作品</strong></span>
              <span className="hero-explore__arrow" aria-hidden="true"><MaterialIcon>arrow_downward</MaterialIcon></span>
            </a>
          </div>
          <div className="hero-planet-stage" data-cosmic-reactive aria-label="陈宵瀚在草原骑马的照片">
            <span className="hero-nebula" aria-hidden="true" />
            <span className="hero-orbit hero-orbit--inner" aria-hidden="true"><i /></span>
            <span className="hero-ring hero-ring--back" aria-hidden="true" />
            <span className="hero-star hero-star--one" aria-hidden="true" />
            <span className="hero-star hero-star--two" aria-hidden="true" />
            <figure className="hero-planet">
              <span className="hero-planet__atmosphere" aria-hidden="true" />
              <ResponsiveImage {...profileMedia.horseback} eager sizes="(max-width: 768px) 86vw, 54vw" />
            </figure>
            <span className="hero-ring hero-ring--front" aria-hidden="true" />
            <span className="hero-moon hero-moon--one" aria-hidden="true" />
            <span className="hero-moon hero-moon--two" aria-hidden="true" />
          </div>
        </div>
      </section>

      <ProjectShowcase />

      <LifeShowcase />

      <section className="home-about cosmic-section page-shell" id="about" aria-labelledby="about-title" data-reveal>
        <header className="cosmic-section__header about-section-heading"><div><h2 id="about-title">关于我</h2><small>ABOUT</small></div></header>
        <div className="about-cosmos">
          <div className="about-portrait-stage" data-cosmic-reactive>
            <span className="about-planet-halo" aria-hidden="true" />
            <span className="about-orbit" aria-hidden="true" />
            <figure className="about-portrait">
              <ResponsiveImage {...profileMedia.portrait} sizes="(max-width: 768px) 78vw, 31vw" fullWidth={1080} />
            </figure>
            <span className="about-planet-moon about-planet-moon--one" aria-hidden="true" />
            <span className="about-planet-moon about-planet-moon--two" aria-hidden="true" />
          </div>
          <div className="about-copy">
            <h3>Hi，我是陈宵瀚</h3>
            {profile.aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <ul className="about-traits"><li>ENFJ</li><li>产品</li><li>AI</li><li>Vibe Coding</li></ul>
            <dl className="about-facts">
              <div><dt>{workShowcaseProjects.length}</dt><dd>作品 / Projects</dd></div>
              <div><dt>{solutionShowcaseProjects.length}</dt><dd>产品实验 / Experiments</dd></div>
              <div><dt>{lifeEntries.length}</dt><dd>生活切片 / Moments</dd></div>
            </dl>
          </div>
        </div>
        <div className="about-history" aria-label="实习与获奖经历">
          <section className="about-history__group" aria-labelledby="about-experience-title">
            <header className="about-history__header">
              <h3 id="about-experience-title">实习经历</h3>
              <small>EXPERIENCE</small>
            </header>
            <ul className="about-experience-list">
              {internships.map((internship) => (
                <li key={internship.company}>
                  <span className="about-history__company">{internship.company}</span>
                  <span className="about-history__role">{internship.role}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="about-history__group" aria-labelledby="about-honors-title">
            <header className="about-history__header">
              <h3 id="about-honors-title">获奖经历</h3>
              <small>HONORS</small>
            </header>
            <ul className="about-honors-list">
              {honors.map((honor) => (
                <li key={`${honor.year}-${honor.title}`}>
                  <time dateTime={honor.year.slice(0, 4)}>{honor.year}</time>
                  <span>{honor.title}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
