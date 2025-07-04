import React from 'react';
import { Question } from '../../types/quiz';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  answer: string | number | undefined;
  onAnswer: (answer: string | number) => void;
  showCorrectAnswer?: boolean;
  isReview?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  answer,
  onAnswer,
  showCorrectAnswer = false,
  isReview = false
}) => {
  const getOptionColor = (optionIndex: number) => {
    if (!showCorrectAnswer) {
      return answer === optionIndex 
        ? 'border-primary-500 bg-primary-50 text-primary-700'
        : 'border-gray-300 hover:border-gray-400 bg-white text-gray-700';
    }

    // Review mode colors
    const isSelected = answer === optionIndex;
    const isCorrect = question.correctAnswer === optionIndex;

    if (isCorrect) {
      return 'border-accent-500 bg-accent-50 text-accent-700';
    }
    if (isSelected && !isCorrect) {
      return 'border-error-500 bg-error-50 text-error-700';
    }
    return 'border-gray-300 bg-gray-50 text-gray-500';
  };

  const getTrueFalseColor = (value: number) => {
    if (!showCorrectAnswer) {
      return answer === value 
        ? 'border-primary-500 bg-primary-50 text-primary-700'
        : 'border-gray-300 hover:border-gray-400 bg-white text-gray-700';
    }

    // Review mode colors
    const isSelected = answer === value;
    const isCorrect = question.correctAnswer === value;

    if (isCorrect) {
      return 'border-accent-500 bg-accent-50 text-accent-700';
    }
    if (isSelected && !isCorrect) {
      return 'border-error-500 bg-error-50 text-error-700';
    }
    return 'border-gray-300 bg-gray-50 text-gray-500';
  };

  const getIcon = (optionIndex: number) => {
    if (!showCorrectAnswer) return null;

    const isSelected = answer === optionIndex;
    const isCorrect = question.correctAnswer === optionIndex;

    if (isCorrect) {
      return <CheckCircle className="h-5 w-5 text-accent-600" />;
    }
    if (isSelected && !isCorrect) {
      return <XCircle className="h-5 w-5 text-error-600" />;
    }
    return null;
  };

  return (
    <div className="card max-w-3xl mx-auto">
      {/* Question Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <HelpCircle className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Question {questionNumber} of {totalQuestions}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {question.points} point{question.points !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {question.type.replace('-', ' ')}
        </span>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.type === 'multiple-choice' && question.options && (
          <>
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !isReview && onAnswer(index)}
                disabled={isReview}
                className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 flex items-center justify-between ${getOptionColor(index)} ${
                  isReview ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-sm bg-white bg-opacity-50 rounded-full w-6 h-6 flex items-center justify-center">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
                {getIcon(index)}
              </button>
            ))}
          </>
        )}

        {question.type === 'true-false' && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => !isReview && onAnswer(0)}
              disabled={isReview}
              className={`p-4 text-center border-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${getTrueFalseColor(0)} ${
                isReview ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <span>True</span>
              {showCorrectAnswer && getIcon(0)}
            </button>
            <button
              onClick={() => !isReview && onAnswer(1)}
              disabled={isReview}
              className={`p-4 text-center border-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${getTrueFalseColor(1)} ${
                isReview ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <span>False</span>
              {showCorrectAnswer && getIcon(1)}
            </button>
          </div>
        )}

        {question.type === 'short-answer' && (
          <div>
            <textarea
              value={answer as string || ''}
              onChange={(e) => !isReview && onAnswer(e.target.value)}
              disabled={isReview}
              placeholder="Type your answer here..."
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none transition-colors resize-none"
              rows={4}
            />
            {showCorrectAnswer && (
              <div className="mt-3 p-3 bg-accent-50 border border-accent-200 rounded-lg">
                <p className="text-sm font-medium text-accent-800 mb-1">Correct Answer:</p>
                <p className="text-sm text-accent-700">{question.correctAnswer}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Explanation (only shown in review mode) */}
      {showCorrectAnswer && question.explanation && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-medium text-blue-800 mb-2">Explanation:</p>
          <p className="text-sm text-blue-700">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;