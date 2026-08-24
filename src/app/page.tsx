'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

import Navbar from '@/components/Navbar';
import SplashScene from '@/components/SplashScene';
import TopSection from '@/components/TopSection';
import CoreEngineSection from '@/components/CoreEngineSection';
import CryptoCalculator from '@/components/CryptoCalculator';
import CryptoGlossary from '@/components/CryptoGlossary'; 
import CryptoClimbGame from '@/components/CryptoClimbGame';
import FooterSection from '@/components/FooterSection';
import Web3AIAssistant from '@/components/Web3AIAssistant';

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

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

// Komponen Pembungkus Efek Sihir / Cinematic Fantasy Dissolve saat Scroll Natural
function FantasySectionWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-15% 0px -15% 0px", amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70, scale: 0.95, filter: "blur(16px)" }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : { opacity: 0.1, y: -40, scale: 0.95, filter: "blur(16px)" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCoreTab, setSelectedCoreTab] = useState(0);

  return (
    <main className="bg-[#030406] min-h-screen selection:bg-emerald-500 selection:text-black overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <SplashScene onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative w-full">
          <Navbar />

          {/* 1. LANDING PAGE (TOP SECTION) */}
          <TopSection />

          {/* 2. KALKULATOR CRYPTO DENGAN EFEK FANTASI */}
          <FantasySectionWrapper className="py-20 px-6 sm:px-12 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] font-mono text-emerald-400 tracking-[0.3em] uppercase block mb-2">
                [SIMULASI PORTOFOLIO]
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Kalkulator Pintar Aset Web3
              </h2>
            </div>
            <CryptoCalculator />
          </FantasySectionWrapper>

          {/* 3. KAMUS SANTAI DENGAN EFEK FANTASI */}
          <FantasySectionWrapper className="py-20 px-6 sm:px-12 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] font-mono text-emerald-400 tracking-[0.3em] uppercase block mb-2">
                [EDUKASI DESENTRALISASI]
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Kamus Santai Blockchain
              </h2>
            </div>
            <CryptoGlossary />
          </FantasySectionWrapper>

          {/* 4. CORE ENGINE */}
          <FantasySectionWrapper className="py-10">
            <CoreEngineSection activeMenu={selectedCoreTab} setActiveMenu={setSelectedCoreTab} />
          </FantasySectionWrapper>

          {/* 5. TRACK RECORD, GAME & FOOTER */}
          <FantasySectionWrapper className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
              
              {/* SISI KIRI: Statistik Performa */}
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-[10px] font-bold tracking-widest mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    MUDAPEDIA TRACK RECORD
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    Dipercaya oleh Ratusan Proyek Web3 Global
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-2">
                    Komitmen kami dalam menghadirkan ekosistem desentralisasi yang aman, legal, dan profesional tercermin langsung dari pencapaian dan kepuasan klien kami.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 shadow-lg text-center">
                    <span className="block text-2xl sm:text-3xl font-black text-emerald-400">
                      <AnimatedCounter target={150} suffix="+" />
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1 block">Total Proyek</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 shadow-lg text-center">
                    <span className="block text-2xl sm:text-3xl font-black text-emerald-400">
                      <AnimatedCounter target={99} suffix="%" />
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1 block">Rate Kepuasan</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 shadow-lg text-center col-span-2 sm:col-span-1">
                    <span className="block text-2xl sm:text-3xl font-black text-emerald-400">
                      <AnimatedCounter target={48} suffix="M+" />
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1 block">Volume Transaksi</span>
                  </div>
                </div>
              </div>

              {/* SISI KANAN: Mini Game Pendakian Crypto */}
              <div className="flex justify-end w-full">
                <CryptoClimbGame />
              </div>

            </div>
          </FantasySectionWrapper>

          {/* FOOTER & AI ASSISTANT */}
          <FooterSection />
          <Web3AIAssistant />
        </div>
      )}
    </main>
  );
}