"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ChevronRight, BookOpen, Zap, Layers, Star } from "lucide-react";

interface Tutorial {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  concept: string;
  code: string;
  preview: React.ReactNode;
}

const TUTORIALS: Tutorial[] = [
  {
    id: "framer-fade",
    title: "Fade In with Framer Motion",
    level: "Beginner",
    description:
      "Learn how Framer Motion's declarative API lets you animate any element in just a few lines — no CSS keyframes needed.",
    concept:
      "Framer Motion uses the `motion` HOC to wrap any HTML element. `initial` defines the start state, `animate` the end state, and `transition` controls timing. The library interpolates between states automatically.",
    code: `import { motion } from "framer-motion";

export function FadeIn({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],  // easeOutExpo
      }}
    >
      {children}
    </motion.div>
  );
}`,
    preview: (
      <FadeInPreview />
    ),
  },
  {
    id: "stagger-list",
    title: "Stagger Children Animations",
    level: "Beginner",
    description:
      "Orchestrate multiple children to animate in sequence using Framer Motion's `staggerChildren` variant system.",
    concept:
      "Variants let you define named states (`hidden` / `visible`). When a parent animates, Framer Motion automatically propagates the animation to children with a configurable delay between each one.",
    code: `const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,  // 120ms between each child
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export function StaggerList({ items }) {
  return (
    <motion.ul variants={container} initial="hidden" animate="visible">
      {items.map((i) => (
        <motion.li key={i} variants={item}>{i}</motion.li>
      ))}
    </motion.ul>
  );
}`,
    preview: <StaggerPreview />,
  },
  {
    id: "scroll-reveal",
    title: "Scroll-Triggered Reveal",
    level: "Intermediate",
    description:
      "Use `useInView` to trigger animations exactly when an element enters the viewport — perfect for long-form pages.",
    concept:
      "The `useInView` hook returns a boolean that flips when the ref element crosses the viewport boundary. Combine with `useAnimation` to imperatively start complex sequences, or simply pass to `animate` for simple cases.",
    code: `import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function ScrollReveal({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,     // only trigger once
    amount: 0.3,    // 30% visible before trigger
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}`,
    preview: <ScrollPreview />,
  },
  {
    id: "gsap-magnetic",
    title: "Magnetic Buttons with GSAP",
    level: "Intermediate",
    description:
      "Create tactile magnetic hover effects using GSAP's `power2.out` easing and mouse proximity math.",
    concept:
      "Calculate the cursor distance from the button center on every `mousemove`. Scale that distance by a strength factor and use GSAP to animate the `x`/`y` transforms. On `mouseleave`, spring back with an elastic ease for a satisfying snap.",
    code: `import { useRef, useEffect } from "react";
import gsap from "gsap";

export function MagneticButton({ children, strength = 40 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const move = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = e.clientX - (left + width / 2);
      const y = e.clientY - (top + height / 2);
      gsap.to(el, {
        x: x * (strength / 100),
        y: y * (strength / 100),
        duration: 0.6,
        ease: "power2.out",
      });
    };
    const reset = () => {
      gsap.to(el, {
        x: 0, y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
      });
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
    };
  }, [strength]);

  return <button ref={ref}>{children}</button>;
}`,
    preview: <MagneticPreview />,
  },
  {
    id: "three-particles",
    title: "3D Particle Field with Three.js",
    level: "Advanced",
    description:
      "Render thousands of particles in a WebGL scene using buffer geometry, custom shaders, and React Three Fiber.",
    concept:
      "BufferGeometry stores particle positions as a flat Float32Array — this is crucial for performance since it lives directly on the GPU. Points material with `sizeAttenuation` makes particles appear smaller with distance, creating 3D depth. The `useFrame` hook gives you a RAF loop tied to React's lifecycle.",
    code: `import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 5000 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.05;
    ref.current.rotation.x = t * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#00f2ff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}`,
    preview: <ThreePreview />,
  },
];

// --- Sub-previews ---

function FadeInPreview() {
  const [key, setKey] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl font-bold text-primary"
        >
          Hello, World!
        </motion.div>
      </AnimatePresence>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="text-xs glass px-4 py-2 rounded-full hover:bg-primary hover:text-black transition-all"
      >
        Replay
      </button>
    </div>
  );
}

