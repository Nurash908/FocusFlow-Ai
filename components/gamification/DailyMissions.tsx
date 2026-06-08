import React from 'react';
import { CheckCircle2, Target, Zap } from 'lucide-react';

const missions = [
    { label: 'Study for 60 Minutes', progress: 40, total: 60, xp: 50 },
    { label: 'Complete 3 Tasks', progress: 2, total: 3, xp: 75 },
    { label: 'Earn 100 XP', progress: 65, total: 100, xp: 100 },
];

export const DailyMissions: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Target className="text-cyan-400" size={20} />
                Daily Missions
            </h3>
            <div className="space-y-4">
                {missions.map((m, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-2xl flex items-center justify-between border border-white/5">
                        <div className="flex items-center gap-4">
                            <CheckCircle2 className="text-indigo-400" size={20} />
                            <span className="font-medium">{m.label}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-400">{m.progress}/{m.total}</span>
                            <span className="text-sm font-bold text-cyan-400">+{m.xp} XP</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
