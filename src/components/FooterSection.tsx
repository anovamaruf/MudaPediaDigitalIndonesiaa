'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function FooterSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`w-full py-16 px-6 sm:px-12 lg:px-24 flex flex-col justify-center border-t font-mono transition-colors ${
      isDark ? 'bg-[#030406] border-slate-900 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div>
          <h3 className={`text-xl font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <span className={`text-2xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>M</span> Mudapedia Digital Indonesia
          </h3>
          <p className="text-xs mt-4">Mari ciptakan obsesi baru dengan diri kita!</p>
          <div className="mt-8">
            <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Senin - Jum'at</p>
            <p className="text-xs mt-1">08.00 - 16.00 WIB</p>
          </div>
        </div>
        <div>
          <h4 className={`text-sm font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Galeri & Kontak</h4>
          <p className="text-xs mb-2">Telepon : <span className={isDark ? 'text-blue-400 font-bold' : 'text-blue-600 font-bold'}>0851-1983-6002</span></p>
          <p className="text-xs mb-6">Email : <span className={isDark ? 'text-blue-400 font-bold' : 'text-blue-600 font-bold'}>mudapediadigitalindonesia.com</span></p>
          <h4 className={`text-sm font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Banyuwangi</h4>
          <p className="text-xs leading-relaxed">Perum Gedong Blok. D No.5<br/>Kertosari, Kec. Banyuwangi, Kabupaten<br/>Banyuwangi, Jawa Timur 68418</p>
        </div>
        <div>
          <h4 className={`text-sm font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Perusahaan</h4>
          <ul className="text-xs space-y-3">
            <li className={`cursor-pointer transition-colors ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>Tentang Kami</li>
            <li className={`cursor-pointer transition-colors ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>Tim Kami</li>
            <li className={`cursor-pointer transition-colors ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>Harga</li>
            <li className={`cursor-pointer transition-colors ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>Galeri</li>
          </ul>
        </div>
      </div>
      <div className={`pt-8 border-t flex justify-between items-center text-[10px] ${isDark ? 'border-slate-900 text-slate-600' : 'border-slate-200 text-slate-500'}`}>
        <p>&copy; 2026 MudaPedia. All rights reserved.</p>
        <div className={`flex gap-4 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          <span className={`cursor-pointer ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>in</span>
          <span className={`cursor-pointer ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>ig</span>
        </div>
      </div>
    </footer>
  );
}