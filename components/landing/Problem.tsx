import React from 'react';
import { motion } from 'motion/react';

export const Problem: React.FC = () => (
    <section id="problem" className="py-20 px-6 bg-[#101827]">
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center max-w-4xl mx-auto"
        >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">The Brain Rot Challenge</h2>
            <p className="text-xl text-slate-400">Students are losing focus due to excessive social media, endless scrolling, and short-form content addiction.</p>
        </motion.div>
    </section>
);
