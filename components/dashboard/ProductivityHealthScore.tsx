import React from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

interface Props {
  score: number; // 0-100
}

export const ProductivityHealthScore: React.FC<Props> = ({ score = 82 }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s < 50) return 'text-red-500';
    if (s < 75) return 'text-yellow-500';
    return 'text-indigo-400';
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 flex flex-col items-center">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Activity className="text-indigo-400" size={24} />
        Productivity Health
      </h2>
      <div className="relative flex items-center justify-center">
        <svg className="w-40 h-40 rotate-[-90deg]">
          <circle cx="80" cy="80" r={radius} className="stroke-slate-800" strokeWidth="12" fill="none" />
          <motion.circle 
            cx="80" cy="80" r={radius}
            className={`stroke-current ${getColor(score)}`}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{ strokeDasharray: circumference, strokeDashoffset: strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-4xl font-bold text-white">{score}</span>
          <span className="text-sm text-slate-400 block">/100</span>
        </div>
      </div>
      <p className="mt-6 text-sm text-center text-slate-400">
        Your focus score is <strong className="text-white">excellent</strong> compared to your weekly average.
      </p>
    </div>
  );
};
