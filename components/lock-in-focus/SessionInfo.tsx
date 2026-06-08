import React from 'react';

export const SessionInfo: React.FC = () => {
    return (
        <div className="flex gap-4 justify-center">
            {[
                { label: 'Today\'s Goal', value: '3h' },
                { label: 'Completed', value: '1h 45m' },
                { label: 'Focus Level', value: 'Locked In' },
            ].map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 min-w-[100px] text-center shadow-lg">
                    <p className="text-slate-400 text-xs mb-1">{item.label}</p>
                    <p className="font-bold text-white">{item.value}</p>
                </div>
            ))}
        </div>
    );
};
