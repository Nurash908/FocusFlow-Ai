import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const BrainRotMeter: React.FC = () => {
    // Simulated distraction level
    const [score, setScore] = useState(45);

    useEffect(() => {
        const interval = setInterval(() => {
            setScore(prev => Math.min(100, Math.max(0, prev + (Math.random() * 10 - 5))));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const getColor = (s: number) => {
        if (s < 30) return 'bg-green-500';
        if (s < 70) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="p-8 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col items-center">
            <h3 className="text-xl font-bold mb-6 text-white text-center">Brain Rot Meter</h3>
            <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full rotate-[-90deg]">
                    <circle cx="96" cy="96" r="88" className="stroke-slate-700" strokeWidth="12" fill="none" />
                    <motion.circle 
                        cx="96" cy="96" r="88" 
                        className={`stroke-${getColor(score).split('-')[1]}-500`}
                        strokeWidth="12" fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: score / 100 }}
                    />
                </svg>
                <div className="absolute text-4xl font-bold">{Math.floor(score)}</div>
            </div>
            <p className="mt-4 text-sm text-slate-400">Current Distraction Level</p>
        </div>
    );
};
