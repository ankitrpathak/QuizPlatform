import React, { useState } from 'react';
import { Question } from '../../types/quiz';
import { storageUtils } from '../../utils/storage';
import { Plus, Minus, Save, X, HelpCircle } from 'lucide-react';

interface QuestionEditorProps {
  question?: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ question, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    type: question?.type || 'multiple-choice' as Question['type'],
    question: question?.question || '',
    options: question?.options || ['', '', '', ''],
    correctAnswer: question?.correctAnswer || 0,
    explanation: question?.explanation || '',
    points: question?.points || 10
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.question.trim()) {
      newErrors.question = 'Question is required';
    }

    if (formData.type === 'multiple-choice') {
      const validOptions = formData.options.filter(opt => opt.trim());
      if (validOptions.length < 2) {
        newErrors.options = 'At least 2 options are required';
      }
      if (!formData.options[formData.correctAnswer as number]?.trim()) {
        newErrors.correctAnswer = 'Please select a valid correct answer';
      }
    }

    if (formData.type === 'short-answer' && !formData.correctAnswer) {
      newErrors.correctAnswer = 'Correct answer is required';
    }

    if (formData.points < 1 || formData.points > 100) {
      newErrors.points = 'Points must be between 1 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const savedQuestion: Question = {
      id: question?.id || storageUtils.generateId(),
      type: formData.type,
      question: formData.question.trim(),
      correctAnswer: formData.type === 'short-answer' 
        ? formData.correctAnswer 
        : formData.correctAnswer,
      explanation: formData.explanation.trim() || undefined,
      points: formData.points
    };

    if (formData.type === 'multiple-choice') {
      savedQuestion.options = formData.options.filter(opt => opt.trim());
    }

    onSave(savedQuestion);
  };

  const addOption = () => {
    if (formData.options.length < 6) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, '']
      }));
    }
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        options: newOptions,
        correctAnswer: prev.correctAnswer === index ? 0 : 
                      prev.correctAnswer > index ? prev.correctAnswer - 1 : prev.correctAnswer
      }));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <HelpCircle className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {question ? 'Edit Question' : 'Add New Question'}
              </h2>
              <p className="text-sm text-gray-600">
                Create engaging questions to test knowledge effectively
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question Type and Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Question Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  type: e.target.value as Question['type'],
                  correctAnswer: 0 
                }))}
                className="input"
              >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="short-answer">Short Answer</option>
              </select>
            </div>

            <div>
              <label className="label">Points</label>
              <input
                type="number"
                value={formData.points}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  points: parseInt(e.target.value) || 10 
                }))}
                min="1"
                max="100"
                className={`input ${errors.points ? 'border-error-500' : ''}`}
              />
              {errors.points && (
                <p className="text-error-600 text-sm mt-1">{errors.points}</p>
              )}
            </div>
          </div>

          {/* Question Text */}
          <div>
            <label className="label">Question *</label>
            <textarea
              value={formData.question}
              onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
              placeholder="Enter your question here..."
              rows={3}
              className={`input resize-none ${errors.question ? 'border-error-500' : ''}`}
            />
            {errors.question && (
              <p className="text-error-600 text-sm mt-1">{errors.question}</p>
            )}
          </div>

          {/* Answer Options */}
          {formData.type === 'multiple-choice' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="label mb-0">Answer Options *</label>
                <button
                  type="button"
                  onClick={addOption}
                  disabled={formData.options.length >= 6}
                  className="btn-secondary text-sm flex items-center space-x-2 disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Option</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={formData.correctAnswer === index}
                      onChange={() => setFormData(prev => ({ ...prev, correctAnswer: index }))}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      className="input flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      disabled={formData.options.length <= 2}
                      className="btn-error text-sm p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              
              {errors.options && (
                <p className="text-error-600 text-sm mt-1">{errors.options}</p>
              )}
              {errors.correctAnswer && (
                <p className="text-error-600 text-sm mt-1">{errors.correctAnswer}</p>
              )}
            </div>
          )}

          {formData.type === 'true-false' && (
            <div>
              <label className="label">Correct Answer *</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="trueFalse"
                    checked={formData.correctAnswer === 0}
                    onChange={() => setFormData(prev => ({ ...prev, correctAnswer: 0 }))}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span>True</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="trueFalse"
                    checked={formData.correctAnswer === 1}
                    onChange={() => setFormData(prev => ({ ...prev, correctAnswer: 1 }))}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span>False</span>
                </label>
              </div>
            </div>
          )}

          {formData.type === 'short-answer' && (
            <div>
              <label className="label">Correct Answer *</label>
              <input
                type="text"
                value={formData.correctAnswer as string}
                onChange={(e) => setFormData(prev => ({ ...prev, correctAnswer: e.target.value }))}
                placeholder="Enter the correct answer"
                className={`input ${errors.correctAnswer ? 'border-error-500' : ''}`}
              />
              {errors.correctAnswer && (
                <p className="text-error-600 text-sm mt-1">{errors.correctAnswer}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                For short answer questions, answers will be compared exactly as typed.
              </p>
            </div>
          )}

          {/* Explanation */}
          <div>
            <label className="label">Explanation (optional)</label>
            <textarea
              value={formData.explanation}
              onChange={(e) => setFormData(prev => ({ ...prev, explanation: e.target.value }))}
              placeholder="Provide an explanation for the correct answer..."
              rows={3}
              className="input resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              This will be shown to users after they complete the quiz.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Question</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionEditor;