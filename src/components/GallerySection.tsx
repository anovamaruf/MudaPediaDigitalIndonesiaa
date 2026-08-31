'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function GallerySection() {
  return (
    // Diberikan wadah card kontainer bernuansa gelap pekat yang serupa agar memiliki cover kotak yang kontras di mode terang
    <motion.div key={3} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }} transition={{ duration: 0.6 }} className="w-full max-w-4xl pointer-events-auto border rounded-3xl p-8 bg-[#0a0c16] border-slate-800 text-white shadow-2xl">
      <span className="text-xs tracking-widest uppercase block mb-4 text-center font-mono font-bold text-blue-400">GALERI INSTAGRAM</span>
      <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[400px]">
        <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-2 row-span-1 rounded-2xl flex items-center justify-center border font-mono text-xs bg-slate-900 border-slate-800 text-slate-500">Foto 1</motion.div>
        <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="col-span-1 row-span-2 rounded-2xl flex items-center justify-center border font-mono text-xs bg-slate-900 border-slate-800 text-slate-500">Foto 2</motion.div>
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="col-span-1 row-span-1 rounded-2xl flex items-center justify-center border font-mono text-xs bg-slate-900 border-slate-800 text-slate-500">Foto 3</motion.div>
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="col-span-1 row-span-1 rounded-2xl flex items-center justify-center border font-mono text-xs bg-slate-900 border-slate-800 text-slate-500">Foto 4</motion.div>
      </div>
    </motion.div>
  );
}