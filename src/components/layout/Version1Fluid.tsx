import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Layers, Box, CheckCircle2,
  TrendingUp, Building2, Award, Compass, Zap,
  ShieldCheck, Users, MapPin, X, Leaf, Repeat, HeartHandshake
} from 'lucide-react';
import { StrategicAxesSection } from '../sections/StrategicAxesSection';
import { ValueBridgeScrollSection } from '../sections/ValueBridgeScrollSection';
import { ValueStreamGrandSentence } from '../sections/ValueStreamGrandSentence';
import { CompanyLogosMarquee } from '../sections/CompanyLogosMarquee';
import { Language, SolutionBlock, ClientReference, OperatingModel } from '../../types';

// Code-splitting: Lazy load below-the-fold deep dive sections
const OperatingModelsSection = lazy(() => import('../sections/OperatingModelsSection').then(m => ({ default: m.OperatingModelsSection })));
const PortfolioShowcaseSection = lazy(() => import('../sections/PortfolioShowcaseSection').then(m => ({ default: m.PortfolioShowcaseSection })));
const AgenciesSection = lazy(() => import('../sections/AgenciesSection').then(m => ({ default: m.AgenciesSection })));
const PartnersEcosystemSection = lazy(() => import('../sections/PartnersEcosystemSection').then(m => ({ default: m.PartnersEcosystemSection })));
const HeritageSection = lazy(() => import('../sections/HeritageSection').then(m => ({ default: m.HeritageSection })));
const ContactSection = lazy(() => import('../sections/ContactSection').then(m => ({ default: m.ContactSection })));

interface Version1FluidProps {
  lang: Language;
  onOpenContact: (customAssembly?: SolutionBlock[]) => void;
  onOpenContactModel?: (model: OperatingModel) => void;
  onOpenBot?: () => void;
}

