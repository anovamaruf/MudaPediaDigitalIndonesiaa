'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function EditorialManifesto() {
  const pillars = [
    {
      number: "01",
      title: "ARCHITECTURAL PRECISION",
      desc: "Kami tidak merancang template instan. Setiap baris kode ditulis dengan presisi tingkat institusi untuk memastikan keamanan dan skalabilitas mutlak."
    },
    {
      number: "02",
      title: "DECENTRALIZED AUTHORITY",
      desc: "Membangun ekosistem Web3 yang tidak hanya fungsional secara teknis, tetapi juga mendominasi pasar melalui strategi ekonomi token yang matang."
    },
    {
      number: "03",
      title: "CINEMATIC DIGITAL UX",
      desc: "Menggabungkan performa tinggi Next.js dengan estetika visual sinematik untuk menciptakan pengalaman pengguna yang memenangkan penghargaan."
    }
  ];

  return (
    <section className="w-full py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-slate-900 bg-[#030406] font-mono text-white">
      {/* Header Editorial */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-8 border-b border-slate-800/80 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-[10px] font-bold tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            MANIFESTO & PHILOSOPHY
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Standar Baru Agensi Web3 Global
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
          Terinspirasi dari presisi desain industrial dan standar tertinggi rekayasa perangkat lunak, kami mendefinisikan ulang cara dunia melihat agensi teknologi dari Indonesia.
        </p>
      </div>

      {/* Grid Editorial Ala United Carriers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pillars.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            className="group relative bg-[#0a0c16] border border-slate-800 hover:border-emerald-500/50 p-8 rounded-2xl flex flex-col justify-between transition-all duration-500 overflow-hidden"
          >
            {/* Efek Cahaya Halus di Sudut */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-500" />

            <div>
              <div className="flex justify-between items-center mb-12">
                <span className="text-xs font-bold text-slate-500 group-hover:text-emerald-400 transition-colors">
                  [{item.number}]
                </span>
                <div className="w-2 h-2 rounded-full bg-slate-800 group-hover:bg-emerald-400 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-all duration-300" />
              </div>
              
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="mt-12 pt-6 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
              <span>SYSTEM_CORE</span>
              <span className="text-emerald-400 font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">EXPLORE →</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}