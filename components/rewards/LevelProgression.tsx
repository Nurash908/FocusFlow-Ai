import React from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

export const LevelProgression: React.FC = () => {
    const xp = 4850;
    const nextLevel = 5000;
    const progress = (xp / nextLevel) * 100;

    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold">Productivity Expert</h3>
                    <p className="text-slate-400">Level 27</p>
                </div>
                <div className="bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full font-bold flex items-center gap-2">
                    <Zap size={18} />
                    {xp} XP
                </div>
            </div>
            <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                />
            </div>
            <p className="text-sm text-slate-400 mt-3 text-right">{nextLevel - xp} XP to next level</p>
        </div>
    );
};
