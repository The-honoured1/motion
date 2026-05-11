"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Copy, Check, RotateCcw } from "lucide-react";

interface ParticleConfig {
  count: number;
  speed: number;
  size: number;
  color: string;
  gravity: number;
  spread: number;
  trailLength: number;
  mouseRepel: boolean;
}

const DEFAULT_CONFIG: ParticleConfig = {
  count: 200,
  speed: 1.5,
  size: 2,
  color: "#00f2ff",
  gravity: 0.05,
  spread: 3,
  trailLength: 10,
  mouseRepel: true,
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

function generateCode(config: ParticleConfig): string {
  return `// Particle System Configuration
const config = {
  count: ${config.count},
  speed: ${config.speed},
  size: ${config.size},
  color: "${config.color}",
  gravity: ${config.gravity},
  spread: ${config.spread},
  trailLength: ${config.trailLength},
  mouseRepel: ${config.mouseRepel},
};

function createParticle(canvas: HTMLCanvasElement): Particle {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * config.speed * config.spread,
    vy: (Math.random() - 0.5) * config.speed * config.spread,
    life: Math.random() * 100,
    maxLife: 100,
    size: Math.random() * config.size + 1,
  };
}

function update(particle: Particle, mouse: { x: number; y: number }) {
  if (config.mouseRepel) {
    const dx = particle.x - mouse.x;
    const dy = particle.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      particle.vx += (dx / dist) * 0.5;
      particle.vy += (dy / dist) * 0.5;
    }
  }
  particle.vy += config.gravity;
  particle.x += particle.vx;
  particle.y += particle.vy;
  particle.life -= 0.5;
}`;
}

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-white/60 font-medium">{label}</span>
        <span className="text-primary font-bold font-mono">{value}</span>
      </div>
      <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-primary rounded-full"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const configRef = useRef<ParticleConfig>(DEFAULT_CONFIG);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const [config, setConfig] = useState<ParticleConfig>(DEFAULT_CONFIG);
  const [copied, setCopied] = useState(false);

  const updateConfig = useCallback((partial: Partial<ParticleConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...partial };
      configRef.current = next;
      return next;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    canvas.addEventListener("mousemove", onMouseMove);

    // Init particles
    particlesRef.current = Array.from({ length: configRef.current.count }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * configRef.current.speed * configRef.current.spread,
      vy: (Math.random() - 0.5) * configRef.current.speed * configRef.current.spread,
      life: Math.random() * 100,
      maxLife: 100,
      size: Math.random() * configRef.current.size + 1,
    }));

    const animate = () => {
      const cfg = configRef.current;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.fillStyle = "rgba(5, 5, 5, 0.15)";
      ctx.fillRect(0, 0, w, h);

      // Sync particle count
      while (particlesRef.current.length < cfg.count) {
        particlesRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * cfg.speed * cfg.spread,
          vy: (Math.random() - 0.5) * cfg.speed * cfg.spread,
          life: 100,
          maxLife: 100,
          size: Math.random() * cfg.size + 1,
        });
      }
      if (particlesRef.current.length > cfg.count) {
        particlesRef.current.length = cfg.count;
      }

      particlesRef.current.forEach((p) => {
        if (cfg.mouseRepel) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 && dist > 0) {
            p.vx += (dx / dist) * 0.6;
            p.vy += (dy / dist) * 0.6;
          }
        }
        p.vy += cfg.gravity;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx * cfg.speed;
        p.y += p.vy * cfg.speed;
        p.life -= 0.5;

        if (p.life <= 0 || p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
          p.x = Math.random() * w;
          p.y = Math.random() * h;
          p.vx = (Math.random() - 0.5) * cfg.speed * cfg.spread;
          p.vy = (Math.random() - 0.5) * cfg.speed * cfg.spread;
          p.life = 100;
          p.size = Math.random() * cfg.size + 1;
        }

        const alpha = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          cfg.color +
          Math.round(alpha * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle =
          cfg.color +
          Math.round(alpha * 60)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(generateCode(config));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    updateConfig(DEFAULT_CONFIG);
  };

  return (
    <div className="pt-28 min-h-screen flex flex-col">
      <div className="px-6 max-w-7xl mx-auto w-full mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase">
            Playground
          </h1>
          <p className="text-white/60 text-xl max-w-xl">
            Tune the parameters. See it update live. Export your code.
          </p>
        </motion.div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-0 border-t border-white/10">
        {/* Canvas */}
        <div className="relative min-h-[400px] lg:min-h-0">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: "#050505" }}
          />
          <div className="absolute top-6 left-6 glass px-4 py-2 rounded-full text-xs font-bold text-primary uppercase tracking-widest pointer-events-none">
            Live Preview — Move Your Mouse
          </div>
        </div>

        {/* Controls Panel */}
        <div className="glass-dark border-l border-white/10 overflow-y-auto">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-bold text-lg">Controls</h2>
            <button
              onClick={reset}
              className="flex items-center gap-2 text-xs text-white/40 hover:text-primary transition-colors"
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          <div className="p-6 space-y-6">
            <SliderControl
              label="Particle Count"
              value={config.count}
              min={10}
              max={1000}
              step={10}
              onChange={(v) => updateConfig({ count: v })}
            />
            <SliderControl
              label="Speed"
              value={config.speed}
              min={0.1}
              max={5}
              step={0.1}
              onChange={(v) => updateConfig({ speed: v })}
            />
            <SliderControl
              label="Size"
              value={config.size}
              min={0.5}
              max={8}
              step={0.5}
              onChange={(v) => updateConfig({ size: v })}
            />
            <SliderControl
              label="Gravity"
              value={config.gravity}
              min={0}
              max={0.5}
              step={0.01}
              onChange={(v) => updateConfig({ gravity: v })}
            />
            <SliderControl
              label="Spread"
              value={config.spread}
              min={0.5}
              max={10}
              step={0.5}
              onChange={(v) => updateConfig({ spread: v })}
            />

            {/* Color */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-white/60 font-medium">Color</span>
                <span className="text-primary font-bold font-mono">{config.color}</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {["#00f2ff", "#7000ff", "#ff007a", "#00ff88", "#ff6600", "#ffffff"].map(
                  (c) => (
                    <button
                      key={c}
                      onClick={() => updateConfig({ color: c })}
                      className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                      style={{
                        background: c,
                        borderColor: config.color === c ? "#fff" : "transparent",
                      }}
                    />
                  )
                )}
                <input
                  type="color"
                  value={config.color}
                  onChange={(e) => updateConfig({ color: e.target.value })}
                  className="w-8 h-8 rounded-full cursor-pointer overflow-hidden border-0 bg-transparent"
                />
              </div>
            </div>

            {/* Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60 font-medium">Mouse Repel</span>
              <button
                onClick={() => updateConfig({ mouseRepel: !config.mouseRepel })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  config.mouseRepel ? "bg-primary" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    config.mouseRepel ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Generated Code */}
          <div className="border-t border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest">
                Generated Code
              </h3>
              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 text-xs text-white/60 hover:text-primary transition-colors"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="text-[10px] font-mono text-white/40 overflow-auto max-h-60 scrollbar-hide leading-relaxed">
              {generateCode(config)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
