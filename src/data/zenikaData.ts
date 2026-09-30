import { SolutionBlock, OperatingModel, PartnerItem, ClientReference, AgencyLocation } from '../types';

import retailImg from '../assets/images/portfolio_retail_tech_1788515518079.jpg';
import fintechImg from '../assets/images/portfolio_fintech_core_1788515533529.jpg';
import craftsmanImg from '../assets/images/zenika_craftsman_1788513818775.jpg';
import teamReelImg from '../assets/images/zenika_team_reel_1788513802230.jpg';
import consultantsImg from '../assets/images/zenika_consultants_1788513838189.jpg';
import trainerImg from '../assets/images/zenika_trainer_1788513864996.jpg';

export const SOLUTION_BLOCKS: SolutionBlock[] = [
  // Tier 1: Impact Métier (Business Value Offers)
  {
    id: 'sol-ai-biz',
    category: 'business-impact',
    tier: 1,
    title: 'AI for Business Performance',
    titleEn: 'AI for Business Performance',
    subtitle: 'IA agentique intégrée dans vos apps métier, process de gestion et SDLC',
    subtitleEn: 'Agentic AI integrated into business apps, management workflows and SDLC',
    description: 'Développer stratégiquement et par palier de maturité une utilisation maîtrisée de l’IA agentique. Notre programme évalue la maturité de vos usages afin de planifier des mises à niveau incrémentales via les synergies SHAPE (idéation) x SHIP (ingénierie) x SYNC (industrialisation) de notre AI Multiplier Framework.',
    descriptionEn: 'Strategically develop a mature, governed adoption of agentic AI across business applications, management processes, and engineering. Powered by our SHAPE x SHIP x SYNC AI Multiplier Framework.',
    bulletPoints: [
      'IA dans les applications métier pour démultiplier l\'expérience utilisateur',
      'IA dans les processus de gestion et d\'automatisation des flux',
      'IA dans le SDLC pour accélérer les cycles de développement',
      'AI Multiplier Framework : SHAPE (idéation), SHIP (ingénierie), SYNC (industrialisation)'
    ],
    bulletPointsEn: [
      'AI in customer-facing business applications to maximize user value',
      'AI in internal workflow automation and decision processes',
      'AI in the SDLC to turbocharge development velocity and quality',
      'AI Multiplier Framework: SHAPE (discovery), SHIP (craft), SYNC (scale)'
    ],
    color: '#E60039',
    iconName: 'Sparkles',
    tags: ['Agentic AI', 'AI Multiplier', 'SDLC', 'Productivity']
  },
  {
    id: 'sol-data-agentic',
    category: 'business-impact',
    tier: 1,
    title: 'Data for Agentic AI Readiness',
    titleEn: 'Data for Agentic AI Readiness',
    subtitle: 'Optimisation des décisions humaines et agentiques par la donnée temps réel et sécurisée',
    subtitleEn: 'High-quality, real-time and trusted data foundation for human and autonomous agent decisions',
    description: 'Répondant aux défis de l\'ère de l\'agentique qui exige des données pertinentes, fraîches et de confiance. Nous agissons sur les 3 dimensions clés : Master Data (gouvernance), Fresh Data (temps réel & streaming) et Trusted Data (sécurisation & traçabilité).',
    descriptionEn: 'Meeting the demands of the agentic era for trusted, fresh and structured data. We operate across Master Data (governance), Fresh Data (streaming & real-time), and Trusted Data (security & lineage).',
    bulletPoints: [
      'Master Data : Gouvernance et modélisation unifiée des référentiels',
      'Fresh Data : Pipelines temps réel, streaming Kafka/Confluent, architecture réactive',
      'Trusted Data : Sécurisation, traçabilité, conformité RGPD et IA Act',
      'Programme incrémental pour accélérer l\'adoption des agents décisionnels'
    ],
    bulletPointsEn: [
      'Master Data: Unified enterprise domain modeling and governance',
      'Fresh Data: Real-time streaming pipelines, Kafka/Confluent integration',
      'Trusted Data: Lineage, security hardening, and regulatory compliance',
      'Incremental roadmap to accelerate autonomous agent readiness'
    ],
    color: '#3B82F6',
    iconName: 'Database',
    tags: ['Data Governance', 'Streaming', 'Fresh Data', 'Agentic Ready']
  },
  {
    id: 'sol-cloud-forge',
    category: 'business-impact',
    tier: 1,
    title: 'Cloud Forge : From Strategy to Value',
    titleEn: 'Cloud Forge : From Strategy to Value',
    subtitle: 'Approche BizDevOps, maîtrise des coûts et souveraineté des infrastructures',
    subtitleEn: 'BizDevOps synergy, cloud cost control and sovereign infrastructure strategy',
    description: 'Face aux problèmes de coûts incontrôlés et de manque de ROI clair, notre programme valorise les services Cloud clés en réduisant la distance entre la stratégie d’entreprise (Biz), l’implémentation technique (Dev) et l’exécution (Ops). Adressage rigoureux de la souveraineté en 2026.',
    descriptionEn: 'Eliminate uncontrolled cloud spend and unlock real ROI with our BizDevOps methodology—closing the gap between business strategy, engineering, and ops while securing sovereign hosting.',
    bulletPoints: [
      'Approche BizDevOps unifiant stratégie métier, dev et exploitation',
      'Valorisation et optimisation des services managés Cloud',
      'Gestion des risques de souveraineté et architectures multi-cloud / SecNumCloud',
      'FinOps prédictif et dimensionnement frugal des ressources'
    ],
    bulletPointsEn: [
      'BizDevOps framework bridging business goals, software craft and ops',
      'Strategic utilization of cloud native services',
      'Sovereignty risk mitigation and trusted cloud architectures',
      'Predictive FinOps and sustainable compute optimization'
    ],
    color: '#10B981',
    iconName: 'Cloud',
    tags: ['BizDevOps', 'Cloud Native', 'Sovereignty', 'FinOps']
  },
  {
    id: 'sol-legacy-value',
    category: 'business-impact',
    tier: 1,
    title: 'Valorisation & Modernisation du Legacy',
    titleEn: 'Legacy Modernization & Value Extraction',
    subtitle: 'Sortir le legacy des discussions purement DSI pour le piloter par la valeur métier',
    subtitleEn: 'Reposition legacy modernization from an IT burden into a business-driven value driver',
    description: 'Le legacy porte la valeur métier essentielle de l\'entreprise. Notre approche permet de regagner la maîtrise technique (sécurisation, refactoring, documentation assistée par IA) et de moderniser par étapes (strangler fig pattern, micro-frontends, découplage d\'API).',
    descriptionEn: 'Legacy systems power your core revenue. We help you regain full technical mastery (security, refactoring, AI-assisted reverse engineering) and modernize smoothly without downtime.',
    bulletPoints: [
      'Sécurisation et cartographie exhaustive des flux critiques',
      'Refactoring incrémental et désenchevêtrement des monolithes',
      'Accélération de la modernisation grâce à l\'IA générative (vibe-coded legacy audits)',
      'Découplage architectural orienté domaines métier (DDD)'
    ],
    bulletPointsEn: [
      'Security hardening and mapping of mission-critical business logic',
      'Incremental refactoring and monolith decoupling',
      'AI-accelerated reverse engineering and documentation',
      'Domain-Driven Design (DDD) target architecture migration'
    ],
    color: '#EC4899',
    iconName: 'Layers',
    tags: ['Legacy Refactor', 'Strangler Pattern', 'DDD', 'Resilience']
  },
  {
    id: 'sol-custom-case',
    category: 'business-impact',
    tier: 1,
    title: 'Sur-Mesure & Business Case Dédié',
    titleEn: 'Bespoke Co-Creation & Dedicated Business Case',
    subtitle: 'Assemblage sur mesure de nos expertises, méthodologies et écosystème partenaires',
    subtitleEn: 'Customized modular assembly of methodologies, technical strike teams and partner tech',
    description: 'Nous répondons au contexte spécifique de chaque organisation en assemblant nos briques méthodologiques, nos experts de haut niveau et nos partenariats technologiques de pointe dans un modèle contractuel aligné (skin in the game).',
    descriptionEn: 'We tailor unique solution packages to your organizational reality by combining our methodological blocks, senior strike teams and premier partner ecosystem.',
    bulletPoints: [
      'Design-to-cost et engagement au résultat sur les jalons critiques',
      'Composition personnalisée de squads pluridisciplinaires',
      'Accompagnement de bout en bout de l\'idéation à la mise en production',
      'Gouvernance transparente et transfert continu de compétences'
    ],
    bulletPointsEn: [
      'Design-to-cost and outcome-oriented engagement milestones',
      'Tailored cross-functional expert strike teams',
      'End-to-end delivery from inception to enterprise scale',
      'Transparent governance with continuous knowledge transfer'
    ],
    color: '#8B5CF6',
    iconName: 'Puzzle',
    tags: ['Bespoke', 'Co-Creation', 'Skin in the Game', 'Tailored']
  },

  // Tier 2: Accélérateurs Méthodologiques (Methodology Building Blocks)
  {
    id: 'sol-ai-sdlc',
    category: 'methodology',
    tier: 2,
    title: 'AI-augmented SDLC & Ops',
    titleEn: 'AI-augmented SDLC & Ops',
    subtitle: 'Orchestration d\'agents de dév, génération de tests, documentation et diagnostic',
    subtitleEn: 'Development agents orchestration, automated testing, docs and telemetry',
    description: 'Rendre la chaîne de production logicielle exponentiellement plus efficace en outillant chaque étape : de la spécification au déploiement en passant par les revues de code automatisées.',
    descriptionEn: 'Turbocharge the software delivery lifecycle with autonomous coding assistants, smart test generation and AI-driven ops.',
    bulletPoints: [
      'Agents de développement intégrés dans les IDEs et pipelines CI/CD',
      'Génération assistée de tests unitaires et d\'intégration',
      'Documentation vivante auto-mise à jour',
      'Augmented Ops : Diagnostic automatisé des incidents de production'
    ],
    bulletPointsEn: [
      'AI developer agents embedded in IDEs and CI/CD workflows',
      'Automated synthetic test generation and security scanning',
      'Living documentation synchronized with code changes',
      'Augmented Ops: Fast telemetry root-cause identification'
    ],
    color: '#E60039',
    iconName: 'Cpu',
    tags: ['AI SDLC', 'Augmented Ops', 'CI/CD', 'Code Quality']
  },
  {
    id: 'sol-lean-strike',
    category: 'methodology',
    tier: 2,
    title: 'Lean Strike Teams & Software Excellence',
    titleEn: 'Lean Strike Teams & Software Excellence',
    subtitle: 'Petites équipes expertes, autonomes, engagées et focalisées sur la haute qualité',
    subtitleEn: 'High-caliber, autonomous pizza teams delivering elite craft and velocity',
    description: 'Privilégier des petites squads d\'experts ("pizza teams") pluridisciplinaires plutôt que de grands plateaux impersonnels. Rigueur Craftsmanship, TDD, Clean Architecture et vélocité pérenne.',
    descriptionEn: 'High-impact small senior squads replace bloated delivery teams. Rooted in Software Craftsmanship, TDD, and clean architectures.',
    bulletPoints: [
      'Autonomie décisionnelle et responsabilité de bout en bout',
      'Pratiques Craft : TDD, Pair/Mob programming, Clean Code',
      'Élimination des goulots d\'étranglement et des passations lentes',
      'Culture de la qualité comme vecteur numéro 1 de rapidité'
    ],
    bulletPointsEn: [
      'Full end-to-end ownership and autonomous decision-making',
      'Software Craftsmanship: TDD, Pair/Mob Programming, Clean Code',
      'Zero handoff waste and fast feedback loops',
      'Velocity built on software quality, not shortcuts'
    ],
    color: '#F59E0B',
    iconName: 'Zap',
    tags: ['Strike Teams', 'Craftsmanship', 'TDD', 'Agile Velocity']
  },
  {
    id: 'sol-platform-eng',
    category: 'methodology',
    tier: 2,
    title: 'Platform Engineering & Developer Experience',
    titleEn: 'Platform Engineering & Developer Experience',
    subtitle: 'Infrastructures internes en self-service et réduction de la charge cognitive',
    subtitleEn: 'Self-service internal developer platforms (IDP) and minimized cognitive load',
    description: 'Bâtir des Internal Developer Platforms (IDP) modernes pour permettre aux équipes de delivery de déployer et monitorer en totale autonomie tout en respectant les gardes-fous de sécurité.',
    descriptionEn: 'Design self-service Internal Developer Platforms (IDP) enabling engineering teams to ship and scale autonomously within compliance guardrails.',
    bulletPoints: [
      'Portails développeurs (Backstage, Port) et catalogues de services',
      'Infrastructure as Code (Terraform, OpenTofu, Pulumi) standardisée',
      'Guardrails de sécurité et conformité automatisés',
      'Golden paths pour accélérer l\'onboarding et les déploiements'
    ],
    bulletPointsEn: [
      'Internal developer portals and unified service catalogs',
      'Standardized Infrastructure as Code (Terraform, Pulumi)',
      'Automated security guardrails and policy enforcement',
      'Golden paths reducing time-to-first-commit for newcomers'
    ],
    color: '#10B981',
    iconName: 'Server',
    tags: ['Platform Engineering', 'IDP', 'DevEx', 'IaC']
  },
  {
    id: 'sol-product-discovery',
    category: 'methodology',
    tier: 2,
    title: 'Product Strategy, Discovery & DDD',
    titleEn: 'Product Strategy, Discovery & DDD',
    subtitle: 'Rationalisation de portfolio produit et alignement Domain-Driven Design',
    subtitleEn: 'Product portfolio rationalization and Domain-Driven Design alignment',
    description: 'Créer le pont indéfectible entre vision business et modélisation logicielle. Utilisation d\'Event Storming et de Domain-Driven Design pour sculpter des architectures alignées sur la valeur.',
    descriptionEn: 'Bridge executive vision and software architecture using Event Storming and Domain-Driven Design to deliver real business outcomes.',
    bulletPoints: [
      'Event Storming et découpage en Bounded Contexts clairs',
      'Product Discovery continue et validation rapide d\'hypothèses',
      'Priorisation par la valeur et cartographie des parcours utilisateurs',
      'Lien intime entre Product Managers et Tech Leads'
    ],
    bulletPointsEn: [
      'Event Storming and clean Bounded Context modeling',
      'Continuous product discovery and rapid hypothesis testing',
      'Value-driven roadmapping and user journey mapping',
      'Tight cohesion between Product Leaders and Principal Architects'
    ],
    color: '#8B5CF6',
    iconName: 'Compass',
    tags: ['Product Discovery', 'DDD', 'Event Storming', 'Product Strategy']
  },
  {
    id: 'sol-delivery-dora',
    category: 'methodology',
    tier: 2,
    title: 'Delivery Performance & DORA Best Practices',
    titleEn: 'Delivery Performance & DORA Best Practices',
    subtitle: 'Organisation du delivery, métriques DORA et Team Topologies',
    subtitleEn: 'Delivery organization, DORA metrics and Team Topologies enablement',
    description: 'Mesurer et optimiser le flux de livraison avec des indicateurs objectifs (Lead Time for Changes, Deployment Frequency, Change Failure Rate, Time to Restore Service).',
    descriptionEn: 'Measure and enhance software throughput and stability with objective DORA metrics, Team Topologies and continuous flow optimization.',
    bulletPoints: [
      'Mise en place des 4 métriques clés DORA et dashboards de flux',
      'Alignement des équipes selon les 4 types de Team Topologies',
      'Pratiques de Continuous Delivery et feature flagging',
      'Suppression des goulots d\'étranglement opérationnels'
    ],
    bulletPointsEn: [
      'Automated DORA metrics instrumentation and flow dashboards',
      'Organizational design aligned with Team Topologies',
      'Continuous Delivery and feature flagging at scale',
      'Systemic removal of delivery friction and bureaucracy'
    ],
    color: '#06B6D4',
    iconName: 'BarChart2',
    tags: ['DORA Metrics', 'Team Topologies', 'Continuous Delivery', 'Flow']
  },
  {
    id: 'sol-audit-flash',
    category: 'methodology',
    tier: 2,
    title: 'Audit Flash & Diagnostic 360°',
    titleEn: 'Flash Audit & 360° Tech Assessment',
    subtitle: 'Évaluation rapide et sans complaisance de votre SI, de l\'orga et de la sécurité',
    subtitleEn: 'High-speed, comprehensive assessment of software health, team topology and security',
    description: 'En 5 à 10 jours, nos experts chevronnés réalisent un diagnostic 360° de vos architectures, codebases, pratiques de delivery et maturité IA pour vous délivrer un plan d\'action priorisé et actionnable.',
    descriptionEn: 'In 5 to 10 days, senior Zenika architects deliver a no-fluff 360° diagnostic of your codebase, architectures, delivery velocity and AI readiness.',
    bulletPoints: [
      'Revue d\'architecture, analyse statique de code et sécurité',
      'Audit de la performance de delivery et des frictions d\'équipe',
      'Matrice de maturité IA et identification des quick-wins',
      'Feuille de route stratégique claire, chiffrée et pragmatique'
    ],
    bulletPointsEn: [
      'Architecture review, static code analysis and security audit',
      'Delivery throughput and team friction assessment',
      'AI readiness matrix with immediate ROI quick-wins',
      'Actionable, prioritized technical & organizational roadmap'
    ],
    color: '#EC4899',
    iconName: 'CheckCircle2',
    tags: ['Audit Flash', '360 Diagnostic', 'Quick Wins', 'Actionable']
  },

  // Tier 3: Exécution Experte & Domaines (Core Expertises)
  {
    id: 'sol-agentic-sys',
    category: 'core-expertise',
    tier: 3,
    title: 'Agentic Systems',
    titleEn: 'Agentic Systems',
    subtitle: 'Systèmes multi-agents, orchestration et raisonnement autonome',
    subtitleEn: 'Multi-agent frameworks, autonomous reasoning, and secure tool usage',
    description: 'Conception et déploiement de systèmes agentiques fiables capables d\'interagir avec vos bases de données, APIs et outils métiers en toute sécurité.',
    descriptionEn: 'Engineering resilient agentic systems with robust tool integration, autonomous reasoning, guardrails and full observability.',
    bulletPoints: ['Frameworks multi-agents', 'RAG avancé & Vector Stores', 'MCP (Model Context Protocol)', 'Guardrails & Sécurité LLM'],
    bulletPointsEn: ['Multi-agent architectures', 'Advanced RAG & Vector DBs', 'Model Context Protocol (MCP)', 'LLM Guardrails & Evaluation'],
    color: '#E60039',
    iconName: 'Bot',
    tags: ['Agentic', 'LLMs', 'MCP', 'RAG']
  },
  {
    id: 'sol-modern-arch',
    category: 'core-expertise',
    tier: 3,
    title: 'Architectures Modernes',
    titleEn: 'Modern Architectures',
    subtitle: 'Event-driven, microservices, cloud-native et modular monoliths',
    subtitleEn: 'Event-driven, microservices, cloud-native and modular monoliths',
    description: 'Définition d\'architectures logicielles pérennes, hautement disponibles et conçues pour évoluer sans refonte traumatisante.',
    descriptionEn: 'Designing scalable, maintainable architectures built for seamless long-term evolution without catastrophic rewrites.',
    bulletPoints: ['Event-Driven Architecture (EDA)', 'Modular Monoliths & Microservices', 'API First & Mesh', 'Haute Disponibilité & Résilience'],
    bulletPointsEn: ['Event-Driven Architecture (EDA)', 'Modular Monoliths & Microservices', 'API First & Service Mesh', 'High Availability & Resilience'],
    color: '#3B82F6',
    iconName: 'GitBranch',
    tags: ['EDA', 'Event-Driven', 'Modular', 'Cloud-Native']
  },
  {
    id: 'sol-soft-craft',
    category: 'core-expertise',
    tier: 3,
    title: 'Software Excellence & Craft',
    titleEn: 'Software Excellence & Craft',
    subtitle: 'L\'ADN historique de Zenika : qualité, rigueur, tests et passion du code',
    subtitleEn: 'Zenika\'s core heritage: code excellence, rigor, testing culture and passion',
    description: 'Nos consultants partagent un attachement viscéral au code propre, aux tests automatisés et à la pérennité des solutions livrées.',
    descriptionEn: 'Our engineers practice disciplined software engineering, test-first design, refactoring, and knowledge sharing.',
    bulletPoints: ['Test-Driven Development (TDD)', 'Clean Architecture & Hexagonal', 'Refactoring & Legacy Rescue', 'Mentorat & Guildes internes'],
    bulletPointsEn: ['Test-Driven Development (TDD)', 'Clean Architecture & Hexagonal', 'Refactoring & Legacy Rescue', 'Mentorship & Internal Guilds'],
    color: '#10B981',
    iconName: 'Code',
    tags: ['Craftsmanship', 'Clean Code', 'TDD', 'Hexagonal']
  },
  {
    id: 'sol-data-ai',
    category: 'core-expertise',
    tier: 3,
    title: 'Data & IA Engineering',
    titleEn: 'Data & AI Engineering',
    subtitle: 'Data mesh, streaming temps réel, MLOps et gouvernance',
    subtitleEn: 'Data mesh, real-time streaming, MLOps and trustworthy governance',
    description: 'Construire les autoroutes de la donnée pour alimenter vos tableaux de bord, modèles prédictifs et moteurs d\'IA en continu.',
    descriptionEn: 'Building robust data highways that power analytical dashboards, predictive models, and agentic workflows reliably.',
    bulletPoints: ['Data Mesh & Data Lakehouse', 'Kafka & Streaming temps réel', 'Pipelines MLOps & LLMOps', 'Gouvernance et conformité des données'],
    bulletPointsEn: ['Data Mesh & Data Lakehouse', 'Kafka & Real-time Streaming', 'MLOps & LLMOps Pipelines', 'Data Lineage & Governance'],
    color: '#F59E0B',
    iconName: 'Activity',
    tags: ['Data Mesh', 'Streaming', 'MLOps', 'Lakehouse']
  },
  {
    id: 'sol-infra-cloud',
    category: 'core-expertise',
    tier: 3,
    title: 'Infrastructures & Cloud',
    titleEn: 'Cloud & Infrastructure',
    subtitle: 'Kubernetes, multi-cloud, souveraineté et automatisation continue',
    subtitleEn: 'Kubernetes, multi-cloud, sovereign hosting and continuous automation',
    description: 'Maîtrise des clouds publics (GCP, AWS) et souverains (Cloud Temple, SecNumCloud) avec des standards d\'automatisation sans compromis.',
    descriptionEn: 'Mastery across hyperscalers (GCP, AWS) and sovereign providers (Cloud Temple) with uncompromising automation standards.',
    bulletPoints: ['Kubernetes & Cloud-Native Stacks', 'Multi-cloud & Souveraineté SecNumCloud', 'GitOps & Infrastructure as Code', 'Observabilité (Grafana, OpenTelemetry)'],
    bulletPointsEn: ['Kubernetes & Cloud-Native Stacks', 'Multi-cloud & Sovereign Clouds', 'GitOps & Infrastructure as Code', 'Observability (Grafana, OpenTelemetry)'],
    color: '#8B5CF6',
    iconName: 'Shield',
    tags: ['Kubernetes', 'Multi-Cloud', 'SecNumCloud', 'GitOps']
  },
  {
    id: 'sol-org-change',
    category: 'core-expertise',
    tier: 3,
    title: 'Organisations & Conduite du Changement',
    titleEn: 'Organizations & Change Enablement',
    subtitle: 'Transformer par l\'exemple, acculturation tech et alignement humain',
    subtitleEn: 'Transform by example, tech culture diffusion, and human-centered alignment',
    description: 'Parce que les plus beaux systèmes échouent sans adhésion humaine, nous accompagnons la transformation culturelle et organisationnelle.',
    descriptionEn: 'Because great software requires great team alignment, we guide cultural transformation and leadership coaching.',
    bulletPoints: ['Accompagnement Comex et DSI', 'Mise en place de communautés de pratiques', 'Agilité à l\'échelle & SAFe', 'Acculturation aux enjeux de l\'IA'],
    bulletPointsEn: ['Executive & CIO advisory', 'Communities of Practice facilitation', 'Agile at scale & SAFe coaching', 'AI literacy across all departments'],
    color: '#06B6D4',
    iconName: 'Users',
    tags: ['Change', 'Communities', 'Leadership', 'Culture']
  }
];

export const OPERATING_MODELS: OperatingModel[] = [
  {
    id: 'op-flash',
    title: 'Diagnostic Flash, Audit 360° et Études',
    titleEn: 'Flash Diagnostic, 360° Audit & Studies',
    subtitle: 'Analyse rapide et sans concession de votre état de l\'art',
    subtitleEn: 'Rapid, uncompromising assessment of your architecture and delivery health',
    description: 'Une immersion courte de nos meilleurs directeurs techniques pour identifier les goulets d\'étranglement, les risques de sécurité et les opportunités d\'accélération IA.',
    descriptionEn: 'A short engagement by principal architects to uncover hidden bottlenecks, technical debt, and high-impact AI leverage points.',
    useCase: 'Prise de poste DSI, lancement de grand programme, cadrage de budget tech, audit avant refonte.',
    useCaseEn: 'New CIO onboarding, strategic tech review, budgeting, pre-replatforming assessment.',
    duration: '1 à 3 semaines',
    deliverables: ['Rapport d\'audit 360°', 'Matrice d\'évaluation de maturité', 'Plan d\'action priorisé chiffré', 'Restitution Comex'],
    deliverablesEn: ['360° Tech audit report', 'Maturity evaluation matrix', 'Prioritized action plan', 'Executive briefing'],
    icon: 'Search'
  },
  {
    id: 'op-cadrage',
    title: 'Cadrage Produit, Solution ou Projet',
    titleEn: 'Product, Solution & Project Inception',
    subtitle: 'De l\'opportunité business à la trajectoire d\'ingénierie concrète',
    subtitleEn: 'From high-level business vision to a validated technical trajectory',
    description: 'Aligner les parties prenantes métier et techniques autour d\'une vision claire, d\'une architecture cible modulaire et d\'un backlog prêt pour l\'exécution.',
    descriptionEn: 'Align business and tech stakeholders through Event Storming, target architecture definition and an execution-ready backlog.',
    useCase: 'Lancement d\'une nouvelle offre digitale, projet d\'IA agentique, refonte d\'application cœur de métier.',
    useCaseEn: 'New digital product launch, agentic AI initiative, core application modernization.',
    duration: '3 à 6 semaines',
    deliverables: ['Event Storming & Bounded Contexts', 'Architecture cible validée', 'Roadmap de livraison itérative', 'Estimation budgétaire affinée'],
    deliverablesEn: ['Event Storming map', 'Target architecture blueprint', 'Iterative release roadmap', 'Cost & resource estimates'],
    icon: 'Compass'
  },
  {
    id: 'op-turnkey',
    title: 'Solution Logicielle Clé en Mains',
    titleEn: 'Turnkey Software Delivery',
    subtitle: 'Conception, réalisation et mise en production de bout en bout',
    subtitleEn: 'End-to-end design, implementation and deployment with committed milestones',
    description: 'Une équipe Zenika complète prend en charge l\'ensemble du cycle de vie du produit, garantissant le respect des délais, des coûts et une qualité logicielle irréprochable.',
    descriptionEn: 'A dedicated Zenika squad assumes full ownership of the product lifecycle, guaranteeing timeline, budget, and craftsmanship.',
    useCase: 'Nouveau portail client, application mobile critique, plateforme d\'IA agentique sur mesure.',
    useCaseEn: 'Customer portal, mission-critical mobile app, custom agentic AI platform.',
    duration: '2 à 6 mois+',
    deliverables: ['Code source documenté et testé', 'Pipeline CI/CD et infras automatisées', 'Tests automatisés (>85% coverage)', 'Garantie et transfert de compétences'],
    deliverablesEn: ['Clean, tested source code', 'Automated CI/CD pipelines', 'High-coverage automated test suites', 'Handover & warranty'],
    icon: 'PackageCheck'
  },
  {
    id: 'op-strike-teams',
    title: 'Régie & Renfort d\'Équipe (Lean Strike Teams)',
    titleEn: 'Lean Strike Teams & Team Augmentation',
    subtitle: 'Intégration d\'experts chevronnés au cœur de vos squads',
    subtitleEn: 'Embedding top-tier senior engineers directly into your feature squads',
    description: 'Injecter des développeurs, tech leads, architectes et coachs Zenika directement dans vos équipes pour booster immédiatement la qualité et le rythme de delivery.',
    descriptionEn: 'Inject Zenika engineers, tech leads, and agile coaches into your teams to level up technical excellence and release velocity.',
    useCase: 'Accélération d\'un projet en retard, montée en compétences sur une techno clé (IA, Cloud, Kafka), renfort ponctuel.',
    useCaseEn: 'Accelerating delayed releases, upskilling on key technologies, critical project boosts.',
    duration: 'Au fil de l\'eau (trimestriel / semestriel)',
    deliverables: ['Contribution de code en production', 'Pair-programming et mentorat', 'Diffusion des bonnes pratiques Craft', 'Revue de code continue'],
    deliverablesEn: ['Direct code production', 'Pair programming & mentorship', 'Craft culture propagation', 'Continuous code review'],
    icon: 'Zap'
  },
  {
    id: 'op-centre-services',
    title: 'Centre de Services & de Compétences',
    titleEn: 'Dedicated Service & Competency Centers',
    subtitle: 'Capacité d\'ingénierie dédiée avec engagement de niveau de service (SLA/KPIs)',
    subtitleEn: 'Dedicated multi-disciplinary delivery capacity governed by clear SLA/KPIs',
    description: 'Mise en place d\'un dispositif d\'ingénierie externalisé mais étroitement connecté à votre organisation, garantissant vélocité, réactivité et flexibilité de dimensionnement.',
    descriptionEn: 'Scalable dedicated engineering center closely integrated with your organization, combining velocity, flexibility and DORA-driven metrics.',
    useCase: 'Maintenance évolutive d\'un portefeuille d\'applications, delivery continu de multiples produits digitaux.',
    useCaseEn: 'Continuous enhancement of an application portfolio, multi-product delivery.',
    duration: 'Engagement pluriannuel',
    deliverables: ['Engagements de service (SLA, DORA)', 'Gouvernance et comités de pilotage réguliers', 'Productivité mesurable et optimisée', 'Pôles d\'expertise mutualisés'],
    deliverablesEn: ['SLA & DORA metrics commitment', 'Steering committee reports', 'Continuous productivity gains', 'Shared centers of excellence'],
    icon: 'Building2'
  },
  {
    id: 'op-coaching',
    title: 'Expertise Ponctuelle, Coaching & Formation',
    titleEn: 'Specialized Advisory, Coaching & Zenika Training',
    subtitle: 'Interventions chirurgicales et montée en compétences par la pratique',
    subtitleEn: 'Surgical technical consulting and hands-on professional training',
    description: 'Bénéficiez de nos meilleurs spécialistes pour résoudre un problème critique d\'architecture, de performance ou de sécurité, et formez vos équipes via notre catalogue de formations de pointe.',
    descriptionEn: 'Access our most seasoned experts for high-impact troubleshooting, performance tuning, and certified technical training.',
    useCase: 'Résolution d\'incidents de performance, sécurisation pré-audit, formation certifiante des collaborateurs.',
    useCaseEn: 'Performance bottlenecks, security hardening, team certification & upskilling.',
    duration: '1 jour à quelques semaines',
    deliverables: ['Recommandations techniques chirurgicales', 'Formations certifiantes (Zenika Training)', 'Supports pédagogiques et labs pratiques', 'Coaching individuel ou d\'équipe'],
    deliverablesEn: ['Surgical technical recommendations', 'Official certifications (Zenika Training)', 'Courseware & practical labs', '1-on-1 and team coaching'],
    icon: 'GraduationCap'
  },
  {
    id: 'op-transfo',
    title: 'Programmes de Transformation Pilotés',
    titleEn: 'Steered Enterprise Transformation Programs',
    subtitle: 'Accompagnement holistique des grandes métamorphoses du SI',
    subtitleEn: 'Holistic leadership for major organizational and tech modernizations',
    description: 'Pilotage de bout en bout des transformations stratégiques : passage au Cloud, adoption de l\'IA à l\'échelle de l\'entreprise, réorganisation en Team Topologies.',
    descriptionEn: 'Guiding large-scale digital transformations: Move-to-Cloud, enterprise-wide AI enablement, and organizational restructuring.',
    useCase: 'Transformation digitale globale, transition vers un modèle produit, adoption massive de l\'IA générative.',
    useCaseEn: 'Enterprise digital transformation, shift to product-led organization, GenAI rollout.',
    duration: '6 à 24 mois',
    deliverables: ['Gouvernance de transformation globale', 'Tableaux de bord d\'impact et ROI', 'Plan de conduite du changement', 'Transformation culturelle pérenne'],
    deliverablesEn: ['Enterprise transformation governance', 'Value tracking & ROI dashboards', 'Change management execution', 'Long-lasting culture change'],
    icon: 'TrendingUp'
  }
];

export const PARTNERS_DATA: PartnerItem[] = [
  {
    id: 'part-databricks',
    name: 'Databricks',
    category: 'AI / Data',
    description: 'Plateforme unifiée de données et d\'IA (Lakehouse, Mosaic AI) pour accélérer le machine learning et les applications agentiques.',
    descriptionEn: 'Unified Data & AI Lakehouse platform accelerating machine learning and agentic workflows.',
    logoText: 'databricks',
    badgeColor: '#FF3621',
    keySynergy: 'Lakehouse & Agentic Data Engineering'
  },
  {
    id: 'part-confluent',
    name: 'Confluent',
    category: 'AI / Data',
    description: 'Pionnier de la Data in Motion et d\'Apache Kafka pour alimenter les flux de données temps réel et les architectures réactives.',
    descriptionEn: 'Data in Motion and Apache Kafka enterprise platform powering real-time streaming data pipelines.',
    logoText: 'CONFLUENT',
    badgeColor: '#00A0DF',
    keySynergy: 'Real-time Streaming & Event-Driven SI'
  },
  {
    id: 'part-gcp',
    name: 'Google Cloud Platform',
    category: 'AI / Data / Cloud',
    description: 'Partenaire stratégique pour les modèles Gemini, Vertex AI, Kubernetes (GKE) et l\'analytique haute performance (BigQuery).',
    descriptionEn: 'Strategic partner for Gemini foundation models, Vertex AI, GKE, and BigQuery analytics.',
    logoText: 'Google Cloud',
    badgeColor: '#4285F4',
    keySynergy: 'Gemini, Vertex AI, GKE & Enterprise Data'
  },
  {
    id: 'part-redhat',
    name: 'Red Hat',
    category: 'AI / Software / DevSecOps / Cloud',
    description: 'Leader mondial de l\'open source d\'entreprise, OpenShift pour les environnements hybrides et l\'IA sécurisée.',
    descriptionEn: 'Global open-source leader, OpenShift container platform for enterprise hybrid cloud and sovereign AI.',
    logoText: 'Red Hat',
    badgeColor: '#EE0000',
    keySynergy: 'OpenShift, Hybrid Cloud & Enterprise Open Source'
  },
  {
    id: 'part-kong',
    name: 'Kong',
    category: 'AI / Software',
    description: 'Passerelle d\'APIs de référence et AI Gateway pour sécuriser, orchestrer et monitorer les flux d\'APIs et LLMs.',
    descriptionEn: 'Premier cloud-native API Gateway and AI Gateway for securing and orchestrating microservices & LLMs.',
    logoText: 'Kong',
    badgeColor: '#003366',
    keySynergy: 'API Management & AI Gateway'
  },
  {
    id: 'part-gitlab',
    name: 'GitLab',
    category: 'Software / DevSecOps',
    description: 'Plateforme DevSecOps complète intégrant l\'IA (GitLab Duo) pour un cycle de développement sécurisé de bout en bout.',
    descriptionEn: 'The complete DevSecOps platform with AI-powered GitLab Duo across the entire SDLC.',
    logoText: 'GitLab',
    badgeColor: '#FC6D26',
    keySynergy: 'Unified DevSecOps & AI-Assisted CI/CD'
  },
  {
    id: 'part-aws',
    name: 'Amazon Web Services',
    category: 'Cloud',
    description: 'Fournisseur de cloud public de premier plan pour déployer des infrastructures résilientes, serverless et cloud-native.',
    descriptionEn: 'Leading global cloud provider for scalable, serverless and cloud-native architectures.',
    logoText: 'aws',
    badgeColor: '#FF9900',
    keySynergy: 'Cloud Native & Scalable Architectures'
  },
  {
    id: 'part-cloudtemple',
    name: 'Cloud Temple',
    category: 'AI / Cloud',
    description: 'Acteur majeur du Cloud de confiance souverain qualifié SecNumCloud, hébergeant les données sensibles et modèles IA critiques.',
    descriptionEn: 'Leading European sovereign cloud qualified SecNumCloud for hosting sensitive data and critical AI.',
    logoText: 'CLOUD TEMPLE',
    badgeColor: '#00BFA5',
    keySynergy: 'SecNumCloud & Sovereign European AI'
  },
  {
    id: 'part-grafana',
    name: 'Grafana Labs',
    category: 'DevSecOps',
    description: 'Suite d\'observabilité leader (Grafana, Prometheus, Loki, Tempo) pour monitorer les performances et métriques DORA.',
    descriptionEn: 'The open observability platform for unified metrics, logs, traces and DORA monitoring.',
    logoText: 'Grafana',
    badgeColor: '#F46800',
    keySynergy: 'Full-stack Observability & Telemetry'
  },
  {
    id: 'part-safe',
    name: 'Scaled Agile (SAFe)',
    category: 'Software / DevSecOps',
    description: 'Cadre de référence mondial pour aligner le delivery d\'ingénierie et la stratégie d\'entreprise à grande échelle.',
    descriptionEn: 'World-leading framework for scaling agile and aligning delivery with business strategy.',
    logoText: 'SCALED AGILE',
    badgeColor: '#1B365D',
    keySynergy: 'Enterprise Agility & Scaled Value Stream'
  }
];

export const CLIENT_REFERENCES: ClientReference[] = [
  {
    id: 'ref-1',
    clientName: 'Licorne FinTech / Scale-Up',
    segment: 'startup-eti',
    segmentLabel: 'Start-up & ETI',
    segmentLabelEn: 'Startup & Scale-Up',
    sector: 'tech',
    sectorLabel: 'Tech & FinTech',
    sectorLabelEn: 'Tech & FinTech',
    impactPillar: 'TRANSFORMER',
    title: 'Platform Engineering & DORA',
    titleEn: 'Platform Engineering & DORA Scale',
    challenge: 'Hyper-croissance de l’équipe d’ingénierie (de 30 à 250 devs) générant une perte de vélocité et des pannes de déploiement fréquentes.',
    challengeEn: 'Hyper-growth in engineering team caused severe coordination drag, slow releases, and deployment incidents.',
    solution: 'Création d’une Internal Developer Platform (IDP) en self-service, adoption des Team Topologies et outillage CI/CD DevSecOps.',
    solutionEn: 'Built an internal self-service developer platform (IDP), reorganized squads via Team Topologies, and upgraded GitOps CI/CD.',
    results: [
      'Fréquence de déploiement multipliée par 5 (plusieurs fois par jour)',
      'Lead Time for Changes divisé par 4 (de 5 jours à 4 heures)',
      'Satisfaction développeurs (DevEx score) augmentée de 75%'
    ],
    resultsEn: [
      '5x increase in deployment frequency (multiple releases per day)',
      'Lead Time for Changes cut by 75% (from 5 days to 4 hours)',
      'DevEx satisfaction score rose by 75%'
    ],
    tags: ['Platform Eng', 'IDP', 'Team Topologies', 'DevEx', 'DORA'],
    image: craftsmanImg,
    verbatim: "La mise en place de notre plateforme interne en libre-service a transformé le quotidien de nos 250 développeurs. Déployer en production est redevenu un non-événement fluide.",
    verbatimEn: "Deploying our self-service developer platform transformed the daily life of our 250 developers. Production releases are now a confident, painless routine.",
    verbatimAuthor: "VP Engineering & Infrastructure",
    verbatimAuthorEn: "VP of Engineering & Cloud Infrastructure",
    whatWeDid: [
      "Création d'une Internal Developer Platform (IDP) unifiée avec Kubernetes & GitOps",
      "Réorganisation des équipes selon le modèle Team Topologies (Stream vs Platform teams)",
      "Automatisation des contrôles de sécurité DevSecOps et observabilité Grafana",
      "Coaching DORA permettant d'atteindre le statut Elite (releases pluriquotidiennes)"
    ],
    whatWeDidEn: [
      "Engineered unified self-service Internal Developer Platform (IDP) with Kubernetes & GitOps",
      "Restructured teams around Team Topologies (Stream-aligned vs Platform squads)",
      "Automated DevSecOps policy-as-code guardrails and end-to-end Grafana observability",
      "Coached squads to achieve DORA Elite status with multiple daily zero-downtime releases"
    ],
    livePrototypeUrl: 'https://cube-v.vercel.app/',
    livePrototypeTitle: 'CUBE V5 · Prototype FinTech & Investissement',
    livePrototypeBadge: 'React Live // Cube V5 Desktop'
  },
  {
    id: 'ref-2',
    clientName: 'Carrefour & Grande Distribution',
    segment: 'grand-compte',
    segmentLabel: 'Grand Compte',
    segmentLabelEn: 'Enterprise Leader',
    sector: 'retail',
    sectorLabel: 'Retail & Omnicanal',
    sectorLabelEn: 'Retail & Omnichannel',
    impactPillar: 'INNOVER',
    title: 'Architecture Event-Driven & Encaissement',
    titleEn: 'Event-Driven Architecture & Checkout',
    challenge: 'Garantir un encaissement fluide et la synchronisation des stocks en temps réel sur 1 500 magasins lors des pics critiques (Black Friday, fêtes).',
    challengeEn: 'Guarantee zero-downtime checkout and real-time inventory sync across 1,500 stores during critical peak periods.',
    solution: 'Refonte vers une architecture Event-Driven basée sur Apache Kafka, microservices Rust/Go et observabilité distribuée.',
    solutionEn: 'Event-Driven replatforming powered by Apache Kafka, resilient Rust/Go microservices and distributed OpenTelemetry.',
    results: [
      'Latence de synchronisation des stocks divisée par 3 (< 100ms)',
      '100% de disponibilité lors des records d’affluence Black Friday',
      'Économie de 28% sur les coûts d’infrastructure Cloud'
    ],
    resultsEn: [
      'Stock sync latency cut by 3x (< 100ms)',
      '100% uptime during record Black Friday retail traffic',
      '28% cloud infrastructure cost optimization'
    ],
    tags: ['Kafka', 'Event-Driven', 'Rust / Go', 'DDD', 'Cloud Hybride'],
    image: retailImg,
    verbatim: "Grâce aux Strike Teams Zenika, notre plateforme d'encaissement et de stock omnicanale a absorbé les records du Black Friday avec zéro interruption et une latence divisée par trois.",
    verbatimEn: "Thanks to Zenika's Strike Teams, our retail POS and real-time stock platform handled record Black Friday traffic with zero downtime and 3x faster throughput.",
    verbatimAuthor: "Directeur Technique Retail & Omnicanal",
    verbatimAuthorEn: "VP Engineering Retail & Omnichannel",
    whatWeDid: [
      "Audit flash des goulots d'étranglement et cartographie des flux via Event Storming",
      "Conception de l'architecture cible Event-Driven haute résilience",
      "Implémentation du cluster Kafka et microservices avec découpage Domain-Driven Design",
      "Accompagnement de 6 squads et ancrage des pratiques Craft (TDD, CI/CD automatisée)"
    ],
    whatWeDidEn: [
      "Flash bottleneck audit and stream mapping through Event Storming",
      "Resilient target Event-Driven architecture design",
      "Kafka cluster rollout and microservices decoupling via Domain-Driven Design",
      "Empowered 6 feature squads with strict Craft standards (TDD, automated CI/CD)"
    ]
  },
  {
    id: 'ref-3',
    clientName: 'Banque & Assurance Internationale',
    segment: 'grand-compte',
    segmentLabel: 'Grand Compte',
    segmentLabelEn: 'Enterprise Leader',
    sector: 'finance',
    sectorLabel: 'Banque & Assurance',
    sectorLabelEn: 'Banking & Insurance',
    impactPillar: 'OPTIMISER',
    title: 'Modernisation Legacy & Microservices',
    titleEn: 'Legacy Modernization & Microservices',
    challenge: 'Un cœur de gestion monolithique vieux de 15 ans bloquait la mise sur le marché de nouveaux services mobiles et coûtait des millions en maintenance.',
    challengeEn: 'A 15-year-old monolithic core slowed mobile product launches and created massive technical debt maintenance costs.',
    solution: 'Application du Strangler Fig Pattern, découpage par Domain-Driven Design (DDD), sécurisation des APIs avec Kong et automated testing TDD.',
    solutionEn: 'Applied Strangler Fig pattern, Domain-Driven Design decomposition, Kong API security and strict TDD.',
    results: [
      'Temps de mise en production d’une nouvelle feature réduit de 6 mois à 2 semaines',
      '99.995% de disponibilité lors des pics de clôture annuelle',
      'Réduction des coûts d’infrastructure de 32%'
    ],
    resultsEn: [
      'Time-to-market for new features cut from 6 months to 2 weeks',
      '99.995% uptime during peak fiscal year-end traffic',
      '32% cloud infrastructure cost savings'
    ],
    tags: ['Strangler Fig', 'DDD', 'Kong API', 'TDD', 'DORA'],
    image: fintechImg,
    youtubeId: 'dpWEywqvEzA',
    videoTitle: 'Urba360 : Pilotage des Risques & Scoring Financier',
    verbatim: "Zenika a réussi en 4 mois ce que deux intégrateurs traditionnels n'avaient pas stabilisé en 18 mois. Leur rigueur d'artisans du code a fait toute la différence.",
    verbatimEn: "Zenika achieved in 4 months what two traditional system integrators struggled to stabilize over 18 months. Their software craft rigor was the game changer.",
    verbatimAuthor: "Directeur de la Transformation Digitale & Systèmes Cœur",
    verbatimAuthorEn: "Head of Digital Transformation & Core Banking",
    whatWeDid: [
      "Migration progressive du monolithe par Strangler Fig Pattern sans arrêt de service",
      "Découpage modulaire par Domain-Driven Design (DDD) et passerelles API sécurisées",
      "Couverture de tests automatisés portée à 92% garantissant zéro régression financière",
      "Formation continue des 40 ingénieurs internes aux principes de Clean Architecture"
    ],
    whatWeDidEn: [
      "Zero-downtime gradual monolith refactoring via Strangler Fig Pattern",
      "Modular Domain-Driven Design bounded contexts and secure API gateways",
      "Automated test coverage raised to 92% ensuring zero financial regressions",
      "Mentored and upskilled 40 internal engineers in Clean Architecture and TDD"
    ]
  },
  {
    id: 'ref-4',
    clientName: 'Spin-off Santé Digitale d’un Grand Groupe',
    segment: 'spin-off',
    segmentLabel: 'Filiale Spin-off',
    segmentLabelEn: 'Corporate Spin-off',
    sector: 'health',
    sectorLabel: 'Santé & MedTech',
    sectorLabelEn: 'Health & MedTech',
    impactPillar: 'INNOVER',
    title: 'Diagnostic Médical AI-Native',
    titleEn: 'AI-Native Clinical Diagnostics',
    challenge: 'Créer de zéro en 5 mois une application certifiée de traitement d’images médicales assistée par IA avec hébergement de santé souverain.',
    challengeEn: 'Build from scratch in 5 months a certified medical imaging platform with sovereign cloud health compliance.',
    solution: 'Développement clé en mains par une Lean Strike Team Zenika, intégration de modèles de computer vision sur Cloud Temple (SecNumCloud / HDS).',
    solutionEn: 'Turnkey delivery by a Zenika Lean Strike Team, multimodal computer vision models deployed on sovereign Cloud Temple (HDS certified).',
    results: [
      'Lancement réussi dans les délais pour la certification CE Médical',
      'Traitement d’un examen d’imagerie en moins de 3 secondes',
      'Architecture 100% souveraine et conforme RGPD Santé'
    ],
    resultsEn: [
      'On-time launch fulfilling all CE Medical Device certification requirements',
      'Sub-3-second imaging inference time',
      '100% sovereign and European health data compliant'
    ],
    tags: ['AI-Native', 'Computer Vision', 'SecNumCloud', 'Turnkey Delivery'],
    image: teamReelImg,
    verbatim: "Tenir le jalon critique de la certification CE Médical en 5 mois semblait impossible. Zenika a tenu ses engagements au jour près avec une architecture souveraine irréprochable.",
    verbatimEn: "Hitting the strict CE Medical Device compliance deadline in 5 months felt daunting. Zenika delivered right on time with an exemplary sovereign cloud architecture.",
    verbatimAuthor: "Chief Technology & Medical Product Officer",
    verbatimAuthorEn: "Chief Technology & Medical Product Officer",
    whatWeDid: [
      "Développement clé en mains de la solution par une Lean Strike Team dédiée",
      "Intégration et optimisation de modèles de computer vision pour l'imagerie médicale",
      "Déploiement sur Cloud Souverain Cloud Temple qualifié SecNumCloud et certifié HDS",
      "Mise en conformité rigoureuse avec l'EU AI Act et les exigences RGPD Santé"
    ],
    whatWeDidEn: [
      "Turnkey full-lifecycle product engineering executed by a dedicated Lean Strike Team",
      "Optimized computer vision inference pipelines for medical imaging diagnostics",
      "SecNumCloud and HDS-certified sovereign cloud deployment on Cloud Temple",
      "Rigorous alignment with European AI Act governance and health data compliance"
    ]
  },
  {
    id: 'ref-5',
    clientName: 'Constructeur Automobile Européen',
    segment: 'grand-compte',
    segmentLabel: 'Grand Compte',
    segmentLabelEn: 'Enterprise Leader',
    sector: 'industry',
    sectorLabel: 'Industrie & Mobilité',
    sectorLabelEn: 'Automotive & Mobility',
    impactPillar: 'INNOVER',
    title: 'Véhicules Connectés & Edge Systems',
    titleEn: 'Connected Vehicles & Edge Systems',
    challenge: 'Ingérer et analyser les flux télématiques de centaines de milliers de véhicules connectés avec des contraintes de sécurité et de latence critiques.',
    challengeEn: 'Ingest and analyze telematics streams from hundreds of thousands of connected vehicles with strict safety and ultra-low latency constraints.',
    solution: 'Architecture hybride Edge-to-Cloud, passerelles télématiques MQTT/gRPC et pipeline de streaming résilient avec failover automatique.',
    solutionEn: 'Hybrid Edge-to-Cloud architecture, high-throughput MQTT/gRPC telemetry gateways, and real-time streaming with automated failover.',
    results: [
      'Plus d’1 million de véhicules connectés simultanément en toute fluidité',
      'Latence de traitement télématique réduite de 65%',
      'Zéro faille de sécurité détectée lors des audits indépendants'
    ],
    resultsEn: [
      'Over 1 million vehicles connected concurrently with seamless performance',
      'Telematics stream processing latency reduced by 65%',
      'Zero security vulnerabilities discovered during independent audits'
    ],
    tags: ['Edge Computing', 'MQTT / gRPC', 'IoT', 'Streaming', 'Rust'],
    image: consultantsImg,
    verbatim: "La fluidité des flux télématiques et la robustesse du processing à bord reposent sur l'expertise chirurgicale de Zenika en architecture distribuée et Edge.",
    verbatimEn: "The speed of our telematics and the resilience of onboard processing stem directly from Zenika's surgical expertise in distributed Edge systems.",
    verbatimAuthor: "Lead Architect Connected Vehicle Platform",
    verbatimAuthorEn: "Lead Architect Connected Vehicle Platform",
    whatWeDid: [
      "Architecture hybride Edge-to-Cloud pour le traitement embarqué temps réel",
      "Optimisation des protocoles MQTT et gRPC pour les flux haute fréquence",
      "Mise en place de bancs de tests simulés et jumeaux numériques pour valider la robustesse",
      "Transfert de compétences et acculturation des équipes internes aux architectures réactives"
    ],
    whatWeDidEn: [
      "Hybrid Edge-to-Cloud architecture tailored for low-latency onboard processing",
      "Protocols optimization with MQTT and gRPC for high-throughput telematics feeds",
      "Digital twins and simulated test harnesses to validate failover robustness",
      "Upskilled internal engineers in reactive architectures and distributed data pipelines"
    ]
  },
  {
    id: 'ref-6',
    clientName: 'Leader Énergétique Européen',
    segment: 'grand-compte',
    segmentLabel: 'Grand Compte',
    segmentLabelEn: 'Enterprise Leader',
    sector: 'energy',
    sectorLabel: 'Énergie & Utilités',
    sectorLabelEn: 'Energy & Utilities',
    impactPillar: 'INNOVER',
    title: 'Plateforme IoT & IA Prédictive pour le Réseau Intelligent (Smart Grid)',
    titleEn: 'IoT & Predictive AI Platform for Smart Grid Management',
    challenge: 'Gérer des téraoctets de données de capteurs en temps réel pour anticiper les pics de consommation et optimiser l’injection des énergies renouvelables.',
    challengeEn: 'Ingest terabytes of real-time sensor data to forecast grid consumption spikes and optimize renewable distribution.',
    solution: 'Architecture temps réel Kafka + Databricks, pipelines de streaming résilients et modèles d’IA prédictive déployés sur Kubernetes.',
    solutionEn: 'Real-time Kafka + Databricks architecture with streaming pipelines and predictive AI running on Kubernetes.',
    results: [
      '-40% de temps de détection des anomalies réseau',
      'Ingestion de 50 000 événements/seconde avec zéro perte',
      'Passage en production en moins de 4 mois grâce à une Lean Strike Team'
    ],
    resultsEn: [
      '-40% reduction in grid anomaly detection time',
      'Ingestion of 50,000 events/sec with zero packet loss',
      'Production deployment in under 4 months via Lean Strike Teams'
    ],
    tags: ['Kafka', 'Databricks', 'Streaming', 'Kubernetes', 'Strike Team'],
    image: trainerImg,
    verbatim: "L'anticipation fine des pics de charge réseau a évité des surcoûts colossaux. L'apport combiné de Kafka et de Databricks par Zenika a été décisif.",
    verbatimEn: "Accurate forecasting of grid load spikes saved massive operational costs. Zenika's dual mastery of Kafka and Databricks proved pivotal.",
    verbatimAuthor: "DSI Infrastructure & Réseaux Intelligents",
    verbatimAuthorEn: "CIO Infrastructure & Smart Networks",
    whatWeDid: [
      "Ingestion continue de 50 000 événements de capteurs/seconde sans aucune perte",
      "Pipelines Databricks unifiant données temps réel et séries temporelles historiques",
      "Modèles de Machine Learning prédictif prévoyant les déséquilibres de charge",
      "Formation certifiante de 35 data engineers via Zenika Training"
    ],
    whatWeDidEn: [
      "Continuous ingestion of 50,000 sensor events/sec with zero telemetry packet loss",
      "Databricks pipelines uniting streaming events with historic timeseries",
      "Predictive machine learning models anticipating grid imbalance spikes",
      "Certified 35 internal data engineers through customized Zenika Training curricula"
    ]
  }
];

export const AGENCIES_LOCATIONS: AgencyLocation[] = [
  // France
  {
    city: 'Paris',
    country: 'France',
    region: 'Île-de-France',
    isHQ: true,
    address: '53 rue de Châteaudun - 75009 Paris',
    phone: '+33(0)1 45 26 19 15',
    category: 'France'
  },
  {
    city: 'Bordeaux',
    country: 'France',
    region: 'Nouvelle-Aquitaine',
    address: '21 Quai Lawton Bat G3 - 33000 Bordeaux',
    phone: '+33(0)1 45 26 19 15',
    category: 'France'
  },
  {
    city: 'Brest',
    country: 'France',
    region: 'Bretagne',
    address: '37 rue Jean-Marie Le Bris - 29200 Brest',
    phone: '+33(0)1 45 26 19 15',
    category: 'France'
  },
  {
    city: 'Clermont-Ferrand',
    country: 'France',
    region: 'Auvergne-Rhône-Alpes',
    address: 'Turing 22, 22 Allée Alan Turing - 63000 Clermont-Ferrand',
    phone: '+33 (0)1 45 26 19 15',
    category: 'France'
  },
  {
    city: 'Grenoble',
    country: 'France',
    region: 'Auvergne-Rhône-Alpes',
    address: '8 Av. Alsace Lorraine - 38000 Grenoble',
    phone: '+33 (0)1 45 26 19 15',
    category: 'France'
  },
  {
    city: 'Lille',
    country: 'France',
    region: 'Hauts-de-France',
    address: '1001 Av. de la République - 59700 Marcq-en-Barœul',
    phone: '+33(0)1 45 26 19 15',
    category: 'France'
  },
  {
    city: 'Lyon',
    country: 'France',
    region: 'Auvergne-Rhône-Alpes',
    address: 'Le Lugdunum, 5 place Jules Ferry - 69006 Lyon',
    phone: '+33 (0)1 45 26 19 15',
    category: 'France'
  },
  {
    city: 'Nantes',
    country: 'France',
    region: 'Pays de la Loire',
    address: '2ter Quai François Mitterrand - 44200 Nantes',
    phone: '+33(0)1 87 16 49 25',
    category: 'France'
  },
  {
    city: 'Niort',
    country: 'France',
    region: 'Nouvelle-Aquitaine',
    address: '12 Av. Jacques Bujault, 79000 Niort',
    phone: '+33(0)1 87 16 49 25',
    category: 'France'
  },
  {
    city: 'Rennes',
    country: 'France',
    region: 'Bretagne',
    address: '74a Rue de Paris - 35000 Rennes',
    phone: '+33(0)1 45 26 19 15',
    category: 'France'
  },
  {
    city: 'Toulouse',
    country: 'France',
    region: 'Occitanie',
    address: 'Espace HarryCow, 13 Rue Sainte-Ursule, 31000 Toulouse',
    phone: '+33(0)1 45 26 19 15',
    category: 'France'
  },

  // International
  {
    city: 'Casablanca',
    country: 'Maroc',
    region: 'Casablanca-Settat',
    address: 'Technopark Casablanca, Boulevard Dammam, 20072',
    phone: '+212 06 61 68 02 02',
    category: 'International'
  },
  {
    city: 'Singapour',
    country: 'Singapour',
    region: 'Asie-Pacifique',
    address: '20 Bendemeer Rd, #03-10 BS Bendemeer Centre, Singapour 339914',
    phone: '+33(0)1 45 26 19 15',
    category: 'International'
  }
];
