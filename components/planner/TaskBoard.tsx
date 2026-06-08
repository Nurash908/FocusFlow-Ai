import React from 'react';
import { TaskCard } from './TaskCard';

export const TaskBoard: React.FC = () => {
    return (
        <div className="space-y-4">
            <h3 className="font-bold text-lg">Upcoming Tasks</h3>
            <TaskCard title="Math Revision" time="6:00 PM - 7:30 PM" color="border-l-indigo-500" />
            <TaskCard title="Chemistry Homework" time="8:00 PM - 9:00 PM" color="border-l-purple-500" />
        </div>
    );
};
