import { useEffect, useRef } from "react";

const reactiveSelector = "[data-cosmic-reactive]";

type TrailPoint = {
  x: number;
  y: number;
  bornAt: number;
  width: number;
};

const trailLifetime = 520;
const trailSampleGap = 5;
const maxTrailPoints = 96;

export function CosmicPointerField() {
  const auraRef = useRef<HTMLSpanElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canvas = trailRef.current;
    const context = canvas?.getContext("2d");

    if (!finePointer.matches || reducedMotion.matches || !canvas || !context) {
      canvas?.setAttribute("data-motion", "static");
      return;
    }

    canvas.setAttribute("data-motion", "active");
    let interactionFrame = 0;
    let trailFrame = 0;
    let activeElement: HTMLElement | null = null;
    let latestEvent: PointerEvent | null = null;
    let previousPoint: { x: number; y: number; time: number } | null = null;
    let trailPoints: TrailPoint[] = [];
    let lastTrailMove = 0;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    const resizeCanvas = () => {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(viewportWidth * ratio);
      canvas.height = Math.round(viewportHeight * ratio);
      canvas.style.width = `${viewportWidth}px`;
      canvas.style.height = `${viewportHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      trailPoints = [];
      canvas.removeAttribute("data-visible");
    };

    const resetElement = (element: HTMLElement | null) => {
      if (!element) return;
      element.style.removeProperty("--cosmic-x");
      element.style.removeProperty("--cosmic-y");
      element.style.removeProperty("--cosmic-tilt-x");
      element.style.removeProperty("--cosmic-tilt-y");
      element.removeAttribute("data-cosmic-active");
    };

    const renderInteraction = () => {
      interactionFrame = 0;
      const event = latestEvent;
      if (!event) return;

      auraRef.current?.style.setProperty("--pointer-x", `${event.clientX}px`);
      auraRef.current?.style.setProperty("--pointer-y", `${event.clientY}px`);

      const nextElement = (event.target as Element | null)?.closest<HTMLElement>(reactiveSelector) ?? null;
      if (activeElement !== nextElement) resetElement(activeElement);
      activeElement = nextElement;
      if (!activeElement) return;

      const bounds = activeElement.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
      const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
      activeElement.style.setProperty("--cosmic-x", `${(x * 100).toFixed(2)}%`);
      activeElement.style.setProperty("--cosmic-y", `${(y * 100).toFixed(2)}%`);
      activeElement.style.setProperty("--cosmic-tilt-x", `${((0.5 - y) * 4).toFixed(2)}deg`);
      activeElement.style.setProperty("--cosmic-tilt-y", `${((x - 0.5) * 5).toFixed(2)}deg`);
      activeElement.setAttribute("data-cosmic-active", "true");
    };

    const traceTrail = (points: TrailPoint[]) => {
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (let index = 1; index < points.length - 1; index += 1) {
        const point = points[index];
        const next = points[index + 1];
        context.quadraticCurveTo(point.x, point.y, (point.x + next.x) / 2, (point.y + next.y) / 2);
      }
      const last = points[points.length - 1];
      context.quadraticCurveTo(last.x, last.y, last.x, last.y);
    };

    const renderTrail = (now: number) => {
      trailFrame = 0;
      context.clearRect(0, 0, viewportWidth, viewportHeight);
      trailPoints = trailPoints.filter((point) => now - point.bornAt < trailLifetime);
      const idleFade = Math.max(0, Math.min(1, 1 - (now - lastTrailMove) / 360));

      if (trailPoints.length > 1 && idleFade > 0.01) {
        const tail = trailPoints[0];
        const head = trailPoints[trailPoints.length - 1];
        const beforeHead = trailPoints[trailPoints.length - 2];
        const gradient = context.createLinearGradient(tail.x, tail.y, head.x, head.y);
        gradient.addColorStop(0, "rgba(91, 84, 212, 0)");
        gradient.addColorStop(0.34, `rgba(107, 105, 241, ${0.14 * idleFade})`);
        gradient.addColorStop(0.78, `rgba(132, 198, 255, ${0.58 * idleFade})`);
        gradient.addColorStop(1, `rgba(244, 249, 255, ${0.96 * idleFade})`);

        context.save();
        context.globalCompositeOperation = "lighter";
        context.lineCap = "round";
        context.lineJoin = "round";

        traceTrail(trailPoints);
        context.strokeStyle = gradient;
        context.lineWidth = head.width * 3.4;
        context.shadowColor = `rgba(113, 101, 255, ${0.52 * idleFade})`;
        context.shadowBlur = 18;
        context.globalAlpha = 0.34;
        context.stroke();

        traceTrail(trailPoints);
        context.lineWidth = head.width * 1.55;
        context.shadowColor = `rgba(137, 194, 255, ${0.7 * idleFade})`;
        context.shadowBlur = 11;
        context.globalAlpha = 0.78;
        context.stroke();

        traceTrail(trailPoints);
        context.lineWidth = Math.max(0.9, head.width * 0.42);
        context.shadowBlur = 4;
        context.globalAlpha = 1;
        context.stroke();

        const angle = Math.atan2(head.y - beforeHead.y, head.x - beforeHead.x);
        const flareLength = 12 + head.width * 3.5;
        const flare = context.createLinearGradient(-flareLength, 0, 4, 0);
        flare.addColorStop(0, "rgba(137, 126, 255, 0)");
        flare.addColorStop(0.72, `rgba(183, 224, 255, ${0.34 * idleFade})`);
        flare.addColorStop(1, `rgba(255, 255, 255, ${0.94 * idleFade})`);
        context.translate(head.x, head.y);
        context.rotate(angle);
        context.fillStyle = flare;
        context.shadowColor = `rgba(156, 211, 255, ${0.72 * idleFade})`;
        context.shadowBlur = 12;
        context.beginPath();
        context.moveTo(-flareLength, 0);
        context.quadraticCurveTo(-2, -head.width * 0.62, 4, 0);
        context.quadraticCurveTo(-2, head.width * 0.62, -flareLength, 0);
        context.fill();
        context.restore();
      }

      if (trailPoints.length > 1 && idleFade > 0.01) trailFrame = window.requestAnimationFrame(renderTrail);
      else {
        trailPoints = [];
        canvas.removeAttribute("data-visible");
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      latestEvent = event;
      if (!interactionFrame) interactionFrame = window.requestAnimationFrame(renderInteraction);

      const now = performance.now();
      if (previousPoint) {
        const distance = Math.hypot(event.clientX - previousPoint.x, event.clientY - previousPoint.y);
        if (distance > 0.75) {
          const elapsed = Math.max(8, now - previousPoint.time);
          const speed = distance / elapsed;
          const sampleCount = Math.min(32, Math.max(1, Math.ceil(distance / trailSampleGap)));
          const width = Math.min(3.3, 1.25 + speed * 0.85);
          for (let step = 1; step <= sampleCount; step += 1) {
            const progress = step / sampleCount;
            trailPoints.push({
              x: previousPoint.x + (event.clientX - previousPoint.x) * progress,
              y: previousPoint.y + (event.clientY - previousPoint.y) * progress,
              bornAt: now,
              width,
            });
          }
          trailPoints = trailPoints.slice(-maxTrailPoints);
          lastTrailMove = now;
          canvas.setAttribute("data-visible", "true");
          if (!trailFrame) trailFrame = window.requestAnimationFrame(renderTrail);
        }
      }
      previousPoint = { x: event.clientX, y: event.clientY, time: now };
    };

    const onPointerLeave = () => {
      latestEvent = null;
      previousPoint = null;
      resetElement(activeElement);
      activeElement = null;
      auraRef.current?.removeAttribute("data-visible");
    };

    const onPointerEnter = () => auraRef.current?.setAttribute("data-visible", "true");

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerenter", onPointerEnter);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    return () => {
      if (interactionFrame) window.cancelAnimationFrame(interactionFrame);
      if (trailFrame) window.cancelAnimationFrame(trailFrame);
      resetElement(activeElement);
      context.clearRect(0, 0, viewportWidth, viewportHeight);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerenter", onPointerEnter);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <>
      <span className="cosmic-pointer-aura" ref={auraRef} aria-hidden="true" />
      <canvas className="meteor-pointer-trail" ref={trailRef} aria-hidden="true" />
    </>
  );
}
