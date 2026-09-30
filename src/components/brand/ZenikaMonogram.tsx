import React from 'react';

export interface ZenikaMonogramProps {
  className?: string;
  size?: number | string;
  variant?: 'color' | 'white' | 'dark' | 'glass';
  glow?: boolean;
}

export const ZenikaMonogram: React.FC<ZenikaMonogramProps> = ({
  className = '',
  size = 48,
  variant = 'color',
  glow = false
}) => {
  const rawId = React.useId().replace(/[^a-zA-Z0-9_-]/g, '_');
  const gradientId = `zm_grad_${rawId}`;

  return (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      className={`shrink-0 select-none ${glow ? 'drop-shadow-[0_0_36px_rgba(230,0,57,0.65)]' : ''} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Official Zenika signature ruby brand gradient */}
        <linearGradient id={gradientId} x1="5%" y1="10%" x2="95%" y2="90%">
          <stop offset="0%" stopColor="#FB1626" />
          <stop offset="100%" stopColor="#BB0D5A" />
        </linearGradient>
      </defs>

      {/* Inner White Base Core */}
      <circle 
        cx="246.23" 
        cy="248.74" 
        r="244.8" 
        fill={variant === 'dark' ? '#0F131C' : variant === 'white' ? 'rgba(255,255,255,0.2)' : '#FFFFFF'} 
      />

      {/* Zenika Precision Compound Path Emblem */}
      <path
        d="M246.23,3.9C139.7,3.9,49.03,71.96,15.39,166.96l314.65-57.41,9.29-1.69c1.81-.33,3.64-.49,5.48-.49,1.75,0,3.5.15,5.23.45,15.77,2.83,28.14,15.12,31.08,30.87,2.2,12.13-1.58,24.58-10.15,33.44l-1.45,1.44-143,141.63,263.82-48.09c-1.59,21.53-6.04,42.76-13.23,63.12l-304.27,55.49-6.45,1.18c-2.17.39-4.37.6-6.57.6-2.01,0-4.02-.18-5.99-.56h-.08c-7.47-1.41-14.36-5.02-19.76-10.38-11.36-11.21-14.46-28.33-7.76-42.82.89-1.91,1.93-3.75,3.12-5.49l148.38-148.38L2.41,229.62l-.28.06s0,0,0,0c-.03.35-.09.72-.09,1.08-.42,5.92-.65,11.9-.65,17.92,0,135.17,109.61,244.84,244.83,244.84,106.63,0,197.34-68.17,230.93-163.31,7.19-20.36,11.63-41.58,13.23-63.12.45-6.08.68-12.23.68-18.42C491.05,113.47,381.38,3.85,246.23,3.9Z"
        fill={
          variant === 'color' 
            ? `url(#${gradientId})` 
            : variant === 'white' 
              ? '#FFFFFF' 
              : variant === 'dark' 
                ? '#E60039' 
                : '#E60039'
        }
      />
    </svg>
  );
};
