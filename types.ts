export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro';
}

export interface Document {
  id: string;
  title: string;
  uploadDate: string;
  pageCount: number;
  status: 'processing' | 'ready' | 'error';
  masteryScore?: number; // 0-100
  lastStudied?: string;
  contentSummary?: string; // For RAG simulation
  aiSummary?: string; // Generated summary
}

export interface Attachment {
  type: 'image' | 'audio';
  url: string; // Base64 or Blob URL
  data?: string; // Base64 for API
  mimeType?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  citations?: Citation[];
  timestamp: number;
  attachments?: Attachment[];
  isThinking?: boolean;
}

export interface Citation {
  page: number;
  text: string;
  // simplified coordinates for highlighting simulation
}

export interface StudySession {
  id: string;
  docId: string;
  startTime: number;
  durationMinutes: number;
  status: 'active' | 'completed' | 'abandoned';
  tasks: StudyTask[];
}

export interface StudyTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Question {
  id: string;
  type: 'multiple_choice' | 'short_answer';
  prompt: string;
  options?: string[];
  correctAnswerIndex?: number;
  correctAnswerText?: string;
  userAnswerIndex?: number;
  userAnswerText?: string;
  explanation?: string;
  isCorrect?: boolean;
}

export interface Assessment {
  id: string;
  sessionId: string;
  docId: string;
  questions: Question[];
  score: number;
  passed: boolean;
  timestamp: number;
  durationSeconds?: number;
}