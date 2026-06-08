import React from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'motion/react';
import { CountdownCard } from '../components/exam/CountdownCard';
import { RevisionPlan } from '../components/exam/RevisionPlan';
import { ReadinessScore } from '../components/exam/ReadinessScore';
import { ExamCoach } from '../components/exam/ExamCoach';
import { SubjectPriority } from '../components/exam/SubjectPriority';

export const ExamPrepMode: React.FC = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-8 pb-20">
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">Exam Prep Mode</h1>
                        <p className="text-slate-400 mt-2">Intensive revision and readiness optimization</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <CountdownCard />
                            <RevisionPlan />
                        </div>
                        <div className="lg:col-span-1 space-y-8">
                            <ReadinessScore />
                            <SubjectPriority />
                            <ExamCoach />
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};
