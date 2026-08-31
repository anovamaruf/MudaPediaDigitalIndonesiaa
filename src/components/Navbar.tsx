'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b px-6 sm:px-12 py-4 flex items-center justify-between font-mono transition-colors ${
      isDark ? 'bg-[#030406]/80 border-slate-900 text-white' : 'bg-[#060712]/80 border-slate-800 text-slate-100'
    }`}>
      <div className="flex items-center gap-3">
        <img src="/mudapedia-logo.webp" alt="Logo Mudapedia" className="w-8 h-8 object-contain" />
        <span className={`font-bold text-xs sm:text-sm tracking-wider uppercase ${isDark ? 'text-white' : 'text-slate-100'}`}>
          Mudapedia Digital Indonesia
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* TOMBOL PENGALIH TEMA */}
        <button
          onClick={toggleTheme}
          className="px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 shadow-md transition-all cursor-pointer bg-slate-900 border-slate-700 text-yellow-400 hover:bg-slate-800"
        >
          <span>{isDark ? '☀️ Light' : '🌙 Dark'}</span>
        </button>

        {/* TOMBOL KONSULTASI DENGAN GRADIENT LOGO MUDAPEDIA */}
        <button className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-xs font-bold hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(56,189,248,0.3)] cursor-pointer">
          Konsultasi
        </button>
      </div>
    </nav>
  );
}