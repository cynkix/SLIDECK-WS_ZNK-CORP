import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowDown, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronDown,
  Code2, 
  Cpu, 
  Layers, 
  Check,
  Zap,
  Volume2,
  VolumeX,
  Compass,
  GraduationCap,
  ArrowRight,
  Infinity as InfinityIcon
} from 'lucide-react';
import { Language } from '../../types';
import { ZenikaMonogram } from '../brand/ZenikaMonogram';
import { ZenikaParticlesCanvas } from './ZenikaParticlesCanvas';
import { ZenikaLogoTubesCanvas } from './ZenikaLogoTubesCanvas';
import { IntroVersion } from './HeroOpeningCover';

interface HeroIntroVideoScrollProps {
  lang: Language;
  onDiscover?: () => void;
  introVersion: IntroVersion;
  onVersionChange: (version: IntroVersion) => void;
}

// Exact Palettes for the 3D neon tubes
const PALETTES = {
  'zenika-signature': {
    name: 'Zenika Signature',
    colors: ['#E60039', '#FF2A55', '#FF6B8B', '#8B5CF6', '#5090F4', '#FFAA00', '#FFFFFF', '#FF0055'],
    lights: ['#E60039', '#FF0055', '#8B5CF6', '#5090F4'],
  },
  'cyber-cyan': {
    name: 'Bleu Zénith & Violet',
    colors: ['#5090F4', '#7928CA', '#FF0080', '#E60039', '#0070F3', '#50E3C2', '#FFAA00', '#FFFFFF'],
    lights: ['#5090F4', '#FF0080', '#7928CA', '#50E3C2'],
  },
  'rainbow-8': {
    name: 'Spectre Lumineux 8',
    colors: ['#f967fb', '#53bc28', '#6958d5', '#ffaa00', '#00e5ff', '#ff003c', '#baff00', '#ffffff'],
    lights: ['#83f36e', '#fe8a2e', '#ff008a', '#60aed5'],
  },
};

// Data structure for the text provided by the user:
// Stanza 1:
// À l'ère de l'IA et du Cloud,
// la tech investit le cœur des stratégies d’entreprises, 
// mais l’IT peine souvent à produire de la valeur au rythme attendu
//
// Stanza 2:
// Zenika est le partenaire technologique de proximité 
// qui augmente l’impact métier de votre SI
//
// Expertise pillars:
// Conseil – Réalisation – Formation

interface WordToken {
  fr: string;
  en: string;
  highlight?: 'red' | 'cyan' | 'amber' | 'violet' | 'green' | 'brand' | 'white-bold';
  noWrapWithNext?: boolean;
}

interface LineToken {
  words: WordToken[];
  noBreakLastWordsCount?: number;
}

interface ManifestStanza {
  id: string;
  stepNum: string;
  tagFr: string;
  tagEn: string;
  accent: string;
  lines: LineToken[];
  rangeStart: number;
  rangeEnd: number;
}

const MANIFEST_STANZAS: ManifestStanza[] = [
  {
    id: 'stanza-1',
    stepNum: '01',
    tagFr: 'CONTEXTE & DÉFI IT',
    tagEn: 'CONTEXT & IT CHALLENGE',
    accent: '#5090F4',
    rangeStart: 0.05,
    rangeEnd: 0.50,
    lines: [
      {
        words: [
          { fr: "À", en: "In", highlight: 'white-bold' },
          { fr: "l'ère", en: "the" },
          { fr: "de", en: "era" },
          { fr: "l'IA", en: "of AI", highlight: 'cyan' },
          { fr: "et", en: "and" },
          { fr: "du", en: "the" },
          { fr: "Cloud,", en: "Cloud,", highlight: 'cyan' },
        ],
      },
      {
        words: [
          { fr: "la", en: "tech" },
          { fr: "tech", en: "invests", highlight: 'amber' },
          { fr: "investit", en: "the" },
          { fr: "le", en: "core", highlight: 'white-bold' },
          { fr: "cœur", en: "of" },
          { fr: "des", en: "enterprise" },
          { fr: "stratégies", en: "strategies,", highlight: 'brand' },
          { fr: "d’entreprises,", en: "" },
        ],
      },
      {
        words: [
          { fr: "mais", en: "yet", highlight: 'white-bold' },
          { fr: "l’IT", en: "IT", highlight: 'cyan' },
          { fr: "peine", en: "often" },
          { fr: "souvent", en: "struggles", highlight: 'amber' },
          { fr: "à", en: "to" },
          { fr: "produire", en: "produce" },
          { fr: "de", en: "value" },
          { fr: "la", en: "at" },
          { fr: "valeur", en: "the", highlight: 'white-bold' },
          { fr: "au", en: "expected" },
          { fr: "rythme", en: "pace.", highlight: 'red' },
          { fr: "attendu", en: "" },
        ],
      },
    ],
  },
  {
    id: 'stanza-2',
    stepNum: '02',
    tagFr: "L'AUGMENTATION ZENIKA",
    tagEn: "THE ZENIKA IMPACT",
    accent: '#E60039',
    rangeStart: 0.48,
    rangeEnd: 1.0,
    lines: [
      {
        words: [
          { fr: "Zenika", en: "Zenika", highlight: 'brand' },
          { fr: "est", en: "is" },
          { fr: "le", en: "the" },
          { fr: "partenaire", en: "proximity", highlight: 'white-bold' },
          { fr: "technologique", en: "technology", highlight: 'cyan' },
          { fr: "de", en: "partner" },
          { fr: "proximité", en: "", highlight: 'amber' },
        ],
      },
      {
        words: [
          { fr: "qui", en: "that" },
          { fr: "augmente", en: "amplifies", highlight: 'white-bold' },
          { fr: "l’impact", en: "the" },
          { fr: "métier", en: "business", highlight: 'red' },
          { fr: "de", en: "impact" },
          { fr: "votre", en: "of your", noWrapWithNext: true },
          { fr: "SI.", en: "IT.", highlight: 'brand' },
        ],
      },
    ],
  },
];

