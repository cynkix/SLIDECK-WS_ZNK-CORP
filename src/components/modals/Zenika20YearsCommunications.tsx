import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Award, Heart, Share2, Users, ArrowUpRight, 
  Terminal, ShieldCheck, MapPin, Rocket, CheckCircle2, 
  ChevronRight, X, ExternalLink, MessageSquare, Copy, Check
} from 'lucide-react';
import { Language } from '../../types';
import { Zenika20YearsLogo } from '../brand/Zenika20YearsLogo';

// High-fidelity photographic assets
import imgManifesto from '../../assets/images/zenika_advisory_vision_1788525128241.jpg';
import imgTeamReel from '../../assets/images/zenika_team_reel_1788513802230.jpg';
import imgAcademy from '../../assets/images/zenika_academy_share_1788525165084.jpg';
import imgConsultants from '../../assets/images/zenika_consultants_1788513838189.jpg';
import imgCraft from '../../assets/images/zenika_craftsman_1788513818775.jpg';
import imgStrike from '../../assets/images/zenika_strike_teams_1788525145849.jpg';
import imgAgencies from '../../assets/images/zenika_event_panorama_1790086745807.jpg';
import imgFuture from '../../assets/images/zenika_trainer_1788513864996.jpg';

interface CommunicationPoster {
  id: string;
  sourceRef: string; // e.g. "Plan de travail 4", "1ZNKrh", "3bisZNKrh"
  category: 'manifesto' | 'culture' | 'craft' | 'future';
  badgeFr: string;
  badgeEn: string;
  titleFr: string;
  titleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  bodyFr: string;
  bodyEn: string;
  quoteFr: string;
  quoteEn: string;
  author: string;
  stats: { labelFr: string; labelEn: string; value: string }[];
  tags: string[];
  image: string;
  accentColor: string;
}

interface Zenika20YearsCommunicationsProps {
  lang: Language;
  onOpenContact?: () => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const Zenika20YearsCommunications: React.FC<Zenika20YearsCommunicationsProps> = ({
  lang,
  onOpenContact,
  isModal = false,
  onClose,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'manifesto' | 'culture' | 'craft' | 'future'>('all');
  const [activePoster, setActivePoster] = useState<CommunicationPoster | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activePoster) {
          setActivePoster(null);
        } else if (isModal && onClose) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePoster, isModal, onClose]);

  const posters: CommunicationPoster[] = [
    {
      id: 'poster-1',
      sourceRef: 'Plan de travail 4 · Affiche 01',
      category: 'manifesto',
      badgeFr: 'Manifeste Fondateur · 2006 — 2026',
      badgeEn: 'Founding Manifesto · 2006 — 2026',
      titleFr: '20 ans d’audace, de passion et de code',
      titleEn: '20 years of audacity, passion and code',
      subtitleFr: 'De la révolution Agile en 2006 aux architectures agentiques de 2026.',
      subtitleEn: 'From the Agile dawn in 2006 to sovereign agentic architectures in 2026.',
      bodyFr: 'Zenika est né avec une conviction inaltérable : réconcilier l’excellence de l’artisanat logiciel et l’épanouissement humain. En deux décennies, nous avons refusé tout compromis sur la qualité, accompagnant nos clients dans toutes les grandes mutations sans jamais perdre notre esprit libre.',
      bodyEn: 'Zenika was born with an unwavering conviction: uniting software craftsmanship excellence with genuine human fulfillment. Over two decades, we stood firm on technical mastery, guiding partners through seismic shifts without ever conceding our independent spirit.',
      quoteFr: '“Nous ne vendons pas des heures, nous co-bâtissons des systèmes pérennes avec celles et ceux qui fabriquent la tech.”',
      quoteEn: '“We do not sell hours; we co-engineer enduring architectures alongside those who shape technology.”',
      author: 'Carl Azoury — Fondateur de Zenika',
      stats: [
        { labelFr: 'Années d’Excellence', labelEn: 'Years of Craft', value: '20 ans' },
        { labelFr: 'Indépendance', labelEn: 'Independence', value: '100%' },
        { labelFr: 'Piliers Stratégiques', labelEn: 'Core Pillars', value: '3 Axes' },
      ],
      tags: ['Manifeste 20 ans', 'Depuis 2006', 'Culture Craft', 'Souveraineté'],
      image: imgManifesto,
      accentColor: '#E60039',
    },
    {
      id: 'poster-2',
      sourceRef: '1ZNKrh · Affiche 02',
      category: 'culture',
      badgeFr: 'Culture d’Entreprise & Z-Team',
      badgeEn: 'Culture & Z-Team DNA',
      titleFr: 'L’humain comme moteur : 20 ans sans compromis',
      titleEn: 'People-first engine: 20 years without compromise',
      subtitleFr: 'Une communauté d’artisans où l’autonomie et la bienveillance priment.',
      subtitleEn: 'A collective of craftsmen where autonomy and genuine empathy lead.',
      bodyFr: 'Chez Zenika, pas de strates managériales opaques. Chaque consultant dispose du temps et du soutien pour explorer, prototyper et transmettre. Coding dojos hebdomadaires, BBLs quotidiens et reconnaissance Great Place to Work témoignent d’un environnement d’émulation unique en Europe.',
      bodyEn: 'At Zenika, hierarchical bureaucracy does not exist. Every engineer gets dedicated focus time to research, experiment, and share. Weekly coding dojos, peer Brown Bag Lunches, and our Great Place to Work heritage make it a peerless engineering sanctuary.',
      quoteFr: '“Chez Zenika, la liberté d’apprendre et d’expérimenter n’est pas un avantage d’entreprise, c’est notre oxygène.”',
      quoteEn: '“At Zenika, the freedom to learn and experiment is not an HR perk — it is our lifeblood.”',
      author: 'Collectif RH & Consultants Zenika',
      stats: [
        { labelFr: 'Consultants passionnés', labelEn: 'Passionate crafts', value: '500+' },
        { labelFr: 'Label Employeur', labelEn: 'Culture Award', value: 'N°1 GPTW' },
        { labelFr: 'Échanges internes / an', labelEn: 'Knowledge sessions', value: '1 200+' },
      ],
      tags: ['Great Place to Work', 'Management Horizontal', 'BBL & Dojo', 'Épanouissement'],
      image: imgTeamReel,
      accentColor: '#F59E0B',
    },
    {
      id: 'poster-3',
      sourceRef: '3bisZNKrh · Affiche 03',
      category: 'culture',
      badgeFr: 'Transmission & Open Source',
      badgeEn: 'Knowledge Sharing & Open Source',
      titleFr: 'Partager d’abord, bâtir ensemble',
      titleEn: 'Share first, engineer together',
      subtitleFr: 'Le savoir ne grandit que s’il est partagé sans réserve avec l’écosystème.',
      subtitleEn: 'Knowledge only flourishes when freely transmitted across the ecosystem.',
      bodyFr: 'Dès 2006, nos consultants montaient sur les scènes des grandes conférences mondiales (Devoxx, MixIT, DevFest, SpringOne) pour diffuser les meilleures pratiques. Avec la Zenika Academy, nous formons chaque année des milliers d’ingénieurs aux standards les plus exigeants.',
      bodyEn: 'Since 2006, our engineers have headlined major tech stages worldwide to champion cutting-edge patterns. Through the Zenika Academy, we elevate thousands of developers yearly to the highest industry standards.',
      quoteFr: '“Donner avant de recevoir : l’Open Source est notre culture native, pas une stratégie marketing.”',
      quoteEn: '“Give before you take: Open Source is our native DNA, not a promotional slogan.”',
      author: 'Zenika Academy & DevRel Guild',
      stats: [
        { labelFr: 'Talks & conférences / an', labelEn: 'Keynotes & talks / yr', value: '200+' },
        { labelFr: 'Professionnels formés', labelEn: 'Trained professionals', value: '25 000+' },
        { labelFr: 'Projets Open Source', labelEn: 'Open Source repos', value: '180+' },
      ],
      tags: ['Open Source', 'Zenika Academy', 'Conférences', 'Partage Libre'],
      image: imgAcademy,
      accentColor: '#10B981',
    },
    {
      id: 'poster-4',
      sourceRef: '4ZNKrh · Affiche 04',
      category: 'culture',
      badgeFr: 'Trajectoires & Intrapreneuriat',
      badgeEn: 'Trajectories & Intrapreneurship',
      titleFr: 'Devenez l’artisan de votre trajectoire',
      titleEn: 'Craft your own career trajectory',
      subtitleFr: 'Ouvrir une agence, lancer un Solution Block, enseigner : zéro barrière.',
      subtitleEn: 'Found an agency, spawn a Solution Block, teach: zero glass ceilings.',
      bodyFr: 'Presque la totalité des agences régionales et internationales de Zenika ont été fondées par des consultants du terrain. Nous donnons aux bâtisseurs les moyens financiers, juridiques et techniques de concrétiser leurs ambitions entrepreneuriales au sein de notre collectif.',
      bodyEn: 'Nearly all regional and international Zenika hubs were founded by engineers from the field. We empower technical builders with the capital, governance, and network to turn intrapreneurial visions into reality.',
      quoteFr: '“L’intrapreneuriat chez nous, c’est avoir du skin in the game et la fierté de bâtir sa propre équipe locale.”',
      quoteEn: '“Intrapreneurship here means having skin in the game and the pride of growing your own local squad.”',
      author: 'Directeurs d’Agences & Intrapreneurs',
      stats: [
        { labelFr: 'Agences fondées par les pairs', labelEn: 'Offices founded by peers', value: '15 Agences' },
        { labelFr: 'Solution Blocks créés', labelEn: 'Modular blocks crafted', value: '17 Blocks' },
        { labelFr: 'Ancrage territorial', labelEn: 'Continents active', value: '3 Régions' },
      ],
      tags: ['Intrapreneuriat', 'Skin In The Game', 'Leadership Craft', 'Croissance'],
      image: imgConsultants,
      accentColor: '#06B6D4',
    },
    {
      id: 'poster-5',
      sourceRef: 'Plan de travail 4 copie 2 · Affiche 05',
      category: 'craft',
      badgeFr: 'Software Craftsmanship & Zéro Dette',
      badgeEn: 'Software Craftsmanship & Zero Debt',
      titleFr: 'Le Craft n’est pas une posture, c’est un serment',
      titleEn: 'Craft is not a posture, it is a covenant',
      subtitleFr: 'La dette technique n’est pas une fatalité. C’est un choix d’exigence.',
      subtitleEn: 'Technical debt is not destiny. It is a daily standard of engineering rigor.',
      bodyFr: 'Test-Driven Development (TDD), architectures découplées, Clean Code, réusinage continu et observabilité de bout en bout. Nous construisons des systèmes critiques conçus pour évoluer pendant 20 ans sans jamais s’enliser.',
      bodyEn: 'Test-Driven Development (TDD), decoupled domain architectures, Clean Code, and continuous refactoring. We build mission-critical systems designed to flourish for 20 years without architectural rot.',
      quoteFr: '“Un code bien conçu coûte moins cher à maintenir sur 10 ans qu’un raccourci bricolé en 1 mois.”',
      quoteEn: '“Thoughtfully crafted code costs significantly less over a decade than a rushed shortcut built in a month.”',
      author: 'Guilde Craftsmanship Zenika',
      stats: [
        { labelFr: 'Engagement qualité', labelEn: 'Quality commitment', value: 'Zéro dette' },
        { labelFr: 'Pérennité des socles', labelEn: 'Architecture lifecycle', value: '10 à 20 ans' },
        { labelFr: 'Automatisation CI/CD', labelEn: 'Automated testing', value: '100%' },
      ],
      tags: ['Software Craftsmanship', 'TDD & Clean Code', 'Architecture Pérenne', 'Excellence'],
      image: imgCraft,
      accentColor: '#8B5CF6',
    },
    {
      id: 'poster-6',
      sourceRef: 'Plan de travail 4 copie 3 · Affiche 06',
      category: 'craft',
      badgeFr: 'IA Souveraine & Systèmes Critiques',
      badgeEn: 'Sovereign AI & Critical Systems',
      titleFr: 'Bâtir l’IA Souveraine des 20 prochaines années',
      titleEn: 'Building Sovereign AI for the next 20 years',
      subtitleFr: 'L’Intelligence Artificielle ne vaut que si vous restez maîtres de votre destin.',
      subtitleEn: 'Artificial Intelligence only holds value if you keep absolute command of your destiny.',
      bodyFr: 'Face aux modèles opaques et à l’hégémonie captive, Zenika déploie des architectures d’IA souveraines : modèles ouverts auto-hébergés, agents autonomes orchestrés, RAG étanches et gouvernance éthique dans le respect des données stratégiques.',
      bodyEn: 'Against opaque lock-in and dependency, Zenika engineers sovereign enterprise AI: self-hosted open models, deterministic agentic workflows, air-gapped enterprise RAG, and ethical governance safeguarding strategic IP.',
      quoteFr: '“L’IA n’est pas une boîte magique : c’est une brique d’ingénierie qui doit être souveraine et auditable.”',
      quoteEn: '“AI is no black magic: it is an engineering cornerstone that must remain sovereign and auditable.”',
      author: 'Zenika AI Labs & Cloud Architects',
      stats: [
        { labelFr: 'Souveraineté des modèles', labelEn: 'Sovereign IP control', value: '100% Maîtrisé' },
        { labelFr: 'Solution Blocks IA', labelEn: 'Dedicated AI Blocks', value: '4 Modules' },
        { labelFr: 'Conformité EU AI Act', labelEn: 'Compliance readiness', value: 'Certifié' },
      ],
      tags: ['IA Souveraine', 'Agents Autonomes', 'Open Weights', 'Éthique DecenZ'],
      image: imgStrike,
      accentColor: '#EC4899',
    },
    {
      id: 'poster-7',
      sourceRef: 'Plan de travail 4 copie 5 · Affiche 07',
      category: 'future',
      badgeFr: 'Proximité & Réseau Décentralisé',
      badgeEn: 'Proximity & Decentralized Network',
      titleFr: 'La force d’un réseau, l’âme d’un collectif local',
      titleEn: 'Network strength, local studio soul',
      subtitleFr: 'De Paris à Casablanca, de Rennes à Singapour : un écosystème à taille humaine.',
      subtitleEn: 'From Paris to Casablanca, Rennes to Singapore: a human-scale ecosystem.',
      bodyFr: 'Nos agences ne sont pas des bureaux de vente mais de vrais tiers-lieux technologiques ancrés dans leurs métropoles. Les équipes locales décident en direct, garantissant réactivité immédiate et proximité affective avec nos clients.',
      bodyEn: 'Our regional agencies are genuine engineering hubs deeply rooted in their tech communities. Local squads hold full decision authority, ensuring immediate agility and close, lasting partnerships.',
      quoteFr: '“La proximité ne se décrète pas depuis un siège parisien : elle se vit chaque jour dans les agences avec nos clients.”',
      quoteEn: '“Proximity cannot be dictated from a distant boardroom: it is lived daily in our local hubs alongside our clients.”',
      author: 'Directeurs d’Agences Zenika',
      stats: [
        { labelFr: 'Agences en activité', labelEn: 'Operational hubs', value: '15 Agences' },
        { labelFr: 'Temps de réponse local', labelEn: 'Local turnaround', value: '< 24h' },
        { labelFr: 'Ancrage régional', labelEn: 'Regional footstep', value: '3 Continents' },
      ],
      tags: ['15 Agences', 'Circuit Court', 'Tiers-Lieux Tech', 'Proximité'],
      image: imgAgencies,
      accentColor: '#06B6D4',
    },
    {
      id: 'poster-8',
      sourceRef: 'Plan de travail 4 copie 6 · Affiche 08',
      category: 'future',
      badgeFr: 'Vision 2026 — 2046',
      badgeEn: 'Vision 2026 — 2046',
      titleFr: 'Ensemble, écrivons les 20 prochaines années',
      titleEn: 'Together, let’s author the next 20 years',
      subtitleFr: 'Le meilleur moyen de prédire le futur technologique, c’est de le coder.',
      subtitleEn: 'The most reliable way to predict the future of technology is to code it.',
      bodyFr: 'La prochaine décennie appartiendra à ceux qui sauront conjuguer sobriété écologique, souveraineté numérique et accélération de l’IA. Zenika est prêt à relever ces défis avec vous, avec la même flamme qu’au premier jour de 2006.',
      bodyEn: 'The coming decades will reward those who harmonize ecological frugality, digital sovereignty, and agentic AI momentum. Zenika is primed to tackle these frontiers alongside you, with the same burning craft that sparked us in 2006.',
      quoteFr: '“Nos 20 premières années n’étaient qu’un échauffement. L’avenir appartient aux bâtisseurs de sens.”',
      quoteEn: '“Our first 20 years were merely the prologue. The future belongs to those who build with purpose.”',
      author: 'L’ensemble des 500+ collaborateurs Zenika',
      stats: [
        { labelFr: 'Horizon de vision', labelEn: 'Vision horizon', value: '2026 — 2046' },
        { labelFr: 'Énergie & engagement', labelEn: 'Dedication rate', value: '100% Passion' },
        { labelFr: 'Prochaine étape', labelEn: 'Next milestone', value: 'Co-création' },
      ],
      tags: ['Futur du SI', '2026 — 2046', 'Sobriété & DecenZ', 'Co-construction'],
      image: imgFuture,
      accentColor: '#E60039',
    },
  ];

  const filteredPosters = selectedFilter === 'all'
    ? posters
    : posters.filter(p => p.category === selectedFilter);

  const handleCopyManifesto = (poster: CommunicationPoster) => {
    const textToCopy = `${poster.titleFr.toUpperCase()}\n${poster.subtitleFr}\n\n${poster.bodyFr}\n\n${poster.quoteFr} — ${poster.author}\n\nZenika 20 ans (2006 — 2026) · https://zenika.com`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(poster.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const mainContent = (
    <>
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADER: INSPIRATION COMMUNICATIONS 20 ANS                         */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 shadow-sm mb-5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E60039] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E60039]" />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-slate-800 dark:text-white">
              {lang === 'fr' ? 'Édition 20 Ans · Nos Communications & Affiches' : '20-Year Edition · Official Campaign & Posters'}
            </span>
          </div>

          <div className="mb-4">
            <Zenika20YearsLogo height={44} showSubtext={true} className="drop-shadow-sm scale-105" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
            {lang === 'fr' ? (
              <>
                Les créations qui racontent nos <span className="text-[#E60039]">20 ans</span> de passion
              </>
            ) : (
              <>
                The visuals celebrating our <span className="text-[#E60039]">20 years</span> of craft
              </>
            )}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {lang === 'fr'
              ? 'Inspirées de nos plans de travail officiels et de nos communications internes (ZNK-RH), voici les 8 affiches emblématiques qui forgent l’esprit Zenika : culture craft, transmission libre et audace technologique.'
              : 'Drawn from our official design artboards and internal culture campaigns (ZNK-RH), these 8 flagship posters capture Zenika’s essence: craft mastery, open transmission, and sovereign boldness.'}
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-8 p-1.5 bg-slate-200/80 dark:bg-white/[0.05] rounded-2xl border border-slate-300/80 dark:border-white/10 backdrop-blur-md">
            {[
              { id: 'all', labelFr: 'Toutes les affiches (8)', labelEn: 'All Posters (8)' },
              { id: 'manifesto', labelFr: 'Manifeste (1)', labelEn: 'Manifesto (1)' },
              { id: 'culture', labelFr: 'Culture & RH (3)', labelEn: 'Culture & People (3)' },
              { id: 'craft', labelFr: 'Craft & IA (2)', labelEn: 'Craft & AI (2)' },
              { id: 'future', labelFr: 'Réseau & Futur (2)', labelEn: 'Network & Future (2)' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-white dark:bg-[#1E2638] text-slate-900 dark:text-white shadow-md border border-slate-200/90 dark:border-white/15'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
                }`}
              >
                {lang === 'fr' ? tab.labelFr : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* POSTERS GRID (8 CARDS)                                                    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredPosters.map((poster, pIdx) => {
            return (
              <motion.div
                key={poster.id}
                layout
                role="button"
                tabIndex={0}
                aria-label={lang === 'fr' ? `Agrandir l'affiche : ${poster.titleFr}` : `Enlarge poster: ${poster.titleEn}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeInOut', delay: pIdx * 0.05 }}
                onClick={() => setActivePoster(poster)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActivePoster(poster);
                  }
                }}
                className="group relative bg-white dark:bg-[#0E131E] rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#E60039]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#E60039]/50"
              >
                {/* Visual Artboard Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={poster.image}
                    alt={lang === 'fr' ? poster.titleFr : poster.titleEn}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  {/* Top Bar with Artboard Ref */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white border border-white/15">
                      {poster.sourceRef}
                    </span>
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full text-white shadow"
                      style={{ backgroundColor: poster.accentColor }}
                    >
                      {poster.stats[0].value}
                    </span>
                  </div>

                  {/* Bottom title in preview */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-[11px] font-mono text-white/80 uppercase tracking-wider mb-1 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: poster.accentColor }} />
                      <span>{lang === 'fr' ? poster.badgeFr : poster.badgeEn}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold font-display text-white leading-snug drop-shadow-md group-hover:text-red-300 transition-colors">
                      {lang === 'fr' ? poster.titleFr : poster.titleEn}
                    </h3>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {lang === 'fr' ? poster.bodyFr : poster.bodyEn}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                      <div className="text-[11px] italic text-slate-700 dark:text-slate-300 line-clamp-2">
                        {lang === 'fr' ? poster.quoteFr : poster.quoteEn}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1 font-medium truncate">
                        — {poster.author}
                      </div>
                    </div>
                  </div>

                  {/* Footer & CTA */}
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      <span>{poster.stats[1].labelFr}:</span>
                      <strong className="text-slate-900 dark:text-white">{poster.stats[1].value}</strong>
                    </div>

                    <div className="flex items-center gap-1 text-[#E60039] font-mono text-xs group-hover:translate-x-0.5 transition-transform">
                      <span>{lang === 'fr' ? 'Agrandir l’affiche' : 'View Poster'}</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner with Action Call */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-[#121624] to-slate-950 text-white border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#E60039]/20 border border-[#E60039]/40 flex items-center justify-center shrink-0">
              <Sparkles size={28} className="text-[#E60039]" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold font-display text-white">
                {lang === 'fr'
                  ? 'Vous souhaitez célébrer ou co-construire les 20 prochaines années avec nous ?'
                  : 'Ready to celebrate or engineer the next 20 years with us?'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {lang === 'fr'
                  ? 'Nos experts, squads d’élite et formateurs sont mobilisés sur toute la France et à l’international.'
                  : 'Our craft experts, elite squads, and trainers are mobilized across France and worldwide.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenContact && onOpenContact()}
              className="px-5 py-2.5 rounded-xl bg-[#E60039] hover:bg-[#FF1A4D] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-[#E60039]/30 transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <span>{lang === 'fr' ? 'Échanger avec un artisan Zenika' : 'Talk with a Zenika Craftsman'}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DETAILED POSTER MODAL (FULL ARTBOARD VIEW)                                */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activePoster && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              role="presentation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePoster(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-4xl bg-white dark:bg-[#0B0F19] rounded-3xl border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden z-10 my-auto text-left"
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePoster(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>

              <div className="grid md:grid-cols-12 max-h-[85vh] overflow-y-auto">
                {/* Poster Graphic Artwork Left Column */}
                <div className="md:col-span-5 relative bg-slate-950 flex flex-col justify-between p-6 sm:p-8 overflow-hidden min-h-[320px]">
                  <img
                    src={activePoster.image}
                    alt={activePoster.titleFr}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

                  {/* Vector Graphic Accents */}
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/70 bg-white/10 px-2.5 py-1 rounded border border-white/10">
                        {activePoster.sourceRef}
                      </span>
                      <div className="p-1 rounded-lg bg-white/10 backdrop-blur-sm">
                        <Zenika20YearsLogo height={24} theme="dark" showSubtext={false} />
                      </div>
                    </div>

                    <div className="pt-4">
                      <div
                        className="text-xs font-mono font-bold uppercase tracking-wider mb-2"
                        style={{ color: activePoster.accentColor }}
                      >
                        {lang === 'fr' ? activePoster.badgeFr : activePoster.badgeEn}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black font-display text-white leading-tight">
                        {lang === 'fr' ? activePoster.titleFr : activePoster.titleEn}
                      </h3>
                    </div>
                  </div>

                  {/* Stamp & Seal in Artwork */}
                  <div className="relative z-10 pt-6 mt-6 border-t border-white/15 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-white/60 uppercase">Période</div>
                      <div className="text-xs font-mono font-bold text-white">2006 — 2026</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-white/60 uppercase">Édition</div>
                      <div className="text-xs font-mono font-bold text-[#E60039]">20 Ans Zenika</div>
                    </div>
                  </div>
                </div>

                {/* Poster Editorial Content Right Column */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white leading-snug">
                        {lang === 'fr' ? activePoster.subtitleFr : activePoster.subtitleEn}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
                        {lang === 'fr' ? activePoster.bodyFr : activePoster.bodyEn}
                      </p>
                    </div>

                    {/* Authentic Quote Box */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 relative">
                      <p className="text-xs sm:text-sm italic font-medium text-slate-800 dark:text-slate-200 leading-snug">
                        {lang === 'fr' ? activePoster.quoteFr : activePoster.quoteEn}
                      </p>
                      <div className="text-xs font-mono text-[#E60039] font-bold mt-2">
                        — {activePoster.author}
                      </div>
                    </div>

                    {/* 3 Metric Pills */}
                    <div className="grid grid-cols-3 gap-2.5 pt-1">
                      {activePoster.stats.map((stat, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 text-center"
                        >
                          <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white">
                            {stat.value}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {lang === 'fr' ? stat.labelFr : stat.labelEn}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activePoster.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Modal Action Bar */}
                  <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => handleCopyManifesto(activePoster)}
                      className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedId === activePoster.id ? (
                        <>
                          <Check size={14} className="text-emerald-500" />
                          <span>Copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copier le texte</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActivePoster(null);
                          if (onOpenContact) onOpenContact();
                        }}
                        className="px-4 py-2 rounded-xl bg-[#E60039] hover:bg-[#FF1A4D] text-white text-xs font-semibold shadow-md shadow-[#E60039]/25 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{lang === 'fr' ? 'Discuter de cet enjeu' : 'Discuss this pillar'}</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
        <div className="relative w-full max-w-[1640px] max-h-[92vh] overflow-y-auto bg-slate-100 dark:bg-[#07090F] rounded-3xl border border-slate-300 dark:border-white/15 shadow-2xl p-4 sm:p-8">
          <div className="flex justify-end mb-2 sticky top-0 z-30">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-slate-900/90 hover:bg-[#E60039] text-white flex items-center justify-center border border-white/20 shadow-xl cursor-pointer transition-colors"
              aria-label="Fermer la galerie"
            >
              <X size={20} />
            </button>
          </div>
          {mainContent}
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-slate-100/70 dark:bg-[#07090F] border-t border-slate-200 dark:border-white/10 relative overflow-hidden transition-colors duration-200">
      {mainContent}
    </section>
  );
};
