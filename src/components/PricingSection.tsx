'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

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

interface PricingSectionProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function PricingSection({ activeTab: externalTab, onTabChange }: PricingSectionProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [internalTab, setInternalTab] = useState('SOLANA');
  const activePackageTab = externalTab !== undefined ? externalTab : internalTab;
  const setActivePackageTab = onTabChange || setInternalTab;

  return (
    <div className={`w-full max-w-5xl pointer-events-auto border rounded-3xl p-8 shadow-2xl transition-colors duration-300 ${
      isDark ? 'bg-[#0a0c16] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
    }`}>
      
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {packageTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActivePackageTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activePackageTab === tab
                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                : isDark ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900'
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
            <motion.div key={idx} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.1, duration: 0.4 }} className={`border rounded-2xl p-6 flex flex-col items-center text-center shadow-lg ${
              isDark ? 'bg-[#0a0c16] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}>
              <h3 className="text-lg font-bold mb-1">{pkt.t}</h3>
              <p className={`text-xs mb-4 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Fitur penting untuk membuat token.</p>
              <h2 className="text-xl sm:text-2xl font-black mb-6">{pkt.p}</h2>
              <ul className={`text-left text-[10px] space-y-3 mb-8 w-full ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {pkt.f.map((fitur, fidx) => <li key={fidx} className="flex items-center gap-2"><span className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>✓</span> {fitur}</li>)}
              </ul>
              <button className="mt-auto w-full py-3 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-500 transition-colors cursor-pointer shadow-md">Beli Paket</button>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}