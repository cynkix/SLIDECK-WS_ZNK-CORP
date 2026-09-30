import React, { useRef, useEffect } from 'react';
import ParticlesCursor from 'threejs-components/build/cursors/particles1.min.js';

export interface ZenikaParticlesCanvasProps {
  className?: string;
  opacity?: number;
  interactive?: boolean;
  palette?: 'zenika' | 'cyber' | 'spectral';
  scrollProgress?: number;
  mode?: 'particles' | 'ambient';
}

const PALETTES = {
  zenika: {
    colors: ['#E60039', '#FF2A55', '#FF6B8B', '#5090F4', '#FFAA00', '#FFFFFF'],
    color: '#E60039',
  },
  cyber: {
    colors: ['#5090F4', '#7928CA', '#FF0080', '#E60039', '#0070F3', '#FFFFFF'],
    color: '#5090F4',
  },
  spectral: {
    colors: ['#f967fb', '#53bc28', '#6958d5', '#ffaa00', '#00e5ff', '#ff003c', '#ffffff'],
    color: '#ff003c',
  },
};

export const ZenikaParticlesCanvas: React.FC<ZenikaParticlesCanvasProps> = ({
  className = '',
  opacity = 0.88,
  palette = 'zenika',
  scrollProgress = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);
  const scrollRef = useRef<number>(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pal = PALETTES[palette] || PALETTES.zenika;

    let app: any = null;
    try {
      app = ParticlesCursor(canvas, {
        gpgpuSize: 256, // 65,536 GPU-accelerated particles for ultra-fluid 60fps performance
        colors: pal.colors,
        color: pal.color,
        size: 4.8,
        decay: 0.0022,
        noiseCoordScale: 0.48,
        noiseIntensity: 0.0016,
        noiseTimeCoef: 0.12,
        sleepRadiusX: 260,
        sleepRadiusY: 180,
        sleepTimeScale1: 0.82,
        sleepTimeScale2: 0.82,
      });

      appRef.current = app;

      // Enhance bloom for cinematic Zenika neon glow
      if (app.bloomPass) {
        app.bloomPass.strength = 1.35;
        app.bloomPass.radius = 0.45;
        app.bloomPass.threshold = 0.04;
      }

      // Dynamic reactive behavior hook on scroll
      if (app.three) {
        const originalOnBeforeRender = app.three.onBeforeRender;
        app.three.onBeforeRender = (timeInfo: { elapsed: number; delta: number }) => {
          if (originalOnBeforeRender) {
            originalOnBeforeRender(timeInfo);
          }

          // Subtle modulation of noise time coefficient based on user scroll velocity/progress
          if (app.particles?.config) {
            const p = scrollRef.current || 0;
            app.particles.config.noiseTimeCoef = 0.12 + p * 0.10;
          }
        };
      }
    } catch (err) {
      console.warn('Three.js particles1 initialization note:', err);
    }

    return () => {
      if (appRef.current) {
        try {
          appRef.current.dispose();
        } catch {
          // ignore cleanup errors
        }
        appRef.current = null;
      }
    };
  }, [palette]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          opacity,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};
