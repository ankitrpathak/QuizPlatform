import React from 'react';
import { Quiz, QuizAttempt } from '../../types/quiz';
import { Clock, Target, TrendingUp } from 'lucide-react';

interface RecentActivityProps {
  attempts: QuizAttempt[];
  quizzes: Quiz[];
  onViewChange: (view: string) => void;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ attempts, quizzes, onViewChange }) => {
  const getQuizTitle = (quizId: string) => {
    const quiz = quizzes.find(q => q.id === quizId);
    return quiz ? quiz.title : 'Unknown Quiz';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMins > 0) return `${diffMins}m ago`;
    return 'Just now';
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-accent-600 bg-accent-50';
    if (percentage >= 60) return 'text-warning-600 bg-warning-50';
    return 'text-error-600 bg-error-50';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button
          onClick={() => onViewChange('results')}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          View All
        </button>
      </div>

      {attempts.length > 0 ? (
        <div className="space-y-4">
          {attempts.map((attempt, index) => (
            <div 
              key={attempt.id} 
              className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`p-2 rounded-lg ${getScoreColor(attempt.percentage)}`}>
                <Target className="h-5 w-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {getQuizTitle(attempt.quizId)}
                </p>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTimeAgo(attempt.completedAt)}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`text-sm font-bold ${getScoreColor(attempt.percentage).split(' ')[0]}`}>
                  {attempt.percentage}%
                </p>
                <p className="text-xs text-gray-500">
                  {attempt.score}/{attempt.totalPoints}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Target className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 mb-2">No quiz attempts yet</p>
          <button
            onClick={() => onViewChange('quiz-list')}
            className="btn-primary text-sm"
          >
            Take Your First Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;