'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuList = ["Tentang Kami", "Paket", "Tim Kami", "Galeri"];
const ANGLE_STEP = 35;
const RADIUS = 380;

// Data jaringan dan paket lengkap sesuai referensi foto
const packageTabs = ['SOLANA', 'SUI', 'ETH', 'BNB', 'TRON'];
const packageDataMap: Record<string, Array<{ t: string, p: string, f: string[] }>> = {
  SOLANA: [
    { t: 'Paket Dasar', p: 'Rp. 35.500.000', f: ['Pembuatan token di jaringan SOLANA', 'Supply Koin 1 Juta', 'Tambahkan Likuiditas Rp. 900.000', 'Media Sosial (X/Twitter)', 'Telegram (5 anggota)', 'Situs Web + Domain Gratis 1 Tahun', 'Buku Putih & Peta Jalan', 'Daftar Garuda Exchanger & Bursa Lainnya'] },
    { t: 'Paket Standar', p: 'Rp. 70.000.000', f: ['Pembuatan token di jaringan SOLANA', 'Supply Koin 5 Juta', 'Tambahkan Likuiditas Rp. 1.500.000', 'Media Sosial (X/Twitter)', 'Telegram (50 anggota)', 'Situs Web + Domain Gratis 1 Tahun', 'Buku Putih & Peta Jalan', 'Daftar Garuda Exchanger & Bursa Lainnya', '2 postingan pertama untuk promosi'] },
    { t: 'Paket Lanjutan', p: 'Rp. 120.000.000', f: ['Pembuatan token di jaringan SOLANA', 'Supply Koin 10 Juta', 'Tambahkan Likuiditas Rp. 5.000.000', 'Media Sosial (X/Twitter, Telegram 100 anggota)', 'Situs Web + Domain Gratis 1 Tahun', 'Buku Putih & Peta Jalan', 'Daftar Garuda Exchanger & Bursa Lainnya', '10 postingan pertama untuk promosi', 'Pencatatan eksklusif di Garuda Exchanger dan Bursa lainnya'] }
  ],
  SUI: [
    { t: 'Paket Dasar', p: 'Rp. 26.000.000', f: ['Pembuatan token di jaringan SUI', 'Supply Koin 1 Juta', 'Tambahkan Likuiditas Rp. 500.000 USD', 'Media Sosial (X/Twitter, Telegram, dan Instagram)', 'Situs Web + Domain Gratis 1 Tahun', 'Buku Manual', 'Buku Putih & Peta Jalan', 'Daftar Garuda Exchanger & Bursa Lainnya'] },
    { t: 'Paket Standar', p: 'Rp. 35.000.000', f: ['Pembuatan token di jaringan SUI', 'Supply Koin 5 Juta', 'Tambahkan Likuiditas Rp. 1.500.000 USD', 'Media Sosial (X/Twitter, Telegram, dan Instagram)', 'Situs Web + Domain Gratis 1 Tahun', 'Buku Manual', 'Buku Putih & Peta Jalan', 'Daftar Garuda Exchanger & Bursa Lainnya', '3 postingan pertama untuk promosi'] },
    { t: 'Paket Lanjutan', p: 'Rp. 80.000.000', f: ['Pembuatan token di jaringan SUI', 'Supply Koin 10 Juta', 'Tambahkan Likuiditas Rp. 2.000.000', 'Media Sosial (X/Twitter, Telegram, dan Instagram)', 'Situs Web + Domain Gratis 1 Tahun', 'Buku Manual', 'Buku Putih & Peta Jalan', 'Daftar Garuda Exchanger & Bursa Lainnya', '10 postingan pertama untuk promosi', 'Pencatatan eksklusif di NusaDex dan Bursa lainnya', 'Media Sosial X Terverifikasi', 'Permintaan Supply khusus', '50 Pemegang Dompet'] }
  ],
  ETH: [
    { t: 'Paket Dasar', p: 'Rp. 222.000.000', f: ['Pembuatan token di jaringan ETHEREUM', 'Supply Koin 1 Juta', 'Tambahkan Likuiditas Rp. 3.000.000', 'Media Sosial (X/Twitter, Telegram, dan Instagram)', 'Situs Web + Domain Gratis 1 Tahun', 'Buku Manual', 'Buku Putih & Peta Jalan', 'Daftar Garuda Exchanger & Bursa Lainnya'] },
    { t: 'Paket Standar', p: 'Rp. 650.000.000', f: ['Pembuatan token di jaringan ETHEREUM', 'Supply Koin 5 Juta', 'Tambahkan Likuiditas Rp. 10.000.000', 'Media Sosial (X/Twitter, Telegram, dan Instagram)', 'Situs Web + Domain Gratis 1 Tahun', 'Buku Manual', 'Buku Putih & Peta Jalan', 'Daftar Garuda Exchanger & Bursa Lainnya', '3 postingan pertama untuk promosi'] },
    { t: 'Paket Lanjutan', p: 'Rp. 1.300.000.000', f: ['Pembuatan token di jaringan ETHEREUM', 'Supply Koin 10 Juta', 'Tambahkan Likuiditas Rp. 15.000.000 USD', 'Media Sosial (X/Twitter, Telegram, dan Instagram)', 'Situs Web + Domain Gratis 1 Tahun', 'Buku Manual', 'Buku Putih & Peta Jalan', 'Daftar Garuda Exchanger & Bursa Lainnya', '10 postingan pertama untuk promosi', 'Pencatatan eksklusif di NusaDex dan Bursa lainnya', 'Media Sosial X Terverifikasi', 'Permintaan Supply khusus', '50 Pemegang Dompet'] }
  ],
  BNB: [
    { t: 'Paket Dasar', p: 'Rp. 80.000.000', f: ['Pembuatan token di jaringan BNB', 'Supply Koin 1 Juta', 'Tambahkan Likuiditas Rp. 2.000.000', 'Media Sosial (X/Twitter, Telegram, dan Instagram)', 'Situs Web + Domain Gratis 1 Tahun', 'Buku Manual', 'Buku Putih & Peta Jalan', 'Daftar Garuda Exchanger & Bursa Lainnya'] },
    { t: 'Paket Standar', p: 'Rp. 160.000.000', f: ['Pembuatan token di jaringan BNB', 'Supply Koin 5 Juta', 'Tambahkan Likuiditas Rp. 5.000.000', 'Media Sosial (X/Twitter, Telegram, dan Instagram)', 'Situs Web + Domain Gratis 1 Tahun', 'Buku Manual', 'Buku Putih & Peta Jalan', 'Daftar Garuda Exchanger & Bursa Lainnya', '3 postingan pertama untuk promosi'] },
    { t: 'Paket Lanjutan', p: 'Rp. 222.000.000', f: ['Pembuatan token di jaringan BNB', 'Supply Koin 10 Juta', 'Tambahkan Likuiditas Rp. 100.000.000', 'Media Sosial (X/Twitter, Telegram, dan Instagram)', 'Situs Web + Domain Gratis 1 Tahun', 'Buku Manual', 'Buku Putih & Peta Jalan', 'Daftar Garuda Exchanger & Bursa Lainnya', '10 postingan pertama untuk promosi', 'Pencatatan eksklusif di NusaDex dan Bursa lainnya', 'Media Sosial X Terverifikasi', 'Permintaan Supply khusus', '50 Pemegang Dompet'] }
  ],
  TRON: [
    { t: 'Paket Dasar', p: 'Rp. 71.000.000', f: ['Pembuatan token di jaringan TRON', 'Supply Koin 1 Juta', 'Tambahkan Likuiditas Rp. 3.000.000', 'Media Sosial (X/Twitter, Telegram, dan Instagram)', 'Situs Web + Domain Gratis 1 Tahun', 'Buku Manual', 'Buku Putih & Peta Jalan', 'Daftar Garuda Exchanger & Bursa Lainnya'] },
    { t: 'Paket Standar', p: 'Rp. 125.000.000', f: ['Pembuatan token di jaringan TRON', 'Supply Koin 5 Juta', 'Tambahkan Likuiditas Rp. 5.000.000', 'Media Sosial (X/Twitter, Telegram, dan Instagram)', 'Situs Web + Domain Gratis 1 Tahun', 'Buku Manual', 'Buku Putih & Peta Jalan', 'Daftar Garuda Exchanger & Bursa Lainnya', '3 postingan pertama untuk promosi'] },
    { t: 'Paket Lanjutan', p: 'Rp. 169.000.000', f: ['Pembuatan token di jaringan TRON', 'Supply Koin 10 Juta', 'Tambahkan Likuiditas Rp. 11.000.000', 'Media Sosial (X/Twitter, Telegram, dan Instagram)', 'Situs Web + Domain Gratis 1 Tahun', 'Buku Manual', 'Buku Putih & Peta Jalan', 'Daftar Garuda Exchanger & Bursa Lainnya', '10 postingan pertama untuk promosi', 'Pencatatan eksklusif di NusaDex dan Bursa lainnya', 'Media Sosial X Terverifikasi'] }
  ]
};

