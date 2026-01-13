export enum QuizCategory {
  TERMINOLOGY = 'Terminologie',
  TECHNICAL = 'Technique & Charges',
  CLIENT_ADVICE = 'Conseil Client',
  STUDY_CASE = 'Étude Technique',
}

export type QuestionType = 'multiple-choice' | 'missing-data' | 'drag-drop';

export interface Question {
  id: string;
  category: QuizCategory;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: number | number[]; 
  explanation: string;
  imageUrl?: string;
  dataContext?: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  isFinished: boolean;
  selectedOption: number | number[] | null;
  showExplanation: boolean;
  category: QuizCategory | null;
}

export interface PartInfo {
  name: string;
  description: string;
  role: string;
}