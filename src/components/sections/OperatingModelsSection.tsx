import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, Clock, ChevronRight, Sparkles, CheckCircle2, Target, ShieldCheck, ArrowRight,
  Search, Compass, PackageCheck, Zap, Building2, GraduationCap, TrendingUp, X
} from 'lucide-react';
import { OPERATING_MODELS } from '../../data/zenikaData';
import { Language, OperatingModel } from '../../types';

interface OperatingModelsSectionProps {
  lang: Language;
  onOpenContact: () => void;
  onOpenContactModel?: (model: OperatingModel) => void;
}

const getModelIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Search':
      return <Search size={18} />;
    case 'Compass':
      return <Compass size={18} />;
    case 'PackageCheck':
      return <PackageCheck size={18} />;
    case 'Zap':
      return <Zap size={18} />;
    case 'Building2':
      return <Building2 size={18} />;
    case 'GraduationCap':
      return <GraduationCap size={18} />;
    case 'TrendingUp':
      return <TrendingUp size={18} />;
    default:
      return <Layers size={18} />;
  }
};

export const OperatingModelsSection: React.FC<OperatingModelsSectionProps> = ({
  lang,
  onOpenContact,
  onOpenContactModel
}) => {
  const [activeModelId, setActiveModelId] = useState<string>(OPERATING_MODELS[0].id);
  const [mobileModalModel, setMobileModalModel] = useState<OperatingModel | null>(null);
  const activeModel = OPERATING_MODELS.find(m => m.id === activeModelId) || OPERATING_MODELS[0];

  useEffect(() => {
    if (mobileModalModel) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileModalModel(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileModalModel]);

  const handleSelectModel = (model: OperatingModel) => {
    setActiveModelId(model.id);
    // Sur mobile / tablette (< 1024px), ouvrir automatiquement la modale avec les détails
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileModalModel(model);
    }
  };

  return (
    <section id="operating-models" className="py-16 sm:py-20 border-t border-slate-200 dark:border-white/10 scroll-mt-20">
      {/* Editorial Section Header matching image.png */}
      <div className="mb-10 sm:mb-14">
        <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E60039] font-display mb-3">
          {lang === 'fr' ? "03.1 / MODES D'INTERVENTION" : "03.1 / OPERATING MODELS"}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black font-display text-slate-900 dark:text-white tracking-tight leading-[1.08]">
              {lang === 'fr'
                ? "Des modèles opératoires qui s’intègrent à vos équipes."
                : "Operating models that seamlessly integrate into your teams."}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base lg:text-[17px] text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              {lang === 'fr'
                ? "Du diagnostic flash de 5 jours aux programmes pluriannuels, nos équipes s’intègrent naturellement à votre gouvernance pour accélérer vos livraisons et pérenniser vos compétences."
                : "From 5-day flash diagnostics to multi-year transformations, our teams integrate naturally into your governance to accelerate delivery and sustain capabilities."}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Colonne gauche : liste des modèles opératoires avec icônes distinctives */}
        <div className="lg:col-span-5 space-y-2.5">
          {OPERATING_MODELS.map((model) => {
            const isSelected = activeModelId === model.id;
            return (
              <button
                key={model.id}
                onClick={() => handleSelectModel(model)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3.5 ${
                  isSelected
                    ? 'bg-white dark:bg-[#161C28] border-l-4 border-l-[#E60039] border-slate-300 dark:border-white/20 text-slate-950 dark:text-white shadow-xl shadow-slate-200/70 dark:shadow-none'
                    : 'bg-white/70 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-white/70 hover:bg-white dark:hover:bg-white/[0.06] hover:text-slate-950 dark:hover:text-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#E60039] text-white shadow-md shadow-[#E60039]/30 scale-105'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60'
                  }`}>
                    {getModelIcon(model.icon)}
                  </div>
                  <div className="min-w-0">
                    <div className={`text-xs sm:text-sm font-bold font-display truncate ${isSelected ? 'text-slate-950 dark:text-white' : ''}`}>
                      {lang === 'fr' ? model.title : model.titleEn}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-white/50 mt-0.5 flex items-center gap-1.5">
                      <Clock size={11} className={isSelected ? 'text-[#E60039]' : 'text-slate-400 dark:text-white/30'} />
                      <span>{model.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="lg:hidden text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[#E60039]/10 text-[#E60039]">
                    {lang === 'fr' ? 'Détails' : 'Details'}
                  </span>
                  <ChevronRight size={16} className={`shrink-0 transition-transform ${isSelected ? 'text-[#E60039] translate-x-0.5' : 'text-slate-400 dark:text-white/20'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Colonne droite (Desktop uniquement) : card sélectionnée sur fond blanc éclatant avec grand visuel icône */}
        <div className="hidden lg:block lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#0E121B] border border-slate-200/90 dark:border-white/10 space-y-6 shadow-xl shadow-slate-200/70 dark:shadow-2xl dark:shadow-black/50 transition-all">
          {/* En-tête avec visuel icône rouge Zenika & badge durée */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-white/10 pb-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E60039] to-[#990026] text-white flex items-center justify-center shadow-lg shadow-[#E60039]/25 shrink-0">
                {getModelIcon(activeModel.icon)}
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#E60039] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles size={12} />
                  <span>{lang === 'fr' ? 'Dispositif d\'Intervention' : 'Engagement Delivery Model'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-display">
                  {lang === 'fr' ? activeModel.title : activeModel.titleEn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-white/60 font-mono mt-0.5">
                  {lang === 'fr' ? activeModel.subtitle : activeModel.subtitleEn}
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-red-50 dark:bg-[#E60039]/15 border border-[#E60039]/25 text-[#E60039] shrink-0 self-start sm:self-auto">
              <Clock size={13} />
              <span>{activeModel.duration}</span>
            </span>
          </div>

          {/* Description détaillée */}
          <p className="text-xs sm:text-sm text-slate-700 dark:text-white/80 leading-relaxed font-normal">
            {lang === 'fr' ? activeModel.description : activeModel.descriptionEn}
          </p>

          {/* Livrables & engagements tangibles */}
          {activeModel.deliverables && activeModel.deliverables.length > 0 && (
            <div className="space-y-2.5">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-white/50 font-bold flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#E60039]" />
                <span>{lang === 'fr' ? 'Livrables & engagements tangibles :' : 'Key Deliverables & Commitments:'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(lang === 'fr' ? activeModel.deliverables : activeModel.deliverablesEn || activeModel.deliverables).map((deliv, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 text-xs font-medium text-slate-800 dark:text-white/90"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E60039] shrink-0" />
                    <span className="line-clamp-1">{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cas d'usage typique */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 space-y-1">
            <div className="text-xs font-mono uppercase text-[#E60039] font-bold flex items-center gap-1.5">
              <Target size={13} />
              <span>{lang === 'fr' ? 'Quand activer ce mode d\'intervention ?' : 'When to trigger this model?'}</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-white/80 leading-relaxed">
              {lang === 'fr' ? activeModel.useCase : activeModel.useCaseEn}
            </p>
          </div>

          {/* Barre inférieure : engagement d'excellence & bouton d'action */}
          <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-white/50">
              <ShieldCheck size={14} className="text-[#E60039]" />
              <span>{lang === 'fr' ? 'Gouvernance Agile · Experts Seniors Zenika' : 'Agile Governance · Senior Zenika Squads'}</span>
            </div>
            <button
              onClick={() => {
                if (onOpenContactModel) {
                  onOpenContactModel(activeModel);
                } else {
                  onOpenContact();
                }
              }}
              className="px-6 py-2.5 rounded-xl bg-[#E60039] hover:bg-[#FF2E56] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#E60039]/25 hover:shadow-xl hover:shadow-[#E60039]/35 active:scale-95 transition-all"
            >
              <span>{lang === 'fr' ? 'Activer ce dispositif' : 'Engage with this Model'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal mobile pour les détails des modèles opératoires */}
      <AnimatePresence>
        {mobileModalModel && (
          <motion.div
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 cursor-pointer"
            onClick={() => setMobileModalModel(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-white/10 rounded-t-3xl sm:rounded-3xl max-w-xl w-full max-h-[88vh] overflow-y-auto p-5 sm:p-7 shadow-2xl relative space-y-5 cursor-default"
            >
              {/* Header avec bouton fermer */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E60039] to-[#990026] text-white flex items-center justify-center shadow-lg shadow-[#E60039]/25 shrink-0">
                    {getModelIcon(mobileModalModel.icon)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-[#E60039] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Sparkles size={11} />
                      <span>{lang === 'fr' ? 'Dispositif d\'Intervention' : 'Engagement Delivery Model'}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white font-display truncate">
                      {lang === 'fr' ? mobileModalModel.title : mobileModalModel.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-white/60 font-mono truncate">
                      {lang === 'fr' ? mobileModalModel.subtitle : mobileModalModel.subtitleEn}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileModalModel(null)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-colors shrink-0 cursor-pointer"
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Badge durée */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full bg-red-50 dark:bg-[#E60039]/15 border border-[#E60039]/25 text-[#E60039]">
                  <Clock size={12} />
                  <span>{mobileModalModel.duration}</span>
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-white/40">
                  {lang === 'fr' ? 'Cadre & gouvernance Zenika' : 'Zenika Governance Framework'}
                </span>
              </div>

              {/* Description détaillée */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-white/80 leading-relaxed font-normal">
                {lang === 'fr' ? mobileModalModel.description : mobileModalModel.descriptionEn}
              </p>

              {/* Livrables & engagements tangibles */}
              {mobileModalModel.deliverables && mobileModalModel.deliverables.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-white/50 font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-[#E60039]" />
                    <span>{lang === 'fr' ? 'Livrables & engagements tangibles :' : 'Key Deliverables & Commitments:'}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(lang === 'fr' ? mobileModalModel.deliverables : mobileModalModel.deliverablesEn || mobileModalModel.deliverables).map((deliv, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 text-xs font-medium text-slate-800 dark:text-white/90"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E60039] shrink-0" />
                        <span className="line-clamp-1">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cas d'usage typique */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 space-y-1">
                <div className="text-xs font-mono uppercase text-[#E60039] font-bold flex items-center gap-1.5">
                  <Target size={13} />
                  <span>{lang === 'fr' ? 'Quand activer ce mode d\'intervention ?' : 'When to trigger this model?'}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-white/80 leading-relaxed">
                  {lang === 'fr' ? mobileModalModel.useCase : mobileModalModel.useCaseEn}
                </p>
              </div>

              {/* Pied de la modal avec CTA */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-white/50">
                  <ShieldCheck size={14} className="text-[#E60039]" />
                  <span>{lang === 'fr' ? 'Gouvernance Agile · Experts Seniors Zenika' : 'Agile Governance · Senior Zenika Squads'}</span>
                </div>
                <button
                  onClick={() => {
                    const target = mobileModalModel;
                    setMobileModalModel(null);
                    if (onOpenContactModel) {
                      onOpenContactModel(target);
                    } else {
                      onOpenContact();
                    }
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#E60039] hover:bg-[#FF2E56] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#E60039]/25 hover:shadow-xl hover:shadow-[#E60039]/35 active:scale-95 transition-all"
                >
                  <span>{lang === 'fr' ? 'Activer ce dispositif' : 'Engage with this Model'}</span>
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

