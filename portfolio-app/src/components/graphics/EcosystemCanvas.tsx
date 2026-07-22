"use client";

import { useEffect, useRef } from "react";

const SATELLITES = ["n8n", "MuleSoft", ".NET", "Agentforce", "Data Cloud", "Omni-Channel"];
const ACCENT: [number, number, number] = [91, 140, 255]; // rgb of tailwind `accent`

// Small 2D orbit diagram: satellites revolving around a "Salesforce" hub,
// with a traveling pulse per spoke. Freezes to a single frame under
// prefers-reduced-motion instead of animating.
export function EcosystemCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [ar, ag, ab] = ACCENT;
    const rgba = (a: number) => `rgba(${ar},${ag},${ab},${a})`;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let t = 0;

    const frame = () => {
      if (!reduced) t += 0.006;
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const R = Math.min(width, height) * 0.33;

      const nodes = SATELLITES.map((label, i) => {
        const angle = (i / SATELLITES.length) * Math.PI * 2 + t * 0.35;
        return {
          x: cx + Math.cos(angle) * R,
          y: cy + Math.sin(angle) * R * 0.92,
          label,
        };
      });

      nodes.forEach((n, i) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(n.x, n.y);
        ctx.strokeStyle = rgba(0.16);
        ctx.lineWidth = 1;
        ctx.stroke();

        const p = (t * 0.6 + i / SATELLITES.length) % 1;
        const px = cx + (n.x - cx) * p;
        const py = cy + (n.y - cy) * p;
        ctx.beginPath();
        ctx.arc(px, py, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = rgba(0.9);
        ctx.fill();
      });

      ctx.font = "500 12px Sora, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = rgba(0.85);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, 11, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(0.28);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = "rgba(200,212,232,0.72)";
        ctx.fillText(n.label, n.x, n.y + 24);
      });

      const pulse = 1 + Math.sin(t * 2) * 0.06;
      const grd = ctx.createRadialGradient(cx, cy, 2, cx, cy, 42 * pulse);
      grd.addColorStop(0, rgba(0.9));
      grd.addColorStop(0.55, rgba(0.28));
      grd.addColorStop(1, rgba(0));
      ctx.beginPath();
      ctx.arc(cx, cy, 42 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 26, 0, Math.PI * 2);
      ctx.fillStyle = "#0a1120";
      ctx.fill();
      ctx.strokeStyle = rgba(0.7);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.font = "700 13px Sora, sans-serif";
      ctx.fillStyle = "#eaf0fb";
      ctx.fillText("Salesforce", cx, cy);

      if (!reduced) raf = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="block h-full w-full" />;
}
