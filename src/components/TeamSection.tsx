'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sfx } from '@/utils/soundFX';
import { useTheme } from '@/context/ThemeContext';
import { Member, mainTeam, allTeamMembers, alumniMembers, allAlumniMembers } from '@/data/internsData';

export default function TeamSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [viewMode, setViewMode] = useState<'default' | 'all' | 'alumni' | 'all-alumni'>('default');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isAlumniMode = viewMode === 'alumni' || viewMode === 'all-alumni';
  
  const baseList = isAlumniMode ? allAlumniMembers : allTeamMembers;
  const currentList = 
    searchQuery.trim() !== '' ? baseList :
    viewMode === 'all' ? allTeamMembers : 
    viewMode === 'alumni' ? alumniMembers : 
    viewMode === 'all-alumni' ? allAlumniMembers : mainTeam;

  const filteredList = currentList.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`border rounded-3xl p-8 relative w-full shadow-2xl transition-colors duration-300 ${
      isDark ? 'bg-[#0a0c16] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <span className={`text-xs tracking-widest uppercase font-mono font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          {isAlumniMode ? 'ALUMNI KAMI' : 'TIM & TALENTA'}
        </span>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Kotak Pencarian */}
          <div className="relative w-full sm:w-56">
            <input 
              type="text"
              placeholder="Cari nama atau posisi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full text-xs font-mono px-3.5 py-2 rounded-xl border outline-none transition-all ${
                isDark 
                  ? 'bg-slate-900/90 border-slate-800 text-white placeholder-slate-500 focus:border-blue-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500'
              }`}
            />
          </div>

          {/* Tombol Lihat/Tutup Alumni */}
          {!isAlumniMode ? (
            <button onClick={() => { sfx.playClick(); setViewMode('alumni'); setSearchQuery(''); }} className={`text-[10px] font-bold px-3 py-2 rounded-xl border transition-all cursor-pointer shadow-md whitespace-nowrap ${
              isDark ? 'text-slate-400 hover:text-blue-400 bg-slate-900/80 border-slate-700' : 'text-slate-600 hover:text-blue-600 bg-slate-100 border-slate-300'
            }`}>
              Lihat Alumni 
            </button>
          ) : (
            <button onClick={() => { sfx.playClick(); setViewMode('default'); setSearchQuery(''); }} className="text-[10px] font-bold text-rose-500 hover:text-rose-400 bg-rose-500/10 border border-rose-500/30 px-3 py-2 rounded-xl transition-all cursor-pointer shadow-md whitespace-nowrap">
              Tutup Alumni
            </button>
          )}
        </div>
      </div>

      <div className="relative overflow-hidden min-h-[160px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div key={viewMode + searchQuery} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="w-full">
            {filteredList.length === 0 ? (
              <div className="text-center py-10 text-xs font-mono opacity-50">
                Talenta tidak ditemukan
              </div>
            ) : (
              <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 ${viewMode === 'all' || viewMode === 'all-alumni' || searchQuery.trim() !== '' ? 'max-h-[380px] overflow-y-auto pr-1' : ''}`}>
                {filteredList.map((item, idx) => (
                  <div key={idx} onClick={() => { sfx.playSuccess(); setSelectedMember(item); }} className={`border rounded-xl p-4 text-center cursor-pointer transition-all duration-200 group flex flex-col justify-between ${
                    isDark 
                      ? 'bg-slate-900 border-slate-800 hover:border-blue-500/60' 
                      : 'bg-slate-50 border-slate-200 hover:border-blue-400 shadow-sm'
                  } ${isAlumniMode ? 'border-dashed opacity-90' : ''}`}>
                    <div>
                      {/* Avatar Cloudinary */}
                      <div className={`w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden border transition-all ${
                        isDark ? 'border-slate-700 group-hover:border-blue-500' : 'border-slate-300 group-hover:border-blue-400'
                      }`}>
                        <img 
                          src={item.avatar} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                        />
                      </div>
                      <h4 className={`text-xs font-bold transition-colors ${
                        isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
                      }`}>{item.name}</h4>
                      <p className={`text-[9px] mt-1 font-mono uppercase tracking-wider ${
                        isAlumniMode ? 'text-slate-500' : (isDark ? 'text-blue-400' : 'text-blue-600')
                      }`}>
                        {item.title}
                      </p>
                    </div>
                    <div className={`mt-3 pt-2 border-t flex justify-end ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
                      <span className={`text-[9px] font-bold group-hover:underline ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                        Lihat Selengkapnya →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-end mt-4 pt-2">
          {viewMode === 'default' && searchQuery.trim() === '' && (
            <button onClick={() => { sfx.playClick(); setViewMode('all'); }} className="text-[10px] font-bold px-3.5 py-2 rounded-xl border transition-all cursor-pointer shadow-md flex items-center gap-1.5 text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30">
              <span>Lihat Semua Tim</span><span>↑</span>
            </button>
          )}
          {viewMode === 'all' && searchQuery.trim() === '' && (
            <button onClick={() => { sfx.playClick(); setViewMode('default'); }} className={`text-[10px] font-bold px-3.5 py-2 rounded-xl border transition-all cursor-pointer shadow-md flex items-center gap-1.5 ${
              isDark ? 'text-slate-400 bg-slate-800 border-slate-700' : 'text-slate-700 bg-slate-100 border-slate-300'
            }`}>
              <span>Tutup Kembali</span><span>↓</span>
            </button>
          )}
          {viewMode === 'alumni' && searchQuery.trim() === '' && (
            <button onClick={() => { sfx.playClick(); setViewMode('all-alumni'); }} className="text-[10px] font-bold px-3.5 py-2 rounded-xl border transition-all cursor-pointer shadow-md flex items-center gap-1.5 text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30">
              <span>Lihat Semua Alumni</span><span>↑</span>
            </button>
          )}
          {viewMode === 'all-alumni' && searchQuery.trim() === '' && (
            <button onClick={() => { sfx.playClick(); setViewMode('alumni'); }} className={`text-[10px] font-bold px-3.5 py-2 rounded-xl border transition-all cursor-pointer shadow-md flex items-center gap-1.5 ${
              isDark ? 'text-slate-400 bg-slate-800 border-slate-700' : 'text-slate-700 bg-slate-100 border-slate-300'
            }`}>
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
              <button onClick={() => { sfx.playClick(); setSelectedMember(null); }} className={`absolute top-4 right-4 text-xs w-7 h-7 rounded-full border flex items-center justify-center cursor-pointer ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}>✕</button>

              <div className={`flex items-center gap-4 border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className="w-14 h-14 rounded-2xl overflow-hidden border shrink-0 border-blue-500/50">
                  <img src={selectedMember.avatar} alt={selectedMember.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-bold">{selectedMember.name}</h3>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-bold tracking-wider mt-1 ${
                    isDark ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700'
                  }`}>
                    {selectedMember.title}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className={`text-[10px] uppercase tracking-widest block font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>// Kontribusi:</span>
                <p className={`text-xs leading-relaxed border p-3 rounded-xl ${
                  isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  {selectedMember.contribution}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className={`text-[10px] uppercase tracking-widest block font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>// Proyek Terkait:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMember.projects.map((proj, pIdx) => (
                    <span key={pIdx} className={`text-[10px] border px-2.5 py-1 rounded-lg ${
                      isDark ? 'bg-slate-900 border-slate-800 text-blue-400' : 'bg-slate-50 border-slate-200 text-blue-700'
                    }`}>
                      {proj}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`pt-2 flex items-center justify-between border-t ${isDark ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-500'}`}>
                <span className="text-[10px] uppercase tracking-wider">MUDAPEDIA ID // 2026</span>
                <div className="flex items-center gap-2">
                  <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => sfx.playClick()} className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all text-xs font-bold shadow-md cursor-pointer ${
                    isDark ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-blue-500 hover:text-blue-400' : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600'
                  }`}>in</a>
                  <a href={selectedMember.instagram} target="_blank" rel="noopener noreferrer" onClick={() => sfx.playClick()} className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all text-xs font-bold shadow-md cursor-pointer ${
                    isDark ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-blue-500 hover:text-blue-400' : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600'
                  }`}>ig</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}