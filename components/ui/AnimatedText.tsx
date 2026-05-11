"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  variant?: "word" | "character" | "line";
  delay?: number;
  once?: boolean;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

const wordVariants = {
  hidden: { y: "110%", opacity: 0, rotateX: 40 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const charVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.03,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const lineVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function AnimatedText({
  text,
  className,
  variant = "word",
  delay = 0,
  once = true,
  tag: Tag = "p",
}: AnimatedTextProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });

  if (variant === "line") {
    return (
      <div ref={ref} className="overflow-hidden">
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay }}
        >
          <Tag className={className}>{text}</Tag>
        </motion.div>
      </div>
    );
  }

  if (variant === "character") {
    const chars = text.split("");
    return (
      <div ref={ref} aria-label={text}>
        <Tag className={cn("flex flex-wrap", className)}>
          {chars.map((char, i) => (
            <span key={i} className="overflow-hidden inline-block" style={{ whiteSpace: char === " " ? "pre" : "normal" }}>
              <motion.span
                custom={i + delay * 10}
                variants={charVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </span>
          ))}
        </Tag>
      </div>
    );
  }

  // Word variant (default)
  const words = text.split(" ");
  return (
    <div ref={ref} aria-label={text}>
      <Tag className={cn("flex flex-wrap gap-x-[0.3em]", className)}>
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              custom={i + delay * 5}
              variants={wordVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{ display: "inline-block", transformOrigin: "bottom" }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