export const HeroIntroVideoScroll: React.FC<HeroIntroVideoScrollProps> = ({
  lang,
  onDiscover,
  introVersion,
  onVersionChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking with smooth spring physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.0005,
  });

  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [isAutoCruising, setIsAutoCruising] = useState<boolean>(false);
  const [effectType, setEffectType] = useState<'particles' | 'tubes' | 'hybrid'>('tubes');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Track viewport size for mobile-responsive layout adjustments
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Progressive arrival factor for the 3 expertise cards: starts at 0.74 when text finishes revealing
  const cardsArrivalProgress = Math.max(0, Math.min(1, (currentProgress - 0.74) / 0.08));

  // Listen to spring changes with rAF throttling to eliminate redundant frame re-renders
  const lastProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const navTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return smoothProgress.on('change', (v) => {
      if (Math.abs(v - lastProgressRef.current) < 0.0025) return;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        lastProgressRef.current = v;
        setCurrentProgress(v);
      });
    });
  }, [smoothProgress]);

  useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, []);

  // Auto-cruise automated slow scrolling for presentation mode
  useEffect(() => {
    if (!isAutoCruising) return;
    let animationFrameId: number;
    const cruiseSpeed = 0.0007; // Smooth linear scroll increment

    const step = () => {
      if (!containerRef.current) return;
      const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (currentScroll >= totalScrollable - 10) {
        setIsAutoCruising(false);
        return;
      }

      window.scrollBy({ top: 2.2, behavior: 'auto' });
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoCruising]);

  // Jump smoothly to a specific stanza
  const jumpToStanza = (targetProgress: number) => {
    if (!containerRef.current) return;
    const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
    const targetScrollY = targetProgress * totalScrollable;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  // Determine which stanza is currently in focus
  const currentStanzaIndex = MANIFEST_STANZAS.findIndex(
    (s) => currentProgress >= s.rangeStart && currentProgress <= s.rangeEnd
  );
  const activeStanza = currentStanzaIndex !== -1 
    ? MANIFEST_STANZAS[currentStanzaIndex] 
    : currentProgress < 0.1 
      ? MANIFEST_STANZAS[0] 
      : MANIFEST_STANZAS[MANIFEST_STANZAS.length - 1];

  // Helper to compute word activation opacity and style based on progress with kinetic micro-scale
  const getWordStyle = (
    wordIndexInStanza: number,
    totalWordsInStanza: number,
    stanzaStart: number,
    stanzaEnd: number,
    highlight?: WordToken['highlight']
  ) => {
    const span = stanzaEnd - stanzaStart;
    const isFinalStanza = stanzaStart >= 0.45;
    // For final stanza, allocate the first ~50% of the scroll range to words
    // so that "qui augmente l’impact métier de votre SI." finishes revealing,
    // and the 3 expertise cards emerge smoothly right after!
    const spreadFactor = isFinalStanza ? 0.50 : 0.88;
    const wordProgressThreshold = stanzaStart + (wordIndexInStanza / totalWordsInStanza) * (span * spreadFactor);
    const isRevealed = currentProgress >= wordProgressThreshold;
    const revealFactor = Math.max(0, Math.min(1, (currentProgress - wordProgressThreshold) / (span * (isFinalStanza ? 0.06 : 0.10))));

    let colorClasses = '';
    let extraStyles: React.CSSProperties = {};

    if (!isRevealed) {
      // Unreached words remain clearly legible (clean high-contrast dimmed state, NEVER invisible)
      colorClasses = 'text-white/45 select-none font-semibold';
      extraStyles = {
        transform: 'scale(0.98)',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    } else {
      // Micro-scale reaction: subtle pop (1.10x) and settles into 1.0x
      const wordScale = 1 + (1 - revealFactor) * 0.10;
      extraStyles = {
        transform: `scale(${wordScale}) translateY(${Math.max(0, (1 - revealFactor) * 2)}px)`,
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s ease',
      };

      switch (highlight) {
        case 'brand':
          colorClasses = 'text-[#E60039] font-black drop-shadow-[0_0_24px_rgba(230,0,57,0.85)]';
          break;
        case 'cyan':
          colorClasses = 'text-[#5090F4] font-black drop-shadow-[0_0_20px_rgba(80,144,244,0.75)]';
          break;
        case 'amber':
          colorClasses = 'text-[#F59E0B] font-black drop-shadow-[0_0_20px_rgba(245,158,11,0.75)]';
          break;
        case 'red':
          colorClasses = 'text-[#FF2A55] font-black drop-shadow-[0_0_20px_rgba(255,42,85,0.75)]';
          break;
        case 'violet':
          colorClasses = 'text-[#A855F7] font-black drop-shadow-[0_0_20px_rgba(168,85,247,0.75)]';
          break;
        case 'green':
          colorClasses = 'text-[#10B981] font-black drop-shadow-[0_0_20px_rgba(16,185,129,0.75)]';
          break;
        case 'white-bold':
          colorClasses = 'text-white font-extrabold drop-shadow-[0_0_16px_rgba(255,255,255,0.6)]';
          break;
        default:
          colorClasses = 'text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]';
          break;
      }
    }

    return { colorClasses, extraStyles, isRevealed };
  };

  // Scroll emergence calculation for the 3 expertise cards: appearing right after "qui augmente l’impact métier de votre SI"
  const getExpertiseCardStyle = (cardIdx: number): React.CSSProperties => {
    // Reveal starts sequentially right after stanza 2 words complete (~0.76)
    const cardStart = 0.76 + cardIdx * 0.022;
    const cardDuration = 0.042;
    const raw = (currentProgress - cardStart) / cardDuration;
    const progress = Math.max(0, Math.min(1, raw));

    return {
      opacity: progress,
      transform: `translateY(${(1 - progress) * 20}px) scale(${0.94 + 0.06 * progress})`,
      transition: 'opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1), transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
      pointerEvents: progress > 0.5 ? 'auto' : 'none',
      visibility: progress > 0.01 ? 'visible' : 'hidden',
    };
  };

  // Motion calculation for each stanza:
  // Starts monumental / large, and REDUCES as user scrolls!
  // CRITICAL: Text must NEVER blur out prematurely. The final stanza (Stanza 3) NEVER blurs or fades out!
  const getStanzaMotion = (sIdx: number) => {
    const isFinalStanza = sIdx === MANIFEST_STANZAS.length - 1;
    const stanza = MANIFEST_STANZAS[sIdx];
    const span = stanza.rangeEnd - stanza.rangeStart;
    const t = (currentProgress - stanza.rangeStart) / span;

    let scale = 1.0;
    let opacity = 0;
    let y = 0;
    let blur = 0;
    let pointerEvents: 'none' | 'auto' = 'none';

    // Stanza 1 stays cleanly hidden while progress is near 0 so the opening logo is in full focus.
    // Stanza 1 begins smoothly fading in at progress > 0.035 as the logo recedes.
    if (sIdx === 0 && currentProgress < 0.035) {
      return { scale: 1.25, opacity: 0, y: 30, blur: 0, pointerEvents: 'none', isVisible: false, t };
    }

    if (isFinalStanza) {
      // =========================================================================
      // FINAL CLIMAX STANZA: CRUCIAL USER DIRECTIVE
      // The conclusion must NOT blur out or disappear!
      // =========================================================================
      if (t < -0.22) {
        scale = 1.30;
        opacity = 0;
        y = 35;
        pointerEvents = 'none';
      } else if (t < 0) {
        const enterRatio = (t + 0.22) / 0.22;
        scale = 1.30 - enterRatio * 0.05;
        opacity = enterRatio * 0.55;
        y = (1 - enterRatio) * 15;
        blur = 0;
        pointerEvents = 'none';
      } else if (t <= 0.35) {
        // Active scroll-down scale reduction: 1.25x -> 1.00x
        const downProgress = t / 0.35;
        const easeOut = 1 - Math.pow(1 - downProgress, 2.2);
        scale = 1.25 - 0.25 * easeOut;
        opacity = 0.60 + 0.40 * Math.min(1, t / 0.15);
        y = (1 - easeOut) * 8;
        blur = 0;
        pointerEvents = 'auto';
      } else {
        // REMAINS 100% SHARP, RAZOR CLEAR, SCALE 1.00, OPACITY 1.00, BLUR 0 ALL THE WAY TO THE END!
        scale = 1.00;
        opacity = 1.00;
        y = 0;
        blur = 0;
        pointerEvents = 'auto';
      }
    } else {
      // =========================================================================
      // STANZA 1: Crisp narrative progression without early blur
      // =========================================================================
      if (t < -0.25) {
        scale = 1.35;
        opacity = 0;
        y = 35;
        pointerEvents = 'none';
      } else if (t < 0) {
        const enterRatio = (t + 0.25) / 0.25;
        scale = 1.35 - enterRatio * 0.05;
        opacity = enterRatio * 0.50;
        y = (1 - enterRatio) * 18;
        blur = 0;
        pointerEvents = 'none';
      } else if (t <= 0.42) {
        // Active scroll-down scale reduction: 1.30x -> 1.00x
        const downProgress = t / 0.42;
        const easeOut = 1 - Math.pow(1 - downProgress, 2.2);
        scale = 1.30 - 0.30 * easeOut;
        opacity = 0.50 + 0.50 * Math.min(1, t / 0.16);
        y = (1 - easeOut) * 10;
        blur = 0;
        pointerEvents = 'auto';
      } else if (t <= 0.90) {
        // Calibrated reading focus: 1.00x, crisp & stable
        scale = 1.00;
        opacity = 1.00;
        y = 0;
        blur = 0;
        pointerEvents = 'auto';
      } else if (t <= 1.22) {
        // Smooth transition to the next stanza: pure opacity fade without muddy blur
        const exitRatio = Math.min(1, (t - 0.90) / 0.32);
        scale = 1.00 - exitRatio * 0.12;
        opacity = Math.max(0, 1 - exitRatio * 1.15);
        y = -exitRatio * 32;
        blur = 0;
        pointerEvents = 'none';
      } else {
        scale = 0.88;
        opacity = 0;
        y = -50;
        blur = 0;
        pointerEvents = 'none';
      }
    }

    return { scale, opacity, y, blur, pointerEvents, isVisible: opacity > 0.01, t };
  };

  return (
    <div 
      ref={containerRef} 
      id="hero-intro-v3-scroll"
      className="relative w-full bg-[#05070B] text-white select-none"
      style={{ minHeight: '460vh' }}
    >
      {/* ========================================================================= */}
      {/* STICKY FULLSCREEN VIEWPORT                                                */}
      {/* ========================================================================= */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-4 sm:px-8 py-0">
        
        {/* BACKGROUND EFFECT 1: Three.js Interactive GPGPU Particles (Default) */}
        {(effectType === 'particles' || effectType === 'hybrid') && (
          <ZenikaParticlesCanvas
            palette="zenika"
            opacity={0.92}
            scrollProgress={currentProgress}
            className="z-0"
          />
        )}

        {/* BACKGROUND EFFECT 2: Three.js 3D Volumetric Tubes 'Z' Trajectory */}
        {(effectType === 'tubes' || effectType === 'hybrid') && (
          <div className="absolute inset-0 pointer-events-none z-0">
            <ZenikaLogoTubesCanvas
              opacity={0.88}
              shapeMode="z-loop"
              palette="zenika-neon"
              scaleFactor={0.42}
            />
          </div>
        )}

        {/* BACKGROUND 3: Monogram Zenika "Z" & Concentric Rings (From Screenshot) */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden"
        >
          {/* Concentric resonance rings radiating from the Z center */}
          <div className="relative flex items-center justify-center">
            {[320, 520, 720, 940, 1180].map((dim, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-red-500/10 dark:border-white/[0.04]"
                style={{
                  width: `${dim}px`,
                  height: `${dim}px`,
                  transform: `scale(${1 + currentProgress * 0.15 + i * 0.05})`,
                  opacity: Math.max(0.12, 0.45 - i * 0.07 - currentProgress * 0.25),
                  transition: 'transform 0.1s ease-out',
                }}
              />
            ))}

            {/* Central glowing Zenika red emblem backing */}
            <div 
              className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-[#E60039]/25 via-pink-600/15 to-transparent blur-3xl opacity-70"
              style={{
                transform: `scale(${1 + currentProgress * 0.4})`,
              }}
            />
          </div>
        </div>

        {/* Atmospheric radial vignette: keeps particles vivid in center while guaranteeing text contrast */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(5, 7, 11, 0.2) 0%, rgba(5, 7, 11, 0.55) 75%, rgba(5, 7, 11, 0.85) 100%)',
          }}
        />

        {/* ========================================================================= */}
        {/* TOP BAR: REMOVED DURING INTRO PER USER REQUEST                            */}
        {/* ========================================================================= */}

        {/* ========================================================================= */}
        {/* CENTER MANIFESTO DISPLAY: "plus gros les mots & réduire en scrollant"       */}
        {/* ========================================================================= */}
        <main className="relative z-20 w-full h-full max-w-[98vw] 2xl:max-w-[1720px] mx-auto flex flex-col items-center justify-center px-2 sm:px-6 md:px-10 pointer-events-none">
          
          {/* Central Staging Area: Opening Logo alone at 0%, then text arrives upon scroll */}
          <div className="relative w-full h-full flex items-center justify-center overflow-visible">
            
            {/* ========================================================================= */}
            {/* OPENING HERO LOGO: "logo plus gros, utilise le svg pour le logo"            */}
            {/* ========================================================================= */}
            {currentProgress < 0.12 && (
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none will-change-transform z-30"
                style={{
                  opacity: Math.max(0, 1 - (currentProgress / 0.07)),
                  transform: `scale(${1 + (currentProgress / 0.07) * 0.18}) translateY(${-(currentProgress / 0.07) * 20}px)`,
                  filter: currentProgress > 0.04 ? `blur(${(currentProgress - 0.04) * 30}px)` : 'none',
                  transition: 'opacity 0.12s ease-out, transform 0.12s ease-out',
                }}
              >
                <div className="relative flex flex-col items-center justify-center">
                  {/* Expanded Radiant multi-layer glow matching the large scale */}
                  <div className="absolute w-80 h-80 sm:w-[500px] sm:h-[500px] md:w-[620px] md:h-[620px] rounded-full bg-radial from-[#E60039]/45 via-red-600/20 to-transparent blur-3xl animate-pulse pointer-events-none" />
                  
                  {/* Official Zenika Monogram SVG Emblem (significantly enlarged) */}
                  <div className="relative z-10 w-52 h-52 sm:w-68 sm:h-68 md:w-80 md:h-80 lg:w-96 lg:h-96 filter hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                    <ZenikaMonogram size="100%" glow variant="color" />
                  </div>

                  {/* Brand Name (Much bigger) & Subtitle */}
                  <div className="relative z-10 mt-6 sm:mt-8 flex flex-col items-center text-center">
                    <h1
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-nunito tracking-tight text-white lowercase drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)]"
                    >
                      zenika
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base font-mono tracking-[0.38em] uppercase text-white/80 mt-2.5 sm:mt-3 font-semibold drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                      technology · consulting · craft
                    </p>
                  </div>
                </div>
              </div>
            )}

            {MANIFEST_STANZAS.map((stanza, sIdx) => {
              const motionState = getStanzaMotion(sIdx);
              if (!motionState.isVisible || motionState.opacity <= 0.01) return null;

              const allWordsInStanza = stanza.lines.flatMap(l => l.words);

              return (
                <div
                  key={stanza.id}
                  className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center transition-opacity duration-150 will-change-transform"
                  style={{
                    transform: `scale(${motionState.scale}) translateY(${motionState.y}px)`,
                    opacity: motionState.opacity,
                    filter: motionState.blur > 0.1 ? `blur(${motionState.blur}px)` : 'none',
                    pointerEvents: motionState.pointerEvents,
                    transformOrigin: 'center center',
                  }}
                >
                  <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
                    {/* Centered Text Block: Remains strictly centered in the viewport until the 3 blocks arrive */}
                    <div
                      className="w-full space-y-3 sm:space-y-4 md:space-y-6 flex flex-col items-center justify-center text-center will-change-transform"
                      style={
                        sIdx === MANIFEST_STANZAS.length - 1
                          ? {
                              transform: `translateY(-${(isMobile ? 130 : 48) * cardsArrivalProgress}px)`,
                              transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                            }
                          : undefined
                      }
                    >
                      {stanza.lines.map((line, lIdx) => {
                        let wordCounterBefore = 0;
                        for (let i = 0; i < lIdx; i++) {
                          wordCounterBefore += stanza.lines[i].words.length;
                        }

                        const isLastLine = lIdx === stanza.lines.length - 1 && sIdx === MANIFEST_STANZAS.length - 1;

                        return (
                          <div
                            key={lIdx}
                            className="w-full flex flex-wrap items-center justify-center text-center mx-auto gap-x-2.5 sm:gap-x-4 md:gap-x-5 gap-y-1 sm:gap-y-1.5 md:gap-y-2.5 font-black font-display tracking-tight uppercase text-2xl sm:text-3xl md:text-4xl lg:text-[52px] xl:text-[62px] 2xl:text-[72px] leading-[1.12] drop-shadow-[0_12px_36px_rgba(0,0,0,0.85)]"
                          >
                            {line.words.map((w, wIdx) => {
                              const globalWordIdx = wordCounterBefore + wIdx;
                              const { colorClasses, extraStyles, isRevealed } = getWordStyle(
                                globalWordIdx,
                                allWordsInStanza.length,
                                stanza.rangeStart,
                                stanza.rangeEnd,
                                w.highlight
                              );

                              const isZenikaOrchestre = (w.fr === 'Zenika' || w.fr === 'orchestre' || w.en === 'Zenika' || w.en === 'orchestrates');
                              const textToRender = lang === 'fr' ? w.fr : w.en;

                              // Prevent orphan "SI." on its own line by keeping it with the preceding word or grouped
                              const isOrphanSensitive = isLastLine && (w.fr === 'votre' || w.fr === 'SI.' || w.en === 'of your' || w.en === 'IT.');

                              // If this is "Zenika" or "orchestre", animate the individual letters with an orchestrator wave!
                              if (isZenikaOrchestre) {
                                const letters = textToRender.split('');
                                const isZenika = w.fr === 'Zenika';
                                const baseDelayOffset = isZenika ? 0 : 0.28;

                                return (
                                  <span
                                    key={wIdx}
                                    className={`inline-flex items-center ${
                                      isRevealed
                                        ? (isZenika ? 'text-[#E60039]' : 'text-white')
                                        : (isZenika ? 'text-[#E60039]/70 font-bold' : 'text-white/45 font-semibold')
                                    } relative drop-shadow-none filter-none select-none ${isZenika ? 'font-nunito' : ''}`}
                                    style={{
                                      transform: 'none',
                                      filter: 'none',
                                      textShadow: 'none',
                                      ...(isZenika ? { fontFamily: "'Nunito', sans-serif" } : {})
                                    }}
                                  >
                                    {letters.map((char, charIdx) => {
                                      const charDelay = baseDelayOffset + charIdx * 0.045;
                                      return (
                                        <motion.span
                                          key={charIdx}
                                          className="inline-block will-change-transform"
                                          style={{
                                            filter: 'none',
                                            textShadow: 'none',
                                          }}
                                          animate={
                                            isRevealed
                                              ? {
                                                  y: [0, -2, 0],
                                                  scale: 1,
                                                }
                                              : { y: 0, scale: 1 }
                                          }
                                          transition={
                                            isRevealed
                                              ? {
                                                  duration: 2.8,
                                                  repeat: Infinity,
                                                  repeatType: 'loop',
                                                  ease: 'easeInOut',
                                                  delay: charDelay,
                                                }
                                              : { duration: 0.3, ease: 'easeInOut' }
                                          }
                                        >
                                          {char}
                                        </motion.span>
                                      );
                                    })}
                                  </span>
                                );
                              }

                              // If this word is marked to stay with the next word (e.g. 'votre SI.'), pair them inside a nowrap container
                              if (w.noWrapWithNext && wIdx + 1 < line.words.length) {
                                const nextW = line.words[wIdx + 1];
                                const nextGlobalWordIdx = wordCounterBefore + wIdx + 1;
                                const nextWordStyle = getWordStyle(
                                  nextGlobalWordIdx,
                                  allWordsInStanza.length,
                                  stanza.rangeStart,
                                  stanza.rangeEnd,
                                  nextW.highlight
                                );
                                const nextTextToRender = lang === 'fr' ? nextW.fr : nextW.en;

                                return (
                                  <span key={wIdx} className="inline-flex items-center gap-x-2.5 sm:gap-x-4 md:gap-x-5 whitespace-nowrap">
                                    <span className={`inline-block ${colorClasses}`} style={extraStyles}>
                                      {textToRender}
                                    </span>
                                    <span className={`inline-block ${nextWordStyle.colorClasses}`} style={nextWordStyle.extraStyles}>
                                      {nextTextToRender}
                                    </span>
                                  </span>
                                );
                              }

                              // If this word was consumed by the previous noWrapWithNext, skip rendering it individually
                              if (wIdx > 0 && line.words[wIdx - 1]?.noWrapWithNext) {
                                return null;
                              }

                              return (
                                <span
                                  key={wIdx}
                                  className={`inline-block ${colorClasses} ${isOrphanSensitive ? 'whitespace-nowrap' : ''}`}
                                  style={extraStyles}
                                >
                                  {textToRender}
                                </span>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>

                    {/* Final Stanza: 3 Streamlined Expertise Cards (emerging upon scroll right after "qui augmente l’impact métier de votre SI") */}
                    {/* Positioned absolutely right below the text: ZERO vertical space in flow before arrival */}
                    {sIdx === MANIFEST_STANZAS.length - 1 && (
                      <div
                        id="hero-expertise-cards-container"
                        className="absolute top-full left-0 right-0 w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-3.5 md:gap-4 lg:gap-5 text-center px-3 sm:px-4 pt-3.5 sm:pt-6 will-change-transform"
                        style={{
                          opacity: cardsArrivalProgress,
                          transform: `translateY(-${(isMobile ? 130 : 48) * cardsArrivalProgress - (1 - cardsArrivalProgress) * 22}px)`,
                          pointerEvents: cardsArrivalProgress > 0.6 ? 'auto' : 'none',
                          visibility: cardsArrivalProgress > 0.01 ? 'visible' : 'hidden',
                          transition: 'opacity 0.18s ease-out, transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        {/* PILIER 1: CONSEIL */}
                        <button
                          type="button"
                          id="hero-expertise-card-conseil"
                          onClick={() => {
                            if (onDiscover) onDiscover();
                            if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
                            navTimeoutRef.current = setTimeout(() => {
                              const el = document.getElementById('value-stream');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }, 120);
                          }}
                          style={getExpertiseCardStyle(0)}
                          className="group relative flex flex-row md:flex-col items-center md:justify-center p-3.5 sm:p-4 md:p-4.5 rounded-2xl bg-black/80 hover:bg-black/95 border border-[#5090F4]/30 hover:border-[#5090F4]/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] hover:shadow-[0_0_20px_rgba(80,144,244,0.18)] cursor-pointer will-change-transform gap-3.5 sm:gap-4 md:gap-0 text-left md:text-center focus:outline-none focus:ring-2 focus:ring-[#5090F4]/50"
                        >
                          <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-[#5090F4]/10 border border-[#5090F4]/30 flex items-center justify-center text-[#5090F4] group-hover:scale-105 transition-transform md:mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" className="w-6 h-6 sm:w-6.5 sm:h-6.5" aria-hidden="true">
                              <circle cx="50" cy="50" r="43.5" stroke="#5090F4" strokeWidth="5.5" strokeOpacity="0.8" />
                              <path d="M 50 18 L 62 48 L 50 43 L 38 48 Z" fill="#5090F4" stroke="#5090F4" strokeWidth="2" strokeLinejoin="round" />
                              <path d="M 50 82 L 62 52 L 50 47 L 38 52 Z" fill="none" stroke="#5090F4" strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round" />
                              <circle cx="50" cy="50" r="4" fill="#5090F4" />
                              <line x1="50" y1="8" x2="50" y2="13" stroke="#5090F4" strokeWidth="3.5" strokeLinecap="round" />
                              <line x1="50" y1="87" x2="50" y2="92" stroke="#5090F4" strokeWidth="3.5" strokeLinecap="round" />
                              <line x1="8" y1="50" x2="13" y2="50" stroke="#5090F4" strokeWidth="3.5" strokeLinecap="round" />
                              <line x1="87" y1="50" x2="92" y2="50" stroke="#5090F4" strokeWidth="3.5" strokeLinecap="round" />
                            </svg>
                          </div>
                          <div className="flex flex-col text-left md:text-center min-w-0 flex-1">
                            <h4 className="text-base sm:text-lg md:text-xl font-bold font-display text-white tracking-wide uppercase truncate">
                              {lang === 'fr' ? 'Conseil' : 'Advisory'}
                            </h4>
                            <p className="text-xs font-mono text-[#5090F4]/80 mt-0.5 uppercase tracking-wider font-semibold truncate">
                              {lang === 'fr' ? 'Stratégie & Architecture SI' : 'IT Strategy & Architecture'}
                            </p>
                          </div>
                          <div className="md:hidden shrink-0 text-white/35 group-hover:text-white transition-colors pl-1">
                            <ArrowRight size={17} />
                          </div>
                        </button>

                        {/* PILIER 2: RÉALISATION */}
                        <button
                          type="button"
                          id="hero-expertise-card-realisation"
                          onClick={() => {
                            if (onDiscover) onDiscover();
                            if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
                            navTimeoutRef.current = setTimeout(() => {
                              const el = document.getElementById('solutions');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }, 120);
                          }}
                          style={getExpertiseCardStyle(1)}
                          className="group relative flex flex-row md:flex-col items-center md:justify-center p-3.5 sm:p-4 md:p-4.5 rounded-2xl bg-black/80 hover:bg-black/95 border border-[#E60039]/35 hover:border-[#E60039]/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] hover:shadow-[0_0_22px_rgba(230,0,57,0.22)] cursor-pointer will-change-transform gap-3.5 sm:gap-4 md:gap-0 text-left md:text-center focus:outline-none focus:ring-2 focus:ring-[#E60039]/50"
                        >
                          <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-[#E60039]/10 border border-[#E60039]/30 flex items-center justify-center text-[#FF2A55] group-hover:scale-105 transition-transform md:mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" className="w-6 h-6 sm:w-6.5 sm:h-6.5" aria-hidden="true">
                              <circle cx="50" cy="50" r="43.5" stroke="#E60039" strokeWidth="5.5" strokeOpacity="0.85" />
                              <line x1="50" y1="16" x2="50" y2="84" stroke="#E60039" strokeWidth="5.5" strokeLinecap="round" />
                              <path d="M 33.5 35.5 L 16.5 50 L 33.5 64.5" stroke="#E60039" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M 66.5 35.5 L 83.5 50 L 66.5 64.5" stroke="#E60039" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <div className="flex flex-col text-left md:text-center min-w-0 flex-1">
                            <h4 className="text-base sm:text-lg md:text-xl font-bold font-display text-white tracking-wide uppercase truncate">
                              {lang === 'fr' ? 'Réalisation' : 'Delivery'}
                            </h4>
                            <p className="text-xs font-mono text-red-200/75 mt-0.5 uppercase tracking-wider font-semibold truncate">
                              {lang === 'fr' ? 'Software Craft & Cloud-Native' : 'Software Craft & Cloud-Native'}
                            </p>
                          </div>
                          <div className="md:hidden shrink-0 text-white/35 group-hover:text-white transition-colors pl-1">
                            <ArrowRight size={17} />
                          </div>
                        </button>

                        {/* PILIER 3: FORMATION */}
                        <button
                          type="button"
                          id="hero-expertise-card-formation"
                          onClick={() => {
                            if (onDiscover) onDiscover();
                            if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
                            navTimeoutRef.current = setTimeout(() => {
                              const el = document.getElementById('operating-models');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }, 120);
                          }}
                          style={getExpertiseCardStyle(2)}
                          className="group relative flex flex-row md:flex-col items-center md:justify-center p-3.5 sm:p-4 md:p-4.5 rounded-2xl bg-black/80 hover:bg-black/95 border border-amber-500/35 hover:border-amber-400/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] hover:shadow-[0_0_20px_rgba(245,158,11,0.18)] cursor-pointer will-change-transform gap-3.5 sm:gap-4 md:gap-0 text-left md:text-center focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        >
                          <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-[#F59E0B] group-hover:scale-105 transition-transform md:mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" className="w-6 h-6 sm:w-6.5 sm:h-6.5" aria-hidden="true">
                              <circle cx="50" cy="50" r="43.5" stroke="#F59E0B" strokeWidth="5.5" strokeOpacity="0.8" />
                              <path d="M 50 24 L 81 38.5 L 50 53 L 19 38.5 Z" stroke="#F59E0B" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M 32 48 V 61.5 C 32 69.5 68 69.5 68 61.5 V 48" stroke="#F59E0B" strokeWidth="5.2" strokeLinecap="round" />
                              <path d="M 80 40 V 59" stroke="#F59E0B" strokeWidth="4.2" strokeLinecap="round" />
                              <circle cx="80" cy="63.5" r="3" fill="#F59E0B" />
                            </svg>
                          </div>
                          <div className="flex flex-col text-left md:text-center min-w-0 flex-1">
                            <h4 className="text-base sm:text-lg md:text-xl font-bold font-display text-white tracking-wide uppercase truncate">
                              {lang === 'fr' ? 'Formation' : 'Training'}
                            </h4>
                            <p className="text-xs font-mono text-amber-200/75 mt-0.5 uppercase tracking-wider font-semibold truncate">
                              {lang === 'fr' ? 'Académie & Acculturation IA' : 'Academy & AI Upskilling'}
                            </p>
                          </div>
                          <div className="md:hidden shrink-0 text-white/35 group-hover:text-white transition-colors pl-1">
                            <ArrowRight size={17} />
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

          </div>
        </main>

        {/* ========================================================================= */}
        {/* BOTTOM PROGRESS BAR & SCROLL RUNWAY INDICATOR (REMOVED PER REQUEST)       */}
        {/* ========================================================================= */}
      </div>
    </div>
  );
};
