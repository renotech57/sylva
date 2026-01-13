import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private getAI() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY manquante.");
    }
    return new GoogleGenAI({ apiKey });
  }

  async getExpertAdvice(userAnswer: string, correctAnswer: string, question: string): Promise<string> {
    try {
      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `En tant qu'expert en charpente traditionnelle française (spécialiste Grand Est), explique pourquoi "${correctAnswer}" est la bonne réponse pour : "${question}". L'utilisateur a dit "${userAnswer}". Donne un conseil de vente pour un commercial de SylvaStructure. Réponds en français.`,
      });
      return response.text || "Explication indisponible.";
    } catch (error) {
      return "Erreur de connexion avec l'expert IA.";
    }
  }

  async simulateClientResponse(userPitch: string, clientProfile: string, technicalTopic: string): Promise<{ reaction: string, score: number, feedback: string }> {
    try {
      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Tu joues le rôle d'un client : ${clientProfile}. Le commercial de SylvaStructure essaie de te vendre ou t'expliquer : ${technicalTopic}. Voici son argumentaire : "${userPitch}". 
        Réponds comme le client (sois un peu sceptique ou pointilleux). 
        Ensuite, sors du rôle et donne un score sur 100 (technique + persuasion) et un feedback constructif.
        Formatte ta réponse en JSON strictement avec les clés: reaction (texte), score (nombre), feedback (texte).`,
        config: {
          responseMimeType: "application/json"
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      return { reaction: "Je ne comprends pas bien votre explication...", score: 0, feedback: "Erreur de simulation." };
    }
  }
}

export const gemini = new GeminiService();