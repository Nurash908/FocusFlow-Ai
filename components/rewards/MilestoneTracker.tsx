import React from 'react';
import { Target, Trophy } from 'lucide-react';

export const MilestoneTracker: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Trophy className="text-yellow-400" size={20} />
                Upcoming Milestones
            </h3>
            <div className="space-y-4">
                {[
                    { title: 'Focus Champion', progress: 85 },
                    { title: 'Goal Crusher', progress: 40 },
                ].map((m, i) => (
                    <div key={i} className="flex items-center justify-between gap-4">
                        <span className="text-sm font-medium w-32">{m.title}</span>
                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${m.progress}%` }} />
                        </div>
                        <span className="text-xs text-slate-400 w-12 text-right">{m.progress}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
