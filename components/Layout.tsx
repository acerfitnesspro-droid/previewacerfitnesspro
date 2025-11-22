import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Dumbbell, Utensils, TrendingUp, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-primary bg-green-50' : 'text-slate-500 hover:text-slate-700';
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Mobile/Desktop Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Dumbbell className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-xl text-slate-800">FitLife GenAI</span>
          </div>
          <button 
            onClick={onLogout}
            className="md:hidden p-2 text-slate-400"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 pb-24 md:pb-6">
        {children}
      </main>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/')}`}>
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs font-medium">Início</span>
          </Link>
          <Link to="/workout" className={`flex flex-col items-center gap-1 ${isActive('/workout')}`}>
            <Dumbbell className="w-5 h-5" />
            <span className="text-xs font-medium">Treino</span>
          </Link>
          <Link to="/diet" className={`flex flex-col items-center gap-1 ${isActive('/diet')}`}>
            <Utensils className="w-5 h-5" />
            <span className="text-xs font-medium">Dieta</span>
          </Link>
          <Link to="/progress" className={`flex flex-col items-center gap-1 ${isActive('/progress')}`}>
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-medium">Progresso</span>
          </Link>
        </div>
      </nav>

      {/* Sidebar for Desktop (Hidden on mobile) */}
      <aside className="hidden md:flex fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-slate-200 flex-col py-6 px-4">
        <nav className="flex flex-col gap-2 space-y-1">
          <Link to="/" className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${isActive('/')}`}>
            <LayoutDashboard className="w-5 h-5" />
            Painel
          </Link>
          <Link to="/workout" className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${isActive('/workout')}`}>
            <Dumbbell className="w-5 h-5" />
            Treinos
          </Link>
          <Link to="/diet" className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${isActive('/diet')}`}>
            <Utensils className="w-5 h-5" />
            Plano Alimentar
          </Link>
          <Link to="/progress" className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${isActive('/progress')}`}>
            <TrendingUp className="w-5 h-5" />
            Progresso
          </Link>
        </nav>
        <div className="mt-auto">
            <button 
                onClick={onLogout}
                className="flex items-center gap-3 p-3 rounded-lg font-medium text-slate-500 hover:bg-red-50 hover:text-red-500 w-full transition-colors"
            >
                <LogOut className="w-5 h-5" />
                Sair
            </button>
        </div>
      </aside>
    </div>
  );
};