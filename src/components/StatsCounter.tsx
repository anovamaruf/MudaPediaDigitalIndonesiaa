'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = value / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsCounter({ isDark }: { isDark: boolean }) {
  const stats = [
    { label: 'Proyek Terintegrasi', value: 50, suffix: '+' },
    { label: 'Smart Contract Uptime', value: 99, suffix: '.9%' },
    { label: 'Komunitas & Talenta', value: 100, suffix: '+' },
    { label: 'Kepuasan Klien', value: 100, suffix: '%' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl border backdrop-blur-md my-12 ${
        isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-lg'
      }`}
    >
      {stats.map((stat, idx) => (
        <div key={idx} className="text-center p-3">
          <p className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            <Counter value={stat.value} suffix={stat.suffix} />
          </p>
          <p className={`text-xs font-semibold mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {stat.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
}