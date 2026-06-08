import React from 'react';
import { motion } from 'motion/react';
import { Target, Zap, CheckCircle2 } from 'lucide-react';

interface Props {
  title: string;
  progress: number;
  total: number;
  xp: number;
}

export const ChallengeCard: React.FC<Props> = ({ title, progress, total, xp }) => {
  const percentage = (progress / total) * 100;
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 shadow-2xl flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-lg">{title}</h4>
        <span className="text-cyan-400 font-bold">+{xp} XP</span>
      </div>
      <div>
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>{progress} / {total}</span>
          <span>{percentage.toFixed(0)}%</span>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};
