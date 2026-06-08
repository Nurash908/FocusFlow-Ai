import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Zap, Flame, Award } from 'lucide-react';

export const ProfileCard: React.FC = () => {
    const xpPercent = 97;
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 transition-opacity group-hover:opacity-100"></div>
            <div className="flex items-center gap-6 relative z-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-3xl font-bold border-4 border-slate-900 shadow-xl">
                    N
                </div>
                <div>
                    <h2 className="text-3xl font-bold">Deep Work Elite</h2>
                    <p className="text-slate-400">Level 27 · 4,850 / 5,000 XP</p>
                </div>
            </div>
            <div className="mt-6 relative z-10">
                <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${xpPercent}%` }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};
