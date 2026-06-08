import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Document, Question, Attachment } from '../types';
import { retrieveContext, getVectorsByDocId } from './rag';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key missing");
  return new GoogleGenAI({ apiKey });
};

// Helper to convert base64 to parts
const fileToPart = (data: string, mimeType: string) => {
  return {
    inlineData: {
      data,
      mimeType
    }
  };
};

export const getEmbeddings = async (text: string): Promise<number[]> => {
    const ai = getAiClient();
    try {
        const result = await ai.models.embedContent({
            model: "gemini-embedding-2-preview",
            contents: text // Use simple string content for better compatibility
        });
        
        // Handle potential variations in response structure
        if (result.embedding?.values) {
            return result.embedding.values;
        }
        
        return [];
    } catch (e) {
        console.error("Embedding Error", e);
        return [];
    }
};

// Main Chat Function with Real RAG
export const chatWithPDF = async (
    query: string, 
    docId: string, 
    attachments: Attachment[] = [], 
    useThinking: boolean = false
): Promise<{ text: string; page: number; citation: string }> => {
  const ai = getAiClient();
  
  // 1. Retrieve Relevant Context
  const contextChunks = await retrieveContext(docId, query);
  const contextText = contextChunks.map(c => `[Page ${c.metadata.page}]: ${c.text}`).join('\n\n');

  // Select Model - using stable 2.0 Flash
  let modelName = 'gemini-2.0-flash'; 
  let config: any = {
      responseMimeType: "application/json"
  };

  if (useThinking) {
      // Use thinking model if requested
      modelName = 'gemini-2.0-flash-thinking-exp-01-21'; 
      config = {
          ...config,
          thinkingConfig: { thinkingBudget: 16000 },
      };
  }

  const systemPrompt = `
    You are an expert tutor helper. You have access to the following document snippets retrieved based on the user's query:
    
    --- CONTEXT START ---
    ${contextText}
    --- CONTEXT END ---
    
    Answer the user's question based ONLY on this content and any provided images/audio.
    If the answer is found in the context, provide the answer and a direct quote (citation) from the text.
    Include the page number from the context snippet.
    
    If the answer is not in the context, state that you cannot find it in the document.
    
    Format response as JSON:
    {
      "answer": "The answer text...",
      "page": 5,
      "citation": "The exact quote from text"
    }
  `;

  const parts: any[] = [{ text: query }];
  
  attachments.forEach(att => {
      if (att.data && att.mimeType) {
          parts.push(fileToPart(att.data, att.mimeType));
      }
  });

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
          role: 'user',
          parts: parts
      },
      config: {
        systemInstruction: systemPrompt,
        ...config
      }
    });

    let text = response.text || "{}";
    text = text.replace(/```json/g, '').replace(/```/g, '');
    
    const result = JSON.parse(text);
    return {
      text: result.answer || "I couldn't find that in the document.",
      page: result.page || 1,
      citation: result.citation || ""
    };
  } catch (e) {
    console.error("Gemini Error", e);
    return {
      text: "Sorry, I encountered an error analyzing the request. Please try again.",
      page: 1,
      citation: ""
    };
  }
};

// Audio Transcription
export const transcribeAudio = async (base64Audio: string, mimeType: string = 'audio/wav'): Promise<string> => {
    const ai = getAiClient();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: {
                parts: [
                    fileToPart(base64Audio, mimeType),
                    { text: "Transcribe this audio exactly as spoken." }
                ]
            }
        });
        return response.text || "";
    } catch (e) {
        console.error("Transcription Error", e);
        return "Error transcribing audio.";
    }
};

// Text to Speech
export const generateSpeech = async (text: string): Promise<string | null> => {
    const ai = getAiClient();
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-exp",
            contents: {
                parts: [{ text: text }]
            },
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            }
        });
        
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        return base64Audio || null;
    } catch (e) {
        console.error("TTS Error", e);
        return null;
    }
}

// Generate Assessment
export const generateAssessment = async (docContext: string): Promise<Question[]> => {
  const ai = getAiClient();
  
  const systemPrompt = `
    Generate a 5-question quiz based on this text:
    "${docContext}"
    
    Include a mix of 'multiple_choice' (3 questions) and 'short_answer' (2 questions).
    
    Return a JSON array of objects.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", 
      contents: "Create the quiz now.",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    type: { type: Type.STRING },
                    prompt: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctAnswerIndex: { type: Type.INTEGER },
                    correctAnswerText: { type: Type.STRING },
                    explanation: { type: Type.STRING }
                }
            }
        }
      }
    });

    const questions = JSON.parse(response.text || "[]");
    return questions.map((q: any, i: number) => ({
      ...q,
      id: `q-${Date.now()}-${i}`
    }));
  } catch (e) {
    console.error("Quiz Gen Error", e);
    return [];
  }
};

export const generateDocumentSummary = async (docId: string): Promise<string> => {
    const ai = getAiClient();
    try {
        const docVectors = await getVectorsByDocId(docId);
        // Concatenate text from vectors, limiting to avoid massive payloads if needed
        // but Gemini 2.0 Flash has a large context window.
        const fullText = docVectors.map(v => v.text).join(' ');
        
        // If the document is extremely large, we might want to truncate it, but 
        // for typical PDFs, 1M tokens is plenty.
        const textToSummarize = fullText.length > 500000 ? fullText.slice(0, 500000) : fullText;

        const prompt = `
            Please provide a comprehensive and structured summary of the following document text.
            Highlight the main ideas, key arguments, and any important conclusions.
            Format the summary using Markdown for readability (e.g., use headings, bullet points, bold text).

            --- DOCUMENT TEXT ---
            ${textToSummarize}
            --- END DOCUMENT TEXT ---
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });

        return response.text || "Could not generate summary.";
    } catch (e) {
        console.error("Summary Generation Error", e);
        return "An error occurred while generating the summary.";
    }
};
export const gradeShortAnswer = async (question: string, userAnswer: string, modelAnswer: string): Promise<boolean> => {
    const ai = getAiClient();
    const prompt = `
        Question: ${question}
        Model Answer: ${modelAnswer}
        User Answer: ${userAnswer}

        Is the User Answer correct based on the Model Answer? It doesn't need to be exact, but the key meaning must be present.
        Return JSON: { "correct": boolean }
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });
        const result = JSON.parse(response.text || "{}");
        return result.correct === true;
    } catch (e) {
        console.error("Grading Error", e);
        return false;
    }
};