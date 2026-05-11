"use client";

import React, { useEffect, useRef, useCallback } from "react";

export function NoiseFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simple pseudo-noise
  const noise = useCallback((x: number, y: number, t: number) => {
    return (
      Math.sin(x * 0.01 + t) * Math.cos(y * 0.008 + t * 0.7) +
      Math.sin((x + y) * 0.005 + t * 1.3) * 0.5
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, animId = 0, t = 0;

    const COLS = 40, ROWS = 30;
    interface Agent {
      x: number; y: number;
      hue: number;
    }
    const agents: Agent[] = Array.from({ length: 300 }, () => ({
      x: Math.random(),
      y: Math.random(),
      hue: Math.random() * 60 + 160,
    }));

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.008;
      ctx.fillStyle = "rgba(5,5,5,0.12)";
      ctx.fillRect(0, 0, w, h);

      agents.forEach((a) => {
        const angle = noise(a.x * w, a.y * h, t) * Math.PI * 4;
        a.x += Math.cos(angle) * 0.003;
        a.y += Math.sin(angle) * 0.003;

        if (a.x < 0) a.x = 1;
        if (a.x > 1) a.x = 0;
        if (a.y < 0) a.y = 1;
        if (a.y > 1) a.y = 0;

        const px = a.x * w, py = a.y * h;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${a.hue}, 80%, 70%, 0.7)`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [noise]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
