import React from 'react';
import { motion } from 'motion/react';
import { Layout } from '../components/Layout';
import { AIOrb } from '../components/nex-ai/AIOrb';
import { ChatInterface } from '../components/nex-ai/ChatInterface';
import { InsightCard } from '../components/nex-ai/InsightCard';

export const NEXAIAssistant: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-8 pb-20">
          
          <header className="mb-12 flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">NEX AI Assistant</h1>
              <p className="text-slate-400 mt-2">Your intelligent productivity partner</p>
            </div>
            <AIOrb />
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ChatInterface />
            </div>
            <div className="lg:col-span-1 space-y-8">
              <InsightCard title="Daily Focus Summary" recommendation="Focus Time: 4h 21m | Score: 89%. Continue scheduling revision sessions during your peak performance period." />
              <InsightCard title="Coaching Tip" recommendation="Completing one more focus session will unlock a new achievement." />
            </div>
          </div>
          
        </motion.div>
      </div>
    </Layout>
  );
};
