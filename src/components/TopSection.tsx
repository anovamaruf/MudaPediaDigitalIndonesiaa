'use client';

import React, { Suspense, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

// KOMPONEN 3D: PURE BITCOIN BERSIH
function CleanBitcoin3D() {
  const coinTexture = useMemo(() => new THREE.TextureLoader().load('/bitcoin.png'), []);
  const coinRef = useRef<THREE.Group>(null);
  const animRef = useRef({ scale: 0 });

  useFrame((state, delta) => {
    if (coinRef.current) {
      if (animRef.current.scale < 1) {
        animRef.current.scale += delta * 1.5;
        coinRef.current.scale.setScalar(Math.min(animRef.current.scale, 1));
      }
      coinRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={coinRef} scale={[0, 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.25, 64]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.15} />
      </mesh>
      
      <mesh position={[0, 0, 0.14]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial map={coinTexture} transparent />
      </mesh>

      <mesh position={[0, 0, -0.14]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial map={coinTexture} transparent />
      </mesh>

      <pointLight position={[0, 0, 4]} color="#fbbf24" intensity={60} distance={6} />
    </group>
  );
}

export default function TopSection() {
  // State untuk sistem klik FAQ yang aman di HP maupun Desktop
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const subtitleText = "Kecepatan dalam Industri Web3, Blockchain, dan Kripto. Kami adalah perusahaan rintisan yang berada di jantung Web3, blockchain, dan kripto, tempat teknologi dan kreativitas berpadu. Tim kami membangun solusi inovatif yang membantu bisnis berkembang di dunia desentralisasi.";

  const titleChunks = [
    { text: "MUDA", initial: { x: -250, y: -150, scale: 0.3 }, color: "text-white" },
    { text: "PEDIA", initial: { x: 250, y: -150, scale: 0.3 }, color: "text-white" },
    { text: "DIGITAL", initial: { x: -250, y: 150, scale: 0.3 }, color: "text-white-400" },
    { text: "INDO", initial: { x: 0, y: 200, scale: 0.2 }, color: "text-white-400" },
    { text: "NESIA", initial: { x: 250, y: 150, scale: 0.3 }, color: "text-white-400" }
  ];

  const faqs = [
    { 
      q: "Apa itu PT Mudapedia Digital Indonesia?", 
      a: "PT Mudapedia Digital Indonesia adalah perusahaan yang bergerak dibidang pengembangan teknologi dan digitalisasi. Kami menyediakan solusi inovatif untuk bisnis maupun individu, mulai dari pengembangan aplikasi, website, hingga strategi digital marketing." 
    },
    { 
      q: "Layanan apa saja yang ditawarkan?", 
      a: (
        <div className="space-y-1">
          <p>- Pengembangan Aplikasi Mobile: Android & iOS (native atau cross-platform).</p>
          <p>- Pengembangan Website: E-commerce, company profile, portofolio, dan lainnya.</p>
          <p>- Digital Marketing: SEO, SEM, Social Media Management, hingga Content Creation.</p>
          <p>- Konsultasi Digital: Analisis kebutuhan & strategi digitalisasi bisnis.</p>
        </div>
      ) 
    },
    { 
      q: "Bagaimana cara kerja sama dengan PT Mudapedia?", 
      a: "Proses dimulai dengan konsultasi awal untuk memahami kebutuhan. Kami menyusun proposal solusi dengan estimasi biaya dan waktu. Setelah sepakat, pengembangan dimulai dengan komunikasi intensif." 
    },
    { 
      q: "Siapa saja klien yang bisa menggunakan layanan Mudapedia?", 
      a: "Layanan kami terbuka untuk berbagai jenis klien, mulai dari UMKM, perusahaan menengah, korporasi besar, hingga individu yang ingin mengembangkan produk digital." 
    },
    { 
      q: "Bagaimana cara menghubungi PT Mudapedia Digital Indonesia?", 
      a: "Anda dapat menghubungi kami melalui email, telepon, atau formulir kontak di website resmi kami. Tim kami siap membantu Anda." 
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#030406] flex flex-col lg:flex-row items-center border-b border-slate-900 overflow-x-hidden pt-16">
      
      {/* KONTEN KIRI (TEKS & FAQ) */}
      <div className="relative z-10 w-full lg:w-3/5 pt-12 pb-12 px-6 sm:px-12 lg:px-24 flex flex-col justify-center">
        <div className="max-w-4xl space-y-8">
          
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-white-500 animate-pulse" />
            Ekosistem Digital & Web3 Agency
          </motion.div>

          {/* JUDUL UTAMA */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 uppercase font-black tracking-tighter text-4xl sm:text-6xl lg:text-7xl overflow-hidden">
            {titleChunks.map((chunk, idx) => (
              <motion.span
                key={idx}
                initial={{ ...chunk.initial, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                transition={{
                  duration: 1.2,
                  delay: idx * 0.12,
                  type: "spring",
                  stiffness: 180,
                  damping: 12
                }}
                className={chunk.color}
              >
                {chunk.text}
              </motion.span>
            ))}
          </div>
          
          {/* SUBJUDUL */}
          <p className="text-sm sm:text-base text-slate-400 font-mono leading-relaxed max-w-2xl">
            {subtitleText.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + (i * 0.04), duration: 0.8, type: "spring", damping: 20 }}
                className="inline-block mr-1.5"
              >
                {word}
              </motion.span>
            ))}
          </p>
        </div>

        {/* EKSPLOR FAQ (SISTEM KLIK / TOUCH AGAR BISA DIBUKA DI HP & DESKTOP TANPA MACET) */}
        <div className="mt-14 max-w-2xl space-y-4">
          <h3 className="text-xs font-mono text-white-400 uppercase tracking-widest mb-4">// Eksplor Informasi Cepat:</h3>
          {faqs.map((faq, i) => {
            const isOpen = activeIndex === i;
            return (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  layout: { type: "spring", stiffness: 300, damping: 25 },
                  delay: 2.8 + (i * 0.25),
                  type: "spring",
                  stiffness: 180,
                  damping: 15
                }}
                onClick={() => setActiveIndex(isOpen ? null : i)}
                className={`group relative border rounded-2xl overflow-hidden backdrop-blur-sm cursor-pointer transition-colors duration-300 ${
                  isOpen 
                    ? "border-blue-500 bg-slate-900/60 shadow-[0_0_20px_rgba(59,130,246,0.15)]" 
                    : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                }`}
              >
                <div className="p-5 flex flex-col justify-start">
                  <div className="flex justify-between items-center h-7">
                    <span className="font-bold text-white text-base leading-tight pr-4">{faq.q}</span>
                    <motion.span 
                      animate={{ rotate: isOpen ? 180 : 0 }} 
                      transition={{ duration: 0.3 }} 
                      className="text-slate-400 text-base"
                    >
                      ▼
                    </motion.span>
                  </div>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-base text-slate-400 mt-4 leading-relaxed overflow-hidden"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* KONTEN KANAN (BITCOIN 3D - Fitur otak-atik/putar manual dimatikan total agar aman di mobile & desktop) */}
      <div className="w-full h-[380px] lg:w-2/5 lg:h-screen relative z-0 pointer-events-none lg:pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
          <Suspense fallback={null}>
            <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
              <CleanBitcoin3D />
            </Float>
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enableRotate={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
            // @ts-ignore
            touchAction="none" 
          />
        </Canvas>
      </div>

    </div>
  );
}