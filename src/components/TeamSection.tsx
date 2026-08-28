'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sfx } from '@/utils/soundFX'; // <-- Modul efek suara interaktif

interface Member {
  name: string;
  title: string;
  role: string;
  contribution: string;
  projects: string[];
  linkedin: string;
  instagram: string;
}

const mainTeam: Member[] = [
  { 
    name: 'Siti Nurhaliza', 
    title: 'Frontend Developer', 
    role: 'Web3 Developer', 
    contribution: 'Mengembangkan antarmuka dApps berbasis Next.js dan Framer Motion dengan performa tinggi.', 
    projects: ['Mudapedia Landing Page v2', 'Web3 Token Swap UI'], 
    linkedin: 'https://linkedin.com', 
    instagram: 'https://instagram.com' 
  },
  { 
    name: 'Ahmad Rizky', 
    title: 'Backend Developer', 
    role: 'Web3 Developer', 
    contribution: 'Membangun arsitektur server, integrasi RPC node, dan manajemen database terdistribusi.', 
    projects: ['Smart Contract Indexer', 'API Gateway Web3'], 
    linkedin: 'https://linkedin.com', 
    instagram: 'https://instagram.com' 
  },
  { 
    name: 'Budi Santoso', 
    title: 'Smart Contract Engineer', 
    role: 'Web3 Developer', 
    contribution: 'Melakukan audit keamanan kontrak pintar Solidity dan optimasi gas fee.', 
    projects: ['Staking Contract Protocol', 'NFT Marketplace Contract'], 
    linkedin: 'https://linkedin.com', 
    instagram: 'https://instagram.com' 
  },
  { 
    name: 'Dina Surya', 
    title: 'Internship', 
    role: 'Web3 Developer', 
    contribution: 'Membantu riset tokenomics dan pengujian fungsionalitas antarmuka pengguna dApps.', 
    projects: ['Crypto Calculator Tool', 'Glossary Database'], 
    linkedin: 'https://linkedin.com', 
    instagram: 'https://instagram.com' 
  }
];

const allTeamMembers: Member[] = [
  ...mainTeam,
  { 
    name: 'Eko Prasetyo', 
    title: 'Backend Developer', 
    role: 'Smart Contract Dev', 
    contribution: 'Optimalisasi kecepatan sinkronisasi data blockchain dan sistem keamanan autentikasi.', 
    projects: ['Node Monitoring Dashboard', 'Secure Auth Service'], 
    linkedin: 'https://linkedin.com', 
    instagram: 'https://instagram.com' 
  },
  { 
    name: 'Rina Melati', 
    title: 'Frontend Developer', 
    role: 'UI/UX Web3 Designer', 
    contribution: 'Perancangan sistem komponen UI modular dan pengalaman visual berbasis Web3.', 
    projects: ['Design System Mudapedia', 'Interactive Crypto Game UI'], 
    linkedin: 'https://linkedin.com', 
    instagram: 'https://instagram.com' 
  },
  { 
    name: 'Joko Anwar', 
    title: 'Internship', 
    role: 'Blockchain Security', 
    contribution: 'Membantu dokumentasi teknis kode sumber dan integrasi analitik performa web.', 
    projects: ['Analytics Integration', 'Bug Fixing & Testing'], 
    linkedin: 'https://linkedin.com', 
    instagram: 'https://instagram.com' 
  },
  { 
    name: 'Dewi Lestari', 
    title: 'Internship', 
    role: 'Community Manager', 
    contribution: 'Mendukung pengelolaan konten edukasi desentralisasi dan riset pasar kripto.', 
    projects: ['Kamus Santai Content Pipeline', 'Community Support Bot'], 
    linkedin: 'https://linkedin.com', 
    instagram: 'https://instagram.com' 
  }
];

