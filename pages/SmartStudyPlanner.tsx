import React from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'motion/react';
import { CalendarView } from '../components/planner/CalendarView';
import { TaskBoard } from '../components/planner/TaskBoard';
import { AICoachCard } from '../components/planner/AICoachCard';

export const SmartStudyPlanner: React.FC = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-8 pb-20">
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Smart Study Planner</h1>
                        <p className="text-slate-400 mt-2">Intelligent academic management</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <CalendarView />
                        </div>
                        <div className="lg:col-span-1 space-y-8">
                            <AICoachCard />
                            <TaskBoard />
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};
