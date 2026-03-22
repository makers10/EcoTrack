import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  TrendingDown, 
  Wind, 
  Zap, 
  Droplets,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Target,
  Sparkles as SparklesIcon
} from 'lucide-react';
import api from '../services/api';

const STAT_CARDS = [
  { label: 'CO2 Saved', value: '124.5 kg', icon: <Wind className="text-blue-400" />, trend: '-12%' },
  { label: 'Energy Saved', value: '342 kWh', icon: <Zap className="text-yellow-400" />, trend: '+5%' },
  { label: 'Water Saved', value: '1.2k L', icon: <Droplets className="text-cyan-400" />, trend: '+18%' },
  { label: 'Challenges', value: '8', icon: <Award className="text-purple-400" />, trend: '+2' },
];

export function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [goal, setGoal] = useState<any>(null);
  const [recs, setRecs] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [goalRes, recsRes] = await Promise.all([
          api.get(`/profile/analytics/goal-progress/${user._id || 'unknown'}`),
          api.get(`/profile/analytics/recommendations/${user._id || 'unknown'}`)
        ]);
        setGoal(goalRes.data);
        setRecs(recsRes.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    if (user._id) {
       fetchData();
    } else {
       // Mock for guest
       setGoal({ goal: 500, current: 124, percentage: 25, remaining: 376, period: 'monthly' });
       setRecs([
         { title: "Start Composting", desc: "Reduce landfill waste by 30%.", impact: 'High' },
         { title: "Cold Water Wash", desc: "Save 40% energy per load.", impact: 'Medium' }
       ]);
       setLoading(false);
    }
  }, [user._id]);

  return (
    <div className="p-3 max-w-7xl mx-auto space-y-3">
      {/* Title Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-3 m-3">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-2xl font-bold font-sans">
            Hello, <span className="text-primary">{user.name?.split(' ')[0] || 'Member'}!</span>
          </h1>
          <p className="text-text-muted text-sm">
            Ready to reach your {goal?.period} goal?
          </p>
        </motion.div>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary flex items-center gap-2 p-3 text-sm h-10"
        >
          <Plus size={16} />
          <span>Record Activity</span>
        </motion.button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {STAT_CARDS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass glass-hover p-3 rounded-xl group"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                {stat.icon}
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.trend.startsWith('-') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-text-muted text-xs mb-1">{stat.label}</p>
            <p className="text-xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Goal Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass rounded-xl p-3 relative overflow-hidden bg-gradient-to-br from-primary/10 to-transparent"
        >
          <div className="absolute top-0 right-0 p-3 opacity-20">
             <Target size={60} className="text-primary animate-pulse" />
          </div>

          <div className="relative space-y-3">
            <div className="flex items-center gap-3">
               <div className="p-3 bg-primary/20 rounded-xl text-primary text-sm font-bold flex items-center gap-2">
                 <Award size={16} />
                 Impact Goal
               </div>
               <div>
                  <h3 className="text-lg font-bold">{goal?.period} Target</h3>
                  <p className="text-xs text-text-muted">{goal?.remaining}kg CO₂ remaining to save</p>
               </div>
            </div>

            <div className="space-y-2">
               <div className="flex justify-between items-center text-xs font-medium">
                  <span className="flex items-center gap-1"><SparklesIcon size={12} className="text-primary" /> Goal Progress</span>
                  <span className="text-primary font-black uppercase tracking-tighter">{goal?.percentage}% Complete</span>
               </div>
               <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/5 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${goal?.percentage || 0}%` }}
                    transition={{ duration: 1.5, type: 'spring' }}
                    className="h-full bg-linear-to-r from-primary to-primary-light relative" 
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </motion.div>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
               <div className="text-center p-3 glass rounded-xl">
                  <p className="text-text-muted text-[10px] mb-1 uppercase tracking-wider font-bold">Today</p>
                  <p className="text-lg font-bold">4.2kg</p>
               </div>
               <div className="text-center p-3 glass rounded-xl border-primary/20 bg-primary/5">
                  <p className="text-text-muted text-[10px] mb-1 uppercase tracking-wider font-bold">Goal</p>
                  <p className="text-lg font-bold">{goal?.goal}kg</p>
               </div>
               <div className="text-center p-3 glass rounded-xl">
                  <p className="text-text-muted text-[10px] mb-1 uppercase tracking-wider font-bold">Days Left</p>
                  <p className="text-lg font-bold">12</p>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Smart Recommendations */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-3 flex flex-col space-y-3 border border-white/5"
        >
          <div className="flex items-center justify-between">
             <h3 className="text-lg font-bold flex items-center gap-2">
               <SparklesIcon size={18} className="text-primary" />
               Smart Tips
             </h3>
             <TrendingDown size={16} className="text-primary" />
          </div>

          <div className="flex-1 space-y-2">
             {recs.map((rec, i) => (
               <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-primary/20 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                     <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm ${rec.impact === 'High' ? 'bg-red-500/10 text-red-400' : 'bg-primary/10 text-primary'}`}>
                       {rec.impact} Impact
                     </span>
                     <ArrowUpRight size={12} className="text-text-muted" />
                  </div>
                  <h4 className="text-sm font-bold">{rec.title}</h4>
                  <p className="text-[11px] text-text-muted leading-tight mt-1">{rec.desc}</p>
               </div>
             ))}
          </div>

          <button className="w-full mt-3 py-2 bg-white/5 rounded-lg text-xs font-black uppercase tracking-widest transition-all border border-white/5 hover:bg-primary/10 hover:text-primary">
            Refine Strategy
          </button>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <section className="glass rounded-xl p-3">
         <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold">Recent Activities</h3>
            <button className="text-primary font-bold text-xs uppercase tracking-tighter">View Timeline</button>
         </div>

         <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-white/5">
                 <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Leaf size={18} />
                 </div>
                 <div className="flex-1">
                    <h4 className="text-sm font-bold">Composted organic waste</h4>
                    <p className="text-xs text-text-muted">Kitchen & Garden waste</p>
                 </div>
                 <div className="text-right">
                    <p className="text-sm font-bold text-emerald-400">-0.45kg</p>
                    <p className="text-[10px] text-text-muted">2h ago</p>
                 </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
