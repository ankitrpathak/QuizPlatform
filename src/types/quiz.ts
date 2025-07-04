export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number; // in minutes
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  answers: { [questionId: string]: string | number };
  score: number;
  totalPoints: number;
  timeSpent: number; // in seconds
  completedAt: Date;
  percentage: number;
}

export interface QuizStats {
  totalAttempts: number;
  averageScore: number;
  highestScore: number;
  averageTime: number;
  passRate: number;
}