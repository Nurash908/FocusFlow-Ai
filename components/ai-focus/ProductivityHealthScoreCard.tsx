import React from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

export const ProductivityHealthScoreCard: React.FC = () => {
    const score = 92;
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 flex flex-col items-center shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="text-indigo-400" size={20} />
                Productivity Health
            </h2>
            <div className="relative flex items-center justify-center">
                <svg className="w-32 h-32 rotate-[-90deg]">
                    <circle cx="64" cy="64" r={radius} className="stroke-slate-800" strokeWidth="8" fill="none" />
                    <motion.circle 
                        cx="64" cy="64" r={radius}
                        className="stroke-indigo-400"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                        animate={{ strokeDasharray: circumference, strokeDashoffset: strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>
                <div className="absolute text-center">
                    <span className="text-3xl font-bold">{score}</span>
                    <span className="text-xs text-slate-400 block">/100</span>
                </div>
            </div>
        </div>
    );
};
