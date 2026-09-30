import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sliders, Layers } from 'lucide-react';
import { Language } from '../../types';
import { ValueBridgeParallaxV2 } from './ValueBridgeParallaxV2';

interface ValueBridgeScrollSectionProps {
  lang: Language;
}

interface ApproachItem {
  id: string;
  num: string;
  titleFr: string;
  titleEn: string;
  summaryFr: string;
  summaryEn: string;
  detailsFr: string[];
  detailsEn: string[];
}

const APPROACH_ITEMS: ApproachItem[] = [
  {
    id: 'services',
    num: '01',
    titleFr: 'Une offre de services complète',
    titleEn: 'A complete end-to-end service offering',
    summaryFr: 'Orchestrant conseil stratégique, réalisation agile et formation continue sur tout le cycle de vie.',
    summaryEn: 'Orchestrating strategic advisory, agile delivery, and continuous training across the full lifecycle.',
    detailsFr: [
      'Sur tout le cycle de vie : cadrage, conception, architecture, réalisation et exploitation',
      'Approches complètes : associant audit de maturité, delivery squads et montée en compétences',
      'Pour tous les niveaux de l’organisation : comités de direction, management et équipes d’ingénierie',
      'Modèles d’intervention flexibles : squads dédiées, régie d’experts, forfaits et centres d’excellence',
    ],
    detailsEn: [
      'Across the full lifecycle: scoping, architecture, software craftsmanship, and platform engineering',
      'Comprehensive framework: blending strategic advisory, dedicated delivery squads, and academy upskilling',
      'For every organizational tier: executive leadership, product managers, and engineering squads',
      'Flexible engagement models: dedicated squads, senior staff augmentation, fixed-price delivery',
    ],
  },
  {
    id: 'convictions',
    num: '02',
    titleFr: "Des convictions dans l'exécution",
    titleEn: 'Firm convictions in execution',
    summaryFr: 'Des principes d’ingénierie radicaux pour garantir la robustesse et la pérennité de vos plateformes.',
    summaryEn: 'Core engineering principles ensuring long-term resilience, speed, and architectural sovereignty.',
    detailsFr: [
      'Modulariser et paralléliser plutôt que passer à l’échelle sans gouvernance',
      'De petites équipes expertes plutôt que de grands plateaux projets pléthoriques',
      'L’IA comme accélérateur et multiplicateur de force plutôt qu’en remplacement aveugle',
      'Une vélocité soutenue par la qualité et le craft plutôt que du logiciel à la va-vite',
    ],
    detailsEn: [
      'Modularize and parallelize rather than scale without architectural governance',
      'Lean expert squads rather than bloated, slow commodity factory teams',
      'AI as a force multiplier and accelerator rather than a blind replacement',
      'Sustainable velocity backed by craftsmanship rather than fragile shortcuts',
    ],
  },
  {
    id: 'innovation',
    num: '03',
    titleFr: "Une culture forte de l'innovation",
    titleEn: 'A strong culture of innovation',
    summaryFr: 'Veille technologique continue et déclinaisons concrètes, sécurisées et pragmatiques dans vos SI.',
    summaryEn: 'Continuous technology watch with pragmatic, battle-tested implementation into enterprise IT.',
    detailsFr: [
      'Radar technologique permanent sur les innovations de rupture (IA agentique, GenAI, Cloud Souverain)',
      'Déclinaisons pragmatiques : POCs rapides, validation de valeur et passage à l’échelle industriel',
      'Acculturation des équipes clientes aux meilleures pratiques architecturales mondiales',
    ],
    detailsEn: [
      'Living Tech Radar monitoring break-through innovations (Agentic AI, LLM ops, Sovereign Cloud)',
      'Pragmatic delivery: fast-paced POCs, architectural validation, and industrial production scaling',
      'Empowering client squads with leading global engineering patterns and operational excellence',
    ],
  },
  {
    id: 'excellence',
    num: '04',
    titleFr: "Une démarche d'excellence et d'expertise technique",
    titleEn: 'Technical excellence and senior craft',
    summaryFr: 'Artisans logiciels engagés, apportant expérience de terrain, rigueur d’ingénierie et code d’exception.',
    summaryEn: 'Passionate software craftspeople bringing deep field expertise, architectural rigor, and code quality.',
    detailsFr: [
      'Parties prenantes de la réussite des projets, avec une culture du résultat et du travail bien fait',
      'Pratiques Craft au cœur du quotidien : Clean Code, TDD, DDD, revues de code et automatisation CI/CD',
      'Architecture résiliente : microservices, event-driven (Kafka), Cloud Native (Kubernetes, Docker)',
    ],
    detailsEn: [
      'True co-owners of project outcomes with uncompromising standards of software craftsmanship',
      'Daily Craft practices: Clean Code, Test-Driven Design, Domain-Driven Design, and CI/CD pipelines',
      'Resilient architectures: distributed microservices, event-driven streaming, and Cloud Native Kubernetes',
    ],
  },
  {
    id: 'communities',
    num: '05',
    titleFr: 'Un engagement dans les communautés tech',
    titleEn: 'Commitment to the tech ecosystem',
    summaryFr: 'Contributions open-source majeures, keynotes aux plus grandes conférences et partage désintéressé.',
    summaryEn: 'Major open-source contributions, keynote speaker leadership, and active knowledge sharing.',
    detailsFr: [
      'Animation et leadership actif de communautés techniques, meetups et conférences (Devoxx, KubeCon)',
      'Contributions open-source reconnues et publications de livres blancs techniques de référence',
      'Transmission et partage du savoir : académies de formation certifiantes et mentorat continu',
    ],
    detailsEn: [
      'Organizing and leading major tech meetups and keynoting world-class conferences (Devoxx, KubeCon)',
      'Authoring open-source frameworks, benchmark whitepapers, and technical reference guides',
      'Knowledge sharing at the core: official training academy, team mentoring, and tech talks',
    ],
  },
];

export const ValueBridgeScrollSection: React.FC<ValueBridgeScrollSectionProps> = ({ lang }) => {
  // Version switcher : 'v2' (Parallaxe 3 slides d'après la maquette) ou 'v1' (Accordéon 5 piliers)
  const [version, setVersion] = useState<'v1' | 'v2'>('v2');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section
      id="mission-critical-promise"
      className="relative bg-white dark:bg-[#07090E] border-t border-slate-200 dark:border-white/10 transition-colors"
    >
      {/* ============================================================= */}
      {/* TEST TEAM VERSION SWITCHER BUTTON                             */}
      {/* Permet de comparer et tester en 1 clic avec les équipes       */}
      {/* ============================================================= */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 gap-4 border-b border-slate-200/70 dark:border-white/10 relative z-30">
        <div className="flex items-center gap-2">
          <Sliders size={16} className="text-[#E60039]" />
          <span className="text-xs sm:text-sm font-mono font-bold text-slate-700 dark:text-slate-300">
            {lang === 'fr' ? 'Comparateur de maquette (Test équipe) :' : 'Design Comparator (Team Review):'}
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-slate-100 dark:bg-white/[0.08] border border-slate-300/80 dark:border-white/15 shadow-sm">
          <button
            onClick={() => setVersion('v1')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
              version === 'v1'
                ? 'bg-white dark:bg-[#1E2533] text-slate-950 dark:text-white shadow-sm border border-slate-200 dark:border-white/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>V1 : Accordéon (5 Piliers)</span>
          </button>

          <button
            onClick={() => setVersion('v2')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
              version === 'v2'
                ? 'bg-[#E60039] text-white shadow-md shadow-[#E60039]/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>V2 : Parallaxe 3 Slides (Maquette)</span>
          </button>
        </div>
      </div>

      {/* Conditionally render V2 (Parallaxe 3 slides) or V1 (Accordéon 5 piliers) */}
      {version === 'v2' ? (
        <ValueBridgeParallaxV2 lang={lang} />
      ) : (
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-start">
          
          {/* ============================================================= */}
          {/* LEFT COLUMN: TITLE & INTRO MATCHING USER SCREENSHOT EXACTLY  */}
          {/* ============================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-start space-y-6 lg:sticky lg:top-28"
          >
            {/* Eyebrow / Tag in red matching screenshot */}
            <div className="text-xs sm:text-sm font-mono font-bold tracking-wider text-[#E60039] uppercase">
              {lang === 'fr' ? '02 / NOTRE APPROCHE' : '02 / OUR APPROACH'}
            </div>

            {/* Headline with 3 punchy lines matching screenshot */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-6xl font-black font-display text-slate-950 dark:text-white tracking-tight leading-[1.08]">
              {lang === 'fr' ? (
                <>
                  <span className="block">De la méthode.</span>
                  <span className="block">De l’expertise.</span>
                  <span className="block">De l’engagement.</span>
                </>
              ) : (
                <>
                  <span className="block">Structure.</span>
                  <span className="block">Expertise.</span>
                  <span className="block">Commitment.</span>
                </>
              )}
            </h2>

            {/* Subtitle paragraph matching screenshot */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 font-sans leading-relaxed max-w-md">
              {lang === 'fr'
                ? 'Nous apportons structure, méthodologie et expertise dans les projets « mission critical ».'
                : 'We bring structure, methodology, and senior expertise to mission-critical initiatives.'}
            </p>
          </motion.div>

          {/* ============================================================= */}
          {/* RIGHT COLUMN: 5 ITEMS WITH DIVIDERS & PROGRESSIVE REVEAL     */}
          {/* ============================================================= */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-slate-200 dark:divide-white/10 border-y border-slate-200 dark:border-white/10">
            {APPROACH_ITEMS.map((item, index) => {
              const isExpanded = expandedId === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.08,
                  }}
                  className="group transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="w-full py-5 sm:py-6 lg:py-7 flex items-center justify-between gap-4 text-left cursor-pointer transition-all duration-200 select-none group"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-4 sm:gap-6 min-w-0 pr-2">
                      {/* Number in Zenika red */}
                      <span className="font-mono text-sm sm:text-base font-bold text-[#E60039] shrink-0 w-8 sm:w-10">
                        {item.num}
                      </span>

                      {/* Main Title matching screenshot */}
                      <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold font-display text-slate-900 dark:text-white group-hover:text-[#E60039] transition-colors leading-snug">
                        {lang === 'fr' ? item.titleFr : item.titleEn}
                      </h3>
                    </div>

                    {/* Expand icon / indicator */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isExpanded
                          ? 'bg-[#E60039] text-white rotate-180 shadow-md shadow-[#E60039]/25'
                          : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400 group-hover:bg-[#E60039]/10 group-hover:text-[#E60039]'
                      }`}
                    >
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  {/* Progressive details revealed on click / toggle */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-12 sm:pl-16 pr-2 pb-6 sm:pb-7 space-y-4">
                          <p className="text-sm sm:text-base font-sans italic text-slate-700 dark:text-slate-300 leading-relaxed">
                            "{lang === 'fr' ? item.summaryFr : item.summaryEn}"
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                            {(lang === 'fr' ? item.detailsFr : item.detailsEn).map((detail, dIdx) => (
                              <div
                                key={dIdx}
                                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] text-xs sm:text-[13px] text-slate-700 dark:text-slate-200"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E60039] mt-1.5 shrink-0" />
                                <span className="leading-relaxed">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
      )}
    </section>
  );
};
