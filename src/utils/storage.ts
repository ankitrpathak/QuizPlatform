import { Quiz, QuizAttempt } from '../types/quiz';

const QUIZZES_KEY = 'micro-quiz-quizzes';
const ATTEMPTS_KEY = 'micro-quiz-attempts';

export const storageUtils = {
  // Quiz management
  getQuizzes(): Quiz[] {
    try {
      const stored = localStorage.getItem(QUIZZES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading quizzes:', error);
      return [];
    }
  },

  saveQuiz(quiz: Quiz): void {
    try {
      const quizzes = this.getQuizzes();
      const existingIndex = quizzes.findIndex(q => q.id === quiz.id);
      
      if (existingIndex !== -1) {
        quizzes[existingIndex] = quiz;
      } else {
        quizzes.push(quiz);
      }
      
      localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes));
    } catch (error) {
      console.error('Error saving quiz:', error);
      throw new Error('Failed to save quiz');
    }
  },

  deleteQuiz(quizId: string): void {
    try {
      const quizzes = this.getQuizzes();
      const filtered = quizzes.filter(q => q.id !== quizId);
      localStorage.setItem(QUIZZES_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting quiz:', error);
      throw new Error('Failed to delete quiz');
    }
  },

  // Quiz attempts management
  getAttempts(): QuizAttempt[] {
    try {
      const stored = localStorage.getItem(ATTEMPTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading attempts:', error);
      return [];
    }
  },

  saveAttempt(attempt: QuizAttempt): void {
    try {
      const attempts = this.getAttempts();
      attempts.push(attempt);
      localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
    } catch (error) {
      console.error('Error saving attempt:', error);
      throw new Error('Failed to save quiz attempt');
    }
  },

  getQuizAttempts(quizId: string): QuizAttempt[] {
    return this.getAttempts().filter(attempt => attempt.quizId === quizId);
  },

  // Generate unique ID
  generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
};