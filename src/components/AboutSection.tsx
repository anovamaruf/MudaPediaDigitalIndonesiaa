'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function AboutSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      transition={{ duration: 0.5 }} 
      className="w-full flex flex-col h-full font-mono"
    >
      <div className="mb-6">
        <h3 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Tentang Kami
        </h3>
      </div>
      
      <div className={`rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl border flex-1 flex flex-col justify-between ${
        isDark ? 'bg-[#0a0c16]/90 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-slate-100'
      }`}>
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className={`text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`} />
              Visi
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Kami menjadi Perusahaan Digital Agency yang terdepan dalam membantu para pebisnis mengembangkan usahanya.
            </p>
          </div>

          <div className={`space-y-2 pt-5 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
            <h4 className={`text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`} />
              Misi
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Memahami bahwa era digital telah membuka pintu menuju peluang yang tak terbatas, dan kami hadir sebagai solusi yang cerdas dan terpercaya untuk membantu Anda mengembangkan bisnis dalam dunia yang terus berubah. Sebagai perusahaan inovatif, kami menawarkan rangkaian layanan yang dirancang khusus untuk memenuhi kebutuhan bisnis modern.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}