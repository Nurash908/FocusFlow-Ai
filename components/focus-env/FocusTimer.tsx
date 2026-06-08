import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Settings, Clock, Coffee, Brain } from 'lucide-react';
import { triggerConfetti } from '../rewards/ConfettiTrigger';
import { useFocusContext } from '../../context/FocusContext';

export const FocusTimer: React.FC = () => {
  const { setIsDeepWork } = useFocusContext();
  const [workDuration, setWorkDuration] = useState(60);
  const [breakDuration, setBreakDuration] = useState(10);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setIsDeepWork(isActive && isWorkSession);
  }, [isActive, isWorkSession, setIsDeepWork]);

    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      if (isWorkSession && workDuration >= 60) {
         triggerConfetti();
      }
      // Switch session
      setIsWorkSession(!isWorkSession);
      setTimeLeft(isWorkSession ? breakDuration * 60 : workDuration * 60);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isActive, timeLeft, isWorkSession, workDuration, breakDuration]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(workDuration * 60);
    setIsWorkSession(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.01, rotateX: 2, rotateY: 2 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ perspective: 1000 }}
      className="bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_20px_50px_-12px_rgba(79,70,229,0.3)] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-indigo-500/5 blur-3xl opacity-50" />
      
      <div className="relative z-10 flex justify-between items-center mb-8">
        <h3 className="font-bold text-xl flex items-center gap-3 text-white tracking-tight">
          <div className={`p-2 rounded-xl ring-1 ${isActive && isWorkSession ? 'bg-emerald-500/20 ring-emerald-500/30' : 'bg-slate-500/20 ring-slate-500/30'}`}>
            <Brain className={isActive && isWorkSession ? 'text-emerald-400' : 'text-slate-400'} size={20} />
          </div>
          {isActive && isWorkSession ? "Deep Focus Mode" : "Focus Timer"}
        </h3>
        <button onClick={() => setShowSettings(!showSettings)} className="text-slate-400 hover:text-white transition-colors">
          <Settings size={20} />
        </button>
      </div>

      {showSettings ? (
        <div className="space-y-4">
          <div className="flex gap-4">
            <input type="number" value={workDuration} onChange={(e) => setWorkDuration(Number(e.target.value))} className="w-full bg-slate-950 p-3 rounded-xl border border-white/5 text-white" placeholder="Work (min)" />
            <input type="number" value={breakDuration} onChange={(e) => setBreakDuration(Number(e.target.value))} className="w-full bg-slate-950 p-3 rounded-xl border border-white/5 text-white" placeholder="Break (min)" />
          </div>
          <button onClick={() => setShowSettings(false)} className="w-full bg-indigo-600 text-white p-3 rounded-xl font-bold">Apply</button>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-7xl font-bold text-white mb-6 tabular-nums tracking-tighter">
            {formatTime(timeLeft)}
          </div>
          
            <div className="flex justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTimer} 
              className="p-5 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-full shadow-lg shadow-indigo-600/30 transition-shadow hover:shadow-indigo-600/50"
            >
              {isActive ? <Pause size={28} /> : <Play size={28} />}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: -90 }}
              whileTap={{ scale: 0.9 }}
              onClick={resetTimer} 
              className="p-5 bg-slate-800 hover:bg-slate-700 text-white rounded-full shadow-lg transition-transform"
            >
              <RotateCcw size={28} />
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
