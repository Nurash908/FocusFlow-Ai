import React from 'react';

const subjects = [
    { name: 'Mathematics', status: 'Improving', score: 85 },
    { name: 'Science', status: 'Steady', score: 92 },
    { name: 'Literature', status: 'Needs Focus', score: 70 },
];

export const SubjectPerformance: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6">Subject Performance</h3>
            <div className="space-y-4">
                {subjects.map((s, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                        <span className="font-medium">{s.name}</span>
                        <div className='text-right'>
                            <span className="font-bold block">{s.score}/100</span>
                            <span className="text-xs text-slate-400">{s.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
