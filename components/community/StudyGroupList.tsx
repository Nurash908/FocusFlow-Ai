import React from 'react';
import { BookOpen } from 'lucide-react';

const groups = [
    { name: 'Algebra Experts', members: 45 },
    { name: 'Science Enthusiasts', members: 32 },
];

export const StudyGroupList: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <BookOpen className="text-emerald-400" size={20} />
                My Study Groups
            </h3>
            <div className="space-y-4">
                {groups.map((g, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                        <span className="font-medium">{g.name}</span>
                        <span className="text-sm text-slate-400">{g.members} members</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
