import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../types';

interface CustomSolutionsValueSectionProps {
  lang: Language;
  onOpenContact?: () => void;
}

export const CustomSolutionsValueSection: React.FC<CustomSolutionsValueSectionProps> = ({
  lang,
  onOpenContact,
}) => {
  return (
    <section
      id="custom-solutions"
      aria-label={lang === 'fr' ? 'Solutions sur mesure et offres de valeur' : 'Tailored solutions and value offerings'}
      className="relative z-10 w-full py-16 sm:py-24 bg-white dark:bg-[#07090E] border-t border-slate-200/80 dark:border-white/10 transition-colors"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#E60039]/5 dark:bg-[#E60039]/10 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* TITRE PRINCIPAL & SOUS-TITRE                                              */}
        {/* ========================================================================= */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-black text-slate-950 dark:text-white font-display tracking-tight leading-tight"
          >
            {lang === 'fr' ? (
              <>
                Des solutions <span className="text-[#E60039] font-black">sur mesure</span>, construites, exécutées et pilotées ensemble
              </>
            ) : (
              <>
                Tailored <span className="text-[#E60039] font-black">solutions</span>, built, executed and piloted together
              </>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs sm:text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300 tracking-wide max-w-3xl mx-auto"
          >
            {lang === 'fr'
              ? 'Secure & compliant by design – durable et souverain – piloté par la valeur – craft & devops'
              : 'Secure & compliant by design – sustainable & sovereign – value-driven – craft & devops'}
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* BLOC 1 : MAÎTRISER LA COMPLEXITÉ DES SYSTÈMES D'INFORMATION...            */}
        {/* ========================================================================= */}
        <div className="mt-10 sm:mt-14">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white font-display text-center mb-5 sm:mb-6 max-w-3xl mx-auto leading-snug">
            {lang === 'fr'
              ? 'Maîtriser la complexité des systèmes d’information et des organisations…'
              : 'Mastering the complexity of information systems and organizations…'}
          </h3>

          {/* Grille des 5 cartes Solution Blocks (hauteur réduite) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 lg:gap-4">
            {/* Carte 1 : AI-augmented SDLC */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={onOpenContact}
              className="rounded-2xl p-4 sm:p-5 text-center bg-white dark:bg-[#0D121F] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#E60039]/40 transition-all cursor-pointer flex flex-col justify-start min-h-[110px] sm:min-h-[120px]"
            >
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display leading-tight mb-1.5">
                <span className="text-[#E60039]">AI</span>-augmented SDLC
              </h4>
              <p className="text-xs sm:text-[12.5px] text-slate-600 dark:text-slate-300 font-normal leading-snug">
                {lang === 'fr'
                  ? 'Orchestration, agents de dev, test, documentation…'
                  : 'Orchestration, dev agents, testing, documentation…'}
              </p>
            </motion.div>

            {/* Carte 2 : Lean Strike teams */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={onOpenContact}
              className="rounded-2xl p-4 sm:p-5 text-center bg-white dark:bg-[#0D121F] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#E60039]/40 transition-all cursor-pointer flex flex-col justify-start min-h-[110px] sm:min-h-[120px]"
            >
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display leading-tight mb-1.5">
                Lean <span className="text-[#E60039]">Strike teams</span>
              </h4>
              <p className="text-xs sm:text-[12.5px] text-slate-600 dark:text-slate-300 font-normal leading-snug">
                {lang === 'fr'
                  ? 'Petites équipes expertes, engagées et autonomes'
                  : 'Small expert, engaged and autonomous teams'}
              </p>
            </motion.div>

            {/* Carte 3 : Platform engineering */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={onOpenContact}
              className="rounded-2xl p-4 sm:p-5 text-center bg-white dark:bg-[#0D121F] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#E60039]/40 transition-all cursor-pointer flex flex-col justify-start min-h-[110px] sm:min-h-[120px]"
            >
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display leading-tight mb-1.5">
                <span className="text-[#E60039]">Platform</span> engineering
              </h4>
              <p className="text-xs sm:text-[12.5px] text-slate-600 dark:text-slate-300 font-normal leading-snug">
                {lang === 'fr'
                  ? 'Infras internes en self-service, automatisation'
                  : 'Internal self-service platforms, automation'}
              </p>
            </motion.div>

            {/* Carte 4 : Product strategy & discovery */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={onOpenContact}
              className="rounded-2xl p-4 sm:p-5 text-center bg-white dark:bg-[#0D121F] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#E60039]/40 transition-all cursor-pointer flex flex-col justify-start min-h-[110px] sm:min-h-[120px]"
            >
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display leading-tight mb-1.5">
                <span className="text-[#E60039]">Product</span> strategy & discovery
              </h4>
              <p className="text-xs sm:text-[12.5px] text-slate-600 dark:text-slate-300 font-normal leading-snug">
                {lang === 'fr'
                  ? 'Rationalisation de portfolio produit, lien tech / produit'
                  : 'Product portfolio rationalization, tech/product alignment'}
              </p>
            </motion.div>

            {/* Carte 5 : Performance-driven delivery */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={onOpenContact}
              className="rounded-2xl p-4 sm:p-5 text-center bg-white dark:bg-[#0D121F] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#E60039]/40 transition-all cursor-pointer flex flex-col justify-start min-h-[110px] sm:min-h-[120px]"
            >
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display leading-tight mb-1.5">
                Performance-driven <span className="text-[#E60039]">delivery</span>
              </h4>
              <p className="text-xs sm:text-[12.5px] text-slate-600 dark:text-slate-300 font-normal leading-snug">
                {lang === 'fr'
                  ? 'Métriques DORA, Team topologies, engagement agile'
                  : 'DORA metrics, Team topologies, agile commitment'}
              </p>
            </motion.div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BLOC 2 : ... POUR TRADUIRE LES INVESTISSEMENTS IT EN VALEUR MÉTIER        */}
        {/* ========================================================================= */}
        <div className="mt-10 sm:mt-14">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white font-display text-center mb-5 sm:mb-6 max-w-3xl mx-auto leading-snug">
            {lang === 'fr'
              ? '… pour traduire les investissements IT en valeur métier mesurable'
              : '… translating IT investments into measurable business value'}
          </h3>

          {/* Grille des 4 cartes Offres de valeur (hauteur réduite) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {/* Carte 1 : AI for Business Performance */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={onOpenContact}
              className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#0D121F] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#E60039]/40 transition-all cursor-pointer flex flex-col justify-start min-h-[140px] sm:min-h-[150px]"
            >
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display leading-tight text-center mb-2.5">
                <span className="text-[#E60039]">AI</span> for Business Performance
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-[12.5px] text-slate-700 dark:text-slate-300 font-normal">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E60039] shrink-0 mt-1 mr-2" />
                  <span>{lang === 'fr' ? 'Dans les apps métier' : 'In business applications'}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E60039] shrink-0 mt-1 mr-2" />
                  <span>{lang === 'fr' ? 'Dans les process de gestion' : 'In management processes'}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E60039] shrink-0 mt-1 mr-2" />
                  <span>{lang === 'fr' ? 'Dans le SDLC' : 'In the SDLC'}</span>
                </li>
              </ul>
            </motion.div>

            {/* Carte 2 : Data-driven Organization */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={onOpenContact}
              className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#0D121F] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#E60039]/40 transition-all cursor-pointer flex flex-col justify-start min-h-[140px] sm:min-h-[150px]"
            >
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display leading-tight text-center mb-2.5">
                <span className="text-[#E60039]">Data-driven</span> Organization
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-[12.5px] text-slate-700 dark:text-slate-300 font-normal">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E60039] shrink-0 mt-1 mr-2" />
                  <span>{lang === 'fr' ? 'Master Data (gouvernance)' : 'Master Data (governance)'}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E60039] shrink-0 mt-1 mr-2" />
                  <span>{lang === 'fr' ? 'Fresh Data (temps réel)' : 'Fresh Data (real-time)'}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E60039] shrink-0 mt-1 mr-2" />
                  <span>{lang === 'fr' ? 'Trusted Data (sécurisation)' : 'Trusted Data (security)'}</span>
                </li>
              </ul>
            </motion.div>

            {/* Carte 3 : Cloud Forge From strategy to value */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={onOpenContact}
              className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#0D121F] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#E60039]/40 transition-all cursor-pointer flex flex-col justify-start min-h-[140px] sm:min-h-[150px]"
            >
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display leading-tight text-center mb-2.5">
                <span className="text-[#E60039]">Cloud</span> Forge From strategy to value
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-[12.5px] text-slate-700 dark:text-slate-300 font-normal">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E60039] shrink-0 mt-1 mr-2" />
                  <span>{lang === 'fr' ? 'Valoriser les services cloud' : 'Leveraging cloud services'}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E60039] shrink-0 mt-1 mr-2" />
                  <span>
                    {lang === 'fr'
                      ? 'Approche “BizDevOps” (Strat. métier / Tech / Exécution)'
                      : '“BizDevOps” approach (Biz Strat. / Tech / Execution)'}
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Carte 4 : Valorisation du Legacy */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={onOpenContact}
              className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#0D121F] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#E60039]/40 transition-all cursor-pointer flex flex-col justify-start min-h-[140px] sm:min-h-[150px]"
            >
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display leading-tight text-center mb-2.5">
                Valorisation du <span className="text-[#E60039]">Legacy</span>
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-[12.5px] text-slate-700 dark:text-slate-300 font-normal">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E60039] shrink-0 mt-1 mr-2" />
                  <span>
                    {lang === 'fr'
                      ? 'Maîtriser l’existant (sécurisation, refactoring)'
                      : 'Mastering legacy assets (security, refactoring)'}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E60039] shrink-0 mt-1 mr-2" />
                  <span>
                    {lang === 'fr' ? 'Moderniser (refacto, refontes)' : 'Modernization (refactoring, redesign)'}
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CustomSolutionsValueSection;
