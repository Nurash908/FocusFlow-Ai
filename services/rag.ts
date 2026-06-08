import { getEmbeddings } from './gemini';
import { extractTextFromPDF } from './pdf';

// Simple Vector Store using IndexedDB for "Real" local RAG
// We use IndexedDB because Vectors can be large and exceed LocalStorage 5MB limit.

const DB_NAME = 'SmartNotesVectorDB';
const STORE_NAME = 'vectors';

interface VectorRecord {
    id: string; // docId_chunkIndex
    docId: string;
    text: string;
    metadata: {
        page: number;
    };
    embedding: number[];
}

// Initialize DB
const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                store.createIndex('docId', 'docId', { unique: false });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

const storeVectors = async (vectors: VectorRecord[]) => {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    
    await Promise.all(vectors.map(v => 
        new Promise((resolve, reject) => {
            const req = store.put(v);
            req.onsuccess = resolve;
            req.onerror = reject;
        })
    ));
};

export const getVectorsByDocId = async (docId: string): Promise<VectorRecord[]> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const index = store.index('docId');
        const request = index.getAll(docId);
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

// Cosine Similarity
const cosineSimilarity = (vecA: number[], vecB: number[]) => {
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        magnitudeA += vecA[i] * vecA[i];
        magnitudeB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
};

// Chunking Logic
const chunkText = (text: string, maxTokens = 300): string[] => {
    // Simple sentence splitting for now
    const sentences = text.match(/[^.!?]+[.!?]+|\s*$/g) || [text];
    const chunks: string[] = [];
    let currentChunk = '';
    
    for (const sentence of sentences) {
        if ((currentChunk + sentence).length > maxTokens * 4) { // approx 4 chars per token
            chunks.push(currentChunk);
            currentChunk = sentence;
        } else {
            currentChunk += sentence;
        }
    }
    if (currentChunk) chunks.push(currentChunk);
    return chunks;
};

// --- Public API ---

export const ingestDocument = async (
    docId: string, 
    file: File, 
    onProgress: (status: string, progress: number) => void
): Promise<string> => {
    // 1. Extract Text
    onProgress("Extracting text layers...", 10);
    const pages = await extractTextFromPDF(file, (p) => {
        onProgress("Extracting text layers...", 10 + (p * 0.2)); // up to 30%
    });

    // 2. Chunking
    onProgress("Structuring data...", 40);
    const records: VectorRecord[] = [];
    let fullText = "";

    for (const page of pages) {
        fullText += page.text + " ";
        const chunks = chunkText(page.text);
        chunks.forEach((chunk, i) => {
            records.push({
                id: `${docId}_${page.pageNumber}_${i}`,
                docId,
                text: chunk,
                metadata: { page: page.pageNumber },
                embedding: [] // to be filled
            });
        });
    }

    // 3. Embedding (Batching to avoid rate limits)
    onProgress("Generating semantic embeddings...", 50);
    const BATCH_SIZE = 5; // Gemini rate limits
    for (let i = 0; i < records.length; i += BATCH_SIZE) {
        const batch = records.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(async (rec) => {
            rec.embedding = await getEmbeddings(rec.text);
        }));
        const progress = 50 + Math.floor(((i + BATCH_SIZE) / records.length) * 40); // up to 90%
        onProgress("Generating semantic embeddings...", Math.min(90, progress));
    }

    // 4. Store
    onProgress("Finalizing neural index...", 95);
    await storeVectors(records);
    
    onProgress("Complete", 100);
    return fullText.slice(0, 5000); // Return summary for initial storage
};

export const retrieveContext = async (docId: string, query: string, topK = 3) => {
    const queryVector = await getEmbeddings(query);
    const docVectors = await getVectorsByDocId(docId);
    
    // Calculate Scores
    const scored = docVectors.map(vec => ({
        ...vec,
        score: cosineSimilarity(queryVector, vec.embedding)
    }));
    
    // Sort
    scored.sort((a, b) => b.score - a.score);
    
    return scored.slice(0, topK);
};