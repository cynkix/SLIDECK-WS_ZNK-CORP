import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Building2, ArrowRight, X, Mail, Globe, CheckCircle2, Navigation } from 'lucide-react';
import { AGENCIES_LOCATIONS } from '../../data/zenikaData';
import { Language, AgencyLocation } from '../../types';

interface AgenciesSectionProps {
  lang: Language;
  onOpenContact?: () => void;
}

export const AgenciesSection: React.FC<AgenciesSectionProps> = ({ lang, onOpenContact }) => {
  const [selectedAgency, setSelectedAgency] = useState<AgencyLocation | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'France' | 'International'>('all');

  const franceAgencies = AGENCIES_LOCATIONS.filter(a => a.category === 'France');
  const internationalAgencies = AGENCIES_LOCATIONS.filter(a => a.category === 'International');

  const filteredAgencies = activeFilter === 'all'
    ? AGENCIES_LOCATIONS
    : AGENCIES_LOCATIONS.filter(a => a.category === activeFilter);

  const filterTabs = [
    { id: 'all', labelFr: `Toutes les Agences (${AGENCIES_LOCATIONS.length})`, labelEn: `All Offices (${AGENCIES_LOCATIONS.length})` },
    { id: 'France', labelFr: `France (${franceAgencies.length})`, labelEn: `France (${franceAgencies.length})` },
    { id: 'International', labelFr: `International (${internationalAgencies.length})`, labelEn: `International (${internationalAgencies.length})` },
  ];

  const handleOpenAgency = (agency: AgencyLocation) => {
    setSelectedAgency(agency);
  };

  const handleCloseModal = () => {
    setSelectedAgency(null);
  };

  const handleContactFromAgency = () => {
    setSelectedAgency(null);
    if (onOpenContact) {
      onOpenContact();
    }
  };

  return (
    <section
      id="agencies"
      className="py-10 sm:py-14 bg-white dark:bg-[#080B11] relative border-t border-slate-200 dark:border-[#222B3D]/80 transition-colors duration-200"
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Aligned layout matching PartnersEcosystemSection */}
        <div className="max-w-4xl mb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#161C2B] border border-slate-200 dark:border-[#222B3D] text-[#E60039] text-xs font-mono font-bold">
            <Building2 size={13} />
            <span>{lang === 'fr' ? 'Implantations & Réseau de Proximité' : 'Offices & Local Network'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white font-display leading-tight">
            {lang === 'fr' ? (
              <>
                Nos <span className="text-[#E60039]">agences</span> de proximité en France et à l’International
              </>
            ) : (
              <>
                Our proximity <span className="text-[#E60039]">offices</span> in France and Worldwide
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8E9BAE] max-w-2xl leading-relaxed">
            {lang === 'fr'
              ? 'Un réseau de 13 agences locales pour vous accompagner au plus près de vos équipes avec réactivité, conseil pragmatique et culture craft.'
              : 'A network of 13 local offices supporting your teams closely with high responsiveness, pragmatic advisory, and craft culture.'}
          </p>
        </div>

        {/* Category Filters: Matching Partners filter bar */}
        <div className="flex flex-wrap gap-1.5 mb-5 pb-3 border-b border-slate-200 dark:border-[#222B3D]">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as 'all' | 'France' | 'International')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#E60039] text-white shadow-xs font-bold'
                  : 'bg-slate-100 dark:bg-[#111622] text-slate-600 dark:text-[#8E9BAE] hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#222B3D]'
              }`}
            >
              {lang === 'fr' ? tab.labelFr : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Agencies Grid: Responsive 6-column grid matching Partners section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 w-full">
          {filteredAgencies.map((agency) => (
            <button
              key={agency.city}
              type="button"
              onClick={() => handleOpenAgency(agency)}
              className="group p-3.5 sm:p-4 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] hover:bg-white dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/10 hover:border-[#E60039]/40 dark:hover:border-[#E60039]/40 hover:shadow-md hover:shadow-slate-200/50 dark:hover:shadow-black/40 transition-all duration-200 flex flex-col justify-between text-left cursor-pointer min-h-[105px] sm:min-h-[115px]"
            >
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-white group-hover:text-[#E60039] transition-colors truncate">
                      {agency.city}
                    </h3>
                  </div>
                  {agency.isHQ && (
                    <span className="px-1.5 py-0.5 rounded bg-[#E60039]/10 text-[#E60039] text-[9px] font-mono font-bold uppercase shrink-0">
                      Siège
                    </span>
                  )}
                </div>

                <span className="text-[11px] font-mono text-slate-500 dark:text-[#8E9BAE] block truncate">
                  {agency.category === 'International' ? `${agency.country} · ${agency.region}` : agency.region}
                </span>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-[11px] font-mono font-medium text-slate-400 group-hover:text-[#E60039] transition-colors">
                <span className="truncate">{agency.category}</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </button>
          ))}
        </div>

        {/* Discreet Highlights Callout: Matching Partners callout */}
        <div className="mt-5 px-4 py-3 rounded-xl bg-slate-50/80 dark:bg-[#111622]/60 border border-slate-200/80 dark:border-[#222B3D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-600 dark:text-[#8E9BAE]">
            <MapPin size={16} className="text-[#E60039] shrink-0" />
            <span>
              {lang === 'fr'
                ? '13 implantations locales en France, Europe et Asie · Interventions en régie, forfait ou squads dédiées.'
                : '13 local offices across France, Europe, and Asia · Embedded squads, time-and-materials, or fixed-price.'}
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold text-[#E60039] bg-[#E60039]/10 px-2.5 py-0.5 rounded border border-[#E60039]/20 shrink-0">
            100% Proximité
          </span>
        </div>

      </div>

      {/* ================================================================= */}
      {/* AGENCY DETAIL MODAL (OUVERT AU CLIC SUR LA VILLE)                 */}
      {/* ================================================================= */}
      <AnimatePresence>
        {selectedAgency && (
          <div
            role="presentation"
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto cursor-pointer"
            onClick={handleCloseModal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="agency-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-[#0E131F] text-slate-900 dark:text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-white/10 relative cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-white/70 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Fermer la modal"
              >
                <X size={16} />
              </button>

              {/* Modal Header */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E60039]/10 text-[#E60039] text-xs font-mono font-bold">
                    {selectedAgency.category}
                  </span>
                  {selectedAgency.isHQ && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-mono font-bold">
                      Siège social
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2">
                  <h3 id="agency-modal-title" className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                    {selectedAgency.city}
                  </h3>
                </div>

                <p className="text-xs font-mono text-slate-500 dark:text-white/60">
                  {selectedAgency.region} — {selectedAgency.country}
                </p>
              </div>

              {/* Coordinates Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 space-y-3.5 mb-6 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={17} className="text-[#E60039] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-white/40 block">
                      {lang === 'fr' ? 'Adresse' : 'Address'}
                    </span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {selectedAgency.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={17} className="text-[#E60039] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-white/40 block">
                      {lang === 'fr' ? 'Téléphone' : 'Phone'}
                    </span>
                    <a
                      href={`tel:${selectedAgency.phone.replace(/[^0-9+]/g, '')}`}
                      className="font-mono font-bold text-slate-800 dark:text-slate-200 hover:text-[#E60039] transition-colors"
                    >
                      {selectedAgency.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={17} className="text-[#E60039] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-white/40 block">
                      Email
                    </span>
                    <span className="font-mono text-xs text-slate-800 dark:text-slate-200">
                      contact@zenika.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Engagement points */}
              <div className="space-y-2 mb-6">
                {[
                  lang === 'fr' ? 'Squads d’ingénierie et consultants résidents' : 'Local engineering squads and resident consultants',
                  lang === 'fr' ? 'Animations techniques, meetups et BBL sur place' : 'Local tech talks, meetups and brown-bag sessions',
                  lang === 'fr' ? 'Salles de formation et d’ateliers de cadrage' : 'Dedicated training and discovery workshop rooms'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-white/70">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Modal CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleContactFromAgency}
                  className="flex-1 py-3 px-5 rounded-xl bg-[#E60039] hover:bg-[#CC0033] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Mail size={15} />
                  <span>
                    {lang === 'fr' ? `Contacter l'agence de ${selectedAgency.city}` : `Contact ${selectedAgency.city} squad`}
                  </span>
                </button>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Zenika ${selectedAgency.city} ${selectedAgency.address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Navigation size={14} />
                  <span>{lang === 'fr' ? 'Itinéraire' : 'Directions'}</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AgenciesSection;
