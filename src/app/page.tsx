'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Navbar from '@/components/Navbar';
import SplashScene from '@/components/SplashScene';
import TopSection from '@/components/TopSection';
import MarqueeSection from '@/components/MarqueeSection';
import CoreEngineSection from '@/components/CoreEngineSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-[#030406] min-h-screen selection:bg-emerald-500 selection:text-black">
      <AnimatePresence mode="wait">
        {isLoading && <SplashScene onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="scroll-smooth">
          <Navbar />
          <TopSection />
          <MarqueeSection />
          <CoreEngineSection />
          <FooterSection />
        </div>
      )}
    </main>
  );
}