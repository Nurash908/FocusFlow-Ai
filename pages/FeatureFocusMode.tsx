import React from 'react';
import { Link } from 'react-router-dom';
import { BrandedLogo } from '../components/BrandedLogo';
import { ArrowLeft, Clock, Target, Music, Wind, Zap, Play } from 'lucide-react';
import { Timer } from '../components/Timer';

export const FeatureFocusMode: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* Background Flow Tunnel */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[100px] rounded-full animate-pulse-slow mix-blend-screen"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-indigo-500/10 rounded-full animate-spin-slow-reverse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-purple-500/5 rounded-full animate-spin-slow"></div>
          {/* Particle Dust */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      </div>

      <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-20">
        <Link to="/" className="hover:opacity-80 transition-opacity flex items-center gap-2 group">
            <div className="p-2 bg-slate-900/80 backdrop-blur rounded-xl border border-slate-800 group-hover:border-slate-700 transition-colors">
                <ArrowLeft size={20} className="text-slate-400" />
            </div>
            <span className="font-bold text-slate-300 group-hover:text-white">Back</span>
        </Link>
        <BrandedLogo size="sm" withText={true} />
        <Link to="/dashboard" className="px-6 py-2.5 bg-indigo-600 text-white rounded-full text-sm font-bold transition-all hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 hover:scale-105">
            Start Focus
        </Link>
      </nav>

      <main className="container mx-auto px-6 pt-8 relative z-10 flex flex-col items-center">
         
         <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in-up z-20">
             <div className="inline-flex items-center space-x-2 bg-indigo-500/10 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-500/20 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <Wind size={12} />
                <span>Deep Work Technology</span>
            </div>
             <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter drop-shadow-2xl">
                 Enter the <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-200 to-indigo-400">Flow State.</span>
             </h1>
             <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                 Distraction is the enemy of mastery. Our Active Focus Mode combines Pomodoro techniques with AI-generated micro-goals to keep you locked in.
             </p>
         </div>

         {/* --- HERO INTERACTIVE DEMO --- */}
         <div className="relative w-full max-w-5xl mb-32 animate-fade-in-up delay-200 perspective-1000">
             
             {/* The Glowing Orb Container */}
             <div className="relative bg-slate-900/30 backdrop-blur-xl border border-white/5 rounded-[4rem] p-12 md:p-20 shadow-2xl flex flex-col items-center justify-center overflow-hidden group">
                 
                 {/* Orb Glow Behind Timer */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[80px] group-hover:bg-indigo-500/20 transition-colors duration-1000"></div>

                 <div className="flex flex-col md:flex-row items-center gap-16 w-full max-w-4xl relative z-10">
                     
                     {/* Left: The Massive Timer */}
                     <div className="flex-1 flex justify-center w-full">
                        <div className="relative scale-100 md:scale-125 transform transition-transform duration-700 hover:scale-105 md:hover:scale-135">
                            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse"></div>
                            <Timer initialMinutes={25} onComplete={() => {}} />
                        </div>
                     </div>

                     {/* Right: Floating 3D Tasks */}
                     <div className="flex-1 w-full space-y-4 perspective-1000 mt-8 md:mt-0">
                         <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">
                             <span className="flex items-center gap-2"><Zap size={14} className="text-yellow-400" /> Current Session Goals</span>
                             <span>1/3</span>
                         </div>
                         
                         {/* Task 1: Completed */}
                         <div className="bg-slate-900/80 border border-slate-700/50 p-5 rounded-2xl flex items-center gap-4 transform rotate-x-6 translate-z-4 opacity-60 hover:opacity-100 hover:translate-z-8 transition-all duration-500 shadow-lg">
                             <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-slate-900 shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                             </div>
                             <span className="text-slate-400 line-through font-medium">Read abstract & intro</span>
                         </div>

                         {/* Task 2: Active */}
                         <div className="bg-slate-800/90 border border-indigo-500/50 p-5 rounded-2xl flex items-center gap-4 transform translate-z-12 scale-105 shadow-[0_10px_30px_-10px_rgba(99,102,241,0.3)] relative overflow-hidden group/task">
                             <div className="absolute left-0 top-0 h-full w-1 bg-indigo-500"></div>
                             <div className="w-6 h-6 rounded-full border-2 border-indigo-400 flex items-center justify-center">
                                 <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                             </div>
                             <span className="text-white font-bold text-lg">Analyze methodology</span>
                             <div className="ml-auto text-xs font-bold text-indigo-300 bg-indigo-500/20 px-2 py-1 rounded">NOW</div>
                         </div>

                         {/* Task 3: Pending */}
                         <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 transform -rotate-x-6 translate-z-0 hover:translate-z-4 transition-all duration-500">
                             <div className="w-6 h-6 rounded-full border-2 border-slate-700"></div>
                             <span className="text-slate-500 font-medium">Review conclusion</span>
                         </div>

                     </div>
                 </div>

                 {/* Sound Wave Visualization (Bottom) */}
                 <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center gap-1 opacity-20 pointer-events-none pb-8 px-20">
                     {[...Array(20)].map((_, i) => (
                         <div 
                            key={i} 
                            className="w-3 bg-indigo-500 rounded-t-full animate-sound-wave" 
                            style={{ 
                                height: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.1}s`,
                                animationDuration: `${0.5 + Math.random()}s`
                            }}
                        ></div>
                     ))}
                 </div>
             </div>
         </div>

         {/* Three Pillar Features Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 w-full max-w-6xl">
             <FeaturePillar 
                icon={<Clock size={28} />}
                title="Smart Intervals"
                desc="Not just a timer. The AI adjusts break durations based on the density of the document you're reading."
                delay="0s"
             />
             <FeaturePillar 
                icon={<Target size={28} />}
                title="Micro-Goal Generation"
                desc="Large documents are overwhelming. We auto-generate a checklist of digestible tasks for each session."
                delay="0.1s"
             />
             <FeaturePillar 
                icon={<Music size={28} />}
                title="Ambient Focus"
                desc="Optional binaural beats and lo-fi tracks integrated directly into the workspace to drown out noise."
                delay="0.2s"
             />
         </div>

      </main>

      <style>{`
        @keyframes pulse-slow {
            0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
            50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
        }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        
        @keyframes spin-slow {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        
        @keyframes spin-slow-reverse {
            from { transform: translate(-50%, -50%) rotate(360deg); }
            to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 25s linear infinite; }

        @keyframes sound-wave {
            0%, 100% { height: 10%; }
            50% { height: 80%; }
        }
        .animate-sound-wave { animation: sound-wave 1s ease-in-out infinite; }

        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

const FeaturePillar = ({ icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: string }) => (
    <div 
        className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-[2rem] hover:bg-slate-800/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-indigo-500/30 group animate-fade-in-up"
        style={{ animationDelay: delay }}
    >
        <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 border border-slate-800 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg group-hover:shadow-indigo-500/20">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300">{desc}</p>
    </div>
);