import React, { useId } from 'react';

interface ZenikaGraphicDeviceProps {
  className?: string;
  size?: number | string;
  opacity?: number;
  variant?: 'gradient' | 'monochrome' | 'outline';
  color?: string;
}

export const ZenikaGraphicDevice: React.FC<ZenikaGraphicDeviceProps> = ({
  className = '',
  size = 80,
  opacity = 1,
  variant = 'gradient',
  color = '#E60039'
}) => {
  const uniqueId = useId().replace(/:/g, '_');
  const gradientId = `zenika_gradient_${uniqueId}`;

  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className={className}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="40" x2="80" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e52931" />
          <stop offset="100%" stopColor="#ba115b" />
        </linearGradient>
      </defs>
      <g>
        <path
          fill={variant === 'gradient' ? `url(#${gradientId})` : color}
          d="M40,0C17.91,0,0,17.91,0,40s17.91,40,40,40,40-17.91,40-40S62.09,0,40,0ZM62.57,45.57c-1.61.25-3.09-.91-3.15-2.73l-.22-6.98-14.57,14.53c-1.01.86-2.36.99-3.46.28l-9.4-9.39-12.2,11.98c-1.04,1.02-2.69.64-3.65-.13-.78-.63-1.4-2.47-.4-3.47l14.12-14.23c1.25-1.26,2.97-1.18,4.18.03l8.96,9.01,12.59-12.65-6.92-.09c-1.68-.02-2.77-1.15-2.84-2.56-.08-1.63.97-2.98,2.84-2.99l13.55-.03c1.73,0,2.99,1.16,2.99,2.91l.02,13.37c0,1.7-.96,2.89-2.43,3.12Z"
        />
      </g>
    </svg>
  );
};
