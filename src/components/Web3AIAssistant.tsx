'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export default function Web3AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'Halo! Saya Mudapedia AI Assistant 🤖. Silakan tanya apa saja: mulai dari Tim Kami, Tentang Kami, Galeri, Kamus Santai, harga paket, hingga simulasi kalkulator di sini!' }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMessages: Message[] = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setInput('');

    // Sistem Pencocokan Menyeluruh, Interaktif, Sempurna, & Akurat
    setTimeout(() => {
      const lower = userText.toLowerCase();
      
      let aiReply = "Oh begitu ya! Ada hal lain seputar Tim Kami, Tentang Kami, Galeri, harga paket, fitur simulasi, atau istilah kamus kripto di Mudapedia yang ingin kamu tanyakan?";

      // 0. TIM KAMI, TENTANG KAMI, & GALERI (Ditaruh paling atas agar tidak tabrakan dengan kata 'siap')
      if (lower.includes('tim kami') || lower.includes('team') || lower.includes('siapa aja') || lower.includes('siapa saja') || lower.includes('anggota')) {
        aiReply = "👥 **Tim Kami**: Mudapedia didukung oleh para ahli, developer Web3, blockchain engineer, dan kreator profesional yang berpengalaman di bidang desentralisasi dan ekosistem kripto.";
      }
      else if (lower.includes('tentang kami') || lower.includes('profil') || lower.includes('tentang mudapedia') || lower.includes('apa itu mudapedia')) {
        aiReply = "🏢 **Tentang Kami**: Mudapedia Digital Indonesia adalah pelopor agensi pengembang ekosistem Web3 dan pembuat token terdepan di Indonesia yang berpusat di Banyuwangi, berdedikasi menghadirkan solusi teknologi aman dan transparan.";
      }
      else if (lower.includes('galeri') || lower.includes('portfolio') || lower.includes('portofolio') || lower.includes('proyek')) {
        aiReply = "🖼️ **Galeri & Portofolio**: Menampilkan deretan proyek token sukses, dokumentasi peluncuran dApp, serta rekam jejak kolaborasi bersama berbagai partner dan bursa kripto terpercaya.";
      }

      // 1. Fitur, Simulasi, & Kalkulator
      else if (lower.includes('simulasi') || lower.includes('kalkulator') || lower.includes('hitung')) {
        aiReply = "🧮 **Fitur & Simulasi**: Website ini dilengkapi Kalkulator & Simulasi interaktif untuk menghitung estimasi biaya pembuatan token secara transparan, serta Kamus Santai untuk memahami istilah kripto dengan mudah.";
      } 
      // 2. Khusus Pertanyaan tentang Fungsi / Arti Kamus Santai
      else if (lower.includes('kamus') || lower.includes('glosarium')) {
        aiReply = "📖 **Fungsi Kamus Santai**: Fitur edukasi di website ini yang merangkum berbagai istilah dunia Web3 dan kripto (seperti Gas Fee, Smart Contract, Liquidity Pool, dll.) dengan penjelasan bahasa santai yang mudah dipahami oleh pemula agar tidak bingung sebelum membuat proyek.";
      } 
      // 3. Kamus Santai: Tokenomics
      else if (lower.includes('tokenomics') || lower.includes('aturan koin')) {
        aiReply = "📊 **Tokenomics (Aturan Koin)**: Aturan main seputar jumlah koin, harga, dan cara bagi-bagi koin digital di dalam suatu proyek.";
      } 
      // 4. Kamus Santai: Gas Fee
      else if (lower.includes('gas fee') || lower.includes('biaya transaksi')) {
        aiReply = "⛽ **Gas Fee (Biaya Transaksi)**: Biaya jasa kecil yang dibayar saat kita ngirim atau mindahin aset di jaringan internet digital (blockchain).";
      } 
      // 5. Kamus Santai: Blockchain
      else if (lower.includes('blockchain') || lower.includes('rantai blok')) {
        aiReply = "🔗 **Blockchain (Rantai Blok)**: Buku catatan digital super aman yang mencatat semua transaksi secara transparan dan mustahil bisa diubah-ubah oleh orang lain.";
      } 
      // 6. Kamus Santai: Smart Contract
      else if (lower.includes('smart contract') || lower.includes('kontrak pintar')) {
        aiReply = "📜 **Smart Contract (Kontrak Pintar)**: Program komputer otomatis di dalam internet yang langsung jalan sendiri sesuai perjanjian tanpa perlu perantara.";
      } 
      // 7. Kamus Santai: DeFi
      else if (lower.includes('defi') || lower.includes('keuangan terbuka')) {
        aiReply = "🌐 **DeFi (Keuangan Terbuka)**: Sistem keuangan digital yang bebas tanpa harus lewat bank atau kantor fisik konvensional.";
      } 
      // 8. Kamus Santai: Web3
      else if (lower.includes('web3') || lower.includes('internet masa depan')) {
        aiReply = "🚀 **Web3 (Internet Masa Depan)**: Generasi baru internet di mana kita benar-benar jadi pemilik data pribadi sendiri secara penuh.";
      } 
      // 9. Harga & Paket Lengkap
      else if (lower.includes('harga') || lower.includes('biaya') || lower.includes('paket') || lower.includes('tabel')) {
        aiReply = "💰 **Rincian Harga Paket Pembuatan Token**:\n• Solana: Rp35.5 Juta - Rp120 Juta\n• Sui: Rp26 Juta - Rp80 Juta\n• BNB: Rp80 Juta - Rp222 Juta\n• Tron: Rp71 Juta - Rp169 Juta\n• Ethereum: Rp222 Juta - Rp1.3 Miliar\n\nSudah termasuk smart contract, website domain 1 tahun, whitepaper, roadmap, & listing bursa (Garuda & NusaDex).";
      } 
      // 10. Fungsi, Manfaat, & Kegunaan Layanan Umum
      else if (lower.includes('manfaat') || lower.includes('fungsi') || lower.includes('kegunaan') || lower.includes('layanan') || lower.includes('mudapedia')) {
        aiReply = "🌟 **Fungsi & Manfaat Mudapedia**: Membantu Anda meluncurkan koin/token kripto secara instan, aman, dan profesional lengkap dengan infrastruktur web, whitepaper, dan likuiditas tanpa harus pusing coding dari nol.";
      } 
      // 11. Interaksi Opini Pengguna (Menanggapi komentar seperti "mahal", "murah", "keren", dll)
      else if (lower.includes('mahal') || lower.includes('tinggi') || lower.includes('relatif') || lower.includes('budget')) {
        aiReply = "Wajar banget kalau kelihatan besar karena itu sudah mencakup pembuatan smart contract, website resmi, whitepaper, hingga jaminan listing bursa. Tapi tenang, kita bisa sesuaikan dengan skala proyek atau pilih jaringan yang lebih terjangkau seperti Solana atau Sui kok!";
      }
      else if (lower.includes('murah') || lower.includes('terjangkau') || lower.includes('bagus') || lower.includes('keren')) {
        aiReply = "Setuju banget! Kami memang merancang layanan ini agar para kreator bisa membangun ekosistem Web3 dengan transparan dan profesional tanpa ribet.";
      }
      // 12. Perkataan Umum / Percakapan Sehari-hari (Makasi, Oke, Ada, Mau, dll)
      else if (lower.includes('makasi') || lower.includes('makasih') || lower.includes('terima kasih') || lower.includes('thanks') || lower.includes('thx')) {
        aiReply = "Sama-sama! Senang bisa berdiskusi dengan kamu. Kalau ada yang mau ditanyain lagi, kabari ya!";
      } 
      else if (lower.includes('oke') || lower.includes(' ok ') || lower.endsWith(' ok') || lower.includes('sip') || lower.includes('baik') || lower.includes('gajadi') || lower.includes('ohh') || lower.includes('paham')) {
        aiReply = "Oke siap! Kalau nanti butuh diskusi atau mau tanya-tanya lagi seputar fitur Mudapedia, tinggal ketik di sini ya.";
      } 
      else if (lower === 'ga ada' || lower === 'gda' || lower === 'gak ada' || lower === 'nggak ada' || lower.includes('tidak ada')) {
        aiReply = "Baiklah kalau begitu. Jika nanti butuh bantuan atau ingin eksplorasi fitur dan kalkulator Mudapedia lagi, saya selalu siap membantu!";
      }
      else if (lower.includes('mau') || lower.includes('boleh') || lower.includes('bisa')) {
        aiReply = "Boleh banget! Silakan tanyakan seputar Tim Kami, rincian harga, fitur simulasi, atau istilah kamus kripto yang ingin kamu tahu.";
      }
      // 13. Sapaan
      else if (lower.includes('halo') || lower.includes('hai') || lower.includes('pagi') || lower.includes('siang') || lower.includes('malam')) {
        aiReply = "Halo juga! Ada yang ingin kita diskusikan terkait Tim Kami, Tentang Kami, Galeri, atau fitur di website Mudapedia?";
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-emerald-500 p-4 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] text-black cursor-pointer flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-[#0a0c16] border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col h-[500px] font-mono"
          >
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-bold text-xs sm:text-sm text-white">Mudapedia AI Assistant</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1 text-xs whitespace-pre-line">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-500 text-black font-semibold rounded-br-none' 
                      : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSend} className="pt-3 border-t border-slate-800 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanya tim kami, galeri, harga..." 
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button 
                type="submit"
                className="bg-emerald-500 text-black px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-400 transition-colors cursor-pointer"
              >
                Kirim
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}