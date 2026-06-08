import React from 'react';

const metrics = [
    { label: 'Stability', value: '94%' },
    { label: 'Distraction', value: 'Low' },
    { label: 'Quality', value: 'Excellent' },
];

export const FocusMetrics: React.FC = () => {
    return (
        <div className="flex gap-4">
            {metrics.map((m, i) => (
                <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5 flex-1 text-center">
                    <p className="text-xs text-slate-500 uppercase">{m.label}</p>
                    <p className="font-bold text-sm text-indigo-300">{m.value}</p>
                </div>
            ))}
        </div>
    );
};
