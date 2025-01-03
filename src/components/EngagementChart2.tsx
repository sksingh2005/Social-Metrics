import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { BarChart, LineChart } from 'lucide-react';
import { PostAnalytics } from '../types/analytics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: PostAnalytics[];
}

export function EngagementChart2({ data }: Props) {
  const [chartType, setChartType] = React.useState<'bar' | 'line'>('bar');

  const chartData = React.useMemo(() => {
    const postTypeData = data.reduce((acc, post) => {
      if (!acc[post.Post_Type]) {
        acc[post.Post_Type] = {
          likes: 0,
          shares: 0,
          comments: 0,
          count: 0,
        };
      }
      acc[post.Post_Type].likes += post.Likes;
      acc[post.Post_Type].shares += post.Shares;
      acc[post.Post_Type].comments += post.Comments;
      acc[post.Post_Type].count += 1;
      return acc;
    }, {} as Record<string, { likes: number; shares: number; comments: number; count: number }>);

    const postTypes = Object.keys(postTypeData);
    const avgLikes = postTypes.map((type) => postTypeData[type].likes / postTypeData[type].count);
    const avgShares = postTypes.map((type) => postTypeData[type].shares / postTypeData[type].count);
    const avgComments = postTypes.map((type) => postTypeData[type].comments / postTypeData[type].count);

    return {
      labels: postTypes,
      datasets: [
        {
          label: 'Average Likes',
          data: avgLikes,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Average Shares',
          data: avgShares,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
        },
        {
          label: 'Average Comments',
          data: avgComments,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgb(75, 192, 192)',
        },
      ],
    };
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Average Engagement by Post Type',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Engagement Overview</h2>
        <div className="flex gap-2">
          <button
            className={`p-2 rounded-full ${
              chartType === 'bar' ? 'bg-gray-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => setChartType('bar')}
          >
            <BarChart className="w-5 h-5 text-gray-600" />
          </button>
          <button
            className={`p-2 rounded-full ${
              chartType === 'line' ? 'bg-gray-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => setChartType('line')}
          >
            <LineChart className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="h-64">
        {chartType === 'bar' ? (
          <Bar options={options} data={chartData} />
        ) : (
          <Line options={options} data={chartData} />
        )}
      </div>
    </div>
  );
}