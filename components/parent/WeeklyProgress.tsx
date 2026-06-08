import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.2 },
  { day: 'Wed', hours: 2.8 },
  { day: 'Thu', hours: 4.1 },
  { day: 'Fri', hours: 3.5 },
  { day: 'Sat', hours: 1.5 },
  { day: 'Sun', hours: 2.0 },
];

export const WeeklyProgress: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6">Weekly Study Activity</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <XAxis dataKey="day" stroke="#475569" fontSize={12} />
                        <YAxis stroke="#475569" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '1rem', color: '#fff' }} />
                        <Area type="monotone" dataKey="hours" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
