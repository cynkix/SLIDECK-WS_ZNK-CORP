import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ArrowDown, 
  ChevronDown
} from 'lucide-react';
import { Language } from '../../types';
import { ZenikaMonogram, ZenikaTrailMonogram } from '../brand';

interface HeroOpeningCoverProps {
  lang: Language;
  onDiscover?: () => void;
}

export type IntroVersion = 'v1' | 'v2' | 'v3' | 'v4';

interface WordToken {
  fr: string;
  en: string;
  highlight?: 'red' | 'cyan' | 'amber' | 'violet' | 'green' | 'brand' | 'white-bold' | 'sky-blue' | 'coral-amber' | 'black';
  noWrapWithNext?: boolean;
}

interface LineToken {
  words: WordToken[];
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

const MANIFEST_STANZAS: readonly ManifestStanza[] = [
  {
    id: 'stanza-1',
    stepNum: '01',
    tagFr: 'CONTEXTE & DÉFI IT',
    tagEn: 'CONTEXT & IT CHALLENGE',
    accent: '#5090F4',
    rangeStart: 0.26,
    rangeEnd: 0.52,
    lines: [
      {
        words: [
          { fr: "À", en: "In" },
          { fr: "l'ère", en: "the" },
          { fr: "de", en: "era" },
          { fr: "l'IA", en: "of AI" },
          { fr: "et", en: "and" },
          { fr: "du", en: "the" },
          { fr: "Cloud,", en: "Cloud," },
        ],
      },
      {
        words: [
          { fr: "la", en: "tech" },
          { fr: "tech", en: "invests" },
          { fr: "investit", en: "the" },
          { fr: "le", en: "core" },
          { fr: "cœur", en: "of" },
          { fr: "des", en: "enterprise" },
          { fr: "stratégies", en: "strategies," },
          { fr: "d’entreprises,", en: "" },
        ],
      },
      {
        words: [
          { fr: "mais", en: "yet" },
          { fr: "l’IT", en: "IT" },
          { fr: "peine", en: "often" },
          { fr: "souvent", en: "struggles" },
          { fr: "à", en: "to" },
          { fr: "produire", en: "produce" },
          { fr: "de", en: "value" },
          { fr: "la", en: "at" },
          { fr: "valeur", en: "the" },
          { fr: "au", en: "expected" },
          { fr: "rythme", en: "pace." },
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
    rangeStart: 0.58,
    rangeEnd: 1.0,
    lines: [
      {
        words: [
          { fr: "Zenika", en: "Zenika", highlight: 'brand' },
          { fr: "est", en: "is", highlight: 'black' },
          { fr: "le", en: "the", highlight: 'black' },
          { fr: "partenaire", en: "partner", highlight: 'black' },
        ],
      },
      {
        words: [
          { fr: "technologique", en: "technology", highlight: 'sky-blue' },
          { fr: "de", en: "of", highlight: 'black' },
          { fr: "proximité", en: "proximity", highlight: 'coral-amber' },
        ],
      },
      {
        words: [
          { fr: "qui", en: "that", highlight: 'black' },
          { fr: "augmente", en: "amplifies", highlight: 'black' },
          { fr: "l’impact", en: "the", highlight: 'black' },
          { fr: "métier", en: "business", highlight: 'red' },
          { fr: "de", en: "impact of", highlight: 'black' },
        ],
      },
      {
        words: [
          { fr: "votre", en: "your", highlight: 'black', noWrapWithNext: true },
          { fr: "SI.", en: "IT.", highlight: 'brand' },
        ],
      },
    ],
  },
];

export const HeroOpeningCover: React.FC<HeroOpeningCoverProps> = ({ lang, onDiscover }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const navTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Layout metrics caching to eliminate layout thrashing (Rule 7.1)
  const metricsRef = useRef({ top: 0, height: 0, windowHeight: 0 });

  const updateMetrics = useCallback(() => {
    if (containerRef.current) {
      metricsRef.current = {
        top: containerRef.current.offsetTop,
        height: containerRef.current.offsetHeight,
        windowHeight: window.innerHeight,
      };
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  // Native scroll handler: read window.scrollY (no reflow) & check delta threshold (Rule 7.1 & 5.1)
  useEffect(() => {
    updateMetrics();

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const { top, height, windowHeight } = metricsRef.current;
          const totalScrollable = height - windowHeight;
          if (totalScrollable > 0) {
            const current = window.scrollY - top;
            const progress = Math.min(1, Math.max(0, current / totalScrollable));
            // Re-render optimization: threshold check prevents unnecessary render cycles
            setScrollProgress((prev) => (Math.abs(prev - progress) > 0.0015 ? progress : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateMetrics, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateMetrics);
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, [updateMetrics]);

  // Stable callbacks (Rule 5.1)
  const handleScrollToContent = useCallback(() => {
    if (onDiscover) {
      onDiscover();
    } else {
      const target = document.getElementById('value-stream') || document.getElementById('why') || document.getElementById('main-content');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else if (containerRef.current) {
        window.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
      }
    }
  }, [onDiscover]);

  const jumpToSection = useCallback((sectionId: string) => {
    if (onDiscover) onDiscover();
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    navTimeoutRef.current = setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        handleScrollToContent();
      }
    }, 100);
  }, [onDiscover, handleScrollToContent]);

  // Derived calculations during render (Rule 5.1)
  const cardsArrivalProgress = Math.max(0, Math.min(1, (scrollProgress - 0.78) / 0.08));

  // Pre-calculate flattened words per stanza for fast indexed lookups
  const stanzasWords = useMemo(
    () => MANIFEST_STANZAS.map((stanza) => stanza.lines.flatMap((l) => l.words)),
    []
  );

  const getWordStyle = (
    wordIndexInStanza: number,
    totalWordsInStanza: number,
    stanzaStart: number,
    stanzaEnd: number,
    highlight?: WordToken['highlight']
  ) => {
    const span = stanzaEnd - stanzaStart;
    const isFinalStanza = stanzaStart >= 0.45;
    const spreadFactor = isFinalStanza ? 0.50 : 0.88;
    const wordProgressThreshold = stanzaStart + (wordIndexInStanza / totalWordsInStanza) * (span * spreadFactor);
    const isRevealed = scrollProgress >= wordProgressThreshold;
    const revealFactor = Math.max(0, Math.min(1, (scrollProgress - wordProgressThreshold) / (span * (isFinalStanza ? 0.06 : 0.10))));

    let colorClasses = '';
    let extraStyles: React.CSSProperties = {};

    if (!isRevealed) {
      colorClasses = 'text-slate-400 dark:text-slate-500 select-none font-black';
      extraStyles = {
        transition: 'color 0.18s ease-out',
      };
    } else {
      extraStyles = {
        transition: 'color 0.18s ease-out',
      };

      switch (highlight) {
        case 'brand':
        case 'red':
          colorClasses = 'text-[#E60039] font-black drop-shadow-[0_4px_16px_rgba(230,0,57,0.22)]';
          break;
        case 'sky-blue':
        case 'cyan':
          colorClasses = 'text-[#38BDF8] dark:text-[#60A5FA] font-black drop-shadow-[0_4px_16px_rgba(56,189,248,0.22)]';
          break;
        case 'coral-amber':
          colorClasses = 'bg-gradient-to-r from-[#F06A58] via-[#F28B47] to-[#F5B037] bg-clip-text text-transparent font-black inline-block drop-shadow-[0_4px_16px_rgba(242,139,71,0.22)]';
          break;
        case 'amber':
          colorClasses = 'text-[#D97706] dark:text-[#FBBF24] font-black drop-shadow-[0_4px_16px_rgba(217,119,6,0.18)]';
          break;
        case 'violet':
          colorClasses = 'text-[#7C3AED] dark:text-[#C084FC] font-black drop-shadow-[0_4px_16px_rgba(124,58,237,0.18)]';
          break;
        case 'green':
          colorClasses = 'text-[#059669] dark:text-[#34D399] font-black drop-shadow-[0_4px_16px_rgba(5,150,105,0.18)]';
          break;
        case 'white-bold':
        case 'black':
        default:
          colorClasses = 'text-slate-950 dark:text-white font-black';
          break;
      }
    }

    return { colorClasses, extraStyles, isRevealed };
  };

  // Expertise card animation style based on scroll
  const getExpertiseCardStyle = (cardIdx: number): React.CSSProperties => {
    const cardStart = 0.80 + cardIdx * 0.024;
    const cardDuration = 0.045;
    const raw = (scrollProgress - cardStart) / cardDuration;
    const progress = Math.max(0, Math.min(1, raw));

    return {
      opacity: progress,
      transform: `translateY(${(1 - progress) * 18}px) scale(${0.94 + 0.06 * progress})`,
      transition: 'opacity 0.18s ease-out, transform 0.18s ease-out',
      pointerEvents: progress > 0.5 ? 'auto' : 'none',
      visibility: progress > 0.01 ? 'visible' : 'hidden',
    };
  };

  // Stanza Motion calculation: true vertical parallax translation instead of static fade
  const getStanzaMotion = (sIdx: number) => {
    let scale = 1.0;
    let opacity = 0;
    let y = 0;
    let pointerEvents: 'none' | 'auto' = 'none';

    if (sIdx === 0) {
      // Strophe 1 : Arrive successivement APRÈS la disparition complète du logo (zéro superposition)
      if (scrollProgress < 0.24) {
        return { scale: 1.0, opacity: 0, y: 140, pointerEvents: 'none', isVisible: false };
      } else if (scrollProgress < 0.31) {
        const enterRatio = (scrollProgress - 0.24) / 0.07;
        const ease = 1 - Math.pow(1 - enterRatio, 2);
        scale = 1.0;
        opacity = enterRatio;
        y = (1 - ease) * 140;
        pointerEvents = enterRatio > 0.6 ? 'auto' : 'none';
      } else if (scrollProgress <= 0.52) {
        scale = 1.0;
        opacity = 1.0;
        y = 0;
        pointerEvents = 'auto';
      } else if (scrollProgress <= 0.59) {
        const exitRatio = (scrollProgress - 0.52) / 0.07;
        scale = 1.0;
        opacity = Math.max(0, 1 - exitRatio);
        y = -exitRatio * 200;
        pointerEvents = 'none';
      } else {
        return { scale: 1.0, opacity: 0, y: -200, pointerEvents: 'none', isVisible: false };
      }
    } else {
      // Strophe 2 (Finale) : Montée immédiate en relais de la Strophe 1
      if (scrollProgress < 0.52) {
        return { scale: 1.0, opacity: 0, y: 220, pointerEvents: 'none', isVisible: false };
      } else if (scrollProgress < 0.62) {
        const enterRatio = (scrollProgress - 0.52) / 0.10;
        const ease = 1 - Math.pow(1 - enterRatio, 2);
        scale = 1.0;
        opacity = enterRatio;
        y = (1 - ease) * 220;
        pointerEvents = enterRatio > 0.6 ? 'auto' : 'none';
      } else {
        scale = 1.0;
        opacity = 1.0;
        y = 0;
        pointerEvents = 'auto';
      }
    }

    return { scale, opacity, y, pointerEvents, isVisible: opacity > 0.01 };
  };

  return (
    <div
      ref={containerRef}
      id="hero-cover"
      className="relative w-full bg-white dark:bg-[#07090E] text-slate-900 dark:text-white select-none transition-colors"
      style={{ minHeight: '480vh' }}
    >
      {/* Sticky Fullscreen Viewport on Clean White (with dark mode support) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-4 sm:px-8 py-0 bg-white dark:bg-[#07090E]">
        {/* Atmospheric ruby aura (clean background without grey rings) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden"
        >
          <div className="relative flex items-center justify-center">
            {/* Central ruby aura only */}
            <div
              className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#E60039]/12 via-pink-500/6 to-transparent blur-3xl opacity-75"
              style={{
                transform: `scale(${1 + scrollProgress * 0.35})`,
              }}
            />
          </div>
        </div>

        {/* Atmospheric subtle radial glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0)_0%,rgba(248,250,252,0.35)_75%,rgba(241,245,249,0.75)_100%)] dark:bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.75)_75%,rgba(0,0,0,0.95)_100%)]"
        />

        {/* Top Control Bar with skip / direct enter button */}
        <div className="absolute top-5 sm:top-7 right-4 sm:right-8 z-30 pointer-events-auto">
          <button
            type="button"
            onClick={handleScrollToContent}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-slate-700 dark:text-white/80 hover:text-white bg-slate-100 hover:bg-[#E60039] dark:bg-white/[0.06] dark:hover:bg-[#E60039] border border-slate-300 dark:border-white/15 hover:border-[#E60039] transition-all cursor-pointer shadow-sm"
          >
            <span>{lang === 'fr' ? 'Passer l’intro' : 'Skip intro'}</span>
            <ArrowDown size={13} />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* CENTER MANIFESTO DISPLAY                                                  */}
        {/* ========================================================================= */}
        <main className="relative z-20 w-full h-full max-w-[98vw] 2xl:max-w-[1720px] mx-auto flex flex-col items-center justify-center px-2 sm:px-6 md:px-10 pointer-events-none">
          <div className="relative w-full h-full flex items-center justify-center overflow-visible">
            {/* ===================================================================== */}
            {/* OPENING HERO LOGO: WIREFRAME Z TO SOLID LOGO CONSTRUCTION ON SCROLL   */}
            {/* ===================================================================== */}
            {scrollProgress < 0.24 && (() => {
              // 1. Trail stretch: unfolds dynamically and stays fully deployed
              const stretchFactor = Math.min(1.4, scrollProgress / 0.07);

              // 2. Materialization of the True Solid Logo from the wireframe lines:
              // At start (scroll = 0): 0.0 -> ONLY the pure wireframe contour Z is visible!
              // From 0.008 to 0.075: the true solid logo builds itself and crystallizes from the lines
              const solidLogoOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.006) / 0.065));

              // 3. Extended trail presence:
              // Traits restent visibles pendant l'intro, puis s'estompent à la sortie du logo
              const trailAppear = Math.min(1, scrollProgress / 0.02);
              const trailDisappear = scrollProgress < 0.18 ? 1 : Math.max(0, 1 - (scrollProgress - 0.18) / 0.06);
              const trailOpacity = trailAppear * trailDisappear;

              // 4. Logo reduction from large wireframe start down to lockup scale:
              // Starts BIG at scroll = 0 (1.38x) and smoothly reduces down to compact lockup scale (0.76x)
              const reductionProgress = Math.min(1, scrollProgress / 0.085);
              const reductionEase = 1 - Math.pow(1 - reductionProgress, 2.2);
              const logoScale = 1.38 - reductionEase * 0.62; // 1.38 -> 0.76

              // 5. Progressive reveal of brand name "zenika" and baseline:
              // Slides up (0.02 -> 0.075) and stays fully locked with the monogram throughout the intro!
              const textReveal = Math.max(0, Math.min(1, (scrollProgress - 0.02) / 0.055));
              const textOpacity = textReveal;
              const textY = (1 - textReveal) * 16;

              // 6. Complete exit before Stanza 1 (strictly successive, zero superposition):
              // Stays centered from 0.00 to 0.17
              // Moves upward and fades out cleanly from 0.17 to 0.24
              const exitProgress = scrollProgress < 0.17 ? 0 : Math.min(1, (scrollProgress - 0.17) / 0.07);
              const exitEase = Math.pow(exitProgress, 1.15);
              const containerY = -exitEase * 360;
              const containerOpacity = Math.max(0, 1 - exitProgress);
              const containerScale = 1 - exitProgress * 0.06;

              return (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none will-change-transform z-30"
                  style={{
                    opacity: containerOpacity,
                    transform: `translateY(${containerY}px) scale(${containerScale})`,
                    transition: 'opacity 0.06s ease-out, transform 0.06s ease-out',
                  }}
                >
                  <div className="relative flex flex-col items-center justify-center px-4">
                    {/* Radiant multi-layer ruby glow (glows brighter as solid logo builds) */}
                    <div
                      className="absolute w-72 h-72 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] rounded-full bg-gradient-to-tr from-[#E60039]/20 via-red-500/10 to-transparent blur-3xl pointer-events-none transition-opacity duration-300"
                      style={{ opacity: 0.15 + solidLogoOpacity * 0.85 }}
                    />

                    {/* Monogram with dynamic scale, wireframe start, and building solid logo */}
                    <div
                      className="relative z-10 w-52 h-52 sm:w-64 sm:h-64 md:w-76 md:h-76 lg:w-[350px] lg:h-[350px] xl:w-[390px] xl:h-[390px] 2xl:w-[410px] 2xl:h-[410px] max-w-[42vh] max-h-[42vh] flex items-center justify-center will-change-transform"
                      style={{
                        transform: `scale(${logoScale})`,
                        transition: 'transform 0.12s ease-out',
                      }}
                    >
                      <ZenikaTrailMonogram
                        size="100%"
                        stretch={stretchFactor}
                        solidLogoOpacity={solidLogoOpacity}
                        trailOpacity={trailOpacity}
                        layerCount={30}
                        trajectory="downward-to-i"
                        variant="color"
                      />
                    </div>

                    {/* Brand Name & Subtitle: Revealed cleanly underneath as logo reduces */}
                    <div
                      className="relative z-10 mt-4 sm:mt-5 md:mt-6 flex flex-col items-center text-center will-change-transform"
                      style={{
                        opacity: textOpacity,
                        transform: `translateY(${textY}px)`,
                        pointerEvents: textOpacity > 0.5 ? 'auto' : 'none',
                        transition: 'opacity 0.14s ease-out, transform 0.14s ease-out',
                      }}
                    >
                      <h1
                        style={{ fontFamily: "'Nunito', sans-serif" }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-nunito tracking-tight text-black dark:text-white lowercase drop-shadow-[0_4px_24px_rgba(230,0,57,0.18)]"
                      >
                        zenika
                      </h1>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg font-mono tracking-[0.38em] uppercase text-black dark:text-white mt-2 sm:mt-2.5 font-bold">
                        technology · consulting · craft
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ===================================================================== */}
            {/* MANIFESTO STANZAS ON SCROLL                                           */}
            {/* ===================================================================== */}
            {MANIFEST_STANZAS.map((stanza, sIdx) => {
              const motionState = getStanzaMotion(sIdx);
              if (!motionState.isVisible || motionState.opacity <= 0.01) return null;

              const allWordsInStanza = stanzasWords[sIdx];

              return (
                <div
                  key={stanza.id}
                  className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center will-change-transform"
                  style={{
                    transform: `scale(${motionState.scale}) translateY(${motionState.y}px)`,
                    opacity: motionState.opacity,
                    pointerEvents: motionState.pointerEvents,
                    transformOrigin: 'center center',
                    transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
                  }}
                >
                  <div className="relative w-full max-w-7xl 2xl:max-w-[1500px] mx-auto flex flex-col items-center justify-center text-center">
                    {/* Centered Text Block */}
                    <div className="w-full space-y-3 sm:space-y-4 md:space-y-6 flex flex-col items-center justify-center text-center will-change-transform">
                      {stanza.lines.map((line, lIdx) => {
                        let wordCounterBefore = 0;
                        for (let i = 0; i < lIdx; i++) {
                          wordCounterBefore += stanza.lines[i].words.length;
                        }

                        const isLastLine = lIdx === stanza.lines.length - 1 && sIdx === MANIFEST_STANZAS.length - 1;

                        return (
                          <div
                            key={`line-${lIdx}`}
                            className="w-full flex flex-wrap items-center justify-center text-center mx-auto gap-x-2.5 sm:gap-x-4 md:gap-x-6 gap-y-1 sm:gap-y-1.5 md:gap-y-2.5 font-black font-display tracking-tight uppercase text-xl sm:text-3xl md:text-4xl lg:text-[48px] xl:text-[56px] 2xl:text-[64px] leading-[1.14] text-black dark:text-white"
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

                              const isZenikaOrchestre =
                                w.fr === 'Zenika' || w.fr === 'orchestre' || w.en === 'Zenika' || w.en === 'orchestrates';
                              const textToRender = lang === 'fr' ? w.fr : w.en;
                              const isOrphanSensitive =
                                isLastLine && (w.fr === 'votre' || w.fr === 'SI.' || w.en === 'of your' || w.en === 'IT.');

                              if (isZenikaOrchestre) {
                                const isZenika = w.fr === 'Zenika';
                                return (
                                  <span
                                    key={`word-${globalWordIdx}`}
                                    className={`inline-block ${
                                      isRevealed
                                        ? isZenika
                                          ? 'text-[#E60039] font-black'
                                          : 'text-black dark:text-white font-black'
                                        : isZenika
                                        ? 'text-[#E60039]/50 font-black'
                                        : 'text-slate-400 dark:text-slate-500 font-black'
                                    } relative select-none font-display`}
                                  >
                                    {textToRender}
                                  </span>
                                );
                              }

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
                                  <span key={`pair-${globalWordIdx}`} className="inline-flex items-center gap-x-2.5 sm:gap-x-4 md:gap-x-5 whitespace-nowrap">
                                    <span className={`inline-block ${colorClasses}`} style={extraStyles}>
                                      {textToRender}
                                    </span>
                                    <span className={`inline-block ${nextWordStyle.colorClasses}`} style={nextWordStyle.extraStyles}>
                                      {nextTextToRender}
                                    </span>
                                  </span>
                                );
                              }

                              if (wIdx > 0 && line.words[wIdx - 1]?.noWrapWithNext) {
                                return null;
                              }

                              return (
                                <span
                                  key={`word-${globalWordIdx}`}
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

                    {/* Final Stanza: 3 Streamlined Expertise Cards */}
                    {sIdx === MANIFEST_STANZAS.length - 1 && (
                      <div
                        id="hero-expertise-cards-container"
                        className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 md:gap-5 text-center px-3 sm:px-4 mt-8 sm:mt-10 md:mt-14 will-change-transform"
                        style={{
                          paddingTop: '0px',
                          opacity: cardsArrivalProgress,
                          transform: `translateY(${(1 - cardsArrivalProgress) * 24}px)`,
                          pointerEvents: cardsArrivalProgress > 0.6 ? 'auto' : 'none',
                          visibility: cardsArrivalProgress > 0.01 ? 'visible' : 'hidden',
                          transition: 'opacity 0.18s ease-out, transform 0.18s ease-out',
                        }}
                      >
                        {/* PILIER 1: CONSEIL */}
                        <button
                          type="button"
                          id="hero-expertise-card-conseil"
                          onClick={() => jumpToSection('value-stream')}
                          style={getExpertiseCardStyle(0)}
                          className="group relative flex flex-col items-center justify-center py-4 px-6 sm:py-5 sm:px-7 rounded-2xl bg-gradient-to-r from-[#EB6550] via-[#F28B47] to-[#F5B037] text-white shadow-lg shadow-[#F28B47]/25 hover:shadow-xl hover:shadow-[#F28B47]/35 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] cursor-pointer will-change-transform text-center focus:outline-none focus:ring-2 focus:ring-[#F5B037]/50"
                        >
                          <h4 className="text-base sm:text-lg md:text-xl font-black font-display tracking-wider text-white uppercase drop-shadow-xs">
                            {lang === 'fr' ? 'Conseil' : 'Advisory'}
                          </h4>
                          <p className="text-xs sm:text-sm font-medium italic text-white/95 mt-1 tracking-normal font-sans">
                            {lang === 'fr' ? 'Stratégie & Architecture SI' : 'IT Strategy & Architecture'}
                          </p>
                        </button>

                        {/* PILIER 2: RÉALISATION */}
                        <button
                          type="button"
                          id="hero-expertise-card-realisation"
                          onClick={() => jumpToSection('solutions')}
                          style={getExpertiseCardStyle(1)}
                          className="group relative flex flex-col items-center justify-center py-4 px-6 sm:py-5 sm:px-7 rounded-2xl bg-gradient-to-r from-[#3B82F6] via-[#4895EF] to-[#60A5FA] text-white shadow-lg shadow-[#3B82F6]/25 hover:shadow-xl hover:shadow-[#3B82F6]/35 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] cursor-pointer will-change-transform text-center focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50"
                        >
                          <h4 className="text-base sm:text-lg md:text-xl font-black font-display tracking-wider text-white uppercase drop-shadow-xs">
                            {lang === 'fr' ? 'Réalisation' : 'Delivery'}
                          </h4>
                          <p className="text-xs sm:text-sm font-medium italic text-white/95 mt-1 tracking-normal font-sans">
                            {lang === 'fr' ? 'Software Craft & Cloud-Native' : 'Software Craft & Cloud-Native'}
                          </p>
                        </button>

                        {/* PILIER 3: FORMATION */}
                        <button
                          type="button"
                          id="hero-expertise-card-formation"
                          onClick={() => jumpToSection('operating-models')}
                          style={getExpertiseCardStyle(2)}
                          className="group relative flex flex-col items-center justify-center py-4 px-6 sm:py-5 sm:px-7 rounded-2xl bg-gradient-to-r from-[#4B6CB7] via-[#6C63D9] to-[#9965F4] text-white shadow-lg shadow-[#7C3AED]/25 hover:shadow-xl hover:shadow-[#7C3AED]/35 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] cursor-pointer will-change-transform text-center focus:outline-none focus:ring-2 focus:ring-[#9965F4]/50"
                        >
                          <h4 className="text-base sm:text-lg md:text-xl font-black font-display tracking-wider text-white uppercase drop-shadow-xs">
                            {lang === 'fr' ? 'Formation' : 'Training'}
                          </h4>
                          <p className="text-xs sm:text-sm font-medium italic text-white/95 mt-1 tracking-normal font-sans">
                            {lang === 'fr' ? 'Académie & Acculturation IA' : 'Academy & AI Upskilling'}
                          </p>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* Bottom Scroll Cue */}
        <div className="absolute bottom-5 sm:bottom-6 left-0 right-0 z-30 flex flex-col items-center pointer-events-auto">
          <button
            type="button"
            onClick={handleScrollToContent}
            className="group flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none"
            aria-label={lang === 'fr' ? 'Découvrir le site' : 'Explore site'}
          >
            <span className="font-mono text-xs uppercase tracking-[0.26em] text-slate-600 dark:text-white/60 group-hover:text-[#E60039] transition-colors flex items-center gap-1.5 font-semibold">
              <span>{lang === 'fr' ? 'DÉCOUVRIR LE SITE' : 'EXPLORE SITE'}</span>
              <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform text-[#E60039]" />
            </span>

            <div className="w-5 h-8 rounded-full border-2 border-slate-300 dark:border-white/20 group-hover:border-[#E60039] flex justify-center p-1 transition-colors">
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#E60039] transition-transform"
                style={{
                  transform: `translateY(${Math.min(10, scrollProgress * 14)}px)`,
                }}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroOpeningCover;
