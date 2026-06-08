import React from 'react';
import { Shield } from 'lucide-react';

export const DistractionShield: React.FC = () => {
    return (
        <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-2xl p-4 flex items-center justify-between text-cyan-200">
            <span className="text-sm font-medium">Distraction Shield</span>
            <span className="text-xs bg-cyan-500/20 px-2 py-1 rounded-full uppercase font-bold">Active</span>
        </div>
    );
};
