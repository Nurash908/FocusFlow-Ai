import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
    { name: 'Active', value: 75, color: '#6366f1' },
    { name: 'Passive', value: 25, color: '#334155' },
];

export const EngagementHeatmap: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6">Engagement Distribution</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                            {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-indigo-500 rounded-full" /> <span className="text-sm">Active</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-700 rounded-full" /> <span className="text-sm">Passive</span></div>
            </div>
        </div>
    );
};
