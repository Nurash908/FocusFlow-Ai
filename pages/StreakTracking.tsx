import React from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'motion/react';
import { CurrentStreakCard } from '../components/streaks/CurrentStreakCard';
import { StreakCalendar } from '../components/streaks/StreakCalendar';
import { StreakAnalytics } from '../components/streaks/StreakAnalytics';
import { AlertCircle } from 'lucide-react';

export const StreakTracking: React.FC = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-8 pb-20">
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Focus Streaks</h1>
                        <p className="text-slate-400 mt-2">Consistency is your superpower</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <CurrentStreakCard />
                            <div className="bg-orange-950/20 border border-orange-500/20 p-6 rounded-3xl flex items-center gap-4">
                                <AlertCircle className="text-orange-500" size={32} />
                                <div>
                                    <h4 className="font-bold text-orange-200">Streak at Risk!</h4>
                                    <p className="text-sm text-orange-300/80">You're 2 hours away from breaking your streak — complete a quick focus session!</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <StreakCalendar />
                        </div>
                    </div>
                    
                    <StreakAnalytics />
                </motion.div>
            </div>
        </Layout>
    );
};
