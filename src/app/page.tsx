'use client';

import React, { useState, useRef, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Float, TorusKnot } from '@react-three/drei';
import { 
  X, Award, Users, ExternalLink, 
  ChevronDown, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Mail, Phone, MapPin, Globe, Moon, Sun, ChevronLeft, ChevronRight, HelpCircle
} from 'lucide-react';
import { internsData, Intern } from '../data/internsData';
import * as THREE from 'three';

// --- KOMPONEN IKON SVG MANDIRI ---
const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

// --- KOMPONEN LOGO 3D MUDA PEDIA INTERAKTIF ---
function MudaPedia3DLogo({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.6;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.8}>
      <TorusKnot ref={meshRef} args={[1.0, 0.3, 128, 32, 2, 3]} scale={1.1}>
        <MeshDistortMaterial
          color={isDark ? "#6366f1" : "#0284c7"}
          attach="material"
          distort={0.12}
          speed={2}
          roughness={0.1}
          metalness={0.3}
        />
      </TorusKnot>
    </Float>
  );
}

function FloatingTorus({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={2} floatIntensity={1.5}>
      <TorusKnot ref={meshRef} args={[0.8, 0.28, 128, 32]} scale={1.1}>
        <MeshDistortMaterial
          color={isDark ? "#c084fc" : "#38bdf8"}
          attach="material"
          distort={0.2}
          speed={2}
          roughness={0.1}
        />
      </TorusKnot>
    </Float>
  );
}

// --- HERO 3D CANVAS DENGAN PENCAHAYAAN MENGIKUTI KURSOR ---
function Hero3DCanvas({ isDark }: { isDark: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = -((e.clientY - rect.top) / rect.height - 0.5);
    setMousePos({ x: x * 200, y: y * 200 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="h-[380px] sm:h-[480px] w-full max-w-[550px] mx-auto cursor-grab active:cursor-grabbing relative flex items-center justify-center overflow-visible"
    >
      <div 
        className={`absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full blur-[100px] pointer-events-none transition-all duration-200 ease-out ${
          isDark ? 'bg-indigo-500/40' : 'bg-sky-400/40'
        }`}
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
        }}
      />
      
      <Canvas camera={{ position: [0, 0, 6], fov: 65 }} style={{ overflow: 'visible' }}>
        <ambientLight intensity={1.8} />
        <directionalLight position={[10, 10, 5]} intensity={3} color={isDark ? "#c084fc" : "#38bdf8"} />
        <pointLight position={[-10, -10, -5]} intensity={2} color={isDark ? "#38bdf8" : "#818cf8"} />
        <Suspense fallback={null}>
          <MudaPedia3DLogo isDark={isDark} />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
}

function About3DCanvas({ isDark }: { isDark: boolean }) {
  return (
    <div className="h-[280px] w-full cursor-grab active:cursor-grabbing relative overflow-visible">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ overflow: 'visible' }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} color={isDark ? "#818cf8" : "#0284c7"} />
        <Suspense fallback={null}>
          <FloatingTorus isDark={isDark} />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
}

