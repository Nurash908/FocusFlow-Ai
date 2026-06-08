import React from 'react';
import { Target } from 'lucide-react';

export const RevisionPlan: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Target className="text-cyan-400" size={20} />
                Daily Revision Plan
            </h3>
            <div className="space-y-4">
                {[
                    { topic: 'Algebra Essentials', duration: '90m', priority: 'High'},
                    { topic: 'Calculus Review', duration: '60m', priority: 'Medium'},
                ].map((p, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div>
                            <span className="font-medium block">{p.topic}</span>
                            <span className="text-xs text-slate-400">{p.duration}</span>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full ${p.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
                            {p.priority}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
