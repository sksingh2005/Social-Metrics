import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { PostAnalytics } from '../../types/analytics';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: PostAnalytics[];
}

export function PieChart({ data }: Props) {
  const postTypeData = data.reduce((acc, post) => {
    acc[post.Post_Type] = (acc[post.Post_Type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(postTypeData),
    datasets: [
      {
        data: Object.values(postTypeData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(75, 192, 192)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Post Type Distribution</h2>
      <div className="h-64">
        <Pie data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
}