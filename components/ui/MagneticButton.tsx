"use client";

import React, { useRef, useCallback } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  textStrength?: number;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
  href?: string;
}

export function MagneticButton({
  children,
  strength = 40,
  textStrength = 20,
  className,
  variant = "primary",
  href,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef   = useRef<HTMLSpanElement>(null);
  const boundRef  = useRef<DOMRect | null>(null);

  const handleMouseEnter = useCallback(() => {
    boundRef.current = buttonRef.current!.getBoundingClientRect();
    gsap.to(buttonRef.current, { scale: 1.05, duration: 0.3, ease: "power2.out" });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!boundRef.current) return;
    const { left, top, width, height } = boundRef.current;
    const cx = left + width  / 2;
    const cy = top  + height / 2;
    const dx = (e.clientX - cx) / (width  / 2);
    const dy = (e.clientY - cy) / (height / 2);

    gsap.to(buttonRef.current, {
      x: dx * strength,
      y: dy * strength,
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(textRef.current, {
      x: dx * textStrength,
      y: dy * textStrength,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [strength, textStrength]);

  const handleMouseLeave = useCallback(() => {
    gsap.to(buttonRef.current, { x: 0, y: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" });
    gsap.to(textRef.current,   { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  }, []);

  const variantClasses = {
    primary: "bg-primary text-black font-bold hover:bg-primary/90 glow-primary",
    outline: "border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary",
    ghost:   "border border-white/10 text-white hover:bg-white/5",
  };

  const button = (
    <button
      ref={buttonRef}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden",
        "px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide",
        "transition-colors duration-200",
        variantClasses[variant],
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Shimmer overlay */}
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
        />
      </span>
      <span ref={textRef} className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );

  if (href) {
    return (
      <a href={href} style={{ display: "inline-block" }}>
        {button}
      </a>
    );
  }

  return button;
}
