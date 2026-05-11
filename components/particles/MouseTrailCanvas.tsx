"use client";

import React, { useEffect, useRef } from "react";

export function MouseTrailCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, animId = 0;
    const mouse = { x: -999, y: -999 };

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface TrailParticle {
      x: number; y: number;
      vx: number; vy: number;
      life: number;
      hue: number;
      size: number;
    }
    let particles: TrailParticle[] = [];
    let hue = 180;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      hue = (hue + 1) % 360;
      for (let i = 0; i < 6; i++) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 10,
          y: mouse.y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3 - 1,
          life: 1,
          hue,
          size: Math.random() * 6 + 2,
        });
      }
    };

    canvas.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,5,0.18)";
      ctx.fillRect(0, 0, w, h);

      particles = particles.filter((p) => p.life > 0.01);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life *= 0.94;

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grd.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${p.life})`);
        grd.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      // Idle hint text
      if (mouse.x === -999) {
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.font = "14px monospace";
        ctx.textAlign = "center";
        ctx.fillText("Move your mouse here", w / 2, h / 2);
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
