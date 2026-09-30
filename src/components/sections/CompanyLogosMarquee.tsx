import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Building2 } from 'lucide-react';
import { Language } from '../../types';

interface CompanyLogosMarqueeProps {
  lang: Language;
  variant?: 'banner' | 'standalone';
  className?: string;
}

interface EnterpriseLogo {
  id: string;
  name: string;
  sectorFr: string;
  sectorEn: string;
  tickerFr: string;
  tickerEn: string;
  brandColor: string;
  // SVG rendering helper
  renderLogo: (color: string) => React.ReactNode;
}

export const ENTERPRISE_LOGOS: EnterpriseLogo[] = [
  {
    id: 'carrefour',
    name: 'Carrefour',
    sectorFr: 'Grande Distribution & E-commerce',
    sectorEn: 'Retail & E-commerce',
    tickerFr: 'Architecture e-commerce & Temps réel',
    tickerEn: 'E-commerce Architecture & Real-time',
    brandColor: '#004E9A',
    renderLogo: () => (
      <svg viewBox="0 0 140 36" fill="currentColor" style={{ height: '56px' }} className="h-14 w-auto max-w-[190px]">
        {/* Carrefour stylized emblem + wordmark */}
        <path d="M14 6 C7 6 2 11.5 2 18 C2 24.5 7 30 14 30 C18 30 21.5 28 23.5 25 L18 20 C17 22 15.5 23 14 23 C11 23 9 20.8 9 18 C9 15.2 11 13 14 13 C15.5 13 17 14 18 16 L23.5 11 C21.5 8 18 6 14 6 Z" fill="#004E9A" />
        <path d="M26 18 L32 12 L32 24 Z" fill="#E60039" />
        <text x="38" y="24" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="18" letterSpacing="-0.5">Carrefour</text>
      </svg>
    )
  },
  {
    id: 'bnp-paribas',
    name: 'BNP Paribas',
    sectorFr: 'Banque & Marchés Financiers',
    sectorEn: 'Banking & Financial Markets',
    tickerFr: 'Cloud Hybride & Sécurité Souveraine',
    tickerEn: 'Hybrid Cloud & Sovereign Security',
    brandColor: '#00915A',
    renderLogo: () => (
      <svg viewBox="0 0 160 36" fill="currentColor" style={{ height: '56px' }} className="h-14 w-auto max-w-[220px]">
        <rect x="2" y="5" width="26" height="26" rx="5" fill="#00915A" />
        {/* Flying stars emblem */}
        <circle cx="9" cy="22" r="2" fill="#FFFFFF" />
        <circle cx="15" cy="18" r="2.2" fill="#FFFFFF" />
        <circle cx="21" cy="12" r="2.4" fill="#FFFFFF" />
        <text x="35" y="17" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.2">BNP PARIBAS</text>
        <text x="35" y="27" fontFamily="system-ui, sans-serif" fontWeight="500" fontSize="8" letterSpacing="1" opacity="0.75">LA BANQUE D'UN MONDE QUI CHANGE</text>
      </svg>
    )
  },
  {
    id: 'renault',
    name: 'Renault Group',
    sectorFr: 'Automobile & Véhicule Connecté',
    sectorEn: 'Automotive & Connected Vehicles',
    tickerFr: 'Software-Defined Vehicle & IoT Edge',
    tickerEn: 'Software-Defined Vehicle & IoT Edge',
    brandColor: '#F59E0B',
    renderLogo: () => (
      <svg viewBox="0 0 145 36" fill="currentColor" style={{ height: '56px' }} className="h-14 w-auto max-w-[200px]">
        {/* Diamond Lozenge */}
        <path d="M15 3 L25 18 L15 33 L5 18 Z M15 9 L10 18 L15 27 L20 18 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
        <text x="34" y="23" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="17" letterSpacing="1">RENAULT</text>
      </svg>
    )
  },
  {
    id: 'orange',
    name: 'Orange',
    sectorFr: 'Télécommunications & 5G',
    sectorEn: 'Telecommunications & 5G',
    tickerFr: 'Plateforme Kubernetes multi-cloud',
    tickerEn: 'Multi-cloud Kubernetes Platform',
    brandColor: '#FF6600',
    renderLogo: () => (
      <svg viewBox="0 0 120 36" fill="currentColor" style={{ height: '56px' }} className="h-14 w-auto max-w-[180px]">
        <rect x="3" y="6" width="24" height="24" fill="#FF6600" rx="3" />
        <text x="35" y="23" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="18" letterSpacing="-0.5">orange</text>
      </svg>
    )
  },
  {
    id: 'decathlon',
    name: 'Decathlon',
    sectorFr: 'Sport & Retail Mondial',
    sectorEn: 'Sports & Global Retail',
    tickerFr: 'Architecture Micro-Frontends & Event-Driven',
    tickerEn: 'Micro-Frontends & Event-Driven Architecture',
    brandColor: '#0082C3',
    renderLogo: () => (
      <svg viewBox="0 0 150 36" fill="currentColor" style={{ height: '56px' }} className="h-14 w-auto max-w-[210px]">
        <rect x="2" y="6" width="144" height="24" rx="4" fill="#0082C3" />
        <text x="74" y="22" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="14" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">DECATHLON</text>
      </svg>
    )
  },
  {
    id: 'totalenergies',
    name: 'TotalEnergies',
    sectorFr: 'Énergie & Transition Bas-Carbone',
    sectorEn: 'Energy & Multi-Energies Transition',
    tickerFr: 'Sobriété Numérique & Green IT',
    tickerEn: 'Digital Sobriety & Green IT',
    brandColor: '#ED1C24',
    renderLogo: () => (
      <svg viewBox="0 0 160 36" fill="currentColor" style={{ height: '56px' }} className="h-14 w-auto max-w-[220px]">
        <circle cx="15" cy="18" r="11" fill="#ED1C24" />
        <path d="M15 9 A 9 9 0 0 1 24 18" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
        <path d="M15 27 A 9 9 0 0 1 6 18" stroke="#FFCC00" strokeWidth="2.5" fill="none" />
        <text x="32" y="22" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="15" letterSpacing="-0.3">TotalEnergies</text>
      </svg>
    )
  },
  {
    id: 'sncf',
    name: 'SNCF',
    sectorFr: 'Transport & Mobilité Ferroviaire',
    sectorEn: 'Transportation & Mobility',
    tickerFr: 'Systèmes critiques temps réel & Billettique',
    tickerEn: 'Real-time Mission Critical Ticketing',
    brandColor: '#82103C',
    renderLogo: () => (
      <svg viewBox="0 0 110 36" fill="currentColor" style={{ height: '56px' }} className="h-14 w-auto max-w-[170px]">
        <rect x="2" y="7" width="102" height="22" rx="11" fill="#82103C" />
        <text x="53" y="22" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="14" fontStyle="italic" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">SNCF</text>
      </svg>
    )
  },
  {
    id: 'socgen',
    name: 'Société Générale',
    sectorFr: 'Banque d’Investissement & Retail',
    sectorEn: 'Corporate & Investment Banking',
    tickerFr: 'Architecture Domain-Driven Design & APIs',
    tickerEn: 'Domain-Driven Design & API Architecture',
    brandColor: '#E60028',
    renderLogo: () => (
      <svg viewBox="0 0 165 36" fill="currentColor" style={{ height: '56px' }} className="h-14 w-auto max-w-[230px]">
        {/* Dual square red & black */}
        <rect x="2" y="6" width="24" height="12" fill="#E60028" />
        <rect x="2" y="18" width="24" height="12" fill="#1A1A1A" />
        <line x1="2" y1="18" x2="26" y2="18" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="32" y="18" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="11" letterSpacing="0.5">SOCIETE</text>
        <text x="32" y="27" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="11" letterSpacing="0.5">GENERALE</text>
      </svg>
    )
  },
  {
    id: 'loreal',
    name: 'L’Oréal',
    sectorFr: 'Luxe & Cosmétique Mondial',
    sectorEn: 'Beauty Tech & Global Luxury',
    tickerFr: 'Plateforme E-commerce & IA Générative',
    tickerEn: 'Global E-commerce & Generative AI',
    brandColor: '#D4AF37',
    renderLogo: () => (
      <svg viewBox="0 0 135 36" fill="currentColor" style={{ height: '56px' }} className="h-14 w-auto max-w-[190px]">
        <text x="67" y="23" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18" letterSpacing="2" textAnchor="middle">L'ORÉAL</text>
      </svg>
    )
  },
  {
    id: 'edf',
    name: 'EDF',
    sectorFr: 'Énergie & Réseaux Électriques',
    sectorEn: 'Nuclear & Renewable Energy Grids',
    tickerFr: 'Systèmes SCADA & Résilience Opérationnelle',
    tickerEn: 'SCADA Systems & High Operational Resilience',
    brandColor: '#0055A5',
    renderLogo: () => (
      <svg viewBox="0 0 110 36" fill="currentColor" style={{ height: '56px' }} className="h-14 w-auto max-w-[170px]">
        <circle cx="16" cy="18" r="11" fill="#FF5F00" />
        <path d="M16 10 L23 18 L16 26" fill="#0055A5" />
        <text x="34" y="24" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="19" letterSpacing="1">EDF</text>
      </svg>
    )
  },
  {
    id: 'airbus',
    name: 'Airbus',
    sectorFr: 'Aéronautique & Systèmes Critiques',
    sectorEn: 'Aerospace & Mission-Critical Systems',
    tickerFr: 'Engineering Craft & DevOps Industriel',
    tickerEn: 'Engineering Craft & Industrial DevOps',
    brandColor: '#00205B',
    renderLogo: () => (
      <svg viewBox="0 0 135 36" fill="currentColor" style={{ height: '56px' }} className="h-14 w-auto max-w-[190px]">
        <text x="67" y="23" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="17" letterSpacing="2" textAnchor="middle">AIRBUS</text>
      </svg>
    )
  },
  {
    id: 'michelin',
    name: 'Michelin',
    sectorFr: 'Mobilité Durable & Industrie 4.0',
    sectorEn: 'Sustainable Mobility & Industry 4.0',
    tickerFr: 'IoT Manufacturier & Data Pipelines',
    tickerEn: 'Manufacturing IoT & Data Pipelines',
    brandColor: '#002E6D',
    renderLogo: () => (
      <svg viewBox="0 0 135 36" fill="currentColor" style={{ height: '56px' }} className="h-14 w-auto max-w-[190px]">
        <rect x="2" y="7" width="130" height="22" rx="4" fill="#002E6D" />
        <text x="67" y="22" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="13" fontStyle="italic" fill="#FFCC00" textAnchor="middle" letterSpacing="1">MICHELIN</text>
      </svg>
    )
  },
  {
    id: 'thales',
    name: 'Thales',
    sectorFr: 'Défense, Sécurité & Identité Numérique',
    sectorEn: 'Defense, Cyber & Digital Identity',
    tickerFr: 'Architecture Zero-Trust & Cybersécurité',
    tickerEn: 'Zero-Trust Architecture & Cybersecurity',
    brandColor: '#003366',
    renderLogo: () => (
      <svg viewBox="0 0 130 36" fill="currentColor" style={{ height: '56px' }} className="h-14 w-auto max-w-[190px]">
        <text x="65" y="23" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="17" letterSpacing="1.5" textAnchor="middle">THALES</text>
      </svg>
    )
  },
  {
    id: 'laposte',
    name: 'La Poste',
    sectorFr: 'Services de Proximité & Logistique',
    sectorEn: 'Proximity Services & Logistics',
    tickerFr: 'Plateformes API & Numérisation à l’échelle',
    tickerEn: 'API Platforms & Digital Modernization',
    brandColor: '#FFD700',
    renderLogo: () => (
      <svg viewBox="0 0 135 36" fill="currentColor" style={{ height: '56px' }} className="h-14 w-auto max-w-[190px]">
        <circle cx="16" cy="18" r="11" fill="#FFD700" />
        <path d="M12 18 L19 13 L17 18 L21 23 Z" fill="#003366" />
        <text x="35" y="22" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="14" letterSpacing="0.2">LA POSTE</text>
      </svg>
    )
  },
  {
    id: 'sanofi',
    name: 'Sanofi',
    sectorFr: 'Santé, Pharma & BioTech',
    sectorEn: 'Healthcare, Pharma & BioTech',
    tickerFr: 'IA & Data Platform pour la Recherche Médicale',
    tickerEn: 'AI & Data Platform for Medical Research',
    brandColor: '#7A003C',
    renderLogo: () => (
      <svg viewBox="0 0 130 36" fill="currentColor" style={{ height: '56px' }} className="h-14 w-auto max-w-[190px]">
        <text x="65" y="23" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18" letterSpacing="1" textAnchor="middle">sanofi</text>
      </svg>
    )
  }
];

