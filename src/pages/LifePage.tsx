import { useEffect } from "react";
import { AmbientVideo } from "../components/AmbientVideo";
import { MaterialIcon } from "../components/MaterialIcon";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { lifeEntries } from "../content/life";
import { profile } from "../content/profile";

const lifeChapters = [
  {
    title: "去往远处",
    description: "从饮牛渠的晴雨走到锡林郭勒的暮色。路途很长，风景和同行的人让它值得。",
    entries: lifeEntries.slice(0, 4),
  },
  {
    title: "留在现场",
    description: "我会听播客，也会去看电影和线下演出。散场之后写下几句话，记住当时被什么打动。",
    entries: lifeEntries.slice(4, 6),
  },
  {
    title: "动手做点什么",
    description: "Mine 和 Orbito 都从自己的麻烦开始。先做出能用的版本，再根据使用和反馈继续修改。",
    entries: lifeEntries.slice(6),
  },
];

export function LifePage() {
  useEffect(() => { document.title = "生活｜霄汉无垠"; }, []);

  return (
    <main id="main-content" className="life-page page-shell">
      <header className="life-page-intro" data-reveal>
        <h1>生活向远处展开</h1>
        <p>我喜欢走进陌生的风景，也愿意为书、播客和一次次动手实践留出时间。这里收着几段路途与相遇，也记录那些从想法变成产品的过程。</p>
      </header>

      <div className="life-journal">
        {lifeChapters.map((chapter, chapterIndex) => (
          <section className="life-chapter" aria-labelledby={`life-chapter-${chapterIndex + 1}`} key={chapter.title} data-reveal>
            <header className="life-chapter__intro">
              <h2 id={`life-chapter-${chapterIndex + 1}`}>{chapter.title}</h2>
              <p>{chapter.description}</p>
            </header>
            <div className="life-chapter__entries">
              {chapter.entries.map((entry) => (
                <article className="life-entry" id={entry.slug} key={entry.slug} data-reveal>
                  <figure>
                    {entry.video ? <AmbientVideo src={entry.video.src} poster={entry.video.poster} label={entry.alt} /> : <ResponsiveImage {...entry.media} sizes="(max-width: 768px) 100vw, 56vw" />}
                  </figure>
                  <div className="life-entry__copy">
                    <small>{entry.category}</small>
                    <h3>{entry.title}</h3>
                    <p>{entry.excerpt}</p>
                    {entry.sourceUrl ? <a href={entry.sourceUrl} target="_blank" rel="noreferrer">去{entry.sourcePlatform}看看 <MaterialIcon>open_in_new</MaterialIcon></a> : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="life-socials" aria-labelledby="life-socials-title" data-reveal>
        <h2 id="life-socials-title">更多记录</h2>
        <p>旅行、观后感和开发日记仍会继续更新。网站只选了一部分，其余留在抖音与小红书。</p>
        <div>
          {profile.socialLinks.filter((link) => link.platform === "douyin" || link.platform === "xiaohongshu").map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer" key={link.platform}>{link.label} <MaterialIcon>open_in_new</MaterialIcon></a>
          ))}
        </div>
      </section>
    </main>
  );
}
