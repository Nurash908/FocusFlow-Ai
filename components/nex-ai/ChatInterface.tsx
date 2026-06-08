import React from 'react';

const messages = [
  { sender: 'NEX', text: 'Good Evening, Nurash. I analyzed your productivity today. You completed 4 focus sessions and improved your focus score by 12%. Outstanding progress.' },
  { sender: 'User', text: 'How can I improve my focus?' },
  { sender: 'NEX', text: 'Your highest productivity period is between 6 PM and 8 PM. Consider scheduling difficult tasks during that time.' },
];

export const ChatInterface: React.FC = () => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 h-[400px] flex flex-col gap-4 overflow-y-auto">
        {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-3xl ${m.sender === 'User' ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                    <p className="text-sm">{m.text}</p>
                </div>
            </div>
        ))}
        <div className="mt-auto pt-4 border-t border-white/5">
            <input type="text" placeholder="Ask NEX..." className="w-full bg-transparent outline-none text-sm placeholder:text-slate-500" />
        </div>
    </div>
  );
};
