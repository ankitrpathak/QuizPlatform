import { Quiz } from '../types/quiz';
import { storageUtils } from './storage';

export const sampleQuizzes: Quiz[] = [
  {
    id: 'sample-1',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JavaScript basics including variables, functions, and data types.',
    category: 'Programming',
    difficulty: 'easy',
    timeLimit: 15,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Which of the following is the correct way to declare a variable in JavaScript?',
        options: ['var myVar = 5;', 'variable myVar = 5;', 'v myVar = 5;', 'declare myVar = 5;'],
        correctAnswer: 0,
        explanation: 'The "var" keyword is used to declare variables in JavaScript.',
        points: 10
      },
      {
        id: 'q2',
        type: 'true-false',
        question: 'JavaScript is a compiled language.',
        correctAnswer: 1,
        explanation: 'JavaScript is an interpreted language, not compiled.',
        points: 10
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'What does "typeof null" return in JavaScript?',
        options: ['null', 'undefined', 'object', 'boolean'],
        correctAnswer: 2,
        explanation: 'This is a known quirk in JavaScript where typeof null returns "object".',
        points: 15
      }
    ]
  },
  {
    id: 'sample-2',
    title: 'React Components',
    description: 'Advanced React concepts including hooks, state management, and component lifecycle.',
    category: 'Frontend Development',
    difficulty: 'medium',
    timeLimit: 20,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
    questions: [
      {
        id: 'q4',
        type: 'multiple-choice',
        question: 'Which hook is used to perform side effects in React functional components?',
        options: ['useState', 'useEffect', 'useContext', 'useReducer'],
        correctAnswer: 1,
        explanation: 'useEffect is the hook used for side effects like API calls, subscriptions, etc.',
        points: 10
      },
      {
        id: 'q5',
        type: 'true-false',
        question: 'React components must always return a single root element.',
        correctAnswer: 1,
        explanation: 'Since React 16, you can return arrays or use React.Fragment to avoid wrapper elements.',
        points: 10
      },
      {
        id: 'q6',
        type: 'multiple-choice',
        question: 'What is the purpose of the key prop in React lists?',
        options: [
          'To style list items',
          'To help React identify which items have changed',
          'To provide unique IDs for CSS',
          'To enable event handling'
        ],
        correctAnswer: 1,
        explanation: 'Keys help React identify which items have changed, are added, or removed for efficient re-rendering.',
        points: 15
      }
    ]
  },
  {
    id: 'sample-3',
    title: 'General Knowledge Quiz',
    description: 'A fun mix of questions covering science, history, and popular culture.',
    category: 'General Knowledge',
    difficulty: 'medium',
    timeLimit: 25,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
    questions: [
      {
        id: 'q7',
        type: 'multiple-choice',
        question: 'What is the largest planet in our solar system?',
        options: ['Saturn', 'Jupiter', 'Neptune', 'Earth'],
        correctAnswer: 1,
        explanation: 'Jupiter is the largest planet in our solar system.',
        points: 10
      },
      {
        id: 'q8',
        type: 'multiple-choice',
        question: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
        correctAnswer: 2,
        explanation: 'The Mona Lisa was painted by Leonardo da Vinci between 1503-1519.',
        points: 10
      },
      {
        id: 'q9',
        type: 'true-false',
        question: 'The Great Wall of China is visible from space with the naked eye.',
        correctAnswer: 1,
        explanation: 'This is a common myth. The Great Wall is not visible from space with the naked eye.',
        points: 10
      }
    ]
  }
];

export const initializeSampleData = () => {
  const existingQuizzes = storageUtils.getQuizzes();
  if (existingQuizzes.length === 0) {
    sampleQuizzes.forEach(quiz => {
      storageUtils.saveQuiz(quiz);
    });
  }
};