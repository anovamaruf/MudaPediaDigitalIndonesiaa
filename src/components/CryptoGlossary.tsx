'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const glossaryData = [
  { term: 'Blockchain (Rantai Blok)', category: 'Fundamental', definition: 'Buku catatan digital super aman yang mencatat semua transaksi secara transparan dan mustahil bisa diubah-ubah oleh orang lain.', fullDetail: 'Blockchain bekerja dengan cara menyebar catatan transaksi ke ribuan komputer di seluruh dunia secara bersamaan. Karena tidak ada satu pun server pusat yang mengontrol, data di dalamnya mustahil diretas atau dipalsukan.' },
  { term: 'Smart Contract (Kontrak Pintar)', category: 'Teknologi', definition: 'Program komputer otomatis di dalam internet yang langsung jalan sendiri sesuai perjanjian tanpa perlu perantara.', fullDetail: 'Kontrak pintar adalah kode otomatis yang menjalankan kesepakatan secara langsung tanpa campur tangan admin atau notaris.' },
  { term: 'Gas Fee (Biaya Transaksi)', category: 'Keuangan', definition: 'Biaya jasa kecil yang dibayar saat kita ngirim atau mindahin aset di jaringan internet digital.', fullDetail: 'Gas fee adalah upah kecil yang diberikan kepada validator komputer agar transaksimu berhasil dicatat di sistem.' },
  { term: 'DeFi (Keuangan Terbuka)', category: 'Keuangan', definition: 'Sistem keuangan digital yang bebas tanpa harus lewat bank atau kantor fisik konvensional.', fullDetail: 'DeFi memungkinkan kamu untuk meminjam, menabung, atau menukar aset digital langsung lewat aplikasi internet.' },
  { term: 'Web3 (Internet Masa Depan)', category: 'Teknologi', definition: 'Generasi baru internet di mana kita benar-benar jadi pemilik data pribadi sendiri secara penuh.', fullDetail: 'Di Web3 kamu memegang kendali penuh atas akun, data, dan aset digitalmu sendiri menggunakan kunci kriptografi pribadi.' },
  { term: 'Tokenomics (Aturan Koin)', category: 'Keuangan', definition: 'Aturan main seputar jumlah koin, harga, dan cara bagi-bagi koin digital di dalam suatu proyek.', fullDetail: 'Tokenomics mencakup total koin yang dicetak dan strategi untuk menjaga agar nilai koin tetap stabil.' },
  { term: 'DApps (Aplikasi Desentralisasi)', category: 'Teknologi', definition: 'Aplikasi digital yang berjalan di atas jaringan blockchain tanpa dikendalikan oleh satu perusahaan pun.', fullDetail: 'DApps adalah aplikasi masa depan yang tidak memiliki server pusat.' },
  { term: 'Crypto Wallet (Dompet Kripto)', category: 'Keuangan', definition: 'Aplikasi atau perangkat aman untuk menyimpan kunci digital dan aset kripto milik kamu.', fullDetail: 'Dompet kripto menyimpan kunci pribadi yang membuktikan kepemilikan aset di blockchain.' },
  { term: 'NFT (Sertifikat Digital)', category: 'Fundamental', definition: 'Bukti kepemilikan digital yang sah dan tercatat di blockchain untuk sebuah karya atau aset unik.', fullDetail: 'NFT berfungsi sebagai sertifikat keaslian digital.' }
];

export default function CryptoGlossary() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState<typeof glossaryData[0] | null>(null);

  const categories = ['Semua', 'Fundamental', 'Teknologi', 'Keuangan'];

  const filteredData = glossaryData.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className={`w-full py-10 sm:py-20 px-4 sm:px-8 lg:px-24 border-b relative transition-colors ${
      isDark ? 'bg-[#030406] border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        
        <div className="text-left space-y-2">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono border ${
            isDark ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-100 border-blue-200 text-blue-700 font-bold'
          }`}>
            KAMUS SANTAI
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Kamus Istilah Kripto & Web3
          </h2>
          <p className={`text-xs sm:text-sm font-mono leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Gak usah bingung sama istilah gaul teknologi, cari artinya di sini dengan bahasa yang gampang dimengerti.
          </p>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari istilah (contoh: Blockchain, Gas Fee...)"
              className={`w-full rounded-2xl py-3 sm:py-3.5 pl-11 pr-4 font-mono text-xs sm:text-sm focus:outline-none transition-colors shadow-sm border ${
                isDark ? 'bg-slate-900/80 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
              }`}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap border transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                    : isDark ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <motion.div
                  key={item.term}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`rounded-2xl p-4 sm:p-5 backdrop-blur-md transition-all flex flex-col justify-between space-y-4 border ${
                    isDark ? 'bg-slate-900/40 border-slate-800/80 hover:border-blue-500/50' : 'bg-white border-slate-200 hover:border-blue-500/40 shadow-md'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.term}</h3>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>{item.category}</span>
                    </div>
                    <p className={`text-xs sm:text-sm font-mono leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.definition}</p>
                  </div>

                  <div className={`text-[10px] font-mono pt-3 border-t flex items-center justify-between ${isDark ? 'text-slate-600 border-slate-800/60' : 'text-slate-400 border-slate-100'}`}>
                    <span>MUDAPEDIA EDUKASI</span>
                    <button onClick={() => setSelectedItem(item)} className="text-xs font-mono text-blue-500 font-bold flex items-center gap-1 hover:underline cursor-pointer bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20 hover:bg-blue-500/25 transition-all">
                      Lebih Lanjut →
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-500 font-mono text-xs">Istilah yang kamu cari gak ketemu.</div>
            )}
          </AnimatePresence>
        </div>

      </div>

      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`rounded-3xl p-5 sm:p-8 max-w-lg w-full relative shadow-2xl space-y-5 border ${isDark ? 'bg-[#0a0c16] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
              <button onClick={() => setSelectedItem(null)} className={`absolute top-4 right-4 text-sm font-mono w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer ${isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>✕</button>
              <div className="space-y-2 pr-6">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 inline-block font-bold">{selectedItem.category}</span>
                <h3 className="text-lg sm:text-2xl font-black tracking-tight pt-1">{selectedItem.term}</h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm font-mono leading-relaxed">
                <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                  <div className="text-[10px] text-blue-500 uppercase tracking-widest mb-1 font-bold">Ringkasan Sederhana</div>
                  {selectedItem.definition}
                </div>
                <div className="space-y-1">
                  <div className={`text-[10px] uppercase tracking-widest mb-1 font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Penjelasan Lengkap</div>
                  <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>{selectedItem.fullDetail}</p>
                </div>
              </div>
              <button onClick={() => setSelectedItem(null)} className="w-full py-3 bg-blue-600 text-white text-xs font-bold font-mono rounded-xl hover:bg-blue-500 transition-colors cursor-pointer shadow-lg">
                Tutup & Mengerti
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}