'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function WhyChooseSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const advantages = [
    { title: "Teknologi Terdepan", desc: "Menggunakan arsitektur Blockchain & Web3 terbaru yang aman, cepat, dan scalable.", icon: "⚡" },
    { title: "Aman & Terpercaya", desc: "Sistem keamanan berlapis dengan smart contract yang telah terverifikasi ketat.", icon: "🛡️" },
    { title: "Performa Optimal", desc: "Infrastruktur digital berkecepatan tinggi untuk pertumbuhan jangka panjang.", icon: "🚀" },
    { title: "Solusi Kustom", desc: "Dirancang secara spesifik mengikuti kebutuhan korporasi dan skala proyek Anda.", icon: "🧩" },
    { title: "Support 24/7", desc: "Dukungan teknis profesional siap siaga mendampingi operasional Anda kapan pun.", icon: "🎧" }
  ];

  return (
    <section className={`w-full py-20 sm:py-28 px-4 sm:px-8 lg:px-16 border-b relative overflow-hidden font-mono transition-colors ${
      isDark ? 'bg-[#030406] border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-14 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter">
            Kenapa Harus Memilih <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>Mudapedia?</span>
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Kami menghadirkan solusi digital berbasis Web3 dan Blockchain dengan standar teknologi korporat masa depan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`group relative rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between shadow-xl backdrop-blur-md overflow-hidden border ${
                isDark ? 'bg-[#070913]/90 border-slate-800/80 hover:border-blue-500/60' : 'bg-slate-50 border-slate-200 hover:border-blue-500/50 shadow-slate-100'
              } ${idx >= 3 ? 'lg:col-span-1' : ''}`}
            >
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center text-lg group-hover:scale-110 transition-transform ${
                    isDark ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'
                  }`}>
                    {item.icon}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold tracking-wide group-hover:text-blue-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}