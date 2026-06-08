import React from 'react';

interface Metric {
    label: string;
    value: string;
}

const metrics: Metric[] = [
    { label: 'Focus Time', value: '4h 12m' },
    { label: 'Study Sessions', value: '6' },
    { label: 'Distractions', value: '3' },
    { label: 'Tasks Completed', value: '12' },
];

export const PerformanceMetrics: React.FC = () => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {metrics.map((item, i) => (
                <div key={i} className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 text-center hover:border-indigo-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                    <p className="text-slate-400 text-xs mb-1 uppercase tracking-wider">{item.label}</p>
                    <p className="text-xl font-bold text-white">{item.value}</p>
                </div>
            ))}
        </div>
    );
};
