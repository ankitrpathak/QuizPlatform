import React from 'react';
import { Plus, PlayCircle, BarChart3, Settings } from 'lucide-react';

interface QuickActionsProps {
  onViewChange: (view: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onViewChange }) => {
  const actions = [
    {
      title: 'Create New Quiz',
      description: 'Build a custom quiz with multiple question types',
      icon: Plus,
      action: () => onViewChange('create-quiz'),
      color: 'bg-primary-500 hover:bg-primary-600',
      textColor: 'text-white'
    },
    {
      title: 'Take a Quiz',
      description: 'Start learning with available quizzes',
      icon: PlayCircle,
      action: () => onViewChange('quiz-list'),
      color: 'bg-accent-500 hover:bg-accent-600',
      textColor: 'text-white'
    },
    {
      title: 'View Results',
      description: 'Analyze your performance and progress',
      icon: BarChart3,
      action: () => onViewChange('results'),
      color: 'bg-secondary-500 hover:bg-secondary-600',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action, index) => (
        <button
          key={action.title}
          onClick={action.action}
          className={`${action.color} ${action.textColor} p-6 rounded-xl shadow-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-left group`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-lg group-hover:bg-opacity-30 transition-all">
              <action.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;