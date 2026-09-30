import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Upload, 
  RotateCcw, 
  ArrowDown, 
  Sliders, 
  Film, 
  Layers,
  Check,
  ChevronDown,
  Sparkles,
  Eye,
  Palette
} from 'lucide-react';
import { Language } from '../../types';
import { ZenikaLogoTubesCanvas, TubesShapeMode } from './ZenikaLogoTubesCanvas';
import { IntroVersion } from './HeroOpeningCover';

interface HeroIntroVideoMaskProps {
  lang: Language;
  onDiscover?: () => void;
  introVersion: IntroVersion;
  onVersionChange: (version: IntroVersion) => void;
}

type ColorGradientCategory = 'red-orange' | 'purple-vintageblue' | 'lightblue-cyan';
type ColorGradientTheme = 'all-gradient' | 'red-orange' | 'purple-vintageblue' | 'lightblue-cyan';

interface TextSegment {
  text: string;
  gradientType?: ColorGradientCategory;
  color?: string; // fallback
}

interface MaskTextLine {
  id: string;
  fr: string;
  en: string;
  isHeadline?: boolean;
  isKeyWord?: boolean;
  customScale?: number; // relative size factor
  tagFr?: string;
  tagEn?: string;
  segmentsFr: TextSegment[];
  segmentsEn: TextSegment[];
}

const getGradientStops = (
  gradientType: ColorGradientCategory,
  activeTheme: ColorGradientTheme
): { start: string; end: string; glow: string } => {
  const effectiveType = activeTheme === 'all-gradient' ? gradientType : activeTheme;
  switch (effectiveType) {
    case 'red-orange':
      return { 
        start: '#E60039', // Rouge Zenika signature
        end: '#FF5C28',   // Rouge orangé vibrant
        glow: 'rgba(230, 0, 57, 0.7)' 
      };
    case 'purple-vintageblue':
      return { 
        start: '#9333EA', // Violet vibrant
        end: '#4F709C',   // Vieux bleu / Slate vintage
        glow: 'rgba(147, 51, 234, 0.7)' 
      };
    case 'lightblue-cyan':
    default:
      return { 
        start: '#38BDF8', // Bleu clair céleste
        end: '#00F0FF',   // Bleu cyan électrique
        glow: 'rgba(0, 240, 255, 0.7)' 
      };
  }
};

// 13 rhythmic lines creating the cinematic scroll progression
// Words have subtle refined gradients in the requested harmonies:
// 1. Rouge, rouge orangé (#E60039 -> #FF5C28)
// 2. Violet, vieux bleu (#9333EA -> #4F709C)
// 3. Bleu clair, bleu cyan (#38BDF8 -> #00F0FF)
const MANIFESTO_LINES: MaskTextLine[] = [
  {
    id: 'l1',
    fr: "À l'ère de l'IA",
    en: "In the era of AI",
    customScale: 1.05,
    tagFr: 'NOUVELLE ÈRE',
    tagEn: 'NEW ERA',
    segmentsFr: [
      { text: "À l'ère de " },
      { text: "l'IA", gradientType: 'lightblue-cyan' }
    ],
    segmentsEn: [
      { text: "In the era of " },
      { text: "AI", gradientType: 'lightblue-cyan' }
    ]
  },
  {
    id: 'l2',
    fr: '& du Cloud,',
    en: '& the Cloud,',
    isKeyWord: true,
    customScale: 1.15,
    segmentsFr: [
      { text: '& du ' },
      { text: 'Cloud,', gradientType: 'lightblue-cyan' }
    ],
    segmentsEn: [
      { text: '& the ' },
      { text: 'Cloud,', gradientType: 'lightblue-cyan' }
    ]
  },
  {
    id: 'l3',
    fr: 'la tech investit le cœur',
    en: 'tech powers the core',
    isHeadline: true,
    customScale: 1.1,
    tagFr: 'STRATÉGIE',
    tagEn: 'STRATEGY',
    segmentsFr: [
      { text: 'la ' },
      { text: 'tech', gradientType: 'red-orange' },
      { text: ' investit le cœur' }
    ],
    segmentsEn: [
      { text: 'tech powers the ' },
      { text: 'core', gradientType: 'red-orange' }
    ]
  },
  {
    id: 'l4',
    fr: 'des stratégies d’entreprises,',
    en: 'of enterprise strategies,',
    customScale: 1.05,
    segmentsFr: [{ text: 'des stratégies d’entreprises,' }],
    segmentsEn: [{ text: 'of enterprise strategies,' }]
  },
  {
    id: 'l5',
    fr: 'mais l’IT peine souvent',
    en: 'yet IT often struggles',
    isKeyWord: true,
    customScale: 1.15,
    tagFr: 'COMPLEXITÉ',
    tagEn: 'IT FRICTION',
    segmentsFr: [
      { text: 'mais ' },
      { text: 'l’IT peine souvent', gradientType: 'purple-vintageblue' }
    ],
    segmentsEn: [
      { text: 'yet ' },
      { text: 'IT often struggles', gradientType: 'purple-vintageblue' }
    ]
  },
  {
    id: 'l6',
    fr: 'à produire de la valeur',
    en: 'to deliver value',
    customScale: 1.05,
    segmentsFr: [
      { text: 'à produire de la ' },
      { text: 'valeur', gradientType: 'red-orange' }
    ],
    segmentsEn: [
      { text: 'to deliver ' },
      { text: 'value', gradientType: 'red-orange' }
    ]
  },
  {
    id: 'l7',
    fr: 'au rythme attendu.',
    en: 'at the expected pace.',
    isKeyWord: true,
    customScale: 1.2,
    tagFr: 'CADENCE',
    tagEn: 'PACE',
    segmentsFr: [{ text: 'au rythme attendu.', gradientType: 'red-orange' }],
    segmentsEn: [{ text: 'at the expected pace.', gradientType: 'red-orange' }]
  },
  {
    id: 'l8',
    fr: 'Zenika',
    en: 'Zenika',
    isHeadline: true,
    isKeyWord: true,
    customScale: 1.5,
    tagFr: '20 ANS',
    tagEn: 'EXPERTISE',
    segmentsFr: [{ text: 'Zenika', gradientType: 'red-orange' }],
    segmentsEn: [{ text: 'Zenika', gradientType: 'red-orange' }]
  },
  {
    id: 'l9',
    fr: 'est le partenaire',
    en: 'is the proximity',
    customScale: 1.0,
    segmentsFr: [{ text: 'est le partenaire' }],
    segmentsEn: [{ text: 'is the proximity' }]
  },
  {
    id: 'l10',
    fr: 'technologique de proximité',
    en: 'technology partner',
    isHeadline: true,
    isKeyWord: true,
    customScale: 1.25,
    tagFr: 'PROXIMITÉ',
    tagEn: 'PROXIMITY',
    segmentsFr: [
      { text: 'technologique de ' },
      { text: 'proximité', gradientType: 'lightblue-cyan' }
    ],
    segmentsEn: [
      { text: 'technology ' },
      { text: 'partner', gradientType: 'lightblue-cyan' }
    ]
  },
  {
    id: 'l11',
    fr: 'qui augmente',
    en: 'amplifying',
    customScale: 1.05,
    segmentsFr: [{ text: 'qui augmente' }],
    segmentsEn: [{ text: 'amplifying' }]
  },
  {
    id: 'l12',
    fr: 'l’impact métier',
    en: 'the business impact',
    isHeadline: true,
    isKeyWord: true,
    customScale: 1.35,
    tagFr: 'IMPACT',
    tagEn: 'IMPACT',
    segmentsFr: [{ text: 'l’impact métier', gradientType: 'red-orange' }],
    segmentsEn: [{ text: 'the business impact', gradientType: 'red-orange' }]
  },
  {
    id: 'l13',
    fr: 'de votre SI.',
    en: 'of your IT.',
    isHeadline: true,
    isKeyWord: true,
    customScale: 1.3,
    tagFr: 'VALEUR MÉTIER',
    tagEn: 'BUSINESS VALUE',
    segmentsFr: [
      { text: 'de votre ' },
      { text: 'SI.', gradientType: 'red-orange' }
    ],
    segmentsEn: [
      { text: 'of your ' },
      { text: 'IT.', gradientType: 'red-orange' }
    ]
  }
];

/**
 * Utilitaires de rendu typographique segmenté pour colorer certains mots en dégradés fins
 * avec positionnement rigoureux au pixel près (évite toute superposition ou décalage)
 */
const renderSegmentedLine = (
  context: CanvasRenderingContext2D,
  segments: TextSegment[],
  centerX: number,
  centerY: number,
  options: {
    defaultColor: string;
    useColoredWords: boolean;
    colorAlpha?: number;
    glow?: boolean;
    glowAlpha?: number;
    colorTheme: ColorGradientTheme;
    time?: number;
  }
) => {
  const fullText = segments.map((s) => s.text).join('');
  const totalWidth = context.measureText(fullText).width;
  const startX = centerX - totalWidth * 0.5;

  const prevAlign = context.textAlign;
  context.textAlign = 'left';

  let currentPrefix = '';
  const animTime = options.time || 0;

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const segStartX = startX + context.measureText(currentPrefix).width;
    currentPrefix += seg.text;
    const segEndX = startX + context.measureText(currentPrefix).width;

    const isZenikaOrchestre = seg.text.toLowerCase().includes('zenika') || seg.text.toLowerCase().includes('orchestre');

    // If it's Zenika or orchestre, animate letter by letter with a wave!
    if (isZenikaOrchestre && animTime > 0) {
      let charPrefix = '';
      const letters = seg.text.split('');
      const isZenika = seg.text.toLowerCase().includes('zenika');
      const baseDelay = isZenika ? 0 : 0.8;

      for (let c = 0; c < letters.length; c++) {
        const char = letters[c];
        const charX = segStartX + context.measureText(charPrefix).width;
        charPrefix += char;

        // Smooth harmonic ease-in-out wave for each letter (zero bounce, soft 2px float)
        const letterWave = Math.sin(animTime * 2.0 - (baseDelay + c * 0.22));
        const yOffset = letterWave * 2.0; // gentle vertical float
        const charCenterY = centerY + yOffset;

        context.save();
        if (isZenika) {
          context.font = context.font.replace(/"Cabinet Grotesk"[^,]*/, '"Nunito"').replace(/"Plus Jakarta Sans"/, '"Nunito"');
        }
        const isColored = options.useColoredWords && Boolean(seg.gradientType || seg.color);

        if (isColored) {
          const gType: ColorGradientCategory = seg.gradientType || 'lightblue-cyan';
          const stops = getGradientStops(gType, options.colorTheme);

          const grad = context.createLinearGradient(segStartX, charCenterY, segEndX, charCenterY);
          grad.addColorStop(0, stops.start);
          grad.addColorStop(1, stops.end);

          context.fillStyle = grad;
          if (options.colorAlpha !== undefined && options.colorAlpha < 1) {
            context.globalAlpha = Math.max(0.1, options.colorAlpha);
          }
          // User request: Ne pas ajouter d'effet blur sur ZENIKA ORCHESTRE
          context.shadowBlur = 0;
          context.shadowColor = 'transparent';
        } else {
          context.fillStyle = options.defaultColor;
          context.shadowBlur = 0;
          context.shadowColor = 'transparent';
        }

        context.fillText(char, charX, charCenterY);
        context.restore();
      }
    } else {
      context.save();
      const isColored = options.useColoredWords && Boolean(seg.gradientType || seg.color);

      if (isColored) {
        const gType: ColorGradientCategory = seg.gradientType || 'lightblue-cyan';
        const stops = getGradientStops(gType, options.colorTheme);

        // Dégradé linéaire horizontal fin sur la largeur du mot
        const grad = context.createLinearGradient(segStartX, centerY, segEndX, centerY);
        grad.addColorStop(0, stops.start);
        grad.addColorStop(1, stops.end);

        context.fillStyle = grad;
        if (options.colorAlpha !== undefined && options.colorAlpha < 1) {
          context.globalAlpha = Math.max(0.1, options.colorAlpha);
        }
        if (options.glow && options.glowAlpha) {
          context.shadowColor = stops.glow;
          context.shadowBlur = Math.max(6, options.glowAlpha * 14);
        }
      } else {
        context.fillStyle = options.defaultColor;
        if (options.glow && options.glowAlpha) {
          context.shadowColor = 'rgba(255, 255, 255, 0.3)';
          context.shadowBlur = options.glowAlpha * 8;
        }
      }

      context.fillText(seg.text, segStartX, centerY);
      context.restore();
    }
  }

  context.textAlign = prevAlign;
};

