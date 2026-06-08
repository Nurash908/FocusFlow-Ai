import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { getDocuments, addDocument, getAssessments, getSessions, updateDocumentStatus } from '../services/storage';
import { saveFile } from '../services/fileStorage'; // Import saveFile
import { ingestDocument } from '../services/rag';
import { Document, Assessment, StudySession } from '../types';
import { 
  FileText, Plus, Clock, BarChart3, ChevronRight, UploadCloud, 
  History, CheckCircle2, XCircle, Sparkles, Search, BookOpen, 
  Award, Flame, ArrowRight, TrendingUp, MoreHorizontal, Calendar, Target,
  Timer, Bell, ChevronDown, Loader2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaderboard } from '../components/dashboard/Leaderboard';
import { ProductivityHealthScore } from '../components/dashboard/ProductivityHealthScore';
import { SmartStudyChallenges } from '../components/dashboard/SmartStudyChallenges';
import { DailyIntentionModal } from '../components/goals/DailyIntentionModal';

export const Dashboard: React.FC = () => {
  const [docs, setDocs] = useState<Document[]>([]);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [showIntro, setShowIntro] = useState(true); // Intro Animation State
  const [intentionModalOpen, setIntentionModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [processingState, setProcessingState] = useState<{status: string, progress: number, docId?: string, error?: string}>({ status: 'idle', progress: 0 });
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
      const today = new Date().toISOString().split('T')[0];
      const hasShown = localStorage.getItem(`intentionShown_${today}`);
      if (!hasShown) {
          setIntentionModalOpen(true);
      }
  }, []);

  useEffect(() => {
    setDocs(getDocuments());
    // Get all sessions and sort by recent
    const allSessions = getSessions().sort((a, b) => b.startTime - a.startTime);
    setSessions(allSessions);
    // Get assessments to map scores to sessions
    setAssessments(getAssessments());

    // Intro Animation Timer
    const timer = setTimeout(() => setShowIntro(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const docId = `doc-${Date.now()}`;
      
      const newDoc: Document = {
        id: docId,
        title: file.name,
        uploadDate: new Date().toISOString(),
        pageCount: 0, 
        status: 'processing',
        masteryScore: 0,
        contentSummary: ""
      };
      
      // Save metadata to LocalStorage
      addDocument(newDoc);
      
      setUploadModalOpen(true);
      setProcessingState({ status: 'Saving file...', progress: 5, docId });

      // Save actual file to IndexedDB for Workspace access
      try {
          await saveFile(docId, file);
      } catch (err) {
          console.error("Failed to save file to DB:", err);
          updateDocumentStatus(docId, 'error');
          setProcessingState({ status: 'Error', progress: 0, docId, error: 'Failed to save file.' });
          return;
      }

      setProcessingState({ status: 'Starting ingestion...', progress: 10, docId });
      
      // Background Processing (Simulated RAG Ingestion)
      try {
        ingestDocument(docId, file, (status, progress) => {
             setProcessingState({ status, progress, docId });
             sessionStorage.setItem(`ingest_progress_${docId}`, JSON.stringify({ status, progress }));
        }).then((summary) => {
             const updatedDocs = getDocuments();
             const d = updatedDocs.find(d => d.id === docId);
             if (d) {
                 d.status = 'ready';
                 d.contentSummary = summary;
                 d.pageCount = 25; // Estimate or update from ingest result
                 localStorage.setItem('sngpt_docs', JSON.stringify(updatedDocs));
             }
             setDocs(getDocuments());
             setProcessingState({ status: 'Complete', progress: 100, docId });
        }).catch((err) => {
             console.error(err);
             updateDocumentStatus(docId, 'error');
             setProcessingState({ status: 'Error', progress: 0, docId, error: 'Failed to process document.' });
        });
      } catch (e) {
          console.error(e);
          updateDocumentStatus(docId, 'error');
          setProcessingState({ status: 'Error', progress: 0, docId, error: 'Failed to process document.' });
      }
    }
  };

  const getCardGradient = (index: number) => {
      const gradients = [
          'from-indigo-500/10 to-purple-500/10 border-indigo-500/20',
          'from-emerald-500/10 to-teal-500/10 border-emerald-500/20',
          'from-orange-500/10 to-red-500/10 border-orange-500/20',
      ];
      return gradients[index % gradients.length];
  };

  const getTag = (index: number) => {
      const tags = ['SCIENCE', 'ENGINEERING', 'BUSINESS', 'HISTORY'];
      return tags[index % tags.length];
  }

  return (
    <Layout>
      {/* --- CINEMATIC TESSERACT INTRO OVERLAY --- */}
      <div className={`fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${showIntro ? 'opacity-100' : 'opacity-0 pointer-events-none scale-110'}`}>
           <div className="relative w-24 h-24 transform-style-3d animate-tesseract">
                {/* Outer Cube */}
                <div className="absolute inset-0 border-2 border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.4)] backdrop-blur-sm" style={{ transform: 'translateZ(48px)' }}></div>
                <div className="absolute inset-0 border-2 border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.4)] backdrop-blur-sm" style={{ transform: 'rotateY(90deg) translateZ(48px)' }}></div>
                <div className="absolute inset-0 border-2 border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.4)] backdrop-blur-sm" style={{ transform: 'rotateY(180deg) translateZ(48px)' }}></div>
                <div className="absolute inset-0 border-2 border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.4)] backdrop-blur-sm" style={{ transform: 'rotateY(-90deg) translateZ(48px)' }}></div>
                <div className="absolute inset-0 border-2 border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.4)] backdrop-blur-sm" style={{ transform: 'rotateX(90deg) translateZ(48px)' }}></div>
                <div className="absolute inset-0 border-2 border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.4)] backdrop-blur-sm" style={{ transform: 'rotateX(-90deg) translateZ(48px)' }}></div>
                
                {/* Inner Cube (Hypercube projection effect) */}
                <div className="absolute inset-6 border border-purple-400 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.6)]" style={{ transform: 'translateZ(24px)' }}></div>
                <div className="absolute inset-6 border border-purple-400 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.6)]" style={{ transform: 'rotateY(90deg) translateZ(24px)' }}></div>
                <div className="absolute inset-6 border border-purple-400 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.6)]" style={{ transform: 'rotateY(180deg) translateZ(24px)' }}></div>
                <div className="absolute inset-6 border border-purple-400 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.6)]" style={{ transform: 'rotateY(-90deg) translateZ(24px)' }}></div>
                <div className="absolute inset-6 border border-purple-400 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.6)]" style={{ transform: 'rotateX(90deg) translateZ(24px)' }}></div>
                <div className="absolute inset-6 border border-purple-400 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.6)]" style={{ transform: 'rotateX(-90deg) translateZ(24px)' }}></div>
           </div>
           
           <div className="mt-16 flex flex-col items-center space-y-3">
               <h2 className="text-2xl font-bold text-white tracking-[0.2em] animate-pulse">INITIALIZING</h2>
               <div className="flex items-center space-x-2 text-indigo-400 font-mono text-xs uppercase tracking-wider">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
                  <span>Loading Secure Workspace...</span>
               </div>
           </div>
      </div>
      
      {/* Styles for Tesseract */}
      <style>{`
          .transform-style-3d { transform-style: preserve-3d; }
          @keyframes spin-tesseract {
              0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
              100% { transform: rotateX(360deg) rotateY(720deg) rotateZ(360deg); }
          }
          .animate-tesseract {
              animation: spin-tesseract 12s linear infinite;
          }
      `}</style>

      {/* Main Dashboard Content - Fades in after intro */}
      <div className={`p-4 md:p-8 lg:p-12 h-full overflow-y-auto custom-scrollbar bg-[#020617] relative transition-opacity duration-1000 delay-500 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Ambient Background */}
        <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-900/10 blur-[80px] md:blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-900/10 blur-[80px] md:blur-[100px] rounded-full"></div>
        </div>

        {/* Header Section */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 md:mb-16 gap-4 md:gap-6 animate-fade-in-up relative z-10">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96 group">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl flex items-center transition-all group-focus-within:border-indigo-500/50 group-focus-within:shadow-lg">
                    <Search className="ml-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search your library..." 
                        className="w-full bg-transparent border-none py-3 md:py-4 px-4 text-slate-200 focus:outline-none placeholder:text-slate-600 font-medium"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3 md:gap-6 w-full lg:w-auto justify-between lg:justify-end">
                 
                 {/* Notification Bell */}
                 <button className="relative p-3 md:p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800 hover:text-white text-slate-400 transition-all hover:scale-105 active:scale-95 group">
                    <Bell size={20} className="group-hover:rotate-12 transition-transform" />
                    <span className="absolute top-2.5 right-2.5 md:top-3 md:right-3.5 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
                 </button>

                 {/* User Profile Pill */}
                 <div className="flex items-center gap-3 md:gap-4 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-1.5 md:p-2 pr-3 md:pr-4 hover:border-slate-700 transition-colors cursor-pointer group shadow-lg">
                     <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg relative overflow-hidden">
                        {user?.avatar ? (
                            <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                        ) : (
                            <span className="relative z-10">AR</span>
                        )}
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     </div>
                     <div className="hidden sm:flex flex-col items-start mr-1 md:mr-2">
                        <span className="text-sm font-bold text-white leading-tight">{user?.name || 'Alex Rivera'}</span>
                        <span className="text-[10px] text-indigo-400 font-bold tracking-wider uppercase flex items-center gap-1">
                            Premium <Sparkles size={8} />
                        </span>
                     </div>
                     <ChevronDown size={14} className="text-slate-500 group-hover:text-white transition-colors hidden sm:block" />
                 </div>

                 {/* Upload Button */}
                 <label className="cursor-pointer group relative overflow-hidden rounded-2xl shadow-lg shadow-indigo-500/20 ml-auto sm:ml-0">
                    <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-transform duration-300 group-hover:scale-110"></div>
                    <div className="relative flex items-center space-x-2 px-4 py-3 md:px-6 md:py-4 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                       <Plus size={20} strokeWidth={2.5} className="text-white" />
                       <span className="font-bold text-sm text-white hidden sm:inline">New Upload</span>
                    </div>
                </label>
            </div>
        </header>

        {/* Welcome Section */}
        <div className="mb-8 md:mb-12 animate-fade-in-up delay-100 relative z-10">
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 tracking-tight">
                Master your documents <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 animate-gradient-text">effortlessly.</span>
             </h1>
             <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
                Welcome back, Alex. Your AI workspace has processed <span className="text-white font-bold">{docs.length}</span> documents and identified <span className="text-white font-bold">12</span> new key insights today.
             </p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-20 animate-fade-in-up delay-200 relative z-10">
            {/* Sessions Card */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-[2rem] p-6 md:p-10 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 rotate-12">
                    <BookOpen size={100} className="text-indigo-500 md:w-[120px] md:h-[120px]" />
                 </div>
                 <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div className="p-3 md:p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                        <BookOpen size={24} className="md:w-7 md:h-7" />
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                        <TrendingUp size={12} /> +12%
                    </span>
                 </div>
                 <div>
                     <p className="text-slate-400 text-xs md:text-sm font-medium mb-1 uppercase tracking-wider">Sessions Completed</p>
                     <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{sessions.length || 24}</h3>
                 </div>
            </div>

            {/* Mastery Card */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-[2rem] p-6 md:p-10 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10">
                 <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div className="p-3 md:p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                        <Award size={24} className="md:w-7 md:h-7" />
                    </div>
                 </div>
                 <div>
                     <p className="text-slate-400 text-xs md:text-sm font-medium mb-1 uppercase tracking-wider">Subject Mastery</p>
                     <div className="flex items-end gap-2 md:gap-3 mb-3 md:mb-4">
                        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">82%</h3>
                        <span className="text-xs md:text-sm text-cyan-400 font-bold mb-1 md:mb-2">Excellent</span>
                     </div>
                     <div className="w-full bg-slate-800/50 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
                         <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-[82%] shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                     </div>
                 </div>
            </div>

             {/* Streak Card */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-[2rem] p-6 md:p-10 relative overflow-hidden group hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10 sm:col-span-2 lg:col-span-1">
                 <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div className="p-3 md:p-4 bg-orange-500/10 rounded-2xl text-orange-400 border border-orange-500/20 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                        <Flame size={24} className="md:w-7 md:h-7" />
                    </div>
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 uppercase tracking-widest animate-pulse">On Fire</span>
                 </div>
                 <div>
                     <p className="text-slate-400 text-xs md:text-sm font-medium mb-1 uppercase tracking-wider">Daily Streak</p>
                     <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 md:mb-6">12 <span className="text-base md:text-lg text-slate-500 font-normal">Days</span></h3>
                     <div className="flex gap-1.5 md:gap-2">
                        {[1,2,3,4,5,6,7].map(d => (
                            <div key={d} className={`h-1.5 md:h-2 flex-1 rounded-full transition-all duration-500 ${d <= 5 ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]' : 'bg-slate-800'}`}></div>
                        ))}
                     </div>
                 </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 animate-fade-in-up delay-300 relative z-10">
            <div className="lg:col-span-2 space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                     <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                        <Clock size={20} className="text-slate-500 md:w-6 md:h-6" />
                        Recent Study Materials
                     </h2>
                     <Link to="#" className="group flex items-center space-x-2 text-xs md:text-sm font-bold text-slate-400 hover:text-white transition-colors bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 hover:border-slate-700 w-full sm:w-auto justify-center">
                        <span>View All Library</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                     </Link>
                </div>
            
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                     {docs.length === 0 ? (
                         <label className="col-span-full cursor-pointer border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-[2rem] p-10 md:p-16 flex flex-col items-center justify-center text-slate-500 hover:text-indigo-400 transition-all duration-300 hover:bg-slate-900/50 group bg-slate-900/20">
                            <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                            <div className="mb-4 md:mb-6 p-4 md:p-6 rounded-full bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform duration-300 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 shadow-xl">
                                <UploadCloud size={40} className="opacity-50 group-hover:opacity-100 transition-opacity md:w-12 md:h-12" />
                            </div>
                            <span className="font-bold text-xl md:text-2xl group-hover:text-indigo-300 mb-2 text-center">Drop your first PDF here</span>
                            <span className="text-sm md:text-base opacity-60 text-center">Start your mastery journey with AI</span>
                        </label>
                     ) : (
                        <>
                        {docs.slice(0, 3).map((doc, idx) => {
                            const gradient = getCardGradient(idx);
                            const tag = getTag(idx);
                            
                            return (
                                <div key={doc.id} className="group relative bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-[2rem] overflow-hidden hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 flex flex-col h-full">
                                    <div className={`absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-[60px] md:blur-[80px] pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2`}></div>
                                    
                                    <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
                                        <div className="flex justify-between items-start mb-4 md:mb-6">
                                            <span className="text-[10px] font-bold px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/50 uppercase tracking-widest text-slate-400 group-hover:text-white group-hover:border-slate-600 transition-colors">
                                                {tag}
                                            </span>
                                            <button className="text-slate-600 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </div>

                                        <div className="flex-1">
                                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 md:mb-6 text-slate-400 group-hover:scale-105 group-hover:bg-slate-800/80 group-hover:text-indigo-400 transition-all duration-300 shadow-lg">
                                                <FileText size={24} className="md:w-8 md:h-8" />
                                            </div>
                                            <h3 className="font-bold text-lg md:text-xl text-slate-200 mb-2 line-clamp-2 leading-tight group-hover:text-white transition-colors">{doc.title}</h3>
                                            <div className="flex items-center text-[10px] md:text-xs text-slate-500 space-x-2 md:space-x-3 mb-4 md:mb-6 font-medium">
                                                <span className="flex items-center gap-1"><Clock size={12} className="md:w-3.5 md:h-3.5" /> Edited {idx === 0 ? '2h' : (idx === 1 ? '1d' : '3d')} ago</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                                <span>{doc.pageCount || 12} Pages</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 md:pt-6 border-t border-slate-800/50">
                                            <div className="flex justify-between items-end mb-2 md:mb-3">
                                                <span className="text-[10px] md:text-xs uppercase font-bold text-slate-500 tracking-wider">Progress</span>
                                                <span className="text-xs md:text-sm font-bold text-indigo-400">{doc.masteryScore || Math.floor(Math.random() * 80) + 10}%</span>
                                            </div>
                                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-4 md:mb-6">
                                                <div 
                                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 relative" 
                                                    style={{ width: `${doc.masteryScore || Math.floor(Math.random() * 80) + 10}%` }}
                                                >
                                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                </div>
                                            </div>
                                            
                                            <Link 
                                                to={`/workspace/${doc.id}`}
                                                className="w-full py-3 md:py-3.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs md:text-sm transition-all flex items-center justify-center group/btn border border-slate-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95"
                                            >
                                                <span className="mr-2">Continue Learning</span>
                                                <Sparkles size={14} className="opacity-0 group-hover/btn:opacity-100 transition-opacity -ml-4 group-hover/btn:ml-0 md:w-4 md:h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        </>
                     )}
                </div>
            </div>
            <div className="lg:col-span-1 space-y-8">
                <Leaderboard />
                <ProductivityHealthScore score={85} />
                <SmartStudyChallenges />
            </div>
        </div>

        {/* Upload Progress Modal */}
        <DailyIntentionModal isOpen={intentionModalOpen} onClose={() => setIntentionModalOpen(false)} />
        {uploadModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Uploading Document</h3>
              
              {processingState.error ? (
                <div className="flex flex-col items-center">
                  <XCircle size={48} className="text-red-500 mb-4" />
                  <p className="text-red-400 font-medium text-center mb-6">{processingState.error}</p>
                  <button 
                    onClick={() => setUploadModalOpen(false)}
                    className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : processingState.progress === 100 ? (
                <div className="flex flex-col items-center">
                  <CheckCircle2 size={48} className="text-emerald-500 mb-4" />
                  <p className="text-emerald-400 font-medium text-center mb-6">Document processed successfully!</p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                    <button 
                      onClick={() => setUploadModalOpen(false)}
                      className="flex-1 py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors text-sm md:text-base"
                    >
                      Go to Dashboard
                    </button>
                    <button 
                      onClick={() => {
                        setUploadModalOpen(false);
                        navigate(`/workspace/${processingState.docId}`);
                      }}
                      className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors text-sm md:text-base"
                    >
                      View Document
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Loader2 size={48} className="text-indigo-500 animate-spin mb-4" />
                  <p className="text-slate-300 font-medium text-center mb-2">{processingState.status}</p>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                    <div 
                      className="h-full bg-indigo-500 transition-all duration-300"
                      style={{ width: `${processingState.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-slate-500 text-sm">{Math.round(processingState.progress)}%</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};