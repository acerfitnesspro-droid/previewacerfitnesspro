import React from 'react';
import { UserProfile, WorkoutPlan, DietPlan } from '../types';
import { ArrowRight, Activity, Apple, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardProps {
  user: UserProfile;
  workout: WorkoutPlan | null;
  diet: DietPlan | null;
}

export const DashboardScreen: React.FC<DashboardProps> = ({ user, workout, diet }) => {
  return (
    <div className="space-y-6 md:ml-64">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Bem-vindo(a), {user.name.split(' ')[0]}!</h1>
        <p className="opacity-90">Objetivo: {user.goal} • Continue superando seus limites.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Peso Atual</p>
            <p className="text-xl font-bold text-slate-800">{user.weight} kg</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <Apple className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Calorias Diárias</p>
            <p className="text-xl font-bold text-slate-800">{diet?.dailyCalories || 0} kcal</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Nível de Treino</p>
            <p className="text-xl font-bold text-slate-800">{user.level}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mt-4">Plano de Hoje</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Workout Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg text-slate-800">Treino de Hoje</h3>
              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">
                {workout?.exercises.length || 0} Exercícios
              </span>
            </div>
            <p className="text-slate-500 text-sm line-clamp-2">{workout?.description}</p>
          </div>
          <div className="p-4 bg-slate-50 mt-auto">
            <Link to="/workout" className="flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
              Iniciar Treino <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Diet Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100">
             <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg text-slate-800">Plano Nutricional</h3>
              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">
                Dia 1
              </span>
            </div>
             <div className="flex gap-4 mt-3">
                <div className="text-center">
                  <span className="block text-xs text-slate-400">Proteínas</span>
                  <span className="block font-bold text-slate-700">{diet?.macros.protein}g</span>
                </div>
                <div className="text-center">
                  <span className="block text-xs text-slate-400">Carbos</span>
                  <span className="block font-bold text-slate-700">{diet?.macros.carbs}g</span>
                </div>
                <div className="text-center">
                  <span className="block text-xs text-slate-400">Gorduras</span>
                  <span className="block font-bold text-slate-700">{diet?.macros.fats}g</span>
                </div>
             </div>
          </div>
          <div className="p-4 bg-slate-50 mt-auto">
            <Link to="/diet" className="flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
              Ver Refeições <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};