'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, useInView } from 'framer-motion';

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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-[#030406] min-h-screen selection:bg-emerald-500 selection:text-black">
      <AnimatePresence mode="wait">
        {isLoading && <SplashScene onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="scroll-smooth">
          <Navbar />
          <TopSection />
          <CryptoCalculator />
          <CryptoGlossary />
          <CoreEngineSection />
          
          {/* Mini-Game & Live Metrics Section - Layout 2 Kolom */}
          <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-[#030406]">
            
            {/* SISI KIRI: Statistik Performa & Testimoni Berbasis Animasi Scroll */}
            <div className="space-y-6">
              <div>
                {/* TAG PILL DISAMAKAN DENGAN KAMUS SANTAI */}
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

              {/* Grid Statistik Angka Animasi */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                
                {/* Total Proyek */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 shadow-lg text-center">
                  <span className="block text-2xl sm:text-3xl font-black text-emerald-400">
                    <AnimatedCounter target={150} suffix="+" />
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1 block">Total Proyek</span>
                </div>

                {/* Rate Testimoni / Kepuasan */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 shadow-lg text-center">
                  <span className="block text-2xl sm:text-3xl font-black text-emerald-400">
                    <AnimatedCounter target={99} suffix="%" />
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1 block">Rate Kepuasan</span>
                </div>

                {/* Klien Sukses */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 shadow-lg text-center col-span-2 sm:col-span-1">
                  <span className="block text-2xl sm:text-3xl font-black text-emerald-400">
                    <AnimatedCounter target={48} suffix="M+" />
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1 block">Volume Transaksi</span>
                </div>

              </div>
            </div>

            {/* SISI KANAN: Game Diposisikan Lebih Kecil & Rapi */}
            <div className="flex justify-end w-full">
              <CryptoClimbGame />
            </div>

          </section>

          <FooterSection />
          
          <Web3AIAssistant />
        </div>
      )}
    </main>
  );
}