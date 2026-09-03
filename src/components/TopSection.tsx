'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/context/ThemeContext';

function GlobalWeb3Globe3D() {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial color="#0b1329" emissive="#040914" roughness={0.9} metalness={0.8} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.24, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.2} />
      </mesh>
      {[
        [1.5, 1.2, 0.8], [-1.2, 1.6, 0.5], [0.8, -1.5, 1.1], 
        [-1.8, -0.8, -0.7], [2.0, -0.2, -0.9], [0.1, 2.1, -0.5]
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#60a5fa" />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

interface TopSectionProps {
  onSelectMenu?: (index: number) => void;
}

export default function TopSection({ onSelectMenu }: TopSectionProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showFaqDrawer, setShowFaqDrawer] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".title-word", { y: 100, opacity: 0, duration: 1, stagger: 0.2, ease: "power4.out" });
    }, titleRef);
    return () => ctx.revert();
  }, []);

  const handleNavClick = (targetType: 'about' | 'core', menuIndex: number, targetMenuName?: string) => {
    if (targetType === 'about') {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
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
    }
  };

  const navLinks = [
    { label: "TENTANG KAMI", action: () => handleNavClick('about', 0) },
    { label: "PAKET", action: () => handleNavClick('core', 0, "Paket") },
    { label: "TIM KAMI", action: () => handleNavClick('core', 1, "Tim Kami") },
    { label: "GALERI", action: () => handleNavClick('core', 2, "Galeri") },
    { label: "KONTAK", action: () => {
      const footer = document.querySelector('footer');
      if (footer) footer.scrollIntoView({ behavior: 'smooth' });
    }},
  ];

  const faqs = [
    { q: "Apa itu PT Mudapedia Digital Indonesia?", a: "PT Mudapedia Digital Indonesia adalah perusahaan resmi yang bergerak di bidang pengembangan teknologi infrastruktur desentralisasi dan ekosistem Web3." },
    { q: "Layanan apa saja yang ditawarkan?", a: "Pengembangan Smart Contract, Tokenomics, Mobile & Website Web3, hingga Konsultasi Digital Enterprise." },
    { q: "Bagaimana cara kerja sama dengan PT Mudapedia?", a: "Proses dimulai dengan konsultasi awal, penyusunan proposal teknis, hingga eksekusi proyek secara profesional." },
    { q: "Siapa saja klien yang bisa menggunakan layanan?", a: "Terbuka untuk UMKM, korporasi menengah, hingga inisiatif protokol desentralisasi global." },
    { q: "Bagaimana cara menghubungi PT Mudapedia?", a: "Melalui nomor kontak resmi, email korporat, atau formulir di bagian bawah website." }
  ];

  const partners = [
    { name: "Official Pavo", img: "/pavo.webp" },
    { name: "Nagapara", img: "/nagapara.webp" },
    { name: "Gaswin Artha Suar", img: "/gasvin.webp" },
    { name: "Digital Blockchain Indonesia", img: "/blockchain.webp" },
  ];

  return (
    <div className={`relative border-b overflow-x-hidden transition-colors ${
      isDark ? 'bg-[#030406] border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      
      {/* Background section diperbesar ukurannya dengan padding py-12 sm:py-16 */}
      <section className={`relative w-full font-mono flex flex-col py-12 sm:py-16 px-6 sm:px-16 overflow-hidden ${
        isDark ? 'bg-[#030406] text-white' : 'bg-white text-slate-900'
      }`}>
        
        {/* Header Info */}
        <div className={`w-full flex justify-between items-center text-xs border-b pb-6 mb-8 ${isDark ? 'text-slate-500 border-slate-800' : 'text-slate-400 border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <span className={`font-bold uppercase tracking-widest ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              PT MUDAPEDIA DIGITAL INDONESIA
            </span>
          </div>
          <span className="hidden sm:inline uppercase tracking-widest text-[10px]">
            BANYUWANGI — DECENTRALIZATION INFRASTRUCTURE
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              
              <div className={`flex flex-col space-y-3 border-l pl-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                {navLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={link.action}
                    className={`text-left text-xs sm:text-sm transition-colors tracking-widest uppercase font-bold cursor-pointer ${
                      isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div ref={titleRef}>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                  MUDAPEDIA <br />
                  DIGITAL <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    INDONESIA
                  </span>
                </h1>
              </div>
            </div>

            <div className="space-y-4 pl-0 sm:pl-28">
              <p className={`text-sm sm:text-base max-w-xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Pionir infrastruktur Web3 dan teknologi desentralisasi di Indonesia. Kami menghadirkan solusi arsitektur digital berstandar global, menggabungkan keamanan tingkat lanjut dan inovasi kreatif untuk korporasi masa depan.
              </p>

              <div>
                <button
                  onClick={() => setShowFaqDrawer(!showFaqDrawer)}
                  className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 shadow-md cursor-pointer ${
                    isDark ? 'border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400' : 'border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700'
                  }`}
                >
                  {showFaqDrawer ? "TUTUP INFORMASI CEPAT ▲" : "EKSPLOR INFORMASI CEPAT ▼"}
                </button>
              </div>

              {/* STATISTIK TRACK RECORD */}
              <div className={`flex items-center gap-6 pt-4 border-t max-w-lg ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
                <div>
                  <span className={`text-lg sm:text-xl font-black ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    <AnimatedCounter target={150} suffix="+" />
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold mt-0.5">Total Proyek</span>
                </div>
                <div className={`h-7 w-[1px] ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
                <div>
                  <span className={`text-lg sm:text-xl font-black ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    <AnimatedCounter target={99} suffix="%" />
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold mt-0.5">Rate Kepuasan</span>
                </div>
                <div className={`h-7 w-[1px] ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
                <div>
                  <span className={`text-lg sm:text-xl font-black ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    <AnimatedCounter target={48} suffix="M+" />
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold mt-0.5">Volume Transaksi</span>
                </div>
              </div>

            </div>

          </div>

          {/* Ukuran globe 3D dan background container di sisi kanan diperbesar */}
          <div className="lg:col-span-5 h-[380px] sm:h-[500px] relative flex items-center justify-center pointer-events-none lg:pointer-events-auto">
            <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} className="w-full h-full">
              <ambientLight intensity={1} />
              <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <GlobalWeb3Globe3D />
              </Float>
            </Canvas>
          </div>

        </div>

        <AnimatePresence>
          {showFaqDrawer && (
            <motion.div initial={{ opacity: 0, height: 0, y: -10 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: -10 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="w-full max-w-3xl mt-6 overflow-hidden">
              <div className={`p-5 rounded-2xl backdrop-blur-md shadow-2xl border ${isDark ? 'bg-[#0a0c16]/95 border-blue-500/40 text-white' : 'bg-white/95 border-blue-200 text-slate-900 shadow-slate-200'}`}>
                <h3 className={`text-xs font-mono uppercase tracking-widest mb-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  INFORMASI INSTAN:
                </h3>
                
                <motion.div className="space-y-2.5" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="visible">
                  {faqs.map((faq, i) => {
                    const isOpen = activeIndex === i;
                    return (
                      <div key={i} onClick={() => setActiveIndex(isOpen ? null : i)} className={`group relative overflow-hidden cursor-pointer rounded-xl p-[1px] transition-all duration-300 border ${
                        isOpen ? (isDark ? 'border-blue-500 bg-blue-500/20' : 'border-blue-600 bg-blue-50') : (isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50')
                      }`}>
                        <div className={`rounded-[11px] p-3.5 relative overflow-hidden flex items-center gap-3 ${isDark ? 'bg-[#030406]/95' : 'bg-white'}`}>
                          <span className={`text-xs font-mono font-bold ${isOpen ? (isDark ? 'text-blue-400' : 'text-blue-600') : 'text-slate-400'}`}>[0{i + 1}]</span>
                          <div className="flex-1">
                            <div className="flex justify-between items-center relative z-10">
                              <span className={`font-bold text-xs sm:text-sm leading-tight pr-4 ${isOpen ? (isDark ? 'text-blue-400' : 'text-blue-600' ) : ''}`}>{faq.q}</span>
                              <span className="text-xs">{isOpen ? '▲' : '▼'}</span>
                            </div>
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className={`text-xs sm:text-sm mt-2 leading-relaxed border-t pt-2 ${isDark ? 'text-slate-300 border-slate-800' : 'text-slate-600 border-slate-100'}`}>
                                  {faq.a}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`w-full pt-4 mt-8 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs ${isDark ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-500'}`}>
          <span className="uppercase tracking-wider">OFFICIAL CORP PROFILE MUDAPEDIA 2026</span>
          <div className="flex items-center gap-6" />
        </div>

      </section>

      {/* Marquee Partners */}
      <div className={`w-full border-y py-4 overflow-hidden relative z-25 group whitespace-nowrap flex ${isDark ? 'bg-[#030406] border-slate-900' : 'bg-slate-50 border-slate-200'}`}>
        <div className="inline-flex w-max animate-marquee group-hover:[animation-play-state:paused] flex-nowrap items-center">
          {[...partners, ...partners, ...partners, ...partners].map((partner, idx) => (
            <div key={idx} className="inline-flex items-center mx-10 text-xs font-mono shrink-0">
              <div className={`w-7 h-7 mr-3 shrink-0 flex items-center justify-center rounded-full border overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <img src={partner.img} alt={partner.name} className="w-full h-full object-contain" />
              </div>
              <span className={`font-semibold tracking-wide text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}