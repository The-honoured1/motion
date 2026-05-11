"use client";

import React from "react";
import { Hero } from "@/components/motion/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { DemoCard } from "@/components/ui/DemoCard";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";

const featuredDemos = [
  {
    title: "Galaxy Particles",
    description: "Highly performant 3D particle system simulating a spiral galaxy with thousands of points.",
    category: "Particles",
  },
  {
    title: "Morphing Geometry",
    description: "Fluid transitions between complex 3D shapes using Three.js and GSAP Morph.",
    category: "ThreeJS",
  },
  {
    title: "Staggered Reveal",
    description: "Elegant text and image reveal animations with physics-based stagger effects.",
    category: "Animations",
  },
  {
    title: "Noise Field",
    description: "Interactive flow field visualization reacting to mouse position and frequency.",
    category: "Particles",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      
      <Marquee 
        items={["Interactive", "Cinematic", "Futuristic", "Experimental", "Fluid"]} 
        speed={30}
      />

      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="mb-16">
          <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
            The Gallery
          </span>
          <AnimatedText 
            text="Explore the boundaries of what's possible on the web."
            className="text-4xl md:text-6xl font-bold max-w-3xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredDemos.map((demo, index) => (
            <motion.div
              key={demo.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <DemoCard {...demo} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 glass-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Create without <span className="text-primary">limits</span>.
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Our playground gives you direct access to the parameters that drive our high-performance animations. Experiment, tweak, and export production-ready code.
            </p>
            <div className="flex gap-4">
               <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">60FPS</span>
                  <span className="text-xs text-white/40 uppercase">Performance</span>
               </div>
               <div className="w-px h-12 bg-white/10" />
               <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">10k+</span>
                  <span className="text-xs text-white/40 uppercase">Particles</span>
               </div>
               <div className="w-px h-12 bg-white/10" />
               <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">0ms</span>
                  <span className="text-xs text-white/40 uppercase">Latency</span>
               </div>
            </div>
          </div>
          <div className="relative aspect-square glass rounded-3xl overflow-hidden flex items-center justify-center group">
            <motion.div 
              className="w-48 h-48 bg-primary rounded-full blur-[100px] absolute"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative z-10 text-center">
               <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Live Editor</p>
               <div className="p-4 glass rounded-xl text-left font-mono text-xs text-white/60 w-64">
                 <p><span className="text-purple-400">const</span> <span className="text-blue-400">particles</span> = <span className="text-yellow-400">10000</span>;</p>
                 <p><span className="text-purple-400">const</span> <span className="text-blue-400">speed</span> = <span className="text-yellow-400">0.5</span>;</p>
                 <p><span className="text-purple-400">const</span> <span className="text-blue-400">color</span> = <span className="text-green-400">"#00f2ff"</span>;</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 text-center px-6">
        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">READY TO <span className="text-primary italic">MOVE?</span></h2>
        <button className="glass px-12 py-5 rounded-full text-xl font-bold hover:bg-primary hover:text-black transition-all glow-primary">
          Enter The Playground
        </button>
      </section>

      <footer className="py-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-8">
           <div className="text-xl font-bold tracking-tighter">MOTION</div>
           <div className="flex gap-8 text-sm text-white/40">
             <a href="#" className="hover:text-primary transition-colors">Twitter</a>
             <a href="#" className="hover:text-primary transition-colors">GitHub</a>
             <a href="#" className="hover:text-primary transition-colors">Instagram</a>
           </div>
           <p className="text-xs text-white/20">© 2024 MOTION PLATFORM. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
