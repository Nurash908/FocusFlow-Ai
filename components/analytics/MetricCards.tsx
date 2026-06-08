import React from 'react';
import { Clock, Target, Flame, BrainCircuit } from 'lucide-react';

const metrics = [
    { label: 'Total Focus', value: '42.5h', icon: Clock, color: 'text-blue-400' },
    { label: 'Avg Session', value: '48m', icon: Target, color: 'text-indigo-400' },
    { label: 'Peak Hour', value: '7-9 PM', icon: Flame, color: 'text-orange-400' },
    { label: 'Distraction', value: '12%', icon: BrainCircuit, color: 'text-purple-400' },
];

export const MetricCards: React.FC = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
                <div key={i} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center">
                    <m.icon className={`${m.color} mb-2`} size={24} />
                    <p className="text-sm text-slate-400 uppercase tracking-wider">{m.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{m.value}</p>
                </div>
            ))}
        </div>
    );
};
