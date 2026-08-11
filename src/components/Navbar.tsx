'use client';

import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030406]/80 backdrop-blur-md border-b border-slate-900 px-6 sm:px-12 py-4 flex items-center justify-between font-mono">
      <div className="flex items-center gap-3">
        {/* Pastikan file mudapedia-logo.webp ada di folder public */}
        <img src="/mudapedia-logo.webp" alt="Logo Mudapedia" className="w-8 h-8 object-contain" />
        <span className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase">Mudapedia Digital Indonesia</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-xs text-slate-400 font-bold">
        <span className="hover:text-emerald-400 cursor-pointer transition-colors">TIM KAMI</span>
        <span className="hover:text-emerald-400 cursor-pointer transition-colors">GALERI</span>
        <span className="hover:text-emerald-400 cursor-pointer transition-colors">HARGA</span>
        <span className="hover:text-emerald-400 cursor-pointer transition-colors">TENTANG KAMI</span>
      </div>
      <button className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold hover:opacity-95 transition-opacity">
        Konsultasi
      </button>
    </nav>
  );
}