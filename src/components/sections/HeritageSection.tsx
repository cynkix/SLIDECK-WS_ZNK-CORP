import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Award, Heart } from 'lucide-react';
import { TimelineFriseSection } from './TimelineFriseSection';
import { Language } from '../../types';
import carlAzouryPhoto from '../../assets/images/carl_azoury.png';

interface HeritageSectionProps {
  lang: Language;
  onOpenContact?: () => void;
}

export const HeritageSection: React.FC<HeritageSectionProps> = ({ lang, onOpenContact }) => {
  return (
    <div id="heritage" className="relative scroll-mt-20">
      {/* ========================================================================= */}
      {/* 01. SECTION CITATION & VISION : CARL AZOURY (FONDATEUR DE ZENIKA)          */}
      {/* ========================================================================= */}
      <section 
        id="carl-azoury-quote" 
        aria-label={lang === 'fr' ? 'Parole du Fondateur · Carl Azoury' : "Founder's Vision · Carl Azoury"}
        className="relative py-12 sm:py-16 bg-white dark:bg-[#07090E] border-t border-slate-200 dark:border-white/10 overflow-hidden"
      >
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl bg-gradient-to-br from-slate-50 via-white to-red-50/20 dark:from-[#0E131F] dark:via-[#090D16] dark:to-[#170C12] border border-slate-200/90 dark:border-white/10 p-6 sm:p-10 lg:p-14 shadow-xl dark:shadow-[0_12px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl overflow-hidden"
          >
            {/* Lueur d'ambiance d'accent rouge Zenika */}
            <div 
              aria-hidden="true" 
              className="absolute -top-24 -right-24 w-96 h-96 bg-[#E60039]/10 dark:bg-[#E60039]/15 rounded-full blur-3xl pointer-events-none" 
            />
            <div 
              aria-hidden="true" 
              className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" 
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Colonne Gauche : Photo Portrait Officielle Circulaire & Badges */}
              <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="relative group">
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 sm:border-[5px] border-white shadow-xl dark:shadow-2xl bg-slate-900 shrink-0">
                    <img
                      src={carlAzouryPhoto}
                      alt="Carl Azoury — Fondateur et PDG de Zenika"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top filter contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-1">
                  <h4 className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white tracking-tight">
                    Carl Azoury
                  </h4>
                  <p className="text-xs sm:text-sm font-mono font-semibold text-[#E60039] dark:text-[#FF859B]">
                    {lang === 'fr' ? 'Fondateur & PDG de Zenika' : 'Founder & CEO of Zenika'}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    {lang === 'fr' ? 'Fondateur · Depuis 2006' : 'Founder · Since 2006'}
                  </p>
                </div>
              </div>

              {/* Colonne Droite : Citation Majeure, Explication & Signature */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                {/* Header Tag */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E60039]/10 text-[#E60039] border border-[#E60039]/20 font-mono text-xs uppercase tracking-wider font-bold">
                    <Sparkles size={13} className="text-[#E60039] animate-pulse" />
                    <span>{lang === 'fr' ? 'La Parole du Fondateur' : "The Founder's Vision"}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    2006 — 2026 · 20 ans d’histoire
                  </span>
                </div>

                {/* Citation */}
                <div className="pl-5 sm:pl-6 border-l-2 border-[#E60039] space-y-4">
                  <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display text-slate-900 dark:text-white leading-tight sm:leading-snug">
                    {lang === 'fr' ? (
                      <>
                        « Ensemble, construisons les{' '}
                        <span className="text-[#E60039]">Systèmes d’Information</span> des{' '}
                        <span className="text-[#E60039]">20 prochaines années</span>. »
                      </>
                    ) : (
                      <>
                        “Together, let us build the{' '}
                        <span className="text-[#E60039]">Information Systems</span> of the{' '}
                        <span className="text-[#E60039]">next 20 years</span>.”
                      </>
                    )}
                  </blockquote>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {lang === 'fr' ? (
                      <>
                        « Nous ne vendons pas des heures, nous co-bâtissons des systèmes pérennes avec celles et ceux qui fabriquent la tech. Depuis notre création en 2006, nous avons traversé avec nos clients transformations, évolutions et révolutions, nous préparant aujourd’hui pour le virage de l’Intelligence Artificielle, tout en restant fidèles à nos valeurs cardinales : l’excellence de l’artisanat logiciel, l’indépendance d’opinion et l’humain comme moteur. »
                      </>
                    ) : (
                      <>
                        “We do not sell hours; we co-engineer enduring architectures alongside those who shape technology. Since 2006, our compass never wavered: software craftsmanship standards, uncompromising advisory independence, and continuous learning to build resilient systems.”
                      </>
                    )}
                  </p>
                </div>

                {/* Repères */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200/80 dark:border-white/10">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Award size={14} className="text-[#E60039]" />
                      <span>2006 : Fondation</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      <span>100% Indépendant</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Heart size={14} className="text-purple-500" />
                      <span>Culture Craft</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. 20 YEARS JOURNEY & TIMELINE FRISE (APRÈS SECTION CARL AZOURY)          */}
      {/* ========================================================================= */}
      <TimelineFriseSection lang={lang} />
    </div>
  );
};
