import { UserProfile, WorkoutPlan, DietPlan, UserGoal, ExperienceLevel, Equipment, Exercise, Meal } from "../types";

// ==========================================
// BANCO DE DADOS DE EXERCÍCIOS (Hardcoded)
// ==========================================

const EXERCISE_DB: Record<Equipment, Record<string, Exercise[]>> = {
  [Equipment.GYM]: {
    pull: [
      { name: "Puxada Alta (Pulldown)", description: "Sentado, puxe a barra em direção ao peito superior.", sets: 3, reps: "10-12" },
      { name: "Remada Curvada", description: "Com barra ou halteres, incline o tronco e puxe o peso.", sets: 3, reps: "10-12" },
      { name: "Rosca Direta", description: "Levantamento de barra/halteres para bíceps.", sets: 3, reps: "12-15" },
      { name: "Levantamento Terra", description: "Movimento composto fundamental para as costas e pernas.", sets: 3, reps: "6-8", tips: "Mantenha a coluna reta." }
    ],
    push: [
      { name: "Supino Reto", description: "Deitado no banco, empurre a barra para cima.", sets: 4, reps: "8-10" },
      { name: "Desenvolvimento de Ombros", description: "Sentado ou em pé, empurre os halteres acima da cabeça.", sets: 3, reps: "10-12" },
      { name: "Tríceps Corda", description: "Na polia, estenda os cotovelos para baixo.", sets: 3, reps: "12-15" },
      { name: "Elevação Lateral", description: "Levante os halteres lateralmente para os ombros.", sets: 3, reps: "12-15" }
    ],
    legs: [
      { name: "Agachamento Livre (Squat)", description: "Agache mantendo os calcanhares no chão e coluna reta.", sets: 4, reps: "8-10" },
      { name: "Leg Press 45º", description: "Empurre a plataforma com as pernas, não tranque os joelhos.", sets: 3, reps: "10-12" },
      { name: "Cadeira Extensora", description: "Isolamento para quadríceps.", sets: 3, reps: "12-15" },
      { name: "Mesa Flexora", description: "Isolamento para posteriores de coxa.", sets: 3, reps: "12-15" }
    ],
    cardio: [
      { name: "Esteira (HIIT)", description: "1 min correndo, 2 min andando.", sets: 1, reps: "20 min" },
      { name: "Elíptico", description: "Ritmo moderado constante.", sets: 1, reps: "30 min" }
    ]
  },
  [Equipment.HOME_BASIC]: {
    fullbody: [
      { name: "Agachamento com Halteres (Goblet)", description: "Segure um halter no peito e agache.", sets: 3, reps: "12-15" },
      { name: "Flexão de Braços", description: "Mãos na largura dos ombros, desça o peito até o chão.", sets: 3, reps: "Falha" },
      { name: "Remada Unilateral (Serrote)", description: "Apoie em um banco/sofá e puxe o halter.", sets: 3, reps: "12 cada lado" },
      { name: "Desenvolvimento com Halteres", description: "Em pé, empurre os pesos acima da cabeça.", sets: 3, reps: "12-15" },
      { name: "Afundo (Lunge)", description: "Dê um passo à frente e desça o joelho de trás.", sets: 3, reps: "12 cada perna" },
      { name: "Prancha Abdominal", description: "Segure a posição com o corpo reto.", sets: 3, reps: "45 seg" }
    ]
  },
  [Equipment.HOME_BODYWEIGHT]: {
    fullbody: [
      { name: "Polichinelos", description: "Aquecimento cardio.", sets: 3, reps: "50" },
      { name: "Agachamento Livre", description: "Peso do corpo, foco na amplitude.", sets: 4, reps: "20" },
      { name: "Flexão de Braços", description: "Adapte com joelhos no chão se necessário.", sets: 3, reps: "Max" },
      { name: "Afundo Búlgaro", description: "Pé de trás apoiado em uma cadeira/sofá.", sets: 3, reps: "10 cada perna" },
      { name: "Dips no Banco/Cadeira", description: "Mergulho para tríceps usando uma cadeira firme.", sets: 3, reps: "12-15" },
      { name: "Burpees", description: "Agacha, flexão, salta. Intenso.", sets: 3, reps: "10" },
      { name: "Abdominal Supra", description: "Curto, focando na contração.", sets: 3, reps: "20" }
    ]
  }
};

