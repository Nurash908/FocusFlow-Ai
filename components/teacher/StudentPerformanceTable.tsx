import React from 'react';
import { AlertCircle, User } from 'lucide-react';

const students = [
    { name: 'Nurash Amin', score: 92, risk: 'Low', status: 'Excellent' },
    { name: 'Sarah Jones', score: 78, risk: 'Low', status: 'Stable' },
    { name: 'Michael Brown', score: 55, risk: 'Moderate', status: 'Needs Improvement' },
    { name: 'Alex Smith', score: 38, risk: 'High', status: 'Critical' },
];

export const StudentPerformanceTable: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6">Classroom Performance</h3>
            <div className="space-y-4">
                {students.map((s, i) => (
                    <div key={i} className="grid grid-cols-4 items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                                <User size={16} />
                            </div>
                            <span className="font-medium">{s.name}</span>
                        </div>
                        <span className="text-center font-bold">{s.score}/100</span>
                        <span className={`text-center text-xs px-3 py-1 rounded-full ${s.risk === 'High' ? 'bg-red-500/20 text-red-400' : s.risk === 'Moderate' ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'}`}>
                            {s.risk} Risk
                        </span>
                        <span className="text-right text-sm text-slate-400">{s.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
