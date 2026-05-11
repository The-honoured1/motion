"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Sphere, Float, MeshWobbleMaterial } from "@react-three/drei";
import { motion } from "framer-motion";

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7000ff" />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1, 64, 64]} position={[-2, 0, 0]}>
          <MeshDistortMaterial
            color="#00f2ff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <MeshWobbleMaterial
            color="#7000ff"
            factor={1}
            speed={2}
            roughness={0.1}
          />
        </mesh>
      </Float>

      <OrbitControls enableZoom={false} />
    </>
  );
}

export default function ThreeJSPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto h-screen flex flex-col">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase">Three.js</h1>
        <p className="text-xl text-white/60 max-w-2xl">
          Immersive 3D environments rendered in real-time. We leverage WebGL to create depth, shadows, and complex shaders.
        </p>
      </motion.div>

      <div className="flex-1 glass rounded-[3rem] overflow-hidden relative border border-white/10">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <Scene />
        </Canvas>
        
        <div className="absolute bottom-10 left-10 glass p-6 rounded-2xl border border-white/10 pointer-events-none">
           <p className="text-xs font-bold text-primary uppercase mb-2">Interactive Scene</p>
           <p className="text-sm text-white/60">Drag to rotate the view. Hover elements to see distortion effects.</p>
        </div>
      </div>
    </div>
  );
}
