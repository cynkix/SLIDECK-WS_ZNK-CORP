import React, { useState } from 'react';
import { ZenikaLogo } from '../brand/ZenikaLogo';
import { ZenikaMonogram } from '../brand/ZenikaMonogram';
import { ZenikaCodeIcon } from '../brand/ZenikaCodeIcon';
import { Zenika20YearsLogo } from '../brand/Zenika20YearsLogo';
import { Zenika20YearsCommunications } from '../modals/Zenika20YearsCommunications';
import { Language } from '../../types';
import { ArrowUp, Github, Linkedin, Twitter, Youtube, Sparkles, MapPin, Mail, Phone, ExternalLink, GraduationCap, BookOpen, X } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenContact,
}) => {
  const [isCommunicationsOpen, setIsCommunicationsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 dark:bg-[#05070B] border-t border-slate-200 dark:border-[#222B3D] text-slate-600 dark:text-[#8E9BAE] pt-16 pb-12 relative overflow-hidden transition-colors duration-200">
      {/* Subtle Oversized Zenika Monogram Watermark */}
      <div className="absolute -bottom-24 -right-20 pointer-events-none select-none opacity-[0.03] dark:opacity-[0.06] -rotate-12">
        <ZenikaMonogram size={560} variant="color" />
      </div>

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-200 dark:border-[#222B3D]/80">
          {/* Brand Column with 20 Years Celebration */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <ZenikaLogo size="lg" />
              <div className="hidden sm:block h-6 w-px bg-slate-300 dark:bg-white/20" />
              <button
                type="button"
                onClick={() => setIsCommunicationsOpen(true)}
                className="p-1.5 px-2.5 rounded-xl bg-white dark:bg-[#111622] border border-slate-200 dark:border-white/10 shadow-sm inline-flex items-center gap-2 hover:border-[#E60039]/60 hover:shadow-md transition-all group cursor-pointer text-left"
                title={lang === 'fr' ? 'Découvrir les affiches officielles des 20 ans' : 'Discover the official 20-year campaign posters'}
              >
                <Zenika20YearsLogo height={28} showSubtext={true} />
                <span className="text-[10px] font-mono font-bold text-[#E60039] bg-[#E60039]/10 px-1.5 py-0.5 rounded group-hover:bg-[#E60039] group-hover:text-white transition-colors">
                  {lang === 'fr' ? 'Affiches 20 Ans' : '20Y Posters'}
                </span>
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-[#8E9BAE] max-w-sm leading-relaxed">
              {lang === 'fr'
                ? 'Partenaire technologique de proximité qui augmente l’impact métier de votre SI. Conseil, Réalisation et Formation à l’ère de l’IA et du Cloud.'
                : 'Proximity technology partner amplifying the business impact of your Information System. Advisory, Engineering & Training in the AI and Cloud era.'}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-[#111622] border border-slate-200 dark:border-[#222B3D] text-[11px] font-mono text-slate-800 dark:text-white shadow-sm dark:shadow-none">
              <span className="text-[#E60039] font-bold">“</span>
              <span>
                {lang === 'fr'
                  ? "L'expertise qui transforme la complexité tech en fluide métier"
                  : 'The expertise that turns tech friction into business flow'}
              </span>
              <span className="text-[#E60039] font-bold">”</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/zenika"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-[#111622] hover:bg-slate-50 dark:hover:bg-[#161C2B] text-slate-600 dark:text-[#8E9BAE] hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#222B3D] transition-colors shadow-sm dark:shadow-none"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/company/zenika"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-[#111622] hover:bg-slate-50 dark:hover:bg-[#161C2B] text-slate-600 dark:text-[#8E9BAE] hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#222B3D] transition-colors shadow-sm dark:shadow-none"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://youtube.com/zenika"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-[#111622] hover:bg-slate-50 dark:hover:bg-[#161C2B] text-slate-600 dark:text-[#8E9BAE] hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#222B3D] transition-colors shadow-sm dark:shadow-none"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Solutions & Offers - Solutions sur mesure */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-bold">
              {lang === 'fr' ? 'Solutions sur Mesure' : 'Custom Solutions'}
            </h4>
            <div className="text-[11px] font-mono text-[#E60039] font-semibold">
              <button
                type="button"
                onClick={onOpenContact}
                className="hover:underline flex items-center gap-1 cursor-pointer text-left font-bold"
              >
                <span>{lang === 'fr' ? '17 Solution Blocks activables →' : '17 Actionable Solution Blocks →'}</span>
              </button>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-[#8E9BAE]">
              <li><button type="button" onClick={onOpenContact} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left">AI for Business Performance</button></li>
              <li><button type="button" onClick={onOpenContact} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left">Data for Agentic AI Readiness</button></li>
              <li><button type="button" onClick={onOpenContact} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left">Cloud Forge (BizDevOps)</button></li>
              <li><button type="button" onClick={onOpenContact} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left">Valorisation du Legacy</button></li>
              <li><button type="button" onClick={onOpenContact} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left">Lean Strike Teams</button></li>
              <li><button type="button" onClick={onOpenContact} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left">Platform Engineering & IDP</button></li>
            </ul>
          </div>

          {/* Écosystème & Métiers */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-bold">
              {lang === 'fr' ? 'Écosystème Zenika' : 'Zenika Ecosystem'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-[#8E9BAE]">
              <li><a href="#operating-models" className="hover:text-slate-900 dark:hover:text-white transition-colors">{lang === 'fr' ? 'Conseil & Audit Flash' : 'Advisory & Flash Audit'}</a></li>
              <li><a href="#operating-models" className="hover:text-slate-900 dark:hover:text-white transition-colors">{lang === 'fr' ? 'Réalisation Clé en mains' : 'Turnkey Engineering'}</a></li>
              <li>
                <a
                  href={lang === 'fr' ? 'https://training.zenika.com/fr' : 'https://training.zenika.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors group"
                >
                  <GraduationCap size={13} className="shrink-0" />
                  <span>{lang === 'fr' ? 'Zenika Training · Catalogue formations' : 'Zenika Training · Courses catalog'}</span>
                  <ExternalLink size={11} className="opacity-70 group-hover:opacity-100" />
                </a>
              </li>
              <li><a href="#partners" className="hover:text-slate-900 dark:hover:text-white transition-colors">{lang === 'fr' ? 'Partenaires Best-of-Breed' : 'Best-of-Breed Partners'}</a></li>
              <li><a href="#heritage" className="hover:text-slate-900 dark:hover:text-white transition-colors">{lang === 'fr' ? 'Partenariat DecenZ (RSE)' : 'DecenZ Alliance'}</a></li>
              <li className="pt-1">
                <a
                  href="https://blog.zenika.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-800 dark:text-white/90 hover:text-[#E60039] dark:hover:text-[#E60039] font-medium transition-colors group"
                >
                  <BookOpen size={13} className="text-[#E60039]" />
                  <span>{lang === 'fr' ? 'Blog technique · Publications & Rex' : 'Tech Blog · Insights & Rex'}</span>
                  <ExternalLink size={11} className="opacity-70 group-hover:opacity-100" />
                </a>
              </li>
              <li className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsCommunicationsOpen(true)}
                  className="inline-flex items-center gap-2 text-slate-800 dark:text-white/90 hover:text-[#E60039] dark:hover:text-[#E60039] font-medium transition-colors text-left group cursor-pointer"
                >
                  <Sparkles size={13} className="text-[#E60039] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">{lang === 'fr' ? 'Campagne 20 Ans · Affiches & Manifeste' : '20-Year Campaign · Posters & Manifesto'}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
                    20 Ans
                  </span>
                </button>
              </li>
              <li>
                <a
                  href={lang === 'fr' ? 'https://jobs.zenika.com/fr/' : 'https://jobs.zenika.com/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#E60039] hover:text-[#ff1a4f] font-semibold transition-colors group"
                >
                  <ZenikaCodeIcon size={12} className="group-hover:scale-110 transition-transform" />
                  <span>{lang === 'fr' ? 'Nous rejoindre · Zenika Jobs' : 'Careers · Zenika Jobs'}</span>
                  <ExternalLink size={11} className="opacity-70 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Agences */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-bold">
              {lang === 'fr' ? 'Contact & Agences' : 'Offices & Contact'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-[#8E9BAE] leading-relaxed">
              {lang === 'fr' 
                ? 'France : Paris, Bordeaux, Brest, Clermont-Ferrand, Grenoble, Lille, Lyon, Nantes, Niort, Rennes, Toulouse · International : Casablanca, Singapour.'
                : 'France: Paris, Bordeaux, Brest, Clermont-Ferrand, Grenoble, Lille, Lyon, Nantes, Niort, Rennes, Toulouse · International: Casablanca, Singapore.'}
            </p>
            <a
              href="#agencies"
              className="inline-flex items-center gap-1.5 text-xs text-[#E60039] hover:underline font-medium"
            >
              <MapPin size={12} />
              <span>{lang === 'fr' ? 'Découvrir nos 15 agences' : 'Explore our 15 locations'}</span>
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenContact}
                className="w-full py-2.5 px-3.5 bg-[#E60039] hover:bg-[#FF2E56] text-white text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles size={14} />
                <span>{lang === 'fr' ? 'Prendre contact' : 'Get in Touch'}</span>
              </button>

              <a
                href={lang === 'fr' ? 'https://jobs.zenika.com/fr/' : 'https://jobs.zenika.com/'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3.5 bg-white dark:bg-[#111622] hover:bg-slate-50 dark:hover:bg-[#161C2B] border border-slate-200 dark:border-[#222B3D] text-slate-800 dark:text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <ZenikaCodeIcon size={13} className="text-[#E60039] group-hover:scale-110 transition-transform" />
                <span>{lang === 'fr' ? 'Nous rejoindre (Jobs)' : 'Join Us (Careers)'}</span>
                <ExternalLink size={12} className="text-slate-400 group-hover:text-slate-700 dark:text-white/40 dark:group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright, version selector & back to top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-[11px] text-slate-500 dark:text-[#8E9BAE]/70 font-mono">
            <span>© ZENIKA 2026 · All rights reserved</span>
            <span className="hidden sm:inline">·</span>
            <span>Proprietary & confidential</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-[#8E9BAE] hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
          >
            <span>{lang === 'fr' ? 'Haut de page' : 'Back to top'}</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      {/* 20 Years Campaign Posters & Manifesto Modal */}
      {isCommunicationsOpen && (
        <Zenika20YearsCommunications
          lang={lang}
          isModal={true}
          onClose={() => setIsCommunicationsOpen(false)}
          onOpenContact={() => {
            setIsCommunicationsOpen(false);
            onOpenContact();
          }}
        />
      )}
    </footer>
  );
};
