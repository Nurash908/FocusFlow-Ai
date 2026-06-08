import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, X, Sparkles, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { addDailyGoal } from '../../services/goals';

interface DailyIntentionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DailyIntentionModal: React.FC<DailyIntentionModalProps> = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const [intentions, setIntentions] = useState(['', '', '']);
    const [submitting, setSubmitting] = useState(false);

    const handleSave = async () => {
        if (!user) return;
        setSubmitting(true);
        for (const goal of intentions) {
            if (goal.trim()) {
                await addDailyGoal(user.uid, goal);
            }
        }
        setSubmitting(false);
        onClose();
        // Set a flag in localStorage to not show again today
        localStorage.setItem(`intentionShown_${new Date().toISOString().split('T')[0]}`, 'true');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl"
                    >
                        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white">
                            <X size={24} />
                        </button>
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-indigo-500/20 rounded-2xl">
                                <Target className="text-indigo-400" size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Daily Academic Intentions</h2>
                        </div>
                        
                        <p className="text-slate-400 mb-8">What are your three primary study goals for today? Setting these now will help you lock in your focus.</p>
                        
                        <div className="space-y-4">
                            {intentions.map((intention, i) => (
                                <div key={i} className="flex gap-3 items-center">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 font-bold">
                                        {i + 1}
                                    </div>
                                    <input 
                                        type="text"
                                        value={intention}
                                        onChange={(e) => {
                                            const newIntentions = [...intentions];
                                            newIntentions[i] = e.target.value;
                                            setIntentions(newIntentions);
                                        }}
                                        placeholder={`Academic goal ${i + 1}...`}
                                        className="flex-1 bg-slate-950 border border-white/5 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-600"
                                    />
                                </div>
                            ))}
                        </div>
                        
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSave}
                            disabled={submitting || intentions.every(i => !i.trim())}
                            className="mt-8 w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-500 transition-colors disabled:opacity-50"
                        >
                            <Sparkles size={20} />
                            {submitting ? 'Setting Intentions...' : 'Lock in Goals'}
                        </motion.button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
