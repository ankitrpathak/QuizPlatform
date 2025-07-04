import React, { useState } from 'react';
import { Quiz } from '../../types/quiz';
import { BookOpen, Clock, Tag, BarChart3 } from 'lucide-react';

interface QuizFormProps {
  quiz: Partial<Quiz>;
  onSubmit: (quiz: Partial<Quiz>) => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ quiz, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: quiz.title || '',
    description: quiz.description || '',
    category: quiz.category || '',
    difficulty: quiz.difficulty || 'medium',
    timeLimit: quiz.timeLimit || undefined
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categories = [
    'Programming',
    'Frontend Development',
    'Backend Development',
    'Science',
    'Mathematics',
    'History',
    'Geography',
    'Literature',
    'General Knowledge',
    'Other'
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        timeLimit: formData.timeLimit || undefined
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Quiz Information</h2>
          <p className="text-gray-600">
            Provide basic information about your quiz to help learners understand what to expect.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="label">
              <BookOpen className="h-4 w-4 mr-2" />
              Quiz Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter a descriptive title for your quiz"
              className={`input ${errors.title ? 'border-error-500 focus:ring-error-500' : ''}`}
            />
            {errors.title && (
              <p className="text-error-600 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="label">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what this quiz covers and what learners can expect"
              rows={4}
              className={`input resize-none ${errors.description ? 'border-error-500 focus:ring-error-500' : ''}`}
            />
            {errors.description && (
              <p className="text-error-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Category and Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">
                <Tag className="h-4 w-4 mr-2" />
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className={`input ${errors.category ? 'border-error-500 focus:ring-error-500' : ''}`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-error-600 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="label">
                <BarChart3 className="h-4 w-4 mr-2" />
                Difficulty Level
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as Quiz['difficulty'] }))}
                className="input"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Time Limit */}
          <div>
            <label className="label">
              <Clock className="h-4 w-4 mr-2" />
              Time Limit (optional)
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                value={formData.timeLimit || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  timeLimit: e.target.value ? parseInt(e.target.value) : undefined 
                }))}
                placeholder="30"
                min="1"
                max="180"
                className="input w-24"
              />
              <span className="text-sm text-gray-500">minutes</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Leave empty for untimed quiz. Recommended: 1-2 minutes per question.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="btn-primary px-8"
            >
              Continue to Questions
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;