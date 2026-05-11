"use client";

import React, { useEffect, useRef } from "react";

export function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, animId = 0, t = 0;

    interface WaveParticle {
      x: number;
      baseY: number;
      size: number;
      speed: number;
      amp: number;
      phase: number;
      hue: number;
    }

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 120;
    const particles: WaveParticle[] = Array.from({ length: COUNT }, (_, i) => ({
      x: (i / COUNT) * w,
      baseY: h / 2,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.02 + 0.01,
      amp: Math.random() * 60 + 20,
      phase: (i / COUNT) * Math.PI * 2,
      hue: 160 + (i / COUNT) * 100,
    }));

    const draw = () => {
      t += 1;
      ctx.fillStyle = "rgba(5,5,5,0.2)";
      ctx.fillRect(0, 0, w, h);

      // Update x proportionally when canvas resizes
      particles.forEach((p, i) => {
        p.x = (i / COUNT) * w;
        const y = p.baseY + Math.sin(t * p.speed + p.phase) * p.amp;
        const grd = ctx.createRadialGradient(p.x, y, 0, p.x, y, p.size * 3);
        grd.addColorStop(0, `hsla(${p.hue}, 90%, 80%, 0.9)`);
        grd.addColorStop(1, `hsla(${p.hue}, 90%, 60%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

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
