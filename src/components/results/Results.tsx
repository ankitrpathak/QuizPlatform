import React, { useState } from 'react';
import { Quiz, QuizAttempt } from '../../types/quiz';
import { storageUtils } from '../../utils/storage';
import ResultsOverview from './ResultsOverview';
import QuizAnalytics from './QuizAnalytics';
import { BarChart3, Search, Filter } from 'lucide-react';

interface ResultsProps {
  onViewChange: (view: string) => void;
}

const Results: React.FC<ResultsProps> = ({ onViewChange }) => {
  const [quizzes] = useState<Quiz[]>(storageUtils.getQuizzes());
  const [attempts] = useState<QuizAttempt[]>(storageUtils.getAttempts());
  const [selectedQuizId, setSelectedQuizId] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAttempts = attempts.filter(attempt => {
    const matchesQuiz = selectedQuizId === 'all' || attempt.quizId === selectedQuizId;
    const quiz = quizzes.find(q => q.id === attempt.quizId);
    const matchesSearch = !searchTerm || 
      (quiz && quiz.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesQuiz && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quiz Results & Analytics</h1>
          <p className="text-gray-600 mt-1">
            Track your performance and analyze quiz results
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-primary-600" />
          <span className="text-sm font-medium text-gray-700">
            {attempts.length} total attempt{attempts.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search quiz results..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Quiz Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={selectedQuizId}
              onChange={(e) => setSelectedQuizId(e.target.value)}
              className="input pl-10 appearance-none"
            >
              <option value="all">All Quizzes</option>
              {quizzes.map(quiz => (
                <option key={quiz.id} value={quiz.id}>
                  {quiz.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {attempts.length > 0 ? (
        <>
          {/* Results Overview */}
          <ResultsOverview 
            attempts={filteredAttempts} 
            quizzes={quizzes}
            onViewChange={onViewChange}
          />

          {/* Quiz Analytics */}
          <QuizAnalytics 
            quizzes={quizzes} 
            attempts={attempts}
            selectedQuizId={selectedQuizId}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results yet</h3>
            <p className="text-gray-500 mb-6">
              Take your first quiz to see your performance analytics here.
            </p>
            <button
              onClick={() => onViewChange('quiz-list')}
              className="btn-primary"
            >
              Take a Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;