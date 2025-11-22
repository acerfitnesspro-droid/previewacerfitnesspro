import React, { useState } from 'react';
import { UserGoal, ExperienceLevel, Equipment, UserProfile } from '../types';
import { generateFitnessDataLocal } from '../services/fitnessCalculator';
import { storageService } from '../services/storageService';
import { Dumbbell, Loader2 } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (user: UserProfile) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: 25,
    height: 170,
    weight: 70,
    goal: UserGoal.LOSE_WEIGHT,
    level: ExperienceLevel.BEGINNER,
    equipment: Equipment.GYM
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating login by checking local storage or just creating a mock session if user exists
    const storedUser = storageService.getUser();
    if (storedUser && storedUser.email === email) {
      onLogin(storedUser);
    } else {
      // For demo purposes, if user doesn't exist in local storage, we fail
      setError('Usuário não encontrado. Por favor, cadastre-se para esta demonstração.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const newUser: UserProfile = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        age: formData.age,
        height: formData.height,
        weight: formData.weight,
        goal: formData.goal,
        level: formData.level,
        equipment: formData.equipment
      };

      // 1. Generate Plans (Agora usando Cálculo Local, sem Gemini)
      const plans = await generateFitnessDataLocal(newUser);

      // 2. Save Data (Simulate Supabase)
      storageService.saveUser(newUser);
      storageService.saveWorkout(plans.workout);
      storageService.saveDiet(plans.diet);
      // Initialize progress with current weight
      storageService.addProgress({
        date: new Date().toISOString().split('T')[0],
        weight: newUser.weight
      });

      // 3. Log user in
      onLogin(newUser);

    } catch (err: any) {
      setError('Falha ao criar conta: ' + (err.message || 'Erro desconhecido'));
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">Calculando seu Plano</h2>
        <p className="text-slate-500 mt-2">Nosso algoritmo está analisando sua biometria para criar o treino perfeito...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-primary p-6 text-center">
          <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">FitLife App</h1>
          <p className="text-primary-100">Sua Jornada Fitness Personalizada</p>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            {isRegister ? 'Criar Conta' : 'Bem-vindo de volta'}
          </h2>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}

          {isRegister ? (
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Basic Info */}
              <div>
                <label className={labelClass}>Nome Completo</label>
                <input type="text" required className={inputClass} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className={labelClass}>E-mail</label>
                <input type="email" required className={inputClass} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className={labelClass}>Idade</label>
                   <input type="number" required className={inputClass} value={formData.age} onChange={e => setFormData({...formData, age: Number(e.target.value)})} />
                </div>
                <div>
                   <label className={labelClass}>Peso (kg)</label>
                   <input type="number" required className={inputClass} value={formData.weight} onChange={e => setFormData({...formData, weight: Number(e.target.value)})} />
                </div>
              </div>
               <div>
                   <label className={labelClass}>Altura (cm)</label>
                   <input type="number" required className={inputClass} value={formData.height} onChange={e => setFormData({...formData, height: Number(e.target.value)})} />
                </div>
              
              {/* Goals & Config */}
              <div>
                <label className={labelClass}>Objetivo Principal</label>
                <select className={inputClass} value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value as UserGoal})}>
                  {Object.values(UserGoal).map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Nível de Experiência</label>
                <select className={inputClass} value={formData.level} onChange={e => setFormData({...formData, level: e.target.value as ExperienceLevel})}>
                  {Object.values(ExperienceLevel).map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Equipamento Disponível</label>
                <select className={inputClass} value={formData.equipment} onChange={e => setFormData({...formData, equipment: e.target.value as Equipment})}>
                  {Object.values(Equipment).map(eq => <option key={eq} value={eq}>{eq}</option>)}
                </select>
              </div>

              <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-6">
                Calcular Plano e Entrar
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className={labelClass}>E-mail</label>
                <input type="email" required className={inputClass} value={email} onChange={e => setEmail(e.target.value)} />
              </div>
               <div>
                <label className={labelClass}>Senha</label>
                <input type="password" required className={inputClass} value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-2">
                Entrar
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <button 
              onClick={() => { setIsRegister(!isRegister); setError(''); }}
              className="text-sm text-slate-500 hover:text-primary font-medium"
            >
              {isRegister ? 'Já tem uma conta? Entrar' : 'Novo aqui? Crie uma conta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};