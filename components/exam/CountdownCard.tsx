import React from 'react';
import { Clock } from 'lucide-react';

export const CountdownCard: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-red-500/20 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"></div>
            <div className="relative z-10">
                <h3 className="text-red-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2 mb-4">
                    <Clock size={20} />
                    Next Exam: Mathematics
                </h3>
                <div className="text-6xl font-bold font-mono">3d 14h 22m</div>
                <p className="text-slate-400 mt-2">To go until the exam starts.</p>
            </div>
        </div>
    );
};
