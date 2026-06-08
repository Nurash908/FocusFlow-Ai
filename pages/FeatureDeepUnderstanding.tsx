import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BrandedLogo } from '../components/BrandedLogo';
import { ArrowLeft, MessageSquare, FileText, Search, Zap, ArrowRight, Bot, Cpu, Layers } from 'lucide-react';

export const FeatureDeepUnderstanding: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 3D Tilt Effect Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
      const rotateY = ((x - centerX) / centerX) * 10;

      setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] animate-pulse"></div>
          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-20">
        <Link to="/" className="hover:opacity-80 transition-opacity flex items-center gap-2 group">
            <div className="p-2 bg-slate-900/80 backdrop-blur rounded-xl border border-slate-800 group-hover:border-slate-700 transition-colors">
                <ArrowLeft size={20} className="text-slate-400" />
            </div>
            <span className="font-bold text-slate-300 group-hover:text-white">Back</span>
        </Link>
        <BrandedLogo size="sm" withText={true} />
        <Link to="/dashboard" className="px-6 py-2.5 bg-white text-slate-950 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
            Get Started
        </Link>
      </nav>

      <main className="container mx-auto px-6 pt-12 pb-24 relative z-10">
        
        {/* Hero Split */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32 perspective-1000">
          
          {/* Left: Text Content */}
          <div className="flex-1 space-y-8 animate-fade-in-up z-20">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 text-purple-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <MessageSquare size={12} />
                <span>Contextual RAG Technology</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight">
              Don't just read.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-gradient-x">Converse.</span>
            </h1>
            
            <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
              Static PDFs are dead. SmartNotesGPT transforms your documents into living, breathing intelligent agents that answer, explain, and cite instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <Link to="/dashboard" className="group px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all hover:-translate-y-1 shadow-[0_10px_30px_-10px_rgba(147,51,234,0.5)] relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">Try It Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/></span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               </Link>
            </div>
          </div>

          {/* Right: 3D Interactive Visual */}
          <div className="flex-1 w-full max-w-xl animate-fade-in-up delay-200 perspective-1000" style={{ perspective: '2000px' }}>
             <div 
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl transition-transform duration-200 ease-out transform-style-3d group"
                style={{
                    transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
             >
                 {/* Internal Lighting Gradient */}
                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[2.5rem] pointer-events-none" style={{ transform: 'translateZ(1px)' }}></div>
                 
                 {/* Floating Chat Elements */}
                 <div className="space-y-6 transform-style-3d">
                    
                    {/* User Message */}
                    <div className="flex items-end justify-end space-x-3" style={{ transform: 'translateZ(40px)' }}>
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-4 rounded-2xl rounded-br-sm shadow-lg max-w-[85%] relative border border-white/10">
                            <p className="text-sm font-medium leading-relaxed">Explain the concept of "Trace-based JIT" from page 4.</p>
                            {/* Glow behind message */}
                            <div className="absolute inset-0 bg-purple-500/20 blur-xl -z-10"></div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-xs font-bold shadow-lg">You</div>
                    </div>

                    {/* AI Message */}
                    <div className="flex items-end justify-start space-x-3" style={{ transform: 'translateZ(60px)' }}>
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 relative">
                            <Bot size={18} className="text-white relative z-10" />
                            <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20"></div>
                         </div>
                         
                         <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-2xl rounded-bl-sm shadow-xl max-w-[90%] space-y-4 backdrop-blur-md relative overflow-hidden group-hover:border-indigo-500/30 transition-colors">
                             {/* Processing Indicator */}
                             <div className="flex items-center space-x-2 mb-1">
                                <div className="flex space-x-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse delay-75"></span>
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse delay-150"></span>
                                </div>
                                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Analysis Complete</span>
                             </div>
                             
                             <p className="text-sm text-slate-300 leading-relaxed">
                                Trace-based JIT compilation identifies <span className="text-indigo-400 font-bold bg-indigo-500/10 px-1 rounded">"hot" execution paths</span> (loops) and compiles them to machine code. This creates a hybrid approach that offers the flexibility of interpretation with the speed of compiled code.
                             </p>
                             
                             {/* Interactive Citation Chip */}
                             <div className="flex gap-2">
                                 <button className="flex items-center space-x-1.5 bg-slate-950/50 border border-indigo-500/30 text-indigo-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-500/20 transition-all hover:scale-105 active:scale-95 shadow-lg">
                                     <FileText size={12} />
                                     <span>Source: Page 4</span>
                                     <ArrowRight size={10} className="opacity-50" />
                                 </button>
                             </div>

                             {/* Shimmer Effect */}
                             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-[200%] animate-shimmer pointer-events-none"></div>
                         </div>
                    </div>
                 </div>

                 {/* Decorative Scan Line */}
                 <div className="absolute top-0 left-0 w-full h-0.5 bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)] animate-scan-vertical opacity-50 pointer-events-none z-50"></div>
             </div>
          </div>
        </div>

        {/* 3D Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {[
                {
                    icon: <Search size={32} className="text-purple-400" />,
                    title: "Semantic Search",
                    desc: "We don't just match keywords. Our AI understands the intent behind your question.",
                    gradient: "from-purple-500/20 to-indigo-500/5"
                },
                {
                    icon: <Layers size={32} className="text-blue-400" />,
                    title: "Grounded Citations",
                    desc: "Every answer is backed by evidence. Click citations to jump to the exact paragraph.",
                    gradient: "from-blue-500/20 to-cyan-500/5"
                },
                {
                    icon: <Cpu size={32} className="text-pink-400" />,
                    title: "Thinking Models",
                    desc: "Powered by Gemini 3.0 Pro, capable of reasoning through complex technical documentation.",
                    gradient: "from-pink-500/20 to-rose-500/5"
                }
            ].map((f, i) => (
                <div key={i} className="group relative p-8 rounded-[2rem] border border-white/5 bg-slate-900/40 backdrop-blur-sm hover:bg-slate-900/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
                    {/* Hover Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                        <div className="mb-6 p-4 bg-slate-950 rounded-2xl w-fit border border-slate-800 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-xl">
                            {f.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-slate-100">{f.title}</h3>
                        <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">{f.desc}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Animated Process Section */}
        <div className="relative border border-white/5 bg-slate-900/20 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 overflow-hidden backdrop-blur-sm">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
             
             <div className="relative z-10 text-center max-w-4xl mx-auto">
                 <h2 className="text-3xl md:text-4xl font-bold mb-12">The SmartNotes Architecture</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                     {/* Connecting Line (Desktop) */}
                     <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-800 z-0">
                        <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-scan-horizontal"></div>
                     </div>
                     
                     {[
                         { step: "Ingestion", desc: "PDF Text Extraction", icon: "1" },
                         { step: "Vectorization", desc: "Semantic Embedding", icon: "2" },
                         { step: "Synthesis", desc: "LLM Generation", icon: "3" }
                     ].map((s, idx) => (
                         <div key={idx} className={`relative z-10 flex flex-col items-center transition-all duration-700 ${activeStep === idx ? 'scale-110 opacity-100' : 'opacity-50 scale-100'}`}>
                             <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-6 text-2xl font-bold border-2 shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-colors duration-500 bg-slate-950 ${
                                 activeStep === idx 
                                 ? 'border-purple-500 text-purple-400 shadow-purple-500/20' 
                                 : 'border-slate-800 text-slate-600'
                             }`}>
                                 {s.icon}
                             </div>
                             <h3 className={`text-xl font-bold mb-2 transition-colors ${activeStep === idx ? 'text-white' : 'text-slate-500'}`}>{s.step}</h3>
                             <p className="text-sm text-slate-500 font-mono">{s.desc}</p>
                         </div>
                     ))}
                 </div>
             </div>
        </div>

      </main>

      <style>{`
        .transform-style-3d { transform-style: preserve-3d; }
        .perspective-1000 { perspective: 1000px; }
        @keyframes scan-horizontal {
            0% { left: 0%; opacity: 0; }
            50% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
        }
        .animate-scan-horizontal {
            animation: scan-horizontal 3s linear infinite;
        }
        @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </div>
  );
};