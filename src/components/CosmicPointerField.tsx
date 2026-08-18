import { useEffect, useRef } from "react";

const reactiveSelector = "[data-cosmic-reactive]";

type TrailPoint = {
  x: number;
  y: number;
  life: number;
  width: number;
};

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

    const renderTrail = () => {
      trailFrame = 0;
      context.clearRect(0, 0, viewportWidth, viewportHeight);
      trailPoints = trailPoints
        .map((point) => ({ ...point, life: point.life - 0.045 }))
        .filter((point) => point.life > 0);

      if (trailPoints.length > 1) {
        context.save();
        context.globalCompositeOperation = "lighter";
        context.lineCap = "round";
        context.lineJoin = "round";

        for (let index = 1; index < trailPoints.length; index += 1) {
          const from = trailPoints[index - 1];
          const to = trailPoints[index];
          const gradient = context.createLinearGradient(from.x, from.y, to.x, to.y);
          gradient.addColorStop(0, `rgba(111, 91, 255, ${Math.max(0, from.life * 0.08)})`);
          gradient.addColorStop(0.6, `rgba(125, 193, 255, ${Math.max(0, to.life * 0.55)})`);
          gradient.addColorStop(1, `rgba(230, 242, 255, ${Math.max(0, to.life * 0.9)})`);
          context.strokeStyle = gradient;
          context.lineWidth = to.width * to.life;
          context.shadowColor = "rgba(137, 118, 255, 0.72)";
          context.shadowBlur = 12 * to.life;
          context.beginPath();
          context.moveTo(from.x, from.y);
          context.lineTo(to.x, to.y);
          context.stroke();
        }

        const head = trailPoints[trailPoints.length - 1];
        context.fillStyle = `rgba(238, 247, 255, ${head.life})`;
        context.shadowColor = "rgba(144, 127, 255, 0.9)";
        context.shadowBlur = 18;
        context.beginPath();
        context.arc(head.x, head.y, Math.max(1.2, head.width * 0.58), 0, Math.PI * 2);
        context.fill();
        context.restore();
      }

      if (trailPoints.length) trailFrame = window.requestAnimationFrame(renderTrail);
      else canvas.removeAttribute("data-visible");
    };

    const onPointerMove = (event: PointerEvent) => {
      latestEvent = event;
      if (!interactionFrame) interactionFrame = window.requestAnimationFrame(renderInteraction);

      const now = performance.now();
      if (previousPoint) {
        const distance = Math.hypot(event.clientX - previousPoint.x, event.clientY - previousPoint.y);
        if (distance > 2) {
          const elapsed = Math.max(8, now - previousPoint.time);
          const speed = distance / elapsed;
          trailPoints.push({ x: previousPoint.x, y: previousPoint.y, life: 0.72, width: 1.4 });
          trailPoints.push({ x: event.clientX, y: event.clientY, life: 1, width: Math.min(4.8, 1.8 + speed * 2.1) });
          trailPoints = trailPoints.slice(-28);
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
