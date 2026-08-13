'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const coins = [
  { name: 'Bitcoin (BTC)', basePrice: 1094720000, symbol: 'BTC' },
  { name: 'Dogecoin (DOGE)', basePrice: 2000, symbol: 'DOGE' },
  { name: 'Pepe (PEPE)', basePrice: 0.192, symbol: 'PEPE' },
  { name: 'Ripple (XRP)', basePrice: 8672, symbol: 'XRP' },
];

const quickAmounts = [
  { label: 'Rp100rb', value: 100000 },
  { label: 'Rp1 Juta', value: 1000000 },
  { label: 'Rp10 Juta', value: 10000000 },
];

export default function CryptoCalculator() {
  const [selectedCoin, setSelectedCoin] = useState(coins[0]);
  const [investment, setInvestment] = useState<number>(1000000);
  const [growthRate, setGrowthRate] = useState<number>(50);

  const finalValue = investment * (1 + growthRate / 100);
  const estimatedProfit = finalValue - investment;

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: val < 10 ? 2 : 0,
      maximumFractionDigits: val < 10 ? 4 : 0,
    }).format(val);
  };

  return (
    <section className="w-full bg-[#030406] py-12 sm:py-20 px-4 sm:px-8 lg:px-24 border-b border-slate-900 overflow-hidden">
      <div className="max-w-4xl mx-auto bg-slate-900/50 border border-slate-800/80 rounded-3xl p-5 sm:p-10 backdrop-blur-xl relative shadow-2xl">
        
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 sm:space-y-8">
          
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              FITUR SIMULASI
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              Hitung-Hitungan Potensi Keuntungan
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              Coba simulasi perkiraan hasil kalau kamu nabung atau beli aset digital dari sekarang.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            
            <div className="space-y-6 flex flex-col justify-between">
              
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                  1. Pilih Jenis Koin / Aset
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {coins.map((coin) => (
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      key={coin.symbol}
                      onClick={() => setSelectedCoin(coin)}
                      className={`p-3 rounded-xl text-xs font-mono font-bold transition-all text-left border ${
                        selectedCoin.symbol === coin.symbol
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                          : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{coin.symbol}</span>
                        {selectedCoin.symbol === coin.symbol && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal truncate mt-1">
                        Harga Awal: {formatIDR(coin.basePrice)}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">
                  2. Mau Modal Berapa? (Rupiah)
                </label>
                
                <div className="flex gap-2 flex-wrap">
                  {quickAmounts.map((qa) => (
                    <button
                      key={qa.value}
                      onClick={() => setInvestment(qa.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                        investment === qa.value
                          ? 'bg-emerald-500 text-black font-bold border-emerald-500'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {qa.label}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">Rp</span>
                  <input
                    type="number"
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white font-mono text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="1000000"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    3. Perkiraan Kenaikan Harga
                  </label>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    +{growthRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="300"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-5 sm:p-8 flex flex-col justify-between space-y-6 shadow-inner">
              
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-widest">
                    Hasil Perhitungan
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Estimasi
                  </span>
                </div>
                <div className="mt-2 text-xs font-mono text-slate-400">
                  Pilihan Koin: <span className="text-white font-bold">{selectedCoin.name}</span>
                </div>
              </div>

              <div className="space-y-4 border-y border-slate-900/80 py-5">
                <div>
                  <div className="text-xs font-mono text-slate-500">Perkiraan Untung (Profit)</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1 break-words">
                    +{formatIDR(estimatedProfit)}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-slate-500">Total Uang Kamu Nanti</div>
                  <div className="text-lg sm:text-xl font-bold text-white font-mono mt-1 break-words">
                    {formatIDR(finalValue)}
                  </div>
                </div>
              </div>

              <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 leading-relaxed">
                *Ini cuma hitung-hitungan perkiraan aja ya, bukan kepastian karena harga pasar kripto bisa naik turun.
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}