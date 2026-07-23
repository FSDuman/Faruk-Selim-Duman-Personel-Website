"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/lib/theme-context";

interface ThrowConfig {
  key: string;
  src: string;
  alt: string;
  xPct: number;
  yPct: number;
  width: number;
}

const CONFIGS: ThrowConfig[] = [
  { key: "star", src: "/images/star.png", alt: "Draggable star object", xPct: 72, yPct: 11, width: 190 },
  { key: "bolt", src: "/images/bolt.png", alt: "Draggable lightning bolt object", xPct: 6, yPct: 52, width: 150 },
];

const MAX_SPEED = 60;

interface Item {
  el: HTMLImageElement;
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  ang: number;
  va: number;
  dragging: boolean;
  grabX: number;
  grabY: number;
}

// Draggable star + lightning-bolt easter egg floating over the hero and skill
// marquee. Grab, throw with inertia, bounce off the region's edges, settle —
// ported from the design comp's pointer-drag physics. Renders statically
// (no drag, no rAF loop) under prefers-reduced-motion.
export function Throwables({
  boundsRef,
}: {
  boundsRef: React.RefObject<HTMLElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const reduced = useReducedMotion();
  const { theme } = useTheme();
  const filter = `${theme === "dark" ? "invert(1) " : ""}drop-shadow(0 24px 34px rgba(0,0,0,0.28))`;

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    const strip = boundsRef.current;
    const els = imgRefs.current.filter((el): el is HTMLImageElement => el !== null);
    if (!container || !strip || els.length !== CONFIGS.length) return;

    const setRegionHeight = () => {
      container.style.height = `${strip.offsetTop + strip.offsetHeight}px`;
    };
    setRegionHeight();

    const getBounds = () => ({ w: container.clientWidth, h: container.clientHeight });

    const applyTransform = (item: Item) => {
      item.el.style.transform = `translate(${item.x}px, ${item.y}px) rotate(${item.ang}deg)`;
    };

    const clamp = (item: Item) => {
      const b = getBounds();
      item.x = Math.max(0, Math.min(item.x, b.w - item.w));
      item.y = Math.max(0, Math.min(item.y, b.h - item.h));
      applyTransform(item);
    };

    const items: Item[] = els.map((el, i) => {
      const cfg = CONFIGS[i];
      const b = getBounds();
      const rect = el.getBoundingClientRect();
      return {
        el,
        x: (cfg.xPct / 100) * b.w,
        y: (cfg.yPct / 100) * b.h,
        w: rect.width || cfg.width,
        h: rect.height || cfg.width,
        vx: 0,
        vy: 0,
        ang: Math.random() * 24 - 12,
        va: 0,
        dragging: false,
        grabX: 0,
        grabY: 0,
      };
    });

    // Wait for real image dimensions before clamping into bounds.
    items.forEach((item) => {
      const update = () => {
        const rect = item.el.getBoundingClientRect();
        if (rect.width) item.w = rect.width;
        if (rect.height) item.h = rect.height;
        clamp(item);
      };
      if (item.el.complete) update();
      else item.el.addEventListener("load", update, { once: true });
    });
    items.forEach(clamp);

    const localPoint = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const cleanups: Array<() => void> = [];
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    let moved = false;

    items.forEach((item) => {
      const el = item.el;

      const onPointerDown = (e: PointerEvent) => {
        item.dragging = true;
        moved = false;
        try {
          el.setPointerCapture(e.pointerId);
        } catch {
          // best-effort — some pointer types don't support capture
        }
        el.style.cursor = "grabbing";
        item.vx = 0;
        item.vy = 0;
        const p = localPoint(e);
        lastX = p.x;
        lastY = p.y;
        lastT = performance.now();
        item.grabX = p.x - item.x;
        item.grabY = p.y - item.y;
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!item.dragging) return;
        const now = performance.now();
        const dt = Math.max(now - lastT, 1);
        const p = localPoint(e);
        const nx = p.x - item.grabX;
        const ny = p.y - item.grabY;
        item.vx = ((nx - item.x) / dt) * 16;
        item.vy = ((ny - item.y) / dt) * 16;
        if (Math.abs(p.x - lastX) + Math.abs(p.y - lastY) > 3) moved = true;
        item.x = nx;
        item.y = ny;
        item.va = item.vx * 0.4;
        lastX = p.x;
        lastY = p.y;
        lastT = now;
        applyTransform(item);
      };

      const release = () => {
        if (!item.dragging) return;
        item.dragging = false;
        el.style.cursor = "grab";
        if (!moved) {
          item.va += (Math.random() > 0.5 ? 1 : -1) * 12;
          item.vx += Math.random() * 8 - 4;
          item.vy -= 6;
        }
        item.vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, item.vx));
        item.vy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, item.vy));
      };

      el.addEventListener("pointerdown", onPointerDown);
      el.addEventListener("pointermove", onPointerMove);
      el.addEventListener("pointerup", release);
      el.addEventListener("pointercancel", release);

      cleanups.push(() => {
        el.removeEventListener("pointerdown", onPointerDown);
        el.removeEventListener("pointermove", onPointerMove);
        el.removeEventListener("pointerup", release);
        el.removeEventListener("pointercancel", release);
      });
    });

    let raf = 0;
    const step = () => {
      const b = getBounds();
      items.forEach((item) => {
        if (item.dragging) return;
        item.x += item.vx;
        item.y += item.vy;
        item.vx *= 0.99;
        item.vy *= 0.99;
        item.va *= 0.97;
        item.ang += item.va;

        if (item.x < 0) {
          item.x = 0;
          item.vx = Math.abs(item.vx) * 0.7;
          item.va *= -0.6;
        }
        if (item.x > b.w - item.w) {
          item.x = b.w - item.w;
          item.vx = -Math.abs(item.vx) * 0.7;
          item.va *= -0.6;
        }
        if (item.y < 0) {
          item.y = 0;
          item.vy = Math.abs(item.vy) * 0.7;
        }
        if (item.y > b.h - item.h) {
          item.y = b.h - item.h;
          item.vy = -Math.abs(item.vy) * 0.7;
          item.vx *= 0.92;
        }
        if (Math.abs(item.vx) < 0.05 && Math.abs(item.vy) < 0.05 && Math.abs(item.va) < 0.02) {
          item.vx = 0;
          item.vy = 0;
          item.va = 0;
        }
        applyTransform(item);
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onResize = () => {
      setRegionHeight();
      const b = getBounds();
      items.forEach((item) => {
        item.x = Math.min(item.x, b.w - item.w);
        item.y = Math.min(item.y, b.h - item.h);
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      cleanups.forEach((fn) => fn());
    };
  }, [reduced, boundsRef]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-40 overflow-hidden"
    >
      {CONFIGS.map((cfg, i) => (
        <img
          key={cfg.key}
          ref={(el) => {
            imgRefs.current[i] = el;
          }}
          src={cfg.src}
          alt={cfg.alt}
          draggable={false}
          style={
            reduced
              ? {
                  position: "absolute",
                  top: `${cfg.yPct}%`,
                  left: `${cfg.xPct}%`,
                  width: cfg.width,
                  height: "auto",
                  filter,
                  pointerEvents: "none",
                }
              : {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: cfg.width,
                  height: "auto",
                  filter,
                  willChange: "transform",
                  pointerEvents: "auto",
                  cursor: "grab",
                  userSelect: "none",
                  touchAction: "none",
                }
          }
        />
      ))}
    </div>
  );
}
