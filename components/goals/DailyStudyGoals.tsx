import React, { useState, useEffect } from 'react';
import { Target, CheckCircle, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { getDailyGoals, addDailyGoal, toggleGoalCompletion, DailyGoal } from '../../services/goals';

export const DailyStudyGoals: React.FC = () => {
    const { user } = useAuth();
    const [goals, setGoals] = useState<DailyGoal[]>([]);
    const [newGoal, setNewGoal] = useState('');

    useEffect(() => {
        if (user) {
            const date = new Date().toISOString().split('T')[0];
            getDailyGoals(user.uid, date).then(setGoals);
        }
    }, [user]);

    const handleAddGoal = async () => {
        if (user && newGoal.trim()) {
            await addDailyGoal(user.uid, newGoal);
            setNewGoal('');
            const date = new Date().toISOString().split('T')[0];
            getDailyGoals(user.uid, date).then(setGoals);
        }
    };

    const handleToggle = async (goal: DailyGoal) => {
        if (user && goal.id) {
            await toggleGoalCompletion(user.uid, goal.id, !goal.completed);
            const date = new Date().toISOString().split('T')[0];
            getDailyGoals(user.uid, date).then(setGoals);
        }
    };

    const completedCount = goals.filter(g => g.completed).length;
    const progress = goals.length > 0 ? (completedCount / goals.length) : 0;

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ perspective: 1000 }}
            className="relative bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_20px_50px_-12px_rgba(79,70,229,0.3)] hover:border-indigo-500/30 transition-colors duration-500"
        >
            {/* Glow effect */}
            <motion.div 
                className="absolute inset-0 rounded-[2.5rem] bg-indigo-500/5 blur-3xl opacity-50"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.02, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="relative z-10 flex items-center justify-between mb-8">
                <h3 className="font-bold text-xl flex items-center gap-3 text-white tracking-tight">
                    <div className="p-2 bg-indigo-500/20 rounded-xl ring-1 ring-indigo-500/30">
                        <Target className="text-indigo-400" size={20} />
                    </div>
                    Daily Study Goals
                </h3>
                
                {/* Progress Ring */}
                <div className="relative w-16 h-16">
                    <svg className="w-full h-full -rotate-90">
                        <circle cx="32" cy="32" r="28" className="stroke-slate-800" strokeWidth="4" fill="none" />
                        <motion.circle 
                            cx="32" cy="32" r="28"
                            className="stroke-indigo-500"
                            strokeWidth="4" fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: progress }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-indigo-300">
                        {Math.round(progress * 100)}%
                    </div>
                </div>
            </div>
            
            <div className="relative z-10 space-y-4">
                <div className="flex gap-2">
                     <input 
                        type="text"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        placeholder="Add a new goal..."
                        className="flex-1 bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600 text-white"
                    />
                    <motion.button 
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleAddGoal} 
                        className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-2xl shadow-lg shadow-indigo-600/20"
                    >
                        <Plus size={20} />
                    </motion.button>
                </div>
                
                <div className="space-y-3 pt-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                    <AnimatePresence mode="popLayout">
                        {goals.map((goal) => (
                            <motion.div 
                                key={goal.id} 
                                initial={{ opacity: 0, x: -10, rotateX: -10 }}
                                animate={{ opacity: 1, x: 0, rotateX: 0 }}
                                exit={{ opacity: 0, x: 10, rotateX: 10 }}
                                whileHover={{ scale: 1.02, rotateX: 5, z: 10 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                className="flex items-center justify-between p-4 bg-slate-800/40 hover:bg-slate-700/50 rounded-2xl border border-white/5 shadow-inner hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)] transition-colors group"
                            >
                                <span className={`font-medium ${goal.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                    {goal.goal}
                                </span>
                                <button 
                                    onClick={() => handleToggle(goal)} 
                                    className={`transition-colors duration-200 ${goal.completed ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'}`}
                                >
                                    <CheckCircle size={22} className={goal.completed ? 'fill-emerald-400/20' : ''} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};
