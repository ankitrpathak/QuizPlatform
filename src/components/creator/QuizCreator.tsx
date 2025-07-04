import React, { useState } from 'react';
import { Quiz, Question } from '../../types/quiz';
import { storageUtils } from '../../utils/storage';
import QuizForm from './QuizForm';
import QuestionEditor from './QuestionEditor';
import QuizPreview from './QuizPreview';
import { ArrowLeft, Save, Eye, Plus } from 'lucide-react';

interface QuizCreatorProps {
  onBack: () => void;
  onSave: () => void;
  editingQuiz?: Quiz;
}

const QuizCreator: React.FC<QuizCreatorProps> = ({ onBack, onSave, editingQuiz }) => {
  const [quiz, setQuiz] = useState<Partial<Quiz>>(editingQuiz || {
    title: '',
    description: '',
    category: '',
    difficulty: 'medium',
    timeLimit: undefined,
    questions: []
  });
  
  const [currentStep, setCurrentStep] = useState<'info' | 'questions' | 'preview'>('info');
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

  const handleQuizInfoSubmit = (quizInfo: Partial<Quiz>) => {
    setQuiz(prev => ({ ...prev, ...quizInfo }));
    setCurrentStep('questions');
  };

  const handleAddQuestion = () => {
    setEditingQuestionIndex(quiz.questions?.length || 0);
  };

  const handleSaveQuestion = (question: Question) => {
    const questions = [...(quiz.questions || [])];
    
    if (editingQuestionIndex !== null) {
      if (editingQuestionIndex < questions.length) {
        questions[editingQuestionIndex] = question;
      } else {
        questions.push(question);
      }
    }

    setQuiz(prev => ({ ...prev, questions }));
    setEditingQuestionIndex(null);
  };

  const handleEditQuestion = (index: number) => {
    setEditingQuestionIndex(index);
  };

  const handleDeleteQuestion = (index: number) => {
    const questions = quiz.questions?.filter((_, i) => i !== index) || [];
    setQuiz(prev => ({ ...prev, questions }));
  };

  const handleSaveQuiz = () => {
    if (!isQuizValid()) return;

    const now = new Date();
    const savedQuiz: Quiz = {
      id: editingQuiz?.id || storageUtils.generateId(),
      title: quiz.title!,
      description: quiz.description!,
      category: quiz.category!,
      difficulty: quiz.difficulty!,
      timeLimit: quiz.timeLimit,
      questions: quiz.questions!,
      createdAt: editingQuiz?.createdAt || now,
      updatedAt: now
    };

    storageUtils.saveQuiz(savedQuiz);
    onSave();
  };

  const isQuizValid = () => {
    return quiz.title && quiz.description && quiz.category && 
           quiz.questions && quiz.questions.length > 0;
  };

  const steps = [
    { id: 'info', title: 'Quiz Information', completed: !!quiz.title && !!quiz.description && !!quiz.category },
    { id: 'questions', title: 'Questions', completed: !!quiz.questions && quiz.questions.length > 0 },
    { id: 'preview', title: 'Preview & Save', completed: isQuizValid() }
  ];

  if (editingQuestionIndex !== null) {
    return (
      <QuestionEditor
        question={quiz.questions?.[editingQuestionIndex]}
        onSave={handleSaveQuestion}
        onCancel={() => setEditingQuestionIndex(null)}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="btn-secondary flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
        
        <h1 className="text-2xl font-bold text-gray-900">
          {editingQuiz ? 'Edit Quiz' : 'Create New Quiz'}
        </h1>

        <div className="flex items-center space-x-2">
          {currentStep === 'questions' && (
            <button
              onClick={() => setCurrentStep('preview')}
              className="btn-secondary flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </button>
          )}
          
          {currentStep === 'preview' && (
            <button
              onClick={handleSaveQuiz}
              disabled={!isQuizValid()}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{editingQuiz ? 'Update' : 'Save'} Quiz</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Steps */}
      <div className="card">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center">
                <button
                  onClick={() => setCurrentStep(step.id as any)}
                  disabled={index > 0 && !steps[index - 1].completed}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    currentStep === step.id
                      ? 'bg-primary-600 text-white'
                      : step.completed
                      ? 'bg-accent-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  } ${
                    index > 0 && !steps[index - 1].completed 
                      ? 'cursor-not-allowed opacity-50' 
                      : 'cursor-pointer hover:bg-opacity-80'
                  }`}
                >
                  {index + 1}
                </button>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep === step.id ? 'text-primary-600' : 'text-gray-700'
                  }`}>
                    {step.title}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  step.completed ? 'bg-accent-300' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 'info' && (
        <QuizForm
          quiz={quiz}
          onSubmit={handleQuizInfoSubmit}
        />
      )}

      {currentStep === 'questions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Questions</h2>
              <p className="text-gray-600 mt-1">
                Add questions to your quiz. You need at least one question to save the quiz.
              </p>
            </div>
            <button
              onClick={handleAddQuestion}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Question</span>
            </button>
          </div>

          {quiz.questions && quiz.questions.length > 0 ? (
            <div className="space-y-4">
              {quiz.questions.map((question, index) => (
                <div key={index} className="card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-500">
                          Question {index + 1}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {question.type.replace('-', ' ')}
                        </span>
                        <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full">
                          {question.points} pts
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        {question.question}
                      </h3>
                      {question.type === 'multiple-choice' && question.options && (
                        <div className="text-sm text-gray-600">
                          <p>Options: {question.options.join(', ')}</p>
                          <p>Correct: {question.options[question.correctAnswer as number]}</p>
                        </div>
                      )}
                      {question.type === 'true-false' && (
                        <p className="text-sm text-gray-600">
                          Correct: {question.correctAnswer === 0 ? 'True' : 'False'}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditQuestion(index)}
                        className="btn-secondary text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(index)}
                        className="btn-error text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
                <p className="text-gray-500 mb-6">
                  Start building your quiz by adding your first question.
                </p>
                <button
                  onClick={handleAddQuestion}
                  className="btn-primary"
                >
                  Add First Question
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {currentStep === 'preview' && isQuizValid() && (
        <QuizPreview
          quiz={quiz as Quiz}
          onSave={handleSaveQuiz}
          onEdit={() => setCurrentStep('questions')}
        />
      )}
    </div>
  );
};

export default QuizCreator;