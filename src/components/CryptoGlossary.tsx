'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const glossaryData = [
  {
    term: 'Blockchain (Rantai Blok)',
    category: 'Dasar',
    definition: 'Buku catatan digital super aman yang mencatat semua transaksi secara transparan dan mustahil bisa diubah-ubah oleh orang lain.',
    fullDetail: 'Blockchain bekerja dengan cara menyebar catatan transaksi ke ribuan komputer di seluruh dunia secara bersamaan. Karena tidak ada satu pun server pusat yang mengontrol, data di dalamnya mustahil diretas atau dipalsukan. Bayangkan ini seperti buku kas umum yang dipegang oleh semua orang, jadi tidak ada yang bisa berbuat curang.'
  },
  {
    term: 'Smart Contract (Kontrak Pintar)',
    category: 'Sistem',
    definition: 'Program komputer otomatis di dalam internet yang langsung jalan sendiri sesuai perjanjian tanpa perlu perantara.',
    fullDetail: 'Kontrak pintar adalah kode otomatis yang menjalankan kesepakatan secara langsung. Contohnya, jika kamu membeli aset digital, sistem akan otomatis mengirimkan barangnya ke dompet digitalmu begitu uangnya masuk, tanpa perlu campur tangan admin atau notaris.'
  },
  {
    term: 'Gas Fee (Biaya Transaksi)',
    category: 'Transaksi',
    definition: 'Biaya jasa kecil yang dibayar saat kita ngirim atau mindahin aset di jaringan internet digital.',
    fullDetail: 'Setiap kali kamu melakukan transaksi atau mengirim koin di jaringan blockchain, ada tenaga komputer (validator) yang memprosesnya. Gas fee adalah bahan bakar atau upah kecil yang diberikan kepada mereka agar transaksimu berhasil dicatat di sistem.'
  },
  {
    term: 'DeFi (Keuangan Terbuka)',
    category: 'Keuangan',
    definition: 'Sistem keuangan digital yang bebas tanpa harus lewat bank atau kantor fisik konvensional.',
    fullDetail: 'DeFi (Decentralized Finance) memungkinkan kamu untuk meminjam, menabung, atau menukar aset digital langsung lewat aplikasi internet tanpa harus antre di bank, isi formulir berbelit-belit, atau verifikasi KTP yang lama.'
  },
  {
    term: 'Web3 (Internet Masa Depan)',
    category: 'Teknologi',
    definition: 'Generasi baru internet di mana kita benar-benar jadi pemilik data pribadi sendiri secara penuh.',
    fullDetail: 'Jika di internet lama (Web2) data pribadi dan akunmu dikuasai oleh perusahaan besar, di Web3 kamu memegang kendali penuh atas akun, data, dan aset digitalmu sendiri menggunakan kunci kriptografi pribadi.'
  },
  {
    term: 'Tokenomics (Aturan Koin)',
    category: 'Ekonomi',
    definition: 'Aturan main seputar jumlah koin, harga, dan cara bagi-bagi koin digital di dalam suatu proyek.',
    fullDetail: 'Tokenomics adalah cetak biru ekonomi dari sebuah koin digital. Ini mencakup berapa total koin yang dicetak, bagaimana cara membagikannya ke investor atau tim, dan strategi untuk menjaga agar nilai koin tersebut tetap stabil dan berharga.'
  }
];

export default function CryptoGlossary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState<typeof glossaryData[0] | null>(null);

  const categories = ['Semua', 'Dasar', 'Sistem', 'Transaksi', 'Keuangan', 'Teknologi', 'Ekonomi'];

  const filteredData = glossaryData.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="w-full bg-[#030406] py-10 sm:py-20 px-4 sm:px-8 lg:px-24 border-b border-slate-900 relative">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Header Section */}
        <div className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] sm:text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            KAMUS SANTAI
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Kamus Istilah Kripto & Web3
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono leading-relaxed">
            Gak usah bingung sama istilah gaul teknologi, cari artinya di sini dengan bahasa yang gampang dimengerti.
          </p>
        </div>

        {/* Input & Kategori Filter */}
        <div className="space-y-3">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari istilah (contoh: Blockchain, Gas Fee...)"
              className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl py-3 sm:py-3.5 pl-11 pr-4 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-emerald-500 transition-colors shadow-lg"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap border transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-black font-bold border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRID KARTU RESPONSIF MOBILE & DESKTOP DENGAN TOMBOL PERMANEN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <motion.div
                  key={item.term}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.03,
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 sm:p-5 backdrop-blur-md hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4 relative"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-white transition-colors">
                        {item.term}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 font-mono leading-relaxed">
                      {item.definition}
                    </p>
                  </div>

                  {/* Tombol Lebih Lanjut Permanen (Ramah Sentuhan Jari di HP) */}
                  <div className="text-[10px] font-mono text-slate-600 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                    <span>MUDAPEDIA EDUKASI</span>
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1 hover:underline cursor-pointer bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 hover:bg-emerald-500/20 transition-all active:scale-95"
                    >
                      Lebih Lanjut <span>→</span>
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="col-span-full py-12 text-center text-slate-500 font-mono text-xs"
              >
                Istilah yang kamu cari gak ketemu. Coba kata kunci lain ya!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* POP-UP / MODAL DI TENGAH LAYAR (RESPONSIF MOBILE) */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0a0c16] border border-slate-800 rounded-3xl p-5 sm:p-8 max-w-lg w-full relative shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-mono w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="space-y-2 pr-6">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-block">
                  {selectedItem.category}
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight pt-1">
                  {selectedItem.term}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] text-emerald-400 uppercase tracking-widest mb-1 font-bold">Ringkasan Sederhana</div>
                  {selectedItem.definition}
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-bold">Penjelasan Lengkap</div>
                  <p className="text-slate-300 leading-relaxed">{selectedItem.fullDetail}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="w-full py-3 bg-emerald-500 text-black text-xs font-bold font-mono rounded-xl hover:bg-emerald-400 transition-colors shadow-lg cursor-pointer active:scale-98"
              >
                Tutup & Mengerti
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}