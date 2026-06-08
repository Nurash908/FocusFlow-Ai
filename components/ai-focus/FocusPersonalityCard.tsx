import React from 'react';
import { Flame } from 'lucide-react';

export const FocusPersonalityCard: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="p-3 bg-white/10 rounded-full">
                    <Flame className="text-orange-400" size={24} />
                </div>
                <h3 className="font-bold text-lg">Your Focus Personality</h3>
            </div>
            <p className="text-2xl font-bold mb-2 relative z-10">Deep Worker</p>
            <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                You perform best during long uninterrupted study sessions and maintain excellent consistency throughout the week.
            </p>
        </div>
    );
};
