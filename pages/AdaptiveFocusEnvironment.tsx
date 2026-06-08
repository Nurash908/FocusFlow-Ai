import React from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'motion/react';
import { useFocusContext } from '../context/FocusContext';
import { EnvironmentDashboard } from '../components/focus-env/EnvironmentDashboard';
import { AmbientSoundControls } from '../components/focus-env/AmbientSoundControls';

export const AdaptiveFocusEnvironment: React.FC = () => {
    const { focusState, soundscape } = useFocusContext();

    const getBackgroundClass = () => {
        switch(focusState) {
            case 'deep': return 'bg-slate-900';
            case 'distracted': return 'bg-orange-900/20';
            case 'low-energy': return 'bg-purple-900/20';
            default: return 'bg-slate-950';
        }
    };

    return (
        <Layout>
            <div className={`min-h-screen ${getBackgroundClass()} text-white p-6 md:p-12 transition-colors duration-1000`}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-8 pb-20">
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">Adaptive Focus Environment</h1>
                        <p className="text-slate-400 mt-2">Personalized AI-powered study atmosphere</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <EnvironmentDashboard />
                        <AmbientSoundControls />
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};
