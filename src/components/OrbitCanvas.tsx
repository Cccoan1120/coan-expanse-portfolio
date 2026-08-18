import { useEffect, useMemo, useRef } from "react";
import { featuredProjects } from "../content/projects";
import { ResponsiveImage } from "./ResponsiveImage";

interface OrbitCanvasProps {
  reducedMotion?: boolean;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  depth: number;
  tone: "cold" | "warm" | "neutral";
}

function seededStars(count: number): Star[] {
  let seed = 11202026;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  return Array.from({ length: count }, (_, index) => {
    const depth = index % 3;
    const temperature = random();
    return {
      x: random(),
      y: random(),
      radius: 0.4 + random() * (depth + 1) * 0.64,
      alpha: 0.24 + random() * 0.56,
      depth,
      tone: temperature > 0.84 ? "warm" : temperature < 0.3 ? "cold" : "neutral",
    };
  });
}

export function OrbitCanvas({ reducedMotion = false }: OrbitCanvasProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const coordinatesRef = useRef<HTMLParagraphElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const stars = useMemo(() => seededStars(116), []);
  const connections = useMemo(() => {
    const pairs: Array<[number, number]> = [];
    for (let first = 0; first < stars.length && pairs.length < 72; first += 1) {
      for (let second = first + 1; second < stars.length && pairs.length < 72; second += 1) {
        const x = stars[first].x - stars[second].x;
        const y = stars[first].y - stars[second].y;
        if (Math.hypot(x, y) < 0.105 && stars[first].depth === stars[second].depth) pairs.push([first, second]);
      }
    }
    return pairs;
  }, [stars]);

  useEffect(() => {
    const coordinates = coordinatesRef.current;
    if (!coordinates) return;
    let frame = 0;
    const update = () => {
      const altitude = Math.min(999, Math.round(window.scrollY / 12));
      coordinates.textContent = `RA 10:36:59 · DEC −58:37:00 · ALT ${String(altitude).padStart(3, "0")}`;
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const canvas = canvasRef.current;
    if (!map || !canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let phase = 0;
    let inView = true;
    let documentVisible = !document.hidden;
    const styles = window.getComputedStyle(canvas);
    const colors = {
      line: styles.getPropertyValue("--color-orbit-faint").trim(),
      blue: styles.getPropertyValue("--color-orbit-blue").trim(),
      amber: styles.getPropertyValue("--color-orbit-amber").trim(),
      neutral: styles.getPropertyValue("--color-orbit-star").trim(),
      cold: styles.getPropertyValue("--color-star-cold").trim(),
      warm: styles.getPropertyValue("--color-star-warm").trim(),
    };

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const driftX = reducedMotion ? 0 : pointerRef.current.x * 3.5;
      const driftY = reducedMotion ? 0 : pointerRef.current.y * 3.5;

      context.lineWidth = 0.75;
      context.strokeStyle = colors.line;
      connections.forEach(([first, second]) => {
        const a = stars[first];
        const b = stars[second];
        const depth = (a.depth + 1) / 3;
        context.globalAlpha = 0.12 + depth * 0.16;
        context.beginPath();
        context.moveTo(a.x * width + driftX * depth, a.y * height + driftY * depth);
        context.lineTo(b.x * width + driftX * depth, b.y * height + driftY * depth);
        context.stroke();
      });

      stars.forEach((star, index) => {
        const depth = (star.depth + 1) / 3;
        const pulse = reducedMotion ? 1 : 0.92 + Math.sin(phase + index * 0.37) * 0.08;
        context.globalAlpha = star.alpha * pulse;
        context.fillStyle = colors[star.tone];
        context.beginPath();
        context.arc(star.x * width + driftX * depth, star.y * height + driftY * depth, star.radius, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;

      const targets = [
        [0.17, 0.31, colors.amber],
        [0.79, 0.22, colors.blue],
        [0.68, 0.69, colors.neutral],
        [0.29, 0.74, colors.blue],
        [0.87, 0.52, colors.amber],
      ] as const;
      context.setLineDash([2, 7]);
      context.lineWidth = 1;
      targets.forEach(([x, y, color], index) => {
        const next = targets[(index + 1) % targets.length];
        context.strokeStyle = colors.line;
        context.beginPath();
        context.moveTo(x * width, y * height);
        context.lineTo(next[0] * width, next[1] * height);
        context.stroke();
        context.strokeStyle = color;
        context.beginPath();
        context.arc(x * width, y * height, 5 + (index % 2), 0, Math.PI * 2);
        context.moveTo(x * width - 11, y * height);
        context.lineTo(x * width - 7, y * height);
        context.moveTo(x * width + 7, y * height);
        context.lineTo(x * width + 11, y * height);
        context.stroke();
      });
      context.setLineDash([]);
    };

    const loop = () => {
      draw();
      phase += 0.012;
      if (!reducedMotion && inView && documentVisible) frame = window.requestAnimationFrame(loop);
    };
    const restart = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      if (!reducedMotion && inView && documentVisible) frame = window.requestAnimationFrame(loop);
      else draw();
    };
    const onPointerMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      pointerRef.current = { x: (event.clientX - box.left) / box.width - 0.5, y: (event.clientY - box.top) / box.height - 0.5 };
    };
    const onPointerLeave = () => {
      pointerRef.current = { x: 0, y: 0 };
    };
    const onVisibilityChange = () => {
      documentVisible = !document.hidden;
      restart();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      restart();
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      restart();
    });
    resizeObserver.observe(canvas);
    visibilityObserver.observe(map);
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (!reducedMotion) {
      canvas.addEventListener("pointermove", onPointerMove, { passive: true });
      canvas.addEventListener("pointerleave", onPointerLeave, { passive: true });
    }
    resize();
    restart();

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      window.cancelAnimationFrame(frame);
    };
  }, [connections, reducedMotion, stars]);

  return (
    <div ref={mapRef} className="orbit-map orbit-map--constellation" aria-label="五个精选项目组成的星座导航" data-motion={reducedMotion ? "static" : "ambient"}>
      <canvas ref={canvasRef} aria-hidden="true" />
      {featuredProjects.map((project) => (
        <a
          className={`orbit-node orbit-node--featured-${project.featuredRank}`}
          href={`#project-${project.slug}`}
          aria-label={`前往精选项目 ${project.featuredRank}：${project.title}`}
          key={project.slug}
        >
          <span className="orbit-node__target" aria-hidden="true" />
          <small>OBS-{String(project.featuredRank).padStart(2, "0")}</small>
          <strong>{project.title}</strong>
        </a>
      ))}
      <figure className="orbit-portrait">
        <span>ARCHIVE / 00</span>
        <ResponsiveImage base="/images/profile/portrait" alt="陈宵瀚在红墙前的个人照片" sizes="(max-width: 768px) 24vw, 9vw" eager />
        <figcaption>CHEN XIAOHAN · BEIJING</figcaption>
      </figure>
      <p ref={coordinatesRef} className="orbit-coordinates" aria-hidden="true">RA 10:36:59 · DEC −58:37:00 · ALT 000</p>
    </div>
  );
}
