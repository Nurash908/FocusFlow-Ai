import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Gradient } from 'recharts';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

const data = [
    { day: 'Mon', velocity: 12 },
    { day: 'Tue', velocity: 19 },
    { day: 'Wed', velocity: 15 },
    { day: 'Thu', velocity: 22 },
    { day: 'Fri', velocity: 30 },
    { day: 'Sat', velocity: 25 },
    { day: 'Sun', velocity: 18 },
];

export const WeeklyStudyVelocity: React.FC = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_20px_50px_-12px_rgba(79,70,229,0.3)]"
        >
            <h3 className="font-bold text-xl mb-6 flex items-center gap-3 text-white tracking-tight">
                <div className="p-2 bg-indigo-500/20 rounded-xl ring-1 ring-indigo-500/30">
                    <Zap className="text-indigo-400" size={20} />
                </div>
                Weekly Study Velocity
            </h3>
            
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="day" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#0f172a', 
                                borderColor: '#334155',
                                borderRadius: '1rem',
                                color: 'white'
                            }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="velocity" 
                            stroke="#6366f1" 
                            fillOpacity={1} 
                            fill="url(#colorVelocity)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};
