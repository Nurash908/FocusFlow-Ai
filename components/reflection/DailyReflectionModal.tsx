import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, BookOpen } from 'lucide-react';

interface DailyReflectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    focusData: any[]; // Assuming list of session events
}

export const DailyReflectionModal: React.FC<DailyReflectionModalProps> = ({ isOpen, onClose, focusData }) => {
    const [summary, setSummary] = useState<string>('');
    const [journal, setJournal] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const generateAI = async () => {
        setLoading(true);
        const res = await fetch('/api/reflection/summary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ focusData })
        });
        const data = await res.json();
        setSummary(data.summary || 'Could not generate summary.');
        setLoading(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 w-full max-w-2xl shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <BookOpen className="text-indigo-400" /> Daily Reflection
                        </h2>
                        
                        {!summary && <button onClick={generateAI} disabled={loading} className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded-xl">
                            {loading ? 'Generating...' : 'Get AI Summary'}
                        </button>}
                        
                        {summary && <div className="bg-slate-950 p-4 rounded-xl mb-4 text-slate-300 italic">{summary}</div>}
                        
                        <textarea 
                            value={journal} 
                            onChange={(e) => setJournal(e.target.value)}
                            className="w-full h-32 bg-slate-950 border border-white/5 rounded-xl p-4 text-white focus:ring-1 focus:ring-indigo-500"
                            placeholder="Journal your thoughts..."
                        />
                        
                        <button onClick={onClose} className="mt-6 w-full bg-indigo-600 py-3 rounded-xl font-bold">Save Reflection</button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
