'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, X, Globe } from 'lucide-react';
import { internsData, Intern } from '../data/internsData';

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

function ModernTeamCard({ member, onSelect, isDark }: { member: Intern; onSelect: (m: Intern) => void; isDark: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      onClick={() => onSelect(member)}
      className={`group relative rounded-[32px] p-6 cursor-pointer overflow-hidden backdrop-blur-xl shadow-2xl transition-all duration-300 flex flex-col justify-between w-full sm:w-[280px] min-h-[360px] ${
        isDark 
          ? 'bg-[#090d1f]/70 border border-slate-800/90 hover:border-indigo-500/80' 
          : 'bg-white/80 border border-slate-200 hover:border-sky-500 shadow-slate-200'
      }`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[32px]"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${isDark ? 'rgba(99, 102, 241, 0.18)' : 'rgba(2, 132, 199, 0.12)'}, transparent 80%)`,
        }}
      />

      <div>
        <div className="relative w-28 h-28 mx-auto mb-5">
          <div className={`absolute inset-0 rounded-full blur-md opacity-30 group-hover:opacity-80 transition-opacity ${isDark ? 'bg-gradient-to-tr from-indigo-500 to-purple-500' : 'bg-gradient-to-tr from-sky-400 to-indigo-500'}`} />
          <img
            src={member.avatar}
            alt={member.name}
            loading="lazy"
            className={`relative w-full h-full rounded-full object-cover border-2 transition-all duration-300 shadow-xl ${
              isDark ? 'border-indigo-500/40 group-hover:border-indigo-400' : 'border-sky-400/50 group-hover:border-sky-500'
            } group-hover:scale-105`}
          />
          {member.isActive && (
            <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full shadow-lg ${isDark ? 'bg-emerald-500 border-2 border-[#090d1f]' : 'bg-emerald-500 border-2 border-white'}`} />
          )}
        </div>

        <div className="text-center">
          <h3 className={`font-extrabold text-xl transition-colors ${isDark ? 'text-white group-hover:text-indigo-300' : 'text-slate-900 group-hover:text-sky-600'}`}>
            {member.name}
          </h3>
          <p className={`text-xs font-semibold mt-1 mb-3 ${isDark ? 'text-indigo-400' : 'text-sky-600'}`}>{member.role}</p>

          <span className={`inline-block text-[11px] font-medium px-3 py-1 rounded-full border ${
            isDark ? 'bg-slate-900/90 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
          }`}>
            Batch {member.batch} • {member.year}
          </span>
        </div>
      </div>

      <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs ${isDark ? 'border-slate-800/80' : 'border-slate-100'}`}>
        <span className={`flex items-center gap-1.5 font-bold px-2.5 py-1 rounded-lg border ${
          isDark ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-emerald-600 bg-emerald-50 border-emerald-200'
        }`}>
          <Award size={13} /> {member.activityScore}
        </span>

        <div className="flex gap-2">
          {member.socials.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`p-1.5 rounded-lg transition-colors ${isDark ? 'bg-slate-800/80 text-slate-400 hover:bg-indigo-600 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-sky-600 hover:text-white'}`}
            >
              <LinkedinIcon />
            </a>
          )}
          {member.socials.instagram && (
            <a
              href={member.socials.instagram}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`p-1.5 rounded-lg transition-colors ${isDark ? 'bg-slate-800/80 text-slate-400 hover:bg-indigo-600 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-sky-600 hover:text-white'}`}
            >
              <InstagramIcon />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Team({ isDark }: { isDark: boolean }) {
  const tabsList = ['all', 'tim', 'magang', 'alumni'] as const;
  type TabType = typeof tabsList[number];

  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  // Fungsi untuk menangani klik pada tab navigasi agar arah animasi (kiri/kanan) otomatis dinamis
  const handleTabChange = (newTab: TabType) => {
    const currentIndex = tabsList.indexOf(activeTab);
    const newIndex = tabsList.indexOf(newTab);

    // Jika geser ke kanan (index bertambah) -> dir = 1 (Slide Kanan ke Kiri)
    // Jika geser ke kiri (index berkurang) -> dir = -1 (Slide Kiri ke Kanan)
    if (newIndex > currentIndex) {
      setDirection(1);
    } else if (newIndex < currentIndex) {
      setDirection(-1);
    }

    setActiveTab(newTab);
    setCurrentSlide(0);
  };

  const filteredTeam = internsData.filter((member) => {
    const isIntern = member.role.toLowerCase().includes('intern');
    if (activeTab === 'tim') return !member.isAlumni && !isIntern;
    if (activeTab === 'magang') return !member.isAlumni && isIntern;
    if (activeTab === 'alumni') return member.isAlumni === true;
    return true;
  });

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredTeam.length / itemsPerPage);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % (totalPages || 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalPages) % (totalPages || 1));
  };

  // Variasi animasi geser 2 arah dinamis
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  return (
    <section id="team" className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className={`text-xs font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-indigo-400' : 'text-sky-600'}`}>Tim Kami</h2>
          <p className={`text-3xl sm:text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Meet Our Team</p>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Bersatu dalam visi, beragam dalam karya. Tim Mudapedia hadir untuk menghadirkan pengetahuan, kreativitas, dan solusi digital bagi generasi muda Indonesia.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className={`inline-flex p-1.5 rounded-full border shadow-xl flex-wrap justify-center gap-1 ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-slate-200'}`}>
            {tabsList.map((tab) => (
              <motion.button
                key={tab}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabChange(tab)}
                className={`px-5 sm:px-6 py-2 rounded-full text-xs font-bold transition-all capitalize ${
                  activeTab === tab 
                    ? (isDark ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-600/30')
                    : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                {tab === 'all' ? 'Semua' : tab === 'tim' ? 'Tim' : tab === 'magang' ? 'Magang' : 'Alumni'}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="relative group px-2 py-4">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide + activeTab}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 350, damping: 30 },
                opacity: { duration: 0.18 },
              }}
              className="flex flex-wrap justify-center gap-6 items-stretch"
            >
              {filteredTeam
                .slice(currentSlide * itemsPerPage, (currentSlide + 1) * itemsPerPage)
                .map((member) => (
                  <ModernTeamCard key={member.id} member={member} onSelect={(m) => setSelectedIntern(m)} isDark={isDark} />
                ))}
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <>
              <button
                onClick={prevSlide}
                className={`absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-20 ${
                  isDark ? 'bg-slate-900/90 border-slate-700 hover:bg-indigo-600' : 'bg-sky-600 border-sky-500 hover:bg-sky-700'
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className={`absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-20 ${
                  isDark ? 'bg-slate-900/90 border-slate-700 hover:bg-indigo-600' : 'bg-sky-600 border-sky-500 hover:bg-sky-700'
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentSlide ? 1 : -1);
                  setCurrentSlide(idx);
                }}
                className={`transition-all duration-300 ${
                  currentSlide === idx
                    ? (isDark ? 'w-6 h-2.5 bg-indigo-500 rounded-full shadow-md shadow-indigo-500/50' : 'w-6 h-2.5 bg-sky-600 rounded-full shadow-md shadow-sky-600/50')
                    : (isDark ? 'w-2.5 h-2.5 bg-slate-800 rounded-full hover:bg-slate-600' : 'w-2.5 h-2.5 bg-slate-300 rounded-full hover:bg-slate-400')
                }`}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* MODAL PORTOFOLIO TIM / MAGANG */}
      <AnimatePresence>
        {selectedIntern && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`border rounded-3xl max-w-lg w-full p-6 relative shadow-2xl ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <button
                onClick={() => setSelectedIntern(null)}
                className={`absolute top-4 right-4 p-2 rounded-xl transition-colors ${
                  isDark ? 'text-slate-400 hover:text-white bg-slate-800/80' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                }`}
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <img src={selectedIntern.avatar} alt={selectedIntern.name} className={`w-16 h-16 rounded-full object-cover border-2 ${isDark ? 'border-indigo-500' : 'border-sky-500'}`} />
                <div>
                  <h2 className="text-xl font-bold">{selectedIntern.name}</h2>
                  <p className={`text-xs font-medium ${isDark ? 'text-indigo-400' : 'text-sky-600'}`}>{selectedIntern.role}</p>
                  <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Batch {selectedIntern.batch} ({selectedIntern.year})</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Tentang Talenta</h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{selectedIntern.bio}</p>
              </div>

              <div className="mb-6">
                <h4 className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Riwayat Kontribusi Proyek</h4>
                <div className="space-y-2">
                  {selectedIntern.contributions.map((item, idx) => (
                    <div key={idx} className={`text-xs border p-3 rounded-xl flex items-start gap-2 ${
                      isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      <span className={isDark ? 'text-indigo-400 font-bold' : 'text-sky-600 font-bold'}>•</span> {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className={`flex gap-3 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                {selectedIntern.socials.linkedin && (
                  <a href={selectedIntern.socials.linkedin} target="_blank" rel="noreferrer" className={`p-2.5 rounded-xl transition-colors text-white ${isDark ? 'bg-slate-800 hover:bg-indigo-600' : 'bg-slate-800 hover:bg-sky-600'}`}>
                    <LinkedinIcon />
                  </a>
                )}
                {selectedIntern.socials.github && (
                  <a href={selectedIntern.socials.github} target="_blank" rel="noreferrer" className={`p-2.5 rounded-xl transition-colors text-white ${isDark ? 'bg-slate-800 hover:bg-indigo-600' : 'bg-slate-800 hover:bg-sky-600'}`}>
                    <Globe size={18} />
                  </a>
                )}
                {selectedIntern.socials.instagram && (
                  <a href={selectedIntern.socials.instagram} target="_blank" rel="noreferrer" className={`p-2.5 rounded-xl transition-colors text-white ${isDark ? 'bg-slate-800 hover:bg-indigo-600' : 'bg-slate-800 hover:bg-sky-600'}`}>
                    <InstagramIcon />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}