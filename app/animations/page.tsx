"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function AnimationsPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase">Animations</h1>
        <p className="text-xl text-white/60 max-w-2xl">
          The art of movement. From micro-interactions to complex scroll orchestrations, explore the principles that make interfaces feel alive.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="glass p-10 rounded-3xl">
          <h2 className="text-2xl font-bold mb-6 text-primary">Text Reveal</h2>
          <div className="mb-8 h-32 flex items-center">
             <AnimatedText 
               text="This text reveals itself word by word with a spring-based physics animation."
               className="text-2xl font-medium"
             />
          </div>
          <button className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-primary transition-colors">
            Trigger Animation
          </button>
        </section>

        <section className="glass p-10 rounded-3xl">
          <h2 className="text-2xl font-bold mb-6 text-primary">Magnetic Physics</h2>
          <div className="mb-8 h-32 flex items-center justify-center">
             <MagneticButton strength={50} textStrength={30}>
               Hover Me
             </MagneticButton>
          </div>
          <p className="text-sm text-white/40 italic">
            Uses GSAP to calculate mouse proximity and apply elastic movement.
          </p>
        </section>

        <section className="glass p-10 rounded-3xl">
          <h2 className="text-2xl font-bold mb-6 text-primary">Stagger List</h2>
          <div className="flex flex-col gap-3">
             {[1, 2, 3, 4].map((i) => (
               <motion.div 
                 key={i}
                 initial={{ x: -20, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 transition={{ delay: i * 0.1 }}
                 className="p-4 glass rounded-xl border border-white/5 flex items-center justify-between"
               >
                 <span>Item {i}</span>
                 <div className="w-2 h-2 bg-primary rounded-full" />
               </motion.div>
             ))}
          </div>
        </section>

        <section className="glass p-10 rounded-3xl">
          <h2 className="text-2xl font-bold mb-6 text-primary">Morphing Card</h2>
          <motion.div 
            whileHover={{ scale: 1.05, borderRadius: "40px" }}
            className="w-full h-32 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center cursor-pointer"
          >
            <span className="font-bold text-black">HOVER TO MORPH</span>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
