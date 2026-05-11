"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  textStrength?: number;
}

export function MagneticButton({
  children,
  strength = 40,
  textStrength = 20,
  className,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    if (!button || !text) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(button, {
        x: x * (strength / 100),
        y: y * (strength / 100),
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.to(text, {
        x: x * (textStrength / 100),
        y: y * (textStrength / 100),
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to([button, text], {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, textStrength]);

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative px-8 py-3 rounded-full bg-white text-black font-bold flex items-center justify-center overflow-hidden group",
        className
      )}
      {...props}
    >
      <span ref={textRef} className="relative z-10 pointer-events-none">
        {children}
      </span>
      <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
    </button>
  );
}
