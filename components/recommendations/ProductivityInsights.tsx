import React, { useEffect, useState } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { getPersonalizedRecommendations } from '../../services/recommendationEngine';
import { useAuth } from '../../context/AuthContext';

interface Insight {
    text: string;
    priority: string;
}

export const ProductivityInsights: React.FC = () => {
    const { user } = useAuth();
    const [insights, setInsights] = useState<Insight[]>([]);

    useEffect(() => {
        if (user) {
            getPersonalizedRecommendations(user.uid).then(setInsights);
        }
    }, [user]);

    return (
        <div className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Bot className="text-cyan-400" size={20} />
                Personalized AI Coach
            </h3>
            <div className="space-y-4">
                {insights.map((insight, i) => (
                    <div key={i} className="flex gap-3 text-slate-200 bg-white/5 p-4 rounded-xl">
                        <Sparkles className="text-cyan-400 mt-1 shrink-0" size={16} />
                        <div>
                            <p className="text-sm font-bold mb-1">{insight.priority}</p>
                            <p className="text-sm">{insight.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
