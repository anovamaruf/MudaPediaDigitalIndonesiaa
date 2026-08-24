'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// KOMPONEN 3D: GLOBE JARINGAN GLOBAL WEB3
function GlobalWeb3Globe3D() {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Inti Bola Bumi / Core Globe */}
      <mesh>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial color="#050b14" emissive="#02060d" roughness={0.9} metalness={0.8} />
      </mesh>

      {/* Wireframe Grid Global */}
      <mesh>
        <sphereGeometry args={[2.24, 32, 32]} />
        <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Titik-titik Node Global */}
      {[
        [1.5, 1.2, 0.8], [-1.2, 1.6, 0.5], [0.8, -1.5, 1.1], 
        [-1.8, -0.8, -0.7], [2.0, -0.2, -0.9], [0.1, 2.1, -0.5]
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#34d399" />
        </mesh>
      ))}

      {/* Lingkaran Orbit Cahaya Global */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

interface TopSectionProps {
  onSelectMenu?: (index: number) => void;
}

export default function TopSection({ onSelectMenu }: TopSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [cardMousePos, setCardMousePos] = useState<{ [key: number]: { x: number; y: number } }>({});
  
  // State untuk tombol Dropdown/Toggle "Eksplor Informasi Cepat" (FAQ)
  const [showFaqDrawer, setShowFaqDrawer] = useState(false);

  // State Harga Kripto Pasar Indonesia (Hot Indo Market - Aman dari CORS)
  const [cryptoPrices, setCryptoPrices] = useState([
    { symbol: "BTC/USDT", price: "$68,420.00", change: "+4.2%" },
    { symbol: "DOGE/USDT", price: "$0.1250", change: "+5.1%" },
    { symbol: "PEPE/USDT", price: "$0.000012", change: "+8.4%" },
    { symbol: "XRP/USDT", price: "$0.5420", change: "+1.9%" },
  ]);

  const titleRef = useRef(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardMousePos(prev => ({
      ...prev,
      [index]: { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }));
  };

  // Efek simulasi pergerakan harga real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoPrices(prev => prev.map(item => {
        const randomFluctuation = (Math.random() * 0.4 - 0.2);
        let currentVal = parseFloat(item.price.replace('$', '').replace(/,/g, ''));
        let newVal = currentVal + (currentVal * (randomFluctuation / 100));
        
        const formattedPrice = newVal < 1 
          ? `$${newVal.toFixed(6)}` 
          : `$${newVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        return { ...item, price: formattedPrice };
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // GSAP Animation Effect
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".title-word", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
      });
    }, titleRef);

    return () => ctx.revert();
  }, []);

  // LOGIKA UTAMA: Mengirim index tab ke Core Engine sekaligus memicu klik DOM
  const handleNavClick = (targetMenuName: string, menuIndex: number) => {
    if (onSelectMenu) {
      onSelectMenu(menuIndex);
    }
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });

      setTimeout(() => {
        const buttons = document.querySelectorAll('button, span');
        buttons.forEach((el) => {
          if (el.textContent?.trim() === targetMenuName) {
            (el as HTMLElement).click();
          }
        });
      }, 300);
    }
  };

  // Menu Vertikal Kiri dengan indeks yang jelas untuk TypeScript
  const navLinks = [
    { label: "TENTANG KAMI", action: () => handleNavClick("Tentang Kami", 0) },
    { label: "PAKET", action: () => handleNavClick("Paket", 1) },
    { label: "TIM KAMI", action: () => handleNavClick("Tim Kami", 2) },
    { label: "GALERI", action: () => handleNavClick("Galeri", 3) },
    { label: "KONTAK", action: () => {
      const footer = document.querySelector('footer');
      if (footer) footer.scrollIntoView({ behavior: 'smooth' });
    }},
  ];

  const faqs = [
    { 
      q: "Apa itu PT Mudapedia Digital Indonesia?", 
      a: "PT Mudapedia Digital Indonesia adalah perusahaan yang bergerak dibidang pengembangan teknologi dan digitalisasi Web3." 
    },
    { 
      q: "Layanan apa saja yang ditawarkan?", 
      a: "Pengembangan Smart Contract, Tokenomics, Mobile & Website Web3, hingga Digital Marketing." 
    },
    { 
      q: "Bagaimana cara kerja sama dengan PT Mudapedia?", 
      a: "Proses dimulai dengan konsultasi awal, penyusunan proposal, hingga eksekusi proyek secara intensif." 
    },
    { 
      q: "Siapa saja klien yang bisa menggunakan layanan?", 
      a: "Terbuka untuk UMKM, korporasi menengah, hingga proyek desentralisasi global." 
    },
    { 
      q: "Bagaimana cara menghubungi PT Mudapedia?", 
      a: "Melalui nomor telepon, email resmi, atau formulir kontak di bagian bawah website." 
    }
  ];

  const partners = [
    "OFFICIAL PAVO", "NAGAPARA", "GASWIN ARTHA SUAR", "DIGITAL BLOCKCHAIN", "GARUDA EXCHANGER"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="relative min-h-screen bg-[#030406] flex flex-col border-b border-slate-900 overflow-x-hidden pt-16">
      
      {/* 1. LIVE TRADING TICKER */}
      <div className="w-full bg-[#030406] border-b border-slate-900/80 py-2.5 px-6 flex items-center justify-between overflow-x-auto no-scrollbar text-xs font-mono">
        <div className="flex items-center gap-6 shrink-0">
          <span className="flex items-center gap-2 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            HOT INDO TRADING MARKET:
          </span>
          {cryptoPrices.map((t, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-400">
              <span className="text-white font-semibold">{t.symbol}</span>
              <span className="text-slate-300">{t.price}</span>
              <span className={t.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}>{t.change}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 text-slate-400 border-l border-slate-800 pl-6">
            <span className="text-white font-semibold">MUDAPEDIA NODE</span>
            <span className="text-emerald-400">CONNECTED</span>
          </div>
        </div>
      </div>

      <section className="relative w-full min-h-[85vh] bg-[#030406] text-white font-mono flex flex-col justify-between pt-12 pb-12 px-6 sm:px-16 overflow-hidden">
        
        {/* Top Info Bar */}
        <div className="w-full flex justify-between items-center text-xs text-slate-500 border-b border-slate-800/80 pb-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold uppercase tracking-widest">
              MUDAPEDIA // GLOBAL WEB3 OPERATOR
            </span>
          </div>
          <span className="hidden sm:inline uppercase tracking-widest text-[10px]">
            BANYUWANGI — WORLDWIDE DECENTRALIZATION
          </span>
        </div>

        {/* Main Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1 my-auto">
          
          {/* KOLOM KIRI: Menu Vertikal & Judul Raksasa */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              
              {/* Menu Vertikal Kiri */}
              <div className="flex flex-col space-y-3 border-l border-slate-800 pl-4">
                {navLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={link.action}
                    className="text-left text-xs text-slate-400 hover:text-emerald-400 transition-colors tracking-widest uppercase font-bold cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Judul Utama Raksasa (Massive Typography) */}
              <div ref={titleRef}>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white">
                  MUDAPEDIA <br />
                  DIGITAL <span className="text-[#ff5252]">INDONESIA</span>
                </h1>
              </div>
            </div>

            {/* Deskripsi & Tombol Eksplor Informasi Cepat */}
            <div className="space-y-4 pl-0 sm:pl-28">
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
                Kecepatan dalam Industri Web3, Blockchain, dan Kripto. Kami adalah perusahaan rintisan yang berada di jantung Web3, blockchain, dan kripto, tempat teknologi dan kreativitas berpadu. Tim kami membangun solusi inovatif yang membantu bisnis berkembang di dunia desentralisasi.
              </p>

              {/* TOMBOL EKSPLOR INFORMASI CEPAT */}
              <div>
                <button
                  onClick={() => setShowFaqDrawer(!showFaqDrawer)}
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {showFaqDrawer ? "TUTUP INFORMASI CEPAT ▲" : "EKSPLOR INFORMASI CEPAT ▼"}
                </button>
              </div>
            </div>

          </div>

          {/* KOLOM KANAN: Globe Jaringan Global 3D */}
          <div className="lg:col-span-5 h-[350px] sm:h-[450px] relative flex items-center justify-center pointer-events-none lg:pointer-events-auto">
            <div className="absolute w-72 h-72 bg-emerald-500/15 rounded-full blur-[90px] pointer-events-none" />
            
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} className="w-full h-full">
              <ambientLight intensity={1} />
              <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <GlobalWeb3Globe3D />
              </Float>
            </Canvas>

            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-[10px] text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>GLOBAL NODES ACTIVE</span>
            </div>
          </div>

        </div>

        {/* FAQ DRAWER */}
        <AnimatePresence>
          {showFaqDrawer && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full max-w-3xl mt-8 overflow-hidden"
            >
              <div className="p-5 rounded-2xl bg-[#0a0c16]/95 border border-emerald-500/40 backdrop-blur-md shadow-2xl">
                <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
                  // DIREKTORI FAQ // INFORMASI INSTAN:
                </h3>
                
                <motion.div 
                  className="space-y-2.5"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {faqs.map((faq, i) => {
                    const isOpen = activeIndex === i;
                    return (
                      <motion.div key={i} variants={itemVariants}>
                        <div
                          onClick={() => setActiveIndex(isOpen ? null : i)}
                          onMouseMove={(e) => handleCardMouseMove(e, i)}
                          className={`group relative overflow-hidden cursor-pointer rounded-xl p-[1px] transition-all duration-300 ${
                            isOpen 
                              ? "border border-emerald-500 bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]" 
                              : "border border-slate-800 bg-slate-900/60 hover:border-slate-700"
                          }`}
                        >
                          <div className="bg-[#030406]/95 backdrop-blur-md rounded-[11px] p-3.5 relative overflow-hidden flex items-center gap-3">
                            <span className={`text-[10px] font-mono font-bold ${isOpen ? 'text-emerald-400' : 'text-slate-600'}`}>
                              [0{i + 1}]
                            </span>
                            <div className="flex-1">
                              <div className="flex justify-between items-center relative z-10">
                                <span className={`font-bold text-xs leading-tight pr-4 ${isOpen ? 'text-emerald-400' : 'text-white'}`}>
                                  {faq.q}
                                </span>
                                <span className={`text-xs ${isOpen ? 'text-emerald-400' : 'text-slate-500'}`}>
                                  {isOpen ? '▲' : '▼'}
                                </span>
                              </div>
                              
                              <AnimatePresence>
                                {isOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-xs text-slate-300 mt-2 leading-relaxed border-t border-slate-800 pt-2"
                                  >
                                    {faq.a}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Bawah Hero */}
        <div className="w-full pt-6 mt-10 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-slate-500">
          <span className="uppercase tracking-wider">APACHE-GRADE PROTOCOL // MUDAPEDIA 2026</span>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">STATUS: ALL SYSTEMS NORMAL</span>
            <span className="text-emerald-400 font-bold">GLOBAL NETWORK CONNECTED</span>
          </div>
        </div>

      </section>

      {/* --- INFINITE MARQUEE PARTNER --- */}
      <div className="w-full bg-[#05070a] border-y border-slate-900 py-4 overflow-hidden relative z-25 group whitespace-nowrap flex">
        <div className="inline-flex w-max animate-marquee group-hover:[animation-play-state:paused] flex-nowrap items-center">
          {[...partners, ...partners, ...partners, ...partners, ...partners, ...partners].map((partner, idx) => (
            <div key={idx} className="inline-flex items-center mx-8 text-xs font-mono tracking-widest text-slate-300 uppercase shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-3 inline-block" />
              <span>{partner}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}