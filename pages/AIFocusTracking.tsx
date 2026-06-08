import React from 'react';
import { motion } from 'motion/react';
import { Layout } from '../components/Layout';
import { PerformanceMetrics } from '../components/ai-focus/PerformanceMetrics';
import { AIInsightsCard } from '../components/ai-focus/AIInsightsCard';
import { WeeklyFocusTrend } from '../components/ai-focus/WeeklyFocusTrend';
import { FocusPersonalityCard } from '../components/ai-focus/FocusPersonalityCard';
import { ProductivityHealthScoreCard } from '../components/ai-focus/ProductivityHealthScoreCard';
import { AmbientFocusPlayer } from '../components/ai-focus/AmbientFocusPlayer';

export const AIFocusTracking: React.FC = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-8 pb-20">
                    
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Good Evening, Nurash 👋</h1>
                        <p className="text-slate-400 mt-2">Welcome back to FocusFlow AI</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Center focus score column */}
                        <div className="lg:col-span-1 space-y-8">
                             <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 flex flex-col items-center shadow-2xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent"></div>
                                <h2 className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-widest">Today's Focus Score</h2>
                                <div className="relative w-40 h-40 flex items-center justify-center">
                                    <svg className="w-full h-full rotate-[-90deg]">
                                        <circle cx="80" cy="80" r="70" className="stroke-slate-800" strokeWidth="8" fill="none" />
                                        <motion.circle 
                                            cx="80" cy="80" r="70" 
                                            className="stroke-indigo-500"
                                            strokeWidth="8" fill="none"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 0.87 }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute text-center">
                                        <span className="text-4xl font-bold">87%</span>
                                    </div>
                                </div>
                                <p className="text-lg font-bold text-indigo-400 mt-6">Excellent</p>
                            </div>
                            
                            <PerformanceMetrics />
                            <ProductivityHealthScoreCard />
                        </div>

                        {/* Right columns */}
                        <div className="lg:col-span-2 space-y-8">
                            <AIInsightsCard />
                            <AmbientFocusPlayer />
                            <WeeklyFocusTrend />
                            <FocusPersonalityCard />
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};
