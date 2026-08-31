'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sfx } from '@/utils/soundFX';
import { useTheme } from '@/context/ThemeContext';

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
  { name: 'Siti Nurhaliza', title: 'Frontend Developer', role: 'Web3 Developer', contribution: 'Mengembangkan antarmuka dApps berbasis Next.js dan Framer Motion dengan performa tinggi.', projects: ['Mudapedia Landing Page v2', 'Web3 Token Swap UI'], linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' },
  { name: 'Ahmad Rizky', title: 'Backend Developer', role: 'Web3 Developer', contribution: 'Membangun arsitektur server, integrasi RPC node, dan manajemen database terdistribusi.', projects: ['Smart Contract Indexer', 'API Gateway Web3'], linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' },
  { name: 'Budi Santoso', title: 'Smart Contract Engineer', role: 'Web3 Developer', contribution: 'Melakukan audit keamanan kontrak pintar Solidity dan optimasi gas fee.', projects: ['Staking Contract Protocol', 'NFT Marketplace Contract'], linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' },
  { name: 'Dina Surya', title: 'Internship', role: 'Web3 Developer', contribution: 'Membantu riset tokenomics dan pengujian fungsionalitas antarmuka pengguna dApps.', projects: ['Crypto Calculator Tool', 'Glossary Database'], linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
];

const allTeamMembers: Member[] = [
  ...mainTeam,
  { name: 'Eko Prasetyo', title: 'Backend Developer', role: 'Smart Contract Dev', contribution: 'Optimalisasi kecepatan sinkronisasi data blockchain dan sistem keamanan autentikasi.', projects: ['Node Monitoring Dashboard', 'Secure Auth Service'], linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' },
  { name: 'Rina Melati', title: 'Frontend Developer', role: 'UI/UX Web3 Designer', contribution: 'Perancangan sistem komponen UI modular dan pengalaman visual berbasis Web3.', projects: ['Design System Mudapedia', 'Interactive Crypto Game UI'], linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' },
  { name: 'Joko Anwar', title: 'Internship', role: 'Blockchain Security', contribution: 'Membantu dokumentasi teknis kode sumber dan integrasi analitik performa web.', projects: ['Analytics Integration', 'Bug Fixing & Testing'], linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' },
  { name: 'Dewi Lestari', title: 'Internship', role: 'Community Manager', contribution: 'Mendukung pengelolaan konten edukasi desentralisasi dan riset pasar kripto.', projects: ['Kamus Santai Content Pipeline', 'Community Support Bot'], linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
];

const alumniMembers: Member[] = [
  { name: 'Bayu Segara', title: 'Frontend Developer', role: 'Ex-Lead Developer (2024)', contribution: 'Memimpin pengembangan arsitektur awal frontend platform kolaborasi Web3.', projects: ['V1 Platform Dashboard', 'Awwwards Submission Build'], linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' },
  { name: 'Intan Permata', title: 'Backend Developer', role: 'Ex-Tokenomics Expert (2024)', contribution: 'Membangun fondasi infrastruktur server dan manajemen likuiditas awal.', projects: ['Liquidity Tracker API', 'Core Database Migration'], linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' },
  { name: 'Fajar Nugraha', title: 'Smart Contract Engineer', role: 'Ex-Smart Contract Auditor (2023)', contribution: 'Menyusun standar keamanan token utility dan modul vesting kontrak.', projects: ['Vesting Contract Module', 'Token Standard Implementation'], linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' },
  { name: 'Siti Rahma', title: 'Internship', role: 'Ex-Community Lead (2023)', contribution: 'Membantu riset tata kelola protokol DAO dan manajemen komunitas.', projects: ['DAO Governance Framework', 'Community Guidelines'], linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
];

const allAlumniMembers: Member[] = [
  ...alumniMembers,
  { name: 'Rian Hidayat', title: 'Frontend Developer', role: 'Ex-Frontend Dev (2022)', contribution: 'Pengembangan fitur interaktif grafik harga token real-time.', projects: ['Price Chart Widget', 'Dark Mode Theme Engine'], linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' },
  { name: 'Siska Wulandari', title: 'Internship', role: 'Ex-Marketing (2022)', contribution: 'Pengujian QA komprehensif pada fitur transaksi dan simulasi dompet.', projects: ['QA Test Automation Suite', 'Wallet Connection Module'], linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
];

export default function TeamSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [viewMode, setViewMode] = useState<'default' | 'all' | 'alumni' | 'all-alumni'>('default');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const currentList = 
    viewMode === 'all' ? allTeamMembers : 
    viewMode === 'alumni' ? alumniMembers : 
    viewMode === 'all-alumni' ? allAlumniMembers : mainTeam;

  return (
    <div className={`border rounded-3xl p-8 relative w-full shadow-2xl ${
      isDark ? 'bg-[#0a0c16] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
    }`}>
      <div className="absolute top-6 right-8 z-20">
        {viewMode !== 'alumni' && viewMode !== 'all-alumni' ? (
          <button onClick={() => { sfx.playClick(); setViewMode('alumni'); }} className={`text-[10px] font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer shadow-md ${
            isDark ? 'text-slate-400 hover:text-blue-400 bg-slate-900/80 border-slate-700' : 'text-slate-600 hover:text-blue-600 bg-white border-slate-300'
          }`}>
            Lihat Alumni 
          </button>
        ) : (
          <button onClick={() => { sfx.playClick(); setViewMode('default'); }} className="text-[10px] font-bold text-rose-500 hover:text-rose-400 bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-md">
            Tutup Alumni
          </button>
        )}
      </div>

      <span className={`text-xs tracking-widest uppercase block mb-4 font-mono font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
        {viewMode === 'alumni' || viewMode === 'all-alumni' ? 'ALUMNI KAMI' : 'TIM & TALENTA'}
      </span>

      <div className="relative overflow-hidden min-h-[160px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div key={viewMode} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="w-full">
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 ${viewMode === 'all' || viewMode === 'all-alumni' ? 'max-h-[380px] overflow-y-auto pr-1' : ''}`}>
              {currentList.map((item, idx) => (
                <div key={idx} onClick={() => { sfx.playSuccess(); setSelectedMember(item); }} className={`border rounded-xl p-4 text-center cursor-pointer transition-all duration-200 group flex flex-col justify-between ${
                  isDark ? 'bg-slate-900 border-slate-800 hover:border-blue-500/60' : 'bg-white border-slate-200 hover:border-blue-500/50 shadow-sm'
                } ${viewMode.includes('alumni') ? 'border-dashed opacity-90' : ''}`}>
                  <div>
                    <div className={`w-16 h-16 rounded-full mx-auto mb-3 transition-colors ${isDark ? 'bg-slate-800 group-hover:bg-blue-500/20' : 'bg-slate-100 group-hover:bg-blue-50'}`} />
                    <h4 className={`text-xs font-bold transition-colors ${isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'}`}>{item.name}</h4>
                    <p className={`text-[9px] mt-1 font-mono uppercase tracking-wider ${viewMode.includes('alumni') ? 'text-slate-500' : (isDark ? 'text-blue-400' : 'text-blue-600')}`}>
                      {item.title}
                    </p>
                  </div>
                  <div className={`mt-3 pt-2 border-t flex justify-end ${isDark ? 'border-slate-800/80' : 'border-slate-100'}`}>
                    <span className={`text-[9px] font-bold group-hover:underline ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                      Lihat Selengkapnya →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-end mt-4 pt-2">
          {viewMode === 'default' && (
            <button onClick={() => { sfx.playClick(); setViewMode('all'); }} className={`text-[10px] font-bold px-3.5 py-2 rounded-xl border transition-all cursor-pointer shadow-md flex items-center gap-1.5 ${isDark ? 'text-blue-400 bg-blue-500/10 border-blue-500/30' : 'text-blue-600 bg-blue-50 border-blue-200'}`}>
              <span>Lihat Semua Tim</span><span>↑</span>
            </button>
          )}
          {viewMode === 'all' && (
            <button onClick={() => { sfx.playClick(); setViewMode('default'); }} className={`text-[10px] font-bold px-3.5 py-2 rounded-xl border transition-all cursor-pointer shadow-md flex items-center gap-1.5 ${isDark ? 'text-slate-400 bg-slate-800 border-slate-700' : 'text-slate-600 bg-slate-100 border-slate-300'}`}>
              <span>Tutup Kembali</span><span>↓</span>
            </button>
          )}
          {viewMode === 'alumni' && (
            <button onClick={() => { sfx.playClick(); setViewMode('all-alumni'); }} className={`text-[10px] font-bold px-3.5 py-2 rounded-xl border transition-all cursor-pointer shadow-md flex items-center gap-1.5 ${isDark ? 'text-blue-400 bg-blue-500/10 border-blue-500/30' : 'text-blue-600 bg-blue-50 border-blue-200'}`}>
              <span>Lihat Semua Alumni</span><span>↑</span>
            </button>
          )}
          {viewMode === 'all-alumni' && (
            <button onClick={() => { sfx.playClick(); setViewMode('alumni'); }} className={`text-[10px] font-bold px-3.5 py-2 rounded-xl border transition-all cursor-pointer shadow-md flex items-center gap-1.5 ${isDark ? 'text-slate-400 bg-slate-800 border-slate-700' : 'text-slate-600 bg-slate-100 border-slate-300'}`}>
              <span>Tutup Kembali</span><span>↓</span>
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto font-mono" onClick={() => { sfx.playClick(); setSelectedMember(null); }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className={`border p-6 sm:p-7 rounded-3xl max-w-md w-full relative shadow-2xl space-y-5 text-left ${
              isDark ? 'bg-[#0f1225] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <button onClick={() => { sfx.playClick(); setSelectedMember(null); }} className={`absolute top-4 right-4 text-xs w-7 h-7 rounded-full border flex items-center justify-center cursor-pointer ${isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>✕</button>

              <div className={`flex items-center gap-4 border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className={`w-14 h-14 border rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 ${isDark ? 'bg-gradient-to-br from-blue-500/25 to-indigo-500/25 border-blue-500/50 text-blue-400' : 'bg-blue-50 border-blue-300 text-blue-600'}`}>
                  {selectedMember.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-base font-bold">{selectedMember.name}</h3>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-bold tracking-wider mt-1 ${isDark ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'}`}>
                    {selectedMember.title}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className={`text-[10px] uppercase tracking-widest block font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>// Kontribusi:</span>
                <p className={`text-xs leading-relaxed border p-3 rounded-xl ${isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                  {selectedMember.contribution}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className={`text-[10px] uppercase tracking-widest block font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>// Proyek Terkait:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMember.projects.map((proj, pIdx) => (
                    <span key={pIdx} className={`text-[10px] border px-2.5 py-1 rounded-lg ${isDark ? 'bg-slate-900 border-slate-800 text-blue-400' : 'bg-slate-100 border-slate-200 text-blue-700'}`}>
                      {proj}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`pt-2 flex items-center justify-between border-t ${isDark ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
                <span className="text-[10px] uppercase tracking-wider">MUDAPEDIA ID // 2026</span>
                <div className="flex items-center gap-2">
                  <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => sfx.playClick()} className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all text-xs font-bold shadow-md cursor-pointer ${isDark ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-blue-500 hover:text-blue-400' : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600'}`}>in</a>
                  <a href={selectedMember.instagram} target="_blank" rel="noopener noreferrer" onClick={() => sfx.playClick()} className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all text-xs font-bold shadow-md cursor-pointer ${isDark ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-blue-500 hover:text-blue-400' : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600'}`}>ig</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}