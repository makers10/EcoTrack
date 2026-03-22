import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, TrendingUp, Search, Plus, MapPin, Target, Sparkles } from 'lucide-react';
import api from '../services/api';

export function GroupsPage() {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'groups'>('users');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const path = activeTab === 'users' ? '/profile/leaderboard' : '/profile/group-leaderboard';
        const res = await api.get(path);
        setLeaderboard(res.data.leaderboard || res.data || []);
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [activeTab]);

  return (
    <div className="p-3 max-w-7xl mx-auto space-y-3">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between p-3 gap-3">
         <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
               <Users className="text-primary" size={24} />
               Community Hub
            </h1>
            <p className="text-text-muted text-xs">Join teams and climb the global eco rankings.</p>
         </div>
         <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('users')}
              className={`p-3 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 transition-all ${activeTab === 'users' ? 'bg-primary/20 text-primary border border-primary/20 shadow-lg shadow-primary/10' : 'bg-white/5 text-text-muted hover:bg-white/10 border border-white/5'}`}
            >
               <Users size={14} />
               Top Saviours
            </button>
            <button 
              onClick={() => setActiveTab('groups')}
               className={`p-3 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 transition-all ${activeTab === 'groups' ? 'bg-primary/20 text-primary border border-primary/20 shadow-lg shadow-primary/10' : 'bg-white/5 text-text-muted hover:bg-white/10 border border-white/5'}`}
            >
               <MapPin size={14} />
               Eco Teams
            </button>
         </div>
      </header>

      {/* Dynamic Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        
        {/* Leaderboard Table Area */}
        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="lg:col-span-2 glass rounded-xl overflow-hidden flex flex-col border border-white/5"
        >
           <div className="p-3 bg-white/5 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                 <Trophy size={16} className="text-yellow-400" />
                 {activeTab === 'users' ? 'Global Ranking' : 'Top Teams'}
              </h3>
              <div className="flex items-center gap-2 bg-black/20 rounded-lg px-2 py-1">
                 <Search size={14} className="text-text-muted" />
                 <input type="text" placeholder="Find..." className="bg-transparent text-[10px] focus:outline-none w-20" />
              </div>
           </div>

           <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-white/5 text-[10px] font-black text-text-muted uppercase tracking-wider">
                       <th className="p-3 w-16">Rank</th>
                       <th className="p-3">Member</th>
                       <th className="p-3 text-right">Total saved</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {leaderboard.length > 0 ? leaderboard.map((item, idx) => (
                      <tr key={item.userId} className={`hover:bg-primary/5 transition-colors group ${item.userId === user._id ? 'bg-primary/10' : ''}`}>
                         <td className="p-3 text-sm font-bold">
                            <div className="flex items-center gap-2">
                               <span className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-black ${idx === 0 ? 'bg-yellow-400 text-black' : idx === 1 ? 'bg-slate-300 text-black' : idx === 2 ? 'bg-amber-600 text-white' : 'bg-white/10 text-text-muted'}`}>
                                  {item.rank}
                               </span>
                            </div>
                         </td>
                         <td className="p-3">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/5 flex items-center justify-center font-bold text-xs">
                                  {item.name?.[0]}
                               </div>
                               <div>
                                  <p className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">{item.name}</p>
                                  <p className="text-[10px] text-text-muted italic">{item.email}</p>
                               </div>
                            </div>
                         </td>
                         <td className="p-3 text-right font-black font-sans text-primary">
                            {item.totalCarbonSaved} kg
                         </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={3} className="p-6 text-center text-xs text-text-muted">No data available. Join the movement now!</td>
                      </tr>
                    )}
                 </tbody>
              </table>
           </div>
        </motion.div>

        {/* Sidebar / Team Action side */}
        <div className="space-y-3">
           {/* Your Team Card */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="glass rounded-xl p-3 bg-linear-to-br from-primary/10 to-transparent border border-primary/20"
           >
              <h4 className="text-[10px] font-black text-primary uppercase mb-2 tracking-widest">Your Collective</h4>
              <div className="flex items-start gap-4 mb-3">
                 <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <Users size={24} />
                 </div>
                 <div>
                    <h3 className="text-lg font-black leading-none mt-1">Green Team A</h3>
                    <p className="text-[10px] text-text-muted mt-2 flex items-center gap-1">
                       <MapPin size={10} /> California, USA
                    </p>
                 </div>
              </div>
              <div className="space-y-2 mt-4">
                 <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-text-muted">Goal Progress</span>
                    <span className="text-primary">82%</span>
                 </div>
                 <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '82%' }} className="h-full bg-primary" />
                 </div>
              </div>
           </motion.div>

           {/* Discovery Card */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="glass rounded-xl p-3 border border-white/5 space-y-3"
           >
              <h3 className="text-sm font-bold flex items-center gap-2">
                 <Sparkles size={16} className="text-primary" />
                 Hot Eco Teams
              </h3>
              <div className="space-y-2">
                 {['Earth Guardians', 'Zero Waste Collective', 'Bike Buddies'].map((team) => (
                   <div key={team} className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                      <div>
                         <p className="text-xs font-bold">{team}</p>
                         <p className="text-[9px] text-text-muted">1.2k members</p>
                      </div>
                      <Plus size={14} className="text-text-muted group-hover:text-primary" />
                   </div>
                 ))}
              </div>
              <button className="w-full h-10 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-primary transition-all">
                 Browse Communities
              </button>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
