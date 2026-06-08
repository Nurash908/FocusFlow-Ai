import React from 'react';
import { Activity, Target, Flame, CheckCircle } from 'lucide-react';

const metrics = [
    { label: 'Health Score', value: '84', icon: Activity, color: 'text-indigo-400' },
    { label: 'Weekly Focus', value: '18h', icon: Target, color: 'text-cyan-400' },
    { label: 'Consistency', value: 'High', icon: Flame, color: 'text-orange-400' },
    { label: 'Tasks Done', value: '12', icon: CheckCircle, color: 'text-green-400' },
];

export const ParentSummaryCards: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m, i) => (
                <div key={i} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl flex items-center gap-4">
                    <div className={`p-4 bg-white/5 rounded-xl ${m.color}`}>
                        <m.icon size={28} />
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
