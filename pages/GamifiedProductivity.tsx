import React from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'motion/react';
import { ProfileCard } from '../components/gamification/ProfileCard';
import { DailyMissions } from '../components/gamification/DailyMissions';
import { StreakCard } from '../components/gamification/StreakCard';
import { AchievementGallery } from '../components/gamification/AchievementGallery';

export const GamifiedProductivity: React.FC = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-8 pb-20">
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Gamified Productivity</h1>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <ProfileCard />
                            <DailyMissions />
                        </div>
                        <div className="lg:col-span-1 space-y-8">
                            <StreakCard />
                            <AchievementGallery />
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};