// ==========================================
// BANCO DE DADOS DE REFEIÇÕES
// ==========================================

const MEALS_DB = {
  breakfast: [
    { name: "Ovos Mexidos com Torrada", description: "2 ovos inteiros, 2 claras, 1 fatia de pão integral.", type: "balanced" },
    { name: "Mingau de Aveia Proteico", description: "Aveia, whey protein ou claras, banana e canela.", type: "energy" },
    { name: "Iogurte Grego com Frutas", description: "Iogurte natural, morangos e um pouco de granola.", type: "light" }
  ],
  lunch: [
    { name: "Frango Grelhado com Batata Doce", description: "Peito de frango temperado com ervas e batata assada.", type: "clean" },
    { name: "Carne Moída com Arroz e Feijão", description: "Patinho moído, arroz integral e feijão preto.", type: "classic" },
    { name: "Tilápia com Legumes", description: "Filé de peixe leve e mix de brócolis e cenoura.", type: "light" }
  ],
  dinner: [
    { name: "Salada de Atum", description: "Atum em água, alface, tomate, pepino e azeite.", type: "light" },
    { name: "Omelete de Vegetais", description: "Ovos, espinafre, tomate e cebola.", type: "lowcarb" },
    { name: "Sopa de Legumes com Frango", description: "Caldo caseiro rico em nutrientes.", type: "light" }
  ],
  snack: [
    { name: "Fruta e Castanhas", description: "1 Maçã e 5 castanhas do pará.", type: "healthy" },
    { name: "Shake de Proteína", description: "Whey protein com água ou leite desnatado.", type: "protein" },
    { name: "Barra de Cereal Caseira", description: "Aveia, mel e pasta de amendoim.", type: "energy" }
  ]
};

// ==========================================
// LÓGICA DE CÁLCULO
// ==========================================

const calculateCalories = (user: UserProfile): { calories: number; goalText: string } => {
  // Fórmula Mifflin-St Jeor (Simplificada assumindo média entre masc/fem pois não temos gênero no form)
  // Usando fórmula masculina como base segura para atividade física, ajustada levemente.
  let bmr = (10 * user.weight) + (6.25 * user.height) - (5 * user.age) + 5;

  // Fator de Atividade (Baseado no nível de experiência/frequência estimada)
  let activityMultiplier = 1.2; // Sedentário
  if (user.level === ExperienceLevel.BEGINNER) activityMultiplier = 1.375;
  if (user.level === ExperienceLevel.INTERMEDIATE) activityMultiplier = 1.55;
  if (user.level === ExperienceLevel.ADVANCED) activityMultiplier = 1.725;

  let tdee = bmr * activityMultiplier;

  // Ajuste pelo Objetivo
  let targetCalories = tdee;
  let goalText = "";

  switch (user.goal) {
    case UserGoal.LOSE_WEIGHT:
      targetCalories -= 500; // Déficit agressivo mas seguro
      goalText = "Déficit Calórico para Perda de Gordura";
      break;
    case UserGoal.GAIN_MUSCLE:
      targetCalories += 300; // Superávit leve
      goalText = "Superávit Calórico para Hipertrofia";
      break;
    case UserGoal.MAINTAIN:
    case UserGoal.IMPROVE_CARDIO:
      goalText = "Manutenção de Peso e Performance";
      break; // Mantém TDEE
  }

  return { calories: Math.round(targetCalories), goalText };
};

const calculateMacros = (calories: number, goal: UserGoal) => {
  let pRatio = 0.3; // 30% Proteína
  let cRatio = 0.4; // 40% Carb
  let fRatio = 0.3; // 30% Gordura

  if (goal === UserGoal.GAIN_MUSCLE) {
    pRatio = 0.35; cRatio = 0.45; fRatio = 0.2;
  } else if (goal === UserGoal.LOSE_WEIGHT) {
    pRatio = 0.40; cRatio = 0.30; fRatio = 0.3;
  }

  return {
    protein: Math.round((calories * pRatio) / 4),
    carbs: Math.round((calories * cRatio) / 4),
    fats: Math.round((calories * fRatio) / 9)
  };
};

// ==========================================
// GERADORES PRINCIPAIS
// ==========================================

