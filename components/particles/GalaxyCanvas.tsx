"use client";

import React, { useEffect, useRef } from "react";

export function GalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0;
    let animId = 0;
    let t = 0;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const ARMS = 3;
    const STARS_PER_ARM = 600;
    const TOTAL = ARMS * STARS_PER_ARM;

    const stars = Array.from({ length: TOTAL }, (_, i) => {
      const arm = i % ARMS;
      const t = (i / STARS_PER_ARM) * Math.PI * 4;
      const r = (t / (Math.PI * 4)) * 0.4 + 0.02;
      const offset = (arm / ARMS) * Math.PI * 2;
      const scatter = (Math.random() - 0.5) * 0.12;
      const angle = t + offset + scatter;
      return {
        angle,
        r: r + Math.random() * 0.04,
        speed: 0.0002 + Math.random() * 0.0001,
        size: Math.random() * 1.5 + 0.5,
        hue: 180 + Math.random() * 120,
      };
    });

    const draw = () => {
      t += 0.3;
      ctx.fillStyle = "rgba(5,5,5,0.15)";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2, cy = h / 2;
      const scale = Math.min(w, h) * 0.45;

      stars.forEach((s) => {
        s.angle += s.speed;
        const x = cx + Math.cos(s.angle) * s.r * scale;
        const y = cy + Math.sin(s.angle) * s.r * scale * 0.5;
        const alpha = Math.min(1, s.r * 4);

        ctx.beginPath();
        ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 80%, 80%, ${alpha})`;
        ctx.fill();
      });

      // Core glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 0.08);
      grd.addColorStop(0, "rgba(120,80,255,0.5)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, scale * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
