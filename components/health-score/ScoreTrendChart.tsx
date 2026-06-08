import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { day: 'Mon', score: 75 },
  { day: 'Tue', score: 78 },
  { day: 'Wed', score: 82 },
  { day: 'Thu', score: 80 },
  { day: 'Fri', score: 85 },
  { day: 'Sat', score: 83 },
  { day: 'Sun', score: 84 },
];

export const ScoreTrendChart: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6">Health Score Trends</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <XAxis dataKey="day" stroke="#475569" fontSize={12} />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '1rem', color: '#fff' }} />
                        <Area type="monotone" dataKey="score" stroke="#c084fc" fill="#c084fc" fillOpacity={0.1} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
