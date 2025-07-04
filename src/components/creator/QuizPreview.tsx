import React from 'react';
import { Quiz } from '../../types/quiz';
import { BookOpen, Clock, Tag, BarChart3, Save, Edit3, CheckCircle } from 'lucide-react';

interface QuizPreviewProps {
  quiz: Quiz;
  onSave: () => void;
  onEdit: () => void;
}

const QuizPreview: React.FC<QuizPreviewProps> = ({ quiz, onSave, onEdit }) => {
  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-accent-100 text-accent-800';
      case 'medium': return 'bg-warning-100 text-warning-800';
      case 'hard': return 'bg-error-100 text-error-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case 'multiple-choice': return '📝';
      case 'true-false': return '✅';
      case 'short-answer': return '💭';
      default: return '❓';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Quiz Overview */}
      <div className="card bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Tag className="h-4 w-4" />
                <span>{quiz.category}</span>
              </div>
              
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
                {quiz.difficulty}
              </span>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <BookOpen className="h-4 w-4" />
                <span>{quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}</span>
              </div>
              
              {quiz.timeLimit && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{quiz.timeLimit} minutes</span>
                </div>
              )}
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <BarChart3 className="h-4 w-4" />
                <span>{totalPoints} total points</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onEdit}
            className="btn-secondary flex items-center space-x-2"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit Info</span>
          </button>
        </div>
      </div>

      {/* Questions Preview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Questions Preview</h2>
          <button
            onClick={onEdit}
            className="btn-secondary text-sm"
          >
            Edit Questions
          </button>
        </div>

        <div className="grid gap-6">
          {quiz.questions.map((question, index) => (
            <div key={question.id} className="card">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="font-semibold text-primary-600">{index + 1}</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getQuestionTypeIcon(question.type)}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {question.type.replace('-', ' ')}
                      </span>
                      <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full">
                        {question.points} point{question.points !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {question.question}
                  </h3>
                  
                  {question.type === 'multiple-choice' && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`flex items-center space-x-3 p-3 rounded-lg border ${
                            question.correctAnswer === optionIndex
                              ? 'border-accent-200 bg-accent-50'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <span className="font-medium text-sm bg-white rounded-full w-6 h-6 flex items-center justify-center">
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          <span className="text-gray-700">{option}</span>
                          {question.correctAnswer === optionIndex && (
                            <CheckCircle className="h-4 w-4 text-accent-600 ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'true-false' && (
                    <div className="flex space-x-4">
                      <div className={`flex items-center space-x-2 p-3 rounded-lg border ${
                        question.correctAnswer === 0
                          ? 'border-accent-200 bg-accent-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}>
                        <span>True</span>
                        {question.correctAnswer === 0 && (
                          <CheckCircle className="h-4 w-4 text-accent-600" />
                        )}
                      </div>
                      <div className={`flex items-center space-x-2 p-3 rounded-lg border ${
                        question.correctAnswer === 1
                          ? 'border-accent-200 bg-accent-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}>
                        <span>False</span>
                        {question.correctAnswer === 1 && (
                          <CheckCircle className="h-4 w-4 text-accent-600" />
                        )}
                      </div>
                    </div>
                  )}
                  
                  {question.type === 'short-answer' && (
                    <div className="p-3 border border-accent-200 bg-accent-50 rounded-lg">
                      <p className="text-sm font-medium text-accent-800 mb-1">Correct Answer:</p>
                      <p className="text-accent-700">{question.correctAnswer}</p>
                    </div>
                  )}
                  
                  {question.explanation && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-800 mb-1">Explanation:</p>
                      <p className="text-sm text-blue-700">{question.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Section */}
      <div className="card bg-gradient-to-r from-accent-50 to-primary-50 border-accent-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Save?</h3>
          <p className="text-gray-600 mb-6">
            Your quiz looks great! Save it to make it available for learners to take.
          </p>
          <button
            onClick={onSave}
            className="btn-accent flex items-center space-x-2 mx-auto px-8 py-3 text-lg"
          >
            <Save className="h-5 w-5" />
            <span>Save Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPreview;