import React from 'react';

export function Earth() {
  return (
    <g className="animate-spin-slow" style={{ transformOrigin: 'center' }}>
      {/* Base Earth sphere */}
      <circle
        cx="250"
        cy="250"
        r="100"
        fill="url(#earthGradient)"
        filter="url(#earthShadow)"
      />
      
      {/* Landmasses */}
      <g fill="#2D5A27" opacity="0.8">
        {/* North America */}
        <path d="M180,200 C190,190 210,185 220,190 C230,195 235,205 230,215 C225,225 215,230 205,225 C195,220 175,210 180,200 Z" />
        
        {/* South America */}
        <path d="M210,250 C215,245 225,248 230,255 C235,262 233,272 228,277 C223,282 213,279 208,272 C203,265 205,255 210,250 Z" />
        
        {/* Europe */}
        <path d="M270,195 C280,190 290,192 295,200 C300,208 298,218 290,223 C282,228 272,226 267,218 C262,210 264,200 270,195 Z" />
        
        {/* Africa */}
        <path d="M275,235 C285,230 295,232 300,240 C305,248 303,258 295,263 C287,268 277,266 272,258 C267,250 269,240 275,235 Z" />
        
        {/* Asia */}
        <path d="M310,210 C320,205 330,207 335,215 C340,223 338,233 330,238 C322,243 312,241 307,233 C302,225 304,215 310,210 Z" />
        
        {/* Australia */}
        <path d="M320,270 C325,265 335,267 340,275 C345,283 343,293 335,298 C327,303 317,301 312,293 C307,285 315,275 320,270 Z" />
      </g>

      {/* Cloud layers */}
      <g fill="#FFFFFF" opacity="0.3" className="animate-spin-reverse-slow">
        <path d="M150,220 Q200,200 250,220 T350,240" />
        <path d="M160,280 Q210,260 260,280 T360,300" />
      </g>
    </g>
  );
}