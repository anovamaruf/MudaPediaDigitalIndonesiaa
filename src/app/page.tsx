'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

import Navbar from '@/components/Navbar';
import SplashScene from '@/components/SplashScene';
import TopSection from '@/components/TopSection';
import AboutSection from '@/components/AboutSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import CoreEngineSection from '@/components/CoreEngineSection';
import CryptoGlossary from '@/components/CryptoGlossary'; 
import CryptoClimbGame from '@/components/CryptoClimbGame';
import TestimonialsSection from '@/components/TestimonialsSection';
import FooterSection from '@/components/FooterSection';
import Web3AIAssistant from '@/components/Web3AIAssistant';
import { useTheme } from '@/context/ThemeContext';

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

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isLoading, setIsLoading] = useState(true);
  const [selectedCoreTab, setSelectedCoreTab] = useState(0);

  return (
    <main className={`min-h-screen selection:bg-blue-500 selection:text-white overflow-x-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#030406] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <AnimatePresence mode="wait">
        {isLoading && <SplashScene onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative w-full flex flex-col">
          <Navbar />

          {/* =========================================================
              HALAMAN 1: LANDING HERO + TRACK RECORD
             ========================================================= */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full min-h-screen flex flex-col justify-between pt-20 pb-10"
          >
            <TopSection />
          </motion.section>

          {/* =========================================================
              HALAMAN 2: TENTANG KAMI & WHY CHOOSE US
             ========================================================= */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`w-full py-16 px-6 sm:px-12 border-b ${isDark ? 'border-slate-900' : 'border-slate-200'}`}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-5 flex">
                <AboutSection />
              </div>
              <div className="lg:col-span-7 flex">
                <WhyChooseSection />
              </div>
            </div>
          </motion.section>

          {/* =========================================================
              HALAMAN 3: CORE ENGINE (PAKET, TIM, GALERI)
             ========================================================= */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full"
          >
            <CoreEngineSection activeMenu={selectedCoreTab} setActiveMenu={setSelectedCoreTab} />
          </motion.div>

          {/* =========================================================
              HALAMAN 4: KAMUS SANTAI BLOCKCHAIN
             ========================================================= */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`w-full py-20 px-6 sm:px-12 border-b ${isDark ? 'border-slate-900' : 'border-slate-200'}`}
          >
            <div className="max-w-5xl mx-auto text-center">
              <div className="mb-10">
                <span className={`text-[11px] font-mono tracking-[0.3em] uppercase block mb-2 font-bold ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                </span>
                <h2 className={`text-3xl sm:text-5xl font-black uppercase tracking-tight mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Kamus Santai Blockchain
                </h2>
                <p className={`text-xs sm:text-sm max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Gak usah bingung sama istilah gaul teknologi, cari artinya di sini dengan bahasa yang gampang dimengerti.
                </p>
              </div>
              <div className="text-left">
                <CryptoGlossary />
              </div>
            </div>
          </motion.section>

          {/* =========================================================
              HALAMAN 5: TESTIMONI MITRA & GAME
             ========================================================= */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full py-16 px-6 sm:px-12 max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Kolom Kiri: Testimoni Mitra */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <TestimonialsSection />
              </div>
              
              {/* Kolom Kanan: Game Crypto Climb */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="w-full">
                  <div className="text-center mb-4">
                  </div>
                  <div className="w-full flex items-center justify-center">
                    <CryptoClimbGame />
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* =========================================================
              FOOTER & AI ASSISTANT
             ========================================================= */}
          <FooterSection />
          <Web3AIAssistant />
        </div>
      )}
    </main>
  );
}