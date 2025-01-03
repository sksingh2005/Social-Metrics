import { useEffect, useState } from 'react';

interface DataAnimationProps {
  label: string;
  value: number;
  suffix?: string;
  duration?: number;
}

export function DataAnimation({ label, value, suffix = '', duration = 2000 }: DataAnimationProps) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(value * percentage));
      
      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return (
    <div className="text-center p-4 rounded-lg bg-white/50 backdrop-blur-sm animate-fade-slide-up">
      <div className="text-3xl font-bold text-blue-600">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
}