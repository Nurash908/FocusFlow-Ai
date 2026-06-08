import React from 'react';
import { useFocusContext } from '../../context/FocusContext';
import { motion } from 'motion/react';
import { Moon, Zap, Brain, BookOpen, Flame } from 'lucide-react';

export const EnvironmentDashboard: React.FC = () => {
    const { focusState, setFocusState } = useFocusContext();

    const themes = [
        { id: 'deep', label: 'Deep Night', icon: Moon },
        { id: 'normal', label: 'Study Mode', icon: BookOpen },
        { id: 'low-energy', label: 'High Energy', icon: Zap },
        { id: 'distracted', label: 'Focus Mode', icon: Brain },
    ];

    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6">Environment Profiles</h3>
            <div className="grid grid-cols-2 gap-4">
                {themes.map((t) => (
                    <button 
                        key={t.id}
                        onClick={() => setFocusState(t.id as any)}
                        className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 ${focusState === t.id ? 'bg-indigo-600 border-indigo-500' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                    >
                        <t.icon size={32} />
                        <span className="font-bold text-sm">{t.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
