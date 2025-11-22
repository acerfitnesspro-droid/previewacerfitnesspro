import React from 'react';
import { DietPlan, Meal } from '../types';
import { Utensils, Coffee, Sun, Moon, Cookie } from 'lucide-react';

interface DietScreenProps {
  diet: DietPlan | null;
}

const MealCard: React.FC<{ title: string; meal: Meal; icon: React.ReactNode }> = ({ title, meal, icon }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
    <div className="flex items-center gap-3 mb-3 border-b border-slate-50 pb-3">
      <div className="p-2 bg-slate-50 rounded-lg text-slate-500">
        {icon}
      </div>
      <h3 className="font-bold text-slate-800">{title}</h3>
      <span className="ml-auto text-sm font-semibold text-primary">{meal.calories} kcal</span>
    </div>
    <h4 className="font-medium text-slate-800 mb-1">{meal.name}</h4>
    <p className="text-sm text-slate-500 mb-4">{meal.description}</p>
    <div className="grid grid-cols-3 gap-2 text-center">
      <div className="bg-slate-50 p-2 rounded">
        <span className="block text-xs text-slate-400">Prot</span>
        <span className="text-sm font-bold text-slate-700">{meal.protein}g</span>
      </div>
      <div className="bg-slate-50 p-2 rounded">
        <span className="block text-xs text-slate-400">Carb</span>
        <span className="text-sm font-bold text-slate-700">{meal.carbs}g</span>
      </div>
      <div className="bg-slate-50 p-2 rounded">
        <span className="block text-xs text-slate-400">Gord</span>
        <span className="text-sm font-bold text-slate-700">{meal.fats}g</span>
      </div>
    </div>
  </div>
);

export const DietScreen: React.FC<DietScreenProps> = ({ diet }) => {
  if (!diet) return <div className="md:ml-64 p-6">Nenhum plano de dieta disponível.</div>;

  return (
    <div className="space-y-6 md:ml-64">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Nutrição Diária</h1>
      </div>

      {/* Macro Summary */}
      <div className="bg-slate-800 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Meta de Consumo Total</h2>
          <span className="text-2xl font-bold text-primary">{diet.dailyCalories} <span className="text-sm font-normal text-slate-300">kcal</span></span>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Proteína</span>
              <span>{diet.macros.protein}g</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-full"></div>
            </div>
          </div>
          <div>
             <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Carbos</span>
              <span>{diet.macros.carbs}g</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full w-full"></div>
            </div>
          </div>
          <div>
             <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Gorduras</span>
              <span>{diet.macros.fats}g</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full w-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MealCard title="Café da Manhã" meal={diet.meals.breakfast} icon={<Coffee className="w-5 h-5" />} />
        <MealCard title="Almoço" meal={diet.meals.lunch} icon={<Sun className="w-5 h-5" />} />
        <MealCard title="Lanche" meal={diet.meals.snack} icon={<Cookie className="w-5 h-5" />} />
        <MealCard title="Jantar" meal={diet.meals.dinner} icon={<Moon className="w-5 h-5" />} />
      </div>
    </div>
  );
};