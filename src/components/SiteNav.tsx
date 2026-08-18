import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MaterialIcon } from "./MaterialIcon";

const navigation = [
  { label: "WORK", chinese: "作品", href: "/#projects", section: "projects" },
  { label: "LIFE", chinese: "生活", href: "/#life", section: "life" },
  { label: "CONTACT", chinese: "联系", href: "/#contact", section: "contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const isActive = (section: string) => location.pathname === "/" && activeSection === section;

  const handleSectionNavigation = (event: ReactMouseEvent<HTMLAnchorElement>, section: string) => {
    event.preventDefault();
    setOpen(false);
    navigate({ pathname: "/", hash: `#${section}` });

    const scrollToTarget = () => {
      const target = document.getElementById(section);
      if (!target) return;
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      target.scrollIntoView({ behavior, block: "start" });
    };

    window.requestAnimationFrame(scrollToTarget);
    window.setTimeout(scrollToTarget, 60);
  };

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const sectionIds = navigation.map((item) => item.section);
    const hashSection = location.hash.slice(1);
    if (sectionIds.includes(hashSection as (typeof sectionIds)[number])) setActiveSection(hashSection);
    else setActiveSection("");

    const sections = ["home", ...sectionIds, "about"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY <= 2) {
          setActiveSection("");
          return;
        }
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id === "home" || visible?.target.id === "about") setActiveSection("");
        else if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-80px 0px -55% 0px", threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => firstLinkRef.current?.focus());
    const close = (restoreFocus: boolean) => {
      setOpen(false);
      if (restoreFocus) window.requestAnimationFrame(() => triggerRef.current?.focus());
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <Link
          className="site-wordmark"
          to="/"
          aria-label="霄汉无垠个人网站首页"
          onClick={() => {
            setActiveSection("");
            window.scrollTo(0, 0);
          }}
        >
          <img className="site-brand-mark" src="/images/brand/coan-expanse-mark.png" alt="" width="64" height="64" />
          <span className="site-wordmark__copy"><strong>霄汉无垠</strong><small>COAN EXPANSE</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="主要导航">
          {navigation.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              aria-current={isActive(item.section) ? "location" : undefined}
              onClick={(event) => handleSectionNavigation(event, item.section)}
            >
              <strong>{item.chinese}</strong><span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <button
          className="mobile-menu-button"
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "关闭导航" : "打开导航"}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? "关闭" : "菜单"}</span>
          <MaterialIcon>{open ? "close" : "menu"}</MaterialIcon>
        </button>
      </header>

      <div className="mobile-navigation" id="mobile-navigation" aria-hidden={!open}>
        <nav aria-label="移动端导航">
          {navigation.map((item, index) => (
            <Link
              ref={index === 0 ? firstLinkRef : undefined}
              to={item.href}
              key={item.label}
              tabIndex={open ? 0 : -1}
              onClick={(event) => handleSectionNavigation(event, item.section)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.chinese}</strong>
              <small>{item.label}</small>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