export const CompanyLogosMarquee: React.FC<CompanyLogosMarqueeProps> = ({
  lang,
  variant = 'standalone',
  className = '',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScroll();
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const handleScrollManual = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const delta = direction === 'left' ? -380 : 380;
    scrollRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    setTimeout(checkScroll, 350);
  };

  return (
    <section 
      aria-label={lang === 'fr' ? 'Entreprises partenaires et clientes Zenika' : 'Zenika enterprise clients and partners'}
      className={`relative w-full py-8 sm:py-10 border-y border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-[#07090F]/90 backdrop-blur-md transition-colors select-none ${className}`}
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 mb-5 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left Headline & Pitch (icon removed per user request) */}
        <div>
          <h3 className="text-xs sm:text-sm font-display uppercase tracking-wider font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>{lang === 'fr' ? 'Ils construisent leur SI avec Zenika' : 'They build their IT with Zenika'}</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E60039]" />
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
            {lang === 'fr' 
              ? 'Du CAC 40 aux scale-ups de référence · Projets stratégiques & mission critical'
              : 'From enterprise leaders to top scale-ups · Strategic & mission critical delivery'}
          </p>
        </div>

        {/* Right Controls: Only Left / Right navigation arrows */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            type="button"
            onClick={() => handleScrollManual('left')}
            disabled={!canScrollLeft}
            className={`w-9 h-9 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center transition-all shadow-2xs ${
              canScrollLeft
                ? 'hover:border-[#E60039] text-slate-700 dark:text-slate-200 hover:text-[#E60039] bg-white dark:bg-[#0E131F] hover:bg-slate-50 dark:hover:bg-white/[0.06] cursor-pointer active:scale-90'
                : 'opacity-35 text-slate-400 dark:text-slate-600 bg-slate-100/80 dark:bg-white/[0.02] cursor-not-allowed'
            }`}
            aria-label={lang === 'fr' ? 'Faire défiler vers la gauche' : 'Scroll left'}
            title={lang === 'fr' ? 'Défiler à gauche' : 'Scroll left'}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => handleScrollManual('right')}
            disabled={!canScrollRight}
            className={`w-9 h-9 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center transition-all shadow-2xs ${
              canScrollRight
                ? 'hover:border-[#E60039] text-slate-700 dark:text-slate-200 hover:text-[#E60039] bg-white dark:bg-[#0E131F] hover:bg-slate-50 dark:hover:bg-white/[0.06] cursor-pointer active:scale-90'
                : 'opacity-35 text-slate-400 dark:text-slate-600 bg-slate-100/80 dark:bg-white/[0.02] cursor-not-allowed'
            }`}
            aria-label={lang === 'fr' ? 'Faire défiler vers la droite' : 'Scroll right'}
            title={lang === 'fr' ? 'Défiler à droite' : 'Scroll right'}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Static Logos Track Container with Edge Gradient Fades */}
      <div className="relative w-full overflow-hidden">
        {/* Left Fade Gradient */}
        <div 
          aria-hidden="true" 
          className={`absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-20 pointer-events-none bg-gradient-to-r from-white via-white/80 dark:from-[#07090F] dark:via-[#07090F]/80 to-transparent transition-opacity duration-300 ${
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          }`} 
        />
        {/* Right Fade Gradient */}
        <div 
          aria-hidden="true" 
          className={`absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-20 pointer-events-none bg-gradient-to-l from-white via-white/80 dark:from-[#07090F] dark:via-[#07090F]/80 to-transparent transition-opacity duration-300 ${
            canScrollRight ? 'opacity-100' : 'opacity-0'
          }`} 
        />

        {/* Static Horizontal Scroll Row without automatic animation */}
        <div 
          ref={scrollRef}
          className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 px-4 sm:px-8 max-w-[1720px] mx-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {ENTERPRISE_LOGOS.map((item) => (
            <div
              key={item.id}
              className="group/logo relative shrink-0 flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-[#0D111C] hover:shadow-md dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-default select-none min-w-[180px] sm:min-w-[210px] h-[88px] sm:h-[96px]"
            >
              {/* Logo SVG wrapper (56px / h-14 to match partner logos) */}
              <div className="text-slate-600 dark:text-slate-400 group-hover/logo:text-slate-900 dark:group-hover/logo:text-white transition-colors duration-200 flex items-center justify-center h-14">
                {item.renderLogo(item.brandColor)}
              </div>

              {/* Subtitle tooltip pill on hover */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/logo:opacity-100 transition-all duration-200 pointer-events-none z-30 whitespace-nowrap">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md">
                  {lang === 'fr' ? item.sectorFr : item.sectorEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
