import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, Timestamp } from 'firebase/firestore';

export interface DailyGoal {
  id?: string;
  userId: string;
  date: string; // ISO format date (YYYY-MM-DD)
  goal: string;
  completed: boolean;
  createdAt: Timestamp;
}

export const getDailyGoals = async (userId: string, date: string): Promise<DailyGoal[]> => {
  const goalsRef = collection(db, 'users', userId, 'dailyGoals');
  const q = query(goalsRef, where('date', '==', date));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as DailyGoal));
};

export const addDailyGoal = async (userId: string, goal: string) => {
  const goalsRef = collection(db, 'users', userId, 'dailyGoals');
  const date = new Date().toISOString().split('T')[0];
  await addDoc(goalsRef, {
    userId,
    date,
    goal,
    completed: false,
    createdAt: Timestamp.now()
  });
};

export const toggleGoalCompletion = async (userId: string, goalId: string, completed: boolean) => {
  const goalRef = doc(db, 'users', userId, 'dailyGoals', goalId);
  await updateDoc(goalRef, { completed });
};
