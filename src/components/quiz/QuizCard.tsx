import React from 'react';
import { Quiz } from '../../types/quiz';
import { storageUtils } from '../../utils/storage';
import { Clock, BookOpen, BarChart3, Play, Trophy } from 'lucide-react';

interface QuizCardProps {
  quiz: Quiz;
  onStart: () => void;
  delay?: number;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onStart, delay = 0 }) => {
  const attempts = storageUtils.getQuizAttempts(quiz.id);
  const bestScore = attempts.length > 0 
    ? Math.max(...attempts.map(a => a.percentage))
    : null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-accent-100 text-accent-800';
      case 'medium': return 'bg-warning-100 text-warning-800';
      case 'hard': return 'bg-error-100 text-error-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('programming') || category.toLowerCase().includes('code')) {
      return '💻';
    }
    if (category.toLowerCase().includes('science')) {
      return '🔬';
    }
    if (category.toLowerCase().includes('history')) {
      return '📚';
    }
    if (category.toLowerCase().includes('math')) {
      return '🔢';
    }
    return '🧠';
  };

  return (
    <div 
      className="card group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getCategoryIcon(quiz.category)}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {quiz.title}
            </h3>
            <p className="text-sm text-gray-500">{quiz.category}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
          {quiz.difficulty}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {quiz.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <BookOpen className="h-4 w-4" />
          <span>{quiz.questions.length} questions</span>
        </div>
        {quiz.timeLimit && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{quiz.timeLimit} minutes</span>
          </div>
        )}
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <BarChart3 className="h-4 w-4" />
          <span>{attempts.length} attempt{attempts.length !== 1 ? 's' : ''}</span>
        </div>
        {bestScore !== null && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Trophy className="h-4 w-4" />
            <span className="font-medium text-accent-600">{bestScore}% best</span>
          </div>
        )}
      </div>

      {/* Progress bar for best score */}
      {bestScore !== null && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Best Score</span>
            <span>{bestScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-accent-500 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${bestScore}%` }}
            />
          </div>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={onStart}
        className="w-full btn-primary flex items-center justify-center space-x-2 group-hover:bg-primary-700"
      >
        <Play className="h-4 w-4" />
        <span>{attempts.length > 0 ? 'Retake Quiz' : 'Start Quiz'}</span>
      </button>
    </div>
  );
};

export default QuizCard;