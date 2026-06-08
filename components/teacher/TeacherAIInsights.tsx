import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

export const TeacherAIInsights: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Bot className="text-cyan-400" size={20} />
                Classroom AI Insights
            </h3>
            <ul className="space-y-4">
                <li className="flex gap-3 text-slate-200">
                    <Sparkles className="text-cyan-400 mt-1 shrink-0" size={16} />
                    <span className="text-sm">Monday class productivity is 18% lower than average. Consider a review session.</span>
                </li>
                <li className="flex gap-3 text-slate-200">
                    <Sparkles className="text-cyan-400 mt-1 shrink-0" size={16} />
                    <span className="text-sm">3 students (Alex Smith, etc.) show signs of declining performance risk.</span>
                </li>
            </ul>
        </div>
    );
};
