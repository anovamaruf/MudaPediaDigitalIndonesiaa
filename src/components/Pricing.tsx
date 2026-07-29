'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Copy, Check } from 'lucide-react';

export default function Pricing({ isDark }: { isDark: boolean }) {
  const [currency, setCurrency] = useState<string>('SOLANA');
  const [copiedPackage, setCopiedPackage] = useState<string | null>(null);

  const pricingData: Record<string, {
    dasar: { price: string; features: string[] };
    standar: { price: string; features: string[] };
    lanjutan: { price: string; features: string[] };
  }> = {
    SOLANA: {
      dasar: {
        price: "Rp. 35.500.000",
        features: [
          "Pembuatan token di jaringan SOLANA",
          "Supply Koin 1 Juta",
          "Tambahkan Likuiditas Rp. 900.000",
          "Media Sosial (X/Twitter)",
          "Telegram (5 anggota)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya"
        ]
      },
      standar: {
        price: "Rp. 70.000.000",
        features: [
          "Pembuatan token di jaringan SOLANA",
          "Supply Koin 5 Juta",
          "Tambahkan Likuiditas Rp.1.500.000",
          "Media Sosial (X/Twitter)",
          "Telegram (50 anggota)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya",
          "2 postingan pertama untuk promosi"
        ]
      },
      lanjutan: {
        price: "RP.120.000.000",
        features: [
          "Pembuatan token di jaringan SOLANA",
          "Supply Koin 10 Juta",
          "Tambahkan Likuiditas Rp.5.000.000",
          "Media Sosial (X/Twitter, Telegram 100 anggota)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya",
          "10 postingan pertama untuk promosi",
          "Pencatatan eksklusif di Garuda Exchanger dan Bursa lainnya"
        ]
      }
    },
    SUI: {
      dasar: {
        price: "Rp. 26.000.000",
        features: [
          "Pembuatan token di jaringan SUI",
          "Supply Koin 1 Juta",
          "Tambahkan Likuiditas Rp.500.000 USD",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya"
        ]
      },
      standar: {
        price: "Rp. 35.000.000",
        features: [
          "Pembuatan token di jaringan SUI",
          "Supply Koin 5 Juta",
          "Tambahkan Likuiditas Rp.1.500.000 USD",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya",
          "3 postingan pertama untuk promosi"
        ]
      },
      lanjutan: {
        price: "Rp.80.000.000",
        features: [
          "Pembuatan token di jaringan SUI",
          "Supply Koin 10 Juta",
          "Tambahkan Likuiditas Rp.2.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya",
          "10 postingan pertama untuk promosi",
          "Pencatatan eksklusif di NusaDex dan Bursa lainnya",
          "Media Sosial X Terverifikasi",
          "Permintaan Supply khusus",
          "50 Pemegang Dompet"
        ]
      }
    },
    ETH: {
      dasar: {
        price: "Rp.222.000.000",
        features: [
          "Pembuatan token di jaringan ETHEREUM",
          "Supply Koin 1 Juta",
          "Tambahkan Likuiditas Rp.3.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya"
        ]
      },
      standar: {
        price: "Rp.650.000.000",
        features: [
          "Pembuatan token di jaringan ETHEREUM",
          "Supply Koin 5 Juta",
          "Tambahkan Likuiditas Rp.10.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya",
          "3 postingan pertama untuk promosi"
        ]
      },
      lanjutan: {
        price: "Rp.1.300.000.000",
        features: [
          "Pembuatan token di jaringan ETHEREUM",
          "Supply Koin 10 Juta",
          "Tambahkan Likuiditas Rp.15.000.000 USD",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Excainger & Bursa Lainnya",
          "10 postingan pertama untuk promosi",
          "Pencatatan eksklusif di NusaDex dan Bursa lainnya",
          "Media Sosial X Terverifikasi",
          "Permintaan Supply khusus",
          "50 Pemegang Dompet"
        ]
      }
    },
    BNB: {
      dasar: {
        price: "Rp.80.000.000",
        features: [
          "Pembuatan token di jaringan BNB",
          "Supply Koin 1 Juta",
          "Tambahkan Likuiditas Rp.2.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya"
        ]
      },
      standar: {
        price: "Rp.160.000.000",
        features: [
          "Pembuatan token di jaringan BNB",
          "Supply Koin 5 Juta",
          "Tambahkan Likuiditas Rp.5.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya",
          "3 postingan pertama untuk promosi"
        ]
      },
      lanjutan: {
        price: "Rp.222.000.000",
        features: [
          "Pembuatan token di jaringan BNB",
          "Supply Koin 10 Juta",
          "Tambahkan Likuiditas Rp.100.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya",
          "10 postingan pertama untuk promosi",
          "Pencatatan eksklusif di NusaDex dan Bursa lainnya",
          "Media Sosial X Terverifikasi",
          "Permintaan Supply khusus",
          "50 Pemegang Dompet"
        ]
      }
    },
    TRON: {
      dasar: {
        price: "Rp.71.000.000",
        features: [
          "Pembuatan token di jaringan TRON",
          "Supply Koin 1 Juta",
          "Tambahkan Likuiditas Rp.3.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Excainger & Bursa Lainnya"
        ]
      },
      standar: {
        price: "Rp.125.000.000",
        features: [
          "Pembuatan token di jaringan TRON",
          "Supply Koin 5 Juta",
          "Tambahkan Likuiditas Rp.5.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Excainger & Bursa Lainnya",
          "3 postingan pertama untuk promosi"
        ]
      },
      lanjutan: {
        price: "Rp.169.000.000",
        features: [
          "Pembuatan token di jaringan TRON",
          "Supply Koin 10 Juta",
          "Tambahkan Likuiditas Rp.11.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Excainger & Bursa Lainnya",
          "10 postingan pertama untuk promosi",
          "Pencatatan eksklusif di NusaDex dan Bursa lainnya",
          "Media Sosial X Terverifikasi"
        ]
      }
    }
  };

  const currentPricing = pricingData[currency] || pricingData.SOLANA;

  const handleCopy = (pkgName: string, price: string) => {
    const text = `Paket Token ${pkgName} (${currency}) - ${price}\nPT Mudapedia Digital Indonesia`;
    navigator.clipboard.writeText(text);
    setCopiedPackage(pkgName);
    setTimeout(() => setCopiedPackage(null), 2000);
  };

  return (
    <section id="pricing" className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-10"
      >
        <h2 className={`text-3xl sm:text-4xl font-black mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Buat Token Baru</h2>
        
        <div className={`inline-flex p-1.5 rounded-full border flex-wrap justify-center gap-1.5 shadow-2xl ${
          isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white border-slate-200 shadow-slate-200'
        }`}>
          {['SOLANA', 'SUI', 'ETH', 'BNB', 'TRON'].map((net) => (
            <motion.button
              key={net}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrency(net)}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs font-black tracking-wider transition-all ${
                currency === net 
                  ? (isDark ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-600/30')
                  : (isDark ? 'bg-slate-900 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900')
              }`}
            >
              {net}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all shadow-xl h-full border ${
            isDark ? 'bg-[#080821] border-indigo-900/50 hover:border-indigo-500 shadow-indigo-950/40' : 'bg-white border-slate-200 hover:border-sky-500 shadow-slate-200'
          }`}
        >
          <div>
            <div className="text-center mb-6 relative">
              <button 
                onClick={() => handleCopy('Dasar', currentPricing.dasar.price)}
                className={`absolute top-0 right-0 p-1.5 rounded-lg text-xs transition-colors ${
                  isDark ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
                title="Salin Rincian Paket"
              >
                {copiedPackage === 'Dasar' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </button>
              <h3 className={`text-xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Paket Dasar</h3>
              <p className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Fitur penting untuk membuat token dasar.</p>
              
              <AnimatePresence mode="wait">
                <motion.p 
                  key={currency + "-dasar"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className={`text-xl sm:text-2xl lg:text-3xl font-black mt-6 mb-1 break-words ${isDark ? 'text-white' : 'text-slate-900'}`}
                >
                  {currentPricing.dasar.price}
                </motion.p>
              </AnimatePresence>
              
              <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/proyek</p>
            </div>

            <AnimatePresence mode="wait">
              <motion.ul 
                key={currency + "-dasar-list"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`space-y-3.5 text-xs pt-6 border-t mb-8 ${isDark ? 'text-slate-200 border-slate-800/80' : 'text-slate-700 border-slate-100'}`}
              >
                {currentPricing.dasar.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${isDark ? 'text-indigo-400' : 'text-sky-600'}`} />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full font-extrabold text-xs py-3.5 rounded-2xl transition-all shadow-md mt-auto ${
              isDark ? 'bg-[#38bdf8] hover:bg-[#0284c7] text-slate-950' : 'bg-sky-600 hover:bg-sky-700 text-white'
            }`}
          >
            Beli Paket
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all shadow-xl h-full border ${
            isDark ? 'bg-[#080821] border-indigo-900/50 hover:border-indigo-500 shadow-indigo-950/40' : 'bg-white border-slate-200 hover:border-sky-500 shadow-slate-200'
          }`}
        >
          <div>
            <div className="text-center mb-6 relative">
              <button 
                onClick={() => handleCopy('Standar', currentPricing.standar.price)}
                className={`absolute top-0 right-0 p-1.5 rounded-lg text-xs transition-colors ${
                  isDark ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
                title="Salin Rincian Paket"
              >
                {copiedPackage === 'Standar' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </button>
              <h3 className={`text-xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Paket Standar</h3>
              <p className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Fitur penting untuk membuat token standar.</p>
              
              <AnimatePresence mode="wait">
                <motion.p 
                  key={currency + "-standar"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className={`text-xl sm:text-2xl lg:text-3xl font-black mt-6 mb-1 break-words ${isDark ? 'text-white' : 'text-slate-900'}`}
                >
                  {currentPricing.standar.price}
                </motion.p>
              </AnimatePresence>

              <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/proyek</p>
            </div>

            <AnimatePresence mode="wait">
              <motion.ul 
                key={currency + "-standar-list"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`space-y-3.5 text-xs pt-6 border-t mb-8 ${isDark ? 'text-slate-200 border-slate-800/80' : 'text-slate-700 border-slate-100'}`}
              >
                {currentPricing.standar.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${isDark ? 'text-indigo-400' : 'text-sky-600'}`} />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full font-extrabold text-xs py-3.5 rounded-2xl transition-all shadow-md mt-auto ${
              isDark ? 'bg-[#38bdf8] hover:bg-[#0284c7] text-slate-950' : 'bg-sky-600 hover:bg-sky-700 text-white'
            }`}
          >
            Beli Paket
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all shadow-xl h-full border ${
            isDark ? 'bg-[#080821] border-indigo-900/50 hover:border-indigo-500 shadow-indigo-950/40' : 'bg-white border-slate-200 hover:border-sky-500 shadow-slate-200'
          }`}
        >
          <div>
            <div className="text-center mb-6 relative">
              <button 
                onClick={() => handleCopy('Lanjutan', currentPricing.lanjutan.price)}
                className={`absolute top-0 right-0 p-1.5 rounded-lg text-xs transition-colors ${
                  isDark ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
                title="Salin Rincian Paket"
              >
                {copiedPackage === 'Lanjutan' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </button>
              <h3 className={`text-xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Paket Lanjutan</h3>
              <p className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Fitur penting untuk membuat token canggih.</p>
              
              <AnimatePresence mode="wait">
                <motion.p 
                  key={currency + "-lanjutan"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className={`text-xl sm:text-2xl lg:text-3xl font-black mt-6 mb-1 break-words ${isDark ? 'text-white' : 'text-slate-900'}`}
                >
                  {currentPricing.lanjutan.price}
                </motion.p>
              </AnimatePresence>

              <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/proyek</p>
            </div>

            <AnimatePresence mode="wait">
              <motion.ul 
                key={currency + "-lanjutan-list"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`space-y-3.5 text-xs pt-6 border-t mb-8 ${isDark ? 'text-slate-200 border-slate-800/80' : 'text-slate-700 border-slate-100'}`}
              >
                {currentPricing.lanjutan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${isDark ? 'text-indigo-400' : 'text-sky-600'}`} />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full font-extrabold text-xs py-3.5 rounded-2xl transition-all shadow-md mt-auto ${
              isDark ? 'bg-[#38bdf8] hover:bg-[#0284c7] text-slate-950' : 'bg-sky-600 hover:bg-sky-700 text-white'
            }`}
          >
            Beli Paket
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}