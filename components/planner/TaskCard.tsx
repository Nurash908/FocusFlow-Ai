import React from 'react';

interface Props {
  title: string;
  time: string;
  color: string;
}

export const TaskCard: React.FC<Props> = ({ title, time, color }) => {
  return (
    <div className={`bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-4 border-l-4 ${color}`}>
        <p className="font-bold text-sm">{title}</p>
        <p className="text-xs text-slate-400">{time}</p>
    </div>
  );
};
