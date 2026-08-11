'use client';

import React from 'react';

export default function MarqueeSection() {
  return (
    <div className="w-full bg-[#05060f] py-4 border-b border-slate-800 overflow-hidden relative group">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 20s linear infinite; }
        .group:hover .animate-marquee { animation-play-state: paused; }
      `}</style>
      <div className="animate-marquee gap-8 items-center cursor-pointer">
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="text-xs font-mono font-bold text-slate-500 tracking-widest uppercase flex items-center gap-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" /> GARUDA EXCHANGER
            </span>
            <span className="text-xs font-mono font-bold text-slate-500 tracking-widest uppercase flex items-center gap-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" /> OFFICIAL PAVO
            </span>
            <span className="text-xs font-mono font-bold text-slate-500 tracking-widest uppercase flex items-center gap-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" /> NAGAPARA
            </span>
            <span className="text-xs font-mono font-bold text-slate-500 tracking-widest uppercase flex items-center gap-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" /> GASWIN ARTHA SUAR
            </span>
            <span className="text-xs font-mono font-bold text-slate-500 tracking-widest uppercase flex items-center gap-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" /> DIGITAL BLOCKCHAIN
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}