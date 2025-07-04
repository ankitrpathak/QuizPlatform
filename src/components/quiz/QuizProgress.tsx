import React from 'react';
import { Question } from '../../types/quiz';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  answers: { [questionId: string]: string | number };
  questions: Question[];
}

const QuizProgress: React.FC<QuizProgressProps> = ({
  currentQuestion,
  totalQuestions,
  answers,
  questions
}) => {
  const answeredCount = Object.keys(answers).length;
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
          <p className="text-sm text-gray-600">
            {answeredCount} of {totalQuestions} questions answered
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary-600">
            {Math.round(progressPercentage)}%
          </p>
          <p className="text-xs text-gray-500">Complete</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white rounded-full h-3 mb-4">
        <div 
          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Question Indicators */}
      <div className="grid grid-cols-10 gap-2">
        {questions.slice(0, 10).map((question, index) => {
          const isAnswered = answers[question.id] !== undefined;
          const isCurrent = index + 1 === currentQuestion;
          
          return (
            <div
              key={question.id}
              className={`h-2 rounded-full transition-all duration-300 ${
                isCurrent
                  ? 'bg-primary-600 ring-2 ring-primary-300'
                  : isAnswered
                  ? 'bg-accent-500'
                  : 'bg-gray-300'
              }`}
            />
          );
        })}
        {questions.length > 10 && (
          <div className="flex items-center justify-center text-xs text-gray-500">
            +{questions.length - 10}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizProgress;