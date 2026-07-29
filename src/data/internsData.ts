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
    name: "nopa",
    role: "Backend Developer",
    batch: 3,
    year: 2026,
    isActive: true,
    activityScore: 98,
    avatar: "https://res.cloudinary.com/drtw0hnds/image/upload/v1785311501/nopa_miror_at0oxa.jpg",
    bio: "Pengembang sistem backend, arsitektur database desentralisasi, dan optimasi API.",
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
    contributions: ["Pengembangan API Redesain Mudapedia", "Arsitektur Database Serverless"]
  },
  {
    id: "muda-002",
    name: "fynoo",
    role: "Frontend Developer",
    batch: 3,
    year: 2026,
    isActive: true,
    activityScore: 95,
    avatar: "https://res.cloudinary.com/drtw0hnds/image/upload/v1785311501/nopa_rinjanii_dqu9ez.jpg",
    bio: "Fokus pada pembuatan antarmuka Next.js, animasi UI interaktif, dan integrasi aset 3D.",
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
    contributions: ["Integrasi Three.js 3D Canvas", "Sistem Filter Tim & Modal Portofolio"]
  },
  {
    id: "muda-003",
    name: "anova",
    role: "Internship",
    batch: 3,
    year: 2026,
    isActive: true,
    activityScore: 89,
    avatar: "https://res.cloudinary.com/drtw0hnds/image/upload/v1785311500/nopa_skena_kalcer_espia7.jpg",
    bio: "Talenta muda yang berfokus pada riset ekosistem Web3 dan pembuatan aset media.",
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
    contributions: ["Riset Konten Edukasi Crypto", "Dukungan Manajemen Media Sosial"]
  },
  {
    id: "muda-004",
    name: "nop",
    role: "Internship",
    batch: 2,
    year: 2025,
    isActive: true,
    activityScore: 89,
    avatar: "https://res.cloudinary.com/drtw0hnds/image/upload/v1785311497/nopa_duduk_dxobqa.jpg",
    bio: "Talenta muda yang berfokus pada riset ekosistem Web3 dan pembuatan aset media.",
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
    contributions: ["Riset Konten Edukasi Crypto", "Dukungan Manajemen Media Sosial"]
  },
  {
    id: "muda-005",
    name: "mira",
    role: "Internship",
    batch: 2,
    year: 2025,
    isActive: false,
    isAlumni: true,
    activityScore: 89,
    avatar: "https://res.cloudinary.com/drtw0hnds/image/upload/v1785311496/mira_cantik_dp9zwj.jpg",
    bio: "Talenta muda yang berfokus pada riset ekosistem Web3 dan pembuatan aset media.",
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
    contributions: ["Riset Konten Edukasi Crypto", "Dukungan Manajemen Media Sosial"]
  },
  {
    id: "muda-006",
    name: "namira",
    role: "Internship",
    batch: 2,
    year: 2025,
    isActive: false,
    isAlumni: true,
    activityScore: 89,
    avatar: "https://res.cloudinary.com/drtw0hnds/image/upload/v1785313316/miwa_lcu6te.jpg",
    bio: "Talenta muda yang berfokus pada riset ekosistem Web3 dan pembuatan aset media.",
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
    contributions: ["Riset Konten Edukasi Crypto", "Dukungan Manajemen Media Sosial"]
  },
  {
    id: "muda-007",
    name: "kai",
    role: "Internship",
    batch: 3,
    year: 2026,
    isActive: true,
    activityScore: 89,
    avatar: "https://res.cloudinary.com/drtw0hnds/image/upload/v1785313317/kai_yvh9gd.jpg",
    bio: "Talenta muda yang berfokus pada riset ekosistem Web3 dan pembuatan aset media.",
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
    contributions: ["Riset Konten Edukasi Crypto", "Dukungan Manajemen Media Sosial"]
  },
  {
    id: "muda-008",
    name: "prabu",
    role: "Internship",
    batch: 3,
    year: 2026,
    isActive: true,
    activityScore: 89,
    avatar: "https://res.cloudinary.com/drtw0hnds/image/upload/v1785313317/prabu_js1g1i.jpg",
    bio: "Talenta muda yang berfokus pada riset ekosistem Web3 dan pembuatan aset media.",
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
    contributions: ["Riset Konten Edukasi Crypto", "Dukungan Manajemen Media Sosial"]
  },
  {
    id: "muda-009",
    name: "rija",
    role: "Internship",
    batch: 3,
    year: 2026,
    isActive: true,
    activityScore: 89,
    avatar: "https://res.cloudinary.com/drtw0hnds/image/upload/v1785313319/rija_fxm5kq.jpg",
    bio: "Talenta muda yang berfokus pada riset ekosistem Web3 dan pembuatan aset media.",
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
    contributions: ["Riset Konten Edukasi Crypto", "Dukungan Manajemen Media Sosial"]
  }
];