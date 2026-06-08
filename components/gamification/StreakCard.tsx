import React from 'react';
import { Flame } from 'lucide-react';

export const StreakCard: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl flex flex-col items-center text-center">
            <Flame className="text-orange-500 mb-4" size={40} />
            <p className="text-4xl font-bold text-white mb-1">14 Days</p>
            <p className="text-slate-400">Current Streak</p>
        </div>
    );
};
