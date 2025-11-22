import React, { useState } from 'react';
import { WorkoutPlan } from '../types';
import { CheckCircle, Circle, MessageSquare } from 'lucide-react';

interface WorkoutScreenProps {
  workout: WorkoutPlan | null;
}

export const WorkoutScreen: React.FC<WorkoutScreenProps> = ({ workout }) => {
  const [completed, setCompleted] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!workout) return <div className="md:ml-64 p-6">Nenhum plano de treino disponível.</div>;

  const toggleExercise = (index: number) => {
    if (completed.includes(index)) {
      setCompleted(completed.filter(i => i !== index));
    } else {
      setCompleted([...completed, index]);
    }
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to Supabase
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const progress = Math.round((completed.length / workout.exercises.length) * 100);

  return (
    <div className="space-y-6 md:ml-64">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">{workout.name}</h1>
      </div>
      
      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>Progresso</span>
          <span className="font-semibold">{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="space-y-4">
        {workout.exercises.map((ex, idx) => {
          const isDone = completed.includes(idx);
          return (
            <div 
              key={idx} 
              onClick={() => toggleExercise(idx)}
              className={`bg-white p-5 rounded-xl border transition-all cursor-pointer ${isDone ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary/50'}`}
            >
              <div className="flex items-start gap-4">
                <div className={`mt-1 ${isDone ? 'text-primary' : 'text-slate-300'}`}>
                  {isDone ? <CheckCircle className="w-6 h-6 fill-current" /> : <Circle className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${isDone ? 'text-primary line-through' : 'text-slate-800'}`}>{ex.name}</h3>
                  <p className="text-slate-500 text-sm mb-3">{ex.description}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                      Séries: {ex.sets}
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                      Repetições: {ex.reps}
                    </span>
                  </div>
                  {ex.tips && (
                    <div className="mt-3 text-sm text-slate-500 italic bg-slate-50 p-2 rounded border border-slate-100">
                      💡 Dica: {ex.tips}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feedback Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mt-8">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-slate-400" />
          <h3 className="font-bold text-slate-800">Feedback do Treino</h3>
        </div>
        
        {submitted ? (
          <div className="bg-green-50 text-green-600 p-4 rounded-lg text-center font-medium">
            Feedback enviado! Bom trabalho hoje.
          </div>
        ) : (
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Dificuldade</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className={`w-10 h-10 rounded-lg font-bold transition-colors ${rating === num ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Anotações</label>
              <textarea 
                className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/50"
                rows={3}
                placeholder="Como você se sentiu? Muito pesado? Muito leve?"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-900 font-medium transition-colors">
              Concluir e Salvar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};