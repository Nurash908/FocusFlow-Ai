import React from 'react';
import { useFocusContext } from '../../context/FocusContext';
import { Volume2, CloudRain, Wind, Coffee, VolumeX } from 'lucide-react';

export const AmbientSoundControls: React.FC = () => {
    const { soundscape, setSoundscape } = useFocusContext();

    const sounds = [
        { id: 'none', label: 'Silent', icon: VolumeX },
        { id: 'rain', label: 'Rain', icon: CloudRain },
        { id: 'white-noise', label: 'White Noise', icon: Wind },
        { id: 'cafe', label: 'Café', icon: Coffee },
    ];

    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Volume2 className="text-cyan-400" size={20} />
                Ambient Soundscape
            </h3>
            <div className="space-y-3">
                {sounds.map((s) => (
                    <button 
                        key={s.id}
                        onClick={() => setSoundscape(s.id as any)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${soundscape === s.id ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-white/5'}`}
                    >
                        <div className="flex items-center gap-4">
                            <s.icon size={20} />
                            <span className="font-medium text-sm">{s.label}</span>
                        </div>
                        {soundscape === s.id && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
                    </button>
                ))}
            </div>
        </div>
    );
};
