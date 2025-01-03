import React from 'react';
import { TrendingUp, MessageCircle, Share2 } from 'lucide-react';
import { PerformanceInsight } from '../../types/analytics';

interface Props {
  insights: PerformanceInsight[];
}

export function PerformanceInsights({ insights }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {insights.map((insight, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 
                   transform hover:-translate-y-1 animate-fade-slide-up"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="flex items-center gap-3 mb-3">
            {index === 0 && <TrendingUp className="w-5 h-5 text-green-500 animate-float" />}
            {index === 1 && <MessageCircle className="w-5 h-5 text-blue-500 animate-float" />}
            {index === 2 && <Share2 className="w-5 h-5 text-purple-500 animate-float" />}
            <h3 className="font-semibold text-gray-800">{insight.title}</h3>
          </div>
          <p className="text-gray-600 text-sm mb-3">{insight.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{insight.metric}</span>
            <span className={`text-sm ${insight.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {insight.change >= 0 ? '+' : ''}{insight.change}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}