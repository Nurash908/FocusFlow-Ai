import React from 'react';
import { Sparkles, Bot } from 'lucide-react';

const insights = [
    "Your focus improves by 28% with 45-minute study cycles.",
    "You lose concentration after 2 hours of continuous study.",
    "Short breaks every 25 minutes improve retention."
];

export const AIInsightSection: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Bot className="text-indigo-400" size={20} />
                AI Insight Engine
            </h3>
            <ul className="space-y-4">
                {insights.map((insight, i) => (
                    <li key={i} className="flex gap-3 text-slate-200">
                        <Sparkles className="text-cyan-400 mt-1 shrink-0" size={16} />
                        <span className="text-sm">{insight}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
