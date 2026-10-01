import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Globe, Sparkles, Sun, Moon, ExternalLink, GraduationCap } from 'lucide-react';
import { ZenikaLogo } from '../brand/ZenikaLogo';
import { ZenikaCodeIcon } from '../brand/ZenikaCodeIcon';
import { Language } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  onOpenContact,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [headerVisible, setHeaderVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('why');
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);

      // Determine if opening intro sequence is still in progress
      const introEl =
        document.getElementById('hero-intro-v3-scroll') ||
        document.getElementById('hero-intro-v4-scroll') ||
        document.getElementById('hero-cover');

      let pastIntro = false;
      if (introEl) {
        const rect = introEl.getBoundingClientRect();
        // Hide navbar as long as the user is still within the intro sequence
        pastIntro = rect.bottom <= 80;
      } else {
        pastIntro = currentScrollY > 80;
      }

      // Smart header visibility:
      // - Hidden during hero intro cover
      // - Hidden on scroll down to maximize screen space for storytelling
      // - Immediately visible on scroll up so navigation is instant
      if (!pastIntro) {
        setHeaderVisible(false);
      } else if (mobileMenuOpen) {
        setHeaderVisible(true);
      } else {
        const delta = currentScrollY - lastScrollY.current;
        if (delta > 6) {
          // Scrolling down: hide header
          setHeaderVisible(false);
        } else if (delta < -6) {
          // Scrolling up: reveal header immediately
          setHeaderVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;

      const sections = ['value-stream', 'why', 'portfolio', 'operating-models', 'heritage', 'solutions', 'partners', 'agencies', 'publications', 'contact'];

      // Near top of page: immediately activate 'value-stream'
      if (window.scrollY < 120) {
        setActiveSection('value-stream');
        return;
      }

      // Near bottom of document: activate the last existing section
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70;
      if (isAtBottom) {
        for (let i = sections.length - 1; i >= 0; i--) {
          if (document.getElementById(sections[i])) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }

      // Read trigger offset: 160px from top (accounting for fixed header)
      const triggerY = 160;
      let matchedSection = '';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY && rect.bottom > triggerY) {
            matchedSection = section;
            break;
          }
        }
      }

      if (matchedSection) {
        setActiveSection(matchedSection);
      } else {
        // Fallback: choose the section whose top is most recently above triggerY
        let bestSection = '';
        let minOffset = Infinity;
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= triggerY) {
              const dist = triggerY - rect.top;
              if (dist < minOffset) {
                minOffset = dist;
                bestSection = section;
              }
            }
          }
        }
        if (bestSection) {
          setActiveSection(bestSection);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'value-stream', altIds: ['pillars', 'offres', 'axes'], labelFr: '3 Piliers', labelEn: '3 Pillars' },
    { id: 'why', altIds: ['convictions', 'kpis'], labelFr: 'Nos Convictions', labelEn: 'Convictions' },
    { id: 'portfolio', altIds: ['works', 'references', 'clients', 'clients-marquee'], labelFr: 'Nos Clients', labelEn: 'Clients' },
    { id: 'operating-models', altIds: ['solutions', 'services'], labelFr: 'Modes d’Intervention', labelEn: 'Operating Models' },
    { id: 'heritage', altIds: ['timeline', 'communications'], labelFr: '20 Ans', labelEn: '20 Years' },
    { id: 'partners', altIds: ['studios'], labelFr: 'Partenaires', labelEn: 'Partners' },
    { id: 'agencies', altIds: ['implantations'], labelFr: 'Agences', labelEn: 'Offices' },
    { id: 'publications', altIds: ['blog', 'livres-blancs'], labelFr: 'Publications', labelEn: 'Publications' },
    { id: 'contact', altIds: [], labelFr: 'Contact', labelEn: 'Contact' },
  ];

  const scrollTo = (id: string, altIds?: string[]) => {
    setMobileMenuOpen(false);
    let element = document.getElementById(id);
    if (!element && altIds) {
      for (const alt of altIds) {
        element = document.getElementById(alt);
        if (element) break;
      }
    }
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (id === 'value-stream' || id === 'why') {
      const el = document.getElementById('why') || document.getElementById('value-stream');
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          headerVisible
            ? 'translate-y-0 opacity-100 bg-white/90 dark:bg-[#080B11]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-[#222B3D]/80 shadow-2xs dark:shadow-2xl py-2 sm:py-2.5 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none py-2'
        }`}
      >
        <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="flex items-center justify-between gap-3">
            {/* Brand Logo */}
            <a
              href="/"
              aria-label="Zenika — Retour en haut de page"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center group cursor-pointer focus:outline-none shrink-0"
            >
              <ZenikaLogo height={28} />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 transition-colors">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id, item.altIds)}
                    className={`px-2 py-1 2xl:px-2.5 2xl:py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#E60039] text-white shadow-xs shadow-[#E60039]/20 font-semibold'
                        : 'text-slate-600 dark:text-[#8E9BAE] hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {lang === 'fr' ? item.labelFr : item.labelEn}
                  </button>
                );
              })}
            </nav>

            {/* Right CTAs & Language / Theme Switchers */}
            <div className="hidden xl:flex items-center gap-1.5 2xl:gap-2 shrink-0">
              {/* Theme Switcher Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-8 h-8 text-xs rounded-lg text-slate-600 dark:text-[#8E9BAE] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/10 transition-all cursor-pointer shrink-0"
                title={theme === 'dark' ? (lang === 'fr' ? 'Passer en mode clair' : 'Switch to light mode') : (lang === 'fr' ? 'Passer en mode sombre' : 'Switch to dark mode')}
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun size={14} className="text-amber-400 hover:rotate-45 transition-transform" />
                ) : (
                  <Moon size={14} className="text-indigo-600 hover:-rotate-12 transition-transform" />
                )}
              </button>

              {/* Language Switch */}
              <button
                onClick={() => onLanguageChange(lang === 'fr' ? 'en' : 'fr')}
                className="flex items-center gap-1 px-2 py-1 text-xs font-mono text-slate-600 dark:text-[#8E9BAE] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/10 rounded-lg transition-colors cursor-pointer shrink-0"
                title="Changer de langue / Switch language"
              >
                <Globe size={12} className="text-[#E60039]" />
                <span className="font-semibold text-[11px]">{lang.toUpperCase()}</span>
                <span className="text-slate-400 dark:text-white/30 text-[9px]">|</span>
                <span className="text-slate-500 dark:text-white/50 text-[9px]">{lang === 'fr' ? 'EN' : 'FR'}</span>
              </button>

              {/* Zenika Training Link (New Tab) */}
              <a
                href={lang === 'fr' ? 'https://training.zenika.com/fr' : 'https://training.zenika.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-slate-700 dark:text-[#8E9BAE] hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all group whitespace-nowrap shrink-0"
                title={lang === 'fr' ? 'Zenika Training · Catalogue formations (ouvre dans un nouvel onglet)' : 'Zenika Training · Course catalog (opens in new tab)'}
              >
                <GraduationCap size={13} className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>{lang === 'fr' ? 'Training' : 'Training'}</span>
                <ExternalLink size={9} className="text-slate-400 group-hover:text-indigo-600 dark:text-white/40 dark:group-hover:text-indigo-400 transition-colors" />
              </a>

              {/* Join Us / Carrières Button (Jobs Zenika - New Tab) */}
              <a
                href={lang === 'fr' ? 'https://jobs.zenika.com/fr/' : 'https://jobs.zenika.com/'}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden 2xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-white transition-all shadow-2xs group cursor-pointer whitespace-nowrap shrink-0"
                title={lang === 'fr' ? 'Carrières & Jobs chez Zenika (ouvre dans un nouvel onglet)' : 'Zenika Careers & Jobs (opens in new tab)'}
              >
                <ZenikaCodeIcon size={13} className="text-[#E60039] group-hover:scale-110 transition-transform" />
                <span>{lang === 'fr' ? 'Rejoindre' : 'Join'}</span>
                <ExternalLink size={11} className="text-slate-400 group-hover:text-[#E60039] dark:text-white/40 dark:group-hover:text-[#E60039] transition-colors" />
              </a>

              {/* Main Contact Action : Compact, fin et sans superposition */}
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white dark:bg-white/5 hover:bg-red-50/50 dark:hover:bg-[#E60039]/15 text-[#E60039] hover:text-[#CC0033] dark:text-[#FF385C] border border-[#E60039] text-xs font-bold rounded-lg shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap shrink-0 group"
              >
                <Sparkles size={12} className="text-[#E60039] dark:text-[#FF385C] group-hover:rotate-12 transition-transform duration-300" />
                <span>{lang === 'fr' ? 'Lancer un projet' : 'Start a Project'}</span>
              </button>
            </div>

            {/* Mobile Actions Toggle */}
            <div className="flex xl:hidden items-center gap-2">
              {/* Mobile Theme Switch */}
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-600 dark:text-[#8E9BAE] bg-slate-100 dark:bg-[#111622] border border-slate-200 dark:border-[#222B3D] rounded-lg cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-600" />}
              </button>

              <button
                onClick={() => onLanguageChange(lang === 'fr' ? 'en' : 'fr')}
                className="px-2 py-1 text-xs font-mono text-slate-700 dark:text-[#8E9BAE] bg-slate-100 dark:bg-[#111622] border border-slate-200 dark:border-[#222B3D] rounded-md cursor-pointer"
              >
                {lang.toUpperCase()}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-800 dark:text-white/80 hover:text-black dark:hover:text-white bg-slate-100 dark:bg-[#111622] border border-slate-200 dark:border-[#222B3D] rounded-lg focus:outline-none cursor-pointer"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <div
              role="presentation"
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black/40 xl:hidden backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-0 top-16 z-40 bg-white/98 dark:bg-[#0A0D14]/98 backdrop-blur-2xl border-b border-slate-200 dark:border-[#222B3D] p-6 xl:hidden shadow-2xl"
            >
            <div className="space-y-2 mb-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id, item.altIds)}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-slate-700 dark:text-[#8E9BAE] hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-[#222B3D] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>{lang === 'fr' ? item.labelFr : item.labelEn}</span>
                  <ArrowRight size={14} className="text-[#E60039]" />
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-[#222B3D] flex flex-col gap-3">
              {/* Zenika Training link */}
              <a
                href={lang === 'fr' ? 'https://training.zenika.com/fr' : 'https://training.zenika.com'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm font-semibold flex items-center justify-between transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <GraduationCap size={16} className="text-indigo-600 dark:text-indigo-400" />
                  <span>{lang === 'fr' ? 'Formations · Zenika Training' : 'Training · Zenika Training'}</span>
                </div>
                <ExternalLink size={14} className="text-slate-400 dark:text-white/50" />
              </a>

              {/* Jobs Zenika link */}
              <a
                href={lang === 'fr' ? 'https://jobs.zenika.com/fr/' : 'https://jobs.zenika.com/'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm font-semibold flex items-center justify-between transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <ZenikaCodeIcon size={16} className="text-[#E60039]" />
                  <span>{lang === 'fr' ? 'Nous rejoindre · Zenika Jobs' : 'Join Us · Zenika Jobs'}</span>
                </div>
                <ExternalLink size={14} className="text-slate-400 dark:text-white/50" />
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3 bg-[#E60039] hover:bg-[#FF2E56] text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-[#E60039]/30"
              >
                <Sparkles size={16} />
                <span>{lang === 'fr' ? 'Lancer un projet' : 'Start a Project'}</span>
              </button>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
