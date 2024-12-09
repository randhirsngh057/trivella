export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface Category {
  id: number;
  name: string;
}

export interface QuizSettings {
  category: number;
  difficulty: 'easy' | 'medium' | 'hard';
}