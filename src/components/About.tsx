'use client';

import React, { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Float, TorusKnot } from '@react-three/drei';
import { ShieldCheck, Sparkles } from 'lucide-react';
import * as THREE from 'three';
import StatsCounter from './StatsCounter';

function FloatingTorus({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={2} floatIntensity={1.5}>
      <TorusKnot ref={meshRef} args={[0.8, 0.28, 128, 32]} scale={1.1}>
        <MeshDistortMaterial
          color={isDark ? "#c084fc" : "#38bdf8"}
          attach="material"
          distort={0.2}
          speed={2}
          roughness={0.1}
        />
      </TorusKnot>
    </Float>
  );
}

function About3DCanvas({ isDark }: { isDark: boolean }) {
  return (
    <div className="h-[280px] w-full cursor-grab active:cursor-grabbing relative overflow-visible">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ overflow: 'visible' }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} color={isDark ? "#818cf8" : "#0284c7"} />
        <Suspense fallback={null}>
          <FloatingTorus isDark={isDark} />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
}

export default function About({ isDark }: { isDark: boolean }) {
  return (
    <section id="about" className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <h2 className={`text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Tentang Kami</h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`grid md:grid-cols-2 gap-8 items-center rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-md border shadow-xl ${
          isDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-slate-200'
        }`}
      >
        <div className="space-y-6">
          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-sky-50 border-sky-200'}`}>
            <h3 className={`font-bold text-base mb-2 flex items-center gap-2 ${isDark ? 'text-indigo-300' : 'text-sky-700'}`}>
              <ShieldCheck size={18} /> Visi Utama
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Kami menjadi Perusahaan Digital Agency yang terdepan dalam membantu para pebisnis mengembangkan usahanya di era desentralisasi.
            </p>
          </div>
          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-purple-500/10 border-purple-500/20' : 'bg-indigo-50 border-indigo-200'}`}>
            <h3 className={`font-bold text-base mb-2 flex items-center gap-2 ${isDark ? 'text-purple-300' : 'text-indigo-700'}`}>
              <Sparkles size={18} /> Misi Kami
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Memahami bahwa era digital telah membuka pintu menuju peluang tak terbatas. Kami hadir sebagai solusi cerdas dan terpercaya untuk membantu Anda berkembang dalam dunia yang terus berubah. Sebagai perusahaan inovatif, kami menawarkan rangkaian layanan yang dirancang khusus untuk memenuhi kebutuhan bisnis modern.
            </p>
          </div>
        </div>

        <div className={`relative rounded-3xl overflow-hidden border flex flex-col items-center justify-center text-center p-6 shadow-2xl ${
          isDark ? 'border-slate-800 bg-gradient-to-br from-indigo-950/40 via-purple-900/20 to-slate-900' : 'border-slate-200 bg-gradient-to-br from-sky-50 via-indigo-50 to-white'
        }`}>
          <About3DCanvas isDark={isDark} />
          <div className="relative z-10 -mt-6">
            <p className="text-4xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-1">100% Dedicated</p>
            <p className={`font-medium text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Solusi Digital & Pembinaan Talenta Generasi Muda</p>
          </div>
        </div>
      </motion.div>

      <StatsCounter isDark={isDark} />
    </section>
  );
}