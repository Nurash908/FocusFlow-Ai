import React from 'react';

const days = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    status: i < 14 ? 'productive' : i === 14 ? 'active' : 'upcoming'
}));

export const StreakCalendar: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6">Streak Calendar</h3>
            <div className="grid grid-cols-7 gap-3">
                {days.map((d, i) => (
                    <div 
                        key={i} 
                        className={`aspect-square flex items-center justify-center rounded-2xl text-xs font-bold ${
                            d.status === 'productive' ? 'bg-orange-500/80 text-white' : 
                            d.status === 'active' ? 'bg-white text-slate-950 ring-2 ring-orange-500' : 'bg-white/5 text-slate-600'
                        }`}
                    >
                        {d.day}
                    </div>
                ))}
            </div>
        </div>
    );
};
