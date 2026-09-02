'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PricingSection from '@/components/PricingSection';
import TeamSection from '@/components/TeamSection';
import GallerySection from '@/components/GallerySection';
import { useTheme } from '@/context/ThemeContext';

const menuList = ["Paket", "Tim Kami", "Galeri"];
const packageTabs = ['SOLANA', 'SUI', 'ETH', 'BNB', 'TRON'];
const ANGLE_STEP = 35;
const RADIUS = 380;

interface CoreEngineProps {
  activeMenu?: number;
  setActiveMenu?: (index: number) => void;
}

export default function CoreEngineSection({ activeMenu: externalActiveMenu, setActiveMenu: externalSetActiveMenu }: CoreEngineProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [internalMenu, setInternalMenu] = useState(0);
  const activeMenu = externalActiveMenu !== undefined ? externalActiveMenu : internalMenu;
  const setActiveMenu = externalSetActiveMenu || setInternalMenu;

  // State untuk sub-langkah tab di dalam bagian Paket (Solana -> Sui -> Eth -> BNB -> Tron)
  const [packageTabIdx, setPackageTabIdx] = useState(0);

  const activeMenuRef = useRef(activeMenu);
  activeMenuRef.current = activeMenu;

  const packageTabIdxRef = useRef(packageTabIdx);
  packageTabIdxRef.current = packageTabIdx;

  const isAnimating = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  
  const touchStartY = useRef<number>(0);
  const scrollAccumulator = useRef<number>(0);
  const lastScrollTime = useRef<number>(0); // Jeda waktu (cooldown) antar perpindahan

  const changeMenu = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= menuList.length || isAnimating.current) return;
    isAnimating.current = true;
    setActiveMenu(newIndex);
    setTimeout(() => {
      isAnimating.current = false;
    }, 500);
  };

  // --- SMOOTH SCROLL-LOCKING DENGAN COOLDOWN JEDA WAKTU ---
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const checkIsScrollingInternal = (target: HTMLElement, delta: number) => {
      const scrollableEl = target.closest('.overflow-y-auto') as HTMLElement;
      if (!scrollableEl) return false;

      const { scrollTop, scrollHeight, clientHeight } = scrollableEl;
      const isScrollable = scrollHeight > clientHeight;

      if (!isScrollable) return false;

      if (delta > 0 && scrollTop + clientHeight < scrollHeight - 2) return true;
      if (delta < 0 && scrollTop > 2) return true;
      return false;
    };

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (checkIsScrollingInternal(target, e.deltaY)) {
        return; // Biarkan card melakukan scroll internal
      }

      // 🟢 IZINKAN KELUAR SECTION JIKA SUDAH DI UJUNG ATAS / BAWAH
      if (activeMenuRef.current === 0 && e.deltaY < 0) {
        return; 
      }
      if (activeMenuRef.current === menuList.length - 1 && e.deltaY > 0) {
        return; 
      }

      e.preventDefault();

      const now = Date.now();
      // Jeda waktu (cooldown) 900ms agar setiap habis scroll ada jeda dan tidak langsung melompat
      if (now - lastScrollTime.current < 900 || isAnimating.current) {
        return;
      }

      scrollAccumulator.current += e.deltaY;
      const threshold = 50;

      if (scrollAccumulator.current > threshold) {
        scrollAccumulator.current = 0;
        lastScrollTime.current = now;

        // --- SCROLL KE BAWAH ---
        if (activeMenuRef.current === 0) {
          if (packageTabIdxRef.current < packageTabs.length - 1) {
            setPackageTabIdx(prev => prev + 1);
            return;
          } else {
            changeMenu(1);
            setPackageTabIdx(0);
            return;
          }
        }

        if (activeMenuRef.current < menuList.length - 1) {
          changeMenu(activeMenuRef.current + 1);
        }
      } else if (scrollAccumulator.current < -threshold) {
        scrollAccumulator.current = 0;
        lastScrollTime.current = now;

        // --- SCROLL KE ATAS ---
        if (activeMenuRef.current === 0) {
          if (packageTabIdxRef.current > 0) {
            setPackageTabIdx(prev => prev - 1);
            return;
          } else {
            return;
          }
        }

        if (activeMenuRef.current > 0) {
          changeMenu(activeMenuRef.current - 1);
          if (activeMenuRef.current - 1 === 0) {
            setPackageTabIdx(packageTabs.length - 1);
          }
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      scrollAccumulator.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY.current - touchEndY;
      const target = e.target as HTMLElement;

      if (checkIsScrollingInternal(target, diff)) {
        return;
      }

      if (activeMenuRef.current === 0 && diff < 0) {
        return;
      }
      if (activeMenuRef.current === menuList.length - 1 && diff > 0) {
        return;
      }

      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime.current < 800 || isAnimating.current) {
        return;
      }

      if (diff > 30) {
        lastScrollTime.current = now;
        // --- SWIPE KE ATAS (TURUN) ---
        if (activeMenuRef.current === 0) {
          if (packageTabIdxRef.current < packageTabs.length - 1) {
            setPackageTabIdx(prev => prev + 1);
            touchStartY.current = touchEndY;
            return;
          } else {
            changeMenu(1);
            setPackageTabIdx(0);
            touchStartY.current = touchEndY;
            return;
          }
        }

        if (activeMenuRef.current < menuList.length - 1) {
          changeMenu(activeMenuRef.current + 1);
          touchStartY.current = touchEndY;
        }
      } else if (diff < -30) {
        lastScrollTime.current = now;
        // --- SWIPE KE BAWAH (NAIK) ---
        if (activeMenuRef.current === 0) {
          if (packageTabIdxRef.current > 0) {
            setPackageTabIdx(prev => prev - 1);
            touchStartY.current = touchEndY;
            return;
          } else {
            return;
          }
        }

        if (activeMenuRef.current > 0) {
          changeMenu(activeMenuRef.current - 1);
          if (activeMenuRef.current - 1 === 0) {
            setPackageTabIdx(packageTabs.length - 1);
          }
          touchStartY.current = touchEndY;
        }
      }
    };

    sectionEl.addEventListener('wheel', handleWheel, { passive: false });
    sectionEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    sectionEl.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      sectionEl.removeEventListener('wheel', handleWheel);
      sectionEl.removeEventListener('touchstart', handleTouchStart);
      sectionEl.removeEventListener('touchmove', handleTouchMove);
    };
  }, [setActiveMenu]);

  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const handlePointerDown = (e: React.PointerEvent) => setDragStartY(e.clientY);
  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartY === null) return;
    const diff = dragStartY - e.clientY;
    
    if (diff > 30) { 
      changeMenu(activeMenu + 1); 
      setDragStartY(e.clientY); 
    } else if (diff < -30) { 
      changeMenu(activeMenu - 1); 
      setDragStartY(e.clientY); 
    }
  };
  const handlePointerUp = () => setDragStartY(null);

  return (
    <section 
      ref={sectionRef}
      id="pricing-section" 
      className={`relative w-full h-[100dvh] overflow-hidden font-mono select-none border-b flex flex-col justify-center pt-16 lg:pt-0 transition-colors duration-300 ${
        isDark ? 'bg-[#030406] border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      
      {/* MOBILE NAVIGATION TABS */}
      <div className="sm:hidden absolute top-3 left-0 w-full px-4 z-40 pointer-events-auto">
        <div className={`backdrop-blur-md border rounded-2xl p-2 flex items-center justify-between shadow-2xl ${
          isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
        }`}>
          {menuList.map((menu, i) => (
            <button
              key={i}
              onClick={() => { changeMenu(i); if (i === 0) setPackageTabIdx(0); }}
              className={`flex-1 py-2 mx-0.5 text-[9px] font-bold rounded-xl transition-all cursor-pointer ${
                activeMenu === i 
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                  : isDark ? 'text-slate-400 hover:text-white bg-slate-800/40' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
              }`}
            >
              {menu.replace("Kami", "").trim()}
            </button>
          ))}
        </div>
        <div className="text-center mt-1.5">
          <span className="text-[9px] text-blue-400 tracking-widest uppercase font-bold animate-pulse">
            🔒 PINNED ({activeMenu + 1}/3) {activeMenu === 0 ? `— Network: ${packageTabs[packageTabIdx]}` : ''}
          </span>
        </div>
      </div>

      {/* KONTEN TENGAH */}
      <div 
        ref={contentContainerRef}
        className="relative z-10 w-full flex items-center justify-start pl-4 sm:pl-24 lg:pl-32 p-4 sm:p-12 pointer-events-none my-auto"
      >
        <AnimatePresence mode="wait">
          {activeMenu === 0 && (
            <motion.div key={0} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }} transition={{ duration: 0.6 }} className="w-full max-w-5xl pointer-events-auto">
              <PricingSection 
                activeTab={packageTabs[packageTabIdx]} 
                onTabChange={(tab) => {
                  const idx = packageTabs.indexOf(tab);
                  if (idx !== -1) setPackageTabIdx(idx);
                }} 
              />
            </motion.div>
          )}
          {activeMenu === 1 && (
            <motion.div key={1} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }} transition={{ duration: 0.6 }} className="w-full max-w-4xl pointer-events-auto">
              <TeamSection />
            </motion.div>
          )}
          {activeMenu === 2 && <GallerySection />}
        </AnimatePresence>
      </div>

      {/* RODA NAVIGASI LINGKARAN */}
      <div 
        className="hidden sm:block absolute top-1/2 right-0 translate-x-[65%] -translate-y-1/2 w-[700px] h-[700px] z-50 pointer-events-auto cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div 
          className={`w-full h-full rounded-full border relative transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isDark ? 'border-slate-800' : 'border-slate-300'
          }`} 
          style={{ transform: `rotate(${-activeMenu * ANGLE_STEP}deg)` }}
        >
          {menuList.map((menu, i) => {
            const rotation = i * ANGLE_STEP;
            const isActive = activeMenu === i;
            return (
              <div key={i} className="absolute top-1/2 left-1/2 flex items-center" style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg) translateX(-${RADIUS}px)` }}>
                <div className="flex items-center gap-4 transition-all duration-700" style={{ transform: `rotate(${-rotation + activeMenu * ANGLE_STEP}deg)` }}>
                  
                  <span onClick={(e) => { e.stopPropagation(); changeMenu(i); if (i === 0) setPackageTabIdx(0); }} className={`uppercase tracking-widest text-xs font-bold cursor-pointer transition-all duration-300 ${
                    isActive ? (isDark ? 'text-blue-400 opacity-150 scale-105' : 'text-blue-600 opacity-150 scale-105 font-extrabold') : (isDark ? 'text-slate-500 opacity-30 hover:opacity-80' : 'text-slate-400 opacity-50 hover:opacity-90')
                  }`}>
                    {menu}
                  </span>
                  
                  <button onClick={(e) => { e.stopPropagation(); changeMenu(i); if (i === 0) setPackageTabIdx(0); }} className={`rounded-full transition-all duration-300 cursor-pointer ${
                    isActive ? (isDark ? 'w-4 h-4 bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.9)]' : 'w-4 h-4 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]') : (isDark ? 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-400' : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-500')
                  }`} />
                
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}