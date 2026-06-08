import React, { useEffect, useState } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

interface TimerProps {
  initialMinutes: number;
  onComplete: () => void;
  variant?: 'full' | 'widget';
}

export const Timer: React.FC<TimerProps> = ({ initialMinutes, onComplete, variant = 'full' }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setTimeLeft(initialMinutes * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((initialMinutes * 60 - timeLeft) / (initialMinutes * 60)) * 100;
  
  const isWidget = variant === 'widget';
  
  // Widget-specific styles
  const containerSize = isWidget ? 'w-40 h-40' : 'w-64 h-64';
  const timeSize = isWidget ? 'text-3xl' : 'text-6xl';
  const buttonSize = isWidget ? 'px-4 py-2 text-xs' : 'px-6 py-3 text-base';
  const iconSize = isWidget ? 14 : 20;

  return (
    <div className={`flex flex-col items-center justify-center ${isWidget ? 'py-4' : 'py-10'} relative`}>
      {/* Circular Progress */}
      <div className={`relative ${containerSize} flex items-center justify-center`}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
            <circle
                cx="128"
                cy="128"
                r="120"
                stroke="#1e293b"
                strokeWidth={isWidget ? "12" : "8"}
                fill="none"
            />
            <circle
                cx="128"
                cy="128"
                r="120"
                stroke="#6366f1"
                strokeWidth={isWidget ? "12" : "8"}
                fill="none"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
            />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`${isWidget ? 'text-[10px]' : 'text-xs'} uppercase tracking-widest text-indigo-400 font-bold mb-1`}>Deep Focus</span>
            <span className={`${timeSize} font-mono font-bold text-white tracking-tighter`}>
                {formatTime(timeLeft)}
            </span>
            <span className={`${isWidget ? 'text-[10px]' : 'text-xs'} text-slate-500 ${isWidget ? 'mt-1' : 'mt-2'}`}>{isActive ? 'Active' : 'Paused'}</span>
        </div>
      </div>

      <div className={`flex space-x-3 ${isWidget ? 'mt-4' : 'mt-8'}`}>
        <button 
            onClick={toggle}
            className={`flex items-center space-x-2 bg-white text-slate-900 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-500/20 ${buttonSize}`}
        >
            {isActive ? <Pause size={iconSize} fill="currentColor" /> : <Play size={iconSize} fill="currentColor" />}
            <span>{isActive ? 'Pause' : 'Start'}</span>
        </button>
        <button 
            onClick={reset}
            className={`rounded-full border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${isWidget ? 'p-2' : 'p-3'}`}
        >
            <RefreshCw size={iconSize} />
        </button>
      </div>
    </div>
  );
};