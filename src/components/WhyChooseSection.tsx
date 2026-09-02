'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function WhyChooseSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const advantages = [
    { title: "Teknologi Terdepan", desc: "Arsitektur Blockchain & Web3 terbaru yang aman, cepat, dan scalable.", icon: "⚡" },
    { title: "Aman & Terpercaya", desc: "Sistem keamanan berlapis dengan smart contract terverifikasi.", icon: "🛡️" },
    { title: "Performa Optimal", desc: "Infrastruktur digital berkecepatan tinggi untuk pertumbuhan jangka panjang.", icon: "🚀" },
    { title: "Solusi Kustom", desc: "Dirancang spesifik mengikuti kebutuhan korporasi dan skala proyek.", icon: "🧩" },
    { title: "Support 24/7", desc: "Dukungan teknis profesional siap siaga mendampingi operasional.", icon: "🎧" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }} 
      className="w-full flex flex-col h-full font-mono"
    >
      <div className="mb-6">
        <h3 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Kenapa Sih Harus Memilih Mudapedia?
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 items-stretch">
        {advantages.map((item, idx) => (
          <div 
            key={idx}
            className={`group relative rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between shadow-lg backdrop-blur-md overflow-hidden border ${
              isDark ? 'bg-[#0a0c16]/95 border-slate-800/80 hover:border-blue-500/60' : 'bg-slate-50 border-slate-200 hover:border-blue-500/50 shadow-slate-100'
            } ${idx === 4 ? 'sm:col-span-2' : ''}`}
          >
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center text-sm group-hover:scale-110 transition-transform ${
                  isDark ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'
                }`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>0{idx + 1}</span>
              </div>

              <div className="space-y-1">
                <h4 className={`text-xs sm:text-sm font-bold tracking-wide group-hover:text-blue-500 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.title}
                </h4>
                <p className={`text-[11px] sm:text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {item.desc}
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}