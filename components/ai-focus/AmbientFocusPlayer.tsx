import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, CloudRain, Music, Wind } from 'lucide-react';

interface Soundscape {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const SOUNDSCAPES: Soundscape[] = [
  { id: 'white', name: 'White Noise', icon: <Wind size={20} /> },
  { id: 'rain', name: 'Rain', icon: <CloudRain size={20} /> },
  { id: 'lofi', name: 'Lo-Fi', icon: <Music size={20} /> },
];

export const AmbientFocusPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSound, setActiveSound] = useState(SOUNDSCAPES[0].id);

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5"></div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <h3 className="font-bold text-lg flex items-center gap-2">
            <Volume2 className="text-indigo-400" size={20} />
            Ambient Focus
        </h3>
        <button 
           onClick={() => setIsPlaying(!isPlaying)}
           className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 relative z-10">
        {SOUNDSCAPES.map((sound) => (
          <button
            key={sound.id}
            onClick={() => setActiveSound(sound.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
              activeSound === sound.id 
                ? 'bg-indigo-500/20 border-indigo-500/50 text-white' 
                : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {sound.icon}
            <span className="text-xs font-medium">{sound.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
