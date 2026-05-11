"use client";

import React from "react";
import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}

export function Marquee({ items, direction = "left", speed = 20 }: MarqueeProps) {
  return (
    <div className="relative flex overflow-x-hidden border-y border-white/10 bg-white/5 py-10">
      <motion.div
        animate={{
          x: direction === "left" ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex whitespace-nowrap"
      >
        {[...items, ...items, ...items].map((item, index) => (
          <span
            key={index}
            className="text-6xl md:text-8xl font-black mx-10 text-transparent stroke-text uppercase tracking-tighter"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
