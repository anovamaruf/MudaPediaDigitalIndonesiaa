'use client';
import { motion } from 'framer-motion';

export default function NavWheel({ activeMenu, setActiveMenu }: any) {
  const menuList = ["Tim Kami", "Tentang Kami", "Paket Token", "Galeri"];
  return (
    <motion.div 
      className="fixed -right-[150px] top-1/2 w-[900px] h-[900px] z-50"
      animate={{ rotate: -activeMenu * 20 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {menuList.map((menu, i) => (
        <div key={i} className="absolute top-1/2 left-1/2" style={{ transform: `translate(-50%, -50%) rotate(${i * 20}deg) translateX(-400px)` }}>
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveMenu(i)}>
            <span className={`uppercase text-xs ${activeMenu === i ? 'text-emerald-400' : 'text-slate-700'}`}>{menu}</span>
            <div className={`w-3 h-3 rounded-full ${activeMenu === i ? 'bg-emerald-400' : 'bg-slate-700'}`} />
          </div>
        </div>
      ))}
    </motion.div>
  );
}