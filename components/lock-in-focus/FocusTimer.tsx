import React, { useState } from 'react';
import { motion } from 'motion/react';

export const FocusTimer: React.FC = () => {
    const time = "45:00";
    const progress = 45; // percentage

    return (
        <div className="relative flex items-center justify-center py-12">
            <svg className="w-72 h-72 rotate-[-90deg]">
                <circle cx="144" cy="144" r="130" className="stroke-slate-800" strokeWidth="16" fill="none" />
                <motion.circle 
                    cx="144" cy="144" r="130"
                    stroke="url(#timerGradient)"
                    strokeWidth="16"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progress / 100 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <defs>
                    <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute text-center">
                <span className="text-6xl font-bold tracking-tight text-white">{time}</span>
                <p className="text-slate-400 mt-2">Deep Study Session</p>
            </div>
        </div>
    );
};
