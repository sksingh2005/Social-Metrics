import React from 'react';
import { EngagementChart } from './components/dashboard/EngagementChart';
import { PerformanceInsights } from './components/dashboard/PerformanceInsights';
import { PostTypeAnalysis } from './components/dashboard/PostTypeAnalysis';
import { PostAnalytics, PerformanceInsight } from './types/analytics';

// Mock data - replace with actual data from backend
const mockAnalytics: PostAnalytics[] = [];
const mockInsights: PerformanceInsight[] = [
  {
    title: 'Overall Engagement',
    description: 'Engagement rate across all post types',
    metric: '8.2%',
    change: 12.5
  },
  {
    title: 'Comment Activity',
    description: 'Average comments per post',
    metric: '24',
    change: -5.2
  },
  {
    title: 'Share Rate',
    description: 'Average shares per post',
    metric: '156',
    change: 28.3
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Social Media Analytics</h1>
          <p className="text-gray-600">Track and analyze your social media performance</p>
        </header>
        
        <div className="space-y-6">
          <PerformanceInsights insights={mockInsights} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EngagementChart data={mockAnalytics} />
            <PostTypeAnalysis data={mockAnalytics} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;