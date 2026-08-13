'use client';

import React, { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// KOMPONEN 3D: PURE BITCOIN BERSIH (Dengan Animasi Scale Masuk dari Kecil ke Besar)
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [cardMousePos, setCardMousePos] = useState<{ [key: number]: { x: number; y: number } }>({});
  
  // State Harga Kripto Pasar Indonesia yang Stabil, Aman, dan Bergerak Dinamis Tanpa CORS Error
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

  // Efek simulasi pergerakan harga real-time yang aman dari blokir internet/CORS
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoPrices(prev => prev.map(item => {
        const randomFluctuation = (Math.random() * 0.4 - 0.2);
        let currentVal = parseFloat(item.price.replace('$', '').replace(/,/g, ''));
        let newVal = currentVal + (currentVal * (randomFluctuation / 100));
        
        const formattedPrice = newVal < 1 
          ? `$${newVal.toFixed(6)}` 
          : `$${newVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        return {
          ...item,
          price: formattedPrice
        };
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // GSAP Animation Effect (Text Reveal & Parallax Geser Naik)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Animasi Text Title
      gsap.from(".title-word", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
      });

      // Efek PARALLAX geser naik pada container FAQ saat di-scroll
      gsap.to(".faq-wrapper", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: ".faq-container",
          scrub: true,
          start: "top bottom",
          end: "bottom top"
        }
      });
    }, titleRef);

    return () => ctx.revert();
  }, []);

  const subtitleText = "Kecepatan dalam Industri Web3, Blockchain, dan Kripto. Kami adalah perusahaan rintisan yang berada di jantung Web3, blockchain, dan kripto, tempat teknologi dan kreativitas berpadu. Tim kami membangun solusi inovatif yang membantu bisnis berkembang di dunia desentralisasi.";

  const titleChunks = [
    { text: "MUDAPEDIA", color: "title-word text-white-350" },
    { text: "DIGITAL", color: "title-word text-white-400" },
    { text: "INDONESIA", color: "title-word text-red-400" }
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

  const partners = [
    "OFFICIAL PAVO",
    "NAGAPARA",
    "GASWIN ARTHA SUAR",
    "DIGITAL BLOCKCHAIN",
    "GARUDA EXCHANGER"
  ];

  // VARIAN ANIMASI STAGGERED (Menggunakan 'as const' untuk mengatasi error tipe tuple TypeScript)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] as const } 
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030406] flex flex-col border-b border-slate-900 overflow-x-hidden pt-16">
      
      {/* 1. LIVE TRADING TICKER (HOT PAIR IN INDONESIA) */}
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

      <div className="flex flex-col lg:flex-row items-center w-full">
        
        {/* KONTEN KIRI (TEKS & FAQ) */}
        <div className="relative z-10 w-full lg:w-3/5 pt-12 pb-12 px-6 sm:px-12 lg:px-24 flex flex-col justify-center">
          <div className="max-w-4xl space-y-8">
            
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-mono backdrop-blur-md shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="tracking-wide text-emerald-400 font-semibold">SYSTEM ACTIVE:</span> Web3 & Digital Ecosystem
            </motion.div>

            <div ref={titleRef} className="flex flex-col md:flex-row flex-wrap gap-x-6 gap-y-2 uppercase font-black tracking-tighter text-5xl sm:text-7xl lg:text-8xl overflow-hidden">
              {titleChunks.map((chunk, idx) => (
                <span key={idx} className={chunk.color}>
                  {chunk.text}
                </span>
              ))}
            </div>
            
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

          {/* EKSPLOR FAQ: Dilengkapi Parallax Wrapper, Staggered Entry Masuk Berurutan, & Efek Trampolin Spring Layout */}
          <div className="faq-container mt-14 max-w-2xl">
            <h3 className="text-xs font-mono text-white-400 uppercase tracking-widest mb-4">// Eksplor Informasi Cepat:</h3>
            <motion.div 
              className="faq-wrapper space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {faqs.map((faq, i) => {
                const isOpen = activeIndex === i;
                const pos = cardMousePos[i] || { x: 0, y: 0 };
                return (
                  <motion.div key={i} className="faq-item" variants={itemVariants}>
                    <motion.div
                      layout
                      whileHover={{ scale: 1.015, x: 8 }}
                      whileTap={{ scale: 0.985 }}
                      transition={{
                        layout: { type: "spring", stiffness: 350, damping: 22 },
                      }}
                      onClick={() => setActiveIndex(isOpen ? null : i)}
                      onMouseMove={(e) => handleCardMouseMove(e, i)}
                      className={`group relative overflow-hidden cursor-pointer rounded-2xl p-[1px] transition-all duration-300 ${
                        isOpen 
                          ? "border border-emerald-500 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 shadow-[0_0_30px_rgba(59,130,246,0.3)]" 
                          : "border border-slate-800 bg-slate-900/40 hover:border-slate-700"
                      }`}
                    >
                      <div className="bg-[#030406]/90 backdrop-blur-md rounded-[15px] p-5 relative overflow-hidden flex items-center gap-4">
                        
                        <span className={`text-xs font-mono font-bold transition-colors duration-300 ${isOpen ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'}`}>
                          [0{i + 1}]
                        </span>

                        <div className="flex-1">
                          <div 
                            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                            style={{
                              background: `radial-gradient(250px circle at ${pos.x}px ${pos.y}px, rgba(16, 185, 129, 0.15), transparent 80%)`
                            }}
                          />

                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent pointer-events-none"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ repeat: Infinity, duration: 4, ease: 'linear', repeatDelay: 1 }}
                          />

                          <div className="flex justify-between items-center h-7 relative z-10">
                            <span className={`font-bold text-base leading-tight pr-4 transition-all duration-300 group-hover:translate-x-1 ${isOpen ? 'text-emerald-400' : 'text-white'}`}>
                              {faq.q}
                            </span>
                            <motion.span 
                              animate={{ rotate: isOpen ? 180 : 0 }} 
                              transition={{ duration: 0.3 }} 
                              className={`text-base ${isOpen ? 'text-emerald-400' : 'text-slate-500'}`}
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
                                className="text-base text-slate-300 mt-4 leading-relaxed overflow-hidden relative z-10 border-t border-slate-800/80 pt-3"
                              >
                                {faq.a}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* KONTEN KANAN (BITCOIN 3D SEBAGAI PAJANGAN/DEKORASI - TIDAK BISA DI-OTAK-ATIK & AMAN SCROLLING) */}
        <div className="w-full h-[380px] lg:w-2/5 lg:h-screen relative z-0 pointer-events-none">
          <Canvas className="pointer-events-none" camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
                <CleanBitcoin3D />
              </Float>
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* --- INFINITE MARQUEE PARTNER --- */}
      <div className="w-full bg-[#05070a] border-y border-slate-900 py-4 overflow-hidden relative z-20 group whitespace-nowrap flex">
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