import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Sparkles, ArrowRight, CheckCircle2, Handshake, GraduationCap, X, Layers } from 'lucide-react';
import { PARTNERS_DATA } from '../../data/zenikaData';
import { Language, PartnerItem } from '../../types';
import { PartnerLogoSvg } from '../brand/PartnerLogoSvg';

interface PartnersEcosystemSectionProps {
  lang: Language;
  onOpenContact?: () => void;
}

export const PartnersEcosystemSection: React.FC<PartnersEcosystemSectionProps> = ({
  lang,
  onOpenContact
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPartner, setSelectedPartner] = useState<PartnerItem | null>(null);

  useEffect(() => {
    if (selectedPartner) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedPartner(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedPartner]);

  const categories = [
    { id: 'all', labelFr: 'Tous les Partenaires', labelEn: 'All Partners' },
    { id: 'Software & Delivery', labelFr: 'Software & Delivery', labelEn: 'Software & Delivery' },
    { id: 'Data & IA', labelFr: 'Data & IA', labelEn: 'Data & AI' },
    { id: 'Infra & Ops', labelFr: 'Infra & Ops', labelEn: 'Infra & Ops' },
  ];

  const getPartnerLogoId = (name: string): string => {
    const lower = name.toLowerCase();
    if (lower.includes('google')) return 'gcp';
    if (lower.includes('databricks')) return 'databricks';
    if (lower.includes('confluent')) return 'confluent';
    if (lower.includes('red hat')) return 'redhat';
    if (lower.includes('kong')) return 'kong';
    if (lower.includes('gitlab')) return 'gitlab';
    if (lower.includes('aws') || lower.includes('amazon')) return 'aws';
    if (lower.includes('temple')) return 'cloudtemple';
    if (lower.includes('grafana')) return 'grafana';
    if (lower.includes('safe') || lower.includes('scaled')) return 'safe';
    if (lower.includes('kubernetes') || lower.includes('cncf')) return 'kubernetes';
    if (lower.includes('elastic')) return 'elastic';
    return 'gcp';
  };

  const getDomain = (p: PartnerItem): string => {
    const lower = p.name.toLowerCase();
    if (lower.includes('gitlab') || lower.includes('red hat') || lower.includes('kong') || lower.includes('safe')) {
      return 'Software & Delivery';
    }
    if (lower.includes('google') || lower.includes('databricks') || lower.includes('confluent') || lower.includes('elastic')) {
      return 'Data & IA';
    }
    return 'Infra & Ops';
  };

  const filteredPartners = activeCategory === 'all'
    ? PARTNERS_DATA
    : PARTNERS_DATA.filter(p => getDomain(p) === activeCategory);

  return (
    <section id="partners" className="py-10 sm:py-14 bg-white dark:bg-[#080B11] relative border-t border-slate-200 dark:border-[#222B3D]/80 transition-colors duration-200">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#161C2B] border border-slate-200 dark:border-[#222B3D] text-[#E60039] text-xs font-mono font-bold">
            <Handshake size={13} />
            <span>{lang === 'fr' ? 'Écosystème Partenaires' : 'Partner Ecosystem'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white font-display leading-tight">
            {lang === 'fr' ? (
              <>
                Partenaires de confiance pour une approche <span className="text-[#E60039] whitespace-nowrap inline-block">«&nbsp;best-of-breed&nbsp;»</span>
              </>
            ) : (
              <>
                Trusted partners for a <span className="text-[#E60039] whitespace-nowrap inline-block">«&nbsp;best-of-breed&nbsp;»</span> strategy
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8E9BAE] max-w-2xl leading-relaxed">
            {lang === 'fr'
              ? 'Un écosystème d’éditeurs leaders intégrés dans nos offres avec flexibilité, formation et conception sur mesure.'
              : 'Leading technology platforms integrated into our tailored best-of-breed advisory, engineering, and training.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 mb-5 pb-3 border-b border-slate-200 dark:border-[#222B3D]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#E60039] text-white shadow-xs font-bold'
                  : 'bg-slate-100 dark:bg-[#111622] text-slate-600 dark:text-[#8E9BAE] hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#222B3D]'
              }`}
            >
              {lang === 'fr' ? cat.labelFr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Partners Grid: Logos (56px) with names underneath */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {filteredPartners.map((partner) => (
            <button
              key={partner.id}
              onClick={() => setSelectedPartner(partner)}
              className="group p-3.5 sm:p-4 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] hover:bg-white dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/10 hover:border-[#E60039]/40 dark:hover:border-[#E60039]/40 hover:shadow-md hover:shadow-slate-200/50 dark:hover:shadow-black/40 transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer"
            >
              <PartnerLogoSvg
                id={getPartnerLogoId(partner.name)}
                size={56}
                style={{ width: '56px', height: '56px' }}
                className="w-14 h-14 object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-200 mb-2"
              />
              <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#E60039] transition-colors leading-tight line-clamp-1">
                {partner.name}
              </span>
            </button>
          ))}
        </div>

        {/* Discreet Highlights Callout */}
        <div className="mt-5 px-4 py-3 rounded-xl bg-slate-50/80 dark:bg-[#111622]/60 border border-slate-200/80 dark:border-[#222B3D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-600 dark:text-[#8E9BAE]">
            <ShieldCheck size={16} className="text-[#E60039] shrink-0" />
            <span>
              {lang === 'fr'
                ? 'Conformité SecNumCloud, DORA, NIS2 & souveraineté logicielle garantie.'
                : 'SecNumCloud, DORA, NIS2 compliance and European digital sovereignty.'}
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold text-[#E60039] bg-[#E60039]/10 px-2.5 py-0.5 rounded border border-[#E60039]/20 shrink-0">
            100% Best-of-Breed
          </span>
        </div>
      </div>

      {/* Partner Details Modal */}
      <AnimatePresence>
        {selectedPartner && (
          <motion.div
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-pointer"
            onClick={() => setSelectedPartner(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-white/10 rounded-3xl max-w-lg sm:max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto cursor-default"
            >
              {/* Header with Logo, Name, Domain and Close button */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-5">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-white/10 flex items-center justify-center p-3 shadow-md shrink-0">
                    <PartnerLogoSvg id={getPartnerLogoId(selectedPartner.name)} size={38} className="h-9 w-auto object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display">
                      {selectedPartner.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs font-mono font-bold text-[#E60039]">
                        {getDomain(selectedPartner)}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-white/50 px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                        {selectedPartner.category}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPartner(null)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-colors shrink-0 cursor-pointer"
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-white/50 font-bold flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#E60039]" />
                  <span>{lang === 'fr' ? 'Rôle & Positionnement Technologique :' : 'Ecosystem & Technical Role:'}</span>
                </h4>
                <p className="text-sm text-slate-700 dark:text-white/85 leading-relaxed font-normal">
                  {lang === 'fr' ? selectedPartner.description : selectedPartner.descriptionEn}
                </p>
              </div>

              {/* Key Synergy */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 space-y-1.5">
                <div className="text-xs font-mono uppercase text-[#E60039] font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  <span>{lang === 'fr' ? 'Synergie & Valeur conjointe Zenika :' : 'Joint Synergy & Zenika Value:'}</span>
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {selectedPartner.keySynergy}
                </p>
              </div>

              {/* Joint Delivery Framework */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600 dark:text-white/70">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 flex items-start gap-2">
                  <GraduationCap size={15} className="text-[#E60039] shrink-0 mt-0.5" />
                  <span>
                    {lang === 'fr'
                      ? 'Formations officielles & certifications animées par nos consultants accrédités'
                      : 'Official certified training delivered by accredited Zenika consultants'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 flex items-start gap-2">
                  <Layers size={15} className="text-[#E60039] shrink-0 mt-0.5" />
                  <span>
                    {lang === 'fr'
                      ? 'Intégration d\'architecture agnostique & déploiements mission-critical'
                      : 'Agnostic architecture integration & mission-critical rollouts'}
                  </span>
                </div>
              </div>

              {/* Modal Footer with Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-white/50">
                  <ShieldCheck size={14} className="text-[#E60039]" />
                  <span>{lang === 'fr' ? 'Partenariat Certifié · Approche Best-of-Breed' : 'Certified Partner · Best-of-Breed Approach'}</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedPartner(null);
                    if (onOpenContact) {
                      onOpenContact();
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#E60039] hover:bg-[#FF2E56] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#E60039]/25 hover:shadow-xl hover:shadow-[#E60039]/35 active:scale-95 transition-all"
                >
                  <span>{lang === 'fr' ? 'Échanger sur ce partenaire' : 'Discuss this Partner'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

