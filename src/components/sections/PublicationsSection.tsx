import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, Download, CheckCircle2, User, BookOpen, Clock } from 'lucide-react';
import { Language } from '../../types';

interface PublicationCardData {
  id: string;
  badgeFr: string;
  badgeEn: string;
  titleFr: string;
  titleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  bgGradient: string;
  watermarkBg: string;
  summaryFr: string;
  summaryEn: string;
  readTimeFr: string;
  readTimeEn: string;
  authorFr: string;
  authorEn: string;
  keyPointsFr: string[];
  keyPointsEn: string[];
  outlineFr: string[];
  outlineEn: string[];
}

interface PublicationsSectionProps {
  lang: Language;
  onOpenContact?: () => void;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({
  lang,
  onOpenContact,
}) => {
  const [selectedPublication, setSelectedPublication] = useState<PublicationCardData | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const publications: PublicationCardData[] = [
    {
      id: 'pub-1',
      badgeFr: 'LIVRE BLANC',
      badgeEn: 'WHITE PAPER',
      titleFr: "Faire passer l'IA de l'expérimentation à l'échelle.",
      titleEn: "Scaling AI from experimentation to enterprise impact.",
      subtitleFr: "Gouvernance souveraine, RAG de production et maîtrise des coûts LLMOps.",
      subtitleEn: "Sovereign governance, production RAG, and LLMOps cost management.",
      bgGradient: 'bg-gradient-to-br from-[#F5A623] via-[#E89816] to-[#D98205]',
      watermarkBg: 'rgba(255, 255, 255, 0.14)',
      summaryFr: "Ce livre blanc décrypte les étapes indispensables pour franchir le fossé entre prototypes d’IA générative et plateformes critiques industrialisées en production : conformité AI Act, réduction de latence et fiabilisation des agents.",
      summaryEn: "This whitepaper decodes the essential steps to bridge the gap between generative AI prototypes and mission-critical production platforms: AI Act compliance, latency reduction, and agent reliability.",
      readTimeFr: '56 pages · PDF interactif',
      readTimeEn: '56 pages · Interactive PDF',
      authorFr: 'Squad Architecture IA & Data Zenika',
      authorEn: 'Zenika AI & Data Architecture Squad',
      keyPointsFr: [
        'Sécurisation des flux de données sensibles et déploiement souverain',
        'Benchmarks comparatifs des modèles open source vs API propriétaires',
        'FinOps appliqué aux clusters GPU et optimisation des tokens',
        'Framework d’observabilité et d’évaluation continue des agents',
      ],
      keyPointsEn: [
        'Sensitive data flow security and sovereign on-prem/hybrid deployment',
        'Comparative benchmarks of open-source models vs proprietary APIs',
        'FinOps applied to GPU clusters and token usage optimization',
        'Continuous evaluation framework and agent observability',
      ],
      outlineFr: [
        '1. L’état de l’art de l’IA en entreprise en 2026',
        '2. L’architecture RAG hybride résiliente',
        '3. Guardrails éthiques et conformité européenne (AI Act)',
        '4. Déployer et opérer des agents en continu',
      ],
      outlineEn: [
        '1. State of Enterprise AI in 2026',
        '2. Resilient Hybrid RAG Architecture',
        '3. Ethical Guardrails and EU AI Act Compliance',
        '4. Deploying and Operating Autonomous Agents',
      ],
    },
    {
      id: 'pub-2',
      badgeFr: 'COMPARAISON',
      badgeEn: 'COMPARISON',
      titleFr: 'AI + SDLC : augmenter le delivery sans perdre le contrôle.',
      titleEn: 'AI + SDLC: augmenting delivery without losing control.',
      subtitleFr: 'Orchestration d’agents de dev, tests automatisés et hygiène de code.',
      subtitleEn: 'Dev agent orchestration, automated testing, and codebase hygiene.',
      bgGradient: 'bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9]',
      watermarkBg: 'rgba(255, 255, 255, 0.14)',
      summaryFr: "Une étude comparative méthodique sur l'impact de l'IA générative à chaque étape du cycle de vie logiciel (SDLC) : vélocité réelle vs dette technique masquée, et recettes éprouvées d’équipes expertes.",
      summaryEn: "A methodical comparative study on the impact of GenAI across each phase of the Software Development Life Cycle (SDLC): actual velocity gains vs hidden technical debt, and proven rituals from senior squads.",
      readTimeFr: '38 pages · Benchmark & REX',
      readTimeEn: '38 pages · Benchmark & Field Report',
      authorFr: 'Guilde Software Craftsmanship Zenika',
      authorEn: 'Zenika Software Craftsmanship Guild',
      keyPointsFr: [
        'Comparatif des agents de code (Cursor, Copilot, Cline, augmentations locales)',
        'Impact réel sur les métriques DORA (Lead Time, Change Failure Rate)',
        'Garantir la maintenabilité du code généré par IA grâce au TDD',
        'Rôle pivot des Tech Leads dans la validation architecturale',
      ],
      keyPointsEn: [
        'Comparative matrix of coding agents (Cursor, Copilot, Cline, local models)',
        'Quantified impact on DORA metrics (Lead Time, Change Failure Rate)',
        'Ensuring maintainability of AI-generated code via TDD discipline',
        'The pivotal role of Tech Leads in architectural governance',
      ],
      outlineFr: [
        '1. Les 4 stades d’adoption de l’IA dans le SDLC',
        '2. Mesures d’impact et métriques DORA sur 12 projets réels',
        '3. Préserver la qualité : le Craft face au volume de code généré',
        '4. Recommandations concrètes pour DSI et CTO',
      ],
      outlineEn: [
        '1. The 4 stages of AI adoption across the SDLC',
        '2. Measurable impact and DORA benchmarks across 12 live client projects',
        '3. Preserving craft against the flood of generated code',
        '4. Actionable recommendations for CIOs and CTOs',
      ],
    },
    {
      id: 'pub-3',
      badgeFr: 'POINT DE VUE',
      badgeEn: 'PERSPECTIVE',
      titleFr: 'CxO Advisory : décider dans la complexité technologique.',
      titleEn: 'CxO Advisory: deciding amidst technological complexity.',
      subtitleFr: 'Repères stratégiques pour aligner arbitrages tech et impact business.',
      subtitleEn: 'Strategic markers aligning architectural decisions with business ROI.',
      bgGradient: 'bg-gradient-to-br from-[#0284C7] via-[#0284C7] to-[#0369A1]',
      watermarkBg: 'rgba(255, 255, 255, 0.14)',
      summaryFr: "Ce document de prospective stratégique offre aux décideurs IT (CIO, CTO, CDO) des grilles d'arbitrage pragmatiques face au renouvellement du legacy, aux coûts Cloud/FinOps et aux ruptures technologiques émergentes.",
      summaryEn: "This strategic advisory brief equips IT leaders (CIO, CTO, CDO) with pragmatic decision matrices regarding legacy modernization, Cloud/FinOps cost containment, and emerging architectural breakthroughs.",
      readTimeFr: '32 pages · Guide Exécutif',
      readTimeEn: '32 pages · Executive Brief',
      authorFr: 'Direction Conseil & Stratégie Zenika',
      authorEn: 'Zenika Advisory & Strategy Leadership',
      keyPointsFr: [
        'Matrice d’arbitrage : moderniser, refondre ou isoler l’existant legacy',
        'FinOps & souveraineté : sortir des pièges de dépendance éditeur',
        'Aligner culture d’entreprise, organisation en Team Topologies et delivery',
        'L’artisanat logiciel comme rempart contre l’obsolescence précoce',
      ],
      keyPointsEn: [
        'Decision matrix: modernize, rewrite, or encapsulate legacy systems',
        'FinOps & digital sovereignty: avoiding proprietary vendor lock-in',
        'Harmonizing culture, Team Topologies, and agile product delivery',
        'Software craftsmanship as the ultimate hedge against early obsolescence',
      ],
      outlineFr: [
        '1. L’équation des DSI en 2026 : innover sous contrainte budgétaire',
        '2. Désengager le legacy par étapes maîtrisées',
        '3. Choix technologiques souverains et pérennes',
        '4. Bâtir les 20 prochaines années d’un Système d’Information',
      ],
      outlineEn: [
        '1. The CIO equation in 2026: innovating under cost constraints',
        '2. De-risking legacy transitions in iterative stages',
        '3. Sovereign and future-proof architectural choices',
        '4. Engineering the next 20 years of your Information System',
      ],
    },
  ];

  const handleDownload = (id: string) => {
    setDownloadSuccessId(id);
    setTimeout(() => {
      setDownloadSuccessId(null);
    }, 3500);
  };

  return (
    <section
      id="publications"
      className="relative z-10 py-16 sm:py-24 bg-white dark:bg-[#07090E] border-t border-slate-200 dark:border-white/10 transition-colors"
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* SUR-TITRE STRICTEMENT CONFORME À LA MAQUETTE : 05 / PUBLICATIONS & INFOS  */}
        {/* ========================================================================= */}
        <div className="mb-5 sm:mb-6">
          <span className="text-xs sm:text-sm font-mono font-bold tracking-wider text-[#E60039] uppercase">
            05 / PUBLICATIONS & INFOS
          </span>
        </div>

        {/* ========================================================================= */}
        {/* EN-TÊTE EN 2 COLONNES STRICTEMENT CONFORME À LA MAQUETTE                  */}
        {/* GAUCHE : "Nos convictions en mouvement."                                  */}
        {/* DROITE : "Des ressources conçues pour celles et ceux..."                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <h2 className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[68px] font-black font-display text-slate-950 dark:text-white tracking-tight leading-[1.04]">
              {lang === 'fr' ? (
                <>
                  Nos convictions<br />
                  en mouvement.
                </>
              ) : (
                <>
                  Our convictions<br />
                  in motion.
                </>
              )}
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pl-4">
            <p className="text-base sm:text-lg lg:text-[20px] xl:text-[22px] text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              {lang === 'fr'
                ? 'Des ressources conçues pour celles et ceux qui désirent piloter sereinement leur transition numérique.'
                : 'Resources tailored for leaders seeking to steer their digital transformation with confidence.'}
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* GRILLE DES 3 CARTES PUBLICATIONS CONFORME À LA MAQUETTE                   */}
        {/* Carte 1 : Jaune ambre (LIVRE BLANC)                                       */}
        {/* Carte 2 : Violet royal (COMPARAISON)                                      */}
        {/* Carte 3 : Bleu électrique (POINT DE VUE)                                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {publications.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              onClick={() => setSelectedPublication(item)}
              className={`relative overflow-hidden rounded-[26px] sm:rounded-[32px] p-7 sm:p-9 text-white ${item.bgGradient} shadow-md hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between min-h-[380px] sm:min-h-[420px] group`}
            >
              {/* Forme graphique géométrique en filigrane dans le coin inférieur droit */}
              <div 
                className="absolute -bottom-6 -right-6 w-40 h-40 sm:w-48 sm:h-48 pointer-events-none rounded-tl-[48px] transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: item.watermarkBg,
                }}
              />
              <div 
                className="absolute -bottom-14 -right-14 w-28 h-28 pointer-events-none rounded-tl-[36px]"
                style={{
                  background: item.watermarkBg,
                }}
              />

              {/* Partie supérieure de la carte */}
              <div className="relative z-10">
                {/* Badge pilule translucide en haut à gauche */}
                <div className="mb-6 sm:mb-8">
                  <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/25 backdrop-blur-md text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-white shadow-xs">
                    {lang === 'fr' ? item.badgeFr : item.badgeEn}
                  </span>
                </div>

                {/* Titre blanc très gras */}
                <h3 className="text-2xl sm:text-3xl lg:text-[31px] xl:text-[33px] font-black font-display tracking-tight leading-[1.14] text-white">
                  {lang === 'fr' ? item.titleFr : item.titleEn}
                </h3>
              </div>

              {/* Pied de carte avec "Consulter la publication" et bouton flèche ↗ */}
              <div className="relative z-10 flex items-center justify-between pt-8 sm:pt-10 mt-auto">
                <span className="text-sm sm:text-base font-semibold text-white/95 group-hover:underline underline-offset-4 decoration-white/60 transition-all">
                  {lang === 'fr' ? 'Consulter la publication' : 'View publication'}
                </span>

                {/* Bouton rond avec flèche inclinée ↗ */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-sm group-hover:bg-white group-hover:text-slate-900 group-hover:scale-110 transition-all">
                  <ArrowUpRight size={20} strokeWidth={2.6} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODALE DE CONSULTATION DU DOCUMENT (PROTOTYPE INTERACTIF)                 */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedPublication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 cursor-pointer"
            onClick={() => setSelectedPublication(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 cursor-default"
            >
              {/* Header modale avec badge coloré */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 uppercase">
                  {lang === 'fr' ? selectedPublication.badgeFr : selectedPublication.badgeEn}
                </span>

                <button
                  onClick={() => setSelectedPublication(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Fermer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Titre et détails */}
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-950 dark:text-white leading-tight">
                  {lang === 'fr' ? selectedPublication.titleFr : selectedPublication.titleEn}
                </h3>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {lang === 'fr' ? selectedPublication.subtitleFr : selectedPublication.subtitleEn}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
                  <span>{lang === 'fr' ? selectedPublication.authorFr : selectedPublication.authorEn}</span>
                  <span>•</span>
                  <span>{lang === 'fr' ? selectedPublication.readTimeFr : selectedPublication.readTimeEn}</span>
                </div>
              </div>

              {/* Résumé */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans bg-slate-50 dark:bg-white/[0.03] p-4 rounded-2xl border border-slate-200/60 dark:border-white/5">
                {lang === 'fr' ? selectedPublication.summaryFr : selectedPublication.summaryEn}
              </p>

              {/* Points clés */}
              <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E60039]">
                  {lang === 'fr' ? 'Ce que vous découvrirez dans ce document :' : 'What you will discover inside:'}
                </h4>
                <div className="space-y-2">
                  {(lang === 'fr' ? selectedPublication.keyPointsFr : selectedPublication.keyPointsEn).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans">
                      <CheckCircle2 size={15} className="text-[#E60039] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sommaire */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {lang === 'fr' ? 'Sommaire de la publication :' : 'Publication outline:'}
                </h4>
                <div className="space-y-1.5">
                  {(lang === 'fr' ? selectedPublication.outlineFr : selectedPublication.outlineEn).map((chapter, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-white/5 text-xs font-mono text-slate-800 dark:text-slate-200">
                      {chapter}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions de la modale */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
                <button
                  onClick={() => handleDownload(selectedPublication.id)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#E60039] text-white font-mono text-xs font-bold uppercase hover:bg-[#FF4D79] transition-all cursor-pointer shadow-md"
                >
                  <Download size={14} />
                  <span>
                    {downloadSuccessId === selectedPublication.id 
                      ? (lang === 'fr' ? 'Document téléchargé !' : 'Document downloaded!') 
                      : (lang === 'fr' ? 'Télécharger la publication (PDF)' : 'Download publication (PDF)')}
                  </span>
                </button>

                {onOpenContact && (
                  <button
                    onClick={() => {
                      setSelectedPublication(null);
                      onOpenContact();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white font-mono text-xs font-bold hover:bg-slate-200 dark:hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <span>{lang === 'fr' ? 'Échanger avec nos auteurs' : 'Briefing with our authors'}</span>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PublicationsSection;
