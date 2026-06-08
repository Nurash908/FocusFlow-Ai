import React from 'react';
import { Users, Target, Activity, BrainCircuit } from 'lucide-react';

const metrics = [
    { label: 'Avg Productivity', value: '82%', icon: Activity, color: 'text-indigo-400' },
    { label: 'Avg Focus', value: '45m', icon: Target, color: 'text-cyan-400' },
    { label: 'Students', value: '28', icon: Users, color: 'text-purple-400' },
    { label: 'Avg Distraction', value: '18%', icon: BrainCircuit, color: 'text-orange-400' },
];

export const ClassMetrics: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m, i) => (
                <div key={i} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl flex items-center gap-4">
                    <div className={`p-3 bg-white/5 rounded-xl ${m.color}`}>
                        <m.icon size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">{m.label}</p>
                        <p className="text-2xl font-bold">{m.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
