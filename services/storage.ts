import { Document, Message, StudySession, Assessment } from '../types';
import { DEMO_PDF_URL, MOCK_DOC_CONTENT } from '../constants';

// Key constants
const KEYS = {
  DOCS: 'sngpt_docs',
  MESSAGES: 'sngpt_msgs_',
  SESSIONS: 'sngpt_sessions',
  ASSESSMENTS: 'sngpt_assessments'
};

// Initializer
export const initStorage = () => {
  if (!localStorage.getItem(KEYS.DOCS)) {
    const demoDoc: Document = {
      id: 'demo-1',
      title: 'Trace-based JIT Compilation.pdf',
      uploadDate: new Date().toISOString(),
      pageCount: 14,
      status: 'ready',
      masteryScore: 0,
      contentSummary: MOCK_DOC_CONTENT
    };
    localStorage.setItem(KEYS.DOCS, JSON.stringify([demoDoc]));
  }
};

// Documents
export const getDocuments = (): Document[] => {
  const data = localStorage.getItem(KEYS.DOCS);
  return data ? JSON.parse(data) : [];
};

export const getDocument = (id: string): Document | undefined => {
  return getDocuments().find(d => d.id === id);
};

export const addDocument = (doc: Document) => {
  const docs = getDocuments();
  localStorage.setItem(KEYS.DOCS, JSON.stringify([doc, ...docs]));
};

export const updateDocument = (id: string, updates: Partial<Document>) => {
  const docs = getDocuments();
  const idx = docs.findIndex(d => d.id === id);
  if (idx !== -1) {
    docs[idx] = { ...docs[idx], ...updates };
    localStorage.setItem(KEYS.DOCS, JSON.stringify(docs));
  }
};

export const updateDocumentMastery = (id: string, score: number) => {
  const docs = getDocuments();
  const idx = docs.findIndex(d => d.id === id);
  if (idx !== -1) {
    docs[idx].masteryScore = Math.max(docs[idx].masteryScore || 0, score);
    docs[idx].lastStudied = new Date().toISOString();
    localStorage.setItem(KEYS.DOCS, JSON.stringify(docs));
  }
};

export const updateDocumentStatus = (id: string, status: 'processing' | 'ready' | 'error') => {
  const docs = getDocuments();
  const idx = docs.findIndex(d => d.id === id);
  if (idx !== -1) {
    docs[idx].status = status;
    localStorage.setItem(KEYS.DOCS, JSON.stringify(docs));
  }
};

// Chat
export const getMessages = (docId: string): Message[] => {
  const data = localStorage.getItem(KEYS.MESSAGES + docId);
  return data ? JSON.parse(data) : [];
};

export const addMessage = (docId: string, msg: Message) => {
  const msgs = getMessages(docId);
  localStorage.setItem(KEYS.MESSAGES + docId, JSON.stringify([...msgs, msg]));
};

// Sessions
export const saveSession = (session: StudySession) => {
  const sessions = getSessions();
  localStorage.setItem(KEYS.SESSIONS, JSON.stringify([...sessions, session]));
};

export const getSessions = (): StudySession[] => {
  const data = localStorage.getItem(KEYS.SESSIONS);
  return data ? JSON.parse(data) : [];
};

// Assessments
export const saveAssessment = (assessment: Assessment) => {
  const all = getAssessments();
  localStorage.setItem(KEYS.ASSESSMENTS, JSON.stringify([...all, assessment]));
  
  // Update doc mastery if passed
  if (assessment.passed) {
    updateDocumentMastery(assessment.docId, assessment.score);
  }
};

export const getAssessments = (): Assessment[] => {
  const data = localStorage.getItem(KEYS.ASSESSMENTS);
  return data ? JSON.parse(data) : [];
};

export const getLatestAssessment = (docId: string): Assessment | undefined => {
  const all = getAssessments().filter(a => a.docId === docId);
  return all.sort((a, b) => b.timestamp - a.timestamp)[0];
};