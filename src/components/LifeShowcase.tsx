import { lifeEntries } from "../content/life";
import type { LifeEntry } from "../types/content";
import { AmbientVideo } from "./AmbientVideo";
import { MaterialIcon } from "./MaterialIcon";
import { ResponsiveImage } from "./ResponsiveImage";

const chapters = [
  { id: "life-在路上", title: "在路上", description: "去草原、爬山、攀岩，看看新的地方，也认识新朋友。", entries: lifeEntries.slice(0, 4) },
  { id: "life-长期输入", title: "最近在听、在看", description: "听播客、读书，也去现场看展演和喜剧。", entries: lifeEntries.slice(4) },
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
          <section className="life-chapter" aria-labelledby={chapter.id} key={chapter.id} data-reveal>
            <header>
              <h3 id={chapter.id}>{chapter.title}</h3>
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
