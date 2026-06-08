import React from 'react';
import { AlertCircle } from 'lucide-react';

export const SubjectPriority: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <AlertCircle className="text-red-400" size={20} />
                Subject Priority
            </h3>
            <div className="space-y-3">
                {['Mathematics', 'Physics', 'History'].map((s, i) => (
                    <div key={i} className="flex justify-between items-center">
                        <span className="text-sm text-slate-300">{s}</span>
                        <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-red-500' : i === 1 ? 'bg-orange-500' : 'bg-yellow-500'}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};
