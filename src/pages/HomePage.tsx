import { useEffect } from "react";
import { LifeShowcase } from "../components/LifeShowcase";
import { MaterialIcon } from "../components/MaterialIcon";
import { ProjectShowcase } from "../components/ProjectShowcase";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { lifeEntries } from "../content/life";
import { profile } from "../content/profile";
import { profileMedia } from "../content/profileMedia";
import { solutionShowcaseProjects, workShowcaseProjects } from "../content/projects";

const heroTraits = ["产品探索者", "生活爱好者", "长期学习者"];
const currentFocus = [
  {
    icon: "school",
    title: "北京语言大学 · 2027 届 · 会计专硕（MPAcc）",
    description: "在北京语言大学读会计专硕，也在财务、商业分析与研究训练中持续积累。",
  },
  {
    icon: "code",
    title: "Vibe Coding",
    description: "对 AI 和 Vibe Coding 始终很感兴趣，也一直在做自己真正喜欢的小产品。",
  },
  {
    icon: "landscape",
    title: "兴趣广泛",
    description: "喜欢徒步、攀岩、健身和游泳，也爱播客、脱口秀与喜剧，让生活始终保持伸展感。",
  },
];

export function HomePage() {
  useEffect(() => { document.title = "霄汉无垠｜COAN CHEN 的生活与作品"; }, []);

  return (
    <main id="main-content" className="home-page cosmic-home">
      <section className="cosmic-hero" id="home" aria-labelledby="home-title">
        <div className="cosmic-hero__grid page-shell">
          <div className="cosmic-hero__copy">
            <p className="hero-eyebrow"><span>你好，我是</span><small>HELLO, I'M</small></p>
            <h1 id="home-title">陈宵瀚</h1>
            <p className="hero-english-name">COAN CHEN</p>
            <p className="hero-statement">世界动荡 我不摇晃</p>
            <ul className="hero-traits" aria-label="个人标签">
              {heroTraits.map((trait) => <li key={trait}>{trait}</li>)}
            </ul>
            <div className="hero-current">
              <p className="hero-current__label"><i aria-hidden="true" />最近在做 <small>CURRENTLY</small></p>
              <div className="hero-current__list">
                {currentFocus.map((item) => (
                  <article key={item.title}>
                    <span className="hero-current__icon"><MaterialIcon>{item.icon}</MaterialIcon></span>
                    <div><h2>{item.title}</h2><p>{item.description}</p></div>
                    <MaterialIcon className="hero-current__arrow">arrow_forward</MaterialIcon>
                  </article>
                ))}
              </div>
            </div>
            <a className="hero-explore" href="#projects">
              <span className="hero-explore__copy"><strong>探索更多</strong><small>EXPLORE MORE</small></span>
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
            <p className="about-role">在产品、AI 和真实问题之间不断折腾的人。</p>
            {profile.aboutParagraphs.slice(0, 2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <ul className="about-traits"><li>AI</li><li>产品</li><li>数据</li><li>Vibe Coding</li><li>持续折腾</li></ul>
            <dl className="about-facts">
              <div><dt>{workShowcaseProjects.length}</dt><dd>作品 / Projects</dd></div>
              <div><dt>{solutionShowcaseProjects.length}</dt><dd>产品实验 / Experiments</dd></div>
              <div><dt>{lifeEntries.length}</dt><dd>生活切片 / Moments</dd></div>
            </dl>
            <a href="#projects">继续看看，我还在折腾什么 <MaterialIcon>arrow_forward</MaterialIcon></a>
          </div>
        </div>
      </section>
    </main>
  );
}
