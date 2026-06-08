import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getDocument, saveAssessment } from '../services/storage';
import { generateAssessment, gradeShortAnswer } from '../services/gemini';
import { Document, Question } from '../types';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Brain, CreditCard, ListChecks, ChevronLeft, ChevronRight as ChevronRightIcon, Award, Sparkles } from 'lucide-react';
import { PASSING_SCORE } from '../constants';

export const AssessmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [doc, setDoc] = useState<Document | undefined>(undefined);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState<'quiz' | 'flashcards'>('quiz');
  const [startTime, setStartTime] = useState<number>(Date.now());
  
  // Flashcard state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (!id) return;
    const d = getDocument(id);
    setDoc(d);
    loadQuiz(d);
  }, [id]);

  const loadQuiz = async (d?: Document) => {
    if (!d) return;
    setLoading(true);
    const generated = await generateAssessment(d.contentSummary || "");
    setQuestions(generated);
    setStartTime(Date.now());
    setLoading(false);
  };

  const handleOptionSelect = (qId: string, optionIndex: number) => {
    if (submitted) return;
    setQuestions(questions.map(q => q.id === qId ? { ...q, userAnswerIndex: optionIndex } : q));
  };

  const handleTextChange = (qId: string, text: string) => {
      if (submitted) return;
      setQuestions(questions.map(q => q.id === qId ? { ...q, userAnswerText: text } : q));
  }

  const handleSubmit = async () => {
    setLoading(true);
    let correctCount = 0;
    
    // Grade questions
    const gradedQuestions = await Promise.all(questions.map(async (q) => {
        let isCorrect = false;
        if (q.type === 'multiple_choice') {
            isCorrect = q.userAnswerIndex === q.correctAnswerIndex;
        } else {
            // Short Answer Grading
            isCorrect = await gradeShortAnswer(q.prompt, q.userAnswerText || "", q.correctAnswerText || "");
        }
        
        if (isCorrect) correctCount++;
        
        return { 
            ...q, 
            isCorrect,
            explanation: isCorrect ? "Correct! " + q.explanation : "Incorrect. " + q.explanation 
        };
    }));
    
    const finalScore = Math.round((correctCount / questions.length) * 100);
    const endTime = Date.now();
    const durationSeconds = Math.floor((endTime - startTime) / 1000);
    const sessionId = searchParams.get('sessionId') || 'unknown';

    setScore(finalScore);
    setQuestions(gradedQuestions);
    setSubmitted(true);
    setLoading(false);

    if (doc && id) {
        saveAssessment({
            id: Date.now().toString(),
            sessionId: sessionId,
            docId: id,
            questions: gradedQuestions,
            score: finalScore,
            passed: finalScore >= PASSING_SCORE,
            timestamp: endTime,
            durationSeconds
        });
    }
  };

  const isPassed = score >= PASSING_SCORE;

  // Flashcard Helpers
  const nextCard = () => {
      setIsFlipped(false);
      setTimeout(() => setCurrentCardIndex((prev) => (prev + 1) % questions.length), 150);
  }
  const prevCard = () => {
      setIsFlipped(false);
      setTimeout(() => setCurrentCardIndex((prev) => (prev - 1 + questions.length) % questions.length), 150);
  }

  if (loading) {
      return (
          <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-900/10 animate-pulse"></div>
              <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-8 shadow-2xl shadow-indigo-500/20"></div>
                  <h2 className="text-2xl font-bold mb-2 tracking-tight">{submitted ? "Analyzing Mastery..." : "Generating Assessment..."}</h2>
                  <p className="text-slate-400 font-mono text-sm animate-pulse">Analyzing document content</p>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-12 px-6 overflow-y-auto custom-scrollbar relative">
        {/* Confetti for passing */}
        {submitted && isPassed && (
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="confetti" style={{ 
                        left: `${Math.random() * 100}%`, 
                        animationDelay: `${Math.random() * 2}s`, 
                        backgroundColor: ['#f472b6', '#60a5fa', '#a78bfa', '#34d399'][Math.floor(Math.random() * 4)] 
                    }} />
                ))}
            </div>
        )}

        <div className="max-w-3xl mx-auto">
            <header className="mb-8 flex flex-col items-center animate-fade-in-up">
                 <div className="flex bg-slate-900/80 p-1.5 rounded-2xl mb-8 border border-slate-800 backdrop-blur-md shadow-xl">
                     <button 
                        onClick={() => setMode('quiz')}
                        className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${mode === 'quiz' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-105' : 'text-slate-400 hover:text-white'}`}
                     >
                         <ListChecks size={18} />
                         <span>Quiz Mode</span>
                     </button>
                     <button 
                        onClick={() => setMode('flashcards')}
                        className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${mode === 'flashcards' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-105' : 'text-slate-400 hover:text-white'}`}
                     >
                         <CreditCard size={18} />
                         <span>Flashcards</span>
                     </button>
                 </div>

                {!submitted && mode === 'quiz' && (
                     <div className="text-center animate-fade-in-up delay-100">
                        <h1 className="text-3xl font-bold text-white mb-2">{doc?.title}</h1>
                        <div className="flex items-center justify-center space-x-2 text-slate-500 text-sm">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                            <span>{questions.length} Questions</span>
                        </div>
                     </div>
                )}
            </header>

            {mode === 'flashcards' ? (
                <div className="perspective-1000 h-[400px] w-full relative animate-scale-in">
                    <div 
                        className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer group ${isFlipped ? 'rotate-y-180' : ''}`}
                        onClick={() => setIsFlipped(!isFlipped)}
                        style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                    >
                        {/* Front */}
                        <div className="absolute inset-0 backface-hidden bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-[2rem] p-6 md:p-12 flex flex-col items-center justify-center shadow-2xl hover:border-indigo-500/50 transition-colors">
                             <span className="absolute top-4 left-4 md:top-8 md:left-8 text-xs font-bold text-indigo-400 uppercase tracking-widest border border-indigo-500/30 px-3 py-1 rounded-full">Card {currentCardIndex + 1}</span>
                             <h3 className="text-xl md:text-3xl font-bold text-center text-white leading-tight">{questions[currentCardIndex].prompt}</h3>
                             <p className="text-slate-500 mt-8 md:mt-12 text-sm flex items-center group-hover:text-indigo-300 transition-colors">
                                Click to reveal answer <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                             </p>
                        </div>

                        {/* Back */}
                        <div 
                            className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 rounded-[2rem] p-6 md:p-12 flex flex-col items-center justify-center shadow-2xl rotate-y-180"
                            style={{ transform: 'rotateY(180deg)' }}
                        >
                             <span className="absolute top-4 left-4 md:top-8 md:left-8 text-xs font-bold text-indigo-200 uppercase tracking-widest border border-indigo-400/30 px-3 py-1 rounded-full">Answer</span>
                             <div className="text-center overflow-y-auto max-h-full custom-scrollbar pt-8 md:pt-0">
                                 <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">
                                     {questions[currentCardIndex].type === 'multiple_choice' 
                                        ? questions[currentCardIndex].options![questions[currentCardIndex].correctAnswerIndex!]
                                        : questions[currentCardIndex].correctAnswerText
                                     }
                                 </h3>
                                 <p className="text-indigo-200 text-xs md:text-sm leading-relaxed border-t border-indigo-700/50 pt-4 md:pt-6 mt-2 max-w-md mx-auto">
                                     {questions[currentCardIndex].explanation}
                                 </p>
                             </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-10 px-4">
                        <button onClick={prevCard} className="p-4 bg-slate-800 rounded-full hover:bg-slate-700 hover:text-white hover:scale-110 transition-all shadow-lg"><ChevronLeft /></button>
                        <span className="font-mono text-slate-500 bg-slate-900 px-4 py-1 rounded-full border border-slate-800">{currentCardIndex + 1} / {questions.length}</span>
                        <button onClick={nextCard} className="p-4 bg-slate-800 rounded-full hover:bg-slate-700 hover:text-white hover:scale-110 transition-all shadow-lg"><ChevronRightIcon /></button>
                    </div>
                </div>
            ) : (
                <>
                {!submitted ? (
                    <div className="space-y-6 animate-fade-in-up delay-200">
                        {questions.map((q, idx) => (
                            <div key={q.id} className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-medium text-white leading-relaxed">
                                        <span className="text-indigo-500 font-bold mr-3 text-xl">{idx + 1}.</span>
                                        {q.prompt}
                                    </h3>
                                    <span className="text-[10px] uppercase font-bold bg-slate-800 border border-slate-700 px-2 py-1 rounded-md text-slate-500">
                                        {q.type === 'multiple_choice' ? 'Multiple Choice' : 'Short Answer'}
                                    </span>
                                </div>
                                
                                {q.type === 'multiple_choice' ? (
                                    <div className="space-y-3">
                                        {q.options?.map((opt, oIdx) => (
                                            <button
                                                key={oIdx}
                                                onClick={() => handleOptionSelect(q.id, oIdx)}
                                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center group ${
                                                    q.userAnswerIndex === oIdx 
                                                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                                                    : 'bg-slate-800/30 border-transparent hover:bg-slate-800 hover:border-slate-700'
                                                }`}
                                            >
                                                <div className={`w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0 flex items-center justify-center transition-colors ${
                                                    q.userAnswerIndex === oIdx ? 'border-indigo-500 bg-indigo-500' : 'border-slate-600 group-hover:border-slate-400'
                                                }`}>
                                                    {q.userAnswerIndex === oIdx && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                                </div>
                                                <span className="text-sm md:text-base">{opt}</span>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <textarea 
                                        rows={3}
                                        placeholder="Type your answer here..."
                                        value={q.userAnswerText || ''}
                                        onChange={(e) => handleTextChange(q.id, e.target.value)}
                                        className="w-full bg-slate-950 border-2 border-slate-800 rounded-xl p-4 text-white focus:ring-0 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600"
                                    />
                                )}
                            </div>
                        ))}
                        <div className="pt-6 pb-20">
                            <button 
                                onClick={handleSubmit}
                                disabled={questions.some(q => (q.type === 'multiple_choice' && q.userAnswerIndex === undefined) || (q.type === 'short_answer' && !q.userAnswerText))}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg py-5 rounded-2xl hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
                            >
                                Submit Assessment
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="animate-scale-in">
                        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-10 text-center mb-10 relative overflow-hidden shadow-2xl">
                            {/* Animated Background Gradient */}
                            <div className={`absolute top-0 left-0 w-full h-2 ${isPassed ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <div className={`absolute inset-0 opacity-10 ${isPassed ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            
                            <div className="relative z-10">
                                {isPassed && (
                                    <div className="mb-6 inline-flex p-4 rounded-full bg-green-500/20 text-green-400 animate-float">
                                        <Award size={48} />
                                    </div>
                                )}
                                
                                <div className="text-7xl font-black mb-2 text-white tracking-tighter">{score}%</div>
                                <div className={`text-2xl font-bold mb-8 uppercase tracking-widest ${isPassed ? 'text-green-400' : 'text-red-400'}`}>
                                    {isPassed ? 'Mastery Achieved' : 'Review Needed'}
                                </div>

                                <p className="text-slate-300 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
                                    {isPassed 
                                        ? "Outstanding work! You have successfully mastered the key concepts of this document." 
                                        : `You need ${PASSING_SCORE}% to achieve mastery. Don't worry, review the feedback below and try again.`}
                                </p>

                                <div className="flex justify-center space-x-4">
                                    {isPassed ? (
                                        <button onClick={() => navigate('/dashboard')} className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors shadow-lg hover:scale-105 active:scale-95">
                                            Return to Dashboard
                                        </button>
                                    ) : (
                                        <button onClick={() => window.location.reload()} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-500 flex items-center shadow-lg hover:scale-105 active:scale-95 shadow-indigo-500/20">
                                            <RotateCcw size={18} className="mr-2" />
                                            Redo Assessment
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Review Answers */}
                        <div className="space-y-6 pb-20">
                            <h3 className="text-xl font-bold text-white flex items-center">
                                <Sparkles size={20} className="text-indigo-400 mr-2" />
                                Review Breakdown
                            </h3>
                            {questions.map((q, idx) => (
                                <div key={q.id} className={`p-6 rounded-2xl border transition-all hover:scale-[1.01] ${
                                    q.isCorrect
                                    ? 'bg-green-900/10 border-green-500/20 hover:border-green-500/40' 
                                    : 'bg-red-900/10 border-red-500/20 hover:border-red-500/40'
                                }`}>
                                    <div className="flex items-start mb-4">
                                        {q.isCorrect
                                            ? <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                            : <XCircle className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                                        }
                                        <div>
                                            <p className="text-white font-medium mb-2 text-lg">{q.prompt}</p>
                                            <p className="text-sm text-slate-400 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">{q.explanation}</p>
                                        </div>
                                    </div>
                                    <div className="ml-9 text-sm grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                                            <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Your Answer</span>
                                            <span className={`font-medium ${q.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                                {q.type === 'multiple_choice' ? q.options![q.userAnswerIndex!] : q.userAnswerText}
                                            </span>
                                        </div>
                                        {!q.isCorrect && (
                                            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                                                <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Correct Answer</span>
                                                <span className="font-medium text-green-400">
                                                    {q.type === 'multiple_choice' ? q.options![q.correctAnswerIndex!] : q.correctAnswerText}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                </>
            )}
        </div>
    </div>
  );
};