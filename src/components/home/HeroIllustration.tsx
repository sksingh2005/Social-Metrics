export function HeroIllustration() {
  return (
    <div className="relative animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
      <svg 
        viewBox="0 0 500 500" 
        className="w-full h-full transform scale-125 animate-float"
        style={{ animationDuration: '6s' }}
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#60A5FA' }} />
            <stop offset="100%" style={{ stopColor: '#3B82F6' }} />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#93C5FD' }} />
            <stop offset="100%" style={{ stopColor: '#60A5FA' }} />
          </linearGradient>
        </defs>

        {/* Background Circles */}
        <circle cx="250" cy="250" r="200" fill="url(#gradient1)" opacity="0.1" />
        <circle cx="250" cy="250" r="150" fill="url(#gradient2)" opacity="0.2" />

        {/* Analytics Graph */}
        <path
          d="M100,350 Q150,200 200,300 T300,200 T400,150"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="4"
          className="animate-draw"
        />

        {/* Data Points */}
        {[
          { cx: 150, cy: 200 },
          { cx: 200, cy: 300 },
          { cx: 300, cy: 200 },
          { cx: 400, cy: 150 }
        ].map((point, index) => (
          <circle
            key={index}
            {...point}
            r="6"
            fill="#3B82F6"
            className="animate-pulse"
            style={{ animationDelay: `${index * 0.2}s` }}
          />
        ))}

        {/* Floating Elements */}
        {[
          { x: 120, y: 150, size: 20 },
          { x: 380, y: 280, size: 15 },
          { x: 280, y: 120, size: 25 }
        ].map((element, index) => (
          <rect
            key={index}
            x={element.x}
            y={element.y}
            width={element.size}
            height={element.size}
            fill="url(#gradient2)"
            opacity="0.6"
            rx="4"
            className="animate-float"
            style={{ animationDelay: `${index * 0.3}s` }}
          />
        ))}
      </svg>
    </div>
  );
}