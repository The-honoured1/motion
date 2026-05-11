"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 2000 }) {
  const mesh = useRef<THREE.Points>(null!);
  const light = useRef<THREE.PointLight>(null!);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.y = time * 0.1;
    mesh.current.rotation.x = time * 0.05;

    // React to mouse
    const x = (state.mouse.x * state.viewport.width) / 2;
    const y = (state.mouse.y * state.viewport.height) / 2;
    light.current.position.set(x, y, 2);
  });

  return (
    <>
      <pointLight ref={light} distance={10} intensity={20} color="#00f2ff" />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#ffffff"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </>
  );
}

export function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-background">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
}
