import React from 'react';
import { Award, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  locked?: boolean;
}

export const BadgeCard: React.FC<Props> = ({ title, description, icon, locked }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl relative ${locked ? 'opacity-60 grayscale' : ''}`}
    >
      <div className={`mb-4 ${locked ? 'text-slate-600' : 'text-yellow-400'}`}>
        {icon}
      </div>
      <h4 className="font-bold text-lg mb-1">{title}</h4>
      <p className="text-sm text-slate-400">{description}</p>
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 rounded-2xl">
          <Lock className="text-slate-500" />
        </div>
      )}
    </motion.div>
  );
};
