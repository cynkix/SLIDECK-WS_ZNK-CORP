import React, { useId, useMemo } from 'react';

export interface ZenikaTrailMonogramProps {
  className?: string;
  size?: number | string;
  /** Stretch factor from 0 (compact behind logo) to 1+ (fully stretched trail) */
  stretch?: number;
  /** Opacity of the solid true logo (0 = pure wireframe contour, 1 = fully materialized solid logo) */
  solidLogoOpacity?: number;
  /** Overall opacity multiplier for the trail wireframe layers */
  trailOpacity?: number;
  /** Number of wireframe contour elements in the trail */
  layerCount?: number;
  /** Interactive mouse offset for 3D parallax micro-tilt */
  mouseOffset?: { x: number; y: number };
  /** Variant of the front emblem */
  variant?: 'color' | 'white' | 'dark';
  /** Trajectory mode: downward towards the dot of the 'i' */
  trajectory?: 'downward-to-i' | 'upper-right';
}

const MONOGRAM_PATH =
  "M246.23,3.9C139.7,3.9,49.03,71.96,15.39,166.96l314.65-57.41,9.29-1.69c1.81-.33,3.64-.49,5.48-.49,1.75,0,3.5.15,5.23.45,15.77,2.83,28.14,15.12,31.08,30.87,2.2,12.13-1.58,24.58-10.15,33.44l-1.45,1.44-143,141.63,263.82-48.09c-1.59,21.53-6.04,42.76-13.23,63.12l-304.27,55.49-6.45,1.18c-2.17.39-4.37.6-6.57.6-2.01,0-4.02-.18-5.99-.56h-.08c-7.47-1.41-14.36-5.02-19.76-10.38-11.36-11.21-14.46-28.33-7.76-42.82.89-1.91,1.93-3.75,3.12-5.49l148.38-148.38L2.41,229.62l-.28.06s0,0,0,0c-.03.35-.09.72-.09,1.08-.42,5.92-.65,11.9-.65,17.92,0,135.17,109.61,244.84,244.83,244.84,106.63,0,197.34-68.17,230.93-163.31,7.19-20.36,11.63-41.58,13.23-63.12.45-6.08.68-12.23.68-18.42C491.05,113.47,381.38,3.85,246.23,3.9Z";

