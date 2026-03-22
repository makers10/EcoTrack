import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Calendar, ArrowUpRight, CheckCircle2, Globe, Leaf } from 'lucide-react';
import api from '../services/api';

export function GreenPrintPage() {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get(`/profile/${user._id || 'unknown'}/history`);
        setHistory(res.data || []);
      } catch (err) {
        console.error("Failed to fetch GreenPrint history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user._id]);

  // If mock/empty
  const displayHistory = history.length > 0 ? history : [
    { date: new Date(), activity: "Zero Waste Hero", carbonSaved: 12.5 },
    { date: new Date(Date.now() - 86400000), activity: "Electric Commute", carbonSaved: 4.2 },
    { date: new Date(Date.now() - 172800000), activity: "Vegan Weekend", carbonSaved: 8.9 }
  ];

  return (
    <div className="p-3 max-w-7xl mx-auto space-y-3">
      {/* Header Info */}
      <header className="p-3 m-3">
         <h1 className="text-2xl font-bold flex items-center gap-2">
            <Fingerprint className="text-primary" size={24} />
            My GreenPrint
         </h1>
         <p className="text-text-muted text-xs">Your permanent, blockchain-ready sustainability footprint.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {/* Main Timeline */}
        <div className="lg:col-span-3 space-y-3">
           {displayHistory.map((item, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="glass rounded-xl p-3 flex items-center gap-4 hover:border-primary/30 transition-all group"
             >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex flex-col items-center justify-center font-black group-hover:bg-primary/20 transition-colors">
                   <span className="text-xs text-text-muted group-hover:text-primary leading-none uppercase tracking-tighter">
                      {new Date(item.date).toLocaleString('default', { month: 'short' })}
                   </span>
                   <span className="text-xl leading-none">
                      {new Date(item.date).getDate()}
                   </span>
                </div>

                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-black tracking-widest px-2 py-0.5 bg-primary/10 text-primary rounded">Verified</span>
                      <span className="text-[10px] text-text-muted italic flex items-center gap-1">
                         <Calendar size={10} /> {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                   </div>
                   <h3 className="text-lg font-bold leading-tight">{item.activity}</h3>
                   <p className="text-xs text-text-muted flex items-center gap-1"><Leaf size={12} /> Carbon reduction footprint recorded</p>
                </div>

                <div className="text-right">
                   <div className="flex items-center justify-end text-primary gap-1 font-black">
                      <span className="text-sm">-{item.carbonSaved}kg</span>
                      <ArrowUpRight size={14} />
                   </div>
                   <p className="text-[10px] text-text-muted uppercase font-bold mt-1">Impact Scored</p>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Impact Sidebar */}
        <div className="space-y-3">
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="glass rounded-xl p-3 border-primary/20 bg-primary/5"
           >
              <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
                 <Globe size={18} className="text-primary" />
                 Global Impact
              </h3>
              <div className="space-y-3">
                 <div className="p-3 bg-black/20 rounded-xl">
                    <p className="text-[10px] font-black text-text-muted uppercase mb-1">Tree Equivalent</p>
                    <p className="text-2xl font-black text-white">4.2 Trees</p>
                    <div className="mt-2 text-[10px] text-primary font-bold">↑ 0.5 this week</div>
                 </div>
                 <div className="p-3 bg-black/20 rounded-xl">
                    <p className="text-[10px] font-black text-text-muted uppercase mb-1">Community Rank</p>
                    <p className="text-2xl font-black text-white">#124</p>
                    <div className="mt-2 text-[10px] text-blue-400 font-bold">Top 5% of users</div>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="glass rounded-xl p-3 border border-white/5"
           >
              <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
                 <CheckCircle2 size={18} className="text-primary" />
                 Verifications
              </h3>
              <div className="space-y-2">
                 {['Photo Proof', 'IoT Sync', 'Social Boost'].map((v) => (
                   <div key={v} className="flex items-center justify-between text-xs">
                      <span className="text-text-muted">{v}</span>
                      <span className="font-bold text-emerald-400">Active</span>
                   </div>
                 ))}
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
