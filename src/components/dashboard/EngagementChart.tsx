import React from 'react';
import { BarChart, LineChart } from 'lucide-react';
import { PostAnalytics } from '../../types/analytics';

interface Props {
  data: PostAnalytics[];
}

export function EngagementChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Engagement Overview</h2>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <BarChart className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <LineChart className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      
    </div>
  );
}