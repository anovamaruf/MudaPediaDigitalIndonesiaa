'use client';

import React from 'react';

const InstagramIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

interface FooterProps {
  isDark: boolean;
  logoUrl?: string;
}

export default function Footer({ isDark, logoUrl }: FooterProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={`relative z-10 border-t ${isDark ? 'bg-[#050714] border-slate-800/80 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* LOGO & BRAND SLOGAN */}
          <div>
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="flex items-center gap-3 cursor-pointer group w-fit mb-3"
            >
              <img 
                src={logoUrl || "/mudapedia-logo.png"} 
                alt="Mudapedia Logo" 
                className="w-10 h-10 object-contain transition-transform group-hover:scale-105" 
              />
              <span className={`font-extrabold text-lg sm:text-xl tracking-tight transition-colors ${isDark ? 'text-white group-hover:text-indigo-400' : 'text-slate-900 group-hover:text-sky-600'}`}>
                Mudapedia Digital Indonesia
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Mari ciptakan obsesi baru dengan diri kita!
            </p>

            <div className="mt-4 text-xs font-semibold">
              <p className={isDark ? 'text-slate-300' : 'text-slate-800'}>Senin – Jum&#39;at</p>
              <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>08.00 – 16.00 WIB</p>
            </div>
          </div>

          {/* KONTAK & ALAMAT */}
          <div>
            <h4 className={`font-bold text-sm mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Galeri &amp; Kontak</h4>
            
            <div className="space-y-2 text-xs">
              <p>
                Telepon :{' '}
                <a 
                  href="https://wa.me/6285119836002" 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`font-medium transition-colors hover:underline ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-sky-600 hover:text-sky-700'}`}
                >
                  0851-1983-6002
                </a>
              </p>

              <p>
                Email :{' '}
                <a 
                  href="mailto:mudapediadigitalindonesia.com" 
                  className={`font-medium transition-colors hover:underline ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-sky-600 hover:text-sky-700'}`}
                >
                  mudapediadigitalindonesia.com
                </a>
              </p>

              <div className="mt-3">
                <p className={`font-semibold mb-0.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Banyuwangi</p>
                <a 
                  href="https://maps.google.com/?q=Perum+Gedong+Blok+D+No.+5+Kertosari+Banyuwangi" 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`leading-relaxed inline-block transition-colors hover:underline ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Perum Gedong Blok. D No.5<br />
                  Kertosari, Kec. Banyuwangi, Kabupaten<br />
                  Banyuwangi, Jawa Timur 68418
                </a>
              </div>
            </div>
          </div>

          {/* NAVIGASI PERUSAHAAN */}
          <div>
            <h4 className={`font-bold text-sm mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Perusahaan</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className={`transition-colors hover:underline ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Tentang Kami
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('team')} 
                  className={`transition-colors hover:underline ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Tim Kami
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className={`transition-colors hover:underline ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Harga
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('gallery')} 
                  className={`transition-colors hover:underline ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Galeri
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* BARIS BOTTOM BAR: PRESISI GRID 3 KOLOM */}
        <div className={`pt-6 border-t grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-xs ${isDark ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-500'}`}>
          
          {/* Kolom 1 (Kiri) - Penyeimbang alignment */}
          <div className="hidden md:block"></div>

          {/* Kolom 2 (Tengah) - Teks Copyright Pas di Center */}
          <div className="text-center">
            <span 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className={`cursor-pointer transition-colors hover:underline ${isDark ? 'hover:text-slate-300' : 'hover:text-slate-800'}`}
            >
              &copy; 2026 MudaPedia. All rights reserved.
            </span>
          </div>

          {/* Kolom 3 (Kanan) - Ikon Sosmed di Kanan Layar */}
          <div className="flex items-center justify-center md:justify-end gap-4">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LinkedIn Mudapedia"
              className={`transition-colors p-1.5 rounded-lg ${isDark ? 'hover:text-white hover:bg-slate-800' : 'hover:text-slate-900 hover:bg-slate-200'}`}
            >
              <LinkedinIcon />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram Mudapedia"
              className={`transition-colors p-1.5 rounded-lg ${isDark ? 'hover:text-white hover:bg-slate-800' : 'hover:text-slate-900 hover:bg-slate-200'}`}
            >
              <InstagramIcon />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}