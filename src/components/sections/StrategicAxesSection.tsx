import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import {
  Layers,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Sparkles,
  Zap,
  Shield,
  Cpu,
  Users,
  Database,
  RefreshCw,
  Server,
  FileCheck,
  Check,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Target,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Language, SolutionBlock } from '../../types';
import { SOLUTION_BLOCKS } from '../../data/zenikaData';
import {
  ZenikaComplexityIcon,
  ZenikaPillarsIcon,
  ZenikaRoiIcon,
} from '../brand';

interface StrategicAxesSectionProps {
  lang: Language;
  onOpenContact: (customAssembly?: SolutionBlock[]) => void;
  selectedAssembly?: SolutionBlock[];
  onToggleAssembly?: (block: SolutionBlock) => void;
}

type StrategicAxisId = 'optimiser' | 'innover' | 'transformer';

// -----------------------------------------------------------------------------
// Strategic Axes & Color Gradient System
// Left column (Frictions): Solid left color
// Center column (Pillars): Directional gradient
// Right column (ROI / Value): Solid right color
// -----------------------------------------------------------------------------
const AXIS_COLOR_SYSTEM: Record<
  StrategicAxisId,
  {
    leftSolidColor: string;
    rightSolidColor: string;
    centerGradient: string;
    label: string;
  }
> = {
  optimiser: {
    leftSolidColor: '#CF0537',
    rightSolidColor: '#BF1D67',
    centerGradient: 'linear-gradient(86.23deg, #EE2238 6.17%, rgba(191, 29, 103, 0.867) 93.8%)',
    label: 'OPTIMISER',
  },
  innover: {
    leftSolidColor: '#F39719',
    rightSolidColor: '#E84B58',
    centerGradient: 'linear-gradient(87.05deg, #F39719 6.63%, #E84B58 95.08%)',
    label: 'INNOVER',
  },
  transformer: {
    leftSolidColor: '#5374B4',
    rightSolidColor: '#8B5CF6',
    centerGradient: 'linear-gradient(87.41deg, #5374B4 4.31%, rgba(139, 92, 246, 0.667) 95.67%)',
    label: 'TRANSFORMER',
  },
};

interface AxisOffer {
  id: string;
  titleFr: string;
  titleEn: string;
  typeFr: 'Conseil & Audit' | 'Réalisation' | 'Formation' | 'Architecture';
  typeEn: 'Advisory & Audit' | 'Engineering' | 'Training' | 'Architecture';
  subtitleFr: string;
  subtitleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  pointsFr: string[];
  pointsEn: string[];
  metric: string;
  metricLabelFr: string;
  metricLabelEn: string;
  linkedSolutionBlockId?: string;
  tags: string[];
}

export const StrategicAxesSection: React.FC<StrategicAxesSectionProps> = ({
  lang,
  onOpenContact,
  selectedAssembly = [],
  onToggleAssembly
}) => {
  const [activeAxis, setActiveAxis] = useState<StrategicAxisId>('optimiser');
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [sentenceProgress, setSentenceProgress] = useState<number>(0);
  const [isRunwayActive, setIsRunwayActive] = useState<boolean>(false);
  const [hoveredFriction, setHoveredFriction] = useState<string | null>(null);
  const [hoveredOutcome, setHoveredOutcome] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [modalOffer, setModalOffer] = useState<{ offer: AxisOffer; axis: StrategicAxisId } | null>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);
  const [showClickAnimation, setShowClickAnimation] = useState<boolean>(true);
  const [expandedAxes, setExpandedAxes] = useState<Record<StrategicAxisId, boolean>>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return {
        optimiser: false,
        innover: false,
        transformer: false,
      };
    }
    return {
      optimiser: true,
      innover: false,
      transformer: false,
    };
  });

  const toggleAxis = (axisId: StrategicAxisId) => {
    setExpandedAxes(prev => {
      const willBeOpen = !prev[axisId];
      if (isMobile && willBeOpen) {
        return {
          optimiser: axisId === 'optimiser',
          innover: axisId === 'innover',
          transformer: axisId === 'transformer',
        };
      }
      return {
        ...prev,
        [axisId]: willBeOpen,
      };
    });
    setActiveAxis(axisId);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOffer(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const runwayRef = useRef<HTMLDivElement>(null);
  const manualLockUntilRef = useRef<number>(0);

  // Parallaxe douce au début de la section "La valeur ajoutée Zenika" :
  // Le centre (Optimiser, Innover, Transformer) arrive en premier, immédiatement lisible et mis en valeur.
  // Les deux colonnes latérales (Complexités à gauche et Gains/ROI à droite) glissent ensuite en douceur pour compléter le tableau.
  const { scrollYProgress: runwayScrollY } = useScroll({
    target: runwayRef,
    offset: ['start start', 'end end'],
  });

  const smoothRunway = useSpring(runwayScrollY, {
    stiffness: 70,
    damping: 26,
    mass: 0.8,
    restDelta: 0.0005,
  });

  // Séquence orchestrée selon la demande de l'utilisateur :
  // 1. EN PREMIER : Les 3 blocs sont affichés EN PREMIER (tous les 3 immédiatement visibles, comme sur la maquette)
  const centerColOpacity = 1;
  const centerColY = 0;
  const centerColScale = 1;

  // 2. Les colonnes latérales (gauche Frictions et droite ROI) arrivent ensuite au scroll pour compléter le tableau
  const rawSideHeadersOpacity = useTransform(smoothRunway, [0.03, 0.16], [0, 1]);
  const sideHeadersY = useTransform(smoothRunway, [0.03, 0.16], [10, 0]);

  const rawLeftColX = useTransform(smoothRunway, [0.04, 0.18], [-36, 0]);
  const rawLeftColOpacity = useTransform(smoothRunway, [0.04, 0.18], [0, 1]);
  const leftColY = useTransform(smoothRunway, [0.04, 0.18], [12, 0]);
  const leftColScale = useTransform(smoothRunway, [0.04, 0.18], [0.98, 1]);

  const rawRightColX = useTransform(smoothRunway, [0.04, 0.18], [36, 0]);
  const rawRightColOpacity = useTransform(smoothRunway, [0.04, 0.18], [0, 1]);
  const rightColY = useTransform(smoothRunway, [0.04, 0.18], [12, 0]);
  const rightColScale = useTransform(smoothRunway, [0.04, 0.18], [0.98, 1]);

  // Si l'utilisateur clique sur un pilier pour interagir ou sur mobile, révéler immédiatement les colonnes latérales
  const sideHeadersOpacity = hasUserInteracted || isMobile ? 1 : rawSideHeadersOpacity;
  const leftColX = isMobile ? 0 : (hasUserInteracted ? 0 : rawLeftColX);
  const leftColOpacity = hasUserInteracted || isMobile ? 1 : rawLeftColOpacity;
  const leftColYVal = isMobile ? 0 : leftColY;
  const leftColScaleVal = isMobile ? 1 : leftColScale;

  const rightColX = isMobile ? 0 : (hasUserInteracted ? 0 : rawRightColX);
  const rightColOpacity = hasUserInteracted || isMobile ? 1 : rawRightColOpacity;
  const rightColYVal = isMobile ? 0 : rightColY;
  const rightColScaleVal = isMobile ? 1 : rightColScale;

  const titleParallaxY = 0;
  const titleParallaxOpacity = 1;

  const jumpToStep = useCallback((step: 1 | 2 | 3, smoothScroll: boolean = true) => {
    manualLockUntilRef.current = Date.now() + 1500;
    setActiveStep(step);
    const axisId: StrategicAxisId = step === 1 ? 'optimiser' : step === 2 ? 'innover' : 'transformer';
    setActiveAxis(axisId);

    if (smoothScroll && runwayRef.current && window.innerWidth >= 1024) {
      const rect = runwayRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const runwayTop = currentScrollY + rect.top;
      const runwayHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = runwayHeight - viewportHeight;

      if (scrollableDistance > 0) {
        // Step centers: 1 -> ~15%, 2 -> ~50%, 3 -> ~85%
        const targetPct = step === 1 ? 0.15 : step === 2 ? 0.50 : 0.85;
        const targetY = runwayTop + targetPct * scrollableDistance;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setExpandedAxes(prev => {
          // If all are already closed, keep as is
          if (!prev.optimiser && !prev.innover && !prev.transformer) return prev;
          return {
            optimiser: false,
            innover: false,
            transformer: false,
          };
        });
      }
    };
    checkMobile();

    let ticking = false;

    const updateScrollMetrics = () => {
      // On mobile screens (< 1024px), skip desktop sticky runway scroll hijacking
      // Touch tabs and direct actions provide an ergonomic, native mobile experience
      if (window.innerWidth < 1024) return;

      if (!runwayRef.current) return;
      const rect = runwayRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Si l'utilisateur a cliqué manuellement récemment, respecter son choix
      if (Date.now() < manualLockUntilRef.current) {
        return;
      }

      // Synchronisation au scroll sur les 280vh de runway avec position fixe centrée
      const totalScrollable = rect.height - vh;
      if (totalScrollable > 0) {
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
        setScrollProgress(progress);

        if (rect.top <= vh * 0.35 && rect.bottom >= vh * 0.15) {
          setIsRunwayActive(true);

          if (progress < 0.34) {
            setActiveStep(1);
            setActiveAxis('optimiser');
          } else if (progress < 0.68) {
            setActiveStep(2);
            setActiveAxis('innover');
          } else {
            setActiveStep(3);
            setActiveAxis('transformer');
          }
        }
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollMetrics();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      checkMobile();
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    updateScrollMetrics();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 1. Complexités constatées (Left column - from slide)
  const complexityItems = [
    {
      id: 'c-data',
      labelFr: 'Données fragmentées',
      labelEn: 'Fragmented Data',
      detailFr: 'Données en silos, référentiels dispersés et inexploitables pour l’IA agentique.',
      detailEn: 'Siloed data repositories unprepared for real-time and agentic processing.',
      resolvedBy: 'innover' as StrategicAxisId,
      yieldsOutcome: 'o-pertinence'
    },
    {
      id: 'c-legacy',
      labelFr: 'Systèmes legacy',
      labelEn: 'Legacy Systems',
      detailFr: 'Monolithes vieillissants générant dette technique et lenteurs d’évolution.',
      detailEn: 'Monolithic legacy architectures accumulating technical debt and slowness.',
      resolvedBy: 'optimiser' as StrategicAxisId,
      yieldsOutcome: 'o-securite'
    },
    {
      id: 'c-millefeuille',
      labelFr: 'Architecture mille-feuilles',
      labelEn: 'Sprawling Layered Architecture',
      detailFr: 'Empilement hétérogène de briques sans gouvernance globale unifiée.',
      detailEn: 'Heterogeneous tool sprawl and overlapping architectural components.',
      resolvedBy: 'optimiser' as StrategicAxisId,
      yieldsOutcome: 'o-ttm'
    },
    {
      id: 'c-silos',
      labelFr: 'Silos organisationnels',
      labelEn: 'Organizational Silos',
      detailFr: 'Ruptures entre équipes métier, produit, dev et exploitation IT.',
      detailEn: 'Frictions between business units, product, dev and ops teams.',
      resolvedBy: 'transformer' as StrategicAxisId,
      yieldsOutcome: 'o-alignement'
    },
    {
      id: 'c-transfo',
      labelFr: 'Transformation permanente',
      labelEn: 'Continuous Transformation',
      detailFr: 'Multiplication des ruptures technologiques provoquant fatigue et perte de cap.',
      detailEn: 'Fast-paced tech shifts creating team fatigue and loss of strategic clarity.',
      resolvedBy: 'transformer' as StrategicAxisId,
      yieldsOutcome: 'o-innovation'
    },
    {
      id: 'c-complexite',
      labelFr: 'Complexité croissante',
      labelEn: 'Growing Complexity',
      detailFr: 'Prolifération du Cloud, des microservices et des nouveaux modèles d’IA.',
      detailEn: 'Unchecked sprawl across Cloud, microservices, and AI models.',
      resolvedBy: 'innover' as StrategicAxisId,
      yieldsOutcome: 'o-ia'
    },
    {
      id: 'c-couts',
      labelFr: 'Pression sur les coûts',
      labelEn: 'Cost Pressures & FinOps',
      detailFr: 'Flambée des factures Cloud et coûts d’inférence LLM non maîtrisés.',
      detailEn: 'Runaway cloud bills and unmonitored AI token inference costs.',
      resolvedBy: 'optimiser' as StrategicAxisId,
      yieldsOutcome: 'o-alignement'
    }
  ];

  // 2. Les 3 Axes Stratégiques (Center column - from slide)
  const axesConfig: Record<
    StrategicAxisId,
    {
      title: string;
      titleEn: string;
      taglineFr: string;
      taglineEn: string;
      color: string;
      accentBg: string;
      borderActive: string;
      textActive: string;
      number: string;
      headlineFr: string;
      headlineEn: string;
      statsBadgeFr: string;
      statsBadgeEn: string;
      offers: AxisOffer[];
    }
  > = {
    optimiser: {
      title: 'OPTIMISER',
      titleEn: 'OPTIMIZE',
      taglineFr: 'les actifs logiciels, les process, la valeur du SI',
      taglineEn: 'software assets, processes, and IT value',
      color: '#EE2238',
      accentBg: 'bg-[#CF0537]',
      borderActive: 'border-[#CF0537]',
      textActive: 'text-[#CF0537]',
      number: '01',
      headlineFr: 'Sécuriser le socle, résorber la dette technique et démultiplier la vélocité de delivery.',
      headlineEn: 'Hardening the core, curbing tech debt, and accelerating delivery throughput.',
      statsBadgeFr: '-40% Dette · x2.5 Vélocité · FinOps maîtrisé',
      statsBadgeEn: '-40% Debt · 2.5x Velocity · Controlled FinOps',
      offers: [
        {
          id: 'off-legacy-modernization',
          titleFr: 'Modernisation & Découplage du Legacy',
          titleEn: 'Legacy Modernization & Decoupling',
          typeFr: 'Réalisation',
          typeEn: 'Engineering',
          subtitleFr: 'Passez du monolithe rigide à une architecture modulaire fluide',
          subtitleEn: 'Transition from rigid monoliths to a resilient modular architecture',
          descriptionFr: 'Sécurisation des flux critiques existants, refactoring incrémental guidé par le Domaine (DDD), pattern étrangleur (Strangler Fig) et suppression des goulets d’étranglement sans interruption de service.',
          descriptionEn: 'Hardening existing critical flows, incremental Domain-Driven Design (DDD) refactoring, strangler fig patterns, and removing bottlenecks without service disruption.',
          pointsFr: [
            'Cartographie exhaustive des dépendances et flux métiers critiques',
            'Refactoring chirurgical assisté par l’IA et documentation vivante',
            'Découplage en APIs / micro-services et tests d’architecture automatisés'
          ],
          pointsEn: [
            'Exhaustive dependency mapping and mission-critical business flow auditing',
            'AI-assisted surgical refactoring and living documentation',
            'API decoupling, microservices migration, and automated architecture tests'
          ],
          metric: '-40%',
          metricLabelFr: 'Dette technique critique résorbée',
          metricLabelEn: 'Critical technical debt reduced',
          linkedSolutionBlockId: 'sol-legacy-value',
          tags: ['Legacy', 'Strangler Pattern', 'DDD', 'Résilience']
        },
        {
          id: 'off-ai-sdlc',
          titleFr: 'AI for IT : SDLC & Ops Augmentés',
          titleEn: 'AI for IT: Augmented SDLC & Ops',
          typeFr: 'Réalisation',
          typeEn: 'Engineering',
          subtitleFr: 'Intégration d’agents IA dans vos chaînes de conception et d’exploitation',
          subtitleEn: 'Embedding AI developer agents across coding and runtime operations',
          descriptionFr: 'Outillage de l’ensemble du cycle logiciel : génération et maintenance de tests unitaires, revue de code automatisée, détection de régressions et diagnostic prédictif des incidents de production.',
          descriptionEn: 'Turbocharge engineering cycles: automated test suite generation, PR reviews with AI agents, regression detection, and predictive incident telemetry.',
          pointsFr: [
            'Assistants et agents de code intégrés dans les IDEs et pipelines CI/CD',
            'Automatisation de la couverture de tests et assainissement du code',
            'Augmented Ops : Diagnostic automatisé et réduction du MTTR'
          ],
          pointsEn: [
            'Coding agents embedded directly in team IDEs and CI/CD pipelines',
            'Automated test coverage generation and code quality guardrails',
            'Augmented Ops: Fast telemetry root-cause analysis and lower MTTR'
          ],
          metric: 'x2.5',
          metricLabelFr: 'Vélocité de delivery d’ingénierie',
          metricLabelEn: 'Engineering delivery velocity',
          linkedSolutionBlockId: 'sol-ai-sdlc',
          tags: ['AI SDLC', 'Copilotes', 'CI/CD', 'Qualité Logicielle']
        },
        {
          id: 'off-finops-token',
          titleFr: 'FinOps Cloud & Gouvernance Token IA',
          titleEn: 'Cloud FinOps & GenAI Token Management',
          typeFr: 'Conseil & Audit',
          typeEn: 'Advisory & Audit',
          subtitleFr: 'Maîtrise fine des dépenses Cloud et optimisation du coût d’inférence LLM',
          subtitleEn: 'Fine-tuned cloud spend control and LLM inference cost optimization',
          descriptionFr: 'Audit et rationalisation de vos consommations Cloud, suppression du surdimensionnement (rightsizing), mise en place de politiques de caching sémantique et de sélection frugale des modèles IA.',
          descriptionEn: 'Rigorous audit of cloud infrastructure, compute rightsizing, semantic caching strategies, and cost-efficient LLM routing policies.',
          pointsFr: [
            'Audit complet des consommations AWS / GCP / Azure et licences',
            'Optimisation du coût d’inférence : prompts frugaux, SLMs et caching',
            'Tableaux de bord de pilotage unifié DSI & Finance en temps réel'
          ],
          pointsEn: [
            'Full cloud cost audit across AWS, GCP, Azure, and third-party SaaS',
            'Inference optimization: prompt compaction, SLM routing, semantic caching',
            'Unified C-Level & FinOps real-time monitoring dashboards'
          ],
          metric: '-30%',
          metricLabelFr: 'Facture Cloud & inférence optimisée',
          metricLabelEn: 'Optimized cloud & token spend',
          linkedSolutionBlockId: 'sol-cloud-forge',
          tags: ['FinOps', 'Token Management', 'Frugalité', 'Cloud Sovereignty']
        },
        {
          id: 'off-audit-perf',
          titleFr: 'Audit Architectural & Résilience Haute Dispo',
          titleEn: 'Architecture Review & High-Availability Resilience',
          typeFr: 'Architecture',
          typeEn: 'Architecture',
          subtitleFr: 'Fiabiliser les systèmes sous forte charge et éliminer les SPOF',
          subtitleEn: 'Eliminate single points of failure and sustain massive traffic peaks',
          descriptionFr: 'Diagnostic approfondi de votre architecture pour identifier les goulets d’étranglement, renforcer la sécurité applicative (DevSecOps) et garantir un SLA 99.99% sur vos services cœur de métier.',
          descriptionEn: 'Deep architectural health check to spot bottlenecks, inject DevSecOps guardrails, and secure 99.99% SLA across enterprise mission-critical core engines.',
          pointsFr: [
            'Analyse d’impact et de vulnérabilités sur les flux névralgiques',
            'Architecture événementielle résiliente (Kafka, RabbitMQ, EventMesh)',
            'Chaos Engineering et validation rigoureuse de la reprise d’activité'
          ],
          pointsEn: [
            'Impact and vulnerability diagnostics on core transaction paths',
            'Resilient event-driven architectures (Kafka, RabbitMQ, EventMesh)',
            'Chaos engineering drills and proven disaster recovery playbooks'
          ],
          metric: '99.99%',
          metricLabelFr: 'Disponibilité & zéro régression',
          metricLabelEn: 'Uptime and zero production regression',
          linkedSolutionBlockId: 'sol-legacy-value',
          tags: ['Architecture', 'Résilience', 'DevSecOps', 'Event-Driven']
        }
      ]
    },
    innover: {
      title: 'INNOVER',
      titleEn: 'INNOVATE',
      taglineFr: 'dans les solutions, les technologies, les méthodes',
      taglineEn: 'in solutions, emerging technologies, and methods',
      color: '#F39719',
      accentBg: 'bg-[#F39719]',
      borderActive: 'border-[#F39719]',
      textActive: 'text-[#F39719]',
      number: '02',
      headlineFr: 'Transformer l’IA et les technologies émergentes en nouveaux produits logiciels générateurs de revenus.',
      headlineEn: 'Harnessing AI and frontier technologies into software engines that drive revenue.',
      statsBadgeFr: 'x3 Time-to-Market · IA Agentique · POCs < 6 sem.',
      statsBadgeEn: '3x Time-to-Market · Agentic AI · POCs < 6 wks',
      offers: [
        {
          id: 'off-ai-biz-native',
          titleFr: 'Applications AI-Native & Expériences Métier',
          titleEn: 'AI-Native Applications & Business Experiences',
          typeFr: 'Réalisation',
          typeEn: 'Engineering',
          subtitleFr: 'Développement sur-mesure d’applications dopées à l’IA générative et agentique',
          subtitleEn: 'Bespoke development of generative and agentic AI-powered applications',
          descriptionFr: 'Conception de produits logiciels intégrant des systèmes multi-agents, de la recherche sémantique multimodale, du RAG d’entreprise sécurisé et des interfaces conversationnelles intuitives pour vos métiers.',
          descriptionEn: 'Designing full-stack software products with multi-agent orchestration, multimodal semantic search, enterprise-grade secure RAG, and fluid conversational interfaces.',
          pointsFr: [
            'Framework AI Multiplier : SHAPE (idéation), SHIP (craft), SYNC (industrialisation)',
            'RAG d’entreprise souverain connecté à vos données internes sensibles',
            'Agents autonomes réalisant des tâches complexes de validation métier'
          ],
          pointsEn: [
            'AI Multiplier Framework: SHAPE (discovery), SHIP (craft), SYNC (industrialization)',
            'Sovereign enterprise RAG securely linked to internal proprietary data',
            'Autonomous agents executing multi-step business approval workflows'
          ],
          metric: 'x3',
          metricLabelFr: 'Time-to-market produit raccourci',
          metricLabelEn: 'Faster product time-to-market',
          linkedSolutionBlockId: 'sol-ai-biz',
          tags: ['AI-Native', 'Multi-Agents', 'RAG Souverain', 'SHAPE x SHIP']
        },
        {
          id: 'off-agentic-platform',
          titleFr: 'Platform Engineering & Socles Agentiques',
          titleEn: 'Agentic Platform Engineering & DevEx',
          typeFr: 'Architecture',
          typeEn: 'Architecture',
          subtitleFr: 'Internal Developer Platforms prêtes pour l’orchestration multi-agents',
          subtitleEn: 'Internal Developer Platforms designed for multi-agent orchestration',
          descriptionFr: 'Bâtir des plateformes internes (IDP) en libre-service avec des guardrails de sécurité stricts, permettant aux équipes de prototyper et déployer des agents en production en quelques heures.',
          descriptionEn: 'Engineering self-service Internal Developer Platforms (IDP) with embedded security policies, empowering delivery squads to deploy AI agents in hours.',
          pointsFr: [
            'Portails développeurs (Backstage, Port) et catalogues de briques standardisées',
            'Infrastructure as Code (IaC) et déploiement continu d’environnements de test',
            'Monitoring des agents : traçabilité des prompts, latence et garde-fous éthiques'
          ],
          pointsEn: [
            'Internal developer portals and standardized service catalogs',
            'Infrastructure as Code (IaC) with instant test environment provisioning',
            'Agent observability: prompt tracing, latency budgets, and guardrail enforcement'
          ],
          metric: '< 6 sem.',
          metricLabelFr: 'Du prototype à l’échelle industrielle',
          metricLabelEn: 'From initial prototype to production scale',
          linkedSolutionBlockId: 'sol-platform-eng',
          tags: ['Platform Engineering', 'IDP', 'IaC', 'Agent Ops']
        },
        {
          id: 'off-data-readiness',
          titleFr: 'Data for Agentic AI Readiness',
          titleEn: 'Data for Agentic AI Readiness',
          typeFr: 'Architecture',
          typeEn: 'Architecture',
          subtitleFr: 'Données en temps réel, qualifiées et de confiance pour vos agents',
          subtitleEn: 'High-quality, real-time and trusted data pipelines for AI agents',
          descriptionFr: 'Modernisation des flux de données : streaming temps réel avec Kafka, vectorisation haute fidélité, lignage de données et modélisation Master Data pour alimenter fidèlement vos modèles.',
          descriptionEn: 'Modernizing data pipelines: real-time streaming via Kafka, vector indexing, robust data lineage, and Master Data governance to reliably feed AI models.',
          pointsFr: [
            'Master Data : Gouvernance et modélisation unifiée des référentiels métier',
            'Fresh Data : Pipelines temps réel pour décisions instantanées',
            'Trusted Data : Sécurité, conformité RGPD et auditabilité des sources'
          ],
          pointsEn: [
            'Master Data: Unified business domain modeling and clean registries',
            'Fresh Data: Real-time event streaming for zero-latency decisions',
            'Trusted Data: Security, GDPR compliance, and verifiable data lineage'
          ],
          metric: '100%',
          metricLabelFr: 'Données fiabilisées & traçables',
          metricLabelEn: 'Trusted & verifiable data assets',
          linkedSolutionBlockId: 'sol-data-agentic',
          tags: ['Data Readiness', 'Streaming Kafka', 'Vector DB', 'Trusted Data']
        },
        {
          id: 'off-poc-frontiers',
          titleFr: 'Strike Teams & Prototypage Industriel',
          titleEn: 'Strike Teams & Industrial Prototyping',
          typeFr: 'Réalisation',
          typeEn: 'Engineering',
          subtitleFr: 'Squads seniors dédiées pour valider vos cas d’usage à fort enjeu',
          subtitleEn: 'Senior squads dedicated to proving high-stakes technological hypotheses',
          descriptionFr: 'Dérisquez vos investissements grâce à des squads resserrées d’artisans logiciels et d’experts IA. Nous concevons des MVPs testés en conditions réelles auprès de vos utilisateurs métiers.',
          descriptionEn: 'De-risk bold investments through elite squads of software craftsmen and AI specialists, delivering production-grade MVPs tested directly with real users.',
          pointsFr: [
            'Validation rapide de la faisabilité technique et de la valeur économique',
            'Architecture propre dès le premier jour (pas de jetable, prêt pour la prod)',
            'Engagement au résultat sur les jalons critiques (skin in the game)'
          ],
          pointsEn: [
            'Fast verification of technical feasibility and measurable business ROI',
            'Clean architecture from day one (zero throwaway code, production-ready)',
            'Skin in the game contractual alignment on mission milestones'
          ],
          metric: '100%',
          metricLabelFr: 'Adoption métier démontrée',
          metricLabelEn: 'Validated user adoption rate',
          linkedSolutionBlockId: 'sol-custom-case',
          tags: ['Strike Teams', 'Prototypage', 'MVP', 'Craftsmanship']
        }
      ]
    },
    transformer: {
      title: 'TRANSFORMER',
      titleEn: 'TRANSFORM',
      taglineFr: 'l’organisation et sa culture, les compétences',
      taglineEn: 'organization, culture, and team competencies',
      color: '#5374B4',
      accentBg: 'bg-[#5374B4]',
      borderActive: 'border-[#5374B4]',
      textActive: 'text-[#5374B4]',
      number: '03',
      headlineFr: 'Diffuser l’excellence Craft, moderniser les modèles opérationnels et former les équipes à l’ère de l’IA.',
      headlineEn: 'Spreading Software Craftsmanship, modernizing operating models, and upskilling teams for AI.',
      statsBadgeFr: '1000+ Formés / an · DORA Elite · Team Topologies',
      statsBadgeEn: '1000+ Trained / yr · DORA Elite · Team Topologies',
      offers: [
        {
          id: 'off-operating-model',
          titleFr: 'Target Operating Model & Team Topologies',
          titleEn: 'Target Operating Model & Team Topologies',
          typeFr: 'Conseil & Audit',
          typeEn: 'Advisory & Audit',
          subtitleFr: 'Aligner la structure organisationnelle sur les flux de valeur métier',
          subtitleEn: 'Align organizational topology directly with business value streams',
          descriptionFr: 'Suppression des silos fonctionnels, mise en place des Team Topologies (Stream-aligned, Platform, Enabling), adoption des métriques DORA et clarification des rôles à l’ère de l’ingénierie augmentée.',
          descriptionEn: 'Breaking functional silos, establishing Team Topologies (Stream-aligned, Platform, Enabling), deploying DORA metrics, and redefining roles for augmented engineering.',
          pointsFr: [
            'Diagnostic de fluidité organisationnelle et cartographie des value streams',
            'Déploiement des Team Topologies pour responsabiliser les squads de delivery',
            'Mise en place des indicateurs DORA et pilotage par les résultats concrets'
          ],
          pointsEn: [
            'Organizational friction diagnostics and value stream flow mapping',
            'Team Topologies implementation to empower autonomous stream-aligned squads',
            'DORA metrics tracking and outcome-driven C-level governance'
          ],
          metric: 'Elite',
          metricLabelFr: 'Statut maturité DORA & agilité',
          metricLabelEn: 'DORA Elite maturity status',
          linkedSolutionBlockId: 'sol-team-topologies',
          tags: ['Team Topologies', 'DORA Metrics', 'Value Streams', 'Agilité']
        },
        {
          id: 'off-zenika-training',
          titleFr: 'Zenika Training : Académies & Upskilling IA',
          titleEn: 'Zenika Training: Academies & AI Upskilling',
          typeFr: 'Formation',
          typeEn: 'Training',
          subtitleFr: 'Parcours certifiants pour développeurs, architectes, data et leaders',
          subtitleEn: 'Certified curriculum for developers, architects, data engineers, and leaders',
          descriptionFr: 'Organisme de formation de référence depuis 2006. Des dizaines de cursus animés par nos consultants du terrain : IA générative pratique, architectures Cloud, Spring Boot, React, DevOps et Craftsmanship.',
          descriptionEn: 'Industry-leading certified training provider since 2006. Dozens of hands-on courses led by active practitioners: generative AI, cloud platforms, Spring, React, DevOps, and Craftsmanship.',
          pointsFr: [
            'Parcours C-Level & Managers : Décider et piloter des projets tech & IA',
            'Académies d’ingénieurs : Maîtriser le code augmenté, les tests et l’IA agentique',
            'Formations certifiantes partenaires : Google Cloud, AWS, GitHub, Confluent'
          ],
          pointsEn: [
            'Executive tracks: Leading and governing AI & modern software initiatives',
            'Engineering bootcamps: Mastering augmented coding, TDD, and agentic workflows',
            'Certified partner training: Google Cloud, AWS, GitHub, Confluent'
          ],
          metric: '1000+',
          metricLabelFr: 'Professionnels formés chaque année',
          metricLabelEn: 'Engineers trained each year',
          linkedSolutionBlockId: 'sol-zenika-training',
          tags: ['Zenika Training', 'Certifications', 'Upskilling IA', 'Qualiopi']
        },
        {
          id: 'off-craft-excellence',
          titleFr: 'Engineering Craftsmanship & Pratiques XP',
          titleEn: 'Engineering Craftsmanship & XP Practices',
          typeFr: 'Conseil & Audit',
          typeEn: 'Advisory & Audit',
          subtitleFr: 'Accompagner vos équipes vers une autonomie et une qualité de code sans compromis',
          subtitleEn: 'Mentoring in-house squads toward full autonomy and uncompromising code health',
          descriptionFr: 'Coaching technique et immersion en pair-programming au cœur de vos équipes. Diffusion des pratiques fondamentales : Test-Driven Development (TDD), Domain-Driven Design (DDD), Clean Architecture et revues collaboratives.',
          descriptionEn: 'Hands-on technical mentoring and pair-programming embedded within your squads. Instilling core engineering disciplines: TDD, DDD, Clean Architecture, and collaborative reviews.',
          pointsFr: [
            'Immersion de Tech Leads & Craftsmen Zenika dans vos squads',
            'DoJos de code réguliers, Katas d’architecture et ateliers d’acculturation',
            'Amélioration pérenne de la qualité logicielle et rétention des talents tech'
          ],
          pointsEn: [
            'Embedding Zenika Tech Leads and Craftsmen within internal delivery squads',
            'Regular coding dojos, architecture katas, and culture-sharing workshops',
            'Sustained software quality boost and higher engineering talent retention'
          ],
          metric: '98%',
          metricLabelFr: 'Rétention et satisfaction des développeurs',
          metricLabelEn: 'Developer retention and satisfaction',
          linkedSolutionBlockId: 'sol-lean-strike',
          tags: ['Craftsmanship', 'TDD', 'DDD', 'Pair Programming']
        },
        {
          id: 'off-governance-compliance',
          titleFr: 'Gouvernance IA Responsable & Conformité Souveraine',
          titleEn: 'Responsible AI Governance & Sovereign Compliance',
          typeFr: 'Conseil & Audit',
          typeEn: 'Advisory & Audit',
          subtitleFr: 'Anticiper l’IA Act, DORA, NIS2 et garantir la sécurité by design',
          subtitleEn: 'Comply with the EU AI Act, DORA, NIS2 and enforce security by design',
          descriptionFr: 'Mise en place d’un cadre d’audit et de gouvernance pour déployer l’IA et le Cloud en toute sérénité : classification des risques réglementaires, audit d’explicabilité, protection des données et souveraineté.',
          descriptionEn: 'Comprehensive governance framework to roll out AI and cloud solutions with confidence: regulatory risk classification, explainability audits, data sovereignty, and compliance guardrails.',
          pointsFr: [
            'Audit de conformité IA Act européen et classification des cas d’usage',
            'Sécurisation des architectures cloud et respect des normes DORA / NIS2',
            'Charte éthique, audit d’explicabilité et protection de la propriété intellectuelle'
          ],
          pointsEn: [
            'European AI Act compliance auditing and risk tier classification',
            'Cloud security hardening aligning with DORA and NIS2 mandates',
            'Ethical guidelines, explainability audits, and IP protection guardrails'
          ],
          metric: '100%',
          metricLabelFr: 'Conformité réglementaire garantie',
          metricLabelEn: 'Guaranteed regulatory compliance',
          linkedSolutionBlockId: 'sol-gov-compliance',
          tags: ['IA Act', 'DORA', 'NIS2', 'Souveraineté', 'Éthique']
        }
      ]
    }
  };

  // 3. Valeur Métier Mesurable (Right column - from slide)
  const roiOutcomes = [
    {
      id: 'o-alignement',
      labelFr: 'Alignement avec la stratégie d’entreprise',
      labelEn: 'Alignment with Corporate Strategy',
      metric: '100%',
      subFr: 'Chaque euro IT investi sert directement les objectifs stratégiques prioritaires.',
      subEn: 'Every IT dollar directly serves priority enterprise business targets.',
      linkedAxis: 'transformer' as StrategicAxisId
    },
    {
      id: 'o-securite',
      labelFr: 'Sécurité, conformité, durabilité',
      labelEn: 'Security, Compliance, Sustainability',
      metric: 'By Design',
      subFr: 'Respect strict de l’IA Act, DORA, NIS2 et empreinte carbone maîtrisée.',
      subEn: 'Strict compliance with AI Act, DORA, NIS2, and sustainable computing.',
      linkedAxis: 'optimiser' as StrategicAxisId
    },
    {
      id: 'o-pertinence',
      labelFr: 'Pertinence des logiciels pour les métiers',
      labelEn: 'Software Relevance for Business Users',
      metric: '+65%',
      subFr: 'Adoption immédiate par les équipes grâce au Product Discovery et au Craft.',
      subEn: 'Immediate adoption by operational teams through Product Discovery & Craft.',
      linkedAxis: 'innover' as StrategicAxisId
    },
    {
      id: 'o-ia',
      labelFr: 'Bénéfices tangibles de l’IA',
      labelEn: 'Tangible AI Business Benefits',
      metric: '< 6 sem.',
      subFr: 'Du cas d’usage au ROI opérationnel mesuré sans effets de mode sans lendemain.',
      subEn: 'From use-case discovery to measured ROI without throwaway hype.',
      linkedAxis: 'innover' as StrategicAxisId
    },
    {
      id: 'o-ttm',
      labelFr: 'Réduction du time-to-market',
      labelEn: 'Accelerated Time-to-Market',
      metric: 'x3',
      subFr: 'Livraisons continues et sécurisées grâce aux Strike Teams et au SDLC augmenté.',
      subEn: 'Continuous and secured releases powered by Strike Teams & augmented pipelines.',
      linkedAxis: 'optimiser' as StrategicAxisId
    },
    {
      id: 'o-innovation',
      labelFr: 'Innovation continue',
      labelEn: 'Continuous Innovation Engine',
      metric: '99.99%',
      subFr: 'Capacité à tester de nouveaux modèles tout en garantissant la résilience du SI.',
      subEn: 'Ability to experiment with frontier paradigms while securing core operations.',
      linkedAxis: 'transformer' as StrategicAxisId
    }
  ];

  const currentAxisData = axesConfig[activeAxis];

  const handleOpenContactWithOffer = (offer: AxisOffer) => {
    // Look up or synthesize a SolutionBlock
    const existingBlock = SOLUTION_BLOCKS.find(b => b.id === offer.linkedSolutionBlockId);
    if (existingBlock) {
      onOpenContact([existingBlock]);
    } else {
      const syntheticBlock: SolutionBlock = {
        id: offer.id,
        category: activeAxis === 'optimiser' ? 'core-expertise' : activeAxis === 'innover' ? 'business-impact' : 'methodology',
        tier: activeAxis === 'optimiser' ? 1 : activeAxis === 'innover' ? 1 : 2,
        title: offer.titleFr,
        titleEn: offer.titleEn,
        subtitle: offer.subtitleFr,
        subtitleEn: offer.subtitleEn,
        description: offer.descriptionFr,
        descriptionEn: offer.descriptionEn,
        bulletPoints: offer.pointsFr,
        bulletPointsEn: offer.pointsEn,
        color: currentAxisData.color,
        iconName: activeAxis === 'optimiser' ? 'Cpu' : activeAxis === 'innover' ? 'Sparkles' : 'Users',
        tags: offer.tags
      };
      onOpenContact([syntheticBlock]);
    }
  };

  const handleToggleAssemblyForOffer = (offer: AxisOffer) => {
    if (!onToggleAssembly) return;
    const existingBlock = SOLUTION_BLOCKS.find(b => b.id === offer.linkedSolutionBlockId);
    if (existingBlock) {
      onToggleAssembly(existingBlock);
    } else {
      const syntheticBlock: SolutionBlock = {
        id: offer.id,
        category: activeAxis === 'optimiser' ? 'core-expertise' : activeAxis === 'innover' ? 'business-impact' : 'methodology',
        tier: 1,
        title: offer.titleFr,
        titleEn: offer.titleEn,
        subtitle: offer.subtitleFr,
        subtitleEn: offer.subtitleEn,
        description: offer.descriptionFr,
        descriptionEn: offer.descriptionEn,
        bulletPoints: offer.pointsFr,
        bulletPointsEn: offer.pointsEn,
        color: currentAxisData.color,
        iconName: activeAxis === 'optimiser' ? 'Cpu' : activeAxis === 'innover' ? 'Sparkles' : 'Users',
        tags: offer.tags
      };
      onToggleAssembly(syntheticBlock);
    }
  };

  return (
    <section
      id="value-stream"
      className="relative z-10 w-full pt-2 sm:pt-4 pb-12 sm:pb-20 border-t border-slate-200 dark:border-white/10 overflow-x-clip scroll-mt-20 bg-slate-50/60 dark:bg-[#07090E]/80 transition-colors"
    >
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E60039]/5 dark:bg-[#E60039]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#8B5CF6]/5 dark:bg-[#8B5CF6]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* 3 PILIERS STRATÉGIQUES : RUNWAY PINNÉ CENTRÉ LE TEMPS DU SCROLL (DESKTOP ONLY) */}
        {/* ========================================================================= */}
        <div
          ref={runwayRef}
          className="hidden lg:block relative w-full pt-4"
          style={{ height: '280vh' }}
        >
          {/* ========================================================================= */}
          {/* VUE DESKTOP (lg+) : 3 COLONNES INTERACTIVES (COMPLEXITÉS | 3 PILIERS | ROI) */}
          {/* ========================================================================= */}
          <div className="sticky top-0 min-h-screen lg:h-screen w-full flex flex-col justify-center items-center z-30 py-4 sm:py-6 lg:py-8 xl:py-10 px-2 sm:px-4 bg-slate-50/95 dark:bg-[#07090E]/95 backdrop-blur-md transition-colors">
            <div className="w-full max-w-[1660px] mx-auto flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6">
              
              {/* Titre unique et descriptif de la valeur ajoutée Zenika & 3 piliers */}
              <motion.div 
                style={{ y: titleParallaxY, opacity: titleParallaxOpacity }}
                className="text-center space-y-2 sm:space-y-2.5 pb-1 max-w-4xl mx-auto"
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[46px] font-black text-slate-900 dark:text-white font-display tracking-tight leading-tight">
                  {lang === 'fr' ? (
                    <>
                      La <span className="text-[#E60039] dark:text-[#FF385C]">« valeur ajoutée »</span> Zenika
                    </>
                  ) : (
                    <>
                      Zenika's <span className="text-[#E60039] dark:text-[#FF385C]">"added value"</span>
                    </>
                  )}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-200 max-w-3xl mx-auto font-medium leading-relaxed">
                  {lang === 'fr'
                    ? 'Structure et méthode, expertise, expérience pour maîtriser/dépasser cette complexité'
                    : 'Structure and method, expertise, and experience to master and transcend this complexity'}
                </p>
              </motion.div>

              <div className="rounded-2xl sm:rounded-3xl lg:rounded-[32px] bg-white dark:bg-[#090C15] border border-slate-200 dark:border-white/10 p-3.5 sm:p-7 lg:p-8 xl:p-10 shadow-2xl transition-colors overflow-hidden">
                {/* --------------------------------------------------------------------- */}
                {/* 3 COLONNES INTERACTIVES DU SLIDE : GAUCHE (COMPLEXITÉS) | CENTRE (3 PILIERS) | DROITE (ROI) */}
                {/* --------------------------------------------------------------------- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 xl:gap-8 items-stretch">
                  
                  {/* =================================================================== */}
                  {/* COLONNE 1 : COMPLEXITÉ CONSTATÉE (LEFT - 7 POINTS DE FRICTIONS)      */}
                  {/* =================================================================== */}
                  <motion.div 
                    style={{ x: leftColX, y: leftColYVal, opacity: leftColOpacity, scale: leftColScaleVal, transformOrigin: 'left center' }}
                    className="order-2 lg:order-1 lg:col-span-4 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      {/* Header Colonne Gauche : Titre card "Complexité constatée" avec nouvelle icône design Zenika */}
                      <motion.div 
                        style={{ opacity: sideHeadersOpacity, y: sideHeadersY }}
                        className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 mb-3 shadow-xs"
                      >
                        <ZenikaComplexityIcon size={34} className="shrink-0 shadow-xs" />
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xs sm:text-[13px] font-display font-extrabold uppercase tracking-wider text-slate-900 dark:text-white leading-tight">
                            {lang === 'fr' ? 'Complexité constatée' : 'Observed Complexity'}
                          </h3>
                          <p className="text-[11px] text-slate-500 dark:text-white/60 font-medium truncate mt-0.5">
                            {lang === 'fr' ? '7 points de blocage majeurs chez nos clients' : '7 major client friction points'}
                          </p>
                        </div>
                      </motion.div>

                      {/* 7 Frictions dans une colonne verticale fluide avec hauteur respirante */}
                      <div className="space-y-2.5 xl:space-y-3">
                        {complexityItems.map((item) => {
                          const resolvesWithActive = item.resolvedBy === activeAxis;
                          const itemTheme = AXIS_COLOR_SYSTEM[item.resolvedBy];
                          const activeTheme = AXIS_COLOR_SYSTEM[activeAxis];

                          return (
                            <button
                              type="button"
                              key={item.id}
                              onMouseEnter={() => {
                                setHoveredFriction(item.id);
                                setHoveredOutcome(item.yieldsOutcome);
                              }}
                              onMouseLeave={() => {
                                setHoveredFriction(null);
                                setHoveredOutcome(null);
                              }}
                              onClick={() => {
                                manualLockUntilRef.current = Date.now() + 3500;
                                setActiveAxis(item.resolvedBy);
                                setActiveStep(item.resolvedBy === 'optimiser' ? 1 : item.resolvedBy === 'innover' ? 2 : 3);
                                setHasUserInteracted(true);
                                setShowClickAnimation(false);
                              }}
                              className={`w-full p-2.5 sm:p-3 xl:p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                                resolvesWithActive
                                  ? 'text-white border-transparent shadow-md scale-[1.01]'
                                  : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#121622] dark:hover:bg-[#161c2b] border-slate-200 hover:border-slate-300 dark:border-white/5 dark:hover:border-white/20 text-slate-800 dark:text-slate-200 shadow-2xs'
                              }`}
                              style={
                                resolvesWithActive
                                  ? { backgroundColor: activeTheme.leftSolidColor }
                                  : undefined
                              }
                            >
                              <div className="flex items-center justify-between gap-1.5">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <span
                                    className="w-1.5 h-1.5 rounded-full shrink-0"
                                    style={{
                                      backgroundColor: resolvesWithActive
                                        ? '#FFFFFF'
                                        : itemTheme.leftSolidColor
                                    }}
                                  />
                                  <span className={`text-xs sm:text-[13px] font-bold font-display truncate ${resolvesWithActive ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                    {lang === 'fr' ? item.labelFr : item.labelEn}
                                  </span>
                                </div>
                                <span 
                                  className={`text-[9.5px] font-display font-bold px-1.5 py-0.5 rounded shrink-0 ${resolvesWithActive ? 'bg-white/20 text-white' : ''}`}
                                  style={!resolvesWithActive ? { backgroundColor: `${itemTheme.leftSolidColor}15`, color: itemTheme.leftSolidColor } : undefined}
                                >
                                  → {item.resolvedBy.toUpperCase()}
                                </span>
                              </div>
                              <p className={`text-[11px] sm:text-xs mt-1 pl-3 leading-relaxed line-clamp-2 ${resolvesWithActive ? 'text-white/90 font-normal' : 'text-slate-500 dark:text-white/60 font-light'}`}>
                                {lang === 'fr' ? item.detailFr : item.detailEn}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>

                  {/* =================================================================== */}
                  {/* COLONNE 2 : LES 3 AXES STRATÉGIQUES (CENTER - CŒUR DE L'OFFRE)       */}
                  {/* =================================================================== */}
                  <motion.div 
                    style={{ scale: centerColScale, y: centerColY, opacity: centerColOpacity, transformOrigin: 'center center' }}
                    className="order-1 lg:order-2 lg:col-span-4 flex flex-col justify-between space-y-3 relative"
                  >
                    {/* Halo d'ambiance doux centré derrière les cartes */}
                    <div 
                      aria-hidden="true" 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-56 rounded-full blur-[100px] pointer-events-none opacity-20 dark:opacity-25 transition-all duration-500"
                      style={{ background: AXIS_COLOR_SYSTEM[activeAxis].centerGradient }}
                    />

                    <div className="relative z-10 space-y-3">
                      {/* Header Colonne Centre : 3 Piliers Stratégiques avec nouvelle icône design Zenika */}
                      <div className="flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-2xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 shadow-xs mb-1">
                        <div className="flex items-center gap-3 min-w-0">
                          <ZenikaPillarsIcon size={34} className="shrink-0 shadow-xs" />
                          <div className="min-w-0 flex-1">
                            <h3 className="text-xs sm:text-[13px] font-display font-extrabold uppercase tracking-wider text-slate-900 dark:text-white leading-tight">
                              {lang === 'fr' ? '3 Piliers Stratégiques' : '3 Strategic Pillars'}
                            </h3>
                            <p className="text-[11px] text-slate-500 dark:text-white/60 font-medium truncate mt-0.5">
                              {lang === 'fr' ? 'La méthode et l’expertise Zenika' : 'Zenika methodology & expertise'}
                            </p>
                          </div>
                        </div>
                        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E60039]/10 text-[#E60039] text-[10px] font-mono font-bold tracking-wider uppercase border border-[#E60039]/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E60039] animate-pulse" />
                          {lang === 'fr' ? 'Interactif' : 'Interactive'}
                        </span>
                      </div>

                      {/* Les 3 Cartes Piliers : TOUTES LES 3 AFFICHÉES EN PREMIER, DÈS LE DÉPART */}
                      <div className="space-y-3.5 sm:space-y-4 xl:space-y-5">
                        {(['optimiser', 'innover', 'transformer'] as StrategicAxisId[]).map((axisKey, idx) => {
                          const conf = axesConfig[axisKey];
                          const isActive = activeAxis === axisKey;
                          const theme = AXIS_COLOR_SYSTEM[axisKey];
                          const axisNum = idx + 1;

                          return (
                            <motion.div
                              key={axisKey}
                              role="button"
                              tabIndex={0}
                              aria-label={`${conf.title} - ${lang === 'fr' ? 'Sélectionner le pilier' : 'Select pillar'}`}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  manualLockUntilRef.current = Date.now() + 3500;
                                  setActiveAxis(axisKey);
                                  setActiveStep(axisNum as 1 | 2 | 3);
                                  setHasUserInteracted(true);
                                  setShowClickAnimation(false);
                                }
                              }}
                              onClick={() => {
                                manualLockUntilRef.current = Date.now() + 3500;
                                setActiveAxis(axisKey);
                                setActiveStep(axisNum as 1 | 2 | 3);
                                setHasUserInteracted(true);
                                setShowClickAnimation(false);
                              }}
                              className={`group rounded-2xl px-5 py-6 sm:px-6 sm:py-7 xl:px-8 xl:py-8 text-center cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center will-change-transform ${
                                isActive
                                  ? 'shadow-2xl ring-3 ring-white/80 scale-[1.02] opacity-100 z-10 min-h-[160px] sm:min-h-[175px] xl:min-h-[195px]'
                                  : 'opacity-85 hover:opacity-100 hover:scale-[1.015] hover:shadow-xl min-h-[145px] sm:min-h-[160px] xl:min-h-[178px]'
                              }`}
                              style={{
                                background: theme.centerGradient,
                              }}
                            >
                              {/* Titre & Sous-titre */}
                              <div className="w-full space-y-1.5 sm:space-y-2">
                                <div className="flex items-center justify-center gap-2.5">
                                  <h4 className="text-2xl sm:text-3xl xl:text-4xl font-black font-display uppercase tracking-tight text-white drop-shadow-xs">
                                    {conf.title}
                                  </h4>
                                  {isActive && (
                                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                                  )}
                                </div>
                                <p className="text-xs sm:text-sm xl:text-[15px] font-medium text-white/95 italic leading-snug max-w-md mx-auto">
                                  {lang === 'fr' ? conf.taglineFr : conf.taglineEn}
                                </p>
                              </div>

                              {/* Ligne stats informative */}
                              <div className="mt-3 sm:mt-3.5 text-xs sm:text-sm font-display text-white/90 leading-tight">
                                {lang === 'fr' ? conf.statsBadgeFr : conf.statsBadgeEn}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>

                  {/* =================================================================== */}
                  {/* COLONNE 3 : VALEUR MÉTIER & ROI DÉBLOQUÉ (RIGHT - 6 IMPACTS CHIFFRÉS) */}
                  {/* =================================================================== */}
                  <motion.div 
                    style={{ x: rightColX, y: rightColYVal, opacity: rightColOpacity, scale: rightColScaleVal, transformOrigin: 'right center' }}
                    className="order-3 lg:order-3 lg:col-span-4 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      {/* Header Colonne Droite : Titre card "Valeur Métier & ROI" avec nouvelle icône design Zenika */}
                      <motion.div 
                        style={{ opacity: sideHeadersOpacity, y: sideHeadersY }}
                        className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 mb-3 shadow-xs"
                      >
                        <ZenikaRoiIcon size={34} className="shrink-0 shadow-xs" />
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xs sm:text-[13px] font-display font-extrabold uppercase tracking-wider text-slate-900 dark:text-white leading-tight">
                            {lang === 'fr' ? 'Valeur Métier & ROI' : 'Business Value & ROI'}
                          </h3>
                          <p className="text-[11px] text-slate-500 dark:text-white/60 font-medium truncate mt-0.5">
                            {lang === 'fr' ? '6 impacts concrets pour les DSI & Métiers' : '6 concrete impacts for CIOs & Business Units'}
                          </p>
                        </div>
                      </motion.div>

                      {/* 6 Measurable ROI Items dans une colonne verticale fluide avec respiration */}
                      <div className="space-y-2.5 xl:space-y-3">
                        {roiOutcomes.map((item) => {
                          const linkedToActive = item.linkedAxis === activeAxis;
                          const activeTheme = AXIS_COLOR_SYSTEM[activeAxis];

                          return (
                            <button
                              type="button"
                              key={item.id}
                              onClick={() => {
                                manualLockUntilRef.current = Date.now() + 3500;
                                setActiveAxis(item.linkedAxis);
                                setActiveStep(item.linkedAxis === 'optimiser' ? 1 : item.linkedAxis === 'innover' ? 2 : 3);
                              }}
                              className={`w-full p-2.5 sm:p-3 xl:p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                                linkedToActive
                                  ? 'text-white border-transparent shadow-md scale-[1.01]'
                                  : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#121622] dark:hover:bg-[#161c2b] border-slate-200 hover:border-slate-300 dark:border-white/5 dark:hover:border-white/20 text-slate-800 dark:text-white/80 shadow-2xs'
                              }`}
                              style={
                                linkedToActive
                                  ? { backgroundColor: activeTheme.rightSolidColor }
                                  : undefined
                              }
                            >
                              <div className="flex items-center justify-between gap-1.5">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <CheckCircle2
                                    size={14}
                                    className={`shrink-0 ${linkedToActive ? 'text-white' : 'text-emerald-500'}`}
                                  />
                                  <span className={`text-xs sm:text-[13px] font-bold font-display truncate ${linkedToActive ? 'text-white' : 'text-slate-900 dark:text-slate-200'}`}>
                                    {lang === 'fr' ? item.labelFr : item.labelEn}
                                  </span>
                                </div>
                                <span className={`text-[10px] sm:text-[11px] font-display font-bold shrink-0 ${linkedToActive ? 'bg-white/20 text-white px-2 py-0.5 rounded' : 'text-emerald-600 dark:text-emerald-400 font-extrabold'}`}>
                                  {item.metric}
                                </span>
                              </div>
                              <p className={`text-[11px] sm:text-xs mt-1 pl-4 leading-relaxed line-clamp-2 ${linkedToActive ? 'text-white/90 font-normal' : 'text-slate-500 dark:text-white/60 font-light'}`}>
                                {lang === 'fr' ? item.subFr : item.subEn}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>

                </div>
              </div>

            </div>
          </div>

          {/* Indicateur de défilement discret en bas du cadre centré */}
          <div className="flex items-center justify-center gap-2 pt-2 text-[11px] font-mono text-slate-500 dark:text-white/50">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: AXIS_COLOR_SYSTEM[activeAxis].leftSolidColor }}
            />
            <span>
              {lang === 'fr'
                ? `Défilez pour parcourir les 3 piliers · Pilier actif : ${activeStep}/3 (${activeAxis.toUpperCase()})`
                : `Scroll to explore the 3 pillars · Active: ${activeStep}/3 (${activeAxis.toUpperCase()})`}
            </span>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* CATALOGUE DES 3 PILIERS STRATÉGIQUES & 12 OFFRES ACTIVABLES (MOBILE ONLY)   */}
        {/* ========================================================================= */}
        <div className="block lg:hidden text-center pt-4 sm:pt-8 pb-3 max-w-4xl mx-auto space-y-2 px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E60039]/10 text-[#E60039] text-xs font-bold font-mono uppercase tracking-wider mb-1">
            <Sparkles size={13} />
            <span>{lang === 'fr' ? 'Les 3 Piliers Stratégiques' : 'The 3 Strategic Pillars'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight leading-tight">
            {lang === 'fr' ? (
              <>
                La <span className="text-[#E60039] dark:text-[#FF385C]">« valeur ajoutée »</span> Zenika
              </>
            ) : (
              <>
                Zenika's <span className="text-[#E60039] dark:text-[#FF385C]">"added value"</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-white/90 font-normal leading-relaxed">
            {lang === 'fr'
              ? 'Structure et méthode, expertise, expérience : découvrez nos 3 piliers et les 12 offres activables'
              : 'Structure and method, expertise, and experience: discover our 3 pillars and 12 actionable offerings'}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3. LES 3 CARTES DÉPLIABLES (OPTIMISER, INNOVER, TRANSFORMER) & MODAL (MOBILE ONLY) */}
        {/* ========================================================================= */}
        <div
          id="offers-showcase"
          className="block lg:hidden space-y-6 mt-6 max-w-5xl mx-auto w-full relative"
        >
          {/* Subtle Ambient Glow */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-20 dark:opacity-25"
            style={{ background: AXIS_COLOR_SYSTEM[activeAxis].centerGradient }}
          />

          {/* 3 Cartes Piliers Dépliables */}
          {(['optimiser', 'innover', 'transformer'] as StrategicAxisId[]).map((axisKey) => {
            const conf = axesConfig[axisKey];
            const isExpanded = expandedAxes[axisKey];
            const theme = AXIS_COLOR_SYSTEM[axisKey];

            return (
              <div
                key={axisKey}
                className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden text-center"
                style={{
                  background: theme.centerGradient,
                }}
              >
                {/* Header cliquable pour déplier/replier */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-label={`${conf.title} - ${isExpanded ? (lang === 'fr' ? 'Fermer les offres' : 'Close offers') : (lang === 'fr' ? 'Découvrir les 4 offres' : 'Discover 4 offers')}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleAxis(axisKey);
                    }
                  }}
                  onClick={() => toggleAxis(axisKey)}
                  className="cursor-pointer select-none space-y-2 flex flex-col items-center justify-center"
                >
                  <h4 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tight text-white drop-shadow-sm">
                    {conf.title}
                  </h4>
                  <p className="text-xs sm:text-base lg:text-lg font-medium text-white/95 italic max-w-2xl mx-auto leading-snug">
                    {lang === 'fr' ? conf.taglineFr : conf.taglineEn}
                  </p>

                  {/* Ligne informative / statistiques */}
                  <div className="text-[11px] sm:text-sm font-mono text-white/90 leading-tight pt-0.5">
                    {axisKey === 'optimiser' && (
                      lang === 'fr'
                        ? '4 Offres Déployables · -40% Dette · x2.5 Vélocité · FinOps maîtrisé'
                        : '4 Packaged Offers · -40% Debt · 2.5x Velocity · Controlled FinOps'
                    )}
                    {axisKey === 'innover' && (
                      lang === 'fr'
                        ? '4 Offres Déployables · x3 Time-to-Market · IA Native · Frugalité'
                        : '4 Packaged Offers · 3x Time-to-Market · Native AI · Frugality'
                    )}
                    {axisKey === 'transformer' && (
                      lang === 'fr'
                        ? '4 Offres Déployables · 100% Alignement · Acculturation · Delivery Continu'
                        : '4 Packaged Offers · 100% Alignment · Acculturation · Continuous Delivery'
                    )}
                  </div>

                  {/* Bouton Découvrir / Fermer */}
                  <div className="pt-2 sm:pt-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAxis(axisKey);
                      }}
                      className={`px-6 sm:px-7 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-base transition-all shadow-md cursor-pointer inline-flex items-center gap-2 ${
                        isExpanded
                          ? 'bg-white text-slate-900 hover:bg-slate-100 shadow-xl'
                          : axisKey === 'transformer'
                            ? 'bg-white text-slate-900 hover:bg-slate-100 shadow-lg'
                            : 'bg-white/25 hover:bg-white/35 text-white border border-white/25 backdrop-blur-sm'
                      }`}
                    >
                      <span>
                        {isExpanded
                          ? (lang === 'fr' ? 'Fermer' : 'Close')
                          : (lang === 'fr' ? 'Découvrir' : 'Discover')}
                      </span>
                      {isExpanded ? <ChevronUp size={15} /> : <span>→</span>}
                    </button>
                  </div>
                </div>

                {/* Contenu Dépliable : Les 4 offres du pilier */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-8 mt-6 border-t border-white/20">
                        <div className="mb-4 text-center">
                          <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/80 px-3 py-1 rounded-full bg-black/15 backdrop-blur-sm border border-white/10">
                            {lang === 'fr' ? `4 Offres ${conf.title} — Cliquez pour ouvrir les détails` : `4 ${conf.title} Offers — Click to reveal details`}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                          {conf.offers.map((offer) => {
                            const isInAssembly = selectedAssembly.some(
                              b => b.id === offer.linkedSolutionBlockId || b.id === offer.id
                            );

                            return (
                              <button
                                type="button"
                                key={offer.id}
                                onClick={() => setModalOffer({ offer, axis: axisKey })}
                                className="w-full text-left rounded-2xl bg-white dark:bg-[#0F1422] text-slate-900 dark:text-white p-5 shadow-lg hover:shadow-2xl border border-white/30 dark:border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
                              >
                                <div className="space-y-3">
                                  {/* Badge type et métrique */}
                                  <div className="flex items-center justify-between gap-1">
                                    <span
                                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                                      style={{
                                        color: conf.color,
                                        backgroundColor: `${conf.color}15`,
                                        border: `1px solid ${conf.color}30`
                                      }}
                                    >
                                      {lang === 'fr' ? offer.typeFr : offer.typeEn}
                                    </span>
                                    <span
                                      className="text-base font-black font-display"
                                      style={{ color: conf.color }}
                                    >
                                      {offer.metric}
                                    </span>
                                  </div>

                                  {/* Titre & Sous-titre */}
                                  <div>
                                    <h5 className="text-sm font-bold font-display group-hover:text-[#E60039] transition-colors leading-snug line-clamp-2">
                                      {lang === 'fr' ? offer.titleFr : offer.titleEn}
                                    </h5>
                                    <p className="text-xs text-slate-600 dark:text-white/60 line-clamp-2 mt-1 leading-snug">
                                      {lang === 'fr' ? offer.subtitleFr : offer.subtitleEn}
                                    </p>
                                  </div>

                                  {/* Nombre de livrables */}
                                  <div className="text-[11px] font-mono text-slate-500 dark:text-white/50 flex items-center gap-1.5 pt-1">
                                    <CheckCircle2 size={13} style={{ color: conf.color }} />
                                    <span>
                                      {(lang === 'fr' ? offer.pointsFr : offer.pointsEn).length} {lang === 'fr' ? 'livrables clés' : 'key deliverables'}
                                    </span>
                                  </div>
                                </div>

                                {/* Bouton pour ouvrir la modal */}
                                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono font-bold" style={{ color: conf.color }}>
                                  <span>{lang === 'fr' ? 'Voir le détail' : 'View details'}</span>
                                  <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Quick link to modular solution blocks - centered */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-center gap-3.5 text-xs font-mono">
            <span className="text-slate-500 dark:text-white/50">
              {lang === 'fr'
                ? 'Besoin d’assembler des briques sur-mesure de nos 3 axes ?'
                : 'Need a customized composable assembly across our 3 axes?'}
            </span>
            <a
              href="#solutions"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-white font-bold transition-all hover:scale-[1.02] cursor-pointer shadow-sm"
            >
              <span>{lang === 'fr' ? 'Explorer les 17 briques modulaires' : 'Explore the 17 Composable Blocks'}</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODAL POUR LES DÉTAILS D'UNE OFFRE                                        */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {modalOffer && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
              role="dialog"
              aria-modal="true"
            >
              {/* Fond semi-transparent avec flou */}
              <motion.div
                role="presentation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setModalOffer(null)}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity cursor-pointer"
              />

              {/* Conteneur de la Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-2xl bg-white dark:bg-[#0F1420] text-slate-900 dark:text-white rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden z-10 my-auto text-left"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header de la Modal avec le dégradé du pilier */}
                <div
                  className="p-6 sm:p-8 text-white relative overflow-hidden"
                  style={{ background: AXIS_COLOR_SYSTEM[modalOffer.axis].centerGradient }}
                >
                  {/* Bouton Fermer */}
                  <button
                    onClick={() => setModalOffer(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/25 hover:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label={lang === 'fr' ? 'Fermer la modal' : 'Close modal'}
                  >
                    <X size={18} />
                  </button>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                      {modalOffer.axis.toUpperCase()} · {lang === 'fr' ? modalOffer.offer.typeFr : modalOffer.offer.typeEn}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-white leading-tight">
                    {lang === 'fr' ? modalOffer.offer.titleFr : modalOffer.offer.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 italic mt-1 font-medium">
                    {lang === 'fr' ? modalOffer.offer.subtitleFr : modalOffer.offer.subtitleEn}
                  </p>

                  {/* Badge métrique */}
                  <div className="mt-4 inline-flex items-baseline gap-2 px-3.5 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/25">
                    <span className="text-xl sm:text-2xl font-black font-display text-white">
                      {modalOffer.offer.metric}
                    </span>
                    <span className="text-xs font-mono text-white/90 font-medium">
                      {lang === 'fr' ? modalOffer.offer.metricLabelFr : modalOffer.offer.metricLabelEn}
                    </span>
                  </div>
                </div>

                {/* Corps de la Modal */}
                <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                  {/* Description complète */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-white/50 mb-2">
                      {lang === 'fr' ? 'Description de l’offre' : 'Offer Overview'}
                    </h4>
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                      {lang === 'fr' ? modalOffer.offer.descriptionFr : modalOffer.offer.descriptionEn}
                    </p>
                  </div>

                  {/* Livrables & Engagements clés */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-white/50 mb-3">
                      {lang === 'fr' ? 'Livrables & Engagements concrets' : 'Key Deliverables & Commitments'}
                    </h4>
                    <div className="space-y-2.5">
                      {(lang === 'fr' ? modalOffer.offer.pointsFr : modalOffer.offer.pointsEn).map((point, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/5"
                        >
                          <CheckCircle2
                            size={16}
                            className="shrink-0 mt-0.5 text-emerald-500"
                          />
                          <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  {modalOffer.offer.tags && modalOffer.offer.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {modalOffer.offer.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/70"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions au bas de la modal */}
                <div className="p-4 sm:p-6 bg-slate-50 dark:bg-[#0A0D16] border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      const off = modalOffer.offer;
                      setModalOffer(null);
                      handleOpenContactWithOffer(off);
                    }}
                    className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
                    style={{ background: AXIS_COLOR_SYSTEM[modalOffer.axis].centerGradient }}
                  >
                    <span>{lang === 'fr' ? 'Cadrer cette offre avec Zenika' : 'Frame this offer with Zenika'}</span>
                    <ArrowRight size={15} />
                  </button>

                  {onToggleAssembly && (
                    <button
                      onClick={() => {
                        handleToggleAssemblyForOffer(modalOffer.offer);
                      }}
                      className={`w-full sm:w-auto py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                        selectedAssembly.some(b => b.id === modalOffer.offer.linkedSolutionBlockId || b.id === modalOffer.offer.id)
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-700 dark:text-emerald-300'
                          : 'bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 border-slate-200 dark:border-white/15 text-slate-800 dark:text-white'
                      }`}
                    >
                      {selectedAssembly.some(b => b.id === modalOffer.offer.linkedSolutionBlockId || b.id === modalOffer.offer.id) ? (
                        <>
                          <Check size={14} className="text-emerald-500" />
                          <span>{lang === 'fr' ? 'Dans mon panier' : 'In My Bundle'}</span>
                        </>
                      ) : (
                        <>
                          <span>+ {lang === 'fr' ? 'Ajouter à mon projet' : 'Add to My Scope'}</span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => setModalOffer(null)}
                    className="w-full sm:w-auto py-2.5 px-4 text-xs font-mono font-medium text-slate-500 hover:text-slate-800 dark:text-white/60 dark:hover:text-white transition-colors cursor-pointer text-center"
                  >
                    {lang === 'fr' ? 'Fermer' : 'Close'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
