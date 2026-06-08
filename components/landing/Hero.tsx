import React from 'react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => (
    <section className="min-h-screen flex flex-col justify-center items-center pt-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
        >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-400">
                FOCUSFLOW AI
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl font-light">
                Turning Screen Addiction into Productivity.
            </p>
            <div className="flex gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-all">
                    Enter Focus Mode
                </button>
            </div>
        </motion.div>
    </section>
);
