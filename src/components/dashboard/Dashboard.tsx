import React from 'react';
import { Quiz, QuizAttempt } from '../../types/quiz';
import { storageUtils } from '../../utils/storage';
import StatsCard from './StatsCard';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';
import { BarChart3, Brain, Clock, Trophy } from 'lucide-react';

interface DashboardProps {
  onViewChange: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const quizzes = storageUtils.getQuizzes();
  const attempts = storageUtils.getAttempts();
  
  const totalQuizzes = quizzes.length;
  const totalAttempts = attempts.length;
  const averageScore = attempts.length > 0 
    ? Math.round(attempts.reduce((sum, attempt) => sum + attempt.percentage, 0) / attempts.length)
    : 0;
  
  const recentAttempts = attempts
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    .slice(0, 5);

  const stats = [
    {
      title: 'Total Quizzes',
      value: totalQuizzes.toString(),
      icon: Brain,
      color: 'bg-primary-50 text-primary-600',
      bgColor: 'bg-primary-500'
    },
    {
      title: 'Quiz Attempts',
      value: totalAttempts.toString(),
      icon: BarChart3,
      color: 'bg-accent-50 text-accent-600',
      bgColor: 'bg-accent-500'
    },
    {
      title: 'Average Score',
      value: `${averageScore}%`,
      icon: Trophy,
      color: 'bg-warning-50 text-warning-600',
      bgColor: 'bg-warning-500'
    },
    {
      title: 'Time Spent',
      value: attempts.length > 0 
        ? `${Math.round(attempts.reduce((sum, attempt) => sum + attempt.timeSpent, 0) / 60)}m`
        : '0m',
      icon: Clock,
      color: 'bg-secondary-50 text-secondary-600',
      bgColor: 'bg-secondary-500'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Micro-Quiz Platform
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create, take, and analyze quizzes with our intuitive platform. 
          Track your progress and improve your knowledge across various topics.
        </p>
      </div>

      {/* Quick Actions */}
      <QuickActions onViewChange={onViewChange} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.color}
            bgColor={stat.bgColor}
            delay={index * 100}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentActivity 
          attempts={recentAttempts} 
          quizzes={quizzes}
          onViewChange={onViewChange}
        />
        
        {/* Popular Categories */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quiz Categories
          </h3>
          {totalQuizzes > 0 ? (
            <div className="space-y-3">
              {Array.from(new Set(quizzes.map(q => q.category))).map((category, index) => {
                const categoryQuizzes = quizzes.filter(q => q.category === category);
                const categoryAttempts = attempts.filter(a => 
                  categoryQuizzes.some(q => q.id === a.quizId)
                );
                
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{category}</p>
                      <p className="text-sm text-gray-500">
                        {categoryQuizzes.length} quiz{categoryQuizzes.length !== 1 ? 'es' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {categoryAttempts.length} attempt{categoryAttempts.length !== 1 ? 's' : ''}
                      </p>
                      {categoryAttempts.length > 0 && (
                        <p className="text-sm text-gray-500">
                          {Math.round(categoryAttempts.reduce((sum, a) => sum + a.percentage, 0) / categoryAttempts.length)}% avg
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <Brain className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No categories yet</p>
              <p className="text-sm">Create your first quiz to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;