"use client";

import React from "react";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  separator?: string;
  className?: string;
  itemClassName?: string;
}

export function Marquee({
  items,
  direction = "left",
  speed = 30,
  separator = "◆",
  className = "",
  itemClassName = "",
}: MarqueeProps) {
  const doubled = [...items, ...items, ...items, ...items];
  const animationClass =
    direction === "left" ? "marquee-track" : "marquee-track-reverse";

  return (
    <div
      className={`relative overflow-hidden py-4 ${className}`}
      style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}
    >
      <div
        className={`flex gap-0 whitespace-nowrap ${animationClass}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <span
              className={`text-sm font-bold uppercase tracking-[0.15em] text-white/50 px-6 ${itemClassName}`}
            >
              {item}
            </span>
            <span className="text-primary/40 text-xs self-center">{separator}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
