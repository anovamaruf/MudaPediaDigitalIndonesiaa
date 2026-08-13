'use client';

import React from 'react';

interface CurrencySwitcherProps {
  currency: 'IDR' | 'USD';
  onCurrencyChange: (currency: 'IDR' | 'USD') => void;
}

export default function CurrencySwitcher({ currency, onCurrencyChange }: CurrencySwitcherProps) {
  return (
    <div className="inline-flex bg-slate-900 border border-slate-800 rounded-full p-1 shadow-lg">
      <button
        onClick={() => onCurrencyChange('IDR')}
        className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
          currency === 'IDR' 
            ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]' 
            : 'text-slate-400 hover:text-white'
        }`}
      >
        IDR (Rp)
      </button>
      <button
        onClick={() => onCurrencyChange('USD')}
        className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
          currency === 'USD' 
            ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]' 
            : 'text-slate-400 hover:text-white'
        }`}
      >
        USD ($)
      </button>
    </div>
  );
}