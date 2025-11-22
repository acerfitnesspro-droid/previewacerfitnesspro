import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, WorkoutPlan, DietPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define the schema for the structured output we want from Gemini
const fitnessPlanSchema = {
  type: Type.OBJECT,
  properties: {
    workoutPlan: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        description: { type: Type.STRING },
        exercises: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              sets: { type: Type.NUMBER },
              reps: { type: Type.STRING },
              tips: { type: Type.STRING },
            },
          },
        },
      },
    },
    dietPlan: {
      type: Type.OBJECT,
      properties: {
        dailyCalories: { type: Type.NUMBER },
        macros: {
          type: Type.OBJECT,
          properties: {
            protein: { type: Type.NUMBER },
            carbs: { type: Type.NUMBER },
            fats: { type: Type.NUMBER },
          },
        },
        meals: {
          type: Type.OBJECT,
          properties: {
            breakfast: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                calories: { type: Type.NUMBER },
                protein: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                fats: { type: Type.NUMBER },
              },
            },
            lunch: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                calories: { type: Type.NUMBER },
                protein: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                fats: { type: Type.NUMBER },
              },
            },
            dinner: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                calories: { type: Type.NUMBER },
                protein: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                fats: { type: Type.NUMBER },
              },
            },
            snack: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                calories: { type: Type.NUMBER },
                protein: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                fats: { type: Type.NUMBER },
              },
            },
          },
        },
      },
    },
  },
};

export const generateFitnessData = async (user: UserProfile): Promise<{ workout: WorkoutPlan, diet: DietPlan }> => {
  const prompt = `
    Crie uma rotina de treino diária personalizada e um plano de dieta de 1 dia para um usuário com o seguinte perfil:
    Idade: ${user.age}
    Gênero: Misto (Genérico)
    Altura: ${user.height} cm
    Peso: ${user.weight} kg
    Objetivo: ${user.goal}
    Nível de Experiência: ${user.level}
    Equipamento Disponível: ${user.equipment}

    Seja específico com os exercícios e as porções das refeições. Responda TUDO em Português do Brasil.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: fitnessPlanSchema,
        systemInstruction: "Você é um especialista em fitness e nutricionista brasileiro. Forneça conselhos seguros, eficazes e cientificamente comprovados. Gere todo o conteúdo em Português do Brasil."
      }
    });

    const text = response.text;
    if (!text) throw new Error("Sem resposta da IA");

    const data = JSON.parse(text);
    
    return {
      workout: {
        id: Date.now().toString() + '-w',
        ...data.workoutPlan
      },
      diet: {
        id: Date.now().toString() + '-d',
        ...data.dietPlan
      }
    };

  } catch (error) {
    console.error("Erro ao gerar plano:", error);
    throw error;
  }
};