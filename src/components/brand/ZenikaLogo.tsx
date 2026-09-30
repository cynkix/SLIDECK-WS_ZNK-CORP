import React, { useId } from 'react';

export interface ZenikaLogoProps {
  className?: string;
  variant?: 'full' | 'noir' | 'blanc' | 'mark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  height?: number;
  uppercase?: boolean;
}

/**
 * Zenika official Logo: Emblem + Wordmark in Nunito typography
 */
export const ZenikaLogo: React.FC<ZenikaLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  height,
  uppercase = false
}) => {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '_');
  const grad0Id = `zenika_p0_${uid}`;
  const grad1Id = `zenika_p1_${uid}`;

  // Default height presets
  const heightMap = {
    sm: 26,
    md: 34,
    lg: 40,
    xl: 48
  };

  const actualHeight = height || heightMap[size] || 34;

  const emblemSvg = (
    <svg
      width={actualHeight}
      height={actualHeight}
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 select-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={grad0Id} x1="-12.7883" y1="64.0339" x2="48.6756" y2="-11.122" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FB1626" />
          <stop offset="1" stopColor="#BB0D5A" />
        </linearGradient>
        <linearGradient id={grad1Id} x1="-11.7018" y1="49.3067" x2="49.8153" y2="-25.9722" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FB1626" />
          <stop offset="1" stopColor="#BB0D5A" />
        </linearGradient>
      </defs>
      <path
        d="M39.6623 27.3989C39.6623 27.4078 39.6534 27.4167 39.6534 27.4256C39.6534 27.4345 39.6445 27.4434 39.6445 27.4434C36.814 35.3531 29.272 41.0002 20.4256 41.0002C9.13918 41.0002 0 31.8258 0 20.5047C0 20.0059 0.017746 19.516 0.053238 19.0261C0.053238 19.0172 0.053238 19.0172 0.053238 19.0083L0.062111 18.9548C0.062111 18.9637 0.062111 18.9727 0.062111 18.9816L23.1585 14.7773L10.692 27.292C10.5944 27.4345 10.5056 27.5859 10.4346 27.7463C10.1685 28.3163 10.0797 28.9577 10.1951 29.6168C10.4346 30.9262 11.455 31.906 12.6973 32.1375C12.8925 32.1732 13.0877 32.191 13.2829 32.191C13.3272 32.191 13.3805 32.191 13.4248 32.191L14.2678 32.0396L39.6623 27.3989Z"
        fill={`url(#${grad0Id})`}
      />
      <path
        d="M40.8427 20.5045C40.8427 21.0567 40.8249 21.6089 40.7805 22.1523C40.7805 22.1612 40.7805 22.1701 40.7805 22.1701C40.7805 22.179 40.7805 22.1879 40.7805 22.1879L18.6335 26.2496L30.6565 14.2961L30.7718 14.1803C31.0291 13.9131 31.2332 13.6103 31.384 13.2807C31.6414 12.7195 31.7301 12.0693 31.6147 11.4191C31.3752 10.083 30.3193 9.09429 29.0504 8.8627C28.873 8.82707 28.6866 8.81816 28.4914 8.81816H28.456L27.4001 9.01412L1.11825 13.8151C1.11825 13.824 1.10938 13.8329 1.10938 13.8418L1.11825 13.7973C1.11825 13.7884 1.12712 13.7795 1.12712 13.7795C3.90437 5.75407 11.4908 0 20.4259 0C31.7035 0 40.8427 9.17445 40.8427 20.5045Z"
        fill={`url(#${grad1Id})`}
      />
    </svg>
  );

  // If mark-only variant is requested, show only the circular emblem
  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center shrink-0 ${className}`}>
        {emblemSvg}
      </div>
    );
  }

  // Text color class for official branding with graceful dark mode support
  const textColorClass =
    variant === 'noir'
      ? 'text-black'
      : variant === 'blanc'
      ? 'text-white'
      : 'text-slate-950 dark:text-white';

  return (
    <div
      className={`inline-flex items-center gap-2 sm:gap-2.5 select-none transition-transform duration-200 hover:scale-[1.02] ${className}`}
      aria-label="Zenika"
    >
      {emblemSvg}
      <span
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: `${Math.round(actualHeight * 0.70)}px`,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          fontWeight: 900
        }}
        className={`font-black ${textColorClass} tracking-tight`}
      >
        {uppercase ? 'ZENIKA' : 'zenika'}
      </span>
    </div>
  );
};
