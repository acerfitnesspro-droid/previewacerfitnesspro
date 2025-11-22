import { UserProfile, WorkoutPlan, DietPlan, ProgressEntry } from "../types";

// Key constants
const USER_KEY = 'fitlife_user';
const WORKOUT_KEY = 'fitlife_workout';
const DIET_KEY = 'fitlife_diet';
const PROGRESS_KEY = 'fitlife_progress';

export const storageService = {
  saveUser: (user: UserProfile) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  getUser: (): UserProfile | null => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },
  logout: () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(WORKOUT_KEY);
    localStorage.removeItem(DIET_KEY);
    // We might want to keep progress
  },

  saveWorkout: (plan: WorkoutPlan) => {
    localStorage.setItem(WORKOUT_KEY, JSON.stringify(plan));
  },
  getWorkout: (): WorkoutPlan | null => {
    const data = localStorage.getItem(WORKOUT_KEY);
    return data ? JSON.parse(data) : null;
  },

  saveDiet: (plan: DietPlan) => {
    localStorage.setItem(DIET_KEY, JSON.stringify(plan));
  },
  getDiet: (): DietPlan | null => {
    const data = localStorage.getItem(DIET_KEY);
    return data ? JSON.parse(data) : null;
  },

  addProgress: (entry: ProgressEntry) => {
    const current = storageService.getProgress();
    const updated = [...current, entry];
    // Sort by date
    updated.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
    return updated;
  },
  getProgress: (): ProgressEntry[] => {
    const data = localStorage.getItem(PROGRESS_KEY);
    return data ? JSON.parse(data) : [];
  }
};