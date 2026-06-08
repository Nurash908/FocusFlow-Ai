import React from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'motion/react';
import { BadgeCard } from '../components/rewards/BadgeCard';
import { LevelProgression } from '../components/rewards/LevelProgression';
import { MilestoneTracker } from '../components/rewards/MilestoneTracker';
import { BrainCircuit, Flame, Zap, Award } from 'lucide-react';

export const AchievementRewards: React.FC = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-8 pb-20">
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Achievement & Rewards</h1>
                        <p className="text-slate-400 mt-2">Earn rewards and level up your productivity</p>
                    </header>

                    <LevelProgression />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <BadgeCard title="Focus Novice" description="Complete 5 focus sessions" icon={<BrainCircuit size={32} />} />
                                <BadgeCard title="Streak Builder" description="Maintain a 7-day streak" icon={<Flame size={32} />} />
                                <BadgeCard title="Deep Work Champion" description="2 hours uninterrupted" icon={<Zap size={32} />} />
                                <BadgeCard title="Productivity Master" description="Reach Level 30" icon={<Award size={32} />} locked />
                            </div>
                        </div>
                        <div className="lg:col-span-1 space-y-8">
                            <MilestoneTracker />
                            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8">
                                <h3 className="font-bold text-lg mb-4">Rewards Vault</h3>
                                <p className="text-slate-400 text-sm mb-6">Redeem your coins for exclusive themes and boosts.</p>
                                <button className="w-full py-3 rounded-2xl bg-indigo-600 font-bold hover:bg-indigo-700 transition-colors">
                                    Browse Rewards
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};
