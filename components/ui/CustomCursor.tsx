"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [trailDots, setTrailDots] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailIdRef = useRef(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const outerSpringConfig = { damping: 15, stiffness: 100, mass: 1 };
  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      // Trail dots
      const id = trailIdRef.current++;
      setTrailDots(prev => [...prev.slice(-6), { x: e.clientX, y: e.clientY, id }]);
    };
    const handleDown  = () => setClicking(true);
    const handleUp    = () => setClicking(false);
    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!(target.closest("a") ||
          target.closest("button") ||
          target.getAttribute("data-cursor-hover"))
      );
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <>
      {/* Trail */}
      {trailDots.map((dot, i) => (
        <div
          key={dot.id}
          className="fixed pointer-events-none z-[9997] rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            width: (i + 1) * 2,
            height: (i + 1) * 2,
            backgroundColor: `rgba(0, 229, 255, ${(i / trailDots.length) * 0.2})`,
            transform: "translate(-50%, -50%)",
            transition: "opacity 0.3s",
          }}
        />
      ))}

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border border-primary/40"
        style={{
          left: outerX,
          top: outerY,
          width: hovering ? 60 : clicking ? 30 : 40,
          height: hovering ? 60 : clicking ? 30 : 40,
          x: hovering ? -30 : clicking ? -15 : -20,
          y: hovering ? -30 : clicking ? -15 : -20,
          backdropFilter: "blur(2px)",
          boxShadow: hovering ? "0 0 20px rgba(0,229,255,0.3)" : "none",
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          left: cursorX,
          top: cursorY,
          x: -4,
          y: -4,
          width: clicking ? 6 : 8,
          height: clicking ? 6 : 8,
          background: hovering
            ? "rgba(0, 229, 255, 0.9)"
            : "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 0 10px rgba(0, 229, 255, 0.6)",
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
