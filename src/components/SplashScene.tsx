'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SplashScene({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-[#030406] flex flex-col items-center justify-center font-mono"
    >
      <div className="relative flex flex-col items-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-20 h-20 border-t-2 border-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        />
        <img 
          src="/mudapedia-logo.webp" 
          alt="Logo" 
          className="absolute w-10 h-10 m-auto inset-0 object-contain" 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-6 text-center"
      >
        <h2 className="text-white text-sm font-bold tracking-widest uppercase">Mudapedia Digital Indonesia</h2>
        <p className="text-slate-400 text-xs font-mono mt-1">Memuat Ekosistem Digital...</p>
      </motion.div>
    </motion.div>
  );
}