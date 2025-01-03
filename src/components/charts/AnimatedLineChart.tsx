import { useEffect, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

const data: Point[] = [
  { x: 0, y: 30 },
  { x: 20, y: 50 },
  { x: 40, y: 35 },
  { x: 60, y: 70 },
  { x: 80, y: 45 },
  { x: 100, y: 60 }
];

export function AnimatedLineChart() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(elapsed / duration, 1);
      
      setProgress(nextProgress);
      
      if (nextProgress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  const points = data.map((point, i) => ({
    x: point.x,
    y: point.y * Math.min(Math.max((progress * data.length - i) * 2, 0), 1)
  }));

  const pathD = points.reduce((acc, point, i) => (
    acc + (i === 0 ? 'M ' : 'L ') + `${point.x} ${100 - point.y}`
  ), '');

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-6">Growth Trend</h3>
      <svg viewBox="0 0 100 100" className="w-full h-80">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <g key={y}>
            <line
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#f0f0f0"
              strokeWidth="1"
            />
            <text x="-5" y={y} fontSize="3" textAnchor="end" fill="#666">
              {100 - y}%
            </text>
          </g>
        ))}
        
        {/* Area under the line */}
        <path
          d={`${pathD} L 100 100 L 0 100 Z`}
          fill="url(#lineGradient)"
          className="transition-all duration-300"
        />
        
        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          className="transition-all duration-300"
        />
        
        {/* Data points */}
        {points.map((point, index) => (
          <g key={index} className="transition-all duration-300">
            <circle
              cx={point.x}
              cy={100 - point.y}
              r="2"
              fill="#3B82F6"
              className="animate-pulse"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
            <circle
              cx={point.x}
              cy={100 - point.y}
              r="6"
              fill="#3B82F6"
              opacity="0.2"
              className="animate-ping"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}