// --- KARTU PROFIL TIM MODERN ---
function ModernTeamCard({ member, onSelect, isDark }: { member: Intern; onSelect: (m: Intern) => void; isDark: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      onClick={() => onSelect(member)}
      className={`group relative rounded-[32px] p-6 cursor-pointer overflow-hidden backdrop-blur-xl shadow-2xl transition-all duration-300 flex flex-col justify-between w-full sm:w-[280px] min-h-[360px] ${
        isDark 
          ? 'bg-[#090d1f]/70 border border-slate-800/90 hover:border-indigo-500/80' 
          : 'bg-white/80 border border-slate-200 hover:border-sky-500 shadow-slate-200'
      }`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[32px]"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${isDark ? 'rgba(99, 102, 241, 0.18)' : 'rgba(2, 132, 199, 0.12)'}, transparent 80%)`,
        }}
      />

      <div>
        <div className="relative w-28 h-28 mx-auto mb-5">
          <div className={`absolute inset-0 rounded-full blur-md opacity-30 group-hover:opacity-80 transition-opacity ${isDark ? 'bg-gradient-to-tr from-indigo-500 to-purple-500' : 'bg-gradient-to-tr from-sky-400 to-indigo-500'}`} />
          <img
            src={member.avatar}
            alt={member.name}
            className={`relative w-full h-full rounded-full object-cover border-2 transition-all duration-300 shadow-xl ${
              isDark ? 'border-indigo-500/40 group-hover:border-indigo-400' : 'border-sky-400/50 group-hover:border-sky-500'
            } group-hover:scale-105`}
          />
          {member.isActive && (
            <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full shadow-lg ${isDark ? 'bg-emerald-500 border-2 border-[#090d1f]' : 'bg-emerald-500 border-2 border-white'}`} />
          )}
        </div>

        <div className="text-center">
          <h3 className={`font-extrabold text-xl transition-colors ${isDark ? 'text-white group-hover:text-indigo-300' : 'text-slate-900 group-hover:text-sky-600'}`}>
            {member.name}
          </h3>
          <p className={`text-xs font-semibold mt-1 mb-3 ${isDark ? 'text-indigo-400' : 'text-sky-600'}`}>{member.role}</p>

          <span className={`inline-block text-[11px] font-medium px-3 py-1 rounded-full border ${
            isDark ? 'bg-slate-900/90 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
          }`}>
            Batch {member.batch} • {member.year}
          </span>
        </div>
      </div>

      <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs ${isDark ? 'border-slate-800/80' : 'border-slate-100'}`}>
        <span className={`flex items-center gap-1.5 font-bold px-2.5 py-1 rounded-lg border ${
          isDark ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-emerald-600 bg-emerald-50 border-emerald-200'
        }`}>
          <Award size={13} /> {member.activityScore}
        </span>

        <div className="flex gap-2">
          {member.socials.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`p-1.5 rounded-lg transition-colors ${isDark ? 'bg-slate-800/80 text-slate-400 hover:bg-indigo-600 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-sky-600 hover:text-white'}`}
            >
              <LinkedinIcon />
            </a>
          )}
          {member.socials.instagram && (
            <a
              href={member.socials.instagram}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`p-1.5 rounded-lg transition-colors ${isDark ? 'bg-slate-800/80 text-slate-400 hover:bg-indigo-600 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-sky-600 hover:text-white'}`}
            >
              <InstagramIcon />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'all' | 'tim' | 'magang' | 'alumni'>('all');
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  
  const [hoveredFaq, setHoveredFaq] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string>('SOLANA');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const logoUrl = "/mudapedia-logo.png";

  useEffect(() => {
    const savedTheme = localStorage.getItem('mudapedia_theme');
    if (savedTheme === 'light') {
      setIsDark(false);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    localStorage.setItem('mudapedia_theme', nextTheme ? 'dark' : 'light');
  };

  const filteredTeam = internsData.filter((member) => {
    if (activeTab === 'tim') return member.isActive;
    if (activeTab === 'magang') return !member.isActive && !member.isAlumni;
    if (activeTab === 'alumni') return member.isAlumni;
    return true;
  });

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredTeam.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (totalPages || 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalPages) % (totalPages || 1));
  };

  const partners = [
    "Official Pavo", "Nagapara", "Gaswin Artha Suar", "Digital Blockchain Indonesia", "Garuda Exchanger"
  ];

  const pricingData: Record<string, {
    dasar: { price: string; features: string[] };
    standar: { price: string; features: string[] };
    lanjutan: { price: string; features: string[] };
  }> = {
    SOLANA: {
      dasar: {
        price: "Rp. 35.500.000",
        features: [
          "Pembuatan token di jaringan SOLANA",
          "Supply Koin 1 Juta",
          "Tambahkan Likuiditas Rp. 900.000",
          "Media Sosial (X/Twitter)",
          "Telegram (5 anggota)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya"
        ]
      },
      standar: {
        price: "Rp. 70.000.000",
        features: [
          "Pembuatan token di jaringan SOLANA",
          "Supply Koin 5 Juta",
          "Tambahkan Likuiditas Rp.1.500.000",
          "Media Sosial (X/Twitter)",
          "Telegram (50 anggota)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya",
          "2 postingan pertama untuk promosi"
        ]
      },
      lanjutan: {
        price: "RP.120.000.000",
        features: [
          "Pembuatan token di jaringan SOLANA",
          "Supply Koin 10 Juta",
          "Tambahkan Likuiditas Rp.5.000.000",
          "Media Sosial (X/Twitter, Telegram 100 anggota)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya",
          "10 postingan pertama untuk promosi",
          "Pencatatan eksklusif di Garuda Exchanger dan Bursa lainnya"
        ]
      }
    },
    SUI: {
      dasar: {
        price: "Rp. 26.000.000",
        features: [
          "Pembuatan token di jaringan SUI",
          "Supply Koin 1 Juta",
          "Tambahkan Likuiditas Rp.500.000 USD",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya"
        ]
      },
      standar: {
        price: "Rp. 35.000.000",
        features: [
          "Pembuatan token di jaringan SUI",
          "Supply Koin 5 Juta",
          "Tambahkan Likuiditas Rp.1.500.000 USD",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya",
          "3 postingan pertama untuk promosi"
        ]
      },
      lanjutan: {
        price: "Rp.80.000.000",
        features: [
          "Pembuatan token di jaringan SUI",
          "Supply Koin 10 Juta",
          "Tambahkan Likuiditas Rp.2.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya",
          "10 postingan pertama untuk promosi",
          "Pencatatan eksklusif di NusaDex dan Bursa lainnya",
          "Media Sosial X Terverifikasi",
          "Permintaan Supply khusus",
          "50 Pemegang Dompet"
        ]
      }
    },
    ETH: {
      dasar: {
        price: "Rp.222.000.000",
        features: [
          "Pembuatan token di jaringan ETHEREUM",
          "Supply Koin 1 Juta",
          "Tambahkan Likuiditas Rp.3.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya"
        ]
      },
      standar: {
        price: "Rp.650.000.000",
        features: [
          "Pembuatan token di jaringan ETHEREUM",
          "Supply Koin 5 Juta",
          "Tambahkan Likuiditas Rp.10.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya",
          "3 postingan pertama untuk promosi"
        ]
      },
      lanjutan: {
        price: "Rp.1.300.000.000",
        features: [
          "Pembuatan token di jaringan ETHEREUM",
          "Supply Koin 10 Juta",
          "Tambahkan Likuiditas Rp.15.000.000 USD",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Excainger & Bursa Lainnya",
          "10 postingan pertama untuk promosi",
          "Pencatatan eksklusif di NusaDex dan Bursa lainnya",
          "Media Sosial X Terverifikasi",
          "Permintaan Supply khusus",
          "50 Pemegang Dompet"
        ]
      }
    },
    BNB: {
      dasar: {
        price: "Rp.80.000.000",
        features: [
          "Pembuatan token di jaringan BNB",
          "Supply Koin 1 Juta",
          "Tambahkan Likuiditas Rp.2.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya"
        ]
      },
      standar: {
        price: "Rp.160.000.000",
        features: [
          "Pembuatan token di jaringan BNB",
          "Supply Koin 5 Juta",
          "Tambahkan Likuiditas Rp.5.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya",
          "3 postingan pertama untuk promosi"
        ]
      },
      lanjutan: {
        price: "Rp.222.000.000",
        features: [
          "Pembuatan token di jaringan BNB",
          "Supply Koin 10 Juta",
          "Tambahkan Likuiditas Rp.100.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Exchanger & Bursa Lainnya",
          "10 postingan pertama untuk promosi",
          "Pencatatan eksklusif di NusaDex dan Bursa lainnya",
          "Media Sosial X Terverifikasi",
          "Permintaan Supply khusus",
          "50 Pemegang Dompet"
        ]
      }
    },
    TRON: {
      dasar: {
        price: "Rp.71.000.000",
        features: [
          "Pembuatan token di jaringan TRON",
          "Supply Koin 1 Juta",
          "Tambahkan Likuiditas Rp.3.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Excainger & Bursa Lainnya"
        ]
      },
      standar: {
        price: "Rp.125.000.000",
        features: [
          "Pembuatan token di jaringan TRON",
          "Supply Koin 5 Juta",
          "Tambahkan Likuiditas Rp.5.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Excainger & Bursa Lainnya",
          "3 postingan pertama untuk promosi"
        ]
      },
      lanjutan: {
        price: "Rp.169.000.000",
        features: [
          "Pembuatan token di jaringan TRON",
          "Supply Koin 10 Juta",
          "Tambahkan Likuiditas Rp.11.000.000",
          "Media Sosial (X/Twitter, Telegram, dan Instagram)",
          "Situs Web + Domain Gratis 1 Tahun",
          "Buku Manual",
          "Buku Putih & Peta Jalan",
          "Daftar Garuda Excainger & Bursa Lainnya",
          "10 postingan pertama untuk promosi",
          "Pencatatan eksklusif di NusaDex dan Bursa lainnya",
          "Media Sosial X Terverifikasi"
        ]
      }
    }
  };

  const currentPricing = pricingData[currency] || pricingData.SOLANA;

  // DATA PERTANYAAN TERBARU
  const interactiveFaqs = [
    {
      q: "Apa itu PT Mudapedia Digital Indonesia?",
      a: "PT Mudapedia Digital Indonesia adalah perusahaan yang bergerak dibidang pengembangan teknologi dan digitalisasi. Kami menyediakan solusi inovatif untuk bisnis maupun individu, mulai dari pengembangan aplikasi, website, hingga strategi digital marketing."
    },
    {
      q: "Layanan apa saja yang ditawarkan?",
      a: "• Pengembangan Aplikasi Mobile: Android & iOS (native atau cross-platform).\n• Pengembangan Website: E-commerce, company profile, portofolio, dan lainnya.\n• Digital Marketing: SEO, SEM, Social Media Management, hingga Content Creation.\n• Konsultasi Digital: Analisis kebutuhan & strategi digitalisasi bisnis."
    },
    {
      q: "Bagaimana cara kerja sama dengan PT Mudapedia?",
      a: "Proses kerja sama dimulai dengan konsultasi awal untuk memahami kebutuhan Anda. Tim kami kemudian menyusun proposal solusi lengkap dengan estimasi biaya dan waktu pengerjaan. Setelah ada kesepakatan, pengembangan dimulai dengan komunikasi intensif dan transparansi di setiap tahap proyek."
    },
    {
      q: "Siapa saja klien yang bisa menggunakan layanan Mudapedia?",
      a: "Layanan kami terbuka untuk berbagai jenis klien, mulai dari UMKM, perusahaan menengah, hingga korporasi besar. Kami juga melayani kebutuhan individu yang ingin mengembangkan produk digital."
    },
    {
      q: "Bagaimana cara menghubungi PT Mudapedia Digital Indonesia?",
      a: "Anda dapat menghubungi kami melalui email, telepon, atau formulir kontak di website resmi. Tim kami siap membantu Anda mendapatkan solusi terbaik sesuai kebutuhan bisnis."
    }
  ];

  const handleFaqToggle = (idx: number) => {
    setHoveredFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden pt-20 ${
      isDark ? 'bg-[#050711] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* CSS KEYFRAMES UNTUK SMOOTH MARQUEE */}
      <style jsx global>{`
        @keyframes smoothMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-smooth-marquee {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: smoothMarquee 25s linear infinite;
        }
      `}</style>
      
      {/* --- FULLSCREEN CLEAN TRANSPARENT LOADING --- */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`fixed inset-0 z-[9999] backdrop-blur-sm flex items-center justify-center pointer-events-auto ${
              isDark ? 'bg-[#050711]/75' : 'bg-white/75'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full border-4 animate-spin ${isDark ? 'border-indigo-500/20 border-t-indigo-500' : 'border-sky-500/20 border-t-sky-500'}`} />
                <img src={logoUrl} alt="Logo" className="w-10 h-10 object-contain animate-pulse" />
              </div>
              <div className="text-center">
                <p className={`text-sm font-extrabold tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>Mudapedia Digital Indonesia</p>
                <p className={`text-xs font-medium mt-1 ${isDark ? 'text-indigo-400' : 'text-sky-600'}`}>Memuat Ekosistem Digital...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Ambient Blur */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[140px] ${isDark ? 'bg-indigo-600/20' : 'bg-sky-400/15'}`} />
        <div className={`absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full blur-[140px] ${isDark ? 'bg-purple-600/15' : 'bg-indigo-400/10'}`} />
        <div className={`absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px] ${isDark ? 'bg-blue-600/15' : 'bg-purple-400/10'}`} />
      </div>

      {/* 1. NAVBAR FIXED DI ATAS */}
      <nav className={`border-b backdrop-blur-2xl fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 shadow-xl transition-colors duration-500 ${
        isDark ? 'border-slate-800/80 bg-[#050711]/85' : 'border-slate-200 bg-white/85'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src={logoUrl} 
              alt="Muda Pedia Logo" 
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-[0_0_12px_rgba(99,102,241,0.6)]" 
            />
            <span className={`font-extrabold text-xs sm:text-base tracking-tight bg-gradient-to-r bg-clip-text text-transparent ${
              isDark ? 'from-white via-slate-200 to-indigo-300' : 'from-slate-900 via-slate-800 to-sky-600'
            }`}>
              Mudapedia Digital Indonesia
            </span>
          </div>

          <div className={`hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {[
              { name: "Tim Kami", href: "#team" },
              { name: "Galeri", href: "#gallery" },
              { name: "Harga", href: "#pricing" },
              { name: "Tentang Kami", href: "#about" }
            ].map((menu, idx) => (
              <motion.a
                key={idx}
                href={menu.href}
                whileHover={{ scale: 1.08, z: 20 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className={`relative py-1 transition-colors group inline-block ${isDark ? 'hover:text-white' : 'hover:text-sky-600'}`}
              >
                {menu.name}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r rounded-full group-hover:w-full transition-all duration-300 ${
                  isDark ? 'from-indigo-500 to-purple-500' : 'from-sky-500 to-indigo-600'
                }`} />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isDark ? 'bg-slate-800/80 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title="Ganti Tema Terang/Gelap"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#pricing" 
              className={`font-bold text-[11px] sm:text-xs px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg transition-all ${
                isDark 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/25' 
                  : 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-sky-600/25'
              }`}
            >
              Konsultasi
            </motion.a>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION RESPONSIF */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Kolom Kiri: Teks & Pertanyaan Interaktif */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${
            isDark ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300' : 'bg-sky-50 border-sky-200 text-sky-700'
          }`}>
            <Sparkles size={14} className={isDark ? 'text-indigo-400' : 'text-sky-600'} /> Ekosistem Digital & Web3 Agency
          </div>
          
          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Kecepatan dalam Industri <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Web3, Blockchain, & Kripto.
            </span>
          </h1>
          
          <p className={`text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Kami adalah perusahaan rintisan yang berada di jantung Web3, blockchain, dan kripto—tempat teknologi dan kreativitas berpadu membangun solusi bisnis terdepan.
          </p>

          {/* Pertanyaan Interaktif FAQ */}
          <div className="space-y-3 pt-2">
            <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-indigo-400' : 'text-sky-600'}`}>Eksplor Informasi Cepat:</p>
            {interactiveFaqs.map((faq, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setHoveredFaq(idx)}
                onMouseLeave={() => setHoveredFaq(null)}
                onClick={() => handleFaqToggle(idx)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleFaqToggle(idx);
                }}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer backdrop-blur-md select-none ${
                  hoveredFaq === idx 
                    ? (isDark ? 'bg-indigo-950/40 border-indigo-500/85 shadow-lg shadow-indigo-500/20' : 'bg-sky-50 border-sky-400 shadow-md')
                    : (isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200')
                }`}
              >
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{faq.q}</span>
                  <HelpCircle size={16} className={`shrink-0 ml-2 ${hoveredFaq === idx ? (isDark ? 'text-indigo-400' : 'text-sky-600') : 'text-slate-500'}`} />
                </div>

                <AnimatePresence>
                  {hoveredFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className={`text-xs mt-3 pt-3 border-t leading-relaxed whitespace-pre-line ${
                        isDark ? 'text-slate-300 border-indigo-500/30' : 'text-slate-600 border-sky-200'
                      }`}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <motion.a 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#pricing" 
              className={`flex items-center justify-center gap-2 font-semibold px-6 sm:px-7 py-3.5 rounded-xl shadow-xl transition-all text-xs sm:text-sm ${
                isDark ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-600/30' : 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-sky-600/30'
              }`}
            >
              Jelajahi Paket <ArrowRight size={16} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#team" 
              className={`flex items-center justify-center gap-2 font-semibold px-6 sm:px-7 py-3.5 rounded-xl transition-all backdrop-blur-md border text-xs sm:text-sm ${
                isDark ? 'bg-slate-900/80 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}
            >
              <Users size={16} /> Talenta & Tim
            </motion.a>
          </div>
        </motion.div>

        {/* Kolom Kanan: Logo 3D */}
        <div className="lg:col-span-5 relative overflow-visible flex items-center justify-center mt-6 lg:mt-0">
          <Hero3DCanvas isDark={isDark} />
        </div>

      </section>

      {/* --- RUNNING PARTNER MARQUEE BANNER --- */}
      <div className={`border-y py-6 mb-20 overflow-hidden relative backdrop-blur-md ${
        isDark ? 'border-slate-800/80 bg-slate-950/60' : 'border-slate-200 bg-white/80'
      }`}>
        <div className={`absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r to-transparent z-10 pointer-events-none ${isDark ? 'from-[#050711]' : 'from-slate-50'}`} />
        <div className={`absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l to-transparent z-10 pointer-events-none ${isDark ? 'from-[#050711]' : 'from-slate-50'}`} />

        <div className="animate-smooth-marquee gap-16">
          {[...partners, ...partners, ...partners, ...partners].map((partner, i) => (
            <div key={i} className={`flex items-center gap-3 text-xs font-black tracking-widest uppercase transition-colors shrink-0 ${
              isDark ? 'text-slate-400/80 hover:text-indigo-400' : 'text-slate-600 hover:text-sky-600'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-indigo-500 shadow-sm shadow-indigo-500/80' : 'bg-sky-500'}`} />
              {partner}
            </div>
          ))}
        </div>
      </div>

      {/* 3. PAKET HARGA & NETWORK SELECTOR (RESPONSIF TERHUBUNG & TRANSISI SMOOTH) */}
      <section id="pricing" className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className={`text-3xl sm:text-4xl font-black mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Buat Token Baru</h2>
          
          <div className={`inline-flex p-1.5 rounded-full border flex-wrap justify-center gap-1.5 shadow-2xl ${
            isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white border-slate-200 shadow-slate-200'
          }`}>
            {['SOLANA', 'SUI', 'ETH', 'BNB', 'TRON'].map((net) => (
              <motion.button
                key={net}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrency(net)}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs font-black tracking-wider transition-all ${
                  currency === net 
                    ? (isDark ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-600/30')
                    : (isDark ? 'bg-slate-900 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900')
                }`}
              >
                {net}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Grid Responsif: 1 Kolom di HP / Mobile, 3 Kolom di Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Paket Dasar */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all shadow-xl h-full border ${
              isDark ? 'bg-[#080821] border-indigo-900/50 hover:border-indigo-500 shadow-indigo-950/40' : 'bg-white border-slate-200 hover:border-sky-500 shadow-slate-200'
            }`}
          >
            <div>
              <div className="text-center mb-6">
                <h3 className={`text-xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Paket Dasar</h3>
                <p className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Fitur penting untuk membuat token dasar.</p>
                
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={currency + "-dasar"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className={`text-xl sm:text-2xl lg:text-3xl font-black mt-6 mb-1 break-words ${isDark ? 'text-white' : 'text-slate-900'}`}
                  >
                    {currentPricing.dasar.price}
                  </motion.p>
                </AnimatePresence>
                
                <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/proyek</p>
              </div>

              <AnimatePresence mode="wait">
                <motion.ul 
                  key={currency + "-dasar-list"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`space-y-3.5 text-xs pt-6 border-t mb-8 ${isDark ? 'text-slate-200 border-slate-800/80' : 'text-slate-700 border-slate-100'}`}
                >
                  {currentPricing.dasar.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${isDark ? 'text-indigo-400' : 'text-sky-600'}`} />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full font-extrabold text-xs py-3.5 rounded-2xl transition-all shadow-md mt-auto ${
                isDark ? 'bg-[#38bdf8] hover:bg-[#0284c7] text-slate-950' : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
            >
              Beli Paket
            </motion.button>
          </motion.div>

          {/* Paket Standar */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all shadow-xl h-full border ${
              isDark ? 'bg-[#080821] border-indigo-900/50 hover:border-indigo-500 shadow-indigo-950/40' : 'bg-white border-slate-200 hover:border-sky-500 shadow-slate-200'
            }`}
          >
            <div>
              <div className="text-center mb-6">
                <h3 className={`text-xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Paket Standar</h3>
                <p className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Fitur penting untuk membuat token standar.</p>
                
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={currency + "-standar"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className={`text-xl sm:text-2xl lg:text-3xl font-black mt-6 mb-1 break-words ${isDark ? 'text-white' : 'text-slate-900'}`}
                  >
                    {currentPricing.standar.price}
                  </motion.p>
                </AnimatePresence>

                <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/proyek</p>
              </div>

              <AnimatePresence mode="wait">
                <motion.ul 
                  key={currency + "-standar-list"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`space-y-3.5 text-xs pt-6 border-t mb-8 ${isDark ? 'text-slate-200 border-slate-800/80' : 'text-slate-700 border-slate-100'}`}
                >
                  {currentPricing.standar.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${isDark ? 'text-indigo-400' : 'text-sky-600'}`} />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full font-extrabold text-xs py-3.5 rounded-2xl transition-all shadow-md mt-auto ${
                isDark ? 'bg-[#38bdf8] hover:bg-[#0284c7] text-slate-950' : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
            >
              Beli Paket
            </motion.button>
          </motion.div>

          {/* Paket Lanjutan */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all shadow-xl h-full border ${
              isDark ? 'bg-[#080821] border-indigo-900/50 hover:border-indigo-500 shadow-indigo-950/40' : 'bg-white border-slate-200 hover:border-sky-500 shadow-slate-200'
            }`}
          >
            <div>
              <div className="text-center mb-6">
                <h3 className={`text-xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Paket Lanjutan</h3>
                <p className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Fitur penting untuk membuat token canggih.</p>
                
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={currency + "-lanjutan"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className={`text-xl sm:text-2xl lg:text-3xl font-black mt-6 mb-1 break-words ${isDark ? 'text-white' : 'text-slate-900'}`}
                  >
                    {currentPricing.lanjutan.price}
                  </motion.p>
                </AnimatePresence>

                <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/proyek</p>
              </div>

              <AnimatePresence mode="wait">
                <motion.ul 
                  key={currency + "-lanjutan-list"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`space-y-3.5 text-xs pt-6 border-t mb-8 ${isDark ? 'text-slate-200 border-slate-800/80' : 'text-slate-700 border-slate-100'}`}
                >
                  {currentPricing.lanjutan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${isDark ? 'text-indigo-400' : 'text-sky-600'}`} />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full font-extrabold text-xs py-3.5 rounded-2xl transition-all shadow-md mt-auto ${
                isDark ? 'bg-[#38bdf8] hover:bg-[#0284c7] text-slate-950' : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
            >
              Beli Paket
            </motion.button>
          </motion.div>

        </div>
      </section>

      {/* 4. TENTANG KAMI */}
      <section id="about" className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className={`text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Tentang Kami</h2>
        </div>

        <div className={`grid md:grid-cols-2 gap-8 items-center rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-md border shadow-xl ${
          isDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200 shadow-slate-200'
        }`}>
          <div className="space-y-6">
            <div className={`p-5 rounded-2xl border ${isDark ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-sky-50 border-sky-200'}`}>
              <h3 className={`font-bold text-base mb-2 flex items-center gap-2 ${isDark ? 'text-indigo-300' : 'text-sky-700'}`}>
                <ShieldCheck size={18} /> Visi Utama
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Kami menjadi Perusahaan Digital Agency yang terdepan dalam membantu para pebisnis mengembangkan usahanya di era desentralisasi.
              </p>
            </div>
            <div className={`p-5 rounded-2xl border ${isDark ? 'bg-purple-500/10 border-purple-500/20' : 'bg-indigo-50 border-indigo-200'}`}>
              <h3 className={`font-bold text-base mb-2 flex items-center gap-2 ${isDark ? 'text-purple-300' : 'text-indigo-700'}`}>
                <Sparkles size={18} /> Misi Kami
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Memahami bahwa era digital telah membuka pintu menuju peluang tak terbatas. Kami hadir sebagai solusi cerdas dan terpercaya untuk membantu Anda berkembang dalam dunia yang terus berubah. Sebagai perusahaan inovatif, kami menawarkan rangkaian layanan yang dirancang khusus untuk memenuhi kebutuhan bisnis modern.
              </p>
            </div>
          </div>

          <div className={`relative rounded-3xl overflow-hidden border flex flex-col items-center justify-center text-center p-6 shadow-2xl ${
            isDark ? 'border-slate-800 bg-gradient-to-br from-indigo-950/40 via-purple-900/20 to-slate-900' : 'border-slate-200 bg-gradient-to-br from-sky-50 via-indigo-50 to-white'
          }`}>
            <About3DCanvas isDark={isDark} />
            <div className="relative z-10 -mt-6">
              <p className="text-4xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-1">100% Dedicated</p>
              <p className={`font-medium text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Solusi Digital & Pembinaan Talenta Generasi Muda</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TIM KAMI */}
      <section id="team" className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className={`text-xs font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-indigo-400' : 'text-sky-600'}`}>Tim Kami</h2>
          <p className={`text-3xl sm:text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Meet Our Team</p>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Bersatu dalam visi, beragam dalam karya. Tim Mudapedia hadir untuk menghadirkan pengetahuan, kreativitas, dan solusi digital bagi generasi muda Indonesia.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className={`inline-flex p-1.5 rounded-full border shadow-xl flex-wrap justify-center gap-1 ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-slate-200'}`}>
            {(['all', 'tim', 'magang', 'alumni'] as const).map((tab) => (
              <motion.button
                key={tab}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentSlide(0);
                }}
                className={`px-5 sm:px-6 py-2 rounded-full text-xs font-bold transition-all capitalize ${
                  activeTab === tab 
                    ? (isDark ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-600/30')
                    : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                {tab === 'all' ? 'Semua' : tab === 'tim' ? 'Tim' : tab === 'magang' ? 'Magang' : 'Alumni'}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="relative group">
          <div className="flex flex-wrap justify-center gap-6 items-stretch">
            {filteredTeam
              .slice(currentSlide * itemsPerPage, (currentSlide + 1) * itemsPerPage)
              .map((member) => (
                <ModernTeamCard key={member.id} member={member} onSelect={(m) => setSelectedIntern(m)} isDark={isDark} />
              ))}
          </div>

          {totalPages > 1 && (
            <>
              <button
                onClick={prevSlide}
                className={`absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full border text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-20 ${
                  isDark ? 'bg-slate-900/80 border-slate-700 hover:bg-indigo-600' : 'bg-sky-600 border-sky-500 hover:bg-sky-700'
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextSlide}
                className={`absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full border text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-20 ${
                  isDark ? 'bg-slate-900/80 border-slate-700 hover:bg-indigo-600' : 'bg-sky-600 border-sky-500 hover:bg-sky-700'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 ${
                  currentSlide === idx
                    ? (isDark ? 'w-6 h-2.5 bg-indigo-500 rounded-full shadow-md shadow-indigo-500/50' : 'w-6 h-2.5 bg-sky-600 rounded-full shadow-md shadow-sky-600/50')
                    : (isDark ? 'w-2.5 h-2.5 bg-slate-800 rounded-full hover:bg-slate-600' : 'w-2.5 h-2.5 bg-slate-300 rounded-full hover:bg-slate-400')
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* 6. GALERI INSTAGRAM BENTO GRID */}
      <section id="gallery" className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className={`text-3xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Galeri Instagram</h2>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Aktivitas & Edukasi Konten Media Sosial Muda Pedia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`md:col-span-2 border rounded-3xl p-6 sm:p-8 flex flex-col justify-end min-h-[240px] shadow-xl ${
            isDark ? 'bg-gradient-to-br from-indigo-900/40 to-slate-900 border-slate-800' : 'bg-gradient-to-br from-sky-50 to-indigo-50 border-slate-200 shadow-slate-200'
          }`}>
            <span className={`text-xs font-bold mb-2 uppercase tracking-wider ${isDark ? 'text-indigo-400' : 'text-sky-600'}`}>Edukasi Web3</span>
            <h3 className={`text-lg sm:text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Potensi Pertumbuhan (Return) yang Tinggi & Akses Likuiditas Global 24/7</h3>
          </div>
          <div className={`border rounded-3xl p-6 sm:p-8 flex flex-col justify-end min-h-[240px] shadow-xl ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-slate-200'
          }`}>
            <span className={`text-xs font-bold mb-2 uppercase tracking-wider ${isDark ? 'text-purple-400' : 'text-indigo-600'}`}>Kuis Interaktif</span>
            <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Kalau Dompet Crypto itu mirip dengan... ??</h3>
          </div>
        </div>
      </section>

      {/* 7. FOOTER RESMI */}
      <footer className={`relative z-10 border-t pt-16 pb-12 px-4 sm:px-6 transition-colors duration-500 ${
        isDark ? 'border-slate-800/80 bg-[#030409]' : 'border-slate-200 bg-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logoUrl} 
                alt="Muda Pedia Logo" 
                className="w-8 h-8 object-contain" 
              />
              <span className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>Mudapedia Digital Indonesia</span>
            </div>
            <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Mari ciptakan obsesi baru dengan diri kita!
            </p>
            <p className={`text-xs font-semibold ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Senin - Jum'at | 08.00 - 16.00 WIB</p>
          </div>

          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Galeri & Kontak</h4>
            <ul className={`space-y-2.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <li className="flex items-center gap-2"><Phone size={14} className={isDark ? 'text-indigo-400' : 'text-sky-600'} /> Telepon : 0851-1983-6002</li>
              <li className="flex items-center gap-2"><Mail size={14} className={isDark ? 'text-indigo-400' : 'text-sky-600'} /> Email : mudapediadigitalindonesia.com</li>
              <li className="flex items-start gap-2"><MapPin size={14} className={`shrink-0 mt-0.5 ${isDark ? 'text-indigo-400' : 'text-sky-600'}`} /> Banyuwangi<br />Perum Gedong Blok. D No.5 Kertosari, Kec. Banyuwangi, Kabupaten Banyuwangi, Jawa Timur 68418</li>
            </ul>
          </div>

          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Perusahaan</h4>
            <div className={`flex flex-col gap-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <a href="#about" className={isDark ? 'hover:text-white' : 'hover:text-slate-900'}>Tentang Kami</a>
              <a href="#team" className={isDark ? 'hover:text-white' : 'hover:text-slate-900'}>Tim Kami</a>
              <a href="#pricing" className={isDark ? 'hover:text-white' : 'hover:text-slate-900'}>Harga</a>
              <a href="#gallery" className={isDark ? 'hover:text-white' : 'hover:text-slate-900'}>Galeri</a>
            </div>
          </div>
        </div>

        <div className={`max-w-7xl mx-auto border-t pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] ${
          isDark ? 'border-slate-900 text-slate-500' : 'border-slate-200 text-slate-500'
        }`}>
          <p>© 2026 MudaPedia. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <div className={`cursor-pointer ${isDark ? 'hover:text-slate-300' : 'hover:text-slate-900'}`}><LinkedinIcon /></div>
            <div className={`cursor-pointer ${isDark ? 'hover:text-slate-300' : 'hover:text-slate-900'}`}><InstagramIcon /></div>
          </div>
        </div>
      </footer>

      {/* MODAL PORTOFOLIO TIM / MAGANG */}
      <AnimatePresence>
        {selectedIntern && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`border rounded-3xl max-w-lg w-full p-6 relative shadow-2xl ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <button
                onClick={() => setSelectedIntern(null)}
                className={`absolute top-4 right-4 p-2 rounded-xl transition-colors ${
                  isDark ? 'text-slate-400 hover:text-white bg-slate-800/80' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                }`}
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <img src={selectedIntern.avatar} alt={selectedIntern.name} className={`w-16 h-16 rounded-full object-cover border-2 ${isDark ? 'border-indigo-500' : 'border-sky-500'}`} />
                <div>
                  <h2 className="text-xl font-bold">{selectedIntern.name}</h2>
                  <p className={`text-xs font-medium ${isDark ? 'text-indigo-400' : 'text-sky-600'}`}>{selectedIntern.role}</p>
                  <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Batch {selectedIntern.batch} ({selectedIntern.year})</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Tentang Talenta</h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{selectedIntern.bio}</p>
              </div>

              <div className="mb-6">
                <h4 className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Riwayat Kontribusi Proyek</h4>
                <div className="space-y-2">
                  {selectedIntern.contributions.map((item, idx) => (
                    <div key={idx} className={`text-xs border p-3 rounded-xl flex items-start gap-2 ${
                      isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      <span className={isDark ? 'text-indigo-400 font-bold' : 'text-sky-600 font-bold'}>•</span> {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className={`flex gap-3 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                {selectedIntern.socials.linkedin && (
                  <a href={selectedIntern.socials.linkedin} target="_blank" rel="noreferrer" className={`p-2.5 rounded-xl transition-colors text-white ${isDark ? 'bg-slate-800 hover:bg-indigo-600' : 'bg-slate-800 hover:bg-sky-600'}`}>
                    <LinkedinIcon />
                  </a>
                )}
                {selectedIntern.socials.github && (
                  <a href={selectedIntern.socials.github} target="_blank" rel="noreferrer" className={`p-2.5 rounded-xl transition-colors text-white ${isDark ? 'bg-slate-800 hover:bg-indigo-600' : 'bg-slate-800 hover:bg-sky-600'}`}>
                    <Globe size={18} />
                  </a>
                )}
                {selectedIntern.socials.instagram && (
                  <a href={selectedIntern.socials.instagram} target="_blank" rel="noreferrer" className={`p-2.5 rounded-xl transition-colors text-white ${isDark ? 'bg-slate-800 hover:bg-indigo-600' : 'bg-slate-800 hover:bg-sky-600'}`}>
                    <InstagramIcon />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}