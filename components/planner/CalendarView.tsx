import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarView: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <CalendarIcon className="text-cyan-400" size={20} />
                    June 2026
                </h3>
                <div className="flex gap-2">
                    <button className="p-2 bg-white/5 rounded-full hover:bg-white/10"><ChevronLeft size={16} /></button>
                    <button className="p-2 bg-white/5 rounded-full hover:bg-white/10"><ChevronRight size={16} /></button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-500 mb-2">
                {['M','T','W','T','F','S','S'].map(d => <span key={d}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className={`p-2 rounded-lg ${i === 6 ? 'bg-indigo-600 text-white' : 'hover:bg-white/5'}`}>
                        {i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};
