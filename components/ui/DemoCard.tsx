"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DemoCardProps {
  title: string;
  description: string;
  category: string;
  href?: string;
  tags?: string[];
  accent?: "primary" | "secondary" | "accent";
  delay?: number;
}

const accentColors = {
  primary:   { border: "rgba(0,229,255,0.2)",  glow: "rgba(0,229,255,0.1)",  text: "text-primary",   badge: "bg-primary/10 text-primary border-primary/20" },
  secondary: { border: "rgba(139,0,255,0.2)", glow: "rgba(139,0,255,0.1)", text: "text-secondary", badge: "bg-secondary/10 text-secondary border-secondary/20" },
  accent:    { border: "rgba(255,0,98,0.2)",  glow: "rgba(255,0,98,0.1)",  text: "text-accent",    badge: "bg-accent/10 text-accent border-accent/20" },
};

export function DemoCard({
  title,
  description,
  category,
  href = "#",
  tags = [],
  accent = "primary",
  delay = 0,
}: DemoCardProps) {
  const colors = accentColors[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={href} className="block group">
        <div
          className="relative glass rounded-3xl p-8 overflow-hidden transition-all duration-500 hover-lift"
          style={{ borderColor: colors.border }}
        >
          {/* Background glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
            style={{ background: `radial-gradient(circle at 50% 0%, ${colors.glow}, transparent 70%)` }}
          />

          {/* Scan line */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-0 group-hover:opacity-100">
            <div className="scan-line" />
          </div>

          {/* Category badge */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <span className={cn("text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border", colors.badge)}>
              {category}
            </span>
            <motion.div
              className={cn("w-8 h-8 rounded-full glass flex items-center justify-center", colors.text)}
              whileHover={{ scale: 1.2, rotate: 45 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowUpRight size={14} />
            </motion.div>
          </div>

          {/* Preview Area */}
          <div className="h-36 relative mb-6 rounded-2xl overflow-hidden bg-black/30">
            {/* Animated preview visual */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-16 h-16 rounded-full"
                style={{ background: `radial-gradient(circle, ${colors.glow.replace("0.1", "0.6")}, transparent)` }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            {/* Corner dots */}
            {[0,1,2,3].map(i => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: colors.glow.replace("0.1", "0.8"),
                  top:    i < 2 ? 8 : undefined,
                  bottom: i >= 2 ? 8 : undefined,
                  left:   i % 2 === 0 ? 8 : undefined,
                  right:  i % 2 === 1 ? 8 : undefined,
                }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{title}</h3>
            <p className="text-sm text-white/50 leading-relaxed mb-4">{description}</p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono text-white/30 bg-white/5 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