function StaggerPreview() {
  const [key, setKey] = useState(0);
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
  };
  const items = ["Particle", "System", "Motion", "Effect"];
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        key={key}
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex gap-3"
      >
        {items.map((label) => (
          <motion.span
            key={label}
            variants={item}
            className="px-3 py-1.5 glass rounded-lg text-sm font-bold text-primary border border-primary/20"
          >
            {label}
          </motion.span>
        ))}
      </motion.div>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="text-xs glass px-4 py-2 rounded-full hover:bg-primary hover:text-black transition-all"
      >
        Replay
      </button>
    </div>
  );
}

function ScrollPreview() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="h-10 glass rounded-lg flex items-center px-4 text-sm text-white/60"
        >
          Scroll element {i + 1}
        </motion.div>
      ))}
    </div>
  );
}

function MagneticPreview() {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 bg-primary text-black font-bold rounded-full text-sm"
      >
        Magnetic Button
      </motion.button>
    </div>
  );
}

function ThreePreview() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="text-4xl mb-2">✦</div>
        <p className="text-xs text-white/40 font-mono">WebGL Canvas</p>
        <p className="text-xs text-white/30">See ThreeJS page for live demo</p>
      </div>
    </div>
  );
}

// --- Level Badge ---
const levelColors = {
  Beginner: "text-green-400 border-green-400/30 bg-green-400/10",
  Intermediate: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  Advanced: "text-red-400 border-red-400/30 bg-red-400/10",
};

const levelIcons = {
  Beginner: <Zap size={10} />,
  Intermediate: <Layers size={10} />,
  Advanced: <Star size={10} />,
};

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] text-white/40 hover:text-primary transition-colors glass px-2 py-1 rounded-md"
      >
        {copied ? <Check size={10} /> : <Copy size={10} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="text-[11px] font-mono text-white/70 overflow-auto max-h-72 p-5 leading-relaxed scrollbar-hide">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function LearnPage() {
  const [active, setActive] = useState(TUTORIALS[0].id);
  const tutorial = TUTORIALS.find((t) => t.id === active)!;

  return (
    <div className="pt-28 min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside className="glass-dark border-r border-white/10 p-6 flex flex-col gap-2 overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen size={18} className="text-primary" />
          <h1 className="text-lg font-bold">Learn</h1>
        </div>
        {TUTORIALS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`text-left px-4 py-3 rounded-xl transition-all flex items-start gap-3 group ${
              active === t.id
                ? "bg-primary/10 border border-primary/20 text-primary"
                : "hover:bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            <ChevronRight
              size={14}
              className={`mt-0.5 shrink-0 transition-transform ${
                active === t.id ? "translate-x-1" : "group-hover:translate-x-0.5"
              }`}
            />
            <div>
              <p className="text-sm font-medium leading-snug">{t.title}</p>
              <span
                className={`inline-flex items-center gap-1 mt-1.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${levelColors[t.level]}`}
              >
                {levelIcons[t.level]} {t.level}
              </span>
            </div>
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="p-8 md:p-12 overflow-y-auto"
        >
          <div className="max-w-3xl mx-auto space-y-10">
            {/* Header */}
            <div>
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border mb-4 ${levelColors[tutorial.level]}`}
              >
                {levelIcons[tutorial.level]} {tutorial.level}
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-4">{tutorial.title}</h2>
              <p className="text-white/60 text-lg leading-relaxed">{tutorial.description}</p>
            </div>

            {/* Live Preview */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">
                Live Preview
              </p>
              <div className="glass rounded-2xl p-10 min-h-40 flex items-center justify-center border border-white/5">
                {tutorial.preview}
              </div>
            </div>

            {/* Concept */}
            <div className="glass rounded-2xl p-6 border border-primary/10">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                How It Works
              </p>
              <p className="text-white/70 leading-relaxed">{tutorial.concept}</p>
            </div>

            {/* Code */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">
                Source Code
              </p>
              <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                <CodeBlock code={tutorial.code} />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
