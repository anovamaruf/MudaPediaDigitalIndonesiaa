'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function KineticTextScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleText = "MUDAPEDIA DIGITAL";

  useEffect(() => {
    if (!containerRef.current) return;

    // Ambil semua elemen huruf yang dibuat dari array
    const letters = containerRef.current.querySelectorAll('.kinetic-letter');

    // 1. Dibuat berhamburan acak dulu di layar (State Awal)
    letters.forEach((letter) => {
      const randomX = (Math.random() - 0.5) * 800; // Sebar acak kiri/kanan
      const randomY = (Math.random() - 0.5) * 600; // Sebar acak atas/bawah
      const randomRotate = (Math.random() - 0.5) * 720; // Putar acak

      gsap.set(letter, {
        x: randomX,
        y: randomY,
        rotation: randomRotate,
        opacity: 0,
        scale: 0.2,
      });
    });

    // 2. Animasi GSAP: Menarik kembali semua huruf menyatu ke posisi aslinya
    gsap.to(letters, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      scale: 1,
      duration: 1.8,
      ease: 'power4.out',
      stagger: 0.05, // Jeda waktu antar huruf biar tidak kaku
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#030406] flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="flex flex-wrap justify-center gap-2 sm:gap-4 px-4">
        {titleText.split('').map((char, idx) => (
          <span
            key={idx}
            className="kinetic-letter text-4xl sm:text-7xl lg:text-8xl font-black font-mono text-white inline-block select-none tracking-tight"
            style={{ color: char === 'A' || char === 'E' || char === 'I' ? '#10b981' : '#ffffff' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
}