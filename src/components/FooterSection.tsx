'use client';

import React from 'react';

export default function FooterSection() {
  return (
    <footer className="w-full bg-[#030406] py-16 px-6 sm:px-12 lg:px-24 flex flex-col justify-center border-t border-slate-900 font-mono">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><span className="text-emerald-400 text-2xl">M</span> Mudapedia Digital Indonesia</h3>
          <p className="text-slate-500 text-xs mt-4">Mari ciptakan obsesi baru dengan diri kita!</p>
          <div className="mt-8">
            <p className="text-white text-xs font-bold">Senin - Jum'at</p>
            <p className="text-slate-500 text-xs mt-1">08.00 - 16.00 WIB</p>
          </div>
        </div>
        <div>
          <h4 className="text-white text-sm font-bold mb-6">Galeri & Kontak</h4>
          <p className="text-slate-500 text-xs mb-2">Telepon : <span className="text-indigo-400">0851-1983-6002</span></p>
          <p className="text-slate-500 text-xs mb-6">Email : <span className="text-indigo-400">mudapediadigitalindonesia.com</span></p>
          <h4 className="text-white text-sm font-bold mb-2">Banyuwangi</h4>
          <p className="text-slate-500 text-xs leading-relaxed">Perum Gedong Blok. D No.5<br/>Kertosari, Kec. Banyuwangi, Kabupaten<br/>Banyuwangi, Jawa Timur 68418</p>
        </div>
        <div>
          <h4 className="text-white text-sm font-bold mb-6">Perusahaan</h4>
          <ul className="text-slate-500 text-xs space-y-3">
            <li className="hover:text-emerald-400 cursor-pointer transition-colors">Tentang Kami</li>
            <li className="hover:text-emerald-400 cursor-pointer transition-colors">Tim Kami</li>
            <li className="hover:text-emerald-400 cursor-pointer transition-colors">Harga</li>
            <li className="hover:text-emerald-400 cursor-pointer transition-colors">Galeri</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-900 pt-8 flex justify-between items-center text-[10px] text-slate-600">
        <p>&copy; 2026 MudaPedia. All rights reserved.</p>
        <div className="flex gap-4 text-slate-400 text-sm">
          <span className="cursor-pointer hover:text-emerald-400">in</span>
          <span className="cursor-pointer hover:text-emerald-400">ig</span>
        </div>
      </div>
    </footer>
  );
}