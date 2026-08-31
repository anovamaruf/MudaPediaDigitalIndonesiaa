'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export default function Web3AIAssistant() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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

    setTimeout(() => {
      const lower = userText.toLowerCase();
      let aiReply = "Oh begitu ya! Ada hal lain seputar Tim Kami, Tentang Kami, Galeri, harga paket, fitur simulasi, atau istilah kamus kripto di Mudapedia yang ingin kamu tanyakan?";

      if (lower.includes('tim kami') || lower.includes('team') || lower.includes('siapa aja') || lower.includes('siapa saja') || lower.includes('anggota')) {
        aiReply = "👥 **Tim Kami**: Mudapedia didukung oleh para ahli, developer Web3, blockchain engineer, dan kreator profesional yang berpengalaman di bidang desentralisasi dan ekosistem kripto.";
      }
      else if (lower.includes('tentang kami') || lower.includes('profil') || lower.includes('tentang mudapedia') || lower.includes('apa itu mudapedia')) {
        aiReply = "🏢 **Tentang Kami**: Mudapedia Digital Indonesia adalah pelopor agensi pengembang ekosistem Web3 dan pembuat token terdepan di Indonesia yang berpusat di Banyuwangi, berdedikasi menghadirkan solusi teknologi aman dan transparan.";
      }
      else if (lower.includes('galeri') || lower.includes('portfolio') || lower.includes('portofolio') || lower.includes('proyek')) {
        aiReply = "🖼️ **Galeri & Portofolio**: Menampilkan deretan proyek token sukses, dokumentasi peluncuran dApp, serta rekam jejak kolaborasi bersama berbagai partner dan bursa kripto terpercaya.";
      }
      else if (lower.includes('simulasi') || lower.includes('kalkulator') || lower.includes('hitung')) {
        aiReply = "🧮 **Fitur & Simulasi**: Website ini dilengkapi Kalkulator & Simulasi interaktif untuk menghitung estimasi biaya pembuatan token secara transparan, serta Kamus Santai untuk memahami istilah kripto dengan mudah.";
      } 
      else if (lower.includes('kamus') || lower.includes('glosarium')) {
        aiReply = "📖 **Fungsi Kamus Santai**: Fitur edukasi di website ini yang merangkum berbagai istilah dunia Web3 dan kripto dengan penjelasan bahasa santai yang mudah dipahami.";
      } 
      else if (lower.includes('harga') || lower.includes('biaya') || lower.includes('paket') || lower.includes('tabel')) {
        aiReply = "💰 **Rincian Harga Paket Pembuatan Token**:\n• Solana: Rp35.5 Juta - Rp120 Juta\n• Sui: Rp26 Juta - Rp80 Juta\n• BNB: Rp80 Juta - Rp222 Juta\n• Tron: Rp71 Juta - Rp169 Juta\n• Ethereum: Rp222 Juta - Rp1.3 Miliar";
      } 
      else if (lower.includes('halo') || lower.includes('hai')) {
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
        className="bg-blue-600 p-4 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] text-white cursor-pointer flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className={`absolute bottom-20 right-0 w-80 sm:w-96 rounded-3xl p-5 shadow-2xl flex flex-col h-[500px] font-mono border ${
            isDark ? 'bg-[#0a0c16] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xl'
          }`}>
            <div className={`flex justify-between items-center pb-3 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <h3 className="font-bold text-xs sm:text-sm">Mudapedia AI Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className={`text-xs cursor-pointer w-6 h-6 rounded-full border flex items-center justify-center ${isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>✕</button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1 text-xs whitespace-pre-line">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    msg.sender === 'user' ? 'bg-blue-600 text-white font-semibold rounded-br-none shadow-sm' : (isDark ? 'bg-slate-900 border border-slate-800 text-slate-300' : 'bg-slate-100 border border-slate-200 text-slate-700')
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSend} className={`pt-3 border-t flex gap-2 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tanya tim kami, galeri, harga..." className={`flex-1 rounded-xl px-3 py-2 text-xs focus:outline-none transition-colors border ${
                isDark ? 'bg-slate-900 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
              }`} />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-500 transition-colors cursor-pointer shadow-md">Kirim</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}