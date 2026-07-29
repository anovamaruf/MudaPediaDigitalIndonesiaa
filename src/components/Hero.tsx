'use client';

import React, { useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Float, TorusKnot } from '@react-three/drei';
import { Sparkles, ArrowRight, Users, HelpCircle } from 'lucide-react';
import * as THREE from 'three';

function MudaPedia3DLogo({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.6;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.8}>
      <TorusKnot ref={meshRef} args={[1.0, 0.3, 128, 32, 2, 3]} scale={1.1}>
        <MeshDistortMaterial
          color={isDark ? "#6366f1" : "#0284c7"}
          attach="material"
          distort={0.12}
          speed={2}
          roughness={0.1}
          metalness={0.3}
        />
      </TorusKnot>
    </Float>
  );
}

function Hero3DCanvas({ isDark }: { isDark: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = -((e.clientY - rect.top) / rect.height - 0.5);
    setMousePos({ x: x * 200, y: y * 200 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="h-[380px] sm:h-[480px] w-full max-w-[550px] mx-auto cursor-grab active:cursor-grabbing relative flex items-center justify-center overflow-visible"
    >
      <div 
        className={`absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full blur-[100px] pointer-events-none transition-all duration-200 ease-out ${
          isDark ? 'bg-indigo-500/40' : 'bg-sky-400/40'
        }`}
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
        }}
      />
      
      <Canvas camera={{ position: [0, 0, 6], fov: 65 }} style={{ overflow: 'visible' }}>
        <ambientLight intensity={1.8} />
        <directionalLight position={[10, 10, 5]} intensity={3} color={isDark ? "#c084fc" : "#38bdf8"} />
        <pointLight position={[-10, -10, -5]} intensity={2} color={isDark ? "#38bdf8" : "#818cf8"} />
        <Suspense fallback={null}>
          <MudaPedia3DLogo isDark={isDark} />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
}

export default function Hero({ isDark }: { isDark: boolean }) {
  const [hoveredFaq, setHoveredFaq] = useState<number | null>(null);

  const interactiveFaqs = [
    {
      q: "Apa itu PT Mudapedia Digital Indonesia?",
      a: "PT Mudapedia Digital Indonesia adalah perusahaan yang bergerak dibidang pengembangan teknologi dan digitalisasi. Kami menyediakan solusi inovatif untuk bisnis maupun individu, mulai dari pengembangan aplikasi, website, hingga strategi digital marketing."
    },
    {
      q: "Layanan apa saja yang ditawarkan?",
      a: "• Pengembangan Aplikasi Mobile: Android & iOS (native atau cross-platform).\n• Pengembangan Website: E-commerce, company profile, portofolio, dan lainnya.\n• Digital Marketing: SEO, SEM, Social Media Management, hingga Content Creation.\n• Konsultasi Digital: Analisis kebutuhan & strategi digitalisasi bisnis."
    },
    {
      q: "Bagaimana cara kerja sama dengan PT Mudapedia?",
      a: "Proses kerja sama dimulai dengan konsultasi awal untuk memahami kebutuhan Anda. Tim kami kemudian menyusun proposal solusi lengkap dengan estimasi biaya dan waktu pengerjaan. Setelah ada kesepakatan, pengembangan dimulai dengan komunikasi intensif dan transparansi di setiap tahap proyek."
    },
    {
      q: "Siapa saja klien yang bisa menggunakan layanan Mudapedia?",
      a: "Layanan kami terbuka untuk berbagai jenis klien, mulai dari UMKM, perusahaan menengah, hingga korporasi besar. Kami juga melayani kebutuhan individu yang ingin mengembangkan produk digital."
    },
    {
      q: "Bagaimana cara menghubungi PT Mudapedia Digital Indonesia?",
      a: "Anda dapat menghubungi kami melalui email, telepon, atau formulir kontak di website resmi. Tim kami siap membantu Anda mendapatkan solusi terbaik sesuai kebutuhan bisnis."
    }
  ];

  const handleFaqToggle = (idx: number) => {
    setHoveredFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -30 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8 }}
        className="lg:col-span-7 space-y-6"
      >
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${
          isDark ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300' : 'bg-sky-50 border-sky-200 text-sky-700'
        }`}>
          <Sparkles size={14} className={isDark ? 'text-indigo-400' : 'text-sky-600'} /> Ekosistem Digital & Web3 Agency
        </div>
        
        <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Kecepatan dalam Industri <br />
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Web3, Blockchain, & Kripto.
          </span>
        </h1>
        
        <p className={`text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Kami adalah perusahaan rintisan yang berada di jantung Web3, blockchain, dan kripto—tempat teknologi dan kreativitas berpadu membangun solusi bisnis terdepan.
        </p>

        <div className="space-y-3 pt-2">
          <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-indigo-400' : 'text-sky-600'}`}>Eksplor Informasi Cepat:</p>
          {interactiveFaqs.map((faq, idx) => (
            <div 
              key={idx}
              onMouseEnter={() => setHoveredFaq(idx)}
              onMouseLeave={() => setHoveredFaq(null)}
              onClick={() => handleFaqToggle(idx)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleFaqToggle(idx);
              }}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer backdrop-blur-md select-none ${
                hoveredFaq === idx 
                  ? (isDark ? 'bg-indigo-950/40 border-indigo-500/85 shadow-lg shadow-indigo-500/20' : 'bg-sky-50 border-sky-400 shadow-md')
                  : (isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200')
              }`}
            >
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{faq.q}</span>
                <HelpCircle size={16} className={`shrink-0 ml-2 ${hoveredFaq === idx ? (isDark ? 'text-indigo-400' : 'text-sky-600') : 'text-slate-500'}`} />
              </div>

              <AnimatePresence>
                {hoveredFaq === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className={`text-xs mt-3 pt-3 border-t leading-relaxed whitespace-pre-line ${
                      isDark ? 'text-slate-300 border-indigo-500/30' : 'text-slate-600 border-sky-200'
                    }`}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <motion.a 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#pricing" 
            className={`flex items-center justify-center gap-2 font-semibold px-6 sm:px-7 py-3.5 rounded-xl shadow-xl transition-all text-xs sm:text-sm ${
              isDark ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-600/30' : 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-sky-600/30'
            }`}
          >
            Jelajahi Paket <ArrowRight size={16} />
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#team" 
            className={`flex items-center justify-center gap-2 font-semibold px-6 sm:px-7 py-3.5 rounded-xl transition-all backdrop-blur-md border text-xs sm:text-sm ${
              isDark ? 'bg-slate-900/80 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}
          >
            <Users size={16} /> Talenta & Tim
          </motion.a>
        </div>
      </motion.div>

      <div className="lg:col-span-5 relative overflow-visible flex items-center justify-center mt-6 lg:mt-0">
        <Hero3DCanvas isDark={isDark} />
      </div>
    </section>
  );
}