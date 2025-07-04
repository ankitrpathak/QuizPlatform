# Micro-Quiz Platform

A modern, interactive quiz platform built with React, TypeScript, and Tailwind CSS. Create, take, and analyze quizzes with an intuitive user interface and comprehensive analytics.

![Micro-Quiz Platform](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Micro-Quiz+Platform)

## ✨ Features

- **📝 Quiz Creation**: Create custom quizzes with multiple question types
  - Multiple choice questions
  - True/False questions
  - Short answer questions
- **🎯 Interactive Quiz Taking**: Smooth quiz-taking experience with timer support
- **📊 Analytics & Results**: Comprehensive performance tracking and analytics
- **💾 Local Storage**: All data persisted locally in browser
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **🎨 Modern UI**: Clean, intuitive interface with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/micro-quiz-platform.git
   cd micro-quiz-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── dashboard/       # Dashboard related components
│   ├── quiz/           # Quiz taking components
│   ├── creator/        # Quiz creation components
│   ├── results/        # Results and analytics
│   └── layout/         # Layout components (Header, Footer)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   ├── storage.ts      # Local storage management
│   └── sampleData.ts   # Sample quiz data
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎮 How to Use

### Creating a Quiz

1. Click **"Create New Quiz"** from the dashboard
2. Fill in quiz information (title, description, category, difficulty)
3. Add questions with various types:
   - Multiple choice (2-6 options)
   - True/False
   - Short answer
4. Preview your quiz
5. Save and publish

### Taking a Quiz

1. Browse available quizzes from **"Take a Quiz"**
2. Select a quiz and click **"Start Quiz"**
3. Answer questions within the time limit (if set)
4. Submit and view your results
5. Review correct answers and explanations

### Viewing Analytics

1. Go to **"Results"** section
2. View your performance statistics
3. Analyze quiz attempts and scores
4. Track improvement over time

## 🎨 Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Build Tool**: Vite for fast development and building
- **Icons**: Lucide React for consistent iconography
- **Code Quality**: ESLint for code linting
- **Storage**: Browser localStorage for data persistence

## 📊 Sample Data

The application comes with sample quizzes including:

- JavaScript Fundamentals
- React Components
- General Knowledge Quiz

These help demonstrate the platform's capabilities and provide immediate content for testing.

## 🔧 Configuration

### Tailwind CSS

The project uses a custom Tailwind configuration with:

- Custom color palette (primary, secondary, accent, warning, error)
- Custom animations and transitions
- Responsive breakpoints
- Custom spacing system

### TypeScript

Strict TypeScript configuration for better code quality and developer experience.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Quiz data is stored locally and will be lost if browser data is cleared
- No user authentication system (single-user application)
- Limited to browser storage capacity

## 🚀 Future Enhancements

- [ ] User authentication and multi-user support
- [ ] Cloud storage integration
- [ ] Quiz sharing capabilities
- [ ] Advanced question types (drag & drop, image-based)
- [ ] Detailed analytics dashboard
- [ ] Export quiz results
- [ ] Quiz categories and tagging system

## 📞 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/ankitrpathak/micro-quiz-platform/issues) on GitHub.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by educational platforms and quiz applications
- Icons provided by Lucide React
- Fonts from Google Fonts (Inter)

---

**Made with ❤️ for interactive learning**
