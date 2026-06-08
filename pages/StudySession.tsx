import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Timer } from '../components/Timer';
import { getDocument, saveSession } from '../services/storage';
import { Document, StudySession } from '../types';
import { CheckCircle, ArrowRight, Book, ShieldCheck, Sparkles } from 'lucide-react';

export const StudySessionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doc, setDoc] = useState<Document | undefined>(undefined);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Read Introduction and Abstract', completed: false },
    { id: '2', text: 'Analyze "Trace Selection" methodology', completed: false },
    { id: '3', text: 'Review Benchmark Results graph on Page 8', completed: false },
  ]);

  useEffect(() => {
    if (id) setDoc(getDocument(id));
  }, [id]);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const handleTimerComplete = () => {
    setSessionCompleted(true);
    if (doc) {
        const sid = Date.now().toString();
        setCurrentSessionId(sid);
        saveSession({
            id: sid,
            docId: doc.id,
            startTime: Date.now(),
            durationMinutes: 20, // This would ideally track actual time
            status: 'completed',
            tasks
        });
    }
  };

  const startQuiz = () => {
    if (currentSessionId) {
        navigate(`/assessment/${id}?sessionId=${currentSessionId}`);
    } else {
        navigate(`/assessment/${id}`);
    }
  };

  if (!doc) return <div className="text-white p-10 flex items-center justify-center h-screen"><div className="animate-spin w-8 h-8 border-4 border-indigo-500 rounded-full border-t-transparent"></div></div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background Ambient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="max-w-4xl w-full z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left Col: Tasks */}
            <div className="animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 shadow-xl">
                        <Book className="text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">{doc.title}</h2>
                        <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Focus Session</p>
                    </div>
                </div>

                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-shimmer"></div>
                    
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center">
                        <ShieldCheck size={14} className="mr-2 text-indigo-400" />
                        Session Objectives
                    </h3>
                    
                    <div className="space-y-3">
                        {tasks.map((task, idx) => (
                            <div 
                                key={task.id}
                                onClick={() => toggleTask(task.id)}
                                className={`group flex items-center space-x-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                                    task.completed 
                                    ? 'bg-green-500/10 border-green-500/30 text-green-200 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                                    : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:border-indigo-500/30 hover:shadow-lg'
                                }`}
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                    task.completed 
                                    ? 'bg-green-500 border-green-500 scale-110' 
                                    : 'border-slate-600 group-hover:border-indigo-400'
                                }`}>
                                    {task.completed && <CheckCircle size={16} className="text-white animate-scale-in" />}
                                </div>
                                <span className={`flex-1 transition-all duration-300 ${task.completed ? 'line-through opacity-60' : 'group-hover:text-white'}`}>
                                    {task.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Col: Timer */}
            <div className="flex flex-col items-center animate-fade-in-up delay-200">
                {!sessionCompleted ? (
                    <Timer initialMinutes={0.1} onComplete={handleTimerComplete} /> // 0.1 for demo
                ) : (
                    <div className="text-center animate-scale-in relative">
                        {/* Confetti burst simulation in background */}
                        <div className="absolute inset-0 bg-green-500/20 blur-[60px] rounded-full animate-pulse"></div>
                        
                        <div className="w-28 h-28 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)] relative z-10 animate-float">
                            <CheckCircle size={56} className="text-white drop-shadow-lg" />
                        </div>
                        
                        <h2 className="text-4xl font-bold mb-3 text-white">Session Complete!</h2>
                        <p className="text-slate-400 mb-8 max-w-xs mx-auto leading-relaxed">Great focus. Now let's verify your mastery of the material.</p>
                        
                        <button 
                            onClick={startQuiz}
                            className="group relative overflow-hidden bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] w-full flex items-center justify-center space-x-2 active:scale-95"
                        >
                            <span className="relative z-10 flex items-center">Start Assessment <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" /></span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};