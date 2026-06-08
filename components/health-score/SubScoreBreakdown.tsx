import React from 'react';

const scores = [
    { label: 'Focus', value: 92 },
    { label: 'Time Efficiency', value: 85 },
    { label: 'Completion', value: 78 },
    { label: 'Consistency', value: 88 },
    { label: 'Distraction', value: 72 },
];

export const SubScoreBreakdown: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6">Detailed Breakdown</h3>
            <div className="space-y-4">
                {scores.map((s, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-400">{s.label}</span>
                            <span className="font-bold">{s.value}</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${s.value}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
