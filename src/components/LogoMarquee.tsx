'use client';

import React from 'react';

export default function LogoMarquee({ isDark }: { isDark: boolean }) {
  const partners = [
    "Official Pavo", "Nagapara", "Gaswin Artha Suar", "Digital Blockchain Indonesia", "Garuda Exchanger"
  ];

  return (
    <div className={`border-y py-6 mb-20 overflow-hidden relative backdrop-blur-md ${
      isDark ? 'border-slate-800/80 bg-slate-950/60' : 'border-slate-200 bg-white/80'
    }`}>
      <div className={`absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r to-transparent z-10 pointer-events-none ${isDark ? 'from-[#050711]' : 'from-slate-50'}`} />
      <div className={`absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l to-transparent z-10 pointer-events-none ${isDark ? 'from-[#050711]' : 'from-slate-50'}`} />

      <div className="animate-smooth-marquee gap-16">
        {[...partners, ...partners, ...partners, ...partners].map((partner, i) => (
          <div key={i} className={`flex items-center gap-3 text-xs font-black tracking-widest uppercase transition-colors shrink-0 ${
            isDark ? 'text-slate-400/80 hover:text-indigo-400' : 'text-slate-600 hover:text-sky-600'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-indigo-500 shadow-sm shadow-indigo-500/80' : 'bg-sky-500'}`} />
            {partner}
          </div>
        ))}
      </div>
    </div>
  );
}