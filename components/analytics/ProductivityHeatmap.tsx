import React from 'react';

const heatmapData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    intensity: Math.random(),
}));

export const ProductivityHeatmap: React.FC = () => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6">Productivity Heatmap</h3>
            <div className="grid grid-cols-7 gap-2">
                {heatmapData.map((d, i) => (
                    <div 
                        key={i} 
                        className={`aspect-square rounded-sm ${
                            d.intensity > 0.8 ? 'bg-indigo-500' : 
                            d.intensity > 0.5 ? 'bg-indigo-700' : 
                            d.intensity > 0.2 ? 'bg-slate-700' : 'bg-slate-800'
                        }`} 
                    />
                ))}
            </div>
        </div>
    );
};
