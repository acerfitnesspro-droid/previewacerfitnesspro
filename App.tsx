import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthScreen } from './screens/AuthScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { WorkoutScreen } from './screens/WorkoutScreen';
import { DietScreen } from './screens/DietScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { UserProfile, WorkoutPlan, DietPlan, ProgressEntry } from './types';
import { storageService } from './services/storageService';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [workout, setWorkout] = useState<WorkoutPlan | null>(null);
  const [diet, setDiet] = useState<DietPlan | null>(null);
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage on load
    const storedUser = storageService.getUser();
    if (storedUser) {
      setUser(storedUser);
      setWorkout(storageService.getWorkout());
      setDiet(storageService.getDiet());
      setProgress(storageService.getProgress());
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    setWorkout(storageService.getWorkout());
    setDiet(storageService.getDiet());
    setProgress(storageService.getProgress());
  };

  const handleLogout = () => {
    storageService.logout();
    setUser(null);
    setWorkout(null);
    setDiet(null);
  };

  if (isLoading) return null;

  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <HashRouter>
      <Layout onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<DashboardScreen user={user} workout={workout} diet={diet} />} />
          <Route path="/workout" element={<WorkoutScreen workout={workout} />} />
          <Route path="/diet" element={<DietScreen diet={diet} />} />
          <Route path="/progress" element={<ProgressScreen initialData={progress} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;