'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { sfx } from '@/utils/soundFX';

interface Review {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  date: string;
}

const initialTestimonials: Review[] = [
  {
    id: 1,
    quote: "Kolaborasi dengan PT Mudapedia dalam pengembangan infrastruktur desentralisasi memberikan dampak performa dan keamanan tingkat tinggi bagi ekosistem kami.",
    author: "Direktur Teknologi",
    role: "Lead Infrastructure",
    company: "Official Pavo",
    rating: 5,
    date: "2 September 2026"
  },
  {
    id: 2,
    quote: "Standar arsitektur smart contract dan ekosistem Web3 yang dieksekusi Mudapedia sangat profesional dan berstandar korporat global.",
    author: "Chief Executive Officer",
    role: "Project Lead",
    company: "Nagapara",
    rating: 5,
    date: "1 September 2026"
  },
  {
    id: 3,
    quote: "Solusi teknis yang mendalam serta ketepatan waktu pengerjaan membuat kami sangat percaya menjadikan Mudapedia sebagai mitra jangka panjang.",
    author: "Head of Development",
    role: "Core Engineer",
    company: "Gaswin Artha Suar",
    rating: 5,
    date: "31 Agustus 2026"
  }
];

export default function TestimonialsSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [reviews, setReviews] = useState<Review[]>(initialTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);

  // Load ulasan dari localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const savedReviews = localStorage.getItem('mudapedia_public_reviews');
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (e) {
        console.error("Gagal memuat ulasan tersimpan", e);
      }
    }
  }, []);

  // Form input state
  const [inputAuthor, setInputAuthor] = useState('');
  const [inputCompany, setInputCompany] = useState('');
  const [inputQuote, setInputQuote] = useState('');
  const [inputRating, setInputRating] = useState(5);
  const [successNotif, setSuccessNotif] = useState(false);

  const nextTestimonial = () => {
    sfx.playClick();
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevTestimonial = () => {
    sfx.playClick();
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputAuthor.trim() || !inputQuote.trim()) return;

    const newRev: Review = {
      id: Date.now(),
      quote: inputQuote.trim(),
      author: inputAuthor.trim(),
      role: "Publik / Klien Mandiri",
      company: inputCompany.trim() || "Publik Umum",
      rating: Number(inputRating),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    const updatedReviews = [newRev, ...reviews];
    setReviews(updatedReviews);

    // Simpan secara permanen ke localStorage browser
    localStorage.setItem('mudapedia_public_reviews', JSON.stringify(updatedReviews));

    setCurrentIndex(0);
    setInputAuthor('');
    setInputCompany('');
    setInputQuote('');
    setInputRating(5);
    setShowForm(false);
    setSuccessNotif(true);
    setTimeout(() => setSuccessNotif(false), 4000);
  };

  const current = reviews[currentIndex] || reviews[0];

  return (
    <div className={`w-full max-w-4xl p-6 sm:p-8 rounded-3xl border shadow-2xl font-mono mx-auto space-y-6 transition-colors duration-300 ${
      isDark ? 'bg-[#0a0c16] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
    }`}>
      
      {/* Header & Tombol Tulis Ulasan Mandiri */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className={`text-xs font-bold tracking-widest uppercase ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            ULASAN & TESTIMONI PUBLIK
          </h3>
          <p className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Ulasan dan penilaian mandiri dari publik serta mitra korporat.</p>
        </div>

        <button
          onClick={() => { sfx.playClick(); setShowForm(!showForm); }}
          className={`px-4 py-2 rounded-xl border text-xs font-bold tracking-wider transition-all cursor-pointer shadow-md ${
            isDark 
              ? 'border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400' 
              : 'border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700'
          }`}
        >
          {showForm ? "Tutup Form ✕" : "+ Tambahkan Ulasan "}
        </button>
      </div>

      {successNotif && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-center font-bold">
          Terima kasih! Ulasan mandiri Anda berhasil tersimpan secara permanen.
        </div>
      )}

      {/* Form Input Ulasan Publik */}
      <AnimatePresence>
        {showForm && (
          <motion.form 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmitReview}
            className={`p-5 rounded-2xl border space-y-4 ${
              isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-slate-50'
            }`}
          >
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Tulis Ulasan Anda Disini</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={`block text-[10px] mb-1 font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Nama / Jabatan *</label>
                <input 
                  type="text" 
                  required
                  value={inputAuthor}
                  onChange={(e) => setInputAuthor(e.target.value)}
                  placeholder="Contoh: Budi Santoso / CTO"
                  className={`w-full rounded-xl px-3 py-2 text-xs border outline-none ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-blue-500' : 'bg-white border-slate-300 text-slate-900 focus:border-blue-600'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-[10px] mb-1 font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Instansi / Perusahaan</label>
                <input 
                  type="text"
                  value={inputCompany}
                  onChange={(e) => setInputCompany(e.target.value)}
                  placeholder="Contoh: PT Teknologi Nusantara"
                  className={`w-full rounded-xl px-3 py-2 text-xs border outline-none ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-blue-500' : 'bg-white border-slate-300 text-slate-900 focus:border-blue-600'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-[10px] mb-1 font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Rating Bintang (1 - 5)</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setInputRating(star)}
                    className={`text-base transition-transform hover:scale-125 cursor-pointer ${
                      star <= inputRating ? 'text-amber-400' : (isDark ? 'text-slate-600' : 'text-slate-300')
                    }`}
                  >
                    ★
                  </button>
                ))}
                <span className="text-[11px] text-amber-400 font-bold">({inputRating}/5)</span>
              </div>
            </div>

            <div>
              <label className={`block text-[10px] mb-1 font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Komentar / Ulasan *</label>
              <textarea 
                required
                rows={3}
                value={inputQuote}
                onChange={(e) => setInputQuote(e.target.value)}
                placeholder="Tulis ulasan dan pengalaman Anda di sini..."
                className={`w-full rounded-xl p-3 text-xs border outline-none resize-none ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-blue-500' : 'bg-white border-slate-300 text-slate-900 focus:border-blue-600'
                }`}
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  isDark ? 'border-slate-800 hover:bg-slate-800 text-slate-400' : 'border-slate-300 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Kirim Ulasan 
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Tampilan Slider Card Ulasan */}
      <div className="relative min-h-[160px] flex flex-col justify-between">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1">
            {[...Array(current?.rating || 5)].map((_, i) => (
              <span key={i} className="text-amber-400 text-xs">★</span>
            ))}
          </div>
          <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            0{currentIndex + 1} / 0{reviews.length} — {current?.date}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current?.id || currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <p className={`text-xs sm:text-sm leading-relaxed italic ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              &ldquo;{current?.quote}&rdquo;
            </p>
            <div className={`pt-4 border-t flex justify-between items-end ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <div>
                <h4 className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{current?.author}</h4>
                <p className={`text-[10px] font-mono mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {current?.role} — <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{current?.company}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={prevTestimonial}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer shadow-md ${
              isDark ? 'border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:border-blue-500' : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
            }`}
          >
            ← Prev
          </button>
          <button
            onClick={nextTestimonial}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer shadow-md ${
              isDark ? 'border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:border-blue-500' : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}