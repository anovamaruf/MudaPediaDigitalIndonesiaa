'use client';

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function Footer({ isDark, logoUrl }: { isDark: boolean; logoUrl: string }) {
  return (
    <footer className={`relative z-10 border-t pt-16 pb-12 px-4 sm:px-6 transition-colors duration-500 ${
      isDark ? 'border-slate-800/80 bg-[#030409]' : 'border-slate-200 bg-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={logoUrl} 
              alt="Muda Pedia Logo" 
              className="w-8 h-8 object-contain" 
            />
            <span className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>Mudapedia Digital Indonesia</span>
          </div>
          <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Mari ciptakan obsesi baru dengan diri kita!
          </p>
          <p className={`text-xs font-semibold ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Senin - Jum'at | 08.00 - 16.00 WIB</p>
        </div>

        <div>
          <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Galeri & Kontak</h4>
          <ul className={`space-y-2.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <li className="flex items-center gap-2"><Phone size={14} className={isDark ? 'text-indigo-400' : 'text-sky-600'} /> Telepon : 0851-1983-6002</li>
            <li className="flex items-center gap-2"><Mail size={14} className={isDark ? 'text-indigo-400' : 'text-sky-600'} /> Email : mudapediadigitalindonesia.com</li>
            <li className="flex items-start gap-2"><MapPin size={14} className={`shrink-0 mt-0.5 ${isDark ? 'text-indigo-400' : 'text-sky-600'}`} /> Banyuwangi<br />Perum Gedong Blok. D No.5 Kertosari, Kec. Banyuwangi, Kabupaten Banyuwangi, Jawa Timur 68418</li>
          </ul>
        </div>

        <div>
          <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Perusahaan</h4>
          <div className={`flex flex-col gap-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <a href="#about" className={isDark ? 'hover:text-white' : 'hover:text-slate-900'}>Tentang Kami</a>
            <a href="#team" className={isDark ? 'hover:text-white' : 'hover:text-slate-900'}>Tim Kami</a>
            <a href="#pricing" className={isDark ? 'hover:text-white' : 'hover:text-slate-900'}>Harga</a>
            <a href="#gallery" className={isDark ? 'hover:text-white' : 'hover:text-slate-900'}>Galeri</a>
          </div>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto border-t pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] ${
        isDark ? 'border-slate-900 text-slate-500' : 'border-slate-200 text-slate-500'
      }`}>
        <p>© 2026 MudaPedia. All rights reserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <div className={`cursor-pointer ${isDark ? 'hover:text-slate-300' : 'hover:text-slate-900'}`}><LinkedinIcon /></div>
          <div className={`cursor-pointer ${isDark ? 'hover:text-slate-300' : 'hover:text-slate-900'}`}><InstagramIcon /></div>
        </div>
      </div>
    </footer>
  );
}