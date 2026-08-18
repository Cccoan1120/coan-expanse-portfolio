import { useEffect, useLayoutEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { SiteFooter } from "./components/SiteFooter";
import { SiteNav } from "./components/SiteNav";
import { WeChatDialog } from "./components/WeChatDialog";
import { CosmicPointerField } from "./components/CosmicPointerField";
import { ObservatoryShader } from "./components/ObservatoryShader";
import { RevealObserver } from "./components/RevealObserver";
import { ScrollProgress } from "./components/ScrollProgress";
import { lifeEntries } from "./content/life";
import { getProject, showcaseProjects } from "./content/projects";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

function LegacyLifeRedirect() {
  const location = useLocation();
  const requestedSlug = location.hash.slice(1);
  const targetHash = lifeEntries.some((entry) => entry.slug === requestedSlug) ? requestedSlug : "life";
  return <Navigate replace to={`/#${targetHash}`} />;
}

function LegacyProjectRedirect() {
  const { slug = "" } = useParams();
  if (!getProject(slug)) return <NotFoundPage />;
  const targetHash = showcaseProjects.some((project) => project.slug === slug) ? `project-${slug}` : "projects";
  return <Navigate replace to={`/#${targetHash}`} />;
}

export function App() {
  const [wechatOpen, setWechatOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const siteUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, "");
    const canonicalUrl = `${siteUrl}${location.pathname}`;
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;

    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = canonicalUrl;

    const ogImage = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    if (ogImage) ogImage.content = `${siteUrl}/og-image.png`;
  }, [location.pathname]);

  useLayoutEffect(() => {
    if (!location.hash) {
      const resetScroll = () => window.scrollTo(0, 0);
      resetScroll();
      const frame = window.requestAnimationFrame(resetScroll);
      const timer = window.setTimeout(resetScroll, 80);
      return () => {
        window.cancelAnimationFrame(frame);
        window.clearTimeout(timer);
      };
    }
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  return (
    <>
      <ObservatoryShader />
      <ScrollProgress />
      <CosmicPointerField />
      <RevealObserver />
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <SiteNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/life" element={<LegacyLifeRedirect />} />
        <Route path="/projects" element={<Navigate replace to="/#projects" />} />
        <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter onOpenWechat={() => setWechatOpen(true)} />
      <WeChatDialog open={wechatOpen} onClose={() => setWechatOpen(false)} />
    </>
  );
}
