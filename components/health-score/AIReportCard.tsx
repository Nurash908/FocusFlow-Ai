import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

export const AIReportCard: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Bot className="text-cyan-400" size={20} />
                AI Health Insights
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed mb-4">
                Your score increased by 2 points today due to sustained focus during your evening revision sessions. Keep maintaining your 45-minute cycles!
            </p>
            <div className="flex gap-2 text-cyan-400 text-xs items-center font-bold">
                <Sparkles size={14} />
                <span>RECOMMENDED: 20-min break next</span>
            </div>
        </div>
    );
};
