'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LogoMarquee from '@/components/LogoMarquee';
import Pricing from '@/components/Pricing';
import About from '@/components/About';
import Team from '@/components/Team';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDark, setIsDark] = useState<boolean>(true);
  const logoUrl = "/mudapedia-logo.png";

  useEffect(() => {
    const savedTheme = localStorage.getItem('mudapedia_theme');
    if (savedTheme === 'light') {
      setIsDark(false);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    localStorage.setItem('mudapedia_theme', nextTheme ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden pt-20 ${
      isDark ? 'bg-[#050711] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      

      {/* CSS KEYFRAMES UNTUK SMOOTH MARQUEE */}
      <style jsx global>{`
        @keyframes smoothMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-smooth-marquee {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: smoothMarquee 25s linear infinite;
        }
      `}</style>
      
      {/* --- FULLSCREEN CLEAN TRANSPARENT LOADING --- */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`fixed inset-0 z-[9999] backdrop-blur-sm flex items-center justify-center pointer-events-auto ${
              isDark ? 'bg-[#050711]/75' : 'bg-white/75'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full border-4 animate-spin ${isDark ? 'border-indigo-500/20 border-t-indigo-500' : 'border-sky-500/20 border-t-sky-500'}`} />
                <img src={logoUrl} alt="Logo" className="w-10 h-10 object-contain animate-pulse" />
              </div>
              <div className="text-center">
                <p className={`text-sm font-extrabold tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>Mudapedia Digital Indonesia</p>
                <p className={`text-xs font-medium mt-1 ${isDark ? 'text-indigo-400' : 'text-sky-600'}`}>Memuat Ekosistem Digital...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Ambient Blur */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[140px] ${isDark ? 'bg-indigo-600/20' : 'bg-sky-400/15'}`} />
        <div className={`absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full blur-[140px] ${isDark ? 'bg-purple-600/15' : 'bg-indigo-400/10'}`} />
        <div className={`absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px] ${isDark ? 'bg-blue-600/15' : 'bg-purple-400/10'}`} />
      </div>

      <Navbar isDark={isDark} toggleTheme={toggleTheme} logoUrl={logoUrl} />
      <Hero isDark={isDark} />
      <LogoMarquee isDark={isDark} />
      <Pricing isDark={isDark} />
      <About isDark={isDark} />
      <Team isDark={isDark} />
      <Gallery isDark={isDark} />
      <Footer isDark={isDark} logoUrl={logoUrl} />

    </div>
  );
}