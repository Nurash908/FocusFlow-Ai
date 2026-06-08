import React from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'motion/react';
import { Leaderboard } from '../components/community/Leaderboard';
import { ChallengeCard } from '../components/community/ChallengeCard';
import { StudyGroupList } from '../components/community/StudyGroupList';

export const CommunityDashboard: React.FC = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-8 pb-20">
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">Productivity Community</h1>
                        <p className="text-slate-400 mt-2">Connect, compete, and grow together</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <ChallengeCard />
                            <StudyGroupList />
                        </div>
                        <div className="lg:col-span-1 space-y-8">
                            <Leaderboard />
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};
