import React, { useEffect, useState } from 'react';
import { getThemeColors } from '../utils';
import { ThemeColor } from '../types';

interface VaseProps {
  level: number;
  animate?: boolean;
  variant?: 'normal' | 'sos';
  theme?: ThemeColor;
}

export const Vase: React.FC<VaseProps> = ({ level, animate, variant = 'normal', theme = 'orange' }) => {
  const [displayLevel, setDisplayLevel] = useState(0);
  const themeColors = getThemeColors(theme);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1200; 
    const startValue = displayLevel;
    const endValue = level;

    if (startValue === endValue) return;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startValue + (endValue - startValue) * ease);
      setDisplayLevel(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [level]);

  const size = 180; 
  const radius = size / 2 - 16; 
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayLevel / 100) * circumference;

  const isSOS = variant === 'sos';
  const trackColor = isSOS ? "#D7CCC8" : themeColors.sub; 
  const progressColor = isSOS ? "#8D6E63" : themeColors.main;
  const textColor = isSOS ? "#5D4037" : themeColors.main;

  return (
    <div className="relative flex justify-center items-center py-4">
      <div style={{ width: size, height: size }} className={`relative ${animate ? 'animate-pulse-soft' : ''}`}>
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={trackColor}
            strokeWidth="14"
            fill="transparent"
            className="transition-colors duration-500"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={progressColor}
            strokeWidth="14"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center transition-colors duration-500" style={{ color: textColor }}>
          {isSOS ? (
            <span className="text-4xl mb-1">⛈️</span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 mb-1 drop-shadow-sm">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          )}
          <span className="text-3xl font-bold tracking-tighter tabular-nums">{displayLevel}%</span>
        </div>
      </div>
    </div>
  );
};