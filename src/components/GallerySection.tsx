'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { sfx } from '@/utils/soundFX';

export default function GallerySection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div 
      key={3} 
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }} 
      transition={{ duration: 0.6 }} 
      className={`w-full max-w-4xl pointer-events-auto border rounded-3xl p-8 shadow-2xl overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#0a0c16] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
      }`}
    >
      <span className={`text-xs tracking-widest uppercase block mb-4 text-center font-mono font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
        GALERI INSTAGRAM
      </span>
      
      <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[400px] w-full overflow-hidden">
        
        {/* Foto 3 (Pindah ke Atas - Kiri) */}
        <motion.a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={() => sfx.playClick()} 
          initial={{ y: -50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }} 
          className={`col-span-1 row-span-1 rounded-2xl relative overflow-hidden block w-full h-full border cursor-pointer group ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <img 
            src="/images/ig-3.png" 
            alt="Instagram Post 3" 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-[2px] z-10">
            <span className="px-3 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-lg flex items-center gap-1.5">
              Lihat Postingan ↗
            </span>
          </div>
        </motion.a>

        {/* Foto 4 (Pindah ke Atas - Tengah) */}
        <motion.a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={() => sfx.playClick()} 
          initial={{ y: -50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.3 }} 
          className={`col-span-1 row-span-1 rounded-2xl relative overflow-hidden block w-full h-full border cursor-pointer group ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <img 
            src="/images/ig-4.png" 
            alt="Instagram Post 4" 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-[2px] z-10">
            <span className="px-3 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-lg flex items-center gap-1.5">
              Lihat Postingan ↗
            </span>
          </div>
        </motion.a>

        {/* Foto 2 (Tetap di Kanan, Memanjang ke Bawah) */}
        <motion.a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={() => sfx.playClick()} 
          initial={{ x: 50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ delay: 0.4 }} 
          className={`col-span-1 row-span-2 rounded-2xl relative overflow-hidden block w-full h-full border cursor-pointer group ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <img 
            src="/images/ig-2.png" 
            alt="Instagram Post 2" 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-[2px] z-10">
            <span className="px-3 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-lg flex items-center gap-1.5">
              Lihat Postingan ↗
            </span>
          </div>
        </motion.a>

        {/* Foto 1 (Pindah ke Bawah - Memanjang ke Kiri) */}
        <motion.a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={() => sfx.playClick()} 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.5 }} 
          className={`col-span-2 row-span-1 rounded-2xl relative overflow-hidden block w-full h-full border cursor-pointer group ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <img 
            src="/images/ig-1.png" 
            alt="Instagram Post 1" 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-[2px] z-10">
            <span className="px-3 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-lg flex items-center gap-1.5">
              Lihat Postingan ↗
            </span>
          </div>
        </motion.a>

      </div>
    </motion.div>
  );
}