export const HeroIntroVideoMask: React.FC<HeroIntroVideoMaskProps> = ({
  lang,
  onDiscover,
  introVersion,
  onVersionChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Hidden video element used as GPU texture
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video State
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [customVideoName, setCustomVideoName] = useState<string | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  // Visual Contrast Presets for the Monochrome Background
  // 1 = Carbon Deep (35% bright, 130% contrast)
  // 2 = Studio Pure N&B (50% bright, 115% contrast)
  // 3 = Noir Haute Densité (25% bright, 140% contrast)
  const [contrastPreset, setContrastPreset] = useState<'carbon' | 'pure' | 'density'>('carbon');
  const [textScaleMode, setTextScaleMode] = useState<'monumental' | 'compact'>('monumental');

  // 3D Tubes & Z-Logo Trace State (from user code)
  const [showTubes, setShowTubes] = useState<boolean>(true);
  const [tubesShapeMode, setTubesShapeMode] = useState<TubesShapeMode>('z-loop');
  const [tubesPalette, setTubesPalette] = useState<'default-8' | 'zenika-neon' | 'cyber-cyan'>('default-8');
  const [tubesOpacity, setTubesOpacity] = useState<number>(0.92);
  const [tubesSpeed, setTubesSpeed] = useState<number>(1.0);
  const [showTubesMenu, setShowTubesMenu] = useState<boolean>(false);

  // Typography Reading Spotlight State: "for typography put words in white when we need to reade it and atfter they can go at the original status"
  const [readingWhiteHighlight, setReadingWhiteHighlight] = useState<boolean>(true);
  const [readingFocusRange, setReadingFocusRange] = useState<'focused' | 'generous'>('focused');

  // Mots en Couleurs Dégradées (Harmonies fines demandées par l'utilisateur)
  // - Rouge, rouge orangé (#E60039 -> #FF5C28)
  // - Violet, vieux bleu (#9333EA -> #4F709C)
  // - Bleu clair, bleu cyan (#38BDF8 -> #00F0FF)
  const [coloredWordsEnabled, setColoredWordsEnabled] = useState<boolean>(true);
  const [colorTheme, setColorTheme] = useState<ColorGradientTheme>('all-gradient');
  const [showColorPaletteMenu, setShowColorPaletteMenu] = useState<boolean>(false);

  // Autoplay slow cruise option
  const [isAutoCruising, setIsAutoCruising] = useState<boolean>(false);

  // Scroll tracking (container height is ~350vh to give ample scroll runway)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring for cinematic inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.0005,
  });

  const [currentProgressVal, setCurrentProgressVal] = useState<number>(0);
  const lastProgressMaskRef = useRef(0);
  const rafMaskIdRef = useRef<number | null>(null);

  useEffect(() => {
    return smoothProgress.on('change', (v) => {
      if (Math.abs(v - lastProgressMaskRef.current) < 0.0025) return;
      if (rafMaskIdRef.current) cancelAnimationFrame(rafMaskIdRef.current);
      rafMaskIdRef.current = requestAnimationFrame(() => {
        lastProgressMaskRef.current = v;
        setCurrentProgressVal(v);
      });
    });
  }, [smoothProgress]);

  useEffect(() => {
    return () => {
      if (rafMaskIdRef.current) cancelAnimationFrame(rafMaskIdRef.current);
    };
  }, []);

  // Autoplay cruise timer
  useEffect(() => {
    if (!isAutoCruising || !containerRef.current) return;
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const currentScroll = window.scrollY;
      const maxScroll = containerRef.current.offsetTop + containerRef.current.offsetHeight - window.innerHeight;
      if (currentScroll >= maxScroll - 10) {
        setIsAutoCruising(false);
      } else {
        window.scrollBy({ top: 3, behavior: 'auto' });
      }
    }, 20);
    return () => clearInterval(interval);
  }, [isAutoCruising]);

  // Handle Play/Pause
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, videoSrc]);

  // Handle File Upload with proper object URL revocation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      const blobUrl = URL.createObjectURL(file);
      blobUrlRef.current = blobUrl;
      setVideoSrc(blobUrl);
      setCustomVideoName(file.name);
      setVideoError(false);
      setIsPlaying(true);
    }
  };

  const resetToDefaultVideo = () => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
    setVideoSrc(null);
    setCustomVideoName(null);
    setVideoError(false);
  };

  // Revoke object URL on unmount
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, []);

  // Jump to specific milestone
  const jumpToAct = (ratio: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerH = containerRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: containerTop + containerH * ratio,
      behavior: 'smooth',
    });
  };

  // =========================================================================
  // HIGH-RESOLUTION CHROMATIC TEXT MASK ENGINE (CANVAS 2D DUAL BUFFER)
  // =========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Create offscreen canvas for the clipping mask
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
    }
    const offCanvas = offscreenCanvasRef.current;
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return;

    let animationFrameId: number;
    let fallbackTime = 0;

    // Resize handler
    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Render loop
    const render = () => {
      fallbackTime += 0.018;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width;
      const height = canvas.height;
      const cssWidth = width / dpr;
      const cssHeight = height / dpr;

      const video = videoRef.current;
      const hasValidVideo = video && videoLoaded && !videoError && video.readyState >= 2;

      // -----------------------------------------------------------------
      // 1. EFFACEMENT DU CANVAS PRINCIPAL POUR TRANSPARENCE DES TUBES & DU FOND
      // -----------------------------------------------------------------
      ctx.clearRect(0, 0, width, height);

      // Si la vidéo n'est pas encore disponible, dessine un fond d'ambiance sculptural carbone
      if (!hasValidVideo) {
        ctx.save();
        ctx.fillStyle = '#06080D';
        ctx.fillRect(0, 0, width, height);

        const strands = 24;
        const cy = height * 0.55;
        for (let i = 0; i < strands; i++) {
          const tOffset = i * 0.18;
          ctx.beginPath();
          ctx.lineWidth = (2.5 + Math.sin(fallbackTime * 0.8 + i) * 1.5) * dpr;
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 + (i / strands) * 0.2})`;
          ctx.moveTo(0, cy + Math.sin(fallbackTime + tOffset) * (height * 0.15));

          for (let x = 0; x <= width; x += 40 * dpr) {
            const wave = Math.sin(x * 0.002 + fallbackTime * 1.2 + i * 0.14) * (height * 0.12);
            ctx.lineTo(x, cy + wave + (i - strands / 2) * (14 * dpr));
          }
          ctx.stroke();
        }
        ctx.restore();
      }

      // -----------------------------------------------------------------
      // 2. PRÉPARATION DU MASQUE DE TEXTE SUR L'OFFSCREEN CANVAS
      // -----------------------------------------------------------------
      offCtx.clearRect(0, 0, width, height);

      // Scroll progress [0..1]
      const progress = currentProgressVal;

      // Typography metrics
      const isMonumental = textScaleMode === 'monumental';
      const baseFontSize = (isMonumental ? Math.max(34, cssWidth * 0.052) : Math.max(26, cssWidth * 0.038)) * dpr;
      const lineSpacing = baseFontSize * 1.32;
      const totalContentHeight = MANIFESTO_LINES.length * lineSpacing;

      // Center focal area Y position in CSS pixels
      const focalCenterY = height * 0.52;

      // The text translates vertically from bottom to top as progress moves 0 -> 1
      const scrollRangeTotal = totalContentHeight + height * 0.6;
      const scrollOffsetY = progress * scrollRangeTotal;
      const startY = focalCenterY + height * 0.35 - scrollOffsetY;

      // Draw all text lines in solid white onto the offscreen buffer
      offCtx.save();
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';

      MANIFESTO_LINES.forEach((line, idx) => {
        const lineY = startY + idx * lineSpacing;

        // Skip lines that are far off-screen
        if (lineY < -lineSpacing * 2 || lineY > height + lineSpacing * 2) return;

        // Calculate proximity to the focal center [0..1]
        const distFromCenter = Math.abs(lineY - focalCenterY);
        const focusWindow = height * 0.42;
        const normalizedDist = Math.min(1, distFromCenter / focusWindow);

        // Opacity curve: 1.0 at center, fades smoothly to 0.14 at edges
        const lineAlpha = Math.max(0.14, 1 - Math.pow(normalizedDist, 1.4));

        // Scale curve: active line is slightly larger and bolder
        const scaleFactor = (line.customScale || 1.0) * (1 + (1 - normalizedDist) * 0.08);
        const fontSize = baseFontSize * scaleFactor;

        offCtx.save();
        offCtx.font = `900 ${fontSize}px "Cabinet Grotesk", "Plus Jakarta Sans", system-ui, -apple-system, sans-serif`;

        const segments = lang === 'fr' ? line.segmentsFr : line.segmentsEn;

        // Draw solid text mask with EXACT same segmented positioning
        renderSegmentedLine(offCtx, segments, width * 0.5, lineY, {
          defaultColor: `rgba(255, 255, 255, ${lineAlpha})`,
          useColoredWords: false,
          colorTheme,
          time: fallbackTime,
        });

        offCtx.restore();
      });

      // -----------------------------------------------------------------
      // 3. APPLIQUER LA VIDÉO EN COULEUR SEULEMENT À L'INTÉRIEUR DU TEXTE
      // -----------------------------------------------------------------
      offCtx.save();
      // 'source-in' : garde uniquement les pixels de la vidéo qui chevauchent le texte blanc !
      offCtx.globalCompositeOperation = 'source-in';

      if (hasValidVideo) {
        // Draw full color video frame inside the text
        offCtx.drawImage(video, 0, 0, width, height);
      } else {
        // Procedural vivid chromatic magma / neon ribbons inside text
        const grad = offCtx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#E60039');
        grad.addColorStop(0.3, '#FF3366');
        grad.addColorStop(0.6, '#8B5CF6');
        grad.addColorStop(1, '#06B6D4');
        offCtx.fillStyle = grad;
        offCtx.fillRect(0, 0, width, height);

        // Wave textures inside letters
        for (let i = 0; i < 18; i++) {
          offCtx.beginPath();
          offCtx.lineWidth = 6 * dpr;
          offCtx.strokeStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.7)' : 'rgba(230, 0, 57, 0.9)';
          const yPos = (height / 18) * i + Math.sin(fallbackTime * 1.5 + i) * 30 * dpr;
          offCtx.moveTo(0, yPos);
          for (let x = 0; x <= width; x += 30 * dpr) {
            offCtx.lineTo(x, yPos + Math.sin(x * 0.005 + fallbackTime * 2 + i) * 20 * dpr);
          }
          offCtx.stroke();
        }
      }
      offCtx.restore();

      // -----------------------------------------------------------------
      // 4. COMPOSITION DE L'ÉTAT ORIGINAL : LE TEXTE EN MASQUE CHROMATIQUE
      // -----------------------------------------------------------------
      // Superpose le texte chromatique (l'état original demandé)
      ctx.drawImage(offCanvas, 0, 0);

      // Accentuation subtile ambiante des mots en dégradés fins
      if (coloredWordsEnabled) {
        ctx.save();
        MANIFESTO_LINES.forEach((line, idx) => {
          const lineY = startY + idx * lineSpacing;
          if (lineY < -lineSpacing * 2 || lineY > height + lineSpacing * 2) return;

          const distFromCenter = Math.abs(lineY - focalCenterY);
          const focusWindow = height * 0.42;
          const normalizedDist = Math.min(1, distFromCenter / focusWindow);
          const lineAlpha = Math.max(0.2, 1 - Math.pow(normalizedDist, 1.4));

          const scaleFactor = (line.customScale || 1.0) * (1 + (1 - normalizedDist) * 0.08);
          const fontSize = baseFontSize * scaleFactor;

          ctx.font = `900 ${fontSize}px "Cabinet Grotesk", "Plus Jakarta Sans", system-ui, -apple-system, sans-serif`;

          const segments = lang === 'fr' ? line.segmentsFr : line.segmentsEn;
          const hasColoredWords = segments.some((s) => Boolean(s.gradientType || s.color));
          if (hasColoredWords) {
            renderSegmentedLine(ctx, segments, width * 0.5, lineY, {
              defaultColor: 'transparent',
              useColoredWords: true,
              colorAlpha: Math.min(0.65, lineAlpha * 0.9),
              glow: true,
              glowAlpha: lineAlpha * 0.5,
              colorTheme,
              time: fallbackTime,
            });
          }
        });
        ctx.restore();
      }

      // -----------------------------------------------------------------
      // 5. ZONE DE LECTURE ACTIVE : MOTS EN BLANC PUR + DÉGRADÉS FINS
      // Aucune superposition de contour, alignement rigoureux au pixel près
      // -----------------------------------------------------------------
      if (readingWhiteHighlight) {
        ctx.save();

        const focusThreshold = readingFocusRange === 'focused' ? lineSpacing * 0.65 : lineSpacing * 0.92;
        const transitionSpan = readingFocusRange === 'focused' ? lineSpacing * 0.75 : lineSpacing * 1.05;

        MANIFESTO_LINES.forEach((line, idx) => {
          const lineY = startY + idx * lineSpacing;
          if (lineY < -lineSpacing * 2 || lineY > height + lineSpacing * 2) return;

          const distFromCenter = Math.abs(lineY - focalCenterY);

          // Calcul d'intensité d'illumination blanche lors de la lecture
          let whiteIntensity = 0;
          if (distFromCenter <= focusThreshold) {
            whiteIntensity = 1.0;
          } else if (distFromCenter < focusThreshold + transitionSpan) {
            const p = (distFromCenter - focusThreshold) / transitionSpan;
            // Transition cosinusoïdale douce et soyeuse
            whiteIntensity = 0.5 * (1 + Math.cos(p * Math.PI));
          }

          // Dès que la ligne est dans la zone de lecture, elle s'illumine en BLANC PUR + COULEURS DÉGRADÉES
          if (whiteIntensity > 0.01) {
            const normalizedDist = Math.min(1, distFromCenter / (height * 0.42));
            const scaleFactor = (line.customScale || 1.0) * (1 + (1 - normalizedDist) * 0.08);
            const fontSize = baseFontSize * scaleFactor;

            ctx.save();
            ctx.font = `900 ${fontSize}px "Cabinet Grotesk", "Plus Jakarta Sans", system-ui, -apple-system, sans-serif`;

            const segments = lang === 'fr' ? line.segmentsFr : line.segmentsEn;

            // Rendu avec illumination blanche et coloration dégradée sélective des mots
            renderSegmentedLine(ctx, segments, width * 0.5, lineY, {
              defaultColor: `rgba(255, 255, 255, ${whiteIntensity})`,
              useColoredWords: coloredWordsEnabled,
              colorAlpha: whiteIntensity,
              glow: true,
              glowAlpha: whiteIntensity,
              colorTheme,
              time: fallbackTime,
            });

            // Signal micro-point rouge Zenika sur les mots-clés pendant la lecture active
            if (line.isKeyWord && whiteIntensity > 0.65) {
              ctx.shadowBlur = 0;
              ctx.fillStyle = `rgba(230, 0, 57, ${whiteIntensity})`;
              const fullText = lang === 'fr' ? line.fr : line.en;
              const textWidth = ctx.measureText(fullText).width;
              ctx.beginPath();
              ctx.arc(width * 0.5 + textWidth * 0.5 + 16 * dpr, lineY - 2 * dpr, 3.5 * dpr, 0, Math.PI * 2);
              ctx.fill();
            }

            ctx.restore();
          }
        });
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateSize);
    };
  }, [
    videoLoaded, 
    videoError, 
    contrastPreset, 
    textScaleMode, 
    currentProgressVal, 
    lang, 
    readingWhiteHighlight, 
    readingFocusRange,
    coloredWordsEnabled,
    colorTheme
  ]);

  return (
    <div
      ref={containerRef}
      id="hero-intro-v4-container"
      className="relative w-full min-h-[340vh] bg-[#05060A] text-white selection:bg-[#E60039] selection:text-white"
    >
      {/* ========================================================================= */}
      {/* STICKY VIEWPORT STAGE: Verrouillé 100vh pendant tout le défilement       */}
      {/* ========================================================================= */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center select-none py-4 sm:py-6 px-4 sm:px-8">
        
        {/* COUCHE 0 : VIDÉO EN ARRIÈRE-PLAN EN NOIR & BLANC ACCÉLÉRÉ PAR GPU */}
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            crossOrigin="anonymous"
            onLoadedData={() => {
              setVideoLoaded(true);
              setVideoError(false);
            }}
            onError={() => {
              setVideoLoaded(false);
              setVideoError(true);
            }}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 transition-all duration-700"
            style={{
              filter:
                contrastPreset === 'pure'
                  ? 'grayscale(100%) brightness(48%) contrast(115%)'
                  : contrastPreset === 'density'
                  ? 'grayscale(100%) brightness(24%) contrast(145%)'
                  : 'grayscale(100%) brightness(36%) contrast(130%)',
            }}
          />
        )}

        {/* COUCHE 1 : TUBES 3D LUMINEUX TRACANT LE LOGO 'Z' EN BOUCLE (CODE UTILISATEUR) */}
        {showTubes && (
          <ZenikaLogoTubesCanvas
            opacity={tubesOpacity}
            shapeMode={tubesShapeMode}
            speed={tubesSpeed}
            palette={tubesPalette}
            className="z-10"
          />
        )}

        {/* COUCHE 2 : CANVAS TRANSPARENT (MASQUE CHROMATIQUE COULEUR + LECTURE BLANC PUR) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        />

        {/* Halo d'ambiance haut et bas */}
        <div 
          aria-hidden="true" 
          className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#05060A] via-[#05060A]/60 to-transparent pointer-events-none z-25" 
        />
        <div 
          aria-hidden="true" 
          className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#05060A] via-[#05060A]/60 to-transparent pointer-events-none z-25" 
        />

        {/* ========================================================================= */}
        {/* BARRE DE CONTRÔLE SUPÉRIEURE : SUPPRIMÉE PENDANT L'INTRO                  */}
        {/* ========================================================================= */}

        {/* ========================================================================= */}
        {/* BARRE INFÉRIEURE : JAUGE DE PROGRESSION & CALL TO ACTION DU SCROLL       */}
        {/* ========================================================================= */}
        <div className="relative z-30 w-full max-w-xl mx-auto pt-2 space-y-2 pointer-events-auto">
          {/* Ligne de progression */}
          <div className="w-full h-1.5 bg-black/60 border border-white/15 rounded-full overflow-hidden backdrop-blur-md">
            <div 
              className="h-full bg-gradient-to-r from-white via-[#E60039] to-white shadow-[0_0_12px_#E60039] transition-all duration-75"
              style={{ width: `${Math.min(100, Math.round(currentProgressVal * 100))}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-white/70 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E60039] animate-ping" />
              <span>{lang === 'fr' ? "Faites défiler pour révéler la couleur" : "Scroll to reveal chromatic mask"}</span>
            </span>
            <div className="flex items-center gap-3">
              <span className="text-white/50">{Math.round(currentProgressVal * 100)}%</span>
              {currentProgressVal > 0.88 && onDiscover && (
                <button
                  onClick={onDiscover}
                  className="px-2.5 py-0.5 rounded-full bg-[#E60039] text-white font-bold hover:bg-[#E60039]/90 transition cursor-pointer flex items-center gap-1"
                >
                  <span>{lang === 'fr' ? 'Explorer' : 'Enter'}</span>
                  <ChevronDown size={11} />
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
