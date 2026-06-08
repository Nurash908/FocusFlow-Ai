import { GoogleGenAI } from "@google/genai";
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key missing");
  return new GoogleGenAI({ apiKey });
};

export const getPersonalizedRecommendations = async (userId: string) => {
    const ai = getAiClient();
    
    // 1. Fetch user data from Firebase
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.exists() ? JSON.stringify(userSnap.data()) : "No data available";

    // 2. Generate recommendations using Gemini
    const systemPrompt = `
        You are a personalized AI productivity coach for students.
        Based on the following user data (study sessions, tasks, focus levels), generate 3 actionable, personalized, and supportive productivity recommendations.
        
        User Data:
        ${userData}

        Format as a JSON array of objects:
        [
            { "text": "...", "priority": "🔴 Critical" | "🟠 High Impact" },
            ...
        ]
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: "Generate productivity recommendations now.",
            config: {
                systemInstruction: systemPrompt,
                responseMimeType: "application/json"
            }
        });
        
        return JSON.parse(response.text || "[]");
    } catch (e) {
        console.error("Recommendation Generation Error", e);
        return [];
    }
};
