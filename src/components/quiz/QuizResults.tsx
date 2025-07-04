import React, { useState } from 'react';
import { Quiz, QuizAttempt } from '../../types/quiz';
import { storageUtils } from '../../utils/storage';
import QuestionCard from './QuestionCard';
import { Trophy, Clock, Target, RotateCcw, ArrowLeft, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface QuizResultsProps {
  quiz: Quiz;
  attempt: QuizAttempt;
  onBack: () => void;
  onRetake: () => void;
  onComplete: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  quiz, 
  attempt, 
  onBack, 
  onRetake, 
  onComplete 
}) => {
  const [showReview, setShowReview] = useState(false);
  const [reviewQuestionIndex, setReviewQuestionIndex] = useState(0);

  const allAttempts = storageUtils.getQuizAttempts(quiz.id);
  const bestScore = Math.max(...allAttempts.map(a => a.percentage));
  const isPersonalBest = attempt.percentage === bestScore;

  const getScoreGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-accent-600', bg: 'bg-accent-50' };
    if (percentage >= 80) return { grade: 'A', color: 'text-accent-600', bg: 'bg-accent-50' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 60) return { grade: 'C', color: 'text-warning-600', bg: 'bg-warning-50' };
    return { grade: 'F', color: 'text-error-600', bg: 'bg-error-50' };
  };

  const scoreInfo = getScoreGrade(attempt.percentage);

  if (showReview) {
    const currentQuestion = quiz.questions[reviewQuestionIndex];
    
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Review Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowReview(false)}
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Results</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">Review Answers</h1>
            <p className="text-sm text-gray-500">
              Question {reviewQuestionIndex + 1} of {quiz.questions.length}
            </p>
          </div>

          <div className="w-32" /> {/* Spacer for alignment */}
        </div>

        {/* Question Review */}
        <QuestionCard
          question={currentQuestion}
          questionNumber={reviewQuestionIndex + 1}
          totalQuestions={quiz.questions.length}
          answer={attempt.answers[currentQuestion.id]}
          onAnswer={() => {}} // No-op in review mode
          showCorrectAnswer={true}
          isReview={true}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setReviewQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={reviewQuestionIndex === 0}
            className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <span className="text-sm text-gray-500">
            {reviewQuestionIndex + 1} / {quiz.questions.length}
          </span>

          <button
            onClick={() => setReviewQuestionIndex(prev => Math.min(quiz.questions.length - 1, prev + 1))}
            disabled={reviewQuestionIndex === quiz.questions.length - 1}
            className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${scoreInfo.bg} mb-4`}>
          <Trophy className={`h-10 w-10 ${scoreInfo.color}`} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
        <p className="text-lg text-gray-600">{quiz.title}</p>
        {isPersonalBest && (
          <div className="inline-flex items-center space-x-2 mt-2 px-3 py-1 bg-accent-100 text-accent-800 rounded-full text-sm font-medium">
            <Trophy className="h-4 w-4" />
            <span>Personal Best!</span>
          </div>
        )}
      </div>

      {/* Score Card */}
      <div className="card text-center bg-gradient-to-br from-gray-50 to-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Score */}
          <div>
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${scoreInfo.bg} mb-3`}>
              <span className={`text-2xl font-bold ${scoreInfo.color}`}>
                {scoreInfo.grade}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {attempt.percentage}%
            </p>
            <p className="text-sm text-gray-500">
              {attempt.score} of {attempt.totalPoints} points
            </p>
          </div>

          {/* Time */}
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-3">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {Math.floor(attempt.timeSpent / 60)}:{(attempt.timeSpent % 60).toString().padStart(2, '0')}
            </p>
            <p className="text-sm text-gray-500">Time taken</p>
          </div>

          {/* Accuracy */}
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-50 mb-3">
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {Math.round((Object.keys(attempt.answers).length / quiz.questions.length) * 100)}%
            </p>
            <p className="text-sm text-gray-500">Questions answered</p>
          </div>
        </div>
      </div>

      {/* Question Breakdown */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quiz.questions.map((question, index) => {
            const userAnswer = attempt.answers[question.id];
            const isCorrect = userAnswer !== undefined && userAnswer === question.correctAnswer;
            
            return (
              <div
                key={question.id}
                className={`p-4 rounded-lg border-2 ${
                  isCorrect
                    ? 'border-accent-200 bg-accent-50'
                    : userAnswer !== undefined
                    ? 'border-error-200 bg-error-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    Question {index + 1}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    isCorrect
                      ? 'bg-accent-100 text-accent-800'
                      : userAnswer !== undefined
                      ? 'bg-error-100 text-error-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isCorrect ? 'Correct' : userAnswer !== undefined ? 'Incorrect' : 'Skipped'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {question.question}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {question.points} point{question.points !== 1 ? 's' : ''}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setShowReview(true)}
          className="btn-secondary flex items-center justify-center space-x-2"
        >
          <Eye className="h-4 w-4" />
          <span>Review Answers</span>
        </button>
        
        <button
          onClick={onRetake}
          className="btn-primary flex items-center justify-center space-x-2"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Retake Quiz</span>
        </button>
        
        <button
          onClick={onComplete}
          className="btn-accent flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Stats Comparison */}
      {allAttempts.length > 1 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{allAttempts.length}</p>
              <p className="text-sm text-gray-500">Total Attempts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{bestScore}%</p>
              <p className="text-sm text-gray-500">Best Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(allAttempts.reduce((sum, a) => sum + a.percentage, 0) / allAttempts.length)}%
              </p>
              <p className="text-sm text-gray-500">Average Score</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizResults;