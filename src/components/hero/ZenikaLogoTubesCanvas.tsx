import React, { useRef, useEffect, useState, useCallback } from 'react';
import TubesCursor from 'threejs-components/build/cursors/tubes1.min.js';

export type TubesShapeMode = 'z-loop' | 'z-pingpong' | 'infinity';

interface ZenikaLogoTubesCanvasProps {
  opacity?: number;
  shapeMode?: TubesShapeMode;
  speed?: number;
  scaleFactor?: number;
  interactive?: boolean;
  className?: string;
  palette?: 'default-8' | 'zenika-neon' | 'cyber-cyan' | 'custom';
  onPaletteChange?: (palette: string) => void;
}

const PALETTES = {
  'default-8': {
    colors: ['#f967fb', '#53bc28', '#6958d5', '#ffaa00', '#00e5ff', '#ff003c', '#baff00', '#ffffff'],
    lights: ['#83f36e', '#fe8a2e', '#ff008a', '#60aed5'],
  },
  'zenika-neon': {
    colors: ['#E60039', '#FF2A55', '#FF6B8B', '#8B5CF6', '#00E5FF', '#FFAA00', '#FFFFFF', '#FF0055'],
    lights: ['#E60039', '#FF0055', '#8B5CF6', '#00E5FF'],
  },
  'cyber-cyan': {
    colors: ['#00F0FF', '#7928CA', '#FF0080', '#E60039', '#0070F3', '#50E3C2', '#FFAA00', '#FFFFFF'],
    lights: ['#00F0FF', '#FF0080', '#7928CA', '#50E3C2'],
  },
};

