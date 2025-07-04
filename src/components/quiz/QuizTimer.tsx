import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface QuizTimerProps {
  timeLimit: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
}

const QuizTimer: React.FC<QuizTimerProps> = ({ timeLimit, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / timeLimit) * 100;

  const getTimerColor = () => {
    if (percentage > 50) return 'text-accent-600 border-accent-200 bg-accent-50';
    if (percentage > 20) return 'text-warning-600 border-warning-200 bg-warning-50';
    return 'text-error-600 border-error-200 bg-error-50';
  };

  const getProgressColor = () => {
    if (percentage > 50) return 'bg-accent-500';
    if (percentage > 20) return 'bg-warning-500';
    return 'bg-error-500';
  };

  return (
    <div className={`border-2 rounded-lg p-4 transition-all duration-300 ${getTimerColor()}`}>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          {percentage <= 20 ? (
            <AlertTriangle className="h-5 w-5 animate-pulse" />
          ) : (
            <Clock className="h-5 w-5" />
          )}
          <div>
            <p className="text-xs font-medium opacity-75">Time Remaining</p>
            <p className="text-lg font-bold tabular-nums">
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </p>
          </div>
        </div>
      </div>
      
      {/* Mini progress bar */}
      <div className="mt-3 w-full bg-white bg-opacity-50 rounded-full h-1">
        <div 
          className={`h-1 rounded-full transition-all duration-1000 ${getProgressColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default QuizTimer;