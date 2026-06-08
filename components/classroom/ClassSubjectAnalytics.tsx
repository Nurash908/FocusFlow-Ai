import React from 'react';

const subjects = [
    { name: 'Mathematics', engagement: 62 },
    { name: 'Science', engagement: 88 },
    { name: 'Literature', engagement: 74 },
    { name: 'History', engagement: 81 },
];

export const ClassSubjectAnalytics: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6">Subject Engagement</h3>
            <div className="space-y-4">
                {subjects.map((s, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-400">{s.name}</span>
                            <span className="font-bold">{s.engagement}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${s.engagement}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
