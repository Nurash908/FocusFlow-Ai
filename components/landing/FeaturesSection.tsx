import React from 'react';
import { motion } from 'motion/react';
import { Brain, Zap, BrainCircuit, Gamepad2, Bot, BarChart3, Target, CalendarDays, Bell, Trophy, Flame, Activity, Users, Settings, Smartphone, Lightbulb, GraduationCap } from 'lucide-react';

const FEATURE_DATA = [
    { icon: Brain, title: "AI Focus Tracking", desc: "Understand your study patterns with personalized insights." },
    { icon: Zap, title: "Lock-In Focus Mode", desc: "Immersive distraction-free environment for deep work." },
    { icon: BrainCircuit, title: "Brain Rot Meter", desc: "Fun, relatable visualization of your productivity health." },
    { icon: Gamepad2, title: "Gamified Productivity", desc: "Turn study sessions into rewarding quests with XP." },
    { icon: Bot, title: "NEX AI Assistant", desc: "Your personal AI productivity mentor." },
    { icon: BarChart3, title: "AI Analytics", desc: "Visualize your focus trends and growth patterns." },
];

export const FeaturesSection: React.FC = () => (
    <section id="features" className="py-20 px-6 bg-[#070B14]">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">FocusFlow AI Ecosystem.</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Intelligent tools designed to help students overcome distractions and build healthier digital habits.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {FEATURE_DATA.map((feature, i) => (
                <motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className="p-8 bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-3xl hover:border-indigo-500/50 transition-all group"
                >
                    <feature.icon className="w-12 h-12 text-indigo-400 mb-6 group-hover:text-indigo-300 transition-colors" />
                    <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-slate-400">{feature.desc}</p>
                </motion.div>
            ))}
        </div>
    </section>
);
