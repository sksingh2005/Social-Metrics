import React, { useState } from 'react';
import { Image, Heart, MessageCircle, Bookmark, Share2, LucideIcon } from 'lucide-react';

interface DataItem {
  label: string;
  value: number;
  color: string;
  icon: LucideIcon;
}

const PieChart: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  const data: DataItem[] = [
    { label: "Photo Posts", value: 40, color: "#FF69B4", icon: Image },
    { label: "Likes", value: 30, color: "#FF4545", icon: Heart },
    { label: "Comments", value: 15, color: "#4DA9FF", icon: MessageCircle },
    { label: "Saves", value: 10, color: "#43D06A", icon: Bookmark },
    { label: "Shares", value: 5, color: "#A855F7", icon: Share2 }
  ];

  const total: number = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle: number = 0;

  const generateSegment = (item: DataItem, index: number): JSX.Element => {
    const percent: number = (item.value / total);
    const angle: number = percent * 360;
    const endAngle: number = startAngle + angle;
    
    const startRad: number = (startAngle - 90) * (Math.PI / 180);
    const endRad: number = (endAngle - 90) * (Math.PI / 180);
    
    const x1: number = 150 + 120 * Math.cos(startRad);
    const y1: number = 150 + 120 * Math.sin(startRad);
    const x2: number = 150 + 120 * Math.cos(endRad);
    const y2: number = 150 + 120 * Math.sin(endRad);
    
    const largeArc: number = angle > 180 ? 1 : 0;
    const pathString: string = `
      M 150 150
      L ${x1} ${y1}
      A 120 120 0 ${largeArc} 1 ${x2} ${y2}
      Z
    `;

    const labelRad: number = (startRad + endRad) / 2;
    const labelX: number = 150 + (activeSegment === index ? 130 : 125) * Math.cos(labelRad);
    const labelY: number = 150 + (activeSegment === index ? 130 : 125) * Math.sin(labelRad);

    startAngle = endAngle;
    
    return (
      <g key={index}>
        <path
          d={pathString}
          fill={item.color}
          stroke="white"
          strokeWidth="2"
          onMouseEnter={() => setActiveSegment(index)}
          onMouseLeave={() => setActiveSegment(null)}
          className={`transition-all duration-300 ${
            activeSegment === index ? "transform scale-105" : ""
          }`}
        />
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#1a1a1a"
          className="text-sm font-bold"
        >
          {Math.round(percent * 100)}%
        </text>
      </g>
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Instagram Engagement Distribution</h3>
      <div className="relative">
        <svg width="300" height="300" viewBox="0 0 300 300">
          {data.map((item, index) => generateSegment(item, index))}
        </svg>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-6">
        {data.map((item, index) => {
          const IconComponent: LucideIcon = item.icon;
          return (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                activeSegment === index ? "bg-gray-50" : ""
              }`}
              onMouseEnter={() => setActiveSegment(index)}
              onMouseLeave={() => setActiveSegment(null)}
            >
              <IconComponent 
                size={24}
                color={item.color}
                className="shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">
                  {item.label}
                </span>
                <span className="text-sm text-gray-600">
                  {item.value}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PieChart;