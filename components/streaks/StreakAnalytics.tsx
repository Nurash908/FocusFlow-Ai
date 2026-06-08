import React from 'react';
import { TrendingUp, BarChart } from 'lucide-react';

export const StreakAnalytics: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <BarChart className="text-purple-400" size={20} />
                Streak Impact
            </h3>
            <div className="space-y-6">
                <div>
                     <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Focus Stability</span>
                        <span className="text-white font-bold">+42%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: '85%' }}></div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-purple-900/40 to-slate-900/40 p-4 rounded-2xl border border-white/5">
                    <p className="text-sm italic text-slate-300">
                        "Your consistency shows that users with 7+ day streaks show 42% higher focus stability!"
                    </p>
                </div>
            </div>
        </div>
    );
};
