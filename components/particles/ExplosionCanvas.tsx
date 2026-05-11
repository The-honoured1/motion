"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  hue: number;
}

export function ExplosionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, animId = 0;
    let particles: Particle[] = [];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const explode = (cx: number, cy: number) => {
      const count = 80 + Math.floor(Math.random() * 60);
      const baseHue = Math.random() * 360;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const speed = Math.random() * 8 + 2;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 3,
          size: Math.random() * 4 + 1,
          life: 1,
          maxLife: 1,
          hue: baseHue + Math.random() * 60,
        });
      }
    };

    // Auto-explode periodically
    const autoExplode = () => {
      explode(
        w * (0.2 + Math.random() * 0.6),
        h * (0.2 + Math.random() * 0.6)
      );
    };
    autoExplode();
    const interval = setInterval(autoExplode, 2000);

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      explode(e.clientX - rect.left, e.clientY - rect.top);
    };
    canvas.addEventListener("click", onClick);

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,5,0.25)";
      ctx.fillRect(0, 0, w, h);

      particles = particles.filter((p) => p.life > 0.02);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // gravity
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= 0.018;

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        grd.addColorStop(0, `hsla(${p.hue}, 100%, 80%, ${p.life})`);
        grd.addColorStop(1, `hsla(${p.hue}, 100%, 40%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      // Hint
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.fillText("Click anywhere to explode", w / 2, h - 20);

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(interval);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />;
}
