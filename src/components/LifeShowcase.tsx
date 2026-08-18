import { lifeEntries } from "../content/life";
import type { LifeEntry } from "../types/content";
import { AmbientVideo } from "./AmbientVideo";
import { MaterialIcon } from "./MaterialIcon";
import { ResponsiveImage } from "./ResponsiveImage";

const chapters = [
  { title: "在路上", description: "喜欢往外走。去草原、爬山、攀岩，也在一次次出发里认识新的地方和新的人。", entries: lifeEntries.slice(0, 4) },
  { title: "长期输入", description: "播客、阅读、展演和现场喜剧。那些持续进入生活的声音，也在慢慢塑造我看事情的方式。", entries: lifeEntries.slice(4) },
] as const;

function LifeMedia({ entry }: { entry: LifeEntry }) {
  if (entry.video) {
    return <AmbientVideo src={entry.video.src} poster={entry.video.poster} label={entry.alt} />;
  }

  return <ResponsiveImage {...entry.media} sizes="(max-width: 767px) 92vw, 42vw" />;
}

export function LifeShowcase() {
  return (
    <section className="life-showcase cosmic-section page-shell" id="life" aria-labelledby="life-title">
      <header className="life-showcase__header" data-reveal>
        <h2 id="life-title">天地辽阔 好像怎么走都不会错</h2>
        <p>生活记录</p>
      </header>
      <div className="life-chapters">
        {chapters.map((chapter) => (
          <section className="life-chapter" aria-labelledby={`life-${chapter.title}`} key={chapter.title} data-reveal>
            <header>
              <h3 id={`life-${chapter.title}`}>{chapter.title}</h3>
              <p>{chapter.description}</p>
            </header>
            <div className="life-chapter__grid">
              {chapter.entries.map((entry) => (
                <article className="life-story-card" id={entry.slug} key={entry.slug}>
                  <figure><LifeMedia entry={entry} /></figure>
                  <div className="life-story-card__copy">
                    <h4>{entry.title}</h4>
                    <p>{entry.excerpt}</p>
                    {entry.sourceUrl ? (
                      <a href={entry.sourceUrl} target="_blank" rel="noreferrer">
                        {entry.sourceLabel ?? `去${entry.sourcePlatform}看看`}
                        <MaterialIcon>open_in_new</MaterialIcon>
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
