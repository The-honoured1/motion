"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  variant?: "word" | "character";
  once?: boolean;
  delay?: number;
}

export function AnimatedText({ 
  text, 
  className, 
  variant = "word", 
  once = true,
  delay = 0 
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i + delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const words = text.split(" ");

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          className="mr-2"
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
