'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function LogoShape() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Membuat bentuk pita geometris logo "M"
  const shape = new THREE.Shape();
  // Bentuk pita logo Mudapedia
  shape.moveTo(-1.8, -1.2);
  shape.lineTo(-1.2, 1.2);
  shape.lineTo(-0.2, -0.4);
  shape.lineTo(0.6, 1.2);
  shape.lineTo(1.8, -0.2);
  shape.lineTo(1.2, -1.2);
  shape.lineTo(0.6, 0.2);
  shape.lineTo(-0.2, -1.2);

  const extrudeSettings = {
    steps: 2,
    depth: 0.4, // Ketebalan 3D
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 8,
  };

  useFrame((state) => {
    if (meshRef.current) {
      // Rotasi halus bergoyang secara otomatis
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.3;
      meshRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.5) * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        {/* Material Gradient Cyan ke Purple Metallic */}
        <meshStandardMaterial
          color="#6366f1"
          roughness={0.2}
          metalness={0.8}
          emissive="#3b82f6"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function Logo3D() {
  return (
    <div className="w-48 h-48 relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <pointLight position={[-10, -10, -5]} color="#06b6d4" intensity={3} />
        <LogoShape />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
}