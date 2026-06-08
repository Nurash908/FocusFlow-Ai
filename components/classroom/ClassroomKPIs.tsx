import React from 'react';
import { Users, Target, Activity, BrainCircuit, BarChart } from 'lucide-react';

const metrics = [
    { label: 'Avg Health Score', value: '84', icon: Activity, color: 'text-indigo-400' },
    { label: 'Class Engagement', value: '76%', icon: Users, color: 'text-cyan-400' },
    { label: 'Focus Time', value: '52m', icon: Target, color: 'text-purple-400' },
    { label: 'Distraction Rate', value: '14%', icon: BrainCircuit, color: 'text-orange-400' },
];

export const ClassroomKPIs: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m, i) => (
                <div key={i} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl flex items-center gap-4">
                    <div className={`p-4 bg-white/5 rounded-xl ${m.color}`}>
                        <m.icon size={28} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">{m.label}</p>
                        <p className="text-3xl font-bold">{m.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
