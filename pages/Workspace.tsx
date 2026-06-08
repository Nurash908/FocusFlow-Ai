import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PDFViewer } from '../components/PDFViewer';
import { Timer } from '../components/Timer';
import { getDocument, getMessages, addMessage, updateDocument } from '../services/storage';
import { getFile } from '../services/fileStorage'; 
import { chatWithPDF, generateSpeech, transcribeAudio, generateDocumentSummary } from '../services/gemini';
import { Document, Message, Attachment, Citation, StudyTask } from '../types';
import { 
  Send, Bot, User as UserIcon, Timer as TimerIcon, ArrowLeft, Search, X, 
  Mic, Brain, Volume2, StopCircle, Paperclip, Sparkles, FileText, 
  ChevronRight, Bookmark, MoreVertical, MapPin, ZoomIn, ZoomOut, Maximize2,
  ChevronLeft, Loader2, Target, CheckCircle2, ChevronDown, ChevronUp
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DEMO_PDF_URL } from '../constants';
import { BrandedLogo } from '../components/BrandedLogo';

export const Workspace: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doc, setDoc] = useState<Document | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Initialize to null to show loading state instead of demo content immediately
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  
  // Tab Navigation State
  const [activeTab, setActiveTab] = useState<'overview' | 'chat' | 'recall' | 'quiz' | 'progress'>('overview');
  
  // --- STATE FOR FUTURISTIC UPGRADES ---
  const [selectedBrainNode, setSelectedBrainNode] = useState<string | null>(null);
  const [smartCorePhrase, setSmartCorePhrase] = useState<string>("Ready to visual scan material. Click me to trigger core neural checkups.");
  const [orbPulsing, setOrbPulsing] = useState(false);
  const [isOrbSpeaking, setIsOrbSpeaking] = useState(false);
  const [isManualScanning, setIsManualScanning] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'info' | 'error' | 'success'} | null>(null);

  const showToast = (message: string, type: 'info' | 'error' | 'success' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(prev => (prev?.message === message ? null : prev));
    }, 4500);
  };

  const SMARTCORE_PHRASES = [
    "Document structures assimilated. Dynamic mastery rings are highly optimistic.",
    "Gap Warning: Spacing Interval Mechanics show a critical frequency drop on page 2.",
    "Memory consolidation sequence active. Generating interactive flashcards now.",
    "Active recall loops locked in. Your 5-day streak is driving permanent long-term potentiation.",
    "Jarvis-level tutor core initialized. Ask me any question in the Ask AI tab.",
    "I have synchronized your visual progress. Selected brain map nodes are ready for repair.",
    "Focus mode initialized. I am silencing peripheral background noise for deep absorption."
  ];

  const triggerSmartCorePhrase = () => {
    const randomPhrase = SMARTCORE_PHRASES[Math.floor(Math.random() * SMARTCORE_PHRASES.length)];
    setSmartCorePhrase(randomPhrase);
    setOrbPulsing(true);
    
    // Web Speech API with sandbox-friendly iframe check
    let speechSucceeded = false;
    try {
      if ('speechSynthesis' in window && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(randomPhrase);
        utterance.pitch = 1.15;
        utterance.rate = 1.05;
        utterance.onstart = () => setIsOrbSpeaking(true);
        utterance.onend = () => {
          setIsOrbSpeaking(false);
          setOrbPulsing(false);
        };
        utterance.onerror = () => {
          setIsOrbSpeaking(false);
          setOrbPulsing(false);
        };
        
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Natural") || v.lang.startsWith("en"));
        if (preferredVoice) utterance.voice = preferredVoice;
        
        window.speechSynthesis.speak(utterance);
        speechSucceeded = true;
      }
    } catch (e) {
      console.warn("Speech synthesis initialization bypassed due to sandbox/iframe restrictions:", e);
    }

    if (!speechSucceeded) {
      setIsOrbSpeaking(true);
      setTimeout(() => {
        setIsOrbSpeaking(false);
        setOrbPulsing(false);
      }, 3500);
    }
  };
  
  // Interactive Flashcard (Recall) State
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [recallMastery, setRecallMastery] = useState(65); // Percentage
  const [studyStreak, setStudyStreak] = useState(5); // 🔥 5 Days
  const [cardsReviewed, setCardsReviewed] = useState(12);
  
  // High-fidelity dynamic flashcards matching SmartNotes philosophy
  const [flashcards, setFlashcards] = useState([
    { question: "What is neuroplasticity?", answer: "The brain's ability to reorganize itself by forming new neural connections throughout life, responding to learning or injury." },
    { question: "How does active recall differ from passive reading?", answer: "Active recall forces the brain to retrieve information from memory, strengthening synaptic connections more effectively than passive re-reading." },
    { question: "What is the spacing effect?", answer: "The phenomenon where learning is highly effective when study sessions are spaced out over time rather than crammed into a single session." },
    { question: "Define long-term potentiation (LTP).", answer: "A persistent strengthening of synapses based on recent patterns of activity, which are widely considered one of the major cellular mechanisms underlying learning and memory." },
    { question: "Explain the memory consolidation process.", answer: "The cognitive process where short-term unstable memories are transformed and hardened into permanent, long-term storage." }
  ]);

  // Interactive Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  
  const quizQuestions = [
    {
      prompt: "Which studying technique forces your brain to retrieve knowledge directly, producing the strongest memory consolidation?",
      options: [
        "Re-reading highlighted textbook pages",
        "Passive listening to recorded lectures",
        "Active recall and testing without referencing notes",
        "Creating beautiful, color-coded mind-maps"
      ],
      correctIndex: 2,
      explanation: "Active recall forces cognitive retrieval, creating stronger long-term synaptic consolidation compared to passive study techniques like re-reading."
    },
    {
      prompt: "What is the cognitive benefit of spacing learning sessions over time rather than cramming?",
      options: [
        "It triggers the Spacing Effect, counteracting the Forgetting Curve",
        "It shortens long-term memory retrieval times to near-zero",
        "It eliminates the need for active recall metrics",
        "It reduces the cognitive load of subsequent chapters by exactly 50%"
      ],
      correctIndex: 0,
      explanation: "The Spacing Effect aids memory retention by forcing neurons to reactivate paths periodically, slowing the natural rate of the forgetting curve."
    },
    {
      prompt: "Under cellular mechanisms, what is the term for a persistent strengthening of synapses based on patterns of activity?",
      options: [
        "Myelination accelerator",
        "Long-term potentiation (LTP)",
        "Axonal consolidation",
        "Synaptic pruning index"
      ],
      correctIndex: 1,
      explanation: "Long-term potentiation (LTP) is a persistent strengthening of chemical synapses, acting as the foundation of learning and memory formation."
    }
  ];
  
  // PDF State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [highlightText, setHighlightText] = useState<string>('');
  const [scale, setScale] = useState(1.2);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Workspace State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeEvidence, setActiveEvidence] = useState<Citation[]>([]);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [nativePageDims, setNativePageDims] = useState<{width: number, height: number}>({ width: 0, height: 0 });
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  
  // Focus Mode State
  const [showFocusWidget, setShowFocusWidget] = useState(false);
  const [focusTasks, setFocusTasks] = useState<StudyTask[]>([
      { id: '1', text: 'Read Introduction and Abstract', completed: false },
      { id: '2', text: 'Identify Key Methodology', completed: false },
      { id: '3', text: 'Review Conclusion', completed: false },
  ]);
  
  // AI/Input State
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [playingMsgId, setPlayingMsgId] = useState<string | null>(null);
  
  // Processing State
  const [processingState, setProcessingState] = useState<{status: string, progress: number} | null>(null);
  
  // Summary State
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [documentSummary, setDocumentSummary] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (id) {
      const d = getDocument(id);
      setDoc(d);
      if (d?.aiSummary) {
          setDocumentSummary(d.aiSummary);
      }
      
      // Handle PDF Loading Logic
      if (d) {
          if (d.id === 'demo-1') {
              setPdfUrl(DEMO_PDF_URL);
          } else {
              setPdfUrl(null); 
              getFile(d.id).then(blob => {
                  if (blob) {
                      const url = URL.createObjectURL(blob);
                      setPdfUrl(url);
                  } else {
                      console.error("File blob not found for document:", d.id);
                  }
              }).catch(err => {
                  console.error("Error retrieving file:", err);
              });
          }
      }

      const msgs = getMessages(id);
      setMessages(msgs);
      
      const lastMsgWithCitations = [...msgs].reverse().find(m => m.citations && m.citations.length > 0);
      if (lastMsgWithCitations && lastMsgWithCitations.citations) {
          setActiveEvidence(lastMsgWithCitations.citations);
      }

      if (d && d.status === 'processing') {
          const interval = setInterval(() => {
              const progressStr = sessionStorage.getItem(`ingest_progress_${id}`);
              if (progressStr) {
                  const p = JSON.parse(progressStr);
                  setProcessingState(p);
                  if (p.progress >= 100) {
                      clearInterval(interval);
                      sessionStorage.removeItem(`ingest_progress_${id}`);
                      setProcessingState(null);
                      const updated = getDocument(id);
                      setDoc(updated);
                  }
              }
          }, 500);
          return () => clearInterval(interval);
      }
    }
    
    return () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
        }
    };
  }, [id]);

  useEffect(() => {
    if (!searchQuery) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, searchQuery]);

  useEffect(() => {
     if (totalPages > 0) {
         const baseProgress = ((currentPage - 1) / totalPages) * 100;
         setScrollProgress(baseProgress);
     }
  }, [currentPage, totalPages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!input.trim() && attachments.length === 0) || !doc || !id) return;

    if (searchQuery) setSearchQuery('');

    const currentAttachments = [...attachments];
    setAttachments([]); 

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
      attachments: currentAttachments.length > 0 ? currentAttachments : undefined,
      isThinking: isThinkingMode
    };

    setMessages(prev => [...prev, userMsg]);
    addMessage(id, userMsg);
    setInput('');
    setLoading(true);

    const result = await chatWithPDF(userMsg.content, doc.id, currentAttachments, isThinkingMode);
    
    const citations = result.citation ? [{
        page: result.page,
        text: result.citation
    }] : undefined;

    const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: result.text,
        timestamp: Date.now(),
        citations: citations
    };

    setMessages(prev => [...prev, aiMsg]);
    addMessage(id, aiMsg);
    
    if (citations) {
        setActiveEvidence(citations);
        setShowRightPanel(true);
    }
    
    setLoading(false);
  };

  const handleCitationClick = (page: number, text: string) => {
    setCurrentPage(page);
    setHighlightText(text);
  };

  const handleGenerateSummary = async () => {
    if (!id || isGeneratingSummary) return;
    setIsGeneratingSummary(true);
    setIsSummaryExpanded(true);
    
    try {
        const summary = await generateDocumentSummary(id);
        setDocumentSummary(summary);
        updateDocument(id, { aiSummary: summary });
    } catch (error) {
        console.error("Failed to generate summary:", error);
    } finally {
        setIsGeneratingSummary(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
              const base64String = reader.result as string;
              const base64Data = base64String.split(',')[1];
              setAttachments(prev => [...prev, {
                  type: file.type.startsWith('audio') ? 'audio' : 'image',
                  url: base64String,
                  data: base64Data,
                  mimeType: file.type
              }]);
          };
          reader.readAsDataURL(file);
      }
      if (e.target) {
          e.target.value = '';
      }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handlePDFScroll = (scrollTop: number, scrollHeight: number, clientHeight: number) => {
      const scrollableHeight = scrollHeight - clientHeight;
      const pagePercent = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
      const total = totalPages || 1;
      const globalProgress = ((currentPage - 1) + pagePercent) / total;
      
      setScrollProgress(Math.min(100, Math.max(0, globalProgress * 100)));
  };

  const handleDocumentLoad = (numPages: number) => {
      setTotalPages(numPages);
      setIsManualScanning(true);
      setTimeout(() => {
          setIsManualScanning(false);
      }, 4000);
  };

  const changePage = (delta: number) => {
      const newPage = currentPage + delta;
      if (newPage >= 1 && newPage <= totalPages) {
          setCurrentPage(newPage);
      }
  };

  const fitToWidth = () => {
    if (viewerContainerRef.current && nativePageDims.width > 0) {
        const containerWidth = viewerContainerRef.current.clientWidth - 40;
        setScale(containerWidth / nativePageDims.width);
    }
  };

  const fitToHeight = () => {
    if (viewerContainerRef.current && nativePageDims.height > 0) {
        const containerHeight = viewerContainerRef.current.clientHeight - 40;
        setScale(containerHeight / nativePageDims.height);
    }
  };

  const handlePageChangeSuccess = (width: number, height: number) => {
      setNativePageDims({ width, height });
  };

  const startRecording = async () => {
      try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const recorder = new MediaRecorder(stream);
          const chunks: BlobPart[] = [];

          recorder.ondataavailable = (e) => {
              if (e.data.size > 0) chunks.push(e.data);
          };

          recorder.onstop = async () => {
              setIsTranscribing(true);
              const blob = new Blob(chunks, { type: 'audio/webm' });
              
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = async () => {
                  const base64String = reader.result as string;
                  const base64Data = base64String.split(',')[1];
                  
                  try {
                    const text = await transcribeAudio(base64Data, 'audio/webm');
                    if (text) {
                        setInput(prev => prev + (prev ? ' ' : '') + text);
                    }
                  } catch (e) {
                      console.error("Transcription failed", e);
                  } finally {
                      setIsTranscribing(false);
                  }
              };
              stream.getTracks().forEach(track => track.stop());
          };

          mediaRecorderRef.current = recorder;
          recorder.start();
          setIsRecording(true);
      } catch (err) {
          console.error("Microphone access denied:", err);
          showToast("Could not access microphone. Please check your permissions.", "error");
      }
  };

  const stopRecording = () => {
      if (mediaRecorderRef.current && isRecording) {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
      }
  };

  const toggleRecording = () => {
      if (isRecording) {
          stopRecording();
      } else {
          startRecording();
      }
  };
  
  const toggleTask = (taskId: string) => {
    setFocusTasks(focusTasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };
  
  const handleTimerComplete = () => {
      // Could play a sound or show a notification
      showToast("Focus Session Complete! Take a break.", "success");
  };

  const filteredMessages = messages.filter(m => 
      m.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!doc) return <div className="text-white p-10 flex items-center justify-center h-screen bg-slate-950">Loading workspace...</div>;

  return (
    <div className="flex flex-col h-screen bg-slate-950 overflow-hidden text-slate-200">
        {/* Toast Notification Container */}
        {notification && (
            <div className={`fixed top-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-all duration-300 animate-scale-in bg-slate-900 ${
                notification.type === 'error' 
                ? 'border-red-500/40 text-red-200 shadow-red-950/20' 
                : notification.type === 'success'
                   ? 'border-emerald-500/40 text-emerald-200 shadow-emerald-950/20'
                   : 'border-indigo-500/40 text-indigo-200 shadow-indigo-950/20'
            }`}>
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                    notification.type === 'error' ? 'bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : notification.type === 'success' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]'
                }`}></div>
                <span className="text-xs font-semibold tracking-wide">{notification.message}</span>
                <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white ml-2 transition-colors">
                    <X size={14} />
                </button>
            </div>
        )}
        
        {/* --- Top Header --- */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-50 relative shadow-md">
            <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                    <BrandedLogo size="sm" withText={true} />
                </Link>
                <div className="h-6 w-px bg-slate-800"></div>
                <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-slate-800 rounded text-indigo-400">
                        <FileText size={16} />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-slate-100 max-w-[200px] truncate">{doc.title}</h1>
                        <p className="text-[10px] text-slate-500 font-mono">PDF • {doc.pageCount || totalPages} PAGES</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                 <button 
                    onClick={() => setShowFocusWidget(!showFocusWidget)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold shadow-lg transition-all active:scale-95 border ${
                        showFocusWidget 
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-500/20' 
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                 >
                    <TimerIcon size={16} className={showFocusWidget ? "animate-pulse" : ""} />
                    <span>{showFocusWidget ? "Active Session" : "Focus Mode"}</span>
                 </button>
                 
                 <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                    AR
                 </div>
            </div>

            {/* Enhanced Scroll Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-800">
                <div 
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(99,102,241,0.8)] relative"
                    style={{ width: `${scrollProgress}%` }}
                >
                    <div className="absolute right-0 top-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-75 border-2 border-indigo-500"></div>
                </div>
            </div>
        </header>


        {/* --- CUSTOM FUTURISTIC ANIMATIONS BLOCK --- */}
        <style>{`
          @keyframes laser-scan-y {
            0%, 100% { transform: translateY(0%); opacity: 0.2; }
            50% { transform: translateY(500%); opacity: 0.8; }
          }
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes spin-reverse {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }
          @keyframes hologram-flicker {
            0%, 100% { opacity: 0.96; filter: hue-rotate(0deg); }
            33% { opacity: 0.88; filter: contrast(1.05); }
            66% { opacity: 0.92; filter: saturate(1.1); }
            75% { opacity: 0.7; filter: blur(0.3px); }
          }
          @keyframes neural-flow {
            0% { stroke-dashoffset: 24; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes broken-node-flicker {
            0%, 100% { opacity: 0.2; transform: scale(0.95); filter: drop-shadow(0 0 1px rgba(234,179,8,0.2)); }
            50% { opacity: 0.8; transform: scale(1.05); filter: drop-shadow(0 0 12px rgba(234,179,8,0.8)); }
            70% { opacity: 0.3; }
            80% { opacity: 0.9; }
          }
          @keyframes node-cyan-glow {
            0%, 100% { filter: drop-shadow(0 0 3px rgba(6,182,212,0.4)); transform: scale(1); }
            50% { filter: drop-shadow(0 0 12px rgba(6,182,212,0.8)); transform: scale(1.05); }
          }
          @keyframes node-purple-glow {
            0%, 100% { filter: drop-shadow(0 0 3px rgba(168,85,247,0.4)); transform: scale(1); }
            50% { filter: drop-shadow(0 0 12px rgba(168,85,247,0.8)); transform: scale(1.05); }
          }
          .animate-laser-scan-y {
            animation: laser-scan-y 6s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          .animate-spin-reverse {
            animation: spin-reverse 15s linear infinite;
          }
          .animate-hologram-flicker {
            animation: hologram-flicker 6s ease-in-out infinite;
          }
          .animate-broken-node {
            animation: broken-node-flicker 2.5s infinite;
          }
          .animate-cyan-node {
            animation: node-cyan-glow 3s ease-in-out infinite;
          }
          .animate-purple-node {
            animation: node-purple-glow 3.5s ease-in-out infinite;
          }
          .neural-line-active {
            stroke-dasharray: 6, 6;
            animation: neural-flow 2s linear infinite;
          }
        `}</style>

        {/* --- Main Workspace Grid --- */}
        <div className="flex-1 flex overflow-hidden">
            
            {/* 1. Left Panel: Learn Workspace Sidebar */}
            <div className={`w-[450px] flex flex-col border-r border-slate-800 bg-slate-950 relative z-10 transition-all duration-500 ease-in-out ${showFocusWidget ? 'w-0 -translate-x-[450px] opacity-0 overflow-hidden border-r-0' : ''}`}>
                
                {/* Visual SmartCore AI Orb Console Banner */}
                <div className="p-4 bg-slate-900/60 border-b border-slate-800/80 hover:bg-slate-900/85 transition-all flex items-center space-x-4 relative overflow-hidden group select-none">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/5 blur-2xl rounded-full pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-700"></div>
                    
                    {/* The glowing orb nucleus */}
                    <div 
                        onClick={triggerSmartCorePhrase}
                        className="relative w-14 h-14 flex items-center justify-center cursor-pointer flex-shrink-0"
                        title="Interact with SmartCore AI"
                    >
                        <div className={`absolute inset-0 rounded-full border border-purple-500/40 animate-pulse ${isGeneratingSummary || orbPulsing || isManualScanning ? 'border-indigo-400 border-dashed animate-spin-slow' : ''}`}></div>
                        <div className={`absolute w-10 h-10 rounded-full border border-dashed border-cyan-400/30 animate-spin-reverse ${isGeneratingSummary || orbPulsing || isManualScanning ? 'border-purple-400/60' : ''}`}></div>
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 shadow-[0_0_15px_rgba(168,85,247,0.7)] relative transition-all duration-300 group-hover:scale-105 flex items-center justify-center ${orbPulsing || isOrbSpeaking ? 'scale-105 shadow-[0_0_25px_rgba(99,102,241,1)] bg-gradient-to-r from-indigo-400 to-cyan-400' : ''}`}>
                            <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></div>
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-black tracking-widest text-[#a8b2d1] font-mono uppercase">SmartCore AI Orb</span>
                            <span className={`w-2 h-2 rounded-full ${isGeneratingSummary || orbPulsing || isManualScanning ? 'bg-indigo-400 animate-ping' : 'bg-emerald-500'} border border-black`}></span>
                        </div>
                        <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider font-mono mt-0.5">
                            {isGeneratingSummary || isManualScanning ? "[ SCHEMATICS SCAN IN METASYSTEM... ]" : isOrbSpeaking ? "[ ORAL MATRIX VOICE BROADCAST... ]" : "[ ORB INTELLIGENCE: ONLINE ]"}
                        </p>
                        <div className="mt-0.5 font-sans text-[11px] text-slate-400 line-clamp-2 leading-tight transition-colors group-hover:text-slate-300">
                            "{smartCorePhrase}"
                        </div>
                    </div>
                </div>

                {/* Scientific/Cinematic Tab Navigation styled as Holographic command plates */}
                <div className="flex border-b border-slate-800/80 bg-slate-900/40 p-1.5 justify-between items-center select-none gap-1">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`flex-1 flex flex-col items-center py-2 px-1 rounded-xl transition-all relative border ${
                            activeTab === 'overview' 
                            ? 'text-indigo-400 bg-indigo-500/5 border-indigo-500/40 shadow-[0_0_10px_rgba(99,102,241,0.15)] font-bold' 
                            : 'text-slate-400 border-transparent hover:text-slate-300 hover:bg-slate-900/50'
                        }`}
                    >
                        <FileText size={15} className="mb-1 text-slate-400 group-hover:text-indigo-400" />
                        <span className="text-[9px] font-bold tracking-widest uppercase font-mono">Synopsis</span>
                    </button>

                    <button 
                        onClick={() => setActiveTab('chat')}
                        className={`flex-1 flex flex-col items-center py-2 px-1 rounded-xl transition-all relative border ${
                            activeTab === 'chat' 
                            ? 'text-indigo-400 bg-indigo-500/5 border-indigo-500/40 shadow-[0_0_10px_rgba(99,102,241,0.15)] font-bold' 
                            : 'text-slate-400 border-transparent hover:text-slate-300 hover:bg-slate-900/50'
                        }`}
                    >
                        <Bot size={15} className="mb-1 text-slate-400 group-hover:text-indigo-400" />
                        <span className="text-[9px] font-bold tracking-widest uppercase font-mono">Ask AI</span>
                    </button>

                    <button 
                        onClick={() => setActiveTab('recall')}
                        className={`flex-1 flex flex-col items-center py-2 px-1 rounded-xl transition-all relative border ${
                            activeTab === 'recall' 
                            ? 'text-indigo-400 bg-indigo-500/5 border-indigo-500/40 shadow-[0_0_10px_rgba(99,102,241,0.15)] font-bold' 
                            : 'text-slate-400 border-transparent hover:text-slate-300 hover:bg-slate-900/50'
                        }`}
                    >
                        <Brain size={15} className="mb-1 text-slate-400 group-hover:text-indigo-400" />
                        <span className="text-[9px] font-bold tracking-widest uppercase font-mono">Recall</span>
                    </button>

                    <button 
                        onClick={() => setActiveTab('quiz')}
                        className={`flex-1 flex flex-col items-center py-2 px-1 rounded-xl transition-all relative border ${
                            activeTab === 'quiz' 
                            ? 'text-indigo-400 bg-indigo-500/5 border-indigo-500/40 shadow-[0_0_10px_rgba(99,102,241,0.15)] font-bold' 
                            : 'text-slate-400 border-transparent hover:text-slate-300 hover:bg-slate-900/50'
                        }`}
                    >
                        <Target size={15} className="mb-1 text-slate-400 group-hover:text-indigo-400" />
                        <span className="text-[9px] font-bold tracking-widest uppercase font-mono">Sprint</span>
                    </button>

                    <button 
                        onClick={() => setActiveTab('progress')}
                        className={`flex-1 flex flex-col items-center py-2 px-1 rounded-xl transition-all relative border ${
                            activeTab === 'progress' 
                            ? 'text-indigo-400 bg-indigo-500/5 border-indigo-500/40 shadow-[0_0_10px_rgba(99,102,241,0.15)] font-bold' 
                            : 'text-slate-400 border-transparent hover:text-slate-300 hover:bg-slate-900/50'
                        }`}
                    >
                        <Sparkles size={15} className="mb-1" />
                        <span className="text-[9px] font-bold tracking-widest uppercase font-mono">Mastery</span>
                    </button>
                </div>

                {/* Tab Contents */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* --- TAB: OVERVIEW --- */}
                    {activeTab === 'overview' && (
                        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar animate-fade-in">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                    <FileText size={16} className="text-indigo-400" /> Document Synopsis
                                </h2>
                                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-mono border border-indigo-500/20 uppercase tracking-widest">Auto Study Ready</span>
                            </div>

                            {documentSummary ? (
                                <div className="space-y-4">
                                    <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 leading-relaxed text-sm text-slate-300">
                                        <div className="text-sm text-slate-300 leading-relaxed space-y-4 [&>h1]:text-lg [&>h1]:font-bold [&>h1]:text-white [&>h2]:text-base [&>h2]:font-bold [&>h2]:text-white [&>p]:mb-2">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{documentSummary}</ReactMarkdown>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={handleGenerateSummary}
                                        disabled={isGeneratingSummary}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-slate-700 bg-slate-900/30 text-xs text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all"
                                    >
                                        {isGeneratingSummary ? (
                                            <><Loader2 size={12} className="animate-spin" /> Regenerating Synapses...</>
                                        ) : (
                                            <><Sparkles size={12} /> Regenerate Summary</>
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <div className="rounded-2xl p-6 bg-gradient-to-br from-indigo-950/40 via-slate-900/50 to-purple-950/10 border border-indigo-500/20 text-center relative overflow-hidden group shadow-2xl animate-fade-in">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-xl rounded-full"></div>
                                    <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                                        <Sparkles size={20} className="text-indigo-400 animate-pulse" />
                                    </div>
                                    <h3 className="text-base font-bold text-slate-100 mb-2">Synthesize Smart Overview</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed mb-5 max-w-[280px] mx-auto">
                                        Unlock key summaries, foundational concepts, and core educational topics for this material instantly.
                                    </p>
                                    <button 
                                        onClick={handleGenerateSummary}
                                        disabled={isGeneratingSummary}
                                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_4px_20px_rgba(99,102,241,0.6)] active:scale-95"
                                    >
                                        {isGeneratingSummary ? (
                                            <><Loader2 size={14} className="animate-spin" /> Synthesizing Materials...</>
                                        ) : (
                                            <><Sparkles size={14} /> Begin Document Analysis</>
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* Core Concepts Bento Section */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Key Cognitive Themes</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-indigo-500/30 transition-all shadow-md">
                                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 mb-2"></div>
                                        <h4 className="text-xs font-bold text-slate-200 mb-1">Retrieval Coding</h4>
                                        <p className="text-[10px] text-slate-500 leading-normal">Deep reinforcement of memory consolidations without prompt cards.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-purple-500/30 transition-all shadow-md">
                                        <div className="w-2.5 h-2.5 rounded-full bg-purple-500 mb-2"></div>
                                        <h4 className="text-xs font-bold text-slate-200 mb-1">Synaptic Strength</h4>
                                        <p className="text-[10px] text-slate-500 leading-normal">LTP development as permanent biological data pathways.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Dynamic Terminologies Section */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Study Priorities</h3>
                                <div className="space-y-2">
                                    {focusTasks.map(task => (
                                        <div 
                                            key={task.id}
                                            onClick={() => toggleTask(task.id)}
                                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                                                task.completed 
                                                ? 'bg-green-500/5 border-green-500/30' 
                                                : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500 text-slate-950' : 'border-slate-700'}`}>
                                                    {task.completed && <CheckCircle2 size={10} strokeWidth={3} />}
                                                </div>
                                                <span className={`text-xs ${task.completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{task.text}</span>
                                            </div>
                                            <span className={`text-[9px] font-bold uppercase tracking-wider ${task.completed ? 'text-green-500' : 'text-slate-600'}`}>{task.completed ? 'Acquired' : 'Target'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- TAB: ASK AI --- */}
                    {activeTab === 'chat' && (
                        <div className="flex-1 flex flex-col overflow-hidden animate-fade-in bg-slate-950">
                            {/* Messages List */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar scroll-smooth">
                                {filteredMessages.length === 0 && !processingState && (
                                    <div className="mt-20 text-center px-8">
                                        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-800 shadow-lg">
                                            <BrandedLogo size="md" withText={false} />
                                        </div>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            Hello! I'm ready to help you master this document. Ask me anything or request a summary to get started.
                                        </p>
                                    </div>
                                )}

                                {filteredMessages.map((msg, idx) => (
                                    <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in-up`}>
                                        <div className={`flex items-center space-x-2 mb-2 text-[10px] font-bold uppercase tracking-wider ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                            <div className={`w-6 h-6 rounded flex items-center justify-center ${msg.role === 'user' ? 'bg-indigo-900/50 text-indigo-300' : 'bg-slate-800 text-green-400'}`}>
                                                {msg.role === 'user' ? <UserIcon size={12} /> : <Bot size={12} />}
                                            </div>
                                            <span className="text-slate-500">{msg.role === 'user' ? 'You' : 'SmartNotes AI'}</span>
                                        </div>

                                        <div className={`max-w-[90%] p-4 text-sm leading-relaxed shadow-md ${
                                            msg.role === 'user' 
                                                ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl rounded-tr-sm animate-scale-in' 
                                                : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-2xl rounded-tl-sm animate-scale-in'
                                        }`}>
                                            {msg.content}
                                            
                                            {msg.attachments && (
                                                <div className="mt-3 flex gap-2">
                                                    {msg.attachments.map((a, i) => (
                                                        <div key={i} className="text-xs bg-black/20 px-2 py-1 rounded flex items-center">
                                                            <Paperclip size={10} className="mr-1" /> Attached Media
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {msg.role === 'ai' && msg.citations && msg.citations.length > 0 && (
                                            <div className="mt-2 flex gap-2 ml-1">
                                                {msg.citations.map((cit, i) => (
                                                    <button 
                                                        key={i}
                                                        onClick={() => handleCitationClick(cit.page, cit.text)}
                                                        className="flex items-center space-x-1 bg-slate-900 border border-slate-700 hover:border-indigo-500 text-indigo-400 hover:text-indigo-300 px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-all"
                                                    >
                                                        <MapPin size={10} />
                                                        <span>Page {cit.page}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                
                                {loading && (
                                    <div className="flex items-start space-x-3 animate-pulse">
                                         <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-indigo-400">
                                            <Bot size={12} />
                                         </div>
                                         <div className="flex space-x-1 items-center h-6">
                                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
                                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-100"></div>
                                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
                                         </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Chat Input Toolbar Area */}
                            <div className="p-4 bg-slate-950 border-t border-slate-800/80">
                                {attachments.length > 0 && (
                                    <div className="flex gap-3 mb-3 overflow-x-auto pb-2 custom-scrollbar">
                                        {attachments.map((att, i) => (
                                            <div key={i} className="relative group flex-shrink-0">
                                                <div className="w-20 h-20 rounded-xl border border-slate-700 bg-slate-900 overflow-hidden flex items-center justify-center animate-scale-in">
                                                    {att.type === 'image' ? (
                                                        <img src={att.url} alt="Attachment" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                                            <Volume2 size={24} className="mb-1 text-indigo-400" />
                                                            <span className="text-[10px] font-mono uppercase">Audio</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <button 
                                                    onClick={() => removeAttachment(i)}
                                                    className="absolute -top-2 -right-2 bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-red-500 hover:border-red-500 rounded-full p-1 shadow-lg transition-all"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <form 
                                    onSubmit={handleSendMessage}
                                    className="bg-slate-900 border border-slate-800 rounded-2xl p-2 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all shadow-lg"
                                >
                                    <input 
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={isRecording ? "Listening..." : isTranscribing ? "Transcribing audio..." : "Ask about the text..."}
                                        disabled={isRecording || isTranscribing}
                                        className={`w-full bg-transparent text-sm text-slate-200 px-3 py-2 focus:outline-none placeholder:text-slate-600 ${isRecording ? 'placeholder:text-red-400 placeholder:animate-pulse' : ''}`}
                                    />
                                    <div className="flex justify-between items-center mt-2 px-1">
                                        <div className="flex items-center space-x-1">
                                            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors">
                                                <Paperclip size={16} />
                                            </button>
                                            <button type="button" onClick={() => setIsThinkingMode(!isThinkingMode)} className={`p-2 rounded-lg transition-colors ${isThinkingMode ? 'text-purple-400 bg-purple-400/10' : 'text-slate-500 hover:text-purple-400 hover:bg-slate-800'}`}>
                                                <Brain size={16} />
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={toggleRecording} 
                                                className={`p-2 rounded-lg transition-all duration-300 ${
                                                    isRecording 
                                                    ? 'bg-red-500/10 text-red-500 animate-pulse border border-red-500/30' 
                                                    : isTranscribing
                                                        ? 'bg-slate-800 text-indigo-400'
                                                        : 'text-slate-500 hover:text-indigo-400 hover:bg-slate-800'
                                                }`}
                                                title={isRecording ? "Stop Recording" : "Record Audio"}
                                            >
                                                {isRecording ? (
                                                    <StopCircle size={16} fill="currentColor" />
                                                ) : isTranscribing ? (
                                                    <Loader2 size={16} className="animate-spin" />
                                                ) : (
                                                    <Mic size={16} />
                                                )}
                                            </button>
                                        </div>
                                        <button 
                                            type="submit" 
                                            disabled={(!input.trim() && attachments.length === 0) || isRecording || isTranscribing}
                                            className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl transition-all disabled:opacity-50 disabled:hover:bg-indigo-600 shadow-md"
                                        >
                                            <Send size={16} />
                                        </button>
                                    </div>
                                </form>
                                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} />
                            </div>
                        </div>
                    )}

                    {/* --- TAB: RECALL (FLASHCARDS Engine) --- */}
                    {activeTab === 'recall' && (
                        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar animate-fade-in text-slate-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                    <Brain size={16} className="text-indigo-400" /> Active Recall Deck
                                </h2>
                                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2.5 py-0.5 rounded font-mono border border-indigo-500/20">🔥 {studyStreak} DAY STREAK</span>
                            </div>

                            {/* Deck Stats Dashboard */}
                            <div className="grid grid-cols-2 gap-3 animate-scale-in">
                                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 shadow-md flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20 font-extrabold text-sm">{recallMastery}%</div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Deck Mastery</p>
                                        <p className="text-xs font-semibold text-slate-300">Advanced Cons.</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 shadow-md flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 font-extrabold text-sm">{cardsReviewed}</div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cards Seen</p>
                                        <p className="text-xs font-semibold text-slate-300">Revision Volume</p>
                                    </div>
                                </div>
                            </div>

                            {/* 3D Interactive Flipping Flashcard */}
                            <div 
                                className="w-full h-60 cursor-pointer group [perspective:1000px] select-none"
                                onClick={() => setIsCardFlipped(!isCardFlipped)}
                            >
                                <div className={`relative w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] ${isCardFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                                    {/* Question Front Side */}
                                    <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 group-hover:border-indigo-500/40 p-6 flex flex-col justify-between items-center shadow-2xl [backface-visibility:hidden] transition-colors">
                                        <div className="w-full flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-slate-500">
                                            <span>SmartNotes Mastery Card</span>
                                            <span>Card {currentFlashcardIndex + 1} of {flashcards.length}</span>
                                        </div>
                                        <p className="text-base font-extrabold text-slate-100 px-2 leading-relaxed max-w-sm">{flashcards[currentFlashcardIndex].question}</p>
                                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 group-hover:text-indigo-400 transition-colors">
                                            <Sparkles size={11} className="animate-spin-slow text-indigo-400" />
                                            <span>Click to flip and inspect answer</span>
                                        </div>
                                    </div>
                                    {/* Answer Back Side */}
                                    <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-indigo-950/80 to-slate-950 border border-indigo-500/30 p-6 flex flex-col justify-between items-center shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                        <div className="w-full flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-indigo-300">
                                            <span>Correct Response Pathway</span>
                                            <span>Recall Node</span>
                                        </div>
                                        <p className="text-xs text-slate-300 leading-relaxed font-semibold max-h-40 overflow-y-auto custom-scrollbar px-3 prose-strong:text-indigo-300">{flashcards[currentFlashcardIndex].answer}</p>
                                        <span className="text-[10px] text-indigo-400/80">Click card again to view prompt</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Feedback Panel */}
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsCardFlipped(false);
                                            setCardsReviewed(prev => prev + 1);
                                            setRecallMastery(prev => Math.max(0, prev - 3));
                                            setTimeout(() => {
                                                setCurrentFlashcardIndex(prev => (prev + 1) % flashcards.length);
                                            }, 200);
                                        }}
                                        className="flex-1 py-3.5 bg-red-400/10 hover:bg-red-400/20 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/30 font-bold text-xs rounded-xl transition-all shadow-lg active:scale-95 uppercase tracking-widest"
                                    >
                                        Hard (Next Card)
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsCardFlipped(false);
                                            setCardsReviewed(prev => prev + 1);
                                            setRecallMastery(prev => Math.min(100, prev + 5));
                                            setTimeout(() => {
                                                setCurrentFlashcardIndex(prev => (prev + 1) % flashcards.length);
                                            }, 200);
                                        }}
                                        className="flex-1 py-3.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 border border-green-500/20 hover:border-green-500/30 font-bold text-xs rounded-xl transition-all shadow-lg active:scale-95 uppercase tracking-widest animate-pulse"
                                    >
                                        Easy (Mastered)
                                    </button>
                                </div>
                                <p className="text-[10px] text-center text-slate-500 leading-normal font-medium">Our cognitive spatial algorithms automatically schedule complex subjects for recurrent activation loops.</p>
                            </div>
                        </div>
                    )}

                    {/* --- TAB: QUIZ --- */}
                    {activeTab === 'quiz' && (
                        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar animate-fade-in text-slate-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                    <Target size={16} className="text-indigo-400" /> Cognitive Assessment
                                </h2>
                                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2.5 py-0.5 rounded font-mono border border-indigo-500/20 uppercase tracking-widest">Dynamic MCQ</span>
                            </div>

                            {isQuizFinished ? (
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/50 to-purple-950/10 border border-indigo-500/30 text-center space-y-5 shadow-2xl animate-scale-in">
                                    <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto shadow-inner text-indigo-400">
                                        <Sparkles size={28} className="animate-pulse" />
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-extrabold text-slate-100">Assessment Consolidated!</h3>
                                        <p className="text-2xl font-black text-indigo-400 font-mono mt-1">{quizScore} / {quizQuestions.length} Correct</p>
                                        <p className="text-xs text-slate-400 mt-2 leading-relaxed px-4">
                                            {quizScore === quizQuestions.length 
                                                ? "Sensational Synaptic Mastery! You have fully internalised this document's curriculum."
                                                : "Excellent effort. Keep reviewing active flashcards and querying Ask AI to maximize recall scores."}
                                        </p>
                                    </div>

                                    <div className="pt-2">
                                        <button 
                                            onClick={() => {
                                                setCurrentQuizIndex(0);
                                                setSelectedOption(null);
                                                setQuizScore(0);
                                                setQuizSubmitted(false);
                                                setIsQuizFinished(false);
                                            }}
                                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_20px_rgba(99,102,241,0.4)] active:scale-95 uppercase tracking-widest"
                                        >
                                            Reset MCQ Quiz
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-5 animate-scale-in">
                                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        <span>Concept Test</span>
                                        <span>Question {currentQuizIndex + 1} of {quizQuestions.length}</span>
                                    </div>

                                    {/* Question Box */}
                                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 shadow-md">
                                        <p className="text-sm font-bold text-slate-100 leading-relaxed">{quizQuestions[currentQuizIndex].prompt}</p>
                                    </div>

                                    {/* Option Selections */}
                                    <div className="space-y-2.5">
                                        {quizQuestions[currentQuizIndex].options.map((option, idx) => {
                                            const isSelected = selectedOption === idx;
                                            const isCorrect = idx === quizQuestions[currentQuizIndex].correctIndex;
                                            
                                            let optionStyle = "border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900/80";
                                            if (quizSubmitted) {
                                                if (isCorrect) {
                                                    optionStyle = "border-green-500/50 bg-green-500/10 text-green-300";
                                                } else if (isSelected) {
                                                    optionStyle = "border-red-500/50 bg-red-500/10 text-red-300";
                                                } else {
                                                    optionStyle = "border-slate-800 opacity-50 text-slate-500";
                                                }
                                            } else if (isSelected) {
                                                optionStyle = "border-indigo-500/50 bg-indigo-500/5 text-indigo-300";
                                            }

                                            return (
                                                <button 
                                                    key={idx}
                                                    disabled={quizSubmitted}
                                                    onClick={() => setSelectedOption(idx)}
                                                    className={`w-full text-left p-4 rounded-xl border text-xs transition-all flex items-center justify-between gap-4 font-semibold ${optionStyle}`}
                                                >
                                                    <span>{option}</span>
                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                                                        isSelected 
                                                        ? 'bg-indigo-500 border-indigo-500 text-slate-950' 
                                                        : 'border-slate-700'
                                                    }`}>
                                                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white animate-scale-in"></div>}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Explanation feedback on submission */}
                                    {quizSubmitted && (
                                        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 shadow-inner space-y-1 animate-scale-in">
                                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Mastery Explanation</p>
                                            <p className="text-xs text-slate-500 leading-relaxed font-semibold">{quizQuestions[currentQuizIndex].explanation}</p>
                                        </div>
                                    )}

                                    {/* Action Footers */}
                                    <div className="pt-2">
                                        {!quizSubmitted ? (
                                            <button 
                                                onClick={() => {
                                                    if (selectedOption === null) return;
                                                    setQuizSubmitted(true);
                                                    if (selectedOption === quizQuestions[currentQuizIndex].correctIndex) {
                                                        setQuizScore(prev => prev + 1);
                                                    }
                                                }}
                                                disabled={selectedOption === null}
                                                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-[0_4px_20px_rgba(99,102,241,0.3)] active:scale-95 animate-pulse"
                                            >
                                                Lock-in Answer
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => {
                                                    setSelectedOption(null);
                                                    setQuizSubmitted(false);
                                                    if (currentQuizIndex + 1 < quizQuestions.length) {
                                                        setCurrentQuizIndex(prev => prev + 1);
                                                    } else {
                                                        setIsQuizFinished(true);
                                                    }
                                                }}
                                                className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 hover:border-slate-600 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95"
                                            >
                                                {currentQuizIndex + 1 < quizQuestions.length ? 'Next Question' : 'Complete Assessment'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- TAB: PROGRESS (Stats & Analytics) --- */}
                    {activeTab === 'progress' && (
                        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar animate-fade-in text-slate-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-[#a8b2d1] flex items-center gap-2">
                                    <Sparkles size={16} className="text-indigo-400" /> Mastery Mode
                                </h2>
                                <span className="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono uppercase">COGNITIVE STATUS: OK</span>
                            </div>

                            {/* Concentric Knowledge Rings */}
                            <div className="flex flex-col items-center py-6 bg-slate-900/40 rounded-2xl border border-slate-800/80 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 blur-2xl rounded-full"></div>
                                
                                <div className="relative flex items-center justify-center w-48 h-48">
                                     {/* Center Orb HUD core */}
                                     <div className="absolute w-20 h-20 rounded-full bg-slate-950 border border-slate-800 flex flex-col items-center justify-center z-10 shadow-[0_0_15px_rgba(168,85,247,0.1)] select-none">
                                          <span className="text-2xl font-black font-mono text-white tracking-tighter">{recallMastery}%</span>
                                          <span className="text-[7px] font-black uppercase tracking-widest text-[#a8b2d1] text-center">Neural<br/>Core index</span>
                                     </div>

                                     {/* Concentric Radial Progress paths */}
                                     <svg className="w-full h-full transform -rotate-90 scale-95 select-none animate-hologram-flicker">
                                          {/* Outer Ring: Cognitive Ingestion - R=72, center=96 */}
                                          <circle cx="96" cy="96" r="72" className="stroke-slate-800" strokeWidth="4" fill="transparent" />
                                          <circle cx="96" cy="96" r="72" className="stroke-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.6)] transition-all duration-1000" strokeWidth="5" fill="transparent"
                                                  strokeDasharray={2 * Math.PI * 72} 
                                                  strokeDashoffset={(2 * Math.PI * 72) * (1 - 0.85)}
                                                  strokeLinecap="round" />
                                                  
                                          {/* Mid Ring: Active Recall Strength - R=54 */}
                                          <circle cx="96" cy="96" r="54" className="stroke-slate-800" strokeWidth="4" fill="transparent" />
                                          <circle cx="96" cy="96" r="54" className="stroke-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)] transition-all duration-1000" strokeWidth="5" fill="transparent"
                                                  strokeDasharray={2 * Math.PI * 54} 
                                                  strokeDashoffset={(2 * Math.PI * 54) * (1 - recallMastery / 100)}
                                                  strokeLinecap="round" />
                                                  
                                          {/* Inner Ring: Retention Consolidation - R=36 */}
                                          <circle cx="96" cy="96" r="36" className="stroke-slate-800" strokeWidth="4" fill="transparent" />
                                          <circle cx="96" cy="96" r="36" className="stroke-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.6)] transition-all duration-1000" strokeWidth="5" fill="transparent"
                                                  strokeDasharray={2 * Math.PI * 36} 
                                                  strokeDashoffset={(2 * Math.PI * 36) * (1 - 0.72)}
                                                  strokeLinecap="round" />

                                          {/* Neural Nodes positioned periodically along the rings */}
                                          <circle cx={96 + 72 * Math.cos(0)} cy={96 + 72 * Math.sin(0)} r="3.5" className="fill-cyan-400" />
                                          <circle cx={96 + 72 * Math.cos(Math.PI/2)} cy={96 + 72 * Math.sin(Math.PI/2)} r="3.5" className="fill-cyan-400 animate-ping" />
                                          <circle cx={96 + 72 * Math.cos(Math.PI)} cy={96 + 72 * Math.sin(Math.PI)} r="3.5" className="fill-cyan-400" />
                                          <circle cx={96 + 72 * Math.cos(3*Math.PI/2)} cy={96 + 72 * Math.sin(3*Math.PI/2)} r="3.5" className="fill-slate-800" />

                                          <circle cx={96 + 54 * Math.cos(Math.PI/4)} cy={96 + 54 * Math.sin(Math.PI/4)} r="3.5" className="fill-purple-400" />
                                          <circle cx={96 + 54 * Math.cos(3*Math.PI/4)} cy={96 + 54 * Math.sin(3*Math.PI/4)} r="3.5" className="fill-purple-400 animate-ping" />
                                          <circle cx={96 + 54 * Math.cos(5*Math.PI/4)} cy={96 + 54 * Math.sin(5*Math.PI/4)} r="3.5" className="fill-slate-800" />
                                          <circle cx={96 + 54 * Math.cos(7*Math.PI/4)} cy={96 + 54 * Math.sin(7*Math.PI/4)} r="3.5" className="fill-slate-800" />

                                          <circle cx={96 + 36 * Math.cos(Math.PI/3)} cy={96 + 36 * Math.sin(Math.PI/3)} r="3" className="fill-pink-400" />
                                          <circle cx={96 + 36 * Math.cos(Math.PI)} cy={96 + 36 * Math.sin(Math.PI)} r="3" className="fill-slate-800" />
                                     </svg>
                                </div>

                                {/* Concentric Legend labels */}
                                <div className="w-full px-5 mt-4 flex items-center justify-between text-[10px] font-mono border-t border-slate-800/50 pt-3 select-none">
                                     <div className="flex items-center space-x-1">
                                          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                                          <span className="text-slate-400 font-bold">Ingest (85%)</span>
                                     </div>
                                     <div className="flex items-center space-x-1">
                                          <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                                          <span className="text-slate-400 font-bold">Recall ({recallMastery}%)</span>
                                     </div>
                                     <div className="flex items-center space-x-1">
                                          <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                                          <span className="text-slate-400 font-bold">Consol (72%)</span>
                                     </div>
                                </div>
                            </div>

                            {/* Stats Bento Matrix */}
                            <div className="grid grid-cols-2 gap-3 select-none">
                                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 shadow-md transition-all hover:border-slate-700">
                                    <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">Streak Monitor</h4>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-extrabold text-slate-100 font-mono">{studyStreak}</span>
                                        <span className="text-xs text-indigo-400 font-bold uppercase font-mono">Days</span>
                                    </div>
                                    <p className="text-[9px] text-slate-500 mt-1">🔥 Regular study active</p>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 shadow-md transition-all hover:border-slate-700">
                                    <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">Cognitive Load</h4>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-extrabold text-slate-100 font-mono">0.8</span>
                                        <span className="text-xs text-purple-400 font-bold uppercase font-mono">Consol</span>
                                    </div>
                                    <p className="text-[9px] text-slate-500 mt-1">⚡ Superb absorption speed</p>
                                </div>
                            </div>

                            {/* Dynamic Interactive Neural Brain Map */}
                            <div className="space-y-3.5">
                                <div className="flex justify-between items-center select-none">
                                     <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Synaptic Brain map projection</h3>
                                     <span className="text-[8px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded font-bold uppercase font-mono">Interactive Nodes</span>
                                </div>
                                
                                <div className="p-4 bg-slate-900/30 rounded-2xl border border-slate-800/80 shadow-inner relative">
                                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.04),transparent_70%)] pointer-events-none"></div>
                                     
                                     <svg className="w-full h-64 border border-slate-800/40 rounded-xl bg-slate-950/40" viewBox="0 0 400 360">
                                          {/* Interconnecting synaptic paths (lines) */}
                                          <line x1="80" y1="80" x2="200" y2="150" className="stroke-cyan-500/20 neural-line-active" strokeWidth="2" />
                                          <line x1="320" y1="80" x2="200" y2="150" className="stroke-purple-500/20 neural-line-active" strokeWidth="2" />
                                          <line x1="200" y1="150" x2="120" y2="250" className="stroke-yellow-500/30" strokeDasharray="3, 5" strokeWidth="1.5" />
                                          <line x1="200" y1="150" x2="280" y2="250" className="stroke-indigo-500/20 neural-line-active" strokeWidth="2" />
                                          <line x1="120" y1="250" x2="200" y2="310" className="stroke-yellow-500/10" strokeDasharray="4, 4" strokeWidth="1.2" />
                                          <line x1="280" y1="250" x2="200" y2="310" className="stroke-purple-500/20 neural-line-active" strokeWidth="1.5" />

                                          {/* Node A: "Retrieval Capacity" */}
                                          <g className="cursor-pointer group" onClick={() => setSelectedBrainNode('retrieval')}>
                                               <circle cx="80" cy="80" r="14" className="fill-slate-900 stroke-cyan-400 stroke-2 animate-cyan-node" />
                                               <circle cx="80" cy="80" r="4" className="fill-cyan-400 animate-ping" />
                                               <text x="80" y="55" textAnchor="middle" className="text-[10px] font-mono font-bold fill-cyan-400 group-hover:fill-white transition-colors">RETRIEVAL</text>
                                          </g>

                                          {/* Node B: "Active Recall" */}
                                          <g className="cursor-pointer group" onClick={() => setSelectedBrainNode('recall')}>
                                               <circle cx="320" cy="80" r="14" className="fill-slate-900 stroke-purple-400 stroke-2 animate-purple-node" />
                                               <circle cx="320" cy="80" r="4" className="fill-purple-400 animate-ping" />
                                               <text x="320" y="55" textAnchor="middle" className="text-[10px] font-mono font-bold fill-purple-400 group-hover:fill-white transition-colors">RECALL</text>
                                          </g>

                                          {/* Node C: "Consolidation Core" */}
                                          <g className="cursor-pointer group" onClick={() => setSelectedBrainNode('consolidation')}>
                                               <circle cx="200" cy="150" r="16" className="fill-slate-900 stroke-pink-400 stroke-2" />
                                               <circle cx="200" cy="150" r="5" className="fill-pink-500 animate-pulse" />
                                               <text x="200" y="125" textAnchor="middle" className="text-[10px] font-mono font-bold fill-pink-400 group-hover:fill-white transition-colors">CONSOLIDATION</text>
                                          </g>

                                          {/* Node D: "Spacing Interval Mechanics" (Weak/Broken Node!) */}
                                          <g className="cursor-pointer group" onClick={() => setSelectedBrainNode('spacing')}>
                                               <circle cx="120" cy="250" r="16" className="fill-slate-950 stroke-yellow-500 stroke-2 animate-broken-node" />
                                               <path d="M120,240 L120,260 M110,250 L130,250" className="stroke-yellow-500/40" strokeWidth="1" />
                                               <circle cx="120" cy="250" r="3" className="fill-yellow-500" />
                                               <text x="120" y="282" textAnchor="middle" className="text-[10px] font-mono font-bold fill-yellow-500 group-hover:fill-white transition-colors">SPACING (GAP)</text>
                                          </g>

                                          {/* Node E: "Long-Term Potentiation" */}
                                          <g className="cursor-pointer group" onClick={() => setSelectedBrainNode('ltp')}>
                                               <circle cx="280" cy="250" r="14" className="fill-slate-900 stroke-purple-400 stroke-2 animate-purple-node" />
                                               <circle cx="280" cy="250" r="4" className="fill-purple-400" />
                                               <text x="280" y="282" textAnchor="middle" className="text-[10px] font-mono font-bold fill-purple-400 group-hover:fill-white transition-colors">LTP MODEL</text>
                                          </g>

                                          {/* Node F: "Synaptic Pruning" */}
                                          <g className="cursor-pointer group" onClick={() => setSelectedBrainNode('pruning')}>
                                               <circle cx="200" cy="310" r="12" className="fill-slate-900 stroke-blue-400 stroke-2" />
                                               <circle cx="200" cy="310" r="3" className="fill-blue-400" />
                                               <text x="200" y="336" textAnchor="middle" className="text-[10px] font-mono font-semibold fill-blue-300 group-hover:fill-white transition-colors">PRUNING</text>
                                          </g>
                                     </svg>
                                     
                                     {/* Synaptic Diagnosis drawer card */}
                                     <div className="mt-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 transition-all select-none">
                                          {selectedBrainNode === 'spacing' ? (
                                               <div className="space-y-1 animate-scale-in">
                                                    <div className="flex items-center justify-between">
                                                         <h4 className="text-xs font-extrabold text-yellow-400 leading-none font-mono">⚠️ SPACING INTERVAL MECHANICS: BREAK DETECTED</h4>
                                                         <span className="text-[7px] bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-1.5 py-0.5 rounded font-bold tracking-wider font-mono uppercase">GAP STABLE</span>
                                                    </div>
                                                    <p className="text-[10px] text-slate-400 leading-normal font-medium mt-1">Your response history shows a sharp memory decay slope at index days 2-4. Visual spacing intervals require instant reinforcement triggers.</p>
                                                    <div className="text-[9px] text-indigo-400 font-extrabold font-mono mt-1.5 pt-1.5 border-t border-slate-900">
                                                         ⚡ SUGGESTION: Revise Recall Mode deck cards every alternate 12 hours.
                                                    </div>
                                               </div>
                                          ) : selectedBrainNode === 'ltp' ? (
                                               <div className="space-y-1 animate-scale-in">
                                                    <h4 className="text-xs font-extrabold text-purple-400 leading-none font-mono">🧠 LONG-TERM POTENTIATION STATE: EXTREMELY SOLID</h4>
                                                    <p className="text-[10px] text-slate-400 leading-normal font-medium mt-1">Synaptic pathway strengthens securely with each quick-lock Assessment cycle. Chemical traces in memory are highly consolidated.</p>
                                               </div>
                                          ) : selectedBrainNode === 'consolidation' ? (
                                               <div className="space-y-1 animate-scale-in">
                                                    <h4 className="text-xs font-extrabold text-pink-400 leading-none font-mono">🌸 CONSOLIDATION LEVEL: ACTIVE MULTIPLEXING</h4>
                                                    <p className="text-[10px] text-slate-400 leading-normal font-medium mt-1">Memory tracks successfully transforming unstable short-term nodes into persistent files. Supported perfectly by both active recall cards.</p>
                                               </div>
                                          ) : selectedBrainNode === 'retrieval' ? (
                                               <div className="space-y-1 animate-scale-in">
                                                    <h4 className="text-xs font-extrabold text-cyan-400 leading-none font-mono">⚡ ACTIVE RETRIEVAL POTENCY: OPTIMAL</h4>
                                                    <p className="text-[10px] text-slate-400 leading-normal font-medium mt-1">Your response speed and lack of lookup hints measure at high operational peaks, proving maximum storage retrievability.</p>
                                               </div>
                                          ) : selectedBrainNode === 'pruning' ? (
                                               <div className="space-y-1 animate-scale-in">
                                                    <h4 className="text-xs font-extrabold text-blue-400 leading-none">✂️ SYNAPTIC PRUNING CHANNELS: DE-CLUTTERED</h4>
                                                    <p className="text-[10px] text-slate-400 leading-normal font-medium mt-1">Peripheral memory nodes naturally fade out, avoiding distraction noise and keeping main concept centers sharp and crystal clear.</p>
                                               </div>
                                          ) : (
                                               <p className="text-[9px] text-slate-500 text-center py-2 uppercase font-extrabold font-mono tracking-wider">Touch any brain map synapse query node above to run diagnostics</p>
                                          )}
                                     </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            {/* 2. Center Panel: PDF Viewer */}
            <div className="flex-1 bg-slate-950 relative flex flex-col min-w-0">
                 {/* Floating Toolbar with Slider & Navigation */}
                 <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-slate-900/90 backdrop-blur border border-slate-800 px-3 py-2 rounded-xl shadow-2xl">
                    <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <ZoomOut size={16}/>
                    </button>
                    
                    <span className="text-xs font-mono text-indigo-400 w-12 text-center">{Math.round(scale * 100)}%</span>

                    <input 
                        type="range" 
                        min="50" 
                        max="250" 
                        step="10"
                        value={scale * 100} 
                        onChange={(e) => setScale(Number(e.target.value) / 100)}
                        className="w-20 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />

                    <button onClick={() => setScale(s => Math.min(2.5, s + 0.1))} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <ZoomIn size={16}/>
                    </button>
                    
                    <div className="w-px h-5 bg-slate-700 mx-1"></div>

                    <button onClick={fitToWidth} title="Fit to Width" className="text-xs font-bold text-slate-400 hover:text-indigo-400 px-2">W</button>
                    <button onClick={fitToHeight} title="Fit to Height" className="text-xs font-bold text-slate-400 hover:text-indigo-400 px-2">H</button>
                    
                    <div className="w-px h-5 bg-slate-700 mx-1"></div>

                    {/* Page Navigation */}
                    <button 
                        onClick={() => changePage(-1)}
                        disabled={currentPage <= 1}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <ChevronLeft size={16}/>
                    </button>

                    <span className="text-xs font-mono text-slate-300 w-12 text-center">{currentPage} / {totalPages}</span>

                    <button 
                        onClick={() => changePage(1)}
                        disabled={currentPage >= totalPages}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <ChevronRight size={16}/>
                    </button>
                 </div>

                 {/* Focus Timer Widget Overlay */}
                 {showFocusWidget && (
                    <div className="absolute top-20 right-8 z-40 w-80 bg-slate-900/95 backdrop-blur-xl border border-indigo-500/30 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden animate-scale-in flex flex-col">
                        <div className="p-4 border-b border-indigo-500/20 flex justify-between items-center bg-indigo-500/10">
                            <h3 className="font-bold text-white flex items-center gap-2 text-sm"><Target size={16} className="text-indigo-400"/> Focus Session</h3>
                            <button onClick={() => setShowFocusWidget(false)} className="text-slate-400 hover:text-white transition-colors"><X size={16}/></button>
                        </div>
                        
                        <div className="p-6 flex flex-col items-center">
                            <Timer initialMinutes={25} onComplete={handleTimerComplete} variant="widget" />
                            
                            <div className="w-full mt-6 space-y-2">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Session Objectives</p>
                                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">{focusTasks.filter(t => t.completed).length}/{focusTasks.length}</span>
                                </div>
                                <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                                    {focusTasks.map(task => (
                                        <div 
                                            key={task.id} 
                                            onClick={() => toggleTask(task.id)}
                                            className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-all border ${
                                                task.completed 
                                                ? 'bg-green-500/10 border-green-500/20' 
                                                : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-indigo-500/30'
                                            }`}
                                        >
                                            <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                                                task.completed 
                                                ? 'bg-green-500 border-green-500' 
                                                : 'border-slate-500'
                                            }`}>
                                                {task.completed && <CheckCircle2 size={10} className="text-slate-900" strokeWidth={3} />}
                                            </div>
                                            <span className={`text-xs leading-tight transition-colors ${task.completed ? 'text-green-200 line-through decoration-green-500/50' : 'text-slate-300'}`}>
                                                {task.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                 )}

                 {/* Viewer Component */}
                 <div className="flex-1 overflow-hidden relative" ref={viewerContainerRef}>
                    <PDFViewer 
                        url={pdfUrl}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        highlightText={highlightText}
                        onScroll={handlePDFScroll}
                        onLoadSuccess={handleDocumentLoad}
                        onPageChangeSuccess={handlePageChangeSuccess}
                        scale={scale}
                    />

                    {/* AI PDF Scan Holographic Overlay */}
                    {(isGeneratingSummary || isManualScanning) && (
                        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[3px] z-20 flex flex-col items-center justify-center pointer-events-none select-none border border-indigo-500/20 shadow-inner animate-hologram-flicker">
                            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(18,24,38,0)_95%,rgba(99,102,241,1)_95%),linear-gradient(90deg,rgba(18,24,38,0)_95%,rgba(99,102,241,1)_95%)] bg-[size:30px_30px]"></div>
                            <div className="absolute w-full h-1.5 bg-gradient-to-r from-transparent via-purple-500 via-indigo-400 via-purple-500 to-transparent shadow-[0_0_20px_rgba(168,85,247,0.8)] animate-laser-scan-y top-0"></div>
                            
                            <div className="max-w-md p-6 bg-slate-900/90 border border-indigo-500/30 rounded-2xl flex flex-col items-center space-y-4 shadow-[0_0_50px_rgba(99,102,241,0.2)]">
                                <div className="w-14 h-14 bg-indigo-500/10 rounded-full border border-indigo-500/20 flex items-center justify-center animate-spin-slow text-indigo-400">
                                    <Sparkles size={24} className="animate-pulse" />
                                </div>
                                <div className="text-center">
                                    <h4 className="text-xs font-black font-mono tracking-widest text-[#a8b2d1] uppercase select-none">SMARTCORE ASSIMILATION ACTIVE</h4>
                                    <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-widest font-mono">[ Ingesting page {currentPage} document blocks... ]</p>
                                </div>
                                
                                <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden relative">
                                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse" style={{ width: isGeneratingSummary ? '60%' : '95%' }}></div>
                                </div>
                                
                                <div className="text-[10px] font-mono text-slate-500 leading-normal flex flex-col items-center space-y-1">
                                    <span className="text-emerald-400">[ EXTRACTING GLOSSARY MATRIX... SUCCESS ]</span>
                                    <span className="text-purple-400 animate-pulse">[ CHANNELS: ACTIVE RECALL INDEXING ]</span>
                                    <span className="text-slate-600">[ SEEDING BRAIN METADATA MAP COGNITION ]</span>
                                </div>
                            </div>
                        </div>
                    )}
                 </div>

                 {/* Document Summary Section */}
                 <div className="border-t border-slate-800 bg-slate-900/30">
                    <button 
                        onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                        className="w-full flex items-center justify-between px-6 py-4 text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
                    >
                        <span className="flex items-center gap-2">
                            <Sparkles size={16} className="text-indigo-400" />
                            Document Summary
                        </span>
                        {isSummaryExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    
                    {isSummaryExpanded && (
                        <div className="px-6 pb-6 pt-2 text-sm text-slate-400 leading-relaxed bg-slate-900/50 border-t border-slate-800/50 max-h-[40vh] overflow-y-auto custom-scrollbar">
                            {documentSummary ? (
                                <div className="text-sm text-slate-300 leading-relaxed space-y-4 [&>h1]:text-xl [&>h1]:font-bold [&>h1]:text-white [&>h2]:text-lg [&>h2]:font-bold [&>h2]:text-white [&>h3]:text-base [&>h3]:font-bold [&>h3]:text-white [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>li]:mb-1 [&>p]:mb-3 [&>strong]:text-indigo-300">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {documentSummary}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-slate-700 rounded-xl bg-slate-950/20">
                                    <p className="mb-4 text-slate-500">No summary generated for this document yet.</p>
                                    <button 
                                        onClick={handleGenerateSummary}
                                        disabled={isGeneratingSummary}
                                        className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-wider"
                                    >
                                        {isGeneratingSummary ? (
                                            <><Loader2 size={14} className="animate-spin" /> Analyzing...</>
                                        ) : (
                                            <><Sparkles size={14} /> Generate Summary</>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                 </div>
            </div>


            {/* 3. Right Panel: Evidence Sources */}
            {showRightPanel && (
                <div className="w-[300px] bg-slate-900 border-l border-slate-800 flex flex-col z-20">
                     <div className="h-12 border-b border-slate-800 flex items-center justify-between px-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Evidence Sources</span>
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                     </div>

                     <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {activeEvidence.length === 0 ? (
                            <div className="text-center mt-10 opacity-50">
                                <Search size={32} className="mx-auto mb-2 text-slate-600" />
                                <p className="text-xs text-slate-500">No active citations from the latest response.</p>
                            </div>
                        ) : (
                            activeEvidence.map((cit, idx) => (
                                <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-indigo-500/50 transition-all group">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded text-[10px] font-bold uppercase border border-indigo-500/20">
                                            Page {cit.page}
                                        </div>
                                        <Bookmark size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                                    </div>
                                    <p className="text-xs text-slate-300 italic mb-4 line-clamp-4 leading-relaxed opacity-80">
                                        "{cit.text}"
                                    </p>
                                    <button 
                                        onClick={() => handleCitationClick(cit.page, cit.text)}
                                        className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs py-2 rounded-lg transition-colors border border-slate-700"
                                    >
                                        <MapPin size={12} />
                                        <span>Jump to Source</span>
                                    </button>
                                </div>
                            ))
                        )}

                        {activeEvidence.length === 0 && (
                            <>
                                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 opacity-50">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="px-2 py-1 bg-slate-700 text-slate-400 rounded text-[10px] font-bold uppercase">Page 42</div>
                                        <Bookmark size={14} className="text-slate-600" />
                                    </div>
                                    <p className="text-xs text-slate-400 italic mb-4 leading-relaxed">"Synaptic plasticity involves long-lasting changes in the efficacy of synaptic transmission..."</p>
                                    <button onClick={() => handleCitationClick(42, "Synaptic plasticity")} className="w-full flex items-center justify-center bg-slate-800 text-slate-500 text-xs py-2 rounded-lg"><MapPin size={12} className="mr-1"/> Jump to Source</button>
                                </div>
                            </>
                        )}
                     </div>
                </div>
            )}

        </div>
    </div>
  );
}