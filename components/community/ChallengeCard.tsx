import React from 'react';
import { Zap, Users } from 'lucide-react';

export const ChallengeCard: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Zap className="text-yellow-400" size={20} />
                Weekly Focus Challenge
            </h3>
            <p className="text-slate-200 text-sm mb-4">
                Complete a 7-day streak to unlock the "Focus Master" badge.
            </p>
            <div className="flex justify-between items-center mt-6">
                <div className="flex items-center gap-2 text-sm text-cyan-400">
                    <Users size={16} /> 1,240 Participants
                </div>
                <button className="bg-white text-slate-900 font-bold px-4 py-2 rounded-xl text-sm">Join</button>
            </div>
        </div>
    );
};
