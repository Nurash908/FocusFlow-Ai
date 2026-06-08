import React from 'react';
import { motion } from 'motion/react';
import { Award, Flame, User } from 'lucide-react';

interface LeaderboardUser {
    id: string;
    name: string;
    xp: number;
    streak: number;
    avatar: string;
}

const MOCK_USERS: LeaderboardUser[] = [
    { id: '1', name: 'Zoe Sterling', xp: 12450, streak: 15, avatar: 'Z' },
    { id: '2', name: 'Alex Rivera', xp: 11200, streak: 12, avatar: 'AR' },
    { id: '3', name: 'Kiran Patel', xp: 9800, streak: 8, avatar: 'K' },
    { id: '4', name: 'Jamie Doe', xp: 8500, streak: 5, avatar: 'J' },
    { id: '5', name: 'Sarah Lee', xp: 7200, streak: 3, avatar: 'S' },
];

export const Leaderboard: React.FC = () => {
    return (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                <Award className="text-yellow-500" size={24} />
                Global Leaderboard
            </h2>
            <div className="space-y-4">
                {MOCK_USERS.map((user, index) => (
                    <motion.div 
                        key={user.id} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50"
                    >
                        <div className="flex items-center gap-4">
                            <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${index < 3 ? 'text-yellow-400 bg-yellow-500/10' : 'text-slate-400'}`}>
                                {index + 1}
                            </span>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">{user.avatar}</div>
                            <span className="font-bold text-white">{user.name}</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="flex items-center gap-1 text-indigo-400 text-sm font-bold">
                                <Award size={14} /> {user.xp.toLocaleString()} XP
                            </span>
                            <span className="flex items-center gap-1 text-orange-400 text-sm font-bold">
                                <Flame size={14} /> {user.streak}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
