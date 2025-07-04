import React from "react";
import { Heart, Code } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-2">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500 animate-bounce-gentle" />
            <span>using React and TypeScript</span>
            <Code className="h-4 w-4 text-primary-500" />
          </div>
          <p className="text-xs text-gray-500">
            © 2025 Micro-Quiz Platform. A modern, interactive learning
            experience.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