export const ZenikaTrailMonogram: React.FC<ZenikaTrailMonogramProps> = ({
  className = '',
  size = 500,
  stretch = 0,
  solidLogoOpacity = 1,
  trailOpacity = 1,
  layerCount = 28,
  mouseOffset = { x: 0, y: 0 },
  variant = 'color',
  trajectory = 'downward-to-i',
}) => {
  const rawId = useId().replace(/[^a-zA-Z0-9_-]/g, '_');
  const gradientId = `zm_trail_grad_${rawId}`;

  // Clamped and smoothed stretch progress
  const normalizedStretch = Math.max(0, stretch);

  // Generate parametric wireframe slices for the trail
  const trailLayers = useMemo(() => {
    const layers = [];
    const count = Math.max(8, layerCount);

    // Bézier control points in native 500x500 SVG coordinates relative to center (246, 247)
    // Starting from bottom-right of circle, curving outward, and hooking directly onto the 'i' of 'zenika'
    const p1 = { x: 80, y: 80 };
    const p2 = { x: 95, y: 200 };
    const p3 = { x: 19, y: 310 }; // Lands right at the dot of the 'i' in the wordmark below

    for (let i = count; i >= 1; i--) {
      const t = i / count; // 1 at the tip (touching 'i'), 0 near front monogram
      
      let x = 0;
      let y = 0;
      let scale = 1;
      let rotation = 0;

      if (trajectory === 'downward-to-i') {
        const oneMinusT = 1 - t;
        const c1 = 3 * oneMinusT * oneMinusT * t;
        const c2 = 3 * oneMinusT * t * t;
        const c3 = t * t * t;

        x = (c1 * p1.x + c2 * p2.x + c3 * p3.x) * normalizedStretch + mouseOffset.x * 20 * t;
        y = (c1 * p1.y + c2 * p2.y + c3 * p3.y) * normalizedStretch + mouseOffset.y * 16 * t;

        // Progressive tapering scale: narrows down from 1.0 to 0.22 at the tip
        scale = 1 - t * 0.76 * Math.min(1.15, normalizedStretch);

        // Rotation follows the curvature tangent
        rotation = Math.sin(t * Math.PI) * -16 * normalizedStretch - t * 8 * normalizedStretch;
      } else {
        const distanceMultiplier = Math.pow(t, 1.08) * normalizedStretch;
        x = distanceMultiplier * 145 + mouseOffset.x * 24 * t;
        y = distanceMultiplier * 62 + Math.sin(t * Math.PI) * (26 * normalizedStretch);
        scale = 1 - t * 0.42 * Math.min(1.2, normalizedStretch);
        rotation = t * 14 * normalizedStretch;
      }

      // Opacity fades gracefully as trail extends
      const layerOpacity = normalizedStretch < 0.02
        ? 0
        : Math.min(1, (1 - t * 0.52) * Math.min(1, normalizedStretch * 3.2));

      // Fine wireframe stroke width
      const strokeWidth = 1.1 + (1 - t) * 1.5;

      // Color interpolation: ruby red -> bright crimson -> fuchsia pink -> ruby tip
      const r = Math.round(230 + (1 - Math.abs(t - 0.5) * 2) * 25);
      const g = Math.round(t * 70);
      const b = Math.round(57 + t * 65);
      const strokeColor = `rgba(${r}, ${g}, ${b}, ${Math.max(0.12, 0.95 - t * 0.65)})`;

      layers.push({
        id: `layer-${i}`,
        x,
        y,
        scale,
        rotation,
        opacity: layerOpacity,
        strokeWidth,
        strokeColor,
      });
    }

    return layers;
  }, [layerCount, normalizedStretch, mouseOffset.x, mouseOffset.y, trajectory]);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        viewBox="0 0 500 500"
        width="100%"
        height="100%"
        className="w-full h-full pointer-events-none drop-shadow-2xl"
        style={{ overflow: 'visible' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Official Zenika ruby gradient for the front logo */}
          <linearGradient id={gradientId} x1="5%" y1="10%" x2="95%" y2="90%">
            <stop offset="0%" stopColor="#FB1626" />
            <stop offset="30%" stopColor="#E60039" />
            <stop offset="70%" stopColor="#D00030" />
            <stop offset="100%" stopColor="#9C0022" />
          </linearGradient>
        </defs>

        {/* ===================================================================== */}
        {/* REAR PARAMETRIC WIREFRAME TRAIL SLICES CURVING DOWN TO 'i'            */}
        {/* ===================================================================== */}
        <g id="trail-wireframe-layers" opacity={trailOpacity} style={{ transition: 'opacity 0.12s ease-out' }}>
          {trailLayers.map((layer) => (
            <g
              key={layer.id}
              transform={`translate(${layer.x.toFixed(2)}, ${layer.y.toFixed(2)}) rotate(${layer.rotation.toFixed(2)}, 246, 247) scale(${layer.scale.toFixed(4)})`}
              transform-origin="246 247"
              opacity={layer.opacity}
              style={{
                transition: 'opacity 0.12s ease-out',
                willChange: 'transform, opacity',
              }}
            >
              <path
                d={MONOGRAM_PATH}
                fill="none"
                stroke={layer.strokeColor}
                strokeWidth={layer.strokeWidth}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ))}
        </g>

        {/* ===================================================================== */}
        {/* BASE WIREFRAME MONOGRAM (Initial state: pure wireframe contour Z)     */}
        {/* ===================================================================== */}
        <g id="base-wireframe-monogram">
          {/* Subtle architectural guide circle */}
          <circle
            cx="246.23"
            cy="248.74"
            r="244.8"
            fill="none"
            stroke="rgba(230, 0, 57, 0.35)"
            strokeWidth="1.4"
            strokeDasharray="5 4"
          />

          {/* Crisp Ruby Wireframe Z contour */}
          <path
            d={MONOGRAM_PATH}
            fill="none"
            stroke="#E60039"
            strokeWidth="2.8"
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Inner luminous reflection contour */}
          <path
            d={MONOGRAM_PATH}
            fill="none"
            stroke="rgba(255, 80, 115, 0.4)"
            strokeWidth="1.2"
          />
        </g>

        {/* ===================================================================== */}
        {/* TRUE SOLID LOGO (Materializes and builds itself from the lines)        */}
        {/* ===================================================================== */}
        <g
          id="front-monogram-emblem"
          opacity={solidLogoOpacity}
          filter={`drop-shadow(0 16px 32px rgba(230,0,57,${0.35 * solidLogoOpacity}))`}
          style={{
            transition: 'opacity 0.14s ease-out',
            willChange: 'opacity, transform',
          }}
        >
          {/* Inner White Core Circle for contrast */}
          <circle
            cx="246.23"
            cy="248.74"
            r="244.8"
            fill={variant === 'dark' ? '#0F131C' : '#FFFFFF'}
          />

          {/* Foreground Monogram Compound Vector */}
          <path
            d={MONOGRAM_PATH}
            fill={`url(#${gradientId})`}
          />

          {/* Crisp highlight edge stroke */}
          <path
            d={MONOGRAM_PATH}
            fill="none"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1.2"
          />
        </g>
      </svg>
    </div>
  );
};

export default ZenikaTrailMonogram;
