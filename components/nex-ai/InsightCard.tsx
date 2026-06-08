import React from 'react';
import { Sparkles } from 'lucide-react';

interface Props {
  title: string;
  recommendation: string;
}

export const InsightCard: React.FC<Props> = ({ title, recommendation }) => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-50"></div>
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2 relative z-10">
                <Sparkles className="text-indigo-400" size={18} />
                {title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed relative z-10">{recommendation}</p>
        </div>
    );
};
