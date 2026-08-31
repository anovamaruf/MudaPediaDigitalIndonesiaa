'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function AboutSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div 
      key={0} 
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }} 
      transition={{ duration: 0.6 }} 
      className="w-full max-w-5xl px-4 pointer-events-auto"
    >
      <div className="text-center mb-8">
        <h2 className={`text-3xl sm:text-4xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Tentang Kami
        </h2>
      </div>
      
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl border ${
        isDark ? 'bg-[#0a0c16]/90 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-slate-200'
      }`}>
        
        <div className={`lg:col-span-6 relative h-[250px] sm:h-[320px] w-full rounded-2xl overflow-hidden border shadow-lg flex items-center justify-center ${
          isDark ? 'bg-[#060812] border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <img 
            src="/city.webp" 
            alt="PT Mudapedia City Skyline" 
            className="w-full h-full object-cover opacity-90"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
            }}
          />
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-tr pointer-events-none ${
            isDark ? 'from-slate-950 via-slate-900 to-blue-950/40' : 'from-blue-50 via-white to-blue-100'
          }`}>
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-3 text-xl shadow-lg ${
              isDark ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-blue-100 border-blue-300 text-blue-600'
            }`}>
              🏙️
            </div>
            <span className={`text-xs font-mono uppercase tracking-widest font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>PT Mudapedia Digital Indonesia</span>
            <span className={`text-[10px] font-mono mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Banyuwangi — Global Hub</span>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6 font-mono">
          <div className="space-y-2">
            <h3 className={`text-sm sm:text-base font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`} />
              Visi
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Kami menjadi Perusahaan Digital Agency yang terdepan dalam membantu para pebisnis mengembangkan usahanya.
            </p>
          </div>

          <div className={`space-y-2 pt-4 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
            <h3 className={`text-sm sm:text-base font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`} />
              Misi
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Memahami bahwa era digital telah membuka pintu menuju peluang yang tak terbatas, dan kami hadir sebagai solusi yang cerdas dan terpercaya untuk membantu Anda mengembangkan bisnis dalam dunia yang terus berubah. Sebagai perusahaan inovatif, kami menawarkan rangkaian layanan yang dirancang khusus untuk memenuhi kebutuhan bisnis modern.
            </p>
          </div>

        </div>

      </div>
    </motion.div>
  );
}