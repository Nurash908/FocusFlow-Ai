import React from 'react';
import { motion } from 'motion/react';

export const AIOrb: React.FC = () => {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute w-32 h-32 rounded-full border-2 border-cyan-500/30"
      />
      <motion.div
        animate={{ scale: [1, 0.9, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 shadow-[0_0_50px_rgba(34,211,238,0.5)] flex items-center justify-center"
      >
        <div className="w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center">
             <div className="w-8 h-8 rounded-full bg-white opacity-20 animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
};
