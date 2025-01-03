import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { PostAnalytics } from '../../types/analytics';
import { format, parseISO } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: PostAnalytics[];
}

export function TimeSeriesChart({ data }: Props) {
  const sortedData = [...data].sort((a, b) => 
    parseISO(a.Date_Posted).getTime() - parseISO(b.Date_Posted).getTime()
  );

  const dates = sortedData.map(post => format(parseISO(post.Date_Posted), 'MMM dd'));
  const likes = sortedData.map(post => post.Likes);
  const shares = sortedData.map(post => post.Shares);
  const comments = sortedData.map(post => post.Comments);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Likes',
        data: likes,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Shares',
        data: shares,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
      {
        label: 'Comments',
        data: comments,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Engagement Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full h-[400px] md:h-[500px] lg:h-[600px]">
      <div className="w-full h-full">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}
