import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User as UserIcon, 
  Target, 
  Settings, 
  Award, 
  Share2, 
  CheckCircle2, 
  Globe, 
  Lock,
  ArrowRight,
  TrendingUp,
  Award as AwardIcon
} from 'lucide-react';
import api from '../services/api';

export function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [goal, setGoal] = useState<any>(null);
  const [achievements, setAchievements] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [editGoal, setEditGoal] = useState(100);
  const [editPeriod, setEditPeriod] = useState('monthly');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [goalRes, achRes] = await Promise.all([
          api.get(`/profile/analytics/goal-progress/${user._id || 'unknown'}`),
          api.get(`/profile/${user._id || 'unknown'}/achievements`)
        ]);
        setGoal(goalRes.data);
        setEditGoal(goalRes.data.goal);
        setEditPeriod(goalRes.data.period);
        setAchievements(achRes.data || []);
      } catch (err) {
        console.error("Failed to fetch profile data", err);
      } finally {
        setLoading(false);
      }
    };
    if (user._id) fetchData();
  }, [user._id]);

  const handleUpdateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(`/profile/analytics/goal/${user._id}`, { goal: editGoal, period: editPeriod });
      window.location.reload();
    } catch (err) {
      console.error("Failed to update goal", err);
    }
  };

  return (
    <div className="p-3 max-w-5xl mx-auto space-y-3">
      {/* Profile Header */}
      <motion.header 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="glass rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden"
      >
         <div className="absolute top-0 right-0 p-3">
            <button className="p-2 glass rounded-lg hover:text-primary transition-colors"><Settings size={18} /></button>
         </div>
         <div className="w-24 h-24 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-4xl font-black shadow-2xl relative">
            {user.name?.[0]}
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center border-2 border-background">
               <CheckCircle2 size={16} className="text-white" />
            </div>
         </div>
         <div>
            <h1 className="text-2xl font-black">{user.name}</h1>
            <p className="text-text-muted text-sm font-medium">@{user.username}</p>
         </div>
         <div className="flex gap-2">
            <button className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest hover:border-primary/40 hover:text-primary transition-all">
               <Share2 size={14} /> Share Profile
            </button>
            <button className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest hover:border-blue-400/40 hover:text-blue-400 transition-all">
               <Globe size={14} /> Public URL
            </button>
         </div>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
         {/* Goal Settings */}
         <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="glass rounded-xl p-3 space-y-3 border border-white/5"
         >
            <h3 className="text-sm font-bold flex items-center gap-2">
               <Target size={18} className="text-primary" />
               Sustainability Goal
            </h3>
            <form onSubmit={handleUpdateGoal} className="space-y-3 p-3 bg-black/20 rounded-xl">
               <div className="space-y-1">
                  <label className="text-[10px] font-black text-text-muted uppercase">Target Savings (kg CO₂)</label>
                  <input 
                    type="number" 
                    className="input-field w-full h-10 bg-white/5 border-white/10 px-3 text-sm focus:border-primary/40"
                    value={editGoal}
                    onChange={(e) => setEditGoal(Number(e.target.value))}
                  />
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-black text-text-muted uppercase">Timeframe</label>
                  <select 
                     className="input-field w-full h-10 bg-white/5 border-white/10 px-3 text-sm focus:border-primary/40 appearance-none"
                     value={editPeriod}
                     onChange={(e) => setEditPeriod(e.target.value)}
                  >
                     <option value="daily" className="bg-background text-white">Daily</option>
                     <option value="weekly" className="bg-background text-white">Weekly</option>
                     <option value="monthly" className="bg-background text-white">Monthly</option>
                     <option value="yearly" className="bg-background text-white">Yearly</option>
                  </select>
               </div>
               <button type="submit" className="w-full btn-primary h-10 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                  Update Goal
               </button>
            </form>
         </motion.div>

         {/* Badges & Achievements */}
         <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="glass rounded-xl p-3 border border-white/5 flex flex-col"
         >
            <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
               <AwardIcon size={18} className="text-yellow-400" />
               My Achievements
            </h3>
            <div className="flex-1 overflow-y-auto max-h-[250px] space-y-2 pr-1 scrollbar-thin scrollbar-thumb-white/10">
               {achievements.length > 0 ? achievements.map((ach, i) => (
                 <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-primary/20 transition-all cursor-default scale-100 active:scale-95">
                    <div className="w-10 h-10 bg-yellow-400/20 text-yellow-400 rounded-lg flex items-center justify-center shrink-0">
                       <Award size={20} />
                    </div>
                    <div>
                       <p className="text-xs font-bold leading-tight uppercase tracking-tight">{ach.badgeName}</p>
                       <p className="text-[10px] text-text-muted mt-1">{ach.description}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1 text-[9px] font-black text-amber-500 uppercase">
                       <TrendingUp size={10} /> {ach.milestone}kg
                    </div>
                 </div>
               )) : (
                 <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30 pt-10">
                    <Award size={40} className="mb-2" />
                    <p className="text-xs">No badges yet. Start saving!</p>
                 </div>
               )}
            </div>
         </motion.div>
      </div>

      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.3 }}
         className="glass rounded-xl p-3 border border-white/5 bg-linear-to-r from-background to-primary/10 overflow-hidden group h-32 flex items-center"
      >
         <div className="flex-1 p-3">
            <h4 className="text-xl font-black italic">Eco Identity Secured.</h4>
            <p className="text-xs text-text-muted mt-1">Your data is encrypted and synced with the Global GreenPrint Network.</p>
         </div>
         <div className="p-3">
            <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-primary/30 group-hover:text-primary transition-colors">
               <Lock size={32} />
            </div>
         </div>
      </motion.div>
    </div>
  );
}
