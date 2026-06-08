import React from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'motion/react';
import { FocusTimer } from '../components/lock-in-focus/FocusTimer';
import { SessionInfo } from '../components/lock-in-focus/SessionInfo';
import { AICoachBubble } from '../components/lock-in-focus/AICoachBubble';
import { FocusMetrics } from '../components/lock-in-focus/FocusMetrics';
import { EnvironmentOptions } from '../components/lock-in-focus/EnvironmentOptions';
import { DistractionShield } from '../components/lock-in-focus/DistractionShield';
import { ActionButton } from '../components/lock-in-focus/ActionButton';

export const LockInFocusMode: React.FC = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-950 text-white p-6 relative overflow-hidden">
                {/* Background Atmosphere */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>
                <div className="absolute inset-0 bg-slate-950/[0.97]"></div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 max-w-lg mx-auto space-y-8">
                    
                    <AICoachBubble />
                    <FocusTimer />
                    <SessionInfo />
                    <FocusMetrics />
                    <DistractionShield />
                    <EnvironmentOptions />
                    
                    <div className="pt-4">
                        <ActionButton />
                    </div>
                    
                </motion.div>
            </div>
        </Layout>
    );
};
