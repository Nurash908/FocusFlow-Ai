import React from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'motion/react';
import { CentralScoreMeter } from '../components/health-score/CentralScoreMeter';
import { SubScoreBreakdown } from '../components/health-score/SubScoreBreakdown';
import { ScoreTrendChart } from '../components/health-score/ScoreTrendChart';
import { AIReportCard } from '../components/health-score/AIReportCard';

export const HealthScoreSystem: React.FC = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-8 pb-20">
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Productivity Health</h1>
                        <p className="text-slate-400 mt-2">Personal productivity vitals monitor</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <CentralScoreMeter />
                        <div className="lg:col-span-2 space-y-8">
                            <SubScoreBreakdown />
                            <ScoreTrendChart />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AIReportCard />
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};
