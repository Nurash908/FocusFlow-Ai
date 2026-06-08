import React from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'motion/react';
import { ClassroomKPIs } from '../components/classroom/ClassroomKPIs';
import { EngagementHeatmap } from '../components/classroom/EngagementHeatmap';
import { ClassSubjectAnalytics } from '../components/classroom/ClassSubjectAnalytics';
import { ClassroomAIInsights } from '../components/classroom/ClassroomAIInsights';

export const ClassroomAnalytics: React.FC = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-8 pb-20">
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Classroom Analytics</h1>
                        <p className="text-slate-400 mt-2">Classroom-wide intelligence and engagement monitoring</p>
                    </header>

                    <ClassroomKPIs />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <EngagementHeatmap />
                        </div>
                        <div className="lg:col-span-1 space-y-8">
                            <ClassSubjectAnalytics />
                            <ClassroomAIInsights />
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};
