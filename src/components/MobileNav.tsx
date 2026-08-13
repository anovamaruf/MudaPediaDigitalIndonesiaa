'use client';

import React from 'react';

interface MobileNavProps {
  menuList: string[];
  activeMenu: number;
  changeMenu: (index: number) => void;
}

export default function MobileNav({ menuList, activeMenu, changeMenu }: MobileNavProps) {
  return (
    <div className="sm:hidden absolute top-4 left-0 w-full px-4 z-50 pointer-events-auto">
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-2 flex items-center justify-between shadow-2xl">
        {menuList.map((menu, i) => (
          <button
            key={i}
            onClick={() => changeMenu(i)}
            className={`flex-1 py-2.5 mx-0.5 text-[10px] font-bold rounded-xl transition-all ${
              activeMenu === i 
                ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                : 'text-slate-400 hover:text-white bg-slate-800/40'
            }`}
          >
            {menu.replace("Kami", "").trim()}
          </button>
        ))}
      </div>
    </div>
  );
}