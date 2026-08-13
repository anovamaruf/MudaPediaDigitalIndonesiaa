'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PricingSection from '@/components/PricingSection'; // <-- Diimpor ke sini

const menuList = ["Tentang Kami", "Paket", "Tim Kami", "Galeri"];
const ANGLE_STEP = 35;
const RADIUS = 380;

export default function CoreEngineSection() {
  const [activeMenu, setActiveMenu] = useState(0);
  const isAnimating = useRef(false);
  const [dragStartY, setDragStartY] = useState<number | null>(null);

  const changeMenu = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= menuList.length || isAnimating.current) return;
    isAnimating.current = true;
    setActiveMenu(newIndex);
    setTimeout(() => (isAnimating.current = false), 800);
  };

  const handlePointerDown = (e: React.PointerEvent) => setDragStartY(e.clientY);
  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartY === null) return;
    const diff = dragStartY - e.clientY;
    
    if (diff > 30) { 
      changeMenu(activeMenu + 1); 
      setDragStartY(e.clientY); 
    } else if (diff < -30) { 
      changeMenu(activeMenu - 1); 
      setDragStartY(e.clientY); 
    }
  };
  const handlePointerUp = () => setDragStartY(null);

  return (
    <section id="pricing-section" className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-[#030406] font-mono text-white select-none border-b border-slate-900 flex flex-col justify-center pt-20 lg:pt-0">
      
      {/* MOBILE NAVIGATION TABS */}
      <div className="sm:hidden absolute top-4 left-0 w-full px-4 z-50 pointer-events-auto">
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-2 flex items-center justify-between shadow-2xl">
          {menuList.map((menu, i) => (
            <button
              key={i}
              onClick={() => changeMenu(i)}
              className={`flex-1 py-2.5 mx-0.5 text-[10px] font-bold rounded-xl transition-all ${
                activeMenu === i 
                  ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                  : 'text-slate-400 hover:text-white bg-slate-800/40'
              }`}
            >
              {menu.replace("Kami", "").trim()}
            </button>
          ))}
        </div>
      </div>

      {/* KONTEN TENGAH */}
      <div className="relative z-10 w-full flex items-center justify-start pl-6 sm:pl-24 lg:pl-32 p-6 sm:p-12 pointer-events-none my-auto pb-12 lg:pb-12">
        <AnimatePresence mode="wait">
          
          {/* TENTANG KAMI */}
          {activeMenu === 0 && (
            <motion.div key={0} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }} transition={{ duration: 0.6 }} className="max-w-2xl text-left pointer-events-auto">
              <span className="text-xs text-emerald-400 tracking-widest uppercase block mb-4">// SECTION 01</span>
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-white mb-6">Tentang Kami</h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">Kami adalah pionir dalam membangun ekosistem Web3 di Indonesia. Berpusat di Banyuwangi, misi kami adalah mempercepat adopsi teknologi desentralisasi melalui solusi yang inovatif dan terukur.</p>
            </motion.div>
          )}

          {/* PAKET (Dipanggil dari komponen terpisah PricingSection) */}
          {activeMenu === 1 && (
            <motion.div key={1} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }} transition={{ duration: 0.6 }} className="w-full max-w-5xl pointer-events-auto">
              <PricingSection />
            </motion.div>
          )}

          {/* TIM KAMI */}
          {activeMenu === 2 && (
            <motion.div key={2} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }} transition={{ duration: 0.6 }} className="w-full max-w-4xl pointer-events-auto">
              <span className="text-xs text-emerald-400 tracking-widest uppercase block mb-4">// SECTION 03 - TIM & TALENTA</span>
              <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="bg-[#0a0c16] border border-slate-800 rounded-3xl p-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['Siti Nurhaliza', 'Ahmad Rizky', 'Budi Santoso', 'Dina Surya'].map((nama, idx) => (
                    <motion.div key={idx} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + (idx * 0.1), type: 'spring' }} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                      <div className="w-16 h-16 bg-slate-800 rounded-full mx-auto mb-3" />
                      <h4 className="text-xs font-bold text-white">{nama}</h4>
                      <p className="text-[9px] text-emerald-400 mt-1">Web3 Developer</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* GALERI */}
          {activeMenu === 3 && (
            <motion.div key={3} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }} transition={{ duration: 0.6 }} className="w-full max-w-4xl pointer-events-auto">
              <span className="text-xs text-emerald-400 tracking-widest uppercase block mb-4 text-center">// SECTION 04 - GALERI INSTAGRAM</span>
              <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[400px]">
                <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-2 row-span-1 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500">Foto 1</motion.div>
                <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="col-span-1 row-span-2 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500">Foto 2</motion.div>
                <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="col-span-1 row-span-1 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500">Foto 3</motion.div>
                <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="col-span-1 row-span-1 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500">Foto 4</motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RODA NAVIGASI LINGKARAN */}
      <div 
        className="hidden sm:block absolute top-1/2 right-0 translate-x-[65%] -translate-y-1/2 w-[700px] h-[700px] z-50 pointer-events-auto cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div 
          className="w-full h-full rounded-full border border-slate-800 relative transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" 
          style={{ transform: `rotate(${-activeMenu * ANGLE_STEP}deg)` }}
        >
          {menuList.map((menu, i) => {
            const rotation = i * ANGLE_STEP;
            const isActive = activeMenu === i;
            return (
              <div key={i} className="absolute top-1/2 left-1/2 flex items-center" style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg) translateX(-${RADIUS}px)` }}>
                <div className="flex items-center gap-4 transition-all duration-700" style={{ transform: `rotate(${-rotation + activeMenu * ANGLE_STEP}deg)` }}>
                  
                  <span onClick={(e) => { e.stopPropagation(); changeMenu(i); }} className={`uppercase tracking-widest text-xs font-bold cursor-pointer transition-all duration-300 ${isActive ? 'text-emerald-400 opacity-150 scale-105' : 'text-slate-500 opacity-30 hover:opacity-80'}`}>
                    {menu}
                  </span>
                  
                  <button onClick={(e) => { e.stopPropagation(); changeMenu(i); }} className={`rounded-full transition-all duration-300 cursor-pointer ${isActive ? 'w-4 h-4 bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.9)]' : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-400'}`} />
                
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}