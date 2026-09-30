import React from 'react';

interface ZenikaCodeIconProps {
  className?: string;
  size?: number | string;
}

/**
 * Zenika iconic < | > developer & craftsmanship emblem
 * Matching the exact geometric brackets and vertical bar iconography.
 */
export const ZenikaCodeIcon: React.FC<ZenikaCodeIconProps> = ({
  className = '',
  size = 16
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Left bracket < */}
      <path
        d="M7 6L2 12L7 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center vertical bar | */}
      <path
        d="M12 3.5V20.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Right bracket > */}
      <path
        d="M17 6L22 12L17 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
