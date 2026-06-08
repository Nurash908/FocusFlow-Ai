import React from 'react';
import { motion } from 'motion/react';

export const Gamification: React.FC = () => (
    <section id="impact" className="py-20 px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-purple-300">Make Productivity Rewarding</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['XP System', 'Productivity Streaks', 'Achievement Badges'].map((item) => (
                <motion.div key={item} whileHover={{ y: -10 }} className="p-8 bg-slate-900 rounded-2xl border border-purple-500/20">
                    <h3 className="text-xl font-bold text-white">{item}</h3>
                </motion.div>
            ))}
        </div>
    </section>
);
