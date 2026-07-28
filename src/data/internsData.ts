export interface Socials {
  linkedin?: string;
  github?: string;
  instagram?: string;
}

export interface Intern {
  id: string;
  name: string;
  role: string;
  batch: number;
  year: number;
  isActive: boolean;
  isAlumni?: boolean;
  activityScore: number;
  avatar: string;
  bio: string;
  socials: Socials;
  contributions: string[];
}

export const internsData: Intern[] = [
  {
    id: "muda-001",
    name: "Iqbal",
    role: "Backend Developer",
    batch: 3,
    year: 2026,
    isActive: true,
    activityScore: 98,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    bio: "Pengembang sistem backend, arsitektur database desentralisasi, dan optimasi API.",
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
    contributions: ["Pengembangan API Redesain Mudapedia", "Arsitektur Database Serverless"]
  },
  {
    id: "muda-002",
    name: "Theo",
    role: "Frontend Developer",
    batch: 3,
    year: 2026,
    isActive: true,
    activityScore: 95,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    bio: "Fokus pada pembuatan antarmuka Next.js, animasi UI interaktif, dan integrasi aset 3D.",
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
    contributions: ["Integrasi Three.js 3D Canvas", "Sistem Filter Tim & Modal Portofolio"]
  },
  {
    id: "muda-003",
    name: "Joko",
    role: "Internship",
    batch: 2,
    year: 2025,
    isActive: false,
    activityScore: 90,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    bio: "Peserta magang dengan dedikasi tinggi pada penyusunan UI/UX dan pengujian sistem.",
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
    contributions: ["Penyusunan Dokumentasi API", "Riset Komponen Desain UI"]
  },
  {
    id: "muda-004",
    name: "Izza",
    role: "Internship",
    batch: 2,
    year: 2025,
    isActive: false,
    activityScore: 89,
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300",
    bio: "Talenta muda yang berfokus pada riset ekosistem Web3 dan pembuatan aset media.",
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
    contributions: ["Riset Konten Edukasi Crypto", "Dukungan Manajemen Media Sosial"]
  }
];      