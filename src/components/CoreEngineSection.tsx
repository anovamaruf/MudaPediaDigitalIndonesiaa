'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuList = ["Tentang Kami", "Paket", "Tim Kami", "Galeri"];
const ANGLE_STEP = 35;
const RADIUS = 380;

export default function CoreEngineSection() {
  const [activeMenu, setActiveMenu] = useState(0);
  const isAnimating = useRef(false);
  const [dragStartY, setDragStartY] = useState<number | null>(null);

  // Fungsi ganti menu
  const changeMenu = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= menuList.length || isAnimating.current) return;
    isAnimating.current = true;
    setActiveMenu(newIndex);
    setTimeout(() => (isAnimating.current = false), 800);
  };

  // KONTROL DRAG / SWAP: Bisa ditarik di HP maupun Laptop
  const handlePointerDown = (e: React.PointerEvent) => setDragStartY(e.clientY);
  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartY === null) return;
    const diff = dragStartY - e.clientY;
    
    // Kalau ditarik ke atas/bawah cukup jauh, ganti menu (swap)
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
    <section className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-[#030406] font-mono text-white select-none border-b border-slate-900 flex flex-col justify-center">
      
      {/* 1. KONTEN TENGAH */}
      <div className="relative z-10 w-full flex items-center justify-start pl-6 sm:pl-24 lg:pl-32 p-6 sm:p-12 pointer-events-none my-auto pb-48 lg:pb-12">
        <AnimatePresence mode="wait">
          
          {/* TENTANG KAMI */}
          {activeMenu === 0 && (
            <motion.div key={0} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }} transition={{ duration: 0.6 }} className="max-w-2xl text-left pointer-events-auto">
              <span className="text-xs text-emerald-400 tracking-widest uppercase block mb-4">// SECTION 01</span>
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-white mb-6">Tentang Kami</h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">Kami adalah pionir dalam membangun ekosistem Web3 di Indonesia. Berpusat di Banyuwangi, misi kami adalah mempercepat adopsi teknologi desentralisasi melalui solusi yang inovatif dan terukur.</p>
            </motion.div>
          )}

          {/* PAKET */}
          {activeMenu === 1 && (
            <motion.div key={1} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }} transition={{ duration: 0.6 }} className="w-full max-w-5xl pointer-events-auto">
              <span className="text-xs text-emerald-400 tracking-widest uppercase block mb-4">// SECTION 02 - PAKET</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { t: 'Paket Dasar', p: 'Rp. 35.500.000', f: ['Pembuatan Solana', 'Supply Koin 1 Juta', 'Likuiditas 900.000'] },
                  { t: 'Paket Standar', p: 'Rp. 70.000.000', f: ['Pembuatan Solana', 'Supply Koin 5 Juta', 'Likuiditas 1.500.000'] },
                  { t: 'Paket Lanjutan', p: 'Rp. 120.000.000', f: ['Pembuatan Solana', 'Supply Koin 10 Juta', 'Likuiditas 5.000.000'] }
                ].map((pkt, idx) => (
                  <motion.div key={idx} initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.2, duration: 0.5 }} className="bg-[#0a0c16] border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center">
                    <h3 className="text-lg font-bold text-white mb-1">{pkt.t}</h3>
                    <p className="text-xs text-slate-500 mb-4">Fitur penting untuk membuat token.</p>
                    <h2 className="text-2xl font-black text-white mb-6">{pkt.p}</h2>
                    <ul className="text-left text-[10px] text-slate-400 space-y-3 mb-8 w-full">
                      {pkt.f.map((fitur, fidx) => <li key={fidx} className="flex items-center gap-2"><span className="text-emerald-400">✓</span> {fitur}</li>)}
                    </ul>
                    <button className="mt-auto w-full py-3 bg-emerald-500 text-black text-xs font-bold rounded-xl hover:bg-emerald-400 transition-colors">Beli Paket</button>
                  </motion.div>
                ))}
              </div>
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

      {/* 2. RODA NAVIGASI (Bisa di-swap/geser atau diklik langsung teks/titiknya) */}
      <div 
        className="absolute bottom-[-160px] right-[-160px] sm:bottom-auto sm:right-0 sm:top-1/2 sm:translate-x-[65%] sm:-translate-y-1/2 w-[450px] h-[450px] sm:w-[700px] sm:h-[700px] z-50 pointer-events-auto cursor-grab active:cursor-grabbing touch-none scale-75 sm:scale-100 origin-bottom-right sm:origin-center"
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
                  
                  {/* Teks Menu - Bisa diklik langsung */}
                  <span onClick={(e) => { e.stopPropagation(); changeMenu(i); }} className={`uppercase tracking-widest text-xs font-bold cursor-pointer transition-all duration-300 ${isActive ? 'text-emerald-400 opacity-150 scale-105' : 'text-slate-500 opacity-30 hover:opacity-80'}`}>
                    {menu}
                  </span>
                  
                  {/* Titik Tombol - Bisa diklik langsung */}
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