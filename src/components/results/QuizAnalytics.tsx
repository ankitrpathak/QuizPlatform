import React from 'react';
import { Quiz, QuizAttempt } from '../../types/quiz';
import { BarChart3, TrendingUp, Users, Clock } from 'lucide-react';

interface QuizAnalyticsProps {
  quizzes: Quiz[];
  attempts: QuizAttempt[];
  selectedQuizId: string;
}

const QuizAnalytics: React.FC<QuizAnalyticsProps> = ({ quizzes, attempts, selectedQuizId }) => {
  const getQuizStats = (quizId: string) => {
    const quizAttempts = attempts.filter(a => a.quizId === quizId);
    if (quizAttempts.length === 0) return null;

    const averageScore = Math.round(
      quizAttempts.reduce((sum, a) => sum + a.percentage, 0) / quizAttempts.length
    );
    const bestScore = Math.max(...quizAttempts.map(a => a.percentage));
    const averageTime = Math.round(
      quizAttempts.reduce((sum, a) => sum + a.timeSpent, 0) / quizAttempts.length
    );

    return {
      totalAttempts: quizAttempts.length,
      averageScore,
      bestScore,
      averageTime,
      passRate: Math.round((quizAttempts.filter(a => a.percentage >= 70).length / quizAttempts.length) * 100)
    };
  };

  const selectedQuizzes = selectedQuizId === 'all' 
    ? quizzes.filter(quiz => attempts.some(a => a.quizId === quiz.id))
    : quizzes.filter(quiz => quiz.id === selectedQuizId);

  const getScoreDistribution = (quizId: string) => {
    const quizAttempts = attempts.filter(a => a.quizId === quizId);
    const grades = {
      'A (90-100%)': quizAttempts.filter(a => a.percentage >= 90).length,
      'B (80-89%)': quizAttempts.filter(a => a.percentage >= 80 && a.percentage < 90).length,
      'C (70-79%)': quizAttempts.filter(a => a.percentage >= 70 && a.percentage < 80).length,
      'D (60-69%)': quizAttempts.filter(a => a.percentage >= 60 && a.percentage < 70).length,
      'F (<60%)': quizAttempts.filter(a => a.percentage < 60).length,
    };
    return grades;
  };

  if (selectedQuizzes.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <BarChart3 className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No quiz data available for analysis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Detailed Analytics</h3>
      
      {selectedQuizzes.map(quiz => {
        const stats = getQuizStats(quiz.id);
        if (!stats) return null;

        const distribution = getScoreDistribution(quiz.id);
        const maxCount = Math.max(...Object.values(distribution));

        return (
          <div key={quiz.id} className="card">
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{quiz.title}</h4>
              <p className="text-sm text-gray-600">{quiz.category} • {quiz.difficulty}</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Users className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                <p className="text-lg font-bold text-gray-900">{stats.totalAttempts}</p>
                <p className="text-xs text-gray-600">Attempts</p>
              </div>
              
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <BarChart3 className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                <p className="text-lg font-bold text-gray-900">{stats.averageScore}%</p>
                <p className="text-xs text-gray-600">Avg Score</p>
              </div>
              
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <TrendingUp className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                <p className="text-lg font-bold text-gray-900">{stats.bestScore}%</p>
                <p className="text-xs text-gray-600">Best Score</p>
              </div>
              
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Clock className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                <p className="text-lg font-bold text-gray-900">
                  {Math.floor(stats.averageTime / 60)}:{(stats.averageTime % 60).toString().padStart(2, '0')}
                </p>
                <p className="text-xs text-gray-600">Avg Time</p>
              </div>
            </div>

            {/* Score Distribution */}
            <div>
              <h5 className="font-medium text-gray-900 mb-4">Score Distribution</h5>
              <div className="space-y-3">
                {Object.entries(distribution).map(([grade, count]) => {
                  const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                  const color = grade.startsWith('A') ? 'bg-accent-500' :
                               grade.startsWith('B') ? 'bg-blue-500' :
                               grade.startsWith('C') ? 'bg-warning-500' :
                               grade.startsWith('D') ? 'bg-orange-500' :
                               'bg-error-500';
                  
                  return (
                    <div key={grade} className="flex items-center space-x-3">
                      <div className="w-16 text-sm text-gray-600">{grade}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${color}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="w-8 text-sm font-medium text-gray-900">{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pass Rate */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Pass Rate (≥70%)</span>
                <span className={`text-lg font-bold ${
                  stats.passRate >= 80 ? 'text-accent-600' :
                  stats.passRate >= 60 ? 'text-warning-600' :
                  'text-error-600'
                }`}>
                  {stats.passRate}%
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    stats.passRate >= 80 ? 'bg-accent-500' :
                    stats.passRate >= 60 ? 'bg-warning-500' :
                    'bg-error-500'
                  }`}
                  style={{ width: `${stats.passRate}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizAnalytics;