"use client";

import React from "react";
import { ParticleDemo } from "@/components/particles/ParticleDemo";
import { ParticleBackground } from "@/components/motion/ParticleBackground";
import { motion } from "framer-motion";

export default function ParticlesPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-black mb-6">PARTICLES</h1>
        <p className="text-xl text-white/60 max-w-2xl">
          High-performance mathematical systems that bring life to your interfaces. Optimized for 60FPS using GPU-accelerated rendering.
        </p>
      </motion.div>

      <ParticleDemo 
        title="Galaxy Spiral"
        description="A mathematical simulation of a spiral galaxy using log-polar coordinates. Each star is a single vertex in a buffer geometry, colored based on its distance from the center."
        code={`// Three.js Shader Material
const vertexShader = \`
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 2.0 * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
\`;`}
        component={<ParticleBackground />}
      />

      <ParticleDemo 
        title="Rain System"
        description="A vertical particle system with gravity and velocity components. Each particle resets its position once it leaves the viewport, creating an infinite loop."
        code={`// Physics loop
useFrame((state, delta) => {
  particles.forEach(p => {
    p.y -= p.velocity * delta;
    if (p.y < -5) p.y = 5;
  });
});`}
        component={
          <div className="absolute inset-0 bg-blue-900/10 flex items-center justify-center">
            <span className="text-primary/40 font-mono">[RAIN SIMULATION ACTIVE]</span>
          </div>
        }
      />
    </div>
  );
}