export const Version1Fluid: React.FC<Version1FluidProps> = ({
  lang,
  onOpenContact,
  onOpenContactModel,
  onOpenBot
}) => {
  const [selectedAssembly, setSelectedAssembly] = useState<SolutionBlock[]>([]);
  const [selectedProject, setSelectedProject] = useState<ClientReference | null>(null);

  const toggleAssembly = (block: SolutionBlock, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedAssembly.some(b => b.id === block.id)) {
      setSelectedAssembly(selectedAssembly.filter(b => b.id !== block.id));
    } else {
      setSelectedAssembly([...selectedAssembly, block]);
    }
  };

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#07090F] text-slate-900 dark:text-slate-100 selection:bg-[#E60039] selection:text-white font-sans overflow-x-clip transition-colors duration-200">
      {/* 
        =============================================================================
        FLUID MINIMAL GLASS LIGHT EFFECTS & FLOATING GLOW ORBS
        =============================================================================
      */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft fluid glowing gradient spheres */}
        <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(230,0,57,0.12)_0%,rgba(255,46,86,0.04)_40%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(230,0,57,0.18)_0%,rgba(255,46,86,0.06)_40%,transparent_70%)] blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,rgba(230,0,57,0.03)_50%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(99,102,241,0.12)_0%,rgba(230,0,57,0.05)_50%,transparent_70%)] blur-[140px] rounded-full" />
        <div className="absolute bottom-20 -left-20 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(230,0,57,0.06)_0%,transparent_60%)] dark:bg-[radial-gradient(circle,rgba(230,0,57,0.08)_0%,transparent_60%)] blur-[140px] rounded-full" />
      </div>

      {/* ========================================================================= */}
      {/* 00. GRANDE PHRASE D'OUVERTURE (ARRIVE JUSTE APRÈS L'INTRO / AVANT LES BLOCS) */}
      {/* À GAUCHE : Maîtriser la complexité des SI et des organisations…          */}
      {/* À DROITE : … pour traduire les investissements IT en valeur métier mesurable */}
      {/* ========================================================================= */}
      <ValueStreamGrandSentence lang={lang} />

      {/* ========================================================================= */}
      {/* 01. LA « VALEUR AJOUTÉE » ZENIKA : CONSEIL, RÉALISATION, FORMATION        */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full">
        <StrategicAxesSection
          lang={lang}
          onOpenContact={() => onOpenContact()}
          selectedAssembly={selectedAssembly}
          onToggleAssembly={toggleAssembly}
        />

        {/* PROMESSE MISSION CRITICAL (OFFRE / ADN / CONVICTIONS) */}
        <ValueBridgeScrollSection
          lang={lang}
        />
      </div>

      {/* ========================================================================= */}
      {/* 02. IMPACT & WHY - NOS CONVICTIONS (20 ANS D'EXPÉRIENCE)                  */}
      {/* ========================================================================= */}
      <div id="why" className="relative z-10 scroll-mt-24">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* ========================================================================= */}
          {/* INDICATEURS CLÉS & VALEUR MÉTIER                                          */}
          {/* ========================================================================= */}
          <section className="pt-8 sm:pt-12 pb-6 sm:pb-8 flex flex-col items-center text-center">

          {/* Slide 1 - Key Performance Indicators (KPIs) */}
          <div className="w-full">
            {/* Header: Nos Convictions */}
            <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-tight">
                {lang === 'fr' ? (
                  <>
                    Nos <span className="text-[#E60039]">convictions</span> sont le fruit de plus de{' '}
                    <span className="text-[#E60039]">20 ans</span> d’expérience
                  </>
                ) : (
                  <>
                    Our <span className="text-[#E60039]">convictions</span> are forged by over{' '}
                    <span className="text-[#E60039]">20 years</span> of experience
                  </>
                )}
              </h2>

              <p className="text-sm sm:text-base font-semibold bg-gradient-to-r from-[#E60039] via-purple-600 to-[#E60039] bg-clip-text text-transparent">
                {lang === 'fr'
                  ? 'Ensemble, construisons les Systèmes d’Information des 20 prochaines années.'
                  : 'Together, let us build the Information Systems of the next 20 years.'}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed pt-1">
                {lang === 'fr' ? (
                  <>
                    Depuis notre création en 2006, nous avons traversé avec nos clients <strong className="text-slate-900 dark:text-white font-bold">transformations, évolutions et révolutions</strong>, nous préparant aujourd’hui pour le virage de l’<strong className="text-slate-900 dark:text-white font-bold">Intelligence Artificielle</strong>, tout en restant fidèles à nos valeurs cardinales :
                  </>
                ) : (
                  <>
                    Since our inception in 2006, we navigated <strong className="text-slate-900 dark:text-white font-bold">transformations, evolutions and revolutions</strong> alongside our clients, preparing today for <strong className="text-slate-900 dark:text-white font-bold">Artificial Intelligence</strong>, true to our founding values:
                  </>
                )}
              </p>
            </div>

            {/* Grille fusionnée : 5 Convictions & Repères d'Excellence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 w-full text-left">
              {[
                {
                  kpiValue: '20 ans',
                  kpiLabelFr: 'd’Excellence & Maîtrise',
                  kpiLabelEn: 'Years of Mastery',
                  convictionFr: 'Amélioration continue (« Kaizen »)',
                  convictionEn: 'Continuous Improvement (“Kaizen”)',
                  subFr: '2006 — 2026 · Culture Craft & Zéro compromis',
                  subEn: '2006 — 2026 · Software Craftsmanship',
                  descFr: 'Exigence d’artisanat logiciel, formation permanente et quête d’élégance technique pour bâtir des SI pérennes sans dette.',
                  descEn: 'Software craftsmanship standards, ongoing upskilling, and technical mastery to build resilient, debt-free systems.',
                  color: '#E60039',
                  icon: Award,
                  targetId: 'heritage',
                  actionFr: 'Notre histoire (20 ans)',
                  actionEn: '20-year history',
                },
                {
                  kpiValue: '500+',
                  kpiLabelFr: 'Consultants & Experts',
                  kpiLabelEn: 'Consultants & Experts',
                  convictionFr: 'Collectif d’experts & Synergie',
                  convictionEn: 'Collective Intelligence & Synergy',
                  subFr: 'Craftsmanship & IA Native au cœur de vos équipes',
                  subEn: 'Craft & AI Native embedded with your teams',
                  descFr: 'Des spécialistes passionnés intégrés en immersion dans vos organisations pour accélérer vos chantiers et autonomiser vos équipes.',
                  descEn: 'Passionate specialists embedded within your teams to accelerate strategic initiatives and upskill in-house talent.',
                  color: '#8B5CF6',
                  icon: Users,
                  targetId: 'operating-models',
                  actionFr: 'Modèles opératoires',
                  actionEn: 'Operating models',
                },
                {
                  kpiValue: '100%',
                  kpiLabelFr: 'Indépendance & Open Source',
                  kpiLabelEn: 'Independent & Open Source',
                  convictionFr: 'Indépendance d’opinion',
                  convictionEn: 'Independent opinion',
                  subFr: 'Conseil libre, neutre & agnostique',
                  subEn: 'Unbiased advisory & sovereign choices',
                  descFr: 'Choix technologiques agnostiques guidés par le ROI réel et l’intérêt souverain de nos clients, sans enfermement éditeur.',
                  descEn: 'Agnostic technology choices guided by real business ROI and client sovereignty, with zero vendor lock-in.',
                  color: '#10B981',
                  icon: ShieldCheck,
                  targetId: 'partners',
                  actionFr: 'Écosystème partenaires',
                  actionEn: 'Partner ecosystem',
                },
                {
                  kpiValue: '15',
                  kpiLabelFr: 'Agences de Proximité',
                  kpiLabelEn: 'Proximity Agencies',
                  convictionFr: 'Transparence, partage, proximité',
                  convictionEn: 'Transparency, sharing, proximity',
                  subFr: 'France, Europe & Monde',
                  subEn: 'France, Europe & Worldwide',
                  descFr: 'Une présence territoriale forte et pérenne au plus près de vos équipes pour un partenariat de confiance et une réactivité maximale.',
                  descEn: 'Strong territorial footprint close to your teams, ensuring trust, open sharing without lock-in, and maximum responsiveness.',
                  color: '#06B6D4',
                  icon: MapPin,
                  targetId: 'agencies',
                  actionFr: 'Nos 15 implantations',
                  actionEn: 'Our 15 locations',
                },
                {
                  kpiValue: '17',
                  kpiLabelFr: 'Solution Blocks Activables',
                  kpiLabelEn: 'Modular Solution Blocks',
                  convictionFr: 'Éthique, responsable et durable',
                  convictionEn: 'Ethical, responsible & sustainable',
                  subFr: 'Composables, Souverains & Green IT',
                  subEn: 'Composable, Sovereign & Green IT',
                  descFr: 'Sobriété numérique, gouvernance éthique des algorithmes et de l’IA, et briques architecturales activables sur mesure.',
                  descEn: 'Digital sobriety, ethical AI governance, and modular composable building blocks tailored to your mission.',
                  color: '#F59E0B',
                  icon: Leaf,
                  targetId: 'solutions',
                  actionFr: '17 Solution Blocks',
                  actionEn: '17 Solution Blocks',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                    delay: idx * 0.08,
                  }}
                  className="relative overflow-hidden p-4 sm:p-5 lg:p-5 rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/10 backdrop-blur-2xl shadow-xs hover:shadow-lg dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] hover:border-slate-300 dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/[0.06] transition-all duration-300 flex flex-col justify-between items-start text-left cursor-default select-none min-h-[270px] sm:min-h-[290px]"
                >
                  {/* Lueur d'ambiance dynamique */}
                  <div
                    className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl pointer-events-none opacity-20 dark:opacity-25 transition-opacity duration-300"
                    style={{ backgroundColor: item.color }}
                  />

                  <div className="w-full">
                    {/* Header : Icône centrée */}
                    <div className="w-full flex items-center justify-center mb-4 sm:mb-3.5">
                      <div
                        className="w-13 h-13 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-sm border mx-auto"
                        style={{
                          backgroundColor: `${item.color}15`,
                          borderColor: `${item.color}35`,
                          color: item.color,
                        }}
                      >
                        <item.icon className="w-6 h-6 sm:w-6 sm:h-6" strokeWidth={2.2} />
                      </div>
                    </div>

                    {/* Bloc Chiffre Clé (KPI) */}
                    <div className="mb-3 text-center">
                      <div className="text-2xl sm:text-3xl lg:text-[32px] font-black font-display tracking-tight text-slate-900 dark:text-white leading-none text-center">
                        {item.kpiValue}
                      </div>
                      <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 font-display mt-1 leading-snug text-center">
                        {lang === 'fr' ? item.kpiLabelFr : item.kpiLabelEn}
                      </div>
                    </div>

                    {/* Titre de la conviction / valeur */}
                    <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 dark:text-white font-display leading-snug">
                      {lang === 'fr' ? item.convictionFr : item.convictionEn}
                    </h3>

                    {/* Sous-titre contextuel */}
                    <div
                      className="text-[10px] sm:text-[11px] font-mono font-semibold mt-1"
                      style={{ color: item.color }}
                    >
                      {lang === 'fr' ? item.subFr : item.subEn}
                    </div>

                    {/* Description claire et concise */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                      {lang === 'fr' ? item.descFr : item.descEn}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 03. CLIENT REFERENCES & SUCCESS STORIES (id="portfolio" / id="references") */}
      {/* ========================================================================= */}
      <div id="references" />
      <Suspense fallback={<div className="py-16 flex justify-center"><div className="w-8 h-8 rounded-full border-2 border-[#E60039] border-t-transparent animate-spin" /></div>}>
        <PortfolioShowcaseSection
          lang={lang}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />
      </Suspense>

      {/* ========================================================================= */}
      {/* LOGOS D'ENTREPRISES CLIENTES QUI DÉFILENT (CAROUSEL / MARQUEE)            */}
      {/* ========================================================================= */}
      <div id="clients-marquee" className="relative z-10 w-full scroll-mt-20">
        <CompanyLogosMarquee lang={lang} />
      </div>

      {/* ========================================================================= */}
      {/* DES MODÈLES OPÉRATOIRES INTÈGRENT VOS ÉQUIPES                             */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={null}>
          <OperatingModelsSection
            lang={lang}
            onOpenContact={onOpenContact}
            onOpenContactModel={onOpenContactModel}
          />
        </Suspense>
      </div>

      {/* ========================================================================= */}
      {/* 20-YEAR HERITAGE & FOOTPRINT (CARL AZOURY & TIMELINE) (id="heritage")     */}
      {/* ========================================================================= */}
      <Suspense fallback={null}>
        <HeritageSection lang={lang} onOpenContact={() => onOpenContact()} />
      </Suspense>

      {/* ========================================================================= */}
      {/* DERNIER : PARTENAIRES BEST-OF-BREED (id="partners")                       */}
      {/* ========================================================================= */}
      <Suspense fallback={null}>
        <PartnersEcosystemSection lang={lang} onOpenContact={onOpenContact} />
      </Suspense>

      {/* ========================================================================= */}
      {/* 06. IMPLANTATIONS & RÉSEAU D'AGENCES DE PROXIMITÉ (id="agencies")        */}
      {/* ========================================================================= */}
      <Suspense fallback={null}>
        <AgenciesSection lang={lang} onOpenContact={() => onOpenContact()} />
      </Suspense>

      {/* ========================================================================= */}
      {/* 07. SECTION CONTACT SUR LA PAGE (id="contact")                            */}
      {/* ========================================================================= */}
      <Suspense fallback={null}>
        <ContactSection lang={lang} onOpenBot={onOpenBot} />
      </Suspense>

      {/* Technical Project Dossier Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 cursor-pointer"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 cursor-default"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#E60039]/10 text-[#E60039] border border-[#E60039]/20">
                  {lang === 'fr' 
                    ? `DOSSIER D’INGÉNIERIE & DE PRODUCTION · ${selectedProject.sectorLabel.toUpperCase()}`
                    : `ENGINEERING & PRODUCTION DOSSIER · ${selectedProject.sectorLabelEn.toUpperCase()}`}
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white mb-2">
                  {lang === 'fr' ? selectedProject.title : selectedProject.titleEn}
                </h3>
                <p className="text-xs font-mono text-slate-500 dark:text-white/50">
                  {lang === 'fr' ? 'Client :' : 'Client:'} {selectedProject.clientName}
                </p>
              </div>

              {selectedProject.youtubeId && (
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10">
                  <iframe
                    className="w-full h-full object-cover"
                    src={`https://www.youtube-nocookie.com/embed/${selectedProject.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${selectedProject.youtubeId}&controls=1&modestbranding=1&playsinline=1&rel=0`}
                    title={selectedProject.videoTitle || (lang === 'fr' ? selectedProject.title : selectedProject.titleEn)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-white/[0.02] p-5 sm:p-6 rounded-2xl border border-slate-200/60 dark:border-white/5">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E60039]">
                    {lang === 'fr' ? '01. Défi Métier & Frictions' : '01. Business Challenge & Friction'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-white/80 leading-relaxed font-mono">
                    {lang === 'fr' ? selectedProject.challenge : selectedProject.challengeEn}
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-500">
                    {lang === 'fr' ? '02. Solution d\'Ingénierie Zenika' : '02. Zenika Engineering Solution'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-white/80 leading-relaxed font-mono">
                    {lang === 'fr' ? selectedProject.solution : selectedProject.solutionEn}
                  </p>
                </div>
              </div>

              {selectedProject.whatWeDid && selectedProject.whatWeDid.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-white/60">
                    {lang === 'fr' ? 'Périmètre d\'intervention & Réalisations :' : 'Intervention Scope & Deliverables:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(lang === 'fr' ? selectedProject.whatWeDid : (selectedProject.whatWeDidEn || selectedProject.whatWeDid)).map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-xs text-slate-700 dark:text-white/80">
                        <CheckCircle2 size={13} className="text-[#E60039] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E60039]">
                  {lang === 'fr' ? 'Impact & Résultats Mesurables :' : 'Impact & Measurable Outcomes:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(lang === 'fr' ? selectedProject.results : (selectedProject.resultsEn || selectedProject.results)).map((res, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-[#E60039]/10 border border-[#E60039]/20 text-xs font-mono font-semibold text-[#E60039]">
                      <TrendingUp size={14} className="shrink-0" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10 gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/40">
                      #{t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onOpenContact();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#E60039] text-white font-mono text-xs font-bold uppercase hover:bg-[#FF859B] transition-colors cursor-pointer shadow-md"
                >
                  {lang === 'fr' ? 'Cadrer un projet similaire' : 'Scope a similar project'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
