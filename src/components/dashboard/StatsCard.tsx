import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  iconColor, 
  bgColor,
  delay = 0 
}) => {
  return (
    <div 
      className="card hover:scale-105 transform transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      
      {/* Progress bar effect */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
        <div 
          className={`h-1 rounded-full ${bgColor} transition-all duration-1000 ease-out`}
          style={{ 
            width: '100%',
            animationDelay: `${delay + 500}ms`
          }}
        />
      </div>
    </div>
  );
};

export default StatsCard;