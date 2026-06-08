import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandedLogo } from '../components/BrandedLogo';
import { ArrowLeft, Brain, Trophy, RotateCcw, Award, Sparkles, TrendingUp } from 'lucide-react';

export const FeatureMastery: React.FC = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-yellow-500/30 overflow-hidden relative">
      
      {/* 3D Floating Debris Background */}
      <div className="fixed inset-0 pointer-events-none perspective-1000 z-0">
          {[...Array(6)].map((_, i) => (
             <div 
                key={i}
                className="absolute bg-slate-800/20 border border-slate-700/30 rounded-xl backdrop-blur-sm animate-float-debris"
                style={{
                    width: Math.random() * 60 + 40 + 'px',
                    height: Math.random() * 80 + 50 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    animationDuration: Math.random() * 10 + 10 + 's',
                    animationDelay: Math.random() * -10 + 's',
                    transform: `rotate(${Math.random() * 360}deg) translateZ(${Math.random() * -200}px)`
                }}
             ></div>
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-600/10 blur-[120px] rounded-full"></div>
      </div>

      <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-20">
        <Link to="/" className="hover:opacity-80 transition-opacity flex items-center gap-2 group">
            <div className="p-2 bg-slate-900/80 backdrop-blur rounded-xl border border-slate-800 group-hover:border-slate-700 transition-colors">
                <ArrowLeft size={20} className="text-slate-400" />
            </div>
            <span className="font-bold text-slate-300 group-hover:text-white">Back</span>
        </Link>
        <BrandedLogo size="sm" withText={true} />
        <Link to="/dashboard" className="px-6 py-2.5 bg-yellow-500 text-slate-900 rounded-full text-sm font-bold transition-all hover:bg-yellow-400 shadow-lg shadow-yellow-500/20 hover:scale-105">
            Start Quiz
        </Link>
      </nav>

      <main className="container mx-auto px-6 pt-12 pb-24 relative z-10">
         
         <div className="flex flex-col lg:flex-row items-center gap-20">
             
             {/* Left Content */}
             <div className="flex-1 animate-fade-in-up">
                 <div className="inline-flex items-center space-x-2 bg-yellow-500/10 text-yellow-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-yellow-500/20 mb-8 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                    <Trophy size={12} />
                    <span>Active Recall Engine</span>
                 </div>
                 <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                     Retention <br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500">Engineered.</span>
                 </h1>
                 <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-lg">
                     Forget forgetting. SmartNotesGPT generates adaptive quizzes and flashcards that target your weak spots until you achieve true mastery.
                 </p>
                 
                 <div className="space-y-6">
                     <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-900/50 transition-colors border border-transparent hover:border-slate-800">
                         <div className="p-3 bg-slate-900 rounded-xl text-green-400 border border-slate-800 mt-1 shadow-lg group-hover:scale-110 transition-transform"><RotateCcw size={24}/></div>
                         <div>
                             <h3 className="font-bold text-lg text-white mb-1">Spaced Repetition</h3>
                             <p className="text-slate-400 text-sm">Algorithms predict your forgetting curve and resurface concepts exactly when needed.</p>
                         </div>
                     </div>
                     <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-900/50 transition-colors border border-transparent hover:border-slate-800">
                         <div className="p-3 bg-slate-900 rounded-xl text-purple-400 border border-slate-800 mt-1 shadow-lg group-hover:scale-110 transition-transform"><Brain size={24}/></div>
                         <div>
                             <h3 className="font-bold text-lg text-white mb-1">Generative Flashcards</h3>
                             <p className="text-slate-400 text-sm">Instantaneously convert any PDF page into a deck of high-quality study cards.</p>
                         </div>
                     </div>
                 </div>
             </div>

             {/* Right Interactive Card (True 3D) */}
             <div className="flex-1 w-full max-w-md perspective-1000 animate-fade-in-up delay-200" style={{ perspective: '1200px' }}>
                 <div 
                    className={`relative w-full aspect-[3/4] cursor-pointer transition-transform duration-700 transform-style-3d group ${flipped ? 'rotate-y-180' : ''}`}
                    onClick={() => setFlipped(!flipped)}
                    style={{ transformStyle: 'preserve-3d' }}
                 >
                     {/* FRONT FACE */}
                     <div className="absolute inset-0 backface-hidden bg-slate-900 border border-slate-700 rounded-[2rem] p-10 flex flex-col justify-between shadow-2xl group-hover:border-yellow-500/50 transition-colors transform-style-3d">
                         {/* Thickness Pseudo-element Simulation */}
                         <div className="absolute right-0 top-0 bottom-0 w-2 bg-slate-800 rounded-r-[2rem] transform rotate-y-90 origin-right translate-x-[1px]"></div>

                         <div className="flex justify-between items-start transform translate-z-10">
                             <div className="text-xs font-bold text-slate-500 uppercase tracking-widest border border-slate-800 px-3 py-1 rounded-full">Question</div>
                             <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 text-sm font-bold border border-slate-700 shadow-inner">?</div>
                         </div>
                         
                         <h3 className="text-3xl font-bold text-center text-white transform translate-z-20 drop-shadow-lg">
                             What is the primary advantage of Trace-based JIT?
                         </h3>
                         
                         <div className="text-center text-sm text-slate-500 animate-pulse transform translate-z-10 flex items-center justify-center gap-2">
                             <Sparkles size={14} /> Click to flip
                         </div>

                         {/* Gloss Shine */}
                         <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-[2rem] pointer-events-none"></div>
                     </div>

                     {/* BACK FACE */}
                     <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-[2rem] p-10 flex flex-col justify-between shadow-2xl text-slate-900 transform-style-3d"
                          style={{ transform: 'rotateY(180deg)' }}
                     >
                         <div className="flex justify-between items-start transform translate-z-10">
                             <div className="text-xs font-bold text-slate-900/60 uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Answer</div>
                             <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-sm shadow-inner"><Award size={18}/></div>
                         </div>
                         
                         <div className="text-center transform translate-z-20">
                             <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">
                                 Optimization of Hot Loops
                             </h3>
                             <p className="text-sm font-medium text-white/90 leading-relaxed bg-black/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                 It identifies frequently executed paths (hot loops) and compiles them to machine code, ignoring cold paths to save resources.
                             </p>
                         </div>
                         
                         <div className="flex justify-center gap-2 transform translate-z-30">
                             <button className="flex-1 py-3 bg-black/20 rounded-xl text-xs font-bold text-white hover:bg-black/30 transition-colors">Hard</button>
                             <button className="flex-1 py-3 bg-black/20 rounded-xl text-xs font-bold text-white hover:bg-black/30 transition-colors">Good</button>
                             <button className="flex-1 py-3 bg-white rounded-xl text-xs font-bold text-orange-600 hover:bg-slate-100 shadow-lg transform hover:-translate-y-1 transition-transform">Easy</button>
                         </div>
                     </div>
                 </div>
                 
                 {/* Floor Shadow */}
                 <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/50 blur-xl rounded-[100%] transition-all duration-700 group-hover:scale-90 group-hover:opacity-30"></div>
             </div>

         </div>

         {/* Stats / Streak Banner */}
         <div className="mt-24 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in-up delay-300">
             <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                     <TrendingUp size={32} className="text-white" />
                 </div>
                 <div>
                     <h3 className="text-2xl font-bold text-white">Your Mastery Streak</h3>
                     <p className="text-slate-400">Keep learning to unlock advanced insights.</p>
                 </div>
             </div>
             
             <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto justify-start md:justify-end scrollbar-hide">
                 {[1,2,3,4,5,6,7].map((day) => (
                     <div key={day} className={`flex flex-col items-center gap-2 min-w-[40px] ${day <= 4 ? 'opacity-100' : 'opacity-30'}`}>
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 ${
                             day <= 4 
                             ? 'bg-green-500 border-green-500 text-slate-900 shadow-[0_0_10px_rgba(34,197,94,0.5)]' 
                             : 'bg-transparent border-slate-700 text-slate-500'
                         }`}>
                             {day <= 4 ? <Award size={14}/> : day}
                         </div>
                         <span className="text-[10px] text-slate-500 font-bold uppercase">Day {day}</span>
                     </div>
                 ))}
             </div>
         </div>

      </main>

      <style>{`
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .perspective-1000 { perspective: 1000px; }
        
        .translate-z-10 { transform: translateZ(20px); }
        .translate-z-20 { transform: translateZ(40px); }
        .translate-z-30 { transform: translateZ(60px); }

        @keyframes float-debris {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float-debris {
            animation-name: float-debris;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};