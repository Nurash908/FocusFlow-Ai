import React, { useEffect, useRef, useState } from 'react';
import { FileText, Search, Clock, CheckCircle2, Trophy, Zap, MousePointer2, Sparkles, ArrowRight, Bot } from 'lucide-react';

export const HeroAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [stage, setStage] = useState(0);

  // 0: Idle (PDF Visible)
  // 1: AI Appears + Query (Introduction)
  // 2: Analysis (Guidance - Scroll + Highlight)
  // 3: Focus Timer
  // 4: Assessment (Guidance - Quiz)
  // 5: Mastery (Success)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Narrative Sequencer
  useEffect(() => {
    const timings = [
      2000, // 0. Idle
      3000, // 1. Intro + Query
      3500, // 2. Analysis
      3500, // 3. Focus Timer
      2500, // 4. Quiz
      6000, // 5. Mastery
    ];

    let currentStep = 0;
    
    const runSequence = () => {
        setStage(currentStep);
        const nextTime = timings[currentStep];
        currentStep = (currentStep + 1) % timings.length;
        setTimeout(runSequence, nextTime);
    };

    const timer = setTimeout(runSequence, 100);
    return () => clearTimeout(timer);
  }, []);

  // Parallax Tilt
  const rotateX = mousePos.y * -4; 
  const rotateY = mousePos.x * 4;

  const CHARACTER_URL = "https://i.postimg.cc/qvKR4Pvc/Chat-GPT-Image-Jan-18-2026-08-19-11-PM.png";
  
  // Character State Helpers
  const isVisible = stage >= 1;
  const isThinking = stage === 2 || stage === 4; // Guidance Phases
  const isMastery = stage === 5; // Mastery Phase

  return (
    <div 
        ref={containerRef}
        className="relative w-full max-w-[800px] h-[500px] mx-auto perspective-1000 flex items-center justify-center select-none"
    >
        {/* --- Ambient Scene Lighting --- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 blur-[100px] rounded-full"></div>

        {/* --- 3D Stage --- */}
        <div 
            className="relative w-full h-full transform-style-3d transition-transform duration-500 ease-out flex items-center justify-center"
            style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
        >
            
            {/* ==============================================
                THE AI GUIDE CHARACTER (Living Entity)
               ============================================== */}
            <div 
                className={`absolute top-[5%] right-[0%] md:right-[5%] z-50 transform-style-3d transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                style={{ transform: 'translateZ(60px)' }}
            >
                {/* 1. Reactive Glow Aura */}
                <div className={`absolute inset-0 blur-[60px] rounded-full transition-all duration-1000 ${
                    isMastery ? 'bg-emerald-500/60 scale-150 opacity-100' : 
                    isThinking ? 'bg-indigo-500/60 scale-125 opacity-80' : 
                    'bg-indigo-900/40 scale-100 opacity-50'
                }`}></div>
                
                {/* 2. The Character Orb/Squircle */}
                <div className="relative w-32 h-32 animate-float-slow group">
                     {/* Glass Container */}
                     <div className={`absolute inset-0 bg-slate-900/80 rounded-3xl overflow-hidden transition-all duration-700 ${
                         isMastery ? 'border-2 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.4)]' :
                         isThinking ? 'border-2 border-indigo-400/50 shadow-[0_0_30px_rgba(99,102,241,0.5)]' :
                         'border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                     }`}>
                        {/* Internal Blur */}
                        <div className="absolute inset-0 backdrop-blur-md"></div>
                        
                        {/* The Face - Zoomed for "No Body" look */}
                        <img 
                            src={CHARACTER_URL} 
                            alt="AI Guide" 
                            className={`w-full h-full object-cover scale-[2.1] transition-transform duration-700 ${isThinking ? 'scale-[2.2]' : ''}`} 
                        />
                        
                        {/* Subtle Scan Effect (Guidance Mode) */}
                        <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent transition-opacity duration-500 ${isThinking ? 'opacity-100 animate-scan-infinite' : 'opacity-0'}`}></div>
                        
                        {/* Gloss Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                     </div>
                     
                     {/* 3. Status Indicators */}
                     
                     {/* Thinking Sparkle */}
                     <div className={`absolute -top-3 -right-3 bg-indigo-500 text-white p-2 rounded-full shadow-lg scale-0 transition-transform duration-500 ${isThinking ? 'scale-100' : ''}`}>
                        <Sparkles size={14} fill="currentColor" />
                     </div>

                     {/* Mastery Badge */}
                     <div className={`absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow-lg scale-0 transition-transform duration-500 ${isMastery ? 'scale-100' : ''}`}>
                        <CheckCircle2 size={16} />
                     </div>
                </div>

                {/* 4. Contextual Chat Bubble (Introduction) */}
                <div className={`absolute top-full mt-4 right-0 w-48 bg-slate-800/90 backdrop-blur-md border border-slate-700 p-3 rounded-2xl rounded-tr-none text-xs text-slate-200 shadow-xl transition-all duration-500 transform origin-top-right ${
                    stage === 1 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}>
                    <div className="flex items-center space-x-2 mb-1">
                        <Bot size={12} className="text-indigo-400" />
                        <span className="font-bold text-indigo-100 text-[10px] uppercase">SmartNotes AI</span>
                    </div>
                    <p>I've analyzed the document. Ready to guide you?</p>
                </div>
            </div>

            {/* ==============================================
                MAIN DOCUMENT CARD (The Anchor)
               ============================================== */}
            <div 
                className={`relative w-[340px] h-[460px] bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl overflow-hidden transform-style-3d transition-all duration-700 ease-in-out ${stage === 3 || stage === 4 || stage === 5 ? 'scale-95 opacity-30 blur-[4px]' : 'scale-100 opacity-100'}`}
                style={{ transform: 'translateZ(0px)' }}
            >
                {/* Header */}
                <div className="h-10 border-b border-slate-700/50 bg-slate-800/50 flex items-center px-4 space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                    <div className="ml-auto w-20 h-1.5 bg-slate-700/50 rounded-full"></div>
                </div>

                {/* Content Scroll Wrapper */}
                <div className="p-6 relative">
                    <div 
                        className="transition-transform duration-[1500ms] cubic-bezier(0.4, 0, 0.2, 1)"
                        style={{ transform: stage === 2 ? 'translateY(-80px)' : 'translateY(0)' }}
                    >
                        {/* Title */}
                        <div className="w-3/4 h-4 bg-slate-600 rounded-full mb-6"></div>
                        
                        {/* Paragraphs */}
                        <div className="space-y-3 opacity-60">
                            <div className="w-full h-2 bg-slate-700 rounded-full"></div>
                            <div className="w-5/6 h-2 bg-slate-700 rounded-full"></div>
                            <div className="w-full h-2 bg-slate-700 rounded-full"></div>
                            <div className="w-4/5 h-2 bg-slate-700 rounded-full"></div>
                        </div>

                        <div className="space-y-3 mt-8 opacity-60">
                            <div className="w-full h-2 bg-slate-700 rounded-full"></div>
                            <div className="w-11/12 h-2 bg-slate-700 rounded-full"></div>
                            <div className="w-full h-2 bg-slate-700 rounded-full"></div>
                        </div>

                        {/* TARGET SECTION (Highlighted) */}
                        <div className="mt-8 relative">
                             {/* The Highlight Overlay */}
                             <div className={`absolute -inset-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg transition-all duration-700 ${stage === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}></div>
                             
                             <div className="w-32 h-3 bg-slate-500 rounded-full mb-3"></div>
                             <div className="space-y-3">
                                <div className={`w-full h-2 rounded-full transition-colors duration-500 ${stage === 2 ? 'bg-indigo-200' : 'bg-slate-600'}`}></div>
                                <div className={`w-full h-2 rounded-full transition-colors duration-500 ${stage === 2 ? 'bg-indigo-200' : 'bg-slate-600'}`}></div>
                                <div className={`w-3/4 h-2 rounded-full transition-colors duration-500 ${stage === 2 ? 'bg-indigo-200' : 'bg-slate-600'}`}></div>
                             </div>
                        </div>

                         <div className="space-y-3 mt-8 opacity-60">
                            <div className="w-full h-2 bg-slate-700 rounded-full"></div>
                            <div className="w-5/6 h-2 bg-slate-700 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Scan Line (Stage 2 Only) */}
                <div 
                    className={`absolute top-0 left-0 w-full h-[2px] bg-indigo-400 shadow-[0_0_15px_rgba(99,102,241,1)] z-10 transition-opacity duration-300 ${stage === 2 ? 'opacity-100 animate-scan-down-once' : 'opacity-0'}`}
                ></div>
            </div>


            {/* ==============================================
                FLOATING UI ELEMENTS (Contextual)
               ============================================== */}

            {/* 1. SEARCH QUERY */}
            <div 
                className={`absolute top-[20%] left-[-5%] bg-white text-slate-900 px-4 py-3 rounded-xl rounded-bl-none shadow-xl flex items-center gap-3 transform transition-all duration-700 ${stage === 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
                style={{ transform: 'translateZ(40px)' }}
            >
                <Search size={16} className="text-indigo-600" />
                <span className="text-sm font-bold">Explain "Neuroplasticity"</span>
            </div>

            {/* 2. JUMP TO PAGE INDICATOR */}
            <div 
                className={`absolute bottom-[30%] right-[10%] bg-indigo-600 text-white px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 transform transition-all duration-500 ${stage === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                style={{ transform: 'translateZ(50px)' }}
            >
                <MousePointer2 size={12} />
                <span className="text-xs font-bold">Jumping to Page 4...</span>
            </div>

            {/* 3. PREMIUM FOCUS TIMER */}
            <div 
                className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-700 ${stage === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                style={{ transform: 'translateZ(80px)' }}
            >
                {/* Glow Backdrop */}
                <div className={`absolute w-56 h-56 bg-indigo-500/20 blur-[80px] rounded-full transition-opacity duration-500 ${stage === 3 ? 'opacity-100' : 'opacity-0'}`}></div>

                {/* The Timer Card */}
                <div className="relative w-64 h-64 rounded-full bg-slate-950/80 backdrop-blur-2xl border border-white/5 flex flex-col items-center justify-center shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden">
                    {/* SVG Progress Ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 p-4">
                        <defs>
                            <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#818cf8" /> {/* Indigo-400 */}
                                <stop offset="100%" stopColor="#c084fc" /> {/* Purple-400 */}
                            </linearGradient>
                        </defs>
                        {/* Track */}
                        <circle cx="50%" cy="50%" r="45%" stroke="#1e293b" strokeWidth="6" fill="none" />
                        {/* Active Progress */}
                        <circle 
                            cx="50%" cy="50%" r="45%" 
                            stroke="url(#timer-gradient)" 
                            strokeWidth="6" 
                            fill="none" 
                            strokeDasharray="700" 
                            strokeDashoffset={stage === 3 ? '0' : '700'} 
                            strokeLinecap="round"
                            className="transition-all duration-[2500ms] ease-out"
                        />
                    </svg>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mb-3 text-indigo-400">
                             <Clock size={16} strokeWidth={2.5} />
                        </div>
                        <span className="text-5xl font-mono font-bold text-white tracking-tighter drop-shadow-md">20:00</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-indigo-300/80 font-bold mt-3">Focus Mode</span>
                    </div>
                </div>
            </div>

            {/* 4. QUIZ CARD */}
            <div 
                className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-700 ${stage === 4 ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-12 scale-90'}`}
                style={{ transform: 'translateZ(90px)' }}
            >
                 <div className="bg-slate-900 border border-indigo-500/30 w-64 p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center">
                     <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4 text-indigo-400">
                         <Zap size={20} />
                     </div>
                     <h3 className="text-white font-bold text-sm mb-4">Quick Check: What triggers plasticity?</h3>
                     <div className="w-full space-y-2">
                         <div className="h-8 w-full bg-slate-800 rounded-lg flex items-center px-3 text-[10px] text-slate-400 border border-slate-700">A. Passive Reading</div>
                         <div className="h-8 w-full bg-indigo-600/20 border border-indigo-500 rounded-lg flex items-center px-3 text-[10px] text-white font-bold relative overflow-hidden">
                             <div className="absolute inset-0 bg-indigo-500/20 animate-pulse"></div>
                             <span className="relative">B. Repetitive Stimulation</span>
                             <CheckCircle2 size={12} className="ml-auto text-indigo-400" />
                         </div>
                     </div>
                 </div>
            </div>

            {/* 5. MASTERY BADGE (Final) */}
             <div 
                className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-700 ${stage === 5 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                style={{ transform: 'translateZ(100px)' }}
            >
                 <div className="flex flex-col items-center">
                     <div className="relative">
                         <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse"></div>
                         <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl relative z-10">
                             <Trophy size={48} className="text-white drop-shadow-md" />
                         </div>
                         {/* Confetti Particles (CSS) */}
                         {[...Array(6)].map((_, i) => (
                             <div key={i} className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-confetti-explode" style={{ animationDelay: `${i * 0.1}s` }}></div>
                         ))}
                     </div>
                     <h2 className="text-2xl font-bold text-white mt-6 mb-1 tracking-tight">Mastery Achieved</h2>
                     <p className="text-green-400 font-bold text-sm uppercase tracking-widest">Score: 100%</p>
                     
                     {/* Premium Animated Tagline */}
                     <div className={`mt-8 px-6 py-3 bg-slate-950/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center space-x-3 transition-all duration-1000 transform ${stage === 5 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                         
                         {/* Upload */}
                         <div className={`flex items-center space-x-2 transition-all duration-700 delay-300 ${stage === 5 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                             <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
                             <span className="text-slate-300 font-medium text-xs tracking-wide">Upload</span>
                         </div>

                         {/* Arrow */}
                         <ArrowRight size={12} className={`text-slate-600 transition-opacity duration-700 delay-500 ${stage === 5 ? 'opacity-100' : 'opacity-0'}`} />

                         {/* Understand */}
                         <div className={`flex items-center space-x-2 transition-all duration-700 delay-700 ${stage === 5 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                              <span className="text-indigo-300 font-bold text-xs tracking-wide">Understand</span>
                         </div>

                         {/* Arrow */}
                         <ArrowRight size={12} className={`text-slate-600 transition-opacity duration-700 delay-900 ${stage === 5 ? 'opacity-100' : 'opacity-0'}`} />

                         {/* Master */}
                         <div className={`relative transition-all duration-700 delay-1000 ${stage === 5 ? 'opacity-100 scale-110 translate-x-0' : 'opacity-0 scale-90 -translate-x-4'}`}>
                             <span className="absolute inset-0 bg-green-500/20 blur-lg rounded-full animate-pulse"></span>
                             <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 font-black text-sm tracking-widest uppercase">MASTER</span>
                         </div>

                     </div>
                 </div>
            </div>

        </div>

        <style>{`
            .transform-style-3d { transform-style: preserve-3d; }
            .perspective-1000 { perspective: 1000px; }
            
            @keyframes float-slow {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }

            @keyframes scan-down-once {
                0% { top: 0%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: 80%; opacity: 0; }
            }
            .animate-scan-down-once { animation: scan-down-once 1.5s ease-in-out forwards; }
            
            @keyframes scan-infinite {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(100%); }
            }
            .animate-scan-infinite { animation: scan-infinite 3s linear infinite; }

            @keyframes confetti-explode {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                100% { transform: translate(var(--tw-translate-x, 100px), var(--tw-translate-y, -100px)) scale(1); opacity: 0; }
            }
            .animate-confetti-explode { 
                --tw-translate-x: ${Math.random() * 200 - 100}px;
                --tw-translate-y: ${Math.random() * -150 - 50}px;
                animation: confetti-explode 1s ease-out forwards; 
            }
        `}</style>
    </div>
  );
};