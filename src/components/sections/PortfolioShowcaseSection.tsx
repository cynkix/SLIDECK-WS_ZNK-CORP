import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  ChevronLeft,
  ChevronRight,
  Quote, 
  ArrowRight, 
  CheckCircle2, 
  Maximize2, 
  TrendingUp,
  ShieldCheck,
  Flame,
  Sparkles,
  Layers,
  Cpu,
  Play,
  Pause,
  Eye,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  X,
  VolumeX,
  Volume2
} from 'lucide-react';
import { CLIENT_REFERENCES } from '../../data/zenikaData';
import { ClientReference, Language } from '../../types';

interface PortfolioShowcaseSectionProps {
  lang: Language;
  onSelectProject: (project: ClientReference) => void;
}

export const PortfolioShowcaseSection: React.FC<PortfolioShowcaseSectionProps> = ({
  lang,
  onSelectProject
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [previewMode, setPreviewMode] = useState<'live' | 'photo'>('live');
  const [isInteracting, setIsInteracting] = useState(false);
  const [liveDemoModalOpen, setLiveDemoModalOpen] = useState(false);
  const [modalViewport, setModalViewport] = useState<'desktop' | 'mobile' | 'tablet'>('desktop');
  const sectionRef = useRef<HTMLElement | null>(null);
  const total = CLIENT_REFERENCES.length;

  // Gentle, discreet parallax depth across the showcase container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.8 });
  const ambientGlowY = useTransform(smoothProgress, [0, 1], [-30, 30]);
  const watermarkShiftX = useTransform(smoothProgress, [0, 1], [20, -20]);

  const currentProject = CLIENT_REFERENCES[currentIndex];

  useEffect(() => {
    if (currentProject?.livePrototypeUrl || currentProject?.youtubeId) {
      setPreviewMode('live');
    }
  }, [currentIndex, currentProject?.livePrototypeUrl, currentProject?.youtubeId]);

  const handleUserSelect = (idx: number) => {
    setCurrentIndex(idx);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === total - 1 ? 0 : prev + 1));
  };

  const handleOpenDetails = (project: ClientReference) => {
    onSelectProject(project);
  };

  // Keyboard navigation when user is near
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  // Touch swipe support
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      data-section="works"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="pt-12 sm:pt-28 lg:pt-36 pb-[22px] border-t border-slate-200 dark:border-white/[0.08] px-0 sm:px-6 lg:px-8 max-w-[1720px] mx-auto focus:outline-none transition-colors duration-200 bg-slate-50/70 dark:bg-[#06080D]/60 relative overflow-hidden"
    >
      {/* Section Content: Editorial Header matching image.png */}
      <div className="mb-8 sm:mb-10 w-full relative z-10 px-4 sm:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black font-display text-slate-900 dark:text-white tracking-tight leading-[1.08] text-left">
              {lang === 'fr' ? (
                <>
                  Nos <span className="text-[#E60039]">clients</span> sont les leaders d’aujourd’hui et de demain.
                </>
              ) : (
                <>
                  Our <span className="text-[#E60039]">clients</span> are the leaders of today and tomorrow.
                </>
              )}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base lg:text-[17px] text-slate-600 dark:text-slate-300 font-normal leading-relaxed text-left">
              {lang === 'fr'
                ? "Nous nous adaptons à la taille et aux spécificités de votre structure, des scale-ups aux DSI de grands comptes, avec des équipes lean et des méthodologies éprouvées à l’échelle."
                : "We adapt to your scale and specifics, from hyper-growth scale-ups to enterprise CIOs, with lean strike squads and proven engineering methodologies at scale."}
            </p>
          </div>
        </div>
      </div>

      {/* Direct Quick Jump Tabs (Sans lecture automatique) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-[2px] px-4 sm:px-0">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none w-full">
          {CLIENT_REFERENCES.map((ref, idx) => {
            const shortLabel =
              ref.sector === 'tech' ? 'FinTech Scale-Up' :
              ref.sector === 'retail' ? 'Carrefour' :
              ref.sector === 'finance' ? (lang === 'fr' ? 'Banque & Assurance' : 'Banking & Insurance') :
              ref.sector === 'health' ? (lang === 'fr' ? 'Santé Digitale' : 'Digital Health') :
              ref.sector === 'industry' ? 'Auto & Edge' :
              ref.sector === 'energy' ? (lang === 'fr' ? 'Smart Grid' : 'Smart Grid') :
              ref.clientName;

            return (
              <button
                key={ref.id}
                onClick={() => handleUserSelect(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                  currentIndex === idx
                    ? 'bg-white text-black border-white shadow-md font-bold'
                    : 'bg-white/70 dark:bg-white/[0.03] border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.07]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${currentIndex === idx ? 'bg-black' : 'bg-slate-300 dark:bg-white/20'}`} />
                <span className={`text-xs sm:text-sm ${currentIndex === idx ? 'text-black font-bold' : ''}`}>0{idx + 1} · {shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The Showcase Card - Bord à bord sur mobile (rounded-none, border-y, w-full), High-Impact */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="group relative overflow-hidden rounded-none sm:rounded-3xl border-y sm:border border-slate-200 dark:border-white/12 bg-white dark:bg-[#0D1017] shadow-xl dark:shadow-2xl transition-all w-full"
      >
        {/* Subtle Ambient Parallax Glow & Watermark inside card */}
        <motion.div
          style={{ y: ambientGlowY }}
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#E60039]/[0.04] dark:bg-[#E60039]/[0.08] blur-[70px] pointer-events-none z-0"
        />
        <motion.div
          style={{ x: watermarkShiftX }}
          aria-hidden="true"
          className="absolute bottom-4 right-8 pointer-events-none opacity-[0.03] dark:opacity-[0.05] font-mono text-[7rem] lg:text-[10rem] font-black leading-none select-none z-0"
        >
          0{currentIndex + 1}
        </motion.div>


        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="p-4 sm:p-7 lg:p-8"
          >
            {/* ========================================================================= */}
            {/* MOBILE REX VIEW (md:hidden) : Version allégée (Vignette, Secteur, Titre, Challenge) */}
            {/* ========================================================================= */}
            <div className="md:hidden space-y-3.5">
              {/* 1. Vignette de réalisation avec badges */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 shadow-md border border-slate-200/80 dark:border-white/10 group">
                <img
                  src={currentProject.image}
                  alt={currentProject.clientName}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                
                {/* Badges sur la vignette */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-white font-mono text-[10px] font-bold border border-white/20">
                    0{currentIndex + 1} / 0{total}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#E60039] text-white font-mono text-[10px] font-bold shadow-xs">
                    {currentProject.impactPillar}
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                  <span className="text-white text-xs font-bold font-display drop-shadow-md truncate">
                    {currentProject.clientName}
                  </span>
                </div>
              </div>

              {/* 2. Secteur & Segment */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E60039]/10 text-[#E60039] border border-[#E60039]/25 text-[11px] font-mono font-bold uppercase tracking-wider">
                  {lang === 'fr' ? currentProject.sectorLabel : currentProject.sectorLabelEn}
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-white/50">
                  {lang === 'fr' ? currentProject.segmentLabel : currentProject.segmentLabelEn}
                </span>
              </div>

              {/* 3. Titre du REX */}
              <h3 className="text-lg font-black text-slate-900 dark:text-white font-display leading-snug">
                {lang === 'fr' ? currentProject.title : currentProject.titleEn}
              </h3>

              {/* 4. Challenge (Défi résolu) */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 space-y-1">
                <div className="text-[10px] font-mono uppercase text-slate-800 dark:text-slate-200 font-bold flex items-center gap-1.5">
                  <Sparkles size={11} className="text-[#E60039]" />
                  <span>{lang === 'fr' ? 'Challenge client :' : 'Key Challenge:'}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {lang === 'fr' ? currentProject.challenge : currentProject.challengeEn}
                </p>
              </div>

              {/* Bouton unique pour consulter le dossier REX complet - Discret et non rouge */}
              <button
                type="button"
                onClick={() => onSelectProject(currentProject)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10 text-xs font-semibold font-mono tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 shadow-xs"
              >
                <span>{lang === 'fr' ? 'Consulter le REX complet' : 'View Full Case Study'}</span>
                <ArrowRight size={13} className="text-slate-500 dark:text-slate-400" />
              </button>
            </div>

            {/* ========================================================================= */}
            {/* DESKTOP VIEW (hidden md:grid) : Version complète 2 colonnes avec simulateur */}
            {/* ========================================================================= */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              
              {/* LEFT COLUMN: Live Prototype Interactive Frame (FinTech Cube) or Authentic Production Visual */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
                {currentProject.livePrototypeUrl ? (
                  <>
                    {/* The main preview display box */}
                    <div
                      className="relative w-full h-[340px] sm:h-[400px] lg:h-full min-h-[380px] rounded-2xl overflow-hidden bg-slate-950 group shadow-md border border-slate-200/80 dark:border-white/10 flex flex-col"
                      onMouseEnter={() => setIsInteracting(true)}
                      onMouseLeave={() => setIsInteracting(false)}
                    >
                      {previewMode === 'live' ? (
                        <div className="relative w-full h-full bg-[#0A101D] overflow-hidden flex flex-col">
                          {/* Live Iframe: Cubend prototype by Zenika */}
                          <iframe
                            key={currentProject.livePrototypeUrl}
                            src={currentProject.livePrototypeUrl}
                            title={currentProject.livePrototypeTitle || "Cube Prototype by Zenika"}
                            className="w-full h-full border-0 bg-[#0A101D]"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                            loading="lazy"
                          />

                          {/* Floating overlay: SURVOLER POUR INTERAGIR */}
                          {!isInteracting && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                              <div className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/25 text-white font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
                                <span>👉</span>
                                <span>{lang === 'fr' ? 'SURVOLER POUR INTERAGIR' : 'HOVER TO INTERACT'}</span>
                              </div>
                            </div>
                          )}

                          {/* Bottom-left badge */}
                          <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
                            <div className="px-2.5 py-1 rounded-md bg-blue-600/90 backdrop-blur-md border border-blue-400/40 text-white font-mono text-[10px] font-bold shadow-md flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span>{currentProject.livePrototypeBadge || 'React Live // Cube V5 Desktop'}</span>
                            </div>
                          </div>

                          {/* Bottom-right action: Plein écran */}
                          <div className="absolute bottom-3 right-3 z-10">
                            <button
                              type="button"
                              onClick={() => setLiveDemoModalOpen(true)}
                              className="px-2.5 py-1 rounded-lg bg-black/75 hover:bg-[#E60039] backdrop-blur-md border border-white/20 text-white font-mono text-[11px] font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                            >
                              <Maximize2 size={12} />
                              <span className="hidden sm:inline">{lang === 'fr' ? 'Plein Écran' : 'Full Screen'}</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Photo & Key Impact Card when in Photo mode */
                        <>
                          {currentProject.image ? (
                            <img
                              src={currentProject.image}
                              alt={lang === 'fr' ? currentProject.title : currentProject.titleEn}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.92] group-hover:brightness-100"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-[#1A2030] dark:to-[#0D1018] flex items-center justify-center text-slate-400 dark:text-white/30 font-mono text-sm">
                              [ Production Reference ]
                            </div>
                          )}

                          {/* Cinematic gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                          {/* Top badges on visual */}
                          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                            <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 font-mono text-[11px] font-bold text-white uppercase tracking-wider shadow-md">
                              {lang === 'fr' ? currentProject.sectorLabel : currentProject.sectorLabelEn}
                            </span>
                          </div>

                          {/* Floating Key Impact Highlight Card on visual */}
                          <div className="absolute bottom-4 left-4 right-4 z-10">
                            <div className="p-3 sm:p-3.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white shadow-xl flex items-center justify-between gap-4">
                              <div className="space-y-0.5">
                                <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                                  <TrendingUp size={12} className="text-emerald-400" />
                                  <span>{lang === 'fr' ? 'Impact Majeur Validé' : 'Key Verified Impact'}</span>
                                </div>
                                <div className="text-xs sm:text-sm font-bold font-sans text-white leading-snug">
                                  {(lang === 'fr' ? currentProject.results : currentProject.resultsEn)[0]}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : currentProject.youtubeId ? (
                  <>
                    {/* Control bar above preview for YouTube Video Case */}
                    <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-100/90 dark:bg-black/50 border border-slate-200 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPreviewMode('live')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            previewMode === 'live'
                              ? 'bg-[#E60039] text-white shadow-xs'
                              : 'text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{lang === 'fr' ? 'Vidéo Produit (Sans son)' : 'Product Video (Muted)'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPreviewMode('photo')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            previewMode === 'photo'
                              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                              : 'text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <span>{lang === 'fr' ? 'Photo & REX' : 'Photo & Case'}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://www.youtube.com/watch?v=${currentProject.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg text-xs font-mono text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white flex items-center gap-1.5 transition-colors bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 cursor-pointer"
                          title={lang === 'fr' ? 'Regarder sur YouTube' : 'Watch on YouTube'}
                        >
                          <span className="text-red-500 font-bold">▶</span>
                          <span className="hidden sm:inline">YouTube</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>

                    {/* Subtitle tag */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#E60039] uppercase tracking-wider font-semibold px-1">
                      <span className="flex items-center gap-1.5">
                        <VolumeX size={12} />
                        {lang === 'fr' ? 'DÉMONSTRATION VIDÉO EN LIGNE (SANS LE SON)' : 'ONLINE DEMO VIDEO (MUTED)'}
                      </span>
                      <span className="text-slate-400 dark:text-white/40 text-[10px]">
                        {currentProject.videoTitle || 'Urba360 // Coface'}
                      </span>
                    </div>

                    {/* The main preview display box */}
                    <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden bg-black group shadow-md border border-slate-200/80 dark:border-white/10">
                      {previewMode === 'live' ? (
                        <div className="relative w-full h-full bg-black overflow-hidden flex flex-col">
                          {/* Muted YouTube embed as explicitly requested: "sans le son" */}
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${currentProject.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${currentProject.youtubeId}&controls=1&modestbranding=1&playsinline=1&rel=0`}
                            title={currentProject.videoTitle || (lang === 'fr' ? currentProject.title : currentProject.titleEn)}
                            className="w-full h-full border-0 object-cover"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />

                          {/* Top indicator: Vidéo sans le son */}
                          <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none z-10">
                            <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-emerald-400 font-mono text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                              <VolumeX size={12} />
                              <span>{lang === 'fr' ? 'Vidéo sans le son' : 'Muted video'}</span>
                            </span>
                          </div>
                        </div>
                      ) : (
                        /* Photo & Key Impact Card when in Photo mode */
                        <>
                          {currentProject.image ? (
                            <img
                              src={currentProject.image}
                              alt={lang === 'fr' ? currentProject.title : currentProject.titleEn}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.92] group-hover:brightness-100"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-[#1A2030] dark:to-[#0D1018] flex items-center justify-center text-slate-400 dark:text-white/30 font-mono text-sm">
                              [ Production Reference ]
                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                            <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 font-mono text-[11px] font-bold text-white uppercase tracking-wider shadow-md">
                              {lang === 'fr' ? currentProject.sectorLabel : currentProject.sectorLabelEn}
                            </span>
                          </div>

                          <div className="absolute bottom-4 left-4 right-4 z-10">
                            <div className="p-3 sm:p-3.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-white shadow-xl flex items-center justify-between gap-4">
                              <div className="space-y-0.5">
                                <div className="text-[10px] font-mono text-[#E60039] uppercase font-bold tracking-wider flex items-center gap-1.5">
                                  <TrendingUp size={12} />
                                  <span>{lang === 'fr' ? 'Impact Majeur Validé' : 'Key Verified Impact'}</span>
                                </div>
                                <div className="text-xs sm:text-sm font-bold font-sans text-white leading-snug">
                                  {(lang === 'fr' ? currentProject.results : currentProject.resultsEn)[0]}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  /* Standard Authentic Case Study Visual (Carrefour, Santé, Auto, etc.) */
                  <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[400px] rounded-2xl overflow-hidden bg-slate-900 group shadow-md border border-slate-200/80 dark:border-white/10">
                    {currentProject.image ? (
                      <img
                        src={currentProject.image}
                        alt={lang === 'fr' ? currentProject.title : currentProject.titleEn}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.92] group-hover:brightness-100"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-[#1A2030] dark:to-[#0D1018] flex items-center justify-center text-slate-400 dark:text-white/30 font-mono text-sm">
                        [ Production Reference ]
                      </div>
                    )}

                    {/* Cinematic gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                    {/* Top badges on visual */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                      <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 font-mono text-[11px] font-bold text-white uppercase tracking-wider shadow-md">
                        {lang === 'fr' ? currentProject.sectorLabel : currentProject.sectorLabelEn}
                      </span>
                    </div>

                    {/* Floating Key Impact Highlight Card on visual */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <div className="p-3 sm:p-3.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white shadow-xl flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                            <TrendingUp size={12} className="text-emerald-400" />
                            <span>{lang === 'fr' ? 'Impact Majeur Validé' : 'Key Verified Impact'}</span>
                          </div>
                          <div className="text-xs sm:text-sm font-bold font-sans text-white leading-snug">
                            {(lang === 'fr' ? currentProject.results : currentProject.resultsEn)[0]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: Accrocheur Title, Punchy Tagline, 3 Key Metrics & Direct CTA */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Client name & segment */}
                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-white/[0.08] pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-100 tracking-wider uppercase bg-slate-100 dark:bg-white/10 px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-white/10">
                        {currentProject.clientName}
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 text-[11px] font-mono">
                      {lang === 'fr' ? currentProject.segmentLabel : currentProject.segmentLabelEn}
                    </span>
                  </div>

                  {/* Main Accrocheur Project Title - Shortened & Crisp */}
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display tracking-tight leading-snug">
                    {lang === 'fr' ? currentProject.title : currentProject.titleEn}
                  </h3>

                  {/* Punchy Tagline / Solution summary */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-white/80 font-sans leading-relaxed border-l-2 border-[#E60039] pl-3 py-0.5">
                    {lang === 'fr' ? currentProject.solution : currentProject.solutionEn}
                  </p>

                  {/* 3 Key Impact Metric Cards (Vendeur, scannable, high-contrast) */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-mono text-slate-500 dark:text-white/50 uppercase tracking-wider font-semibold">
                      {lang === 'fr' ? 'RÉSULTATS MESURÉS EN PRODUCTION' : 'MEASURED RESULTS IN PRODUCTION'}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {(lang === 'fr' ? currentProject.results : currentProject.resultsEn).slice(0, 3).map((res, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex flex-col justify-between gap-1 shadow-xs"
                        >
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                            <span className="text-[10px] font-mono font-bold uppercase text-slate-600 dark:text-slate-300">Metric 0{idx + 1}</span>
                          </div>
                          <div className="text-[11px] font-semibold text-slate-900 dark:text-white leading-snug">
                            {res}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Authentic Verbatim Client */}
                  {currentProject.verbatim && (
                    <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-black/70 border border-slate-200 dark:border-white/10 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                        <Quote size={13} className="text-[#E60039]" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300 font-bold">
                          {lang === 'fr' ? 'TÉMOIGNAGE DU DIRECTEUR TECHNIQUE' : 'CLIENT LEADERSHIP VERBATIM'}
                        </span>
                      </div>

                      <blockquote className="text-xs italic text-slate-800 dark:text-white font-sans leading-relaxed">
                        « {lang === 'fr' ? currentProject.verbatim : (currentProject.verbatimEn || currentProject.verbatim)} »
                      </blockquote>

                      {currentProject.verbatimAuthor && (
                        <div className="text-[10px] font-mono text-slate-500 dark:text-white/50 pt-1 border-t border-slate-200/70 dark:border-white/[0.06]">
                          — {lang === 'fr' ? currentProject.verbatimAuthor : (currentProject.verbatimAuthorEn || currentProject.verbatimAuthor)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Modern Integrated Slider Control & Navigation Bar */}
        <div className="py-3 px-4 sm:py-4 sm:px-8 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/90 dark:bg-black/60 backdrop-blur-md relative flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
          {/* Integrated Slide Number & Reference Info */}
          <div className="flex items-center gap-2.5 sm:gap-3 font-mono shrink-0">
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display">
                {(currentIndex + 1).toString().padStart(2, '0')}
              </span>
              <span className="text-slate-400 dark:text-white/30 text-xs">/</span>
              <span className="text-slate-500 dark:text-white/50 text-xs font-semibold">
                {total.toString().padStart(2, '0')}
              </span>
            </div>
            <span className="h-3.5 w-px bg-slate-300 dark:bg-white/15" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white truncate max-w-[140px] xs:max-w-[200px] sm:max-w-[280px]">
              {currentProject.clientName}
            </span>
          </div>

          {/* Center: Interactive Progress Pills centré avec 2 petites flèches discrètes */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 mx-auto sm:absolute sm:left-1/2 sm:-translate-x-1/2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Projet précédent"
              className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:text-white/50 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              title={lang === 'fr' ? 'Projet précédent' : 'Previous project'}
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {CLIENT_REFERENCES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleUserSelect(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`relative overflow-hidden transition-all duration-300 rounded-full cursor-pointer h-2 sm:h-2.5 ${
                    currentIndex === idx
                      ? 'w-7 sm:w-9 bg-[#E60039]'
                      : 'w-2 sm:w-2.5 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Projet suivant"
              className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:text-white/50 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              title={lang === 'fr' ? 'Projet suivant' : 'Next project'}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Right spacer for symmetrical centering on desktop */}
          <div className="hidden sm:block w-[140px] shrink-0 pointer-events-none" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULLSCREEN / RESPONSIVE LIVE PROTOTYPE MODAL (Cube & Client Prototypes)   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {liveDemoModalOpen && (
          <motion.div
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col items-center justify-center p-3 sm:p-6 cursor-pointer"
            onClick={() => setLiveDemoModalOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl h-[92vh] rounded-3xl bg-[#0B0F19] border border-white/15 flex flex-col shadow-2xl overflow-hidden relative"
            >
              {/* Modal Header Bar */}
              <div className="px-5 py-3 bg-black/70 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#E60039]" />
                  <div>
                    <div className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span>{currentProject.livePrototypeTitle || 'CUBE V5 · Prototype by Zenika'}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        LIVE DEMO
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-white/50">
                      {currentProject.livePrototypeUrl || 'https://cube-v.vercel.app/'}
                    </div>
                  </div>
                </div>

                {/* Device Viewport Switcher */}
                <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.06] border border-white/10">
                  <button
                    type="button"
                    onClick={() => setModalViewport('desktop')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors ${
                      modalViewport === 'desktop'
                        ? 'bg-[#E60039] text-white font-bold'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Monitor size={13} />
                    <span>Desktop (1280px)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setModalViewport('tablet')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors ${
                      modalViewport === 'tablet'
                        ? 'bg-[#E60039] text-white font-bold'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Tablet size={13} />
                    <span>Tablet (768px)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setModalViewport('mobile')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors ${
                      modalViewport === 'mobile'
                        ? 'bg-teal-600 text-white font-bold shadow-xs'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Smartphone size={13} />
                    <span>Mobile WebView (Teal)</span>
                  </button>
                </div>

                {/* Actions: Open Tab & Close */}
                <div className="flex items-center gap-2">
                  <a
                    href={currentProject.livePrototypeUrl || 'https://cube-v.vercel.app/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white transition-colors cursor-pointer"
                    title={lang === 'fr' ? 'Ouvrir dans un nouvel onglet' : 'Open in new tab'}
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setLiveDemoModalOpen(false)}
                    className="p-2 rounded-xl bg-white/[0.06] hover:bg-[#E60039] text-white transition-colors cursor-pointer"
                    aria-label="Fermer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Viewport frame */}
              <div className="flex-1 w-full bg-[#070A12] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black ${
                    modalViewport === 'desktop'
                      ? 'w-full'
                      : modalViewport === 'tablet'
                      ? 'w-[768px]'
                      : 'w-[390px] border-teal-500/40 shadow-teal-500/10'
                  }`}
                >
                  <iframe
                    key={currentProject.livePrototypeUrl || 'https://cube-v.vercel.app/'}
                    src={currentProject.livePrototypeUrl || 'https://cube-v.vercel.app/'}
                    title="Live Simulation"
                    className="w-full h-full border-0 bg-[#0B0F19]"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

