import React from 'react';
import { Award } from 'lucide-react';

export const AchievementGallery: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Award className="text-purple-400" size={20} />
                Achievements
            </h3>
            <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/5 flex items-center justify-center">
                        <Award className="text-slate-600" size={32} />
                    </div>
                ))}
            </div>
        </div>
    );
};
