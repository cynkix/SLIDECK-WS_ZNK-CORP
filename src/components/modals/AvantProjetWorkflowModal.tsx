import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Send, CheckCircle2, Mail, User, 
  MessageSquare, Layers, Clock, ShieldCheck,
  ArrowRight, Check, Target, Search, FileText,
  Copy, RotateCcw, AlertCircle, Compass, Award, ExternalLink,
  Phone, Building2, Bot, Sparkles, MapPin, CheckSquare
} from 'lucide-react';
import { SolutionBlock, OperatingModel, Language } from '../../types';
import { ZenikaMonogram } from '../brand/ZenikaMonogram';
import { AGENCIES_LOCATIONS } from '../../data/zenikaData';

interface AvantProjetWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  preSelectedBlocks?: SolutionBlock[];
  preSelectedModel?: OperatingModel | null;
}

export const AvantProjetWorkflowModal: React.FC<AvantProjetWorkflowModalProps> = ({
  isOpen,
  onClose,
  lang,
  preSelectedBlocks = [],
  preSelectedModel = null,
}) => {
  // Mode switcher: 'form' (Formulaire classique) vs 'bot' (Assistant interactif Zenika)
  const [activeMode, setActiveMode] = useState<'form' | 'bot'>('form');

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    needType: 'Conseil & Cadrage',
    agencyCity: 'Paris (Siège)',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bot Conversation State
  const [botStep, setBotStep] = useState<number>(1);
  const [botAnswers, setBotAnswers] = useState<{
    objective?: string;
    model?: string;
    timeline?: string;
    contactName?: string;
    contactEmail?: string;
    contactCompany?: string;
  }>({});
  const [botSubmitted, setBotSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 700);
  };

  const handleBotChoice = (key: 'objective' | 'model' | 'timeline', value: string) => {
    setBotAnswers(prev => ({ ...prev, [key]: value }));
    setBotStep(prev => prev + 1);
  };

  const handleBotFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBotSubmitted(true);
  };

  const resetAll = () => {
    setFormSubmitted(false);
    setBotSubmitted(false);
    setBotStep(1);
    setBotAnswers({});
    setFormData({
      fullName: '',
      email: '',
      company: '',
      phone: '',
      needType: 'Conseil & Cadrage',
      agencyCity: 'Paris (Siège)',
      message: '',
    });
  };

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto cursor-pointer"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-3xl bg-white dark:bg-[#0E1322] text-slate-900 dark:text-white rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden my-auto cursor-default flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="relative px-6 sm:px-8 pt-6 pb-4 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02]">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-3 mb-1">
            <ZenikaMonogram size={26} variant="color" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E60039]">
              {lang === 'fr' ? 'Contact & Échange Projet' : 'Get In Touch with Zenika'}
            </span>
          </div>

          <h2 id="contact-modal-title" className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white">
            {lang === 'fr' ? 'Échangeons sur vos ambitions technologiques' : 'Let’s discuss your technology ambitions'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 mt-1 max-w-xl">
            {lang === 'fr'
              ? 'Conseil, réalisation, modernisation d’architecture ou formation : nos directeurs techniques et d’agences vous répondent sous 24h.'
              : 'Advisory, software craft, modern architecture or training: our technical and agency directors respond within 24 business hours.'}
          </p>

          {/* Mode Switcher Tabs : Formulaire Classique vs Bot interactif Zenika */}
          <div className="flex items-center gap-2 mt-4 pt-2">
            <button
              type="button"
              onClick={() => setActiveMode('form')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeMode === 'form'
                  ? 'bg-[#E60039] text-white shadow-md'
                  : 'bg-white dark:bg-white/10 text-slate-700 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10'
              }`}
            >
              <FileText size={15} />
              <span>{lang === 'fr' ? 'Formulaire classique' : 'Classic Form'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('bot')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeMode === 'bot'
                  ? 'bg-[#E60039] text-white shadow-md'
                  : 'bg-white dark:bg-white/10 text-slate-700 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10'
              }`}
            >
              <Bot size={15} />
              <span>{lang === 'fr' ? 'Assistant Zenika (Bot)' : 'Zenika Assistant (Bot)'}</span>
              <span className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/15 text-white/90">
                Zenika Training
              </span>
            </button>
          </div>
        </div>

        {/* Modal Body Container with Scroll */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* =============================================================== */}
          {/* OPTION 1 : FORMULAIRE CLASSIQUE                                 */}
          {/* =============================================================== */}
          {activeMode === 'form' && (
            <div>
              {formSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                    {lang === 'fr' ? 'Message transmis avec succès !' : 'Inquiry sent successfully!'}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-white/70 max-w-md mx-auto">
                    {lang === 'fr'
                      ? `Merci ${formData.fullName}. Un directeur d'agence ou d'ingénierie Zenika reviendra vers vous sous 24h ouvrées.`
                      : `Thank you ${formData.fullName}. A Zenika director will follow up with you within 24 business hours.`}
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm cursor-pointer hover:opacity-90"
                    >
                      {lang === 'fr' ? 'Fermer' : 'Close'}
                    </button>
                    <button
                      type="button"
                      onClick={resetAll}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white text-sm font-semibold cursor-pointer hover:bg-slate-200 dark:hover:bg-white/15"
                    >
                      {lang === 'fr' ? 'Nouveau message' : 'New message'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Preselected Contextual Items Badge (if any) */}
                  {(preSelectedBlocks.length > 0 || preSelectedModel) && (
                    <div className="p-3.5 rounded-xl bg-red-50/60 dark:bg-[#E60039]/10 border border-[#E60039]/20 text-xs text-slate-800 dark:text-white space-y-1">
                      <div className="flex items-center gap-2 font-mono font-bold text-[#E60039]">
                        <Layers size={14} />
                        <span>{lang === 'fr' ? 'Contexte sélectionné :' : 'Selected Context:'}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {preSelectedModel && (
                          <span className="px-2 py-0.5 rounded bg-white dark:bg-white/10 text-[11px] font-mono font-medium border border-[#E60039]/30">
                            Modèle : {preSelectedModel.name}
                          </span>
                        )}
                        {preSelectedBlocks.map((b) => (
                          <span key={b.id} className="px-2 py-0.5 rounded bg-white dark:bg-white/10 text-[11px] font-mono font-medium border border-slate-200 dark:border-white/10">
                            {lang === 'fr' ? b.title : b.titleEn}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2-Column Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-mono font-bold text-slate-700 dark:text-white/80 uppercase tracking-wider">
                        {lang === 'fr' ? 'Nom complet *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={lang === 'fr' ? 'Ex: Sophie Martin' : 'Ex: Alex Taylor'}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 focus:border-[#E60039] focus:outline-none text-sm text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-mono font-bold text-slate-700 dark:text-white/80 uppercase tracking-wider">
                        {lang === 'fr' ? 'Email professionnel *' : 'Work Email *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nom@entreprise.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 focus:border-[#E60039] focus:outline-none text-sm text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-mono font-bold text-slate-700 dark:text-white/80 uppercase tracking-wider">
                        {lang === 'fr' ? 'Entreprise / Organisation *' : 'Company / Organization *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={lang === 'fr' ? 'Ex: Société Générale, Renault...' : 'Ex: Acme Corp'}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 focus:border-[#E60039] focus:outline-none text-sm text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-mono font-bold text-slate-700 dark:text-white/80 uppercase tracking-wider">
                        {lang === 'fr' ? 'Téléphone' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+33 6 12 34 56 78"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 focus:border-[#E60039] focus:outline-none text-sm text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-mono font-bold text-slate-700 dark:text-white/80 uppercase tracking-wider">
                        {lang === 'fr' ? 'Objet principal' : 'Main Inquiry Type'}
                      </label>
                      <select
                        value={formData.needType}
                        onChange={(e) => setFormData({ ...formData, needType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151A29] border border-slate-200 dark:border-white/10 focus:border-[#E60039] focus:outline-none text-sm text-slate-900 dark:text-white cursor-pointer"
                      >
                        <option value="Conseil & Cadrage">{lang === 'fr' ? 'Conseil, Audit & Cadrage d’Architecture' : 'Advisory, Audit & Architecture'}</option>
                        <option value="Réalisation & Craft">{lang === 'fr' ? 'Réalisation logicielle & Software Craftsmanship' : 'Engineering & Software Craft'}</option>
                        <option value="IA & Data">{lang === 'fr' ? 'Intelligence Artificielle & Plateformes Data' : 'AI & Modern Data Platforms'}</option>
                        <option value="Cloud & DevSecOps">{lang === 'fr' ? 'Cloud, Kubernetes & Plateformes DevSecOps' : 'Cloud, Kubernetes & DevSecOps'}</option>
                        <option value="Formation & Acculturation">{lang === 'fr' ? 'Formations certifiantes & Montée en compétences' : 'Training & Upskilling (Zenika Training)'}</option>
                        <option value="Autre">{lang === 'fr' ? 'Autre demande' : 'Other request'}</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-mono font-bold text-slate-700 dark:text-white/80 uppercase tracking-wider">
                        {lang === 'fr' ? 'Agence de rattachement' : 'Nearest Office'}
                      </label>
                      <select
                        value={formData.agencyCity}
                        onChange={(e) => setFormData({ ...formData, agencyCity: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151A29] border border-slate-200 dark:border-white/10 focus:border-[#E60039] focus:outline-none text-sm text-slate-900 dark:text-white cursor-pointer"
                      >
                        <option value="Paris (Siège)">Paris (Siège social)</option>
                        <option value="Bordeaux">Bordeaux</option>
                        <option value="Brest">Brest</option>
                        <option value="Clermont-Ferrand">Clermont-Ferrand</option>
                        <option value="Grenoble">Grenoble</option>
                        <option value="Lille">Lille</option>
                        <option value="Lyon">Lyon</option>
                        <option value="Nantes">Nantes</option>
                        <option value="Niort">Niort</option>
                        <option value="Rennes">Rennes</option>
                        <option value="Toulouse">Toulouse</option>
                        <option value="Casablanca">Casablanca (International)</option>
                        <option value="Singapour">Singapour (International)</option>
                        <option value="À distance / National">À distance / National</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-white/80 uppercase tracking-wider">
                      {lang === 'fr' ? 'Votre message / Contexte de votre projet *' : 'Your Message / Project Context *'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={lang === 'fr' ? 'Décrivez brièvement vos enjeux, technologies ou le profil recherché...' : 'Briefly describe your objectives, stack, or timeline...'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 focus:border-[#E60039] focus:outline-none text-sm text-slate-900 dark:text-white resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-white/50">
                      🔒 {lang === 'fr' ? 'Données confidentielles · Réponse sous 24h ouvrées' : 'Confidential · Response within 24h'}
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#E60039] hover:bg-[#CC0033] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
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
          )}

          {/* =============================================================== */}
          {/* OPTION 2 : ASSISTANT ZENIKA BOT (INSPIRÉ DE ZENIKA TRAINING)     */}
          {/* =============================================================== */}
          {activeMode === 'bot' && (
            <div className="space-y-5 text-left">
              {/* Bot Header Card */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#E60039] text-white flex items-center justify-center font-black shadow-md shrink-0">
                  <Bot size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-display text-slate-900 dark:text-white">
                      Assistant Zenika
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      En ligne
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-white/60">
                    {lang === 'fr' ? 'Orientation rapide inspirée du site Zenika Training' : 'Interactive routing inspired by Zenika Training'}
                  </p>
                </div>
              </div>

              {botSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    {lang === 'fr' ? 'Votre parcours a bien été enregistré !' : 'Your answers have been registered!'}
                  </h3>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs font-mono max-w-md mx-auto space-y-1.5 text-left">
                    <div><strong>Objectif :</strong> {botAnswers.objective}</div>
                    <div><strong>Modèle :</strong> {botAnswers.model}</div>
                    <div><strong>Horizon :</strong> {botAnswers.timeline}</div>
                    <div><strong>Contact :</strong> {botAnswers.contactName} ({botAnswers.contactEmail})</div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-white/70">
                    {lang === 'fr' ? 'Un consultant expert Zenika prendra contact avec vous.' : 'A Zenika expert consultant will get back to you shortly.'}
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs cursor-pointer"
                    >
                      {lang === 'fr' ? 'Fermer' : 'Close'}
                    </button>
                    <button
                      type="button"
                      onClick={resetAll}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white font-semibold text-xs cursor-pointer"
                    >
                      {lang === 'fr' ? 'Recommencer' : 'Restart'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Message 1 : Welcome */}
                  <div className="flex items-start gap-2.5 max-w-xl">
                    <div className="w-7 h-7 rounded-full bg-[#E60039] text-white flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                      Z
                    </div>
                    <div className="p-3.5 rounded-2xl rounded-tl-sm bg-slate-100 dark:bg-white/[0.06] text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                      {lang === 'fr'
                        ? 'Bonjour ! Je suis l’assistant virtuel Zenika. Quel est votre enjeu prioritaire aujourd’hui ?'
                        : 'Hello! I am the Zenika virtual assistant. What is your primary business priority today?'}
                    </div>
                  </div>

                  {/* Step 1 Options */}
                  {botStep === 1 && (
                    <div className="pl-9 space-y-2">
                      {[
                        '🚀 Lancer un nouveau produit ou moderniser un SI critique',
                        '⚡ Renforcer nos équipes d’ingénierie (Craft, DevSecOps, Tech Leads)',
                        '🧠 Cadrage IA Native & Plateforme Data sécurisée',
                        '🎓 Catalogue Formations & Montée en compétences (Zenika Training)',
                        '🔍 Réaliser un audit d’architecture ou de performance'
                      ].map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleBotChoice('objective', opt)}
                          className="w-full p-2.5 sm:p-3 rounded-xl bg-white dark:bg-[#121624] hover:bg-red-50/50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-semibold text-slate-800 dark:text-white transition-all text-left flex items-center justify-between group cursor-pointer hover:border-[#E60039]/40"
                        >
                          <span>{opt}</span>
                          <ArrowRight size={14} className="text-slate-400 group-hover:text-[#E60039] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* User response 1 & Message 2 */}
                  {botStep >= 2 && botAnswers.objective && (
                    <>
                      <div className="flex justify-end">
                        <div className="p-3 rounded-2xl rounded-tr-sm bg-[#E60039] text-white text-xs sm:text-sm font-medium max-w-md">
                          {botAnswers.objective}
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 max-w-xl">
                        <div className="w-7 h-7 rounded-full bg-[#E60039] text-white flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                          Z
                        </div>
                        <div className="p-3.5 rounded-2xl rounded-tl-sm bg-slate-100 dark:bg-white/[0.06] text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                          {lang === 'fr'
                            ? 'Parfait. Sous quelle modalité d’intervention envisagez-vous cette collaboration ?'
                            : 'Great. Under what operating model would you envision working together?'}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Step 2 Options */}
                  {botStep === 2 && (
                    <div className="pl-9 space-y-2">
                      {[
                        '👥 Squads intégrées en immersion (Régie / Forfait)',
                        '⚡ Strike Team commando (Délivrance rapide en quelques semaines)',
                        '🧭 Direction technique déléguée & Conseil stratégique',
                        '📚 Formations certifiantes & Ateliers pratiques sur-mesure'
                      ].map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleBotChoice('model', opt)}
                          className="w-full p-2.5 sm:p-3 rounded-xl bg-white dark:bg-[#121624] hover:bg-red-50/50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-semibold text-slate-800 dark:text-white transition-all text-left flex items-center justify-between group cursor-pointer hover:border-[#E60039]/40"
                        >
                          <span>{opt}</span>
                          <ArrowRight size={14} className="text-slate-400 group-hover:text-[#E60039] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* User response 2 & Message 3 */}
                  {botStep >= 3 && botAnswers.model && (
                    <>
                      <div className="flex justify-end">
                        <div className="p-3 rounded-2xl rounded-tr-sm bg-[#E60039] text-white text-xs sm:text-sm font-medium max-w-md">
                          {botAnswers.model}
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 max-w-xl">
                        <div className="w-7 h-7 rounded-full bg-[#E60039] text-white flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                          Z
                        </div>
                        <div className="p-3.5 rounded-2xl rounded-tl-sm bg-slate-100 dark:bg-white/[0.06] text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                          {lang === 'fr'
                            ? 'Très bien noté. Quel est votre horizon de démarrage ?'
                            : 'Understood. What is your target timeline for kickoff?'}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Step 3 Options */}
                  {botStep === 3 && (
                    <div className="pl-9 space-y-2">
                      {[
                        '⚡ Immédiat (Démarrage sous 2 à 4 semaines)',
                        '📅 Au cours de ce trimestre',
                        '🔍 Phase exploratoire & Cadrage budgétaire'
                      ].map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleBotChoice('timeline', opt)}
                          className="w-full p-2.5 sm:p-3 rounded-xl bg-white dark:bg-[#121624] hover:bg-red-50/50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-semibold text-slate-800 dark:text-white transition-all text-left flex items-center justify-between group cursor-pointer hover:border-[#E60039]/40"
                        >
                          <span>{opt}</span>
                          <ArrowRight size={14} className="text-slate-400 group-hover:text-[#E60039] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* User response 3 & Final Contact Form */}
                  {botStep >= 4 && botAnswers.timeline && (
                    <>
                      <div className="flex justify-end">
                        <div className="p-3 rounded-2xl rounded-tr-sm bg-[#E60039] text-white text-xs sm:text-sm font-medium max-w-md">
                          {botAnswers.timeline}
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 max-w-xl">
                        <div className="w-7 h-7 rounded-full bg-[#E60039] text-white flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                          Z
                        </div>
                        <div className="p-3.5 rounded-2xl rounded-tl-sm bg-slate-100 dark:bg-white/[0.06] text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                          {lang === 'fr'
                            ? 'Merci pour ces précisions ! Où nos équipes peuvent-elles vous transmettre les éléments de cadrage ?'
                            : 'Thank you for these insights! Where should our teams send the initial proposal?'}
                        </div>
                      </div>

                      {/* Final Contact Inputs in Bot */}
                      <form onSubmit={handleBotFinalSubmit} className="pl-9 space-y-3 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <input
                            type="text"
                            required
                            placeholder={lang === 'fr' ? 'Votre nom' : 'Your name'}
                            value={botAnswers.contactName || ''}
                            onChange={(e) => setBotAnswers({ ...botAnswers, contactName: e.target.value })}
                            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#E60039]"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Email professionnel"
                            value={botAnswers.contactEmail || ''}
                            onChange={(e) => setBotAnswers({ ...botAnswers, contactEmail: e.target.value })}
                            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#E60039]"
                          />
                          <input
                            type="text"
                            required
                            placeholder={lang === 'fr' ? 'Entreprise' : 'Company'}
                            value={botAnswers.contactCompany || ''}
                            onChange={(e) => setBotAnswers({ ...botAnswers, contactCompany: e.target.value })}
                            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#E60039]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl bg-[#E60039] hover:bg-[#CC0033] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Send size={14} />
                          <span>{lang === 'fr' ? 'Transmettre mes réponses à Zenika' : 'Submit my answers to Zenika'}</span>
                        </button>
                      </form>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.01] flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-white/40">
          <div className="flex items-center gap-2">
            <Building2 size={13} className="text-[#E60039]" />
            <span>13 agences en France et à l'International · Siège : Paris 9e</span>
          </div>
          <a
            href="https://training.zenika.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E60039] transition-colors hidden sm:inline"
          >
            training.zenika.com ↗
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AvantProjetWorkflowModal;
