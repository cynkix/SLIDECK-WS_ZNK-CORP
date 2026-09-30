import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { Language } from '../../types';

interface ValueBridgeParallaxV2Props {
  lang: Language;
}

export const ValueBridgeParallaxV2: React.FC<ValueBridgeParallaxV2Props> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fonction pour passer directement à la section suivante
  const handleSkipSection = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const targetY = window.scrollY + rect.bottom;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  // Continuous vertical scroll tracking across runway for desktop & mobile
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Soft physics spring for silky-smooth horizontal parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 32,
    mass: 0.55,
    restDelta: 0.001,
  });

  // 4 Slides (Slide 0, 1, 2, 3)
  // Slide 0: 0vw (centré au début 0.00 -> 0.06)
  // Slide 1: -100vw (centré de 0.28 -> 0.38)
  // Slide 2: -200vw (centré de 0.58 -> 0.68)
  // Slide 3: -300vw (arrive au CENTRE à 0.82 et RESTE FIXÉ AU CENTRE / MILIEU jusqu'à 1.00 !)
  const horizontalX = useTransform(
    smoothProgress,
    [0, 0.06, 0.28, 0.38, 0.58, 0.68, 0.82, 1.00],
    ['0vw', '0vw', '-100vw', '-100vw', '-200vw', '-200vw', '-300vw', '-300vw']
  );

  // =========================================================================
  // TOUTES LES LETTRES EN ROUGE SONT ALLUMÉES QUAND LES SLIDES ARRIVENT AU MILIEU
  // =========================================================================
  // Slide 0 : Déjà au centre dès le début -> Rouge 100% allumé
  const slide0Red = useTransform(smoothProgress, [0, 0.18], ['#E60039', '#E60039']);

  // Slide 1 : Arrive au milieu / centre vers 0.28-0.38
  const slide1Red = useTransform(
    smoothProgress,
    [0.12, 0.26, 0.42, 0.52],
    ['#94A3B8', '#E60039', '#E60039', '#94A3B8']
  );

  // Slide 2 : Arrive au milieu / centre vers 0.58-0.68
  const slide2Red = useTransform(
    smoothProgress,
    [0.45, 0.56, 0.72, 0.80],
    ['#94A3B8', '#E60039', '#E60039', '#94A3B8']
  );

  // Slide 3 : Arrive au milieu / centre dès 0.82 et reste 100% allumé en rouge jusqu'à la fin
  const slide3Red = useTransform(
    smoothProgress,
    [0.72, 0.82, 1.00],
    ['#94A3B8', '#E60039', '#E60039']
  );

  // Effet de ZOOM final sur la dernière section Engagement Communautés
  const slide3Zoom = useTransform(
    smoothProgress,
    [0.76, 0.84, 0.98],
    [0.96, 1.00, 1.18]
  );

  return (
    <div
      ref={containerRef}
      id="mission-critical-v2"
      className="relative w-full bg-white dark:bg-[#07090E] transition-colors h-[380vh] sm:h-[400vh] lg:h-[420vh]"
    >
      {/* ========================================================================= */}
      {/* SECTION FIXE ÉPINGLÉE AU SCROLL (MOBILE ET DESKTOP)                       */}
      {/* Le scroll vertical entraîne le défilement horizontal fluide des slides    */}
      {/* ========================================================================= */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden z-20">
        
        {/* Badge discret haut gauche */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-30 flex items-center gap-2 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-slate-100/90 dark:bg-white/10 backdrop-blur-md text-[10px] sm:text-xs font-mono font-bold text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 uppercase">
            {lang === 'fr' ? '02 / NOTRE ENGAGEMENT' : '02 / OUR COMMITMENT'}
          </span>
        </div>

        {/* Bouton discret "Passer la section" (texte gris sans fond noir) */}
        <button
          onClick={handleSkipSection}
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-30 inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300 text-xs font-mono font-medium transition-colors cursor-pointer group"
          aria-label={lang === 'fr' ? 'Passer la section suivante' : 'Skip to next section'}
        >
          <span className="underline decoration-slate-300/60 dark:decoration-slate-600/60 underline-offset-4 group-hover:decoration-slate-600 dark:group-hover:decoration-slate-400 transition-colors">
            {lang === 'fr' ? 'Passer la section' : 'Skip section'}
          </span>
          <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
        </button>

        {/* Barre de progression fine au bas de la section */}
        <motion.div
          style={{ scaleX: smoothProgress, transformOrigin: '0% 50%' }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-[#E60039] z-30 pointer-events-none"
        />

        {/* CONTENEUR PLEIN ÉCRAN DES SLIDES HORIZONTAUX */}
        <div className="w-full h-full relative flex items-center overflow-hidden">
          
          <motion.div
            style={{ x: horizontalX }}
            className="flex items-center h-full will-change-transform"
          >
            {/* ================================================================= */}
            {/* SLIDE 0 : OUVERTURE / INTRO                                       */}
            {/* ================================================================= */}
            <div className="w-screen shrink-0 h-full flex flex-col items-center justify-center px-6 sm:px-12 lg:px-16 text-center">
              <div className="max-w-4xl mx-auto space-y-4">
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] font-black font-display text-black dark:text-white tracking-tight leading-[1.14]">
                  {lang === 'fr' ? (
                    <>
                      Nous apportons structure,<br />
                      méthodologie<br />
                      et expertise dans les projets<br />
                      <motion.span style={{ color: slide0Red }} className="font-black">
                        “mission critical”
                      </motion.span>
                    </>
                  ) : (
                    <>
                      We bring structure,<br />
                      methodology<br />
                      and expertise into<br />
                      <motion.span style={{ color: slide0Red }} className="font-black">
                        “mission critical”
                      </motion.span> projects
                    </>
                  )}
                </h2>
              </div>
            </div>

            {/* ================================================================= */}
            {/* SLIDE 1 : INNOVATION & OFFRE COMPLÈTE                             */}
            {/* Adapté responsive : 1 colonne mobile / 2 colonnes desktop         */}
            {/* ================================================================= */}
            <div className="w-screen shrink-0 h-full flex items-center justify-center px-4 sm:px-8 lg:px-16 xl:px-24">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-5 sm:gap-8 lg:gap-16 xl:gap-24 max-w-6xl mx-auto w-full max-h-[82vh] overflow-y-auto lg:overflow-visible py-2">
                
                {/* Colonne Gauche : Veille et culture de l'innovation */}
                <div className="w-full lg:w-[46%] max-w-[480px] text-left space-y-2 sm:space-y-3 shrink-0">
                  <motion.h3
                    style={{ color: slide1Red }}
                    className="text-xl sm:text-3xl lg:text-[42px] xl:text-[48px] font-black font-display tracking-tight leading-[1.08] transition-colors"
                  >
                    {lang === 'fr' ? (
                      <>
                        Veille et culture<br />
                        de l'innovation
                      </>
                    ) : (
                      <>
                        Tech watch & culture<br />
                        of innovation
                      </>
                    )}
                  </motion.h3>

                  <p className="text-xs sm:text-base lg:text-[21px] font-bold leading-snug text-black dark:text-white pt-0.5 sm:pt-1">
                    {lang === 'fr' ? (
                      <>
                        De la veille sur les{' '}
                        <motion.span style={{ color: slide1Red }} className="font-black transition-colors">
                          dernières innovations
                        </motion.span>
                        , des déclinaisons{' '}
                        <motion.span style={{ color: slide1Red }} className="font-black transition-colors">
                          pragmatiques
                        </motion.span>{' '}
                        dans les SI
                      </>
                    ) : (
                      <>
                        Continuous watch on the{' '}
                        <motion.span style={{ color: slide1Red }} className="font-black transition-colors">
                          latest breakthroughs
                        </motion.span>
                        , delivered through{' '}
                        <motion.span style={{ color: slide1Red }} className="font-black transition-colors">
                          pragmatic
                        </motion.span>{' '}
                        enterprise IT
                      </>
                    )}
                  </p>
                </div>

                {/* Colonne Droite : Une offre de service complète */}
                <div className="w-full lg:w-[54%] max-w-[540px] text-left space-y-2 sm:space-y-3 border-t-2 lg:border-t-0 lg:border-l-2 border-slate-200/70 dark:border-white/10 pt-3 lg:pt-0 pl-0 lg:pl-10 xl:pl-14">
                  <h4 className="text-sm sm:text-xl lg:text-[26px] font-black font-display uppercase tracking-tight text-black dark:text-white leading-tight">
                    {lang === 'fr' ? 'UNE OFFRE DE SERVICE COMPLÈTE' : 'A COMPLETE SERVICE OFFERING'}
                  </h4>

                  <div className="space-y-1.5 sm:space-y-2.5">
                    <div>
                      <motion.div
                        style={{ color: slide1Red }}
                        className="text-[10px] sm:text-sm font-black uppercase tracking-wider font-mono transition-colors"
                      >
                        {lang === 'fr' ? 'SUR TOUT LE CYCLE DE VIE' : 'ACROSS THE FULL LIFECYCLE'}
                      </motion.div>
                      <div className="text-[9.5px] sm:text-xs font-semibold uppercase tracking-wider text-black dark:text-slate-200">
                        {lang === 'fr' ? 'CONCEPTION, DÉVELOPPEMENT, MAINTENANCE' : 'SCOPING, DEVELOPMENT, MAINTENANCE'}
                      </div>
                    </div>

                    <div>
                      <motion.div
                        style={{ color: slide1Red }}
                        className="text-[10px] sm:text-sm font-black uppercase tracking-wider font-mono transition-colors"
                      >
                        {lang === 'fr' ? 'VIA DES APPROCHES COMPLÈTES' : 'THROUGH COMPREHENSIVE APPROACHES'}
                      </motion.div>
                      <div className="text-[9.5px] sm:text-xs font-semibold uppercase tracking-wider text-black dark:text-slate-200">
                        {lang === 'fr' ? 'ORCHESTRANT CONSEIL, RÉALISATION ET FORMATION' : 'ORCHESTRATING ADVISORY, DELIVERY AND TRAINING'}
                      </div>
                    </div>

                    <div>
                      <motion.div
                        style={{ color: slide1Red }}
                        className="text-[10px] sm:text-sm font-black uppercase tracking-wider font-mono transition-colors"
                      >
                        {lang === 'fr' ? 'POUR TOUS LES NIVEAUX DE L’ORGANISATION' : 'FOR ALL ORGANIZATIONAL TIERS'}
                      </motion.div>
                      <div className="text-[9.5px] sm:text-xs font-semibold uppercase tracking-wider text-black dark:text-slate-200">
                        {lang === 'fr' ? 'EXÉCUTION, DÉCISION, STRATÉGIE' : 'EXECUTION, DECISION, STRATEGY'}
                      </div>
                    </div>

                    <div>
                      <motion.div
                        style={{ color: slide1Red }}
                        className="text-[10px] sm:text-sm font-black uppercase tracking-wider font-mono transition-colors"
                      >
                        {lang === 'fr' ? 'DANS DES MODÈLES D’INTERVENTION FLEXIBLES' : 'WITH FLEXIBLE ENGAGEMENT MODELS'}
                      </motion.div>
                      <div className="text-[9.5px] sm:text-xs font-semibold uppercase tracking-wider text-black dark:text-slate-200">
                        {lang === 'fr' ? 'ENGAGEMENT, LOCALISATION, SQUADS DÉDIÉES...' : 'COMMITMENT, LOCATION, SQUADS...'}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ================================================================= */}
            {/* SLIDE 2 : CRAFT, EXPERTISE & CONVICTIONS                          */}
            {/* Adapté responsive : 1 colonne mobile / 2 colonnes desktop         */}
            {/* ================================================================= */}
            <div className="w-screen shrink-0 h-full flex items-center justify-center px-4 sm:px-8 lg:px-16 xl:px-24">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-5 sm:gap-8 lg:gap-16 xl:gap-24 max-w-6xl mx-auto w-full max-h-[82vh] overflow-y-auto lg:overflow-visible py-2">
                
                {/* Colonne Gauche : Excellence et expertise technique */}
                <div className="w-full lg:w-[46%] max-w-[480px] text-left space-y-2 sm:space-y-3 shrink-0">
                  <motion.h3
                    style={{ color: slide2Red }}
                    className="text-xl sm:text-3xl lg:text-[42px] xl:text-[48px] font-black font-display tracking-tight leading-[1.08] transition-colors"
                  >
                    {lang === 'fr' ? (
                      <>
                        Excellence<br />
                        et expertise technique
                      </>
                    ) : (
                      <>
                        Technical craft &<br />
                        senior expertise
                      </>
                    )}
                  </motion.h3>

                  <p className="text-xs sm:text-base lg:text-[21px] font-bold leading-snug text-black dark:text-white pt-0.5 sm:pt-1">
                    {lang === 'fr' ? (
                      <>
                        <motion.span style={{ color: slide2Red }} className="font-black transition-colors">
                          Parties prenantes
                        </motion.span>{' '}
                        de la réussite des projets, amenant expérience, expertise et{' '}
                        <motion.span style={{ color: slide2Red }} className="font-black transition-colors">
                          rigueur
                        </motion.span>
                      </>
                    ) : (
                      <>
                        <motion.span style={{ color: slide2Red }} className="font-black transition-colors">
                          True co-owners
                        </motion.span>{' '}
                        of project success, bringing battle-tested expertise and engineering{' '}
                        <motion.span style={{ color: slide2Red }} className="font-black transition-colors">
                          rigor
                        </motion.span>
                      </>
                    )}
                  </p>
                </div>

                {/* Colonne Droite : Des convictions dans l'exécution */}
                <div className="w-full lg:w-[54%] max-w-[540px] text-left space-y-2 sm:space-y-3 border-t-2 lg:border-t-0 lg:border-l-2 border-slate-200/70 dark:border-white/10 pt-3 lg:pt-0 pl-0 lg:pl-10 xl:pl-14">
                  <h4 className="text-sm sm:text-xl lg:text-[26px] font-black font-display uppercase tracking-tight text-black dark:text-white leading-tight">
                    {lang === 'fr' ? "DES CONVICTIONS DANS L'EXÉCUTION" : "FIRM CONVICTIONS IN EXECUTION"}
                  </h4>

                  <div className="space-y-1.5 sm:space-y-2.5">
                    <div>
                      <motion.div
                        style={{ color: slide2Red }}
                        className="text-[10px] sm:text-sm font-black uppercase tracking-wider font-mono transition-colors"
                      >
                        {lang === 'fr' ? 'MODULARISER' : 'MODULARIZE'}
                      </motion.div>
                      <div className="text-[9.5px] sm:text-xs font-semibold uppercase tracking-wider text-black dark:text-slate-200">
                        {lang === 'fr'
                          ? 'ET PARALLÉLISER PLUTÔT QUE PASSER À L’ÉCHELLE SANS STRUCTURE'
                          : 'AND PARALLELIZE RATHER THAN SCALE WITHOUT GOVERNANCE'}
                      </div>
                    </div>

                    <div>
                      <motion.div
                        style={{ color: slide2Red }}
                        className="text-[10px] sm:text-sm font-black uppercase tracking-wider font-mono transition-colors"
                      >
                        {lang === 'fr' ? 'DE PETITES ÉQUIPES EXPERTES' : 'LEAN EXPERT SQUADS'}
                      </motion.div>
                      <div className="text-[9.5px] sm:text-xs font-semibold uppercase tracking-wider text-black dark:text-slate-200">
                        {lang === 'fr'
                          ? 'PLUTÔT QUE DE GRANDS PLATEAUX PROJETS'
                          : 'RATHER THAN BLOATED COMMODITY FACTORIES'}
                      </div>
                    </div>

                    <div>
                      <motion.div
                        style={{ color: slide2Red }}
                        className="text-[10px] sm:text-sm font-black uppercase tracking-wider font-mono transition-colors"
                      >
                        {lang === 'fr' ? 'L’IA COMME ACCÉLÉRATEUR' : 'AI AS AN ACCELERATOR'}
                      </motion.div>
                      <div className="text-[9.5px] sm:text-xs font-semibold uppercase tracking-wider text-black dark:text-slate-200">
                        {lang === 'fr'
                          ? 'PLUTÔT QU’EN REMPLACEMENT'
                          : 'RATHER THAN BLIND REPLACEMENT'}
                      </div>
                    </div>

                    <div>
                      <motion.div
                        style={{ color: slide2Red }}
                        className="text-[10px] sm:text-sm font-black uppercase tracking-wider font-mono transition-colors"
                      >
                        {lang === 'fr' ? 'UNE VÉLOCITÉ SOUTENUE PAR LA QUALITÉ' : 'VELOCITY SUSTAINED BY CRAFT'}
                      </motion.div>
                      <div className="text-[9.5px] sm:text-xs font-semibold uppercase tracking-wider text-black dark:text-slate-200">
                        {lang === 'fr'
                          ? 'PLUTÔT QUE DU LOGICIEL À LA VA-VITE'
                          : 'RATHER THAN FRAGILE SHORTCUTS'}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ================================================================= */}
            {/* SLIDE 3 : ENGAGEMENT DANS LES COMMUNAUTÉS                         */}
            {/* ================================================================= */}
            <div className="w-screen shrink-0 h-full flex items-center justify-center px-4 sm:px-10 lg:px-16">
              <motion.div
                style={{ scale: slide3Zoom, transformOrigin: 'center center' }}
                className="max-w-3xl mx-auto w-full text-center space-y-4 will-change-transform"
              >
                <motion.h3
                  style={{ color: slide3Red }}
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] font-black font-display tracking-tight leading-[1.08] transition-colors"
                >
                  {lang === 'fr' ? (
                    <>
                      Engagement<br />
                      dans les communautés
                    </>
                  ) : (
                    <>
                      Community & open<br />
                      ecosystem leadership
                    </>
                  )}
                </motion.h3>

                <p className="text-sm sm:text-lg lg:text-[23px] font-bold leading-snug max-w-xl mx-auto text-black dark:text-white">
                  {lang === 'fr' ? (
                    <>
                      <motion.span style={{ color: slide3Red }} className="font-black transition-colors">
                        Communautés
                      </motion.span>{' '}
                      de pratiques,{' '}
                      <motion.span style={{ color: slide3Red }} className="font-black transition-colors">
                        conférences
                      </motion.span>
                      , contributions{' '}
                      <motion.span style={{ color: slide3Red }} className="font-black transition-colors">
                        open-source
                      </motion.span>
                    </>
                  ) : (
                    <>
                      <motion.span style={{ color: slide3Red }} className="font-black transition-colors">
                        Communities
                      </motion.span>{' '}
                      of practice, world-class{' '}
                      <motion.span style={{ color: slide3Red }} className="font-black transition-colors">
                        conferences
                      </motion.span>
                      , major{' '}
                      <motion.span style={{ color: slide3Red }} className="font-black transition-colors">
                        open-source
                      </motion.span>{' '}
                      contributions
                    </>
                  )}
                </p>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ValueBridgeParallaxV2;

