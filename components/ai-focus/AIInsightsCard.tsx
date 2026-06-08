import React from 'react';
import { Sparkles } from 'lucide-react';

export const AIInsightsCard: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-50"></div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 relative z-10">
                <Sparkles className="text-indigo-400" size={20} />
                AI Insight
            </h3>
            <p className="text-slate-400 leading-relaxed relative z-10">
                You were most productive between <strong className="text-white font-medium">7:00 PM and 8:30 PM</strong>. 
                Consider scheduling difficult tasks during this period to maximize productivity.
            </p>
        </div>
    );
};
