import React from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

export const ProductivityHealthScore: React.FC = () => {
    const score = 82;
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl flex flex-col items-center">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Activity className="text-indigo-400" size={20} />
                Health Score
            </h3>
            <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full rotate-[-90deg]">
                    <circle cx="80" cy="80" r="72" className="stroke-slate-800" strokeWidth="8" fill="none" />
                    <motion.circle 
                        cx="80" cy="80" r="72"
                        className="stroke-indigo-500"
                        strokeWidth="8" fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: score / 100 }}
                        transition={{ duration: 1.5 }}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute text-center">
                    <span className="text-4xl font-bold">{score}</span>
                    <span className="text-sm text-slate-400 block">/100</span>
                </div>
            </div>
            <p className="text-indigo-400 font-bold mt-4">Excellent</p>
        </div>
    );
};
