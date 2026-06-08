import React from 'react';
import { Trophy, Coins } from 'lucide-react';

export const RewardsOverview: React.FC = () => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 text-center flex flex-col items-center">
                <Trophy className="text-yellow-500 mb-2" size={24} />
                <p className="text-2xl font-bold">4,850</p>
                <p className="text-slate-400 text-sm">Total XP</p>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 text-center flex flex-col items-center">
                <Coins className="text-indigo-400 mb-2" size={24} />
                <p className="text-2xl font-bold">1,200</p>
                <p className="text-slate-400 text-sm">Focus Coins</p>
            </div>
        </div>
    );
};
