import React from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'motion/react';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import { StreakDisplay } from '../components/challenges/StreakDisplay';
import { RewardsOverview } from '../components/challenges/RewardsOverview';
import { Target } from 'lucide-react';

export const SmartStudyChallenges: React.FC = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-8 pb-20">
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Smart Study Challenges</h1>
                        <p className="text-slate-400 mt-2">Level up your productivity</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <StreakDisplay />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ChallengeCard title="Focus Master" progress={2} total={3} xp={50} />
                                <ChallengeCard title="Consistency King" progress={40} total={90} xp={100} />
                                <ChallengeCard title="No Distraction Zone" progress={2} total={2} xp={150} />
                            </div>
                        </div>
                        <div className="lg:col-span-1 space-y-8">
                            <RewardsOverview />
                            <div className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Target className="text-cyan-400" size={20}/>
                                    AI Challenge Coach
                                </h3>
                                <p className="text-slate-200">
                                    "You are 80% closer to completing your daily goal! A quick 20-minute session will unlock the 'Productivity Achiever' rank."
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};
