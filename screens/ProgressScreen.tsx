import React, { useState } from 'react';
import { ProgressEntry } from '../types';
import { storageService } from '../services/storageService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus } from 'lucide-react';

interface ProgressScreenProps {
  initialData: ProgressEntry[];
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({ initialData }) => {
  const [data, setData] = useState<ProgressEntry[]>(initialData);
  const [showForm, setShowForm] = useState(false);
  
  // New Entry State
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  
  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: ProgressEntry = {
      date: new Date().toISOString().split('T')[0],
      weight: Number(weight),
      waist: waist ? Number(waist) : undefined
    };
    
    const updated = storageService.addProgress(newEntry);
    setData(updated);
    setShowForm(false);
    setWeight('');
    setWaist('');
  };

  return (
    <div className="space-y-6 md:ml-64">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Seu Progresso</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Registrar
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-5 rounded-xl shadow-lg border border-primary/20 animate-in fade-in slide-in-from-top-2">
          <h3 className="font-bold text-slate-800 mb-3">Adicionar Medida</h3>
          <form onSubmit={handleAddEntry} className="flex gap-4 items-end">
             <div>
               <label className="block text-xs text-slate-500 mb-1">Peso (kg)</label>
               <input 
                 type="number" 
                 required 
                 value={weight}
                 onChange={e => setWeight(e.target.value)}
                 className="w-full p-2 border border-slate-300 rounded focus:border-primary outline-none"
               />
             </div>
             <div>
               <label className="block text-xs text-slate-500 mb-1">Cintura (cm) (Opcional)</label>
               <input 
                 type="number" 
                 value={waist}
                 onChange={e => setWaist(e.target.value)}
                 className="w-full p-2 border border-slate-300 rounded focus:border-primary outline-none"
               />
             </div>
             <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-900">Salvar</button>
          </form>
        </div>
      )}

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-6">Evolução do Peso</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
              <YAxis domain={['auto', 'auto']} tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} width={30} />
              <Tooltip 
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#10b981" 
                strokeWidth={3} 
                dot={{r: 4, strokeWidth: 2, fill: '#fff'}} 
                activeDot={{r: 6, fill: '#10b981'}} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* History List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-50 font-bold text-slate-800">Histórico</div>
        <div className="divide-y divide-slate-50">
          {[...data].reverse().map((entry, idx) => (
            <div key={idx} className="p-4 flex justify-between items-center hover:bg-slate-50">
              <span className="text-slate-600 text-sm">{entry.date}</span>
              <div className="flex gap-6">
                <span className="font-medium text-slate-800">{entry.weight} kg</span>
                {entry.waist && <span className="text-slate-500 text-sm">{entry.waist} cm (Cintura)</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};