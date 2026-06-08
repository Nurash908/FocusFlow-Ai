import React from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

export const CentralScoreMeter: React.FC = () => {
    const score = 84;
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl flex flex-col items-center">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Activity className="text-indigo-400" size={20} />
                Productivity Health
            </h3>
            <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full rotate-[-90deg]">
                    <circle cx="96" cy="96" r="88" className="stroke-slate-800" strokeWidth="12" fill="none" />
                    <motion.circle 
                        cx="96" cy="96" r="88"
                        className="stroke-indigo-500"
                        strokeWidth="12" fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: score / 100 }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute text-center">
                    <span className="text-5xl font-bold">{score}</span>
                    <span className="text-slate-400 block">/ 100</span>
                </div>
            </div>
            <p className="text-indigo-400 font-bold mt-6 text-xl">Excellent</p>
        </div>
    );
};
