import React, { useEffect, useRef, useState, useCallback } from 'react';
import TubesCursor from 'threejs-components/build/cursors/tubes1.min.js';
import { Sparkles, RefreshCw, Shuffle, Infinity as InfinityIcon, Compass, MousePointer } from 'lucide-react';

type TubesShapeType = 'infinity' | 'z-logo' | 'vortex' | 'cursor';

interface TrailingCirclesCanvasProps {
  isDark?: boolean;
  initialShape?: TubesShapeType;
  showControls?: boolean;
  className?: string;
}

const PALETTES = {
  // Exact 8 colors and 4 lights from user code snippet
  'default-8': {
    name: 'Original 8 Couleurs',
    colors: ['#f967fb', '#53bc28', '#6958d5', '#ffaa00', '#00e5ff', '#ff003c', '#baff00', '#ffffff'],
    lights: ['#83f36e', '#fe8a2e', '#ff008a', '#60aed5'],
  },
  // Zenika Signature Carmine & High-Tech accents
  'zenika-neon': {
    name: 'Zenika Signature',
    colors: ['#E60039', '#FF2A55', '#FF6B8B', '#8B5CF6', '#00E5FF', '#FFAA00', '#FFFFFF', '#FF0055'],
    lights: ['#E60039', '#FF0055', '#8B5CF6', '#00E5FF'],
  },
  // Cyber Cyan & Purple
  'cyber-cyan': {
    name: 'Cyber Cyan & Violet',
    colors: ['#00F0FF', '#7928CA', '#FF0080', '#E60039', '#0070F3', '#50E3C2', '#FFAA00', '#FFFFFF'],
    lights: ['#00F0FF', '#FF0080', '#7928CA', '#50E3C2'],
  },
};

export const TrailingCirclesCanvas: React.FC<TrailingCirclesCanvasProps> = ({
  isDark = true,
  initialShape = 'z-logo',
  showControls = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);

  const [shape, setShape] = useState<TubesShapeType>(initialShape);
  const [paletteKey, setPaletteKey] = useState<keyof typeof PALETTES>('default-8');
  const [speed, setSpeed] = useState<number>(1.0);
  const [clickNotice, setClickNotice] = useState<boolean>(false);

  // Mutable refs for real-time 60fps animation without React re-render overhead
  const shapeRef = useRef<TubesShapeType>(shape);
  const speedRef = useRef<number>(speed);
  const pointerRef = useRef({
    worldX: 0,
    worldY: 0,
    isHovering: false,
    lastMoved: 0,
  });

  // Current interpolated target position in 3D world space
  const currentTargetRef = useRef({ x: 0, y: 0, z: 0 });

  shapeRef.current = shape;
  speedRef.current = speed;

  // Initialize Three.js TubesCursor
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initialPal = PALETTES[paletteKey];

    try {
      const app = TubesCursor(canvas, {
        bloom: {
          threshold: 0,
          strength: isDark ? 1.6 : 1.2,
          radius: 0.55,
        },
        tubes: {
          count: 8, // 8 volumetric tubes as requested
          colors: initialPal.colors,
          minRadius: 0.016,
          maxRadius: 0.055,
          minTubularSegments: 48,
          maxTubularSegments: 128,
          material: {
            metalness: 0.85,
            roughness: 0.22,
          },
          lights: {
            intensity: isDark ? 230 : 180,
            colors: initialPal.lights,
          },
          lerp: 0.45,
          noise: 0.04,
        },
      });

      appRef.current = app;

      // -----------------------------------------------------------------------
      // DIRECT ATTRACTOR HOOK: Connects our parametric math directly into Three.js
      // -----------------------------------------------------------------------
      if (app.three) {
        app.three.onBeforeRender = (timeInfo: { elapsed: number; delta: number }) => {
          if (!app.tubes?.target) return;

          const wW = app.three.size?.wWidth > 0 ? app.three.size.wWidth : 8;
          const wH = app.three.size?.wHeight > 0 ? app.three.size.wHeight : 4.5;
          const t = (timeInfo.elapsed || 0) * 0.9 * speedRef.current;
          const currentShape = shapeRef.current;

          let targetX = 0;
          let targetY = 0;

          // ===================================================================
          // 1. FORME INFINI ∞ (Lemniscate de Bernoulli - Exactement du code utilisateur)
          // ===================================================================
          if (currentShape === 'infinity') {
            const scale = Math.min(wW * 0.44, wH * 0.48);
            const denom = 1 + Math.sin(t) * Math.sin(t);
            targetX = (scale * 1.35 * Math.cos(t)) / denom;
            targetY = (scale * 1.05 * Math.sin(t) * Math.cos(t)) / denom;
          }
          // ===================================================================
          // 2. FORME LOGO ZENIKA 'Z' (Tracé à l'endroit puis à l'envers en boucle fluide)
          // "le dessiner à l'endroit ok mais repartir à l'envers pour garder le z lisible tel une boucle"
          // ===================================================================
          else if (currentShape === 'z-logo') {
            const hw = Math.min(wW * 0.28, 2.35);
            const hh = Math.min(wH * 0.32, 1.45);

            // Longueurs proportionnelles des segments du Z :
            // Segment 1 (barre haute) : 2 * hw
            // Segment 2 (diagonale) : sqrt((2*hw)^2 + (2*hh)^2)
            // Segment 3 (barre basse) : 2 * hw
            const L1 = 2 * hw;
            const L2 = Math.sqrt(Math.pow(2 * hw, 2) + Math.pow(2 * hh, 2));
            const L3 = 2 * hw;
            const Ltot = L1 + L2 + L3;
            const r1 = L1 / Ltot;
            const r2 = (L1 + L2) / Ltot;

            // Oscillation aller-retour continue (0 -> 1 -> 0 -> 1 ...)
            // La fonction cosinus assure une décélération naturelle aux deux extrémités
            const cycleSpeed = 0.52;
            const progress = (1 - Math.cos(t * cycleSpeed)) * 0.5;

            if (progress <= r1) {
              // 1. Barre supérieure horizontale (Top-Left <-> Top-Right)
              const p = progress / r1;
              targetX = -hw + 2 * hw * p;
              targetY = hh;
            } else if (progress <= r2) {
              // 2. Diagonale centrale (Top-Right <-> Bottom-Left)
              const p = (progress - r1) / (r2 - r1);
              targetX = hw - 2 * hw * p;
              targetY = hh - 2 * hh * p;
            } else {
              // 3. Barre inférieure horizontale (Bottom-Left <-> Bottom-Right)
              const p = (progress - r2) / (1 - r2);
              targetX = -hw + 2 * hw * p;
              targetY = -hh;
            }
          }
          // ===================================================================
          // 3. VORTEX / ORBITE HARMONIQUE (Double spirale galactique)
          // ===================================================================
          else if (currentShape === 'vortex') {
            const radX = Math.min(wW * 0.36, 2.8);
            const radY = Math.min(wH * 0.36, 1.6);
            const rMod = 0.85 + 0.15 * Math.sin(t * 2.8);
            targetX = radX * rMod * Math.cos(t);
            targetY = radY * rMod * Math.sin(t);
          }
          // ===================================================================
          // 4. CURSEUR DIRECT
          // ===================================================================
          else {
            targetX = pointerRef.current.worldX;
            targetY = pointerRef.current.worldY;
          }

          // Gravitation & attraction interactive quand l'utilisateur bouge sa souris
          const now = performance.now();
          const isInteracting = pointerRef.current.isHovering && (now - pointerRef.current.lastMoved < 2200);

          if (isInteracting && currentShape === 'cursor') {
            targetX = pointerRef.current.worldX;
            targetY = pointerRef.current.worldY;
          } else if (isInteracting) {
            // Mélange soyeux entre la forme et le curseur (effet gravitationnel réactif)
            const pullFactor = 0.40;
            targetX = targetX * (1 - pullFactor) + pointerRef.current.worldX * pullFactor;
            targetY = targetY * (1 - pullFactor) + pointerRef.current.worldY * pullFactor;
          }

          // Interpolation progressive pour la fluidité organique des 8 tubes
          currentTargetRef.current.x += (targetX - currentTargetRef.current.x) * 0.14;
          currentTargetRef.current.y += (targetY - currentTargetRef.current.y) * 0.14;

          app.tubes.target.x = currentTargetRef.current.x;
          app.tubes.target.y = currentTargetRef.current.y;
          app.tubes.target.z = 0;

          // Mise à jour de la physique des tubes Three.js
          app.tubes.update(timeInfo);
        };
      }
    } catch (err) {
      console.warn('Three.js Tubes Cursor initialization note:', err);
    }

    return () => {
      if (appRef.current?.dispose) {
        try {
          appRef.current.dispose();
        } catch {
          // ignore cleanup error
        }
      }
      appRef.current = null;
    };
  }, [isDark]);

  // Handle pointer tracking for 3D world interaction
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const canvas = canvasRef.current;
      const app = appRef.current;
      if (!canvas || !app?.three?.size) return;

      const rect = canvas.getBoundingClientRect();
      const inBounds = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      if (inBounds) {
        pointerRef.current.isHovering = true;
        pointerRef.current.lastMoved = performance.now();
        const wW = app.three.size.wWidth > 0 ? app.three.size.wWidth : 8;
        const wH = app.three.size.wHeight > 0 ? app.three.size.wHeight : 4.5;
        pointerRef.current.worldX = ((e.clientX - rect.left) / rect.width - 0.5) * wW;
        pointerRef.current.worldY = -((e.clientY - rect.top) / rect.height - 0.5) * wH;
      } else {
        pointerRef.current.isHovering = false;
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  // Update palette when state changes
  useEffect(() => {
    if (!appRef.current?.tubes) return;
    const pal = PALETTES[paletteKey];
    try {
      appRef.current.tubes.setColors(pal.colors);
      appRef.current.tubes.setLightsColors(pal.lights);
    } catch {
      // ignore
    }
  }, [paletteKey]);

  // RANDOMIZE COLORS ON CLICK (Exactement la fonction du snippet utilisateur)
  const randomizeColors = useCallback(() => {
    if (!appRef.current?.tubes) return;
    const colors = Array.from({ length: 8 }, () =>
      '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    );
    const lights = Array.from({ length: 4 }, () =>
      '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    );
    try {
      appRef.current.tubes.setColors(colors);
      appRef.current.tubes.setLightsColors(lights);
      setClickNotice(true);
      setTimeout(() => setClickNotice(false), 2000);
    } catch {
      // ignore
    }
  }, []);

  // Global click listener to randomize on any click (matching user script behavior)
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Ignore if clicking on interactive controls or buttons
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('input')) {
        return;
      }
      randomizeColors();
    };

    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [randomizeColors]);

  return (
    <div
      ref={containerRef}
      id="zenika-tubes-hero-container"
      className={`absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-auto ${className}`}
      style={{
        backgroundColor: isDark ? '#05070B' : '#F8FAFC',
      }}
    >
      {/* 3D WebGL Canvas for 8 Tubes */}
      <canvas
        ref={canvasRef}
        id="zenika-tubes-canvas"
        className="w-full h-full block cursor-crosshair"
      />

      {/* Atmospheric radial vignette around the tubes */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(5, 7, 11, 0) 35%, rgba(5, 7, 11, 0.72) 100%)'
            : 'radial-gradient(circle at 50% 50%, rgba(248, 250, 252, 0) 35%, rgba(248, 250, 252, 0.65) 100%)',
        }}
      />

      {/* Micro-Notification Toast on Color Shuffle */}
      {clickNotice && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-none animate-bounce">
          <div className="px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] shadow-xl flex items-center gap-1.5">
            <Shuffle size={11} className="text-[#E60039]" />
            <span>8 Couleurs & Lumières Aléatoires Appliquées</span>
          </div>
        </div>
      )}

      {/* FLOATING CONTROLS FOR TUBES SHAPES & TRACES */}
      {showControls && (
        <div className="absolute bottom-6 sm:bottom-8 inset-x-0 z-30 flex justify-center pointer-events-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-black/75 dark:bg-black/85 backdrop-blur-xl border border-white/15 shadow-2xl text-xs font-mono text-white/80">
            
            {/* Shape Switchers */}
            <div className="flex items-center gap-1 bg-white/10 rounded-full p-0.5">
              <button
                onClick={() => setShape('infinity')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                  shape === 'infinity'
                    ? 'bg-[#E60039] text-white font-bold shadow-xs'
                    : 'text-white/60 hover:text-white'
                }`}
                title="Lemniscate de Bernoulli (Huit infini ∞ - Code référence)"
              >
                <InfinityIcon size={12} />
                <span className="hidden sm:inline">Infini ∞</span>
              </button>

              <button
                onClick={() => setShape('z-logo')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                  shape === 'z-logo'
                    ? 'bg-[#E60039] text-white font-bold shadow-xs'
                    : 'text-white/60 hover:text-white'
                }`}
                title="Monogramme Zenika 'Z' en tracé continu"
              >
                <Sparkles size={12} />
                <span>Logo 'Z'</span>
              </button>

              <button
                onClick={() => setShape('vortex')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                  shape === 'vortex'
                    ? 'bg-[#E60039] text-white font-bold shadow-xs'
                    : 'text-white/60 hover:text-white'
                }`}
                title="Orbite harmonique"
              >
                <Compass size={12} />
                <span className="hidden sm:inline">Vortex</span>
              </button>

              <button
                onClick={() => setShape('cursor')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                  shape === 'cursor'
                    ? 'bg-[#E60039] text-white font-bold shadow-xs'
                    : 'text-white/60 hover:text-white'
                }`}
                title="Suivi réactif direct du curseur"
              >
                <MousePointer size={11} />
                <span className="hidden md:inline">Curseur</span>
              </button>
            </div>

            {/* Randomize Colors Button */}
            <button
              onClick={randomizeColors}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer flex items-center gap-1.5"
              title="Générer 8 nouvelles couleurs et 4 lumières (ou cliquez n'importe où sur l'écran)"
            >
              <Shuffle size={12} className="text-pink-400" />
              <span className="hidden sm:inline">Couleurs Aléatoires</span>
              <span className="sm:hidden">Aléatoire</span>
            </button>

            {/* Palette Switcher */}
            <div className="hidden lg:flex items-center gap-1 pl-1 border-l border-white/15">
              {(Object.keys(PALETTES) as (keyof typeof PALETTES)[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setPaletteKey(key)}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] transition-all cursor-pointer ${
                    paletteKey === key
                      ? 'bg-white/25 text-white font-semibold'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {key === 'default-8' ? 'Original' : key === 'zenika-neon' ? 'Zenika' : 'Cyan'}
                </button>
              ))}
            </div>

            {/* Speed Toggle */}
            <div className="hidden xl:flex items-center gap-1 pl-1 border-l border-white/15">
              {[0.6, 1.0, 1.8].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                    speed === s ? 'bg-[#E60039] text-white font-bold' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
