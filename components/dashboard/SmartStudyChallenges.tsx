import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, CheckCircle2, Circle } from 'lucide-react';

interface Challenge {
    id: string;
    title: string;
    xp: number;
    completed: boolean;
}

const INITIAL_CHALLENGES: Challenge[] = [
    { id: '1', title: 'Complete 3 focus sessions', xp: 500, completed: false },
    { id: '2', title: 'Stay focused for 2 hours', xp: 750, completed: false },
    { id: '3', title: 'Reduce distractions by 20%', xp: 300, completed: false },
];

export const SmartStudyChallenges: React.FC = () => {
    const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);

    const toggleChallenge = (id: string) => {
        setChallenges(prev => prev.map(c => c.id === id ? { ...c, completed: !c.completed } : c));
    };

    return (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                <Target className="text-indigo-400" size={24} />
                Smart Study Challenges
            </h2>
            <div className="space-y-4">
                {challenges.map((challenge, index) => (
                    <motion.div 
                        key={challenge.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-colors ${challenge.completed ? 'bg-indigo-900/20 border-indigo-500/30' : 'bg-slate-800/40 border-slate-700/50'}`}
                        onClick={() => toggleChallenge(challenge.id)}
                    >
                        <div className="flex items-center gap-4 cursor-pointer">
                            {challenge.completed ? 
                                <CheckCircle2 className="text-indigo-400" size={24} /> : 
                                <Circle className="text-slate-500" size={24} />
                            }
                            <div>
                                <p className={`font-bold ${challenge.completed ? 'text-indigo-200' : 'text-white'}`}>{challenge.title}</p>
                                <p className="text-xs text-indigo-400 font-bold">+{challenge.xp} XP</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
