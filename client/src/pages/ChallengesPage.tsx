import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Clock, Flame, CheckCircle2, ArrowRight, Star } from 'lucide-react';

const CHALLENGES = [
  {
    id: 1,
    title: "Zero Waste Week",
    description: "Try to generate zero landfill waste for 7 consecutive days.",
    reward: "500 XP",
    participants: 1243,
    timeLeft: "2 days",
    category: "Waste",
    difficulty: "Hard",
    progress: 65,
    icon: <Trophy className="text-yellow-400" />
  },
  {
    id: 2,
    title: "Public Transport Only",
    description: "Use only public transport, bikes, or walking.",
    reward: "300 XP",
    participants: 856,
    timeLeft: "5 days",
    category: "Transport",
    difficulty: "Medium",
    progress: 30,
    icon: <Clock className="text-blue-400" />
  },
  {
    id: 3,
    title: "Plant-Based Hero",
    description: "Eat only plant-based meals for 3 days.",
    reward: "200 XP",
    participants: 2100,
    timeLeft: "12 hours",
    category: "Food",
    difficulty: "Easy",
    progress: 100,
    icon: <Star className="text-purple-400" />
  }
];

export function ChallengesPage() {
  return (
    <div className="p-3 max-w-7xl mx-auto space-y-3">
      <header className="flex justify-between items-end p-3">
        <div>
          <h1 className="text-2xl font-bold mb-1">Eco <span className="text-primary">Challenges</span></h1>
          <p className="text-text-muted text-xs">Push your limits and earn rewards.</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-xl border border-primary/20">
           <Flame className="text-orange-500" size={16} />
           <span className="font-bold text-primary text-xs">7 Day Streak!</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {CHALLENGES.map((challenge, idx) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass rounded-xl p-3 flex flex-col group relative overflow-hidden border border-white/5"
          >
            {challenge.progress === 100 && (
               <div className="absolute top-0 right-0 p-2">
                  <CheckCircle2 className="text-primary" size={20} />
               </div>
            )}
            
            <div className="flex gap-3 mb-3">
               <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-xl shrink-0">
                  {challenge.icon}
               </div>
               <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-[10px] font-bold px-1.5 py-0.5 bg-white/10 rounded-md text-text-muted uppercase">
                        {challenge.category}
                     </span>
                  </div>
                  <h3 className="text-lg font-bold truncate">{challenge.title}</h3>
               </div>
            </div>

            <p className="text-text-muted mb-3 text-xs leading-tight">{challenge.description}</p>

            <div className="mt-auto space-y-3">
               <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold">
                     <span className="text-text-muted">Progress</span>
                     <span>{challenge.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${challenge.progress}%` }}
                        className={`h-full ${challenge.progress === 100 ? 'bg-primary' : 'bg-blue-400'}`}
                     />
                  </div>
               </div>

               <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                     <div className="flex items-center gap-1 text-[10px] text-text-muted">
                        <Users size={12} />
                        <span>{challenge.participants}</span>
                     </div>
                     <div className="flex items-center gap-1 text-[10px] text-text-muted">
                        <Clock size={12} />
                        <span>{challenge.timeLeft}</span>
                     </div>
                  </div>
                  <button className={`flex items-center gap-2 font-bold px-4 py-2 rounded-lg text-xs transition-all ${
                     challenge.progress === 100 ? 'bg-primary/20 text-primary' : 'bg-white/5 hover:bg-white/10 text-white'
                  }`}>
                     {challenge.progress === 100 ? 'Done' : 'Go'}
                     <ArrowRight size={14} />
                  </button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
