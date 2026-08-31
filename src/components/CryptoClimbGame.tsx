'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface Stage {
  id: number;
  title: string;
  description: string;
  options: {
    text: string;
    isCorrect: boolean;
    failMessage?: string;
  }[];
}

const STAGES: Stage[] = [
  {
    id: 0,
    title: "Basecamp: Persiapan Logistik",
    description: "Sebelum mendaki, kamu butuh rencana matang. Bagaimana caramu memulai proyek token ini?",
    options: [
      { text: "All-in modal nekat tanpa roadmap & whitepaper.", isCorrect: false, failMessage: "Langkah terhenti! Tanpa navigasi yang jelas, tokenmu langsung kehilangan arah dan ditinggal investor di basecamp." },
      { text: "Siapkan tokenomics, roadmap, dan utilitas yang jelas.", isCorrect: true }
    ]
  },
  {
    id: 1,
    title: "Pos 1: Hutan Smart Contract",
    description: "Cuaca market mulai ekstrem. Kamu butuh smart contract yang kebal dari serangan hacker.",
    options: [
      { text: "Audit & rakit Smart Contract bareng ahli di Mudapedia.", isCorrect: true },
      { text: "Copy-paste kodingan antah-berantah dari internet.", isCorrect: false, failMessage: "Jatuh ke jurang! Smart contract-mu memiliki celah eksploitasi dan dana likuiditas terkuras habis (Hacked)." }
    ]
  },
  {
    id: 2,
    title: "Pos 2: Punggung Bukit Komunitas",
    description: "Trek makin menanjak. Token butuh kepercayaan komunitas untuk bisa bertahan.",
    options: [
      { text: "Gunakan bot palsu biar grup Telegram terlihat ramai.", isCorrect: false, failMessage: "Terkena badai bad reviews! Komunitas sadar itu bot, kepercayaan hancur, harga token longsor ke titik nol (Rug pull)." },
      { text: "Bangun website profesional & transparansi via Mudapedia.", isCorrect: true }
    ]
  },
  {
    id: 3,
    title: "Summit Attack: Peluncuran Koin",
    description: "Puncak sudah di depan mata! Bagaimana caramu me-listing token ini ke pasar?",
    options: [
      { text: "Listing resmi dan kunci likuiditas di Garuda Exchanger.", isCorrect: true },
      { text: "Listing sembarangan dan diam-diam tarik modal (Sell-off).", isCorrect: false, failMessage: "Dibanned! Kamu gagal muncak karena terdeteksi melakukan penipuan. Proyekmu diblokir dari semua bursa." }
    ]
  }
];

export default function CryptoClimbGame() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [gameState, setGameState] = useState<'start' | 'playing' | 'won' | 'lost'>('start');
  const [currentStage, setCurrentStage] = useState(0);
  const [failReason, setFailReason] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleOptionClick = (isCorrect: boolean, failMessage?: string) => {
    if (isCorrect) {
      if (currentStage === STAGES.length - 1) {
        setGameState('won');
      } else {
        setCurrentStage((prev) => prev + 1);
      }
    } else {
      setFailReason(failMessage || "Kamu salah langkah dan terperosok!");
      setGameState('lost');
    }
  };

  const resetGame = () => {
    setGameState('start');
    setCurrentStage(0);
    setFailReason('');
    setShowPopup(false);
  };

  const handleWhatsApp = () => {
    const phoneNumber = "6285119836002";
    const message = encodeURIComponent("Halo Mudapedia, saya telah menyelesaikan simulasi pendakian token dan ingin berkonsultasi lebih lanjut!");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleScrollToPricing = () => {
    setShowPopup(false);
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const buttons = document.querySelectorAll('button');
        buttons.forEach((btn) => {
          if (btn.textContent?.includes('Paket') && !btn.textContent?.includes('Lihat')) {
            (btn as HTMLButtonElement).click();
          }
        });
      }, 300);
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto p-5 sm:p-6 font-mono rounded-2xl border shadow-xl relative overflow-hidden pointer-events-auto transition-colors ${
      isDark ? 'bg-[#0a0c16] border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-slate-200'
    }`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-[50px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div key="start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-4 py-4 relative z-10">
            <h2 className="text-xl font-bold tracking-tight">Mendaki ke Puncak Crypto</h2>
            <p className={`text-xs max-w-xs mx-auto leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Setiap koin yang sukses butuh persiapan matang layaknya muncak ke gunung tinggi. Ambil keputusan yang tepat agar tokenmu melesat <i>To The Moon</i>!
            </p>
            <button onClick={() => setGameState('playing')} className="mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer text-xs">
              Mulai Pendakian 
            </button>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div key="playing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 relative z-10">
            <div className="flex justify-between items-center mb-4 relative">
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 rounded-full -z-10 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full -z-10 transition-all duration-500" style={{ width: `${(currentStage / (STAGES.length - 1)) * 100}%` }} />
              {STAGES.map((stage, idx) => (
                <div key={stage.id} className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-colors ${
                  idx <= currentStage ? 'bg-blue-600 border-blue-500 text-white' : isDark ? 'bg-slate-900 border-slate-700 text-slate-500' : 'bg-white border-slate-300 text-slate-400'
                }`}>
                  {idx === STAGES.length - 1 ? '🚩' : idx}
                </div>
              ))}
            </div>

            <div className={`border p-4 rounded-xl shadow-xl ${isDark ? 'bg-slate-900/80 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
              <span className="text-blue-500 text-[10px] font-bold uppercase tracking-wider">{STAGES[currentStage].title}</span>
              <h3 className={`text-sm mt-1 mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>{STAGES[currentStage].description}</h3>
              <div className="space-y-2">
                {STAGES[currentStage].options.map((option, idx) => (
                  <button key={idx} onClick={() => handleOptionClick(option.isCorrect, option.failMessage)} className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer text-xs ${
                    isDark ? 'border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-blue-500 text-slate-300 hover:text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-blue-500 text-slate-700'
                  }`}>
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'lost' && (
          <motion.div key="lost" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="text-center space-y-4 py-4 relative z-10">
            <h2 className="text-lg font-bold text-rose-500">RUG PULL! Pendakian Gagal</h2>
            <p className="text-xs text-rose-400 max-w-xs mx-auto p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">{failReason}</p>
            <button onClick={resetGame} className={`mt-2 border font-bold py-2 px-5 rounded-xl transition-all cursor-pointer text-xs ${isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-white' : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'}`}>
              Coba Pendakian Lagi
            </button>
          </motion.div>
        )}

        {gameState === 'won' && (
          <motion.div key="won" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="text-center space-y-4 py-4 relative z-10">
            <button onClick={resetGame} className={`absolute -top-2 right-0 border px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer shadow-md ${isDark ? 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-300' : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'}`}>
              Kembali
            </button>
            <h2 className="text-xl font-bold text-blue-500">TO THE MOON!</h2>
            <p className={`text-xs max-w-xs mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Selamat! Kamu berhasil mencapai puncak. Keputusan yang tepat dan bermitra dengan Mudapedia membuat tokenmu aman, legal, dan sukses mengudara.
            </p>
            <div className="pt-2 flex justify-center">
              <button onClick={() => setShowPopup(true)} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer text-xs">
                Bangun Proyek Nyatamu Sekarang
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPopup && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto">
            <motion.div initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 20 }} className={`border p-6 rounded-2xl max-w-sm w-full text-center space-y-4 shadow-2xl relative ${isDark ? 'bg-[#0f1225] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
              <button onClick={() => setShowPopup(false)} className={`absolute top-3 right-3 text-xs w-6 h-6 rounded-full border flex items-center justify-center cursor-pointer ${isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                ✕
              </button>
              <div className="space-y-1">
                <h3 className="text-base font-bold">Langkah Selanjutnya</h3>
                <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Pilih opsi di bawah untuk melihat rincian harga paket atau langsung terhubung dengan tim ahli kami.</p>
              </div>
              <div className="space-y-2 pt-1">
                <button onClick={handleScrollToPricing} className={`w-full py-2.5 px-4 border rounded-xl font-bold text-xs transition-all cursor-pointer ${isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-white' : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'}`}>
                  Lihat Harga Paket
                </button>
                <button onClick={handleWhatsApp} className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer">
                  Konsultasi via WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}