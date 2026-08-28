'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { sfx } from '@/utils/soundFX';

export default function AboutSection() {
  return (
    <motion.div key={0} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }} transition={{ duration: 0.6 }} className="w-full max-w-5xl pointer-events-auto">
      <span className="text-xs text-emerald-400 tracking-widest uppercase block mb-4">// SECTION 01 - TENTANG KAMI</span>
      
      {/* Bento Grid Layout Modern */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Main Statement (Spans 2 columns) */}
        <div 
          onClick={() => sfx.playClick()}
          className="md:col-span-2 bg-[#0a0c16] border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-xl"
        >
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-2">Pionir Web3 Nusantara</span>
            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              Membangun Infrastruktur Desentralisasi Masa Depan
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-4">
            Berpusat di Banyuwangi, misi kami adalah mempercepat adopsi teknologi desentralisasi melalui solusi yang inovatif, aman, dan terukur.
          </p>
        </div>

        {/* Card 2: Location / Hub */}
        <div 
          onClick={() => sfx.playClick()}
          className="bg-[#0a0c16] border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-xl"
        >
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-2">Global Hub</span>
            <h3 className="text-lg font-bold text-white">Banyuwangi, ID</h3>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono">NODE LOC // 08.25° S</span>
            <span className="text-emerald-400 text-xs">🌐</span>
          </div>
        </div>

        {/* Card 3: Core Focus */}
        <div 
          onClick={() => sfx.playClick()}
          className="bg-[#0a0c16] border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-xl"
        >
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-2">Core Focus</span>
            <h3 className="text-sm font-bold text-white uppercase">Smart Contract & dApps</h3>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
            Audit keamanan EVM, optimasi gas fee, dan arsitektur dApps berkinerja tinggi.
          </p>
        </div>

        {/* Card 4: Aesthetic & Standard (Spans 2 columns) */}
        <div 
          onClick={() => sfx.playClick()}
          className="md:col-span-2 bg-[#0a0c16] border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 sm:p-8 transition-all duration-300 flex items-center justify-between group cursor-pointer shadow-xl"
        >
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Awwwards Aesthetic</span>
            <h3 className="text-sm sm:text-base font-bold text-white">Performa & Estetika Tanpa Kompromi</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm shrink-0 group-hover:scale-105 transition-transform">
            v2.0
          </div>
        </div>

      </div>
    </motion.div>
  );
}