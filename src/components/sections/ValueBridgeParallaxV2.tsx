import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Language } from '../../types';

interface ValueBridgeParallaxV2Props {
  lang: Language;
}

export const ValueBridgeParallaxV2: React.FC<ValueBridgeParallaxV2Props> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous vertical scroll tracking across runway for desktop
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
  // Dès son approche (0.18 -> 0.28), TOUTES les lettres en rouge s'allument
  // et restent 100% allumées tant que le slide est au centre (0.28 -> 0.48)
  const slide1Red = useTransform(
    smoothProgress,
    [0.12, 0.26, 0.42, 0.52],
    ['#94A3B8', '#E60039', '#E60039', '#94A3B8']
  );

  // Slide 2 : Arrive au milieu / centre vers 0.58-0.68
  // Dès son approche (0.48 -> 0.58), TOUTES les lettres en rouge s'allument
  // et restent 100% allumées tant que le slide est au centre (0.58 -> 0.76)
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

  // Effet de ZOOM final demandé sur la dernière section Engagement Communautés
  // S'installe majestueusement au centre puis se stabilise
  const slide3Zoom = useTransform(
    smoothProgress,
    [0.76, 0.84, 0.98],
    [0.96, 1.00, 1.18]
  );

  return (
    <div
      ref={containerRef}
      id="mission-critical-v2"
      className="relative w-full bg-white dark:bg-[#07090E] transition-colors"
      style={{ height: isMobile ? 'auto' : '420vh' }}
    >
      {/* ========================================================================= */}
      {/* VERSION MOBILE : CARROUSEL HORIZONTAL PUR (< lg)                          */}
      {/* ========================================================================= */}
      <div className="block lg:hidden w-full py-12 px-4 sm:px-6">
        <div className="text-center space-y-4 mb-8">
          <div className="text-xs font-mono font-bold tracking-wider text-[#E60039] uppercase">
            {lang === 'fr' ? '02 / NOTRE ENGAGEMENT' : '02 / OUR COMMITMENT'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-black dark:text-white tracking-tight leading-tight">
            {lang === 'fr' ? (
              <>
                Nous apportons structure, méthodologie et expertise dans les projets{' '}
                <span className="text-[#E60039] font-black">“mission critical”</span>
              </>
            ) : (
              <>
                We bring structure, methodology, and expertise into{' '}
                <span className="text-[#E60039] font-black">“mission critical”</span> projects
              </>
            )}
          </h2>
        </div>

        {/* Défilement horizontal naturel mobile avec snap */}
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none px-2">
          {/* Slide 1 - Innovation */}
          <div className="min-w-[85vw] sm:min-w-[400px] snap-center p-6 rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 flex flex-col justify-center text-center space-y-3">
            <h3 className="text-2xl font-black font-display text-[#E60039] leading-tight">
              {lang === 'fr' ? (
                <>Veille et culture de<br />l'innovation</>
              ) : (
                <>Tech watch & culture<br />of innovation</>
              )}
            </h3>
            <p className="text-sm font-bold text-black dark:text-white leading-relaxed">
              {lang === 'fr' ? (
                <>
                  De la veille sur les <span className="text-[#E60039] font-black">dernières innovations</span>, des déclinaisons <span className="text-[#E60039] font-black">pragmatiques</span> dans les SI
                </>
              ) : (
                <>
                  Continuous watch on the <span className="text-[#E60039] font-black">latest breakthroughs</span>, delivered through <span className="text-[#E60039] font-black">pragmatic</span> enterprise IT
                </>
              )}
            </p>
          </div>

          {/* Slide 1 - Offre complète */}
          <div className="min-w-[85vw] sm:min-w-[400px] snap-center p-6 rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 flex flex-col justify-center space-y-3.5 text-left">
            <h4 className="text-lg font-black font-display uppercase tracking-tight text-black dark:text-white">
              {lang === 'fr' ? 'Une offre de service complète' : 'A complete service offering'}
            </h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="font-bold uppercase tracking-wider text-[#E60039] font-mono text-[11px]">
                  {lang === 'fr' ? 'Sur tout le cycle de vie' : 'Across the full lifecycle'}
                </div>
                <div className="text-black dark:text-slate-200 font-semibold uppercase text-[10.5px]">
                  {lang === 'fr' ? 'conception, développement, maintenance' : 'scoping, development, maintenance'}
                </div>
              </div>
              <div>
                <div className="font-bold uppercase tracking-wider text-[#E60039] font-mono text-[11px]">
                  {lang === 'fr' ? 'Via des approches complètes' : 'Through comprehensive approaches'}
                </div>
                <div className="text-black dark:text-slate-200 font-semibold uppercase text-[10.5px]">
                  {lang === 'fr' ? 'orchestrant conseil, réalisation et formation' : 'orchestrating advisory, delivery and training'}
                </div>
              </div>
              <div>
                <div className="font-bold uppercase tracking-wider text-[#E60039] font-mono text-[11px]">
                  {lang === 'fr' ? 'Pour tous les niveaux de l’organisation' : 'For all organizational tiers'}
                </div>
                <div className="text-black dark:text-slate-200 font-semibold uppercase text-[10.5px]">
                  {lang === 'fr' ? 'exécution, décision, stratégie' : 'execution, decision, strategy'}
                </div>
              </div>
              <div>
                <div className="font-bold uppercase tracking-wider text-[#E60039] font-mono text-[11px]">
                  {lang === 'fr' ? 'Dans des modèles d’intervention flexibles' : 'With flexible engagement models'}
                </div>
                <div className="text-black dark:text-slate-200 font-semibold uppercase text-[10.5px]">
                  {lang === 'fr' ? 'engagement, localisation, squads dédiées...' : 'commitment, location, dedicated squads...'}
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 - Craft & Excellence */}
          <div className="min-w-[85vw] sm:min-w-[400px] snap-center p-6 rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 flex flex-col justify-center text-center space-y-3">
            <h3 className="text-2xl font-black font-display text-[#E60039] leading-tight">
              {lang === 'fr' ? (
                <>Excellence et expertise<br />technique</>
              ) : (
                <>Technical craft &<br />senior expertise</>
              )}
            </h3>
            <p className="text-sm font-bold text-black dark:text-white leading-relaxed">
              {lang === 'fr' ? (
                <>
                  <span className="text-[#E60039] font-black">Parties prenantes</span> de la réussite des projets, amenant expérience, expertise et <span className="text-[#E60039] font-black">rigueur</span>
                </>
              ) : (
                <>
                  <span className="text-[#E60039] font-black">True co-owners</span> of project success, bringing battle-tested expertise and engineering <span className="text-[#E60039] font-black">rigor</span>
                </>
              )}
            </p>
          </div>

          {/* Slide 2 - Convictions */}
          <div className="min-w-[85vw] sm:min-w-[400px] snap-center p-6 rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 flex flex-col justify-center space-y-3.5 text-left">
            <h4 className="text-lg font-black font-display uppercase tracking-tight text-black dark:text-white">
              {lang === 'fr' ? "Des convictions dans l'exécution" : 'Firm convictions in execution'}
            </h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="font-bold uppercase tracking-wider text-[#E60039] font-mono text-[11px]">
                  {lang === 'fr' ? 'Modulariser' : 'Modularize'}
                </div>
                <div className="text-black dark:text-slate-200 font-semibold uppercase text-[10.5px]">
                  {lang === 'fr' ? 'et paralléliser plutôt que passer à l’échelle sans structure' : 'and parallelize rather than scale without governance'}
                </div>
              </div>
              <div>
                <div className="font-bold uppercase tracking-wider text-[#E60039] font-mono text-[11px]">
                  {lang === 'fr' ? 'De petites équipes expertes' : 'Lean expert squads'}
                </div>
                <div className="text-black dark:text-slate-200 font-semibold uppercase text-[10.5px]">
                  {lang === 'fr' ? 'plutôt que de grands plateaux projets' : 'rather than bloated commodity factories'}
                </div>
              </div>
              <div>
                <div className="font-bold uppercase tracking-wider text-[#E60039] font-mono text-[11px]">
                  {lang === 'fr' ? 'L’IA comme accélérateur' : 'AI as an accelerator'}
                </div>
                <div className="text-black dark:text-slate-200 font-semibold uppercase text-[10.5px]">
                  {lang === 'fr' ? 'plutôt qu’en remplacement' : 'rather than blind replacement'}
                </div>
              </div>
              <div>
                <div className="font-bold uppercase tracking-wider text-[#E60039] font-mono text-[11px]">
                  {lang === 'fr' ? 'Une vélocité soutenue par la qualité' : 'Velocity sustained by craft'}
                </div>
                <div className="text-black dark:text-slate-200 font-semibold uppercase text-[10.5px]">
                  {lang === 'fr' ? 'plutôt que du logiciel à la va-vite' : 'rather than fragile shortcuts'}
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 - Communautés */}
          <div className="min-w-[85vw] sm:min-w-[400px] snap-center p-6 rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 flex flex-col justify-center text-center space-y-3">
            <h3 className="text-2xl font-black font-display text-[#E60039] leading-tight">
              {lang === 'fr' ? (
                <>Engagement dans les<br />communautés</>
              ) : (
                <>Community & open<br />ecosystem leadership</>
              )}
            </h3>
            <p className="text-sm font-bold text-black dark:text-white leading-relaxed">
              {lang === 'fr' ? (
                <>
                  <span className="text-[#E60039] font-black">Communautés</span> de pratiques, <span className="text-[#E60039] font-black">conférences</span>, contributions <span className="text-[#E60039] font-black">open-source</span>
                </>
              ) : (
                <>
                  <span className="text-[#E60039] font-black">Communities</span> of practice, world-class <span className="text-[#E60039] font-black">conferences</span>, major <span className="text-[#E60039] font-black">open-source</span> contributions
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VERSION DESKTOP : SCROLL HORIZONTAL STRICTEMENT CONFORME À LA MAQUETTE    */}
      {/* Espacement compact sans trou, toutes lettres en rouge allumées au centre */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex sticky top-0 h-screen w-full items-center overflow-hidden z-20">
        <div className="w-full h-full relative flex items-center overflow-hidden">
          
          {/* BANDE HORIZONTALE COMPOSÉE DES 4 SLIDES (3 SLIDES MAQUETTE + INTRO) */}
          <motion.div
            style={{ x: horizontalX }}
            className="flex items-center h-full will-change-transform"
          >
            {/* ================================================================= */}
            {/* SLIDE 0 : OUVERTURE / INTRO (AFFICHÉ SEUL EN PREMIER)             */}
            {/* ================================================================= */}
            <div className="w-screen shrink-0 h-full flex flex-col items-center justify-center px-8 lg:px-16 text-center">
              <div className="max-w-4xl mx-auto space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] font-black font-display text-black dark:text-white tracking-tight leading-[1.12]">
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
            {/* SLIDE 1 (MAQUETTE) : INNOVATION & OFFRE COMPLÈTE                  */}
            {/* Les deux colonnes sont réunies avec un espacement équilibré       */}
            {/* Toutes les lettres rouges s'allument à l'arrivée au centre        */}
            {/* ================================================================= */}
            <div className="w-screen shrink-0 h-full flex items-center justify-center px-8 lg:px-16 xl:px-24">
              <div className="flex flex-row items-center justify-center gap-12 lg:gap-16 xl:gap-24 max-w-6xl mx-auto w-full">
                
                {/* Colonne Gauche : Veille et culture de l'innovation */}
                <div className="w-[46%] max-w-[480px] text-left space-y-3">
                  <motion.h3
                    style={{ color: slide1Red }}
                    className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[48px] font-black font-display tracking-tight leading-[1.08] transition-colors"
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

                  <p className="text-base sm:text-lg lg:text-[21px] font-bold leading-snug text-black dark:text-white pt-1">
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
                <div className="w-[54%] max-w-[540px] text-left space-y-3 border-l-2 border-slate-200/70 dark:border-white/10 pl-10 lg:pl-14">
                  <h4 className="text-xl sm:text-2xl lg:text-[26px] font-black font-display uppercase tracking-tight text-black dark:text-white leading-tight">
                    {lang === 'fr' ? 'UNE OFFRE DE SERVICE COMPLÈTE' : 'A COMPLETE SERVICE OFFERING'}
                  </h4>

                  <div className="space-y-2.5">
                    <div>
                      <motion.div
                        style={{ color: slide1Red }}
                        className="text-xs sm:text-sm font-black uppercase tracking-wider font-mono transition-colors"
                      >
                        {lang === 'fr' ? 'SUR TOUT LE CYCLE DE VIE' : 'ACROSS THE FULL LIFECYCLE'}
                      </motion.div>
                      <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-black dark:text-slate-200">
                        {lang === 'fr' ? 'CONCEPTION, DÉVELOPPEMENT, MAINTENANCE' : 'SCOPING, DEVELOPMENT, MAINTENANCE'}
                      </div>
                    </div>

                    <div>
                      <motion.div
                        style={{ color: slide1Red }}
                        className="text-xs sm:text-sm font-black uppercase tracking-wider font-mono transition-colors"
                      >
                        {lang === 'fr' ? 'VIA DES APPROCHES COMPLÈTES' : 'THROUGH COMPREHENSIVE APPROACHES'}
                      </motion.div>
                      <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-black dark:text-slate-200">
                        {lang === 'fr' ? 'ORCHESTRANT CONSEIL, RÉALISATION ET FORMATION' : 'ORCHESTRATING ADVISORY, DELIVERY AND TRAINING'}
                      </div>
                    </div>

                    <div>
                      <motion.div
                        style={{ color: slide1Red }}
                        className="text-xs sm:text-sm font-black uppercase tracking-wider font-mono transition-colors"
                      >
                        {lang === 'fr' ? 'POUR TOUS LES NIVEAUX DE L’ORGANISATION' : 'FOR ALL ORGANIZATIONAL TIERS'}
                      </motion.div>
                      <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-black dark:text-slate-200">
                        {lang === 'fr' ? 'EXÉCUTION, DÉCISION, STRATÉGIE' : 'EXECUTION, DECISION, STRATEGY'}
                      </div>
                    </div>

                    <div>
                      <motion.div
                        style={{ color: slide1Red }}
                        className="text-xs sm:text-sm font-black uppercase tracking-wider font-mono transition-colors"
                      >
                        {lang === 'fr' ? 'DANS DES MODÈLES D’INTERVENTION FLEXIBLES' : 'WITH FLEXIBLE ENGAGEMENT MODELS'}
                      </motion.div>
                      <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-black dark:text-slate-200">
                        {lang === 'fr' ? 'ENGAGEMENT, LOCALISATION, SQUADS DÉDIÉES...' : 'COMMITMENT, LOCATION, SQUADS...'}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ================================================================= */}
            {/* SLIDE 2 (MAQUETTE) : CRAFT, EXPERTISE & CONVICTIONS               */}
            {/* Les deux colonnes sont réunies avec un espacement équilibré       */}
            {/* Toutes les lettres rouges s'allument à l'arrivée au centre        */}
            {/* ================================================================= */}
            <div className="w-screen shrink-0 h-full flex items-center justify-center px-8 lg:px-16 xl:px-24">
              <div className="flex flex-row items-center justify-center gap-12 lg:gap-16 xl:gap-24 max-w-6xl mx-auto w-full">
                
                {/* Colonne Gauche : Excellence et expertise technique */}
                <div className="w-[46%] max-w-[480px] text-left space-y-3">
                  <motion.h3
                    style={{ color: slide2Red }}
                    className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[48px] font-black font-display tracking-tight leading-[1.08] transition-colors"
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

                  <p className="text-base sm:text-lg lg:text-[21px] font-bold leading-snug text-black dark:text-white pt-1">
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
                <div className="w-[54%] max-w-[540px] text-left space-y-3 border-l-2 border-slate-200/70 dark:border-white/10 pl-10 lg:pl-14">
                  <h4 className="text-xl sm:text-2xl lg:text-[26px] font-black font-display uppercase tracking-tight text-black dark:text-white leading-tight">
                    {lang === 'fr' ? "DES CONVICTIONS DANS L'EXÉCUTION" : "FIRM CONVICTIONS IN EXECUTION"}
                  </h4>

                  <div className="space-y-2.5">
                    <div>
                      <motion.div
                        style={{ color: slide2Red }}
                        className="text-xs sm:text-sm font-black uppercase tracking-wider font-mono transition-colors"
                      >
                        {lang === 'fr' ? 'MODULARISER' : 'MODULARIZE'}
                      </motion.div>
                      <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-black dark:text-slate-200">
                        {lang === 'fr'
                          ? 'ET PARALLÉLISER PLUTÔT QUE PASSER À L’ÉCHELLE SANS STRUCTURE'
                          : 'AND PARALLELIZE RATHER THAN SCALE WITHOUT GOVERNANCE'}
                      </div>
                    </div>

                    <div>
                      <motion.div
                        style={{ color: slide2Red }}
                        className="text-xs sm:text-sm font-black uppercase tracking-wider font-mono transition-colors"
                      >
                        {lang === 'fr' ? 'DE PETITES ÉQUIPES EXPERTES' : 'LEAN EXPERT SQUADS'}
                      </motion.div>
                      <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-black dark:text-slate-200">
                        {lang === 'fr'
                          ? 'PLUTÔT QUE DE GRANDS PLATEAUX PROJETS'
                          : 'RATHER THAN BLOATED COMMODITY FACTORIES'}
                      </div>
                    </div>

                    <div>
                      <motion.div
                        style={{ color: slide2Red }}
                        className="text-xs sm:text-sm font-black uppercase tracking-wider font-mono transition-colors"
                      >
                        {lang === 'fr' ? 'L’IA COMME ACCÉLÉRATEUR' : 'AI AS AN ACCELERATOR'}
                      </motion.div>
                      <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-black dark:text-slate-200">
                        {lang === 'fr'
                          ? 'PLUTÔT QU’EN REMPLACEMENT'
                          : 'RATHER THAN BLIND REPLACEMENT'}
                      </div>
                    </div>

                    <div>
                      <motion.div
                        style={{ color: slide2Red }}
                        className="text-xs sm:text-sm font-black uppercase tracking-wider font-mono transition-colors"
                      >
                        {lang === 'fr' ? 'UNE VÉLOCITÉ SOUTENUE PAR LA QUALITÉ' : 'VELOCITY SUSTAINED BY CRAFT'}
                      </motion.div>
                      <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-black dark:text-slate-200">
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
            {/* SLIDE 3 (MAQUETTE) : ENGAGEMENT DANS LES COMMUNAUTÉS              */}
            {/* Parfaitement centré au milieu de l'écran avec pause & zoom final  */}
            {/* ================================================================= */}
            <div className="w-screen shrink-0 h-full flex items-center justify-center px-6 sm:px-10 lg:px-16">
              <motion.div
                style={{ scale: slide3Zoom, transformOrigin: 'center center' }}
                className="max-w-3xl mx-auto w-full text-center space-y-4 will-change-transform"
              >
                <motion.h3
                  style={{ color: slide3Red }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] font-black font-display tracking-tight leading-[1.08] transition-colors"
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

                <p className="text-lg sm:text-xl lg:text-[23px] font-bold leading-snug max-w-xl mx-auto text-black dark:text-white">
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
