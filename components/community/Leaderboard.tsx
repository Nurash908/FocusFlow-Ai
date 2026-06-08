import React from 'react';
import { Trophy, Users, Zap } from 'lucide-react';

const topStudents = [
  { rank: 1, name: 'Nurash', score: '98 pts' },
  { rank: 2, name: 'Alex', score: '95 pts' },
  { rank: 3, name: 'Sam', score: '92 pts' },
];

export const Leaderboard: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Trophy className="text-yellow-400" size={20} />
                Global Leaderboard
            </h3>
            <div className="space-y-4">
                {topStudents.map((s) => (
                    <div key={s.rank} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-slate-400 w-6">#{s.rank}</span>
                            <span className="font-medium">{s.name}</span>
                        </div>
                        <span className="font-bold text-cyan-400">{s.score}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
