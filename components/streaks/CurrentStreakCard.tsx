import React from 'react';
import { Flame, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const CurrentStreakCard: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent"></div>
            <div className="relative z-10 flex justify-between items-center">
                <div>
                    <h3 className="text-slate-400 uppercase tracking-widest text-xs font-bold">Current Streak</h3>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-6xl font-bold text-white">14</span>
                        <span className="text-2xl text-orange-500 font-bold">Days</span>
                    </div>
                </div>
                <div className="bg-orange-500/20 p-4 rounded-full">
                    <Flame className="text-orange-500" size={40} />
                </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                    <Lock className="text-cyan-400" size={20} />
                    <span className="text-sm font-medium">Streak Protection</span>
                </div>
                <span className="text-sm font-bold text-cyan-400">2 Active</span>
            </div>
        </div>
    );
};
