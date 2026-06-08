import React from 'react';
import { Headphones, CloudRain, Star, BookOpen, Waves, Flame } from 'lucide-react';

const environments = [
    { name: 'Ambient', icon: <Headphones size={20} /> },
    { name: 'Rain', icon: <CloudRain size={20} /> },
    { name: 'Space', icon: <Star size={20} /> },
    { name: 'Library', icon: <BookOpen size={20} /> },
    { name: 'Ocean', icon: <Waves size={20} /> },
    { name: 'Work', icon: <Flame size={20} /> },
];

export const EnvironmentOptions: React.FC = () => {
    return (
        <div className="bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-xl">
            <h4 className="text-slate-400 text-xs uppercase mb-4 tracking-widest">Focus Environment</h4>
            <div className="grid grid-cols-3 gap-2">
                {environments.map(e => (
                    <button key={e.name} className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-indigo-500/20 transition-colors">
                        {e.icon}
                        <span className="text-[10px]">{e.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
