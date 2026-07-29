'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  logoUrl: string;
}

export default function Navbar({ isDark, toggleTheme, logoUrl }: NavbarProps) {
  return (
    <nav className={`border-b backdrop-blur-2xl fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 shadow-xl transition-colors duration-500 ${
      isDark ? 'border-slate-800/80 bg-[#050711]/85' : 'border-slate-200 bg-white/85'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src={logoUrl} 
            alt="Muda Pedia Logo" 
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-[0_0_12px_rgba(99,102,241,0.6)]" 
          />
          <span className={`font-extrabold text-xs sm:text-base tracking-tight bg-gradient-to-r bg-clip-text text-transparent ${
            isDark ? 'from-white via-slate-200 to-indigo-300' : 'from-slate-900 via-slate-800 to-sky-600'
          }`}>
            Mudapedia Digital Indonesia
          </span>
        </div>

        <div className={`hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          {[
            { name: "Tim Kami", href: "#team" },
            { name: "Galeri", href: "#gallery" },
            { name: "Harga", href: "#pricing" },
            { name: "Tentang Kami", href: "#about" }
          ].map((menu, idx) => (
            <motion.a
              key={idx}
              href={menu.href}
              whileHover={{ scale: 1.08, z: 20 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className={`relative py-1 transition-colors group inline-block ${isDark ? 'hover:text-white' : 'hover:text-sky-600'}`}
            >
              {menu.name}
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r rounded-full group-hover:w-full transition-all duration-300 ${
                isDark ? 'from-indigo-500 to-purple-500' : 'from-sky-500 to-indigo-600'
              }`} />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              isDark ? 'bg-slate-800/80 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            title="Ganti Tema Terang/Gelap"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#pricing" 
            className={`font-bold text-[11px] sm:text-xs px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg transition-all ${
              isDark 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/25' 
                : 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-sky-600/25'
            }`}
          >
            Konsultasi
          </motion.a>
        </div>
      </div>
    </nav>
  );
}