export const generateLocalWorkout = (user: UserProfile): WorkoutPlan => {
  let exercises: Exercise[] = [];
  let workoutName = "";
  let description = "";

  // Seleção de Exercícios baseada no Equipamento
  if (user.equipment === Equipment.GYM) {
    // Lógica Simples: Se iniciante, Full Body. Se avançado/Intermediário, Split (Daremos um dia de exemplo 'Push' ou 'Full Body')
    if (user.level === ExperienceLevel.BEGINNER) {
        workoutName = "Treino Full Body (Academia)";
        description = "Foco em aprender os movimentos compostos e condicionamento geral.";
        exercises = [
            ...EXERCISE_DB[Equipment.GYM].legs.slice(0, 2), // 2 perna
            ...EXERCISE_DB[Equipment.GYM].push.slice(0, 2), // 2 empurrar
            ...EXERCISE_DB[Equipment.GYM].pull.slice(0, 2), // 2 puxar
            ...EXERCISE_DB[Equipment.GYM].cardio.slice(0, 1) // 1 cardio
        ];
    } else {
        workoutName = "Treino Upper Body & Força";
        description = "Foco em hipertrofia e aumento de carga nos superiores.";
        exercises = [
            ...EXERCISE_DB[Equipment.GYM].push,
            ...EXERCISE_DB[Equipment.GYM].pull.slice(0, 2)
        ];
    }
  } else if (user.equipment === Equipment.HOME_BASIC) {
    workoutName = "Treino Funcional com Halteres";
    description = "Use seus pesos livres para criar resistência e tonificar.";
    exercises = EXERCISE_DB[Equipment.HOME_BASIC].fullbody;
  } else {
    workoutName = "Calistenia em Casa";
    description = "Domine o peso do seu próprio corpo. Alta intensidade.";
    exercises = EXERCISE_DB[Equipment.HOME_BODYWEIGHT].fullbody;
  }

  // Ajuste de Séries/Reps baseado no Objetivo
  exercises = exercises.map(ex => {
    let newEx = { ...ex };
    if (user.goal === UserGoal.LOSE_WEIGHT) {
      newEx.reps = ex.name.includes("Esteira") ? ex.reps : "15-20";
      newEx.tips = "Descanse pouco (30-45s) entre séries para manter a frequência cardíaca alta.";
    } else if (user.goal === UserGoal.GAIN_MUSCLE) {
      newEx.reps = ex.name.includes("Esteira") ? ex.reps : "8-12";
      newEx.tips = "Foque na fase excêntrica (descida) do movimento e carga progressiva.";
    }
    return newEx;
  });

  return {
    id: `local-workout-${Date.now()}`,
    name: workoutName,
    description: description,
    exercises: exercises
  };
};

export const generateLocalDiet = (user: UserProfile): DietPlan => {
  const { calories, goalText } = calculateCalories(user);
  const macros = calculateMacros(calories, user.goal);

  // Helper para pegar item aleatório
  const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

  // Ajuste proporcional de calorias para cada refeição (aprox)
  // Café 25%, Almoço 35%, Jantar 25%, Lanche 15%
  const scaleMeal = (meal: any, pct: number) => {
    const mealCals = Math.round(calories * pct);
    return {
      ...meal,
      calories: mealCals,
      protein: Math.round((mealCals * (macros.protein * 4 / calories)) / 4),
      carbs: Math.round((mealCals * (macros.carbs * 4 / calories)) / 4),
      fats: Math.round((mealCals * (macros.fats * 9 / calories)) / 9),
      description: `${meal.description} (Porção ajustada para ${mealCals}kcal)`
    };
  };

  return {
    id: `local-diet-${Date.now()}`,
    dailyCalories: calories,
    macros: macros,
    meals: {
      breakfast: scaleMeal(getRandom(MEALS_DB.breakfast), 0.25),
      lunch: scaleMeal(getRandom(MEALS_DB.lunch), 0.35),
      dinner: scaleMeal(getRandom(MEALS_DB.dinner), 0.25),
      snack: scaleMeal(getRandom(MEALS_DB.snack), 0.15)
    }
  };
};

export const generateFitnessDataLocal = async (user: UserProfile): Promise<{ workout: WorkoutPlan, diet: DietPlan }> => {
  // Simula um delay de "processamento" para UX
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    workout: generateLocalWorkout(user),
    diet: generateLocalDiet(user)
  };
};
