import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

export const ExamCoach: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-red-900/60 to-orange-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Bot className="text-cyan-400" size={20} />
                AI Exam Coach
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed mb-4">
                "Mathematics is your highest priority. Focus on Algebra topics this session to boost your overall readiness by 5%."
            </p>
            <div className="flex gap-2 text-cyan-400 text-xs items-center font-bold">
                <Sparkles size={14} />
                <span>ADVICE: Use Active Recall method.</span>
            </div>
        </div>
    );
};
