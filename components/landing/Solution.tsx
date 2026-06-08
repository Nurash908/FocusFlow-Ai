import React from 'react';
import { motion } from 'motion/react';

export const Solution: React.FC = () => (
    <section id="intelligence" className="py-20 px-6">
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="glass-panel p-12 rounded-3xl border border-white/10"
        >
            <h2 className="text-4xl font-bold mb-6 text-indigo-300">Meet FocusFlow AI</h2>
            <p className="text-lg text-slate-300">We turn productivity into an engaging experience with AI coaching, focus tracking, and gamified study sessions.</p>
        </motion.div>
    </section>
);
