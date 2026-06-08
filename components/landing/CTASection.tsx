import React from 'react';
import { motion } from 'motion/react';

export const CTASection: React.FC = () => (
    <section className="py-20 text-center bg-gradient-to-b from-[#070B14] to-[#151C2F]">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="px-6">
            <h2 className="text-5xl font-bold mb-6">Ready to Take Back Your Focus?</h2>
            <button className="px-10 py-5 bg-indigo-600 text-white font-bold rounded-full text-lg hover:scale-105 transition-all">Start Your Journey</button>
        </motion.div>
    </section>
);
