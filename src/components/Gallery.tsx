'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Gallery({ isDark }: { isDark: boolean }) {
  return (
    <section id="gallery" className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <h2 className={`text-3xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Galeri Instagram</h2>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Aktivitas & Edukasi Konten Media Sosial Muda Pedia</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className={`md:col-span-2 border rounded-3xl p-6 sm:p-8 flex flex-col justify-end min-h-[240px] shadow-xl ${
          isDark ? 'bg-gradient-to-br from-indigo-900/40 to-slate-900 border-slate-800' : 'bg-gradient-to-br from-sky-50 to-indigo-50 border-slate-200 shadow-slate-200'
        }`}>
          <span className={`text-xs font-bold mb-2 uppercase tracking-wider ${isDark ? 'text-indigo-400' : 'text-sky-600'}`}>Edukasi Web3</span>
          <h3 className={`text-lg sm:text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Potensi Pertumbuhan (Return) yang Tinggi & Akses Likuiditas Global 24/7</h3>
        </div>
        <div className={`border rounded-3xl p-6 sm:p-8 flex flex-col justify-end min-h-[240px] shadow-xl ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-slate-200'
        }`}>
          <span className={`text-xs font-bold mb-2 uppercase tracking-wider ${isDark ? 'text-purple-400' : 'text-indigo-600'}`}>Kuis Interaktif</span>
          <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Kalau Dompet Crypto itu mirip dengan... ??</h3>
        </div>
      </motion.div>
    </section>
  );
}