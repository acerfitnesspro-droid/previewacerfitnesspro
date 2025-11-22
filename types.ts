export enum UserGoal {
  LOSE_WEIGHT = 'Perder Peso',
  GAIN_MUSCLE = 'Ganhar Massa Muscular',
  MAINTAIN = 'Manter Peso',
  IMPROVE_CARDIO = 'Melhorar Condicionamento'
}

export enum ExperienceLevel {
  BEGINNER = 'Iniciante',
  INTERMEDIATE = 'Intermediário',
  ADVANCED = 'Avançado'
}

export enum Equipment {
  GYM = 'Academia',
  HOME_BASIC = 'Casa (Halteres/Elásticos)',
  HOME_BODYWEIGHT = 'Casa (Apenas Peso do Corpo)'
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  height: number; // cm
  weight: number; // kg
  goal: UserGoal;
  level: ExperienceLevel;
  equipment: Equipment;
}

export interface Exercise {
  name: string;
  description: string;
  sets: number;
  reps: string;
  tips?: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
}

export interface Meal {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DietPlan {
  id: string;
  dailyCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snack: Meal;
  };
}

export interface ProgressEntry {
  date: string;
  weight: number;
  chest?: number;
  waist?: number;
  arms?: number;
}

export interface AppState {
  user: UserProfile | null;
  workoutPlan: WorkoutPlan | null;
  dietPlan: DietPlan | null;
  progress: ProgressEntry[];
}