export const ZenikaLogoTubesCanvas: React.FC<ZenikaLogoTubesCanvasProps> = ({
  opacity = 0.95,
  shapeMode = 'z-loop',
  speed = 1.0,
  scaleFactor = 0.38,
  interactive = true,
  className = '',
  palette = 'default-8',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);
  const [currentPalette, setCurrentPalette] = useState(palette);

  useEffect(() => {
    setCurrentPalette(palette);
  }, [palette]);

  const shapeModeRef = useRef(shapeMode);
  const speedRef = useRef(speed);
  const scaleRef = useRef(scaleFactor);
  const currentTargetRef = useRef({ x: 0, y: 0, z: 0 });

  shapeModeRef.current = shapeMode;
  speedRef.current = speed;
  scaleRef.current = scaleFactor;

  // Initialize TubesCursor with direct attractor hook
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initialPalette = PALETTES[currentPalette as keyof typeof PALETTES] || PALETTES['default-8'];

    try {
      const app = TubesCursor(canvas, {
        bloom: {
          threshold: 0,
          strength: 1.5,
          radius: 0.5,
        },
        tubes: {
          count: 8,
          colors: initialPalette.colors,
          lights: {
            intensity: 220,
            colors: initialPalette.lights,
          },
          lerp: 0.45,
          noise: 0.04,
        },
      });

      appRef.current = app;

      // Direct continuous mathematical trajectory hook
      if (app.three) {
        app.three.onBeforeRender = (timeInfo: { elapsed: number; delta: number }) => {
          if (!app.tubes?.target) return;

          const wW = app.three.size?.wWidth > 0 ? app.three.size.wWidth : 8;
          const wH = app.three.size?.wHeight > 0 ? app.three.size.wHeight : 4.5;
          const t = (timeInfo.elapsed || 0) * 0.9 * speedRef.current;
          const mode = shapeModeRef.current;
          const sFactor = scaleRef.current;

          let targetX = 0;
          let targetY = 0;

          if (mode === 'infinity') {
            // Lemniscate de Bernoulli (Code utilisateur)
            const scale = Math.min(wW * 0.44, wH * 0.48) * (sFactor / 0.38);
            const denom = 1 + Math.sin(t) * Math.sin(t);
            targetX = (scale * 1.35 * Math.cos(t)) / denom;
            targetY = (scale * 1.05 * Math.sin(t) * Math.cos(t)) / denom;
          } else if (mode === 'z-pingpong') {
            // Ping-pong across the Z strokes
            const hw = Math.min(wW * 0.28, 2.2) * (sFactor / 0.38);
            const hh = Math.min(wH * 0.32, 1.4) * (sFactor / 0.38);
            const tri = (Math.sin(t * 0.6) + 1) * 0.5;

            if (tri < 0.33) {
              const p = tri / 0.33;
              targetX = -hw + 2 * hw * p;
              targetY = hh;
            } else if (tri < 0.67) {
              const p = (tri - 0.33) / 0.34;
              targetX = hw - 2 * hw * p;
              targetY = hh - 2 * hh * p;
            } else {
              const p = (tri - 0.67) / 0.33;
              targetX = -hw + 2 * hw * p;
              targetY = -hh;
            }
          } else {
            // Default 'z-loop': Tracé à l'endroit puis à l'envers en boucle fluide
            // "le dessiner à l'endroit ok mais repartir à l'envers pour garder le z lisible tel une boucle"
            const hw = Math.min(wW * 0.28, 2.35) * (sFactor / 0.38);
            const hh = Math.min(wH * 0.32, 1.45) * (sFactor / 0.38);

            const L1 = 2 * hw;
            const L2 = Math.sqrt(Math.pow(2 * hw, 2) + Math.pow(2 * hh, 2));
            const L3 = 2 * hw;
            const Ltot = L1 + L2 + L3;
            const r1 = L1 / Ltot;
            const r2 = (L1 + L2) / Ltot;

            const cycleSpeed = 0.52;
            const progress = (1 - Math.cos(t * cycleSpeed)) * 0.5;

            if (progress <= r1) {
              const p = progress / r1;
              targetX = -hw + 2 * hw * p;
              targetY = hh;
            } else if (progress <= r2) {
              const p = (progress - r1) / (r2 - r1);
              targetX = hw - 2 * hw * p;
              targetY = hh - 2 * hh * p;
            } else {
              const p = (progress - r2) / (1 - r2);
              targetX = -hw + 2 * hw * p;
              targetY = -hh;
            }
          }

          // Smooth interpolation for tubes inertia
          currentTargetRef.current.x += (targetX - currentTargetRef.current.x) * 0.15;
          currentTargetRef.current.y += (targetY - currentTargetRef.current.y) * 0.15;

          app.tubes.target.x = currentTargetRef.current.x;
          app.tubes.target.y = currentTargetRef.current.y;
          app.tubes.target.z = 0;

          app.tubes.update(timeInfo);
        };
      }
    } catch (err) {
      console.warn('TubesCursor initialization notice:', err);
    }

    return () => {
      if (appRef.current?.dispose) {
        try {
          appRef.current.dispose();
        } catch {
          // ignore cleanup errors
        }
      }
      appRef.current = null;
    };
  }, []);

  // Update palette when prop or state changes
  useEffect(() => {
    if (!appRef.current?.tubes) return;
    const pal = PALETTES[currentPalette as keyof typeof PALETTES] || PALETTES['default-8'];
    try {
      appRef.current.tubes.setColors(pal.colors);
      appRef.current.tubes.setLightsColors(pal.lights);
    } catch {
      // ignore
    }
  }, [currentPalette]);

  // Randomize colors on click (as requested in user's demo)
  const handleCanvasClick = useCallback(() => {
    if (!interactive || !appRef.current?.tubes) return;
    const colors = Array.from({ length: 8 }, () =>
      '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    );
    const lights = Array.from({ length: 4 }, () =>
      '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    );
    try {
      appRef.current.tubes.setColors(colors);
      appRef.current.tubes.setLightsColors(lights);
    } catch {
      // ignore
    }
  }, [interactive]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Animation interactive des tubes lumineux Zenika : cliquez ou appuyez sur Entrée pour cycler les couleurs"
      className={`absolute inset-0 pointer-events-auto overflow-hidden transition-opacity duration-700 ${className} focus:outline-none focus:ring-1 focus:ring-[#E60039]/40`}
      style={{ opacity }}
      onClick={handleCanvasClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCanvasClick();
        }
      }}
      title="Cliquez pour changer les couleurs des tubes lumineux (8 couleurs)"
    >
      <canvas
        ref={canvasRef}
        id="zenika-tubes-canvas"
        className="w-full h-full block"
      />
    </div>
  );
};
