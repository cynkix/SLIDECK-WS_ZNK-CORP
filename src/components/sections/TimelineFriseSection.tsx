import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Language } from '../../types';
import { Zenika20YearsLogo } from '../brand/Zenika20YearsLogo';

import img2026 from '../../assets/images/zenika_advisory_vision_1788525128241.jpg';
import img2024 from '../../assets/images/zenika_academy_share_1788525165084.jpg';
import img2021 from '../../assets/images/zenika_consultants_1788513838189.jpg';
import img2019 from '../../assets/images/zenika_team_reel_1788513802230.jpg';
import img2016 from '../../assets/images/zenika_event_panorama_1790086745807.jpg';
import img2012 from '../../assets/images/zenika_strike_teams_1788525145849.jpg';
import img2006 from '../../assets/images/zenika_craftsman_1788513818775.jpg';

interface TimelineFriseSectionProps {
  lang: Language;
}

export const TimelineFriseSection: React.FC<TimelineFriseSectionProps> = ({ lang }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const milestones = [
    {
      year: '2026',
      title: lang === 'fr' ? 'IA Souveraine & Ère Agentique' : 'Sovereign AI & Agentic Era',
      desc: lang === 'fr' 
        ? 'Plateformes d\'IA souveraines, agents autonomes et 20 ans d\'artisanat logiciel d\'exception' 
        : 'Pioneering sovereign enterprise AI platforms, agentic workflows, and 20 years of craftsmanship',
      tag: '2006 — 2026',
      image: img2026
    },
    {
      year: '2024',
      title: lang === 'fr' ? 'Alliance DecenZ & Sobriété' : 'DecenZ & Green Tech',
      desc: lang === 'fr'
        ? 'Éco-conception logicielle, souveraineté numérique et gouvernance éthique au cœur de l\'ingénierie'
        : 'Digital sobriety, sovereign cloud frameworks, and ethical algorithmic sustainability',
      tag: 'Impact & ESG',
      image: img2024
    },
    {
      year: '2021',
      title: 'Casablanca',
      desc: lang === 'fr' 
        ? 'Extension de notre présence internationale et hub technologique d\'excellence en Afrique du Nord'
        : 'Expanding our global presence to North Africa',
      tag: 'Global Reach',
      image: img2021
    },
    {
      year: '2019',
      title: 'Great Place to Work',
      desc: lang === 'fr'
        ? 'Reconnaissance n°1 pour notre culture d\'entreprise d\'épanouissement et de partage'
        : 'Recognized for our exceptional company culture',
      tag: 'Culture',
      image: img2019
    },
    {
      year: '2016',
      title: 'Design Force',
      desc: lang === 'fr'
        ? 'Renforcement de nos capacités créatives, convergence étroite entre Design, Produit et Tech'
        : 'Strengthening our creative capabilities',
      tag: 'Product & UX',
      image: img2016
    },
    {
      year: '2012',
      title: lang === 'fr' ? 'Révolution Cloud & DevOps' : 'Cloud & DevOps',
      desc: lang === 'fr'
        ? 'Pionnier en France de l\'adoption de Docker, Kubernetes et des architectures distribuées'
        : 'Pioneering containerization, Kubernetes, and distributed cloud microservices',
      tag: 'DevOps & Cloud',
      image: img2012
    },
    {
      year: '2006',
      title: 'Agile',
      desc: lang === 'fr'
        ? 'Fondation de Zenika par Carl Azoury. Promotion pionnière des méthodologies agiles et du code craft'
        : 'Pioneering agile methodologies',
      tag: 'Founding DNA',
      image: img2006
    }
  ];

  return (
    <section id="timeline-frise" className="py-12 sm:py-16 bg-white dark:bg-[#07090E] border-t border-slate-200 dark:border-white/10 transition-colors duration-200 overflow-hidden">
      {/* Horizontal Scroll Frise matching user screenshot */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          {/* Timeline Title & Subtitle without the redundant badge */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-3 sm:gap-4">
              <Zenika20YearsLogo height={42} className="text-[#E60039] shrink-0 hover:scale-105 transition-transform" />
              <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-slate-900 dark:text-white">
                {lang === 'fr' ? 'Timeline' : 'Timeline'}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {lang === 'fr'
                ? 'Faites défiler pour explorer notre histoire à travers les années →'
                : 'Scroll to explore our journey through the years →'}
            </p>
          </div>

          {/* Left/Right Scroll Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-slate-300 dark:border-white/20 bg-white dark:bg-white/[0.06] text-slate-700 dark:text-white hover:border-[#E60039] hover:text-[#E60039] active:scale-95 transition-all cursor-pointer shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-slate-300 dark:border-white/20 bg-white dark:bg-white/[0.06] text-slate-700 dark:text-white hover:border-[#E60039] hover:text-[#E60039] active:scale-95 transition-all cursor-pointer shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Horizontal Track */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory focus:outline-none"
          style={{ scrollbarWidth: 'thin' }}
        >
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className="snap-start shrink-0 w-72 sm:w-80 h-[380px] sm:h-[420px] rounded-3xl border border-slate-200 dark:border-white/10 relative overflow-hidden flex flex-col justify-between shadow-md dark:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group"
            >
              {/* Background photographic image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Contrast gradient overlay ensuring text legibility without over-darkening photos */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Top Pill: Year badge in Zenika Red */}
              <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-xl bg-[#E60039] text-white font-mono font-black text-sm sm:text-base shadow-md shadow-[#E60039]/25 tracking-wider">
                  {item.year}
                </span>
                <span className="text-[11px] font-mono text-white font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 shadow-xs">
                  {item.tag}
                </span>
              </div>

              {/* Bottom Text Shade */}
              <div className="relative z-10 p-5 sm:p-6 pt-6 mt-auto bg-gradient-to-t from-black/85 via-black/40 to-transparent space-y-1.5">
                <h5 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight leading-snug drop-shadow-sm">
                  {item.title}
                </h5>
                <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed drop-shadow-xs">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
