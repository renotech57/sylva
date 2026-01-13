import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private getAI() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY manquante. Veuillez la configurer dans les variables d'environnement Vercel.");
    }
    return new GoogleGenAI({ apiKey });
  }

  async getExpertAdvice(userAnswer: string, correctAnswer: string, question: string): Promise<string> {
    try {
      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `En tant qu'expert en charpente traditionnelle française, explique de manière pédagogique et professionnelle pourquoi la réponse "${correctAnswer}" était la bonne pour la question : "${question}". L'utilisateur a répondu "${userAnswer}". Donne un conseil pratique pour un commercial qui doit expliquer cela à un client. Réponds en français.`,
        config: {
          temperature: 0.7,
        }
      });
      return response.text || "Explication indisponible.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Le conseil d'expert n'a pas pu être généré (vérifiez la clé API).";
    }
  }
}

export const gemini = new GeminiService();