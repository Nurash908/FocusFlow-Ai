import React from 'react';
import { Bot } from 'lucide-react';

export const AICoachCard: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Bot className="text-cyan-400" size={20} />
                NEX Planning Assistant
            </h3>
            <p className="text-sm text-slate-200">
                "You have a heavy workload today. I suggest moving your Math revision to 6 PM when your focus levels are typically highest."
            </p>
        </div>
    );
};