export default function CoreEngineSection() {
  const [activeMenu, setActiveMenu] = useState(0);
  const isAnimating = useRef(false);
  const [dragStartY, setDragStartY] = useState<number | null>(null);

  // State baru khusus untuk pilihan jaringan paket (tanpa merusak kode lama)
  const [activePackageTab, setActivePackageTab] = useState('SOLANA');

  // Fungsi ganti menu
  const changeMenu = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= menuList.length || isAnimating.current) return;
    isAnimating.current = true;
    setActiveMenu(newIndex);
    setTimeout(() => (isAnimating.current = false), 800);
  };

  // KONTROL DRAG / SWAP: Khusus Laptop
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
    <section className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-[#030406] font-mono text-white select-none border-b border-slate-900 flex flex-col justify-center pt-20 lg:pt-0">
      
      {/* 2. MOBILE NAVIGATION TABS (Dipindah ke atas sesuai permintaan, tanpa mengubah kode lainnya) */}
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

      {/* 1. KONTEN TENGAH */}
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

          {/* PAKET */}
          {activeMenu === 1 && (
            <motion.div key={1} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }} transition={{ duration: 0.6 }} className="w-full max-w-5xl pointer-events-auto">
              <span className="text-xs text-emerald-400 tracking-widest uppercase block mb-2">// SECTION 02 - PAKET</span>
              
              {/* Tombol Pilihan Jaringan Paket (SOLANA, SUI, ETH, BNB, TRON) */}
              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                {packageTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActivePackageTab(tab)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      activePackageTab === tab
                        ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Grid Kartu Paket dengan Animasi Mulus */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activePackageTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto pr-2"
                >
                  {packageDataMap[activePackageTab].map((pkt, idx) => (
                    <motion.div key={idx} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.1, duration: 0.4 }} className="bg-[#0a0c16] border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center">
                      <h3 className="text-lg font-bold text-white mb-1">{pkt.t}</h3>
                      <p className="text-xs text-slate-500 mb-4">Fitur penting untuk membuat token.</p>
                      <h2 className="text-xl sm:text-2xl font-black text-white mb-6">{pkt.p}</h2>
                      <ul className="text-left text-[10px] text-slate-400 space-y-3 mb-8 w-full">
                        {pkt.f.map((fitur, fidx) => <li key={fidx} className="flex items-center gap-2"><span className="text-emerald-400">✓</span> {fitur}</li>)}
                      </ul>
                      <button className="mt-auto w-full py-3 bg-emerald-500 text-black text-xs font-bold rounded-xl hover:bg-emerald-400 transition-colors">Beli Paket</button>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
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

      {/* 3. RODA NAVIGASI LINGKARAN (DISEMBUNYIKAN TOTAL DI HP MENGGUNAKAN hidden sm:block, MUNCUL NORMAL DI DESKTOP) */}
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