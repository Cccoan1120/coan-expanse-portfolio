import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const maximum = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maximum));
      progressRef.current?.style.setProperty("--scroll-progress", progress.toFixed(4));
      progressRef.current?.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      ref={progressRef}
      role="progressbar"
      aria-label="页面阅读进度"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    >
      <span />
    </div>
  );
}
