"use client";

import React from "react";
import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/motion/ParticleBackground";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-4"
        >
          <span className="px-4 py-1.5 rounded-full glass text-xs font-bold tracking-widest text-primary uppercase glow-primary">
            Future of Web Animation
          </span>
        </motion.div>

        <motion.h1 
          className="text-[12vw] md:text-[10vw] font-black leading-none tracking-tighter mb-6 text-glow"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          MOTION
        </motion.h1>

        <div className="max-w-2xl mx-auto mb-10">
          <AnimatedText 
            text="Cinematic interactive experiences crafted with precision. Push the boundaries of the modern web with advanced particle systems and motion effects."
            className="text-lg md:text-xl text-white/60 justify-center"
            delay={0.5}
          />
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton className="px-10 py-4 text-lg">
            Explore Demos
          </MagneticButton>
          <button className="px-10 py-4 text-lg font-bold border border-white/20 rounded-full hover:bg-white/10 transition-colors">
            Start Learning
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-primary" />
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />
    </section>
  );
}
