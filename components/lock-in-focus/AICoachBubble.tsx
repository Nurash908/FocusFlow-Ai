import React from 'react';
import { Bot } from 'lucide-react';
import { motion } from 'motion/react';

export const AICoachBubble: React.FC = () => {
    return (
        <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute top-10 right-10 bg-indigo-900/40 backdrop-blur-md border border-indigo-500/30 p-4 rounded-2xl shadow-xl flex items-center gap-3 text-white max-w-[200px]"
        >
            <Bot className="text-indigo-400" size={24} />
            <p className="text-sm">"Keep going. You're building momentum."</p>
        </motion.div>
    );
};
