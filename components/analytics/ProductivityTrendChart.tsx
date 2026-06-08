import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { day: 'Mon', focus: 65, distraction: 20 },
    { day: 'Tue', focus: 75, distraction: 15 },
    { day: 'Wed', focus: 85, distraction: 10 },
    { day: 'Thu', focus: 70, distraction: 25 },
    { day: 'Fri', focus: 90, distraction: 8 },
    { day: 'Sat', focus: 60, distraction: 30 },
    { day: 'Sun', focus: 80, distraction: 12 },
];

export const ProductivityTrendChart: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6">Productivity Trend</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="day" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '1rem', color: '#fff' }} />
                        <Area type="monotone" dataKey="focus" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                        <Area type="monotone" dataKey="distraction" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
