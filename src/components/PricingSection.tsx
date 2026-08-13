'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function PricingSection() {
  const [activePackageTab, setActivePackageTab] = useState('SOLANA');

  return (
    <div className="w-full max-w-5xl pointer-events-auto">
      <span className="text-xs text-emerald-400 tracking-widest uppercase block mb-2">// SECTION 02 - PAKET</span>
      
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
    </div>
  );
}