import React from 'react';
import { Flame, Star } from 'lucide-react';

export const StreakDisplay: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl flex items-center justify-between">
            <div className='flex items-center gap-4'>
                <Flame className="text-orange-500" size={40} />
                <div>
                    <p className="text-3xl font-bold">14 Day Streak</p>
                    <p className="text-slate-400">Keep it up, Nurash!</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm text-slate-400">Streak Freeze</p>
                <p className="font-bold text-cyan-400">2 Available</p>
            </div>
        </div>
    );
};
