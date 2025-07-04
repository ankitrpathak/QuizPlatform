import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import QuizList from './components/quiz/QuizList';
import QuizTaker from './components/quiz/QuizTaker';
import QuizCreator from './components/creator/QuizCreator';
import Results from './components/results/Results';
import { Quiz } from './types/quiz';
import { initializeSampleData } from './utils/sampleData';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize sample data on first load
    initializeSampleData();
  }, []);

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setSelectedQuiz(null);
    setMobileMenuOpen(false);
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentView('quiz-taker');
  };

  const handleQuizComplete = () => {
    setCurrentView('dashboard');
    setSelectedQuiz(null);
  };

  const handleQuizSaved = () => {
    setCurrentView('dashboard');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onViewChange={handleViewChange} />;
      
      case 'quiz-list':
        return (
          <QuizList 
            onStartQuiz={handleStartQuiz}
            onViewChange={handleViewChange}
          />
        );
      
      case 'quiz-taker':
        return selectedQuiz ? (
          <QuizTaker
            quiz={selectedQuiz}
            onBack={() => handleViewChange('quiz-list')}
            onComplete={handleQuizComplete}
          />
        ) : null;
      
      case 'create-quiz':
        return (
          <QuizCreator
            onBack={() => handleViewChange('dashboard')}
            onSave={handleQuizSaved}
          />
        );
      
      case 'results':
        return <Results onViewChange={handleViewChange} />;
      
      default:
        return <Dashboard onViewChange={handleViewChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        currentView={currentView}
        onViewChange={handleViewChange}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;