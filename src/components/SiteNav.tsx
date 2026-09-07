import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MaterialIcon } from "./MaterialIcon";

const navigation = [
  { label: "WORK", chinese: "作品", href: "/#projects", section: "projects" },
  { label: "LIFE", chinese: "生活", href: "/#life", section: "life" },
  { label: "ABOUT", chinese: "关于", href: "/#about", section: "about" },
  { label: "CONTACT", chinese: "联系", href: "/#contact", section: "contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
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
      const focusTarget = target.querySelector<HTMLElement>("h2") ?? target;
      if (!focusTarget.hasAttribute("tabindex")) {
        focusTarget.tabIndex = -1;
        focusTarget.addEventListener("blur", () => focusTarget.removeAttribute("tabindex"), { once: true });
      }
      focusTarget.focus({ preventScroll: true });
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

    const sections = ["home", ...sectionIds]
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
        if (visible?.target.id === "home") setActiveSection("");
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
    const trigger = triggerRef.current;
    const menu = menuRef.current;
    const header = trigger?.closest("header");
    const background = [
      ...Array.from(menu?.parentElement?.children ?? []).filter((element) => element !== menu && element !== header),
      ...Array.from(header?.children ?? []).filter((element) => element !== trigger),
    ].filter((element): element is HTMLElement => element instanceof HTMLElement);
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => { element.inert = true; });
    const frame = window.requestAnimationFrame(() => firstLinkRef.current?.focus());
    const close = (restoreFocus: boolean) => {
      setOpen(false);
      if (restoreFocus) window.requestAnimationFrame(() => triggerRef.current?.focus());
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
      }
      if (event.key !== "Tab") return;
      const controls = [trigger, ...Array.from(menu?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? [])]
        .filter((element): element is HTMLButtonElement | HTMLAnchorElement => Boolean(element));
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      if (event.target !== trigger && !menu?.contains(event.target as Node)) firstLinkRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 48.001rem)");
    const onViewportChange = () => {
      if (!desktop.matches) return;
      const hadMenuFocus = document.activeElement === trigger || menu?.contains(document.activeElement);
      setOpen(false);
      if (hadMenuFocus) window.requestAnimationFrame(() => header?.querySelector<HTMLAnchorElement>(".site-wordmark")?.focus());
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    desktop.addEventListener("change", onViewportChange);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      background.forEach((element, index) => { element.inert = previousInert[index]; });
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
      desktop.removeEventListener("change", onViewportChange);
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
          <img className="site-brand-mark" src="/images/brand/coan-expanse-mark.webp" alt="" width="64" height="64" />
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

      <div className="mobile-navigation" id="mobile-navigation" ref={menuRef} aria-hidden={!open}>
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
