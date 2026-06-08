import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useFocusContext } from '../../context/FocusContext';
import { Volume2, CloudRain, Wind, Coffee, Sparkles, VolumeX, Radio } from 'lucide-react';

export const AdaptiveSoundscape: React.FC = () => {
    const { soundscape, setSoundscape, focusState } = useFocusContext();

    // Auto-adjust soundscape based on focus state
    useEffect(() => {
        if (focusState === 'deep' && soundscape === 'none') {
            setSoundscape('deep-space');
        }
    }, [focusState, soundscape, setSoundscape]);

    const sounds = [
        { id: 'none', label: 'Silent', icon: VolumeX },
        { id: 'rain', label: 'Rain', icon: CloudRain },
        { id: 'white-noise', label: 'White Noise', icon: Wind },
        { id: 'cafe', label: 'Café', icon: Coffee },
        { id: 'deep-space', label: 'Deep Space', icon: Sparkles },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ perspective: 1000 }}
            className="relative bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_20px_50px_-12px_rgba(79,70,229,0.3)] hover:border-indigo-500/30 transition-all duration-500 overflow-hidden"
        >
            <div className="absolute inset-0 bg-indigo-500/5 blur-3xl opacity-50" />
            
            <h3 className="relative z-10 font-bold text-xl mb-6 flex items-center gap-3 text-white tracking-tight">
                <div className="p-2 bg-indigo-500/20 rounded-xl ring-1 ring-indigo-500/30">
                    <Radio className="text-indigo-400" size={20} />
                </div>
                Adaptive Soundscape
            </h3>
            
            <div className="relative z-10 grid grid-cols-2 gap-3">
                {sounds.map((s) => (
                    <motion.button 
                        key={s.id}
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSoundscape(s.id as any)}
                        className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${soundscape === s.id ? 'bg-indigo-500/20 border-indigo-500/50 shadow-inner' : 'bg-slate-950/50 border-white/5 hover:bg-slate-800/50'}`}
                    >
                        <s.icon size={28} className={soundscape === s.id ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'} />
                        <span className="mt-2 text-xs font-semibold text-slate-300 tracking-wider">
                            {s.label}
                        </span>
                        {soundscape === s.id && (
                            <motion.div 
                                layoutId="active-indicator"
                                className="absolute inset-0 rounded-2xl border border-indigo-500/50"
                            />
                        )}
                    </motion.button>
                ))}
            </div>
            
            <div className="absolute bottom-4 right-4 z-0 opacity-20">
                <Volume2 size={120} className="text-indigo-500" />
            </div>
        </motion.div>
    );
};
