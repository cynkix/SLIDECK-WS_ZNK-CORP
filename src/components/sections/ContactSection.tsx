import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Clock, Building2, Bot, ArrowRight, Sparkles } from 'lucide-react';
import { Language } from '../../types';
import { ZenikaMonogram } from '../brand/ZenikaMonogram';
import { AGENCIES_LOCATIONS } from '../../data/zenikaData';

interface ContactSectionProps {
  lang: Language;
  onOpenBot?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, onOpenBot }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    needType: 'Conseil & Cadrage',
    agencyCity: 'Paris (Siège)',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 border-t border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#07090F] relative scroll-mt-20 overflow-hidden transition-colors"
    >
      {/* Ambient background glows */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 -right-32 w-96 h-96 bg-[#E60039]/5 dark:bg-[#E60039]/10 rounded-full blur-[140px] pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-1/4 -left-32 w-96 h-96 bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" 
      />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header matching image.png pattern */}
        <div className="mb-10 sm:mb-14 w-full">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E60039] font-display mb-3 text-left">
            {lang === 'fr' ? "06 / CONTACT & ÉCHANGE PROJET" : "06 / CONTACT & PROJECT INQUIRY"}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black font-display text-slate-900 dark:text-white tracking-tight leading-[1.08] text-left">
                {lang === 'fr' ? (
                  <>
                    Parlons de votre prochain <span className="text-[#E60039]">défi technologique</span>.
                  </>
                ) : (
                  <>
                    Let’s discuss your next <span className="text-[#E60039]">technology challenge</span>.
                  </>
                )}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base lg:text-[17px] text-slate-600 dark:text-slate-300 font-normal leading-relaxed text-left">
                {lang === 'fr'
                  ? "Du diagnostic d'architecture au déploiement de squads critiques ou à la formation de vos talents, échangez directement avec nos directeurs techniques et responsables d'agences."
                  : "From architecture audits to deploying critical squads or upskilling your teams, discuss directly with our technical and agency directors."}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Main Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Direct coordinates & assurances */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 rounded-3xl bg-white dark:bg-[#0D111D] border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 shadow-xl">
            <div className="space-y-6 text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E60039]/10 text-[#E60039] text-xs font-display font-bold uppercase tracking-wider mb-3">
                  <ZenikaMonogram size={14} variant="color" />
                  <span>{lang === 'fr' ? 'Échange Direct & Sans Intermédiaire' : 'Direct Engineering Dialogue'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                  {lang === 'fr' ? 'Une équipe senior dédiée à vos côtés' : 'A senior engineering squad by your side'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {lang === 'fr'
                    ? 'Pas de filtre commercial superflu : votre demande est directement qualifiée par un Directeur Technique (CTO) ou un Directeur d’Agence locale.'
                    : 'No sales overhead: your request is reviewed directly by a Chief Technology Officer or local Agency Director.'}
                </p>
              </div>

              {/* Contact info list */}
              <div className="space-y-3.5 pt-2 border-t border-slate-200 dark:border-white/10">
                <a
                  href="mailto:contact@zenika.com"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] hover:bg-red-50/50 dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/5 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E60039]/10 text-[#E60039] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-display uppercase tracking-wider text-slate-400 dark:text-white/40 block">Email officiel</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#E60039] transition-colors truncate block">
                      contact@zenika.com
                    </span>
                  </div>
                </a>

                <a
                  href="tel:+33145261915"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] hover:bg-red-50/50 dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/5 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E60039]/10 text-[#E60039] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-display uppercase tracking-wider text-slate-400 dark:text-white/40 block">Standard Téléphonique</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#E60039] transition-colors truncate block">
                      +33 (0)1 45 26 19 15
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-white flex items-center justify-center shrink-0">
                    <Building2 size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-display uppercase tracking-wider text-slate-400 dark:text-white/40 block">Siège Social & Réseau</span>
                    <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                      53 rue de Châteaudun, 75009 Paris · 13 agences en France & Monde
                    </span>
                  </div>
                </div>
              </div>

              {/* Guarantees pills */}
              <div className="space-y-2 pt-2">
                {[
                  lang === 'fr' ? 'Réponse garantie sous 24h ouvrées' : 'Guaranteed reply within 24 business hours',
                  lang === 'fr' ? 'Confidentialité stricte & accord NDA sur demande' : 'Strict confidentiality & mutual NDA on request',
                  lang === 'fr' ? 'Accompagnement éligible aux référencements grands comptes' : 'Tier-one enterprise vendor qualification compliance'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative Bot Callout */}
            {onOpenBot && (
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={onOpenBot}
                  className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white text-xs sm:text-sm font-bold flex items-center justify-between transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#E60039] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      <Bot size={15} />
                    </div>
                    <span>{lang === 'fr' ? 'Préférer l’Assistant Zenika (Conseil & Projets)' : 'Prefer the Interactive Assistant'}</span>
                  </div>
                  <ArrowRight size={14} className="text-[#E60039] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: In-page Classic Contact Form */}
          <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0D111D] border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 lg:p-10 shadow-xl flex flex-col justify-center">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20 shadow-lg">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">
                  {lang === 'fr' ? 'Demande envoyée avec succès !' : 'Inquiry sent successfully!'}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                  {lang === 'fr'
                    ? `Merci ${formData.fullName || ''}. Un directeur d’agence ou CTO Zenika analysera votre projet et prendra contact avec vous sous 24h ouvrées.`
                    : `Thank you ${formData.fullName || ''}. A Zenika engineering director will review your project and contact you within 24 business hours.`}
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        company: '',
                        phone: '',
                        needType: 'Conseil & Cadrage',
                        agencyCity: 'Paris (Siège)',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs sm:text-sm font-bold transition-all hover:opacity-90 cursor-pointer shadow-md"
                  >
                    {lang === 'fr' ? 'Envoyer un autre message' : 'Send another inquiry'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-left">
                <div className="border-b border-slate-200/80 dark:border-white/10 pb-3 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white">
                    {lang === 'fr' ? 'Formulaire de contact direct' : 'Direct Contact Form'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {lang === 'fr' ? 'Remplissez ces quelques lignes pour être mis en relation avec la bonne équipe locale.' : 'Fill out these quick fields to connect with the right squad.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-display font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {lang === 'fr' ? 'Nom complet *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={lang === 'fr' ? 'Ex: Claire Dubois' : 'Ex: Alex Taylor'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#E60039]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-display font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {lang === 'fr' ? 'Email professionnel *' : 'Work Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nom@entreprise.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#E60039]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-display font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {lang === 'fr' ? 'Entreprise / Organisation *' : 'Company / Organization *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={lang === 'fr' ? 'Ex: Groupe bancaire, Scale-up tech...' : 'Ex: Enterprise Corp'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#E60039]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-display font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {lang === 'fr' ? 'Téléphone' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#E60039]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-display font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {lang === 'fr' ? 'Nature de votre besoin' : 'Inquiry Nature'}
                    </label>
                    <select
                      value={formData.needType}
                      onChange={(e) => setFormData({ ...formData, needType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#131726] border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#E60039] cursor-pointer"
                    >
                      <option value="Conseil & Cadrage">{lang === 'fr' ? 'Conseil stratégique & Cadrage d’Architecture' : 'Strategic Advisory & Architecture'}</option>
                      <option value="Projet Critique">{lang === 'fr' ? 'Projet “Mission Critical” & Squads d’Ingénierie' : 'Mission Critical Delivery & Engineering Squads'}</option>
                      <option value="Réalisation & Craft">{lang === 'fr' ? 'Réalisation logicielle & Software Craftsmanship' : 'Software Craft & Engineering'}</option>
                      <option value="IA & Data">{lang === 'fr' ? 'Intelligence Artificielle & Plateformes Data' : 'AI & Modern Data Platforms'}</option>
                      <option value="Cloud & DevSecOps">{lang === 'fr' ? 'Cloud, Kubernetes & Plateformes DevSecOps' : 'Cloud, Kubernetes & DevSecOps'}</option>
                      <option value="Audit & Diagnostic">{lang === 'fr' ? 'Audit technique, Diagnostic SI & Performance' : 'Technical Audit, IT Diagnostic & Performance'}</option>
                      <option value="Autre">{lang === 'fr' ? 'Autre projet stratégique' : 'Other strategic inquiry'}</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-display font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {lang === 'fr' ? 'Agence de proximité' : 'Nearest Office'}
                    </label>
                    <select
                      value={formData.agencyCity}
                      onChange={(e) => setFormData({ ...formData, agencyCity: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#131726] border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#E60039] cursor-pointer"
                    >
                      {AGENCIES_LOCATIONS.map((a) => (
                        <option key={a.city} value={a.city}>
                          {a.city} {a.isHQ ? '(Siège social)' : `(${a.country})`}
                        </option>
                      ))}
                      <option value="National / Distance">{lang === 'fr' ? 'À distance / National' : 'Remote / National'}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-display font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {lang === 'fr' ? 'Votre message / Contexte du projet *' : 'Your Message / Context *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={lang === 'fr' ? 'Présentez vos enjeux, le calendrier envisagé ou vos questions techniques...' : 'Outline your mission, timeline, or technical requirements...'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#E60039] resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    🔒 {lang === 'fr' ? 'Données sécurisées · Aucun démarchage commercial' : 'Secure data · No unsolicited marketing'}
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#E60039] hover:bg-[#CC0033] text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={15} />
                        <span>{lang === 'fr' ? 'Envoyer ma demande' : 'Send Inquiry'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
