import React from 'react';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';

export const ReadinessScore: React.FC = () => {
    const score = 72;
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl flex flex-col items-center">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Award className="text-yellow-400" size={20} />
                Exam Readiness
            </h3>
            <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full rotate-[-90deg]">
                    <circle cx="64" cy="64" r="56" className="stroke-slate-800" strokeWidth="8" fill="none" />
                    <motion.circle 
                        cx="64" cy="64" r="56"
                        className="stroke-yellow-500"
                        strokeWidth="8" fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: score / 100 }}
                        transition={{ duration: 2 }}
                        strokeLinecap="round"
                    />
                </svg>
                <span className="absolute text-2xl font-bold">{score}%</span>
            </div>
            <p className="text-yellow-400 font-bold mt-4">Partially Ready</p>
        </div>
    );
};
