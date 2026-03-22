import React from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  Fingerprint, 
  LogOut,
  Sparkles,
  Search,
  Bell,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

const NAV_ITEMS = [
  { icon: <LayoutDashboard size={16} />, label: 'Dashboard', path: '/dashboard' },
  { icon: <Trophy size={16} />, label: 'Challenges', path: '/challenges' },
  { icon: <Users size={16} />, label: 'Groups', path: '/groups' },
  { icon: <Fingerprint size={16} />, label: 'GreenPrint', path: '/greenprint' },
  { icon: <Sparkles size={16} />, label: 'Eco Advice', path: '/advice' },
];

export function Layout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-background text-text overflow-hidden">
      {/* 1. Full Height Left Sidebar (100vh) */}
      <aside className="w-56 glass border-r border-white/10 flex flex-col p-2 h-full z-[110] relative">
        <div className="flex items-center gap-2 mb-4 p-3 border-b border-white/5 pb-6">
          <img src={logoImg} alt="EcoTrack Logo" className="w-8 h-8 object-contain" />
          <span className="text-lg font-black tracking-tight text-white uppercase">EcoTrack</span>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `nav-link px-3 rounded-lg flex items-center justify-between text-xs transition-all h-9 group ${isActive ? 'bg-primary/20 text-primary border border-primary/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'text-text-muted hover:bg-white/5'}`
              }
            >
              <div className="flex items-center gap-3">
                 {item.icon}
                 <span className="font-bold tracking-wide">{item.label}</span>
              </div>
              <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        <footer className="mt-auto p-2 border-t border-white/5 pt-4">
           <button 
             onClick={handleLogout}
             className="flex items-center gap-2 w-full px-3 py-2.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-all h-9 text-[10px] font-black uppercase tracking-widest"
           >
             <LogOut size={14} />
             <span>Sign Out</span>
           </button>
        </footer>
      </aside>

      {/* 2. Main Area (Starts after Sidebar) */}
      <div className="flex-1 flex flex-col relative h-full">
        
        {/* Top Navbar (Fills remaining width) */}
        <header className="h-12 glass border-b border-white/10 flex items-center justify-between px-4 sticky top-0 z-[100] bg-background/80 backdrop-blur-xl">
           <div className="flex items-center gap-2 text-xs text-text-muted font-medium">
              <span>Overview</span>
              <ChevronRight size={12} />
              <span className="text-white">Active Sessions</span>
           </div>

           {/* User Profile on the Top Right */}
           <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
                <Search size={14} className="text-text-muted" />
                <input type="text" placeholder="Search insights..." className="bg-transparent text-[10px] uppercase font-bold focus:outline-none w-32" />
             </div>
             
             <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-text-muted relative">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-background"></span>
             </button>

             <div className="h-6 w-[1px] bg-white/10 mx-1" />

             <Link to="/profile" className="flex items-center gap-3 pl-2 group cursor-pointer transition-all hover:opacity-80">
               <div className="text-right hidden md:block text-white">
                  <p className="text-[10px] font-black leading-none uppercase tracking-widest">{user.name || 'User'}</p>
                  <p className="text-[9px] text-primary font-bold mt-1 uppercase">Profile & Settings</p>
               </div>
               <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-black text-xs shadow-lg group-hover:scale-105 transition-transform">
                  {user.name?.[0] || 'U'}
               </div>
             </Link>
           </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-auto pb-4">
           {/* Decorative background effects */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] pointer-events-none -z-10" />
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[100px] pointer-events-none -z-10" />
           <Outlet />
        </main>
      </div>
    </div>
  );
}