const alumniMembers: Member[] = [
  { 
    name: 'Bayu Segara', 
    title: 'Frontend Developer', 
    role: 'Ex-Lead Developer (2024)', 
    contribution: 'Memimpin pengembangan arsitektur awal frontend platform kolaborasi Web3.', 
    projects: ['V1 Platform Dashboard', 'Awwwards Submission Build'], 
    linkedin: 'https://linkedin.com', 
    instagram: 'https://instagram.com' 
  },
  { 
    name: 'Intan Permata', 
    title: 'Backend Developer', 
    role: 'Ex-Tokenomics Expert (2024)', 
    contribution: 'Membangun fondasi infrastruktur server dan manajemen likuiditas awal.', 
    projects: ['Liquidity Tracker API', 'Core Database Migration'], 
    linkedin: 'https://linkedin.com', 
    instagram: 'https://instagram.com' 
  },
  { 
    name: 'Fajar Nugraha', 
    title: 'Smart Contract Engineer', 
    role: 'Ex-Smart Contract Auditor (2023)', 
    contribution: 'Menyusun standar keamanan token utility dan modul vesting kontrak.', 
    projects: ['Vesting Contract Module', 'Token Standard Implementation'], 
    linkedin: 'https://linkedin.com', 
    instagram: 'https://instagram.com' 
  },
  { 
    name: 'Siti Rahma', 
    title: 'Internship', 
    role: 'Ex-Community Lead (2023)', 
    contribution: 'Membantu riset tata kelola protokol DAO dan manajemen komunitas.', 
    projects: ['DAO Governance Framework', 'Community Guidelines'], 
    linkedin: 'https://linkedin.com', 
    instagram: 'https://instagram.com' 
  }
];

const allAlumniMembers: Member[] = [
  ...alumniMembers,
  { 
    name: 'Rian Hidayat', 
    title: 'Frontend Developer', 
    role: 'Ex-Frontend Dev (2022)', 
    contribution: 'Pengembangan fitur interaktif grafik harga token real-time.', 
    projects: ['Price Chart Widget', 'Dark Mode Theme Engine'], 
    linkedin: 'https://linkedin.com', 
    instagram: 'https://instagram.com' 
  },
  { 
    name: 'Siska Wulandari', 
    title: 'Internship', 
    role: 'Ex-Marketing (2022)', 
    contribution: 'Pengujian QA komprehensif pada fitur transaksi dan simulasi dompet.', 
    projects: ['QA Test Automation Suite', 'Wallet Connection Module'], 
    linkedin: 'https://linkedin.com', 
    instagram: 'https://instagram.com' 
  }
];

export default function TeamSection() {
  const [viewMode, setViewMode] = useState<'default' | 'all' | 'alumni' | 'all-alumni'>('default');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const currentList = 
    viewMode === 'all' 
      ? allTeamMembers 
      : viewMode === 'alumni' 
      ? alumniMembers 
      : viewMode === 'all-alumni' 
      ? allAlumniMembers 
      : mainTeam;

  return (
    <div className="bg-[#0a0c16] border border-slate-800 rounded-3xl p-8 relative w-full">
      {/* TOMBOL POJOK KANAN ATAS: LIHAT ALUMNI / KEMBALI */}
      <div className="absolute top-6 right-8 z-20">
        {viewMode !== 'alumni' && viewMode !== 'all-alumni' ? (
          <button
            onClick={() => { sfx.playClick(); setViewMode('alumni'); }}
            className="text-[10px] font-bold text-slate-400 hover:text-emerald-400 bg-slate-900/80 border border-slate-700/80 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-md"
          >
            Lihat Alumni →
          </button>
        ) : (
          <button
            onClick={() => { sfx.playClick(); setViewMode('default'); }}
            className="text-[10px] font-bold text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-md"
          >
            ✕ Tutup Alumni
          </button>
        )}
      </div>

      <span className="text-xs text-emerald-400 tracking-widest uppercase block mb-4">
        {viewMode === 'alumni' || viewMode === 'all-alumni' ? '// SECTION 03 - ALUMNI KAMI' : '// SECTION 03 - TIM & TALENTA'}
      </span>

      <div className="relative overflow-hidden min-h-[160px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 ${viewMode === 'all' || viewMode === 'all-alumni' ? 'max-h-[380px] overflow-y-auto pr-1' : ''}`}>
              {currentList.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => { sfx.playSuccess(); setSelectedMember(item); }}
                  className={`bg-slate-900 border border-slate-800 hover:border-emerald-500/60 rounded-xl p-4 text-center cursor-pointer transition-all duration-200 group flex flex-col justify-between ${viewMode.includes('alumni') ? 'border-dashed opacity-90' : ''}`}
                >
                  <div>
                    <div className={`w-16 h-16 bg-slate-800 group-hover:bg-emerald-500/20 transition-colors rounded-full mx-auto mb-3 ${viewMode.includes('alumni') ? 'grayscale opacity-75' : ''}`} />
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{item.name}</h4>
                    <p className={`text-[9px] mt-1 font-mono uppercase tracking-wider ${viewMode.includes('alumni') ? 'text-slate-500' : 'text-emerald-400'}`}>
                      {item.title}
                    </p>
                  </div>

                  {/* TOMBOL LIHAT SELENGKAPNYA DI POJOK KANAN BAWAH KOTAK PROFIL */}
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex justify-end">
                    <span className="text-[9px] font-bold text-emerald-400 group-hover:underline">
                      Lihat Selengkapnya →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* TOMBOL POJOK KANAN BAWAH: LIHAT SEMUA TIM / ALUMNI / TUTUP */}
        <div className="flex justify-end mt-4 pt-2">
          {viewMode === 'default' && (
            <button
              onClick={() => { sfx.playClick(); setViewMode('all'); }}
              className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <span>Lihat Semua Tim</span>
              <span>↑</span>
            </button>
          )}

          {viewMode === 'all' && (
            <button
              onClick={() => { sfx.playClick(); setViewMode('default'); }}
              className="text-[10px] font-bold text-slate-400 hover:text-white bg-slate-800 border border-slate-700 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <span>Tutup Kembali</span>
              <span>↓</span>
            </button>
          )}

          {viewMode === 'alumni' && (
            <button
              onClick={() => { sfx.playClick(); setViewMode('all-alumni'); }}
              className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <span>Lihat Semua Alumni</span>
              <span>↑</span>
            </button>
          )}

          {viewMode === 'all-alumni' && (
            <button
              onClick={() => { sfx.playClick(); setViewMode('alumni'); }}
              className="text-[10px] font-bold text-slate-400 hover:text-white bg-slate-800 border border-slate-700 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <span>Tutup Kembali</span>
              <span>↓</span>
            </button>
          )}
        </div>
      </div>

      {/* POP-UP / MODAL KARTU NAMA DETAIL PROFIL */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto font-mono"
            onClick={() => { sfx.playClick(); setSelectedMember(null); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f1225] border border-slate-700 p-6 sm:p-7 rounded-3xl max-w-md w-full relative shadow-2xl space-y-5 text-left"
            >
              {/* Tombol Close */}
              <button
                onClick={() => { sfx.playClick(); setSelectedMember(null); }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-xs w-7 h-7 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>

              {/* Header Profil */}
              <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center text-emerald-400 font-bold text-lg shrink-0">
                  {selectedMember.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedMember.name}</h3>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold tracking-wider mt-1">
                    {selectedMember.title}
                  </span>
                </div>
              </div>

              {/* Kontribusi */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">// Kontribusi:</span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                  {selectedMember.contribution}
                </p>
              </div>

              {/* Proyek */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">// Proyek Terkait:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMember.projects.map((proj, pIdx) => (
                    <span key={pIdx} className="text-[10px] bg-slate-900 border border-slate-800 text-emerald-400 px-2.5 py-1 rounded-lg">
                      {proj}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Modal: Link ED & Instagram */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  MUDAPEDIA ID // 2026
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sfx.playClick()}
                    className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 flex items-center justify-center text-slate-300 hover:text-emerald-400 transition-all text-xs font-bold shadow-md cursor-pointer"
                    title="LinkedIn / ED"
                  >
                    in
                  </a>
                  <a
                    href={selectedMember.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sfx.playClick()}
                    className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 flex items-center justify-center text-slate-300 hover:text-emerald-400 transition-all text-xs font-bold shadow-md cursor-pointer"
                    title="Instagram"
                  >
                    ig
                  </a>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}