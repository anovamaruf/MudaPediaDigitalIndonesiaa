'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { sfx } from '@/utils/soundFX';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Kolaborasi dengan PT Mudapedia dalam pengembangan infrastruktur desentralisasi memberikan dampak performa dan keamanan tingkat tinggi bagi ekosistem kami.",
    author: "Direktur Teknologi",
    role: "Lead Infrastructure",
    company: "Official Pavo"
  },
  {
    quote: "Standar arsitektur smart contract dan ekosistem Web3 yang dieksekusi Mudapedia sangat profesional dan berstandar korporat global.",
    author: "Chief Executive Officer",
    role: "Project Lead",
    company: "Nagapara"
  },
  {
    quote: "Solusi teknis yang mendalam serta ketepatan waktu pengerjaan membuat kami sangat percaya menjadikan Mudapedia sebagai mitra jangka panjang.",
    author: "Head of Development",
    role: "Core Engineer",
    company: "Gaswin Artha Suar"
  }
];

export default function TestimonialsSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    sfx.playClick();
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    sfx.playClick();
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="w-full max-w-4xl p-6 sm:p-8 rounded-3xl border bg-[#0a0c16] border-slate-800 text-white shadow-2xl font-mono mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-bold tracking-widest text-blue-400 uppercase">
          TESTIMONI MITRA KORPORAT
        </h3>
        <span className="text-xs text-slate-400 font-mono">
          0{currentIndex + 1} / 0{testimonials.length}
        </span>
      </div>

      <div className="relative min-h-[160px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              &ldquo;{current.quote}&rdquo;
            </p>
            <div className="pt-4 border-t border-slate-800 flex justify-between items-end">
              <div>
                <h4 className="font-bold text-xs text-white">{current.author}</h4>
                <p className="text-[10px] text-blue-400 font-mono mt-0.5">
                  {current.role} — <span className="text-slate-300">{current.company}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={prevTestimonial}
            className="px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-bold text-slate-300 hover:text-white hover:border-blue-500 transition-colors cursor-pointer shadow-md"
          >
            ← Prev
          </button>
          <button
            onClick={nextTestimonial}
            className="px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-bold text-slate-300 hover:text-white hover:border-blue-500 transition-colors cursor-pointer shadow-md"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}