import React from 'react';
import { Quiz, QuizAttempt } from '../../types/quiz';
import { Trophy, Clock, Target, TrendingUp, Calendar } from 'lucide-react';

interface ResultsOverviewProps {
  attempts: QuizAttempt[];
  quizzes: Quiz[];
  onViewChange: (view: string) => void;
}

const ResultsOverview: React.FC<ResultsOverviewProps> = ({ attempts, quizzes, onViewChange }) => {
  if (attempts.length === 0) return null;

  const averageScore = Math.round(
    attempts.reduce((sum, attempt) => sum + attempt.percentage, 0) / attempts.length
  );
  
  const totalTimeSpent = attempts.reduce((sum, attempt) => sum + attempt.timeSpent, 0);
  const averageTime = Math.round(totalTimeSpent / attempts.length);
  
  const bestScore = Math.max(...attempts.map(a => a.percentage));
  
  const recentAttempts = attempts
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    .slice(0, 5);

  const getQuizTitle = (quizId: string) => {
    const quiz = quizzes.find(q => q.id === quizId);
    return quiz ? quiz.title : 'Unknown Quiz';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Recently';
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-accent-600';
    if (percentage >= 60) return 'text-warning-600';
    return 'text-error-600';
  };

  const stats = [
    {
      title: 'Average Score',
      value: `${averageScore}%`,
      icon: Trophy,
      color: 'bg-primary-50 text-primary-600',
      change: '+2.5%'
    },
    {
      title: 'Best Score',
      value: `${bestScore}%`,
      icon: Target,
      color: 'bg-accent-50 text-accent-600',
      change: 'Personal best'
    },
    {
      title: 'Average Time',
      value: `${Math.floor(averageTime / 60)}m ${averageTime % 60}s`,
      icon: Clock,
      color: 'bg-blue-50 text-blue-600',
      change: '-15s'
    },
    {
      title: 'Total Attempts',
      value: attempts.length.toString(),
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-600',
      change: `${attempts.length} quiz${attempts.length !== 1 ? 'es' : ''}`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={stat.title}
            className="card hover:shadow-lg transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Attempts */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Attempts</h3>
          <button
            onClick={() => onViewChange('quiz-list')}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Take Another Quiz
          </button>
        </div>

        <div className="space-y-4">
          {recentAttempts.map((attempt, index) => (
            <div 
              key={attempt.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  attempt.percentage >= 80 ? 'bg-accent-100 text-accent-600' :
                  attempt.percentage >= 60 ? 'bg-warning-100 text-warning-600' :
                  'bg-error-100 text-error-600'
                }`}>
                  <Trophy className="h-4 w-4" />
                </div>
                
                <div>
                  <p className="font-medium text-gray-900">
                    {getQuizTitle(attempt.quizId)}
                  </p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatTimeAgo(attempt.completedAt)}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`text-lg font-bold ${getScoreColor(attempt.percentage)}`}>
                  {attempt.percentage}%
                </p>
                <p className="text-sm text-gray-500">
                  {attempt.score}/{attempt.totalPoints} pts
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsOverview;