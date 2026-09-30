export type Language = 'fr' | 'en';
export type Theme = 'dark' | 'light';


export interface SolutionBlock {
  id: string;
  category: 'business-impact' | 'methodology' | 'core-expertise';
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  description: string;
  descriptionEn: string;
  bulletPoints: string[];
  bulletPointsEn: string[];
  color: string;
  iconName: string;
  tags: string[];
  tier: 1 | 2 | 3;
}

export interface OperatingModel {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  description: string;
  descriptionEn: string;
  useCase: string;
  useCaseEn: string;
  duration: string;
  deliverables: string[];
  deliverablesEn: string[];
  icon: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  category: 'AI / Data' | 'AI / Software' | 'Software / DevSecOps' | 'AI / Data / Cloud' | 'Cloud' | 'DevSecOps' | 'AI / Software / DevSecOps / Cloud' | 'AI / Cloud';
  description: string;
  descriptionEn: string;
  logoText: string;
  badgeColor: string;
  keySynergy: string;
}

export interface ClientReference {
  id: string;
  clientName: string;
  segment: 'grand-compte' | 'startup-eti' | 'spin-off';
  segmentLabel: string;
  segmentLabelEn: string;
  sector: 'energy' | 'finance' | 'retail' | 'health' | 'industry' | 'tech';
  sectorLabel: string;
  sectorLabelEn: string;
  impactPillar: 'OPTIMISER' | 'INNOVER' | 'TRANSFORMER';
  title: string;
  titleEn: string;
  challenge: string;
  challengeEn: string;
  solution: string;
  solutionEn: string;
  results: string[];
  resultsEn: string[];
  tags: string[];
  image?: string;
  verbatim?: string;
  verbatimEn?: string;
  verbatimAuthor?: string;
  verbatimAuthorEn?: string;
  whatWeDid?: string[];
  whatWeDidEn?: string[];
  livePrototypeUrl?: string;
  livePrototypeTitle?: string;
  livePrototypeBadge?: string;
  youtubeId?: string;
  videoTitle?: string;
}

export interface AgencyLocation {
  city: string;
  country: string;
  region: string;
  isHQ?: boolean;
  address?: string;
  phone?: string;
  category?: 'France' | 'International';
}
