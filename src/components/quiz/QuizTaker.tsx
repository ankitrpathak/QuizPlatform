import React, { useState, useEffect } from 'react';
import { Quiz, QuizAttempt } from '../../types/quiz';
import { storageUtils } from '../../utils/storage';
import QuestionCard from './QuestionCard';
import QuizProgress from './QuizProgress';
import QuizTimer from './QuizTimer';
import QuizResults from './QuizResults';
import { ArrowLeft, Flag } from 'lucide-react';

interface QuizTakerProps {
  quiz: Quiz;
  onBack: () => void;
  onComplete: () => void;
}

const QuizTaker: React.FC<QuizTakerProps> = ({ quiz, onBack, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: string | number }>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const hasAnswer = answers[currentQuestion.id] !== undefined;

  const handleAnswer = (answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let score = 0;
    let totalPoints = 0;

    quiz.questions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      
      if (userAnswer !== undefined && userAnswer === question.correctAnswer) {
        score += question.points;
      }
    });

    const percentage = Math.round((score / totalPoints) * 100);

    const newAttempt: QuizAttempt = {
      id: storageUtils.generateId(),
      quizId: quiz.id,
      answers,
      score,
      totalPoints,
      timeSpent,
      completedAt: new Date(),
      percentage
    };

    // Save attempt
    storageUtils.saveAttempt(newAttempt);
    setAttempt(newAttempt);
    setIsCompleted(true);
    setShowResults(true);
  };

  const handleTimeUp = () => {
    if (!isCompleted) {
      handleSubmit();
    }
  };

  if (showResults && attempt) {
    return (
      <QuizResults
        quiz={quiz}
        attempt={attempt}
        onBack={onBack}
        onRetake={() => {
          setCurrentQuestionIndex(0);
          setAnswers({});
          setTimeSpent(0);
          setIsCompleted(false);
          setShowResults(false);
          setAttempt(null);
        }}
        onComplete={onComplete}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="btn-secondary flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Quizzes</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">{quiz.title}</h1>
          <p className="text-sm text-gray-500">{quiz.category}</p>
        </div>

        {quiz.timeLimit && (
          <QuizTimer
            timeLimit={quiz.timeLimit * 60}
            onTimeUp={handleTimeUp}
            isActive={!isCompleted}
          />
        )}
      </div>

      {/* Progress */}
      <QuizProgress
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quiz.questions.length}
        answers={answers}
        questions={quiz.questions}
      />

      {/* Question Card */}
      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={quiz.questions.length}
        answer={answers[currentQuestion.id]}
        onAnswer={handleAnswer}
      />

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleSubmit}
            className="btn-warning flex items-center space-x-2"
          >
            <Flag className="h-4 w-4" />
            <span>Submit Quiz</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!hasAnswer}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastQuestion ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>

      {/* Time Spent */}
      <div className="text-center text-sm text-gray-500">
        Time spent: {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
      </div>
    </div>
  );
};

export default QuizTaker;