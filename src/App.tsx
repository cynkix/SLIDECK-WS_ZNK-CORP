import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ParallaxBackground } from './components/layout/ParallaxBackground';
import { Version1Fluid } from './components/layout/Version1Fluid';
import { HeroOpeningCover } from './components/hero/HeroOpeningCover';
import { Language, SolutionBlock, OperatingModel } from './types';
import { ThemeProvider } from './context/ThemeContext';

// Code-splitting (Rule 2.1 & Bundle Size Optimization):
// Lazy load heavy scoping workflow modal and training chatbot widget
const AvantProjetWorkflowModal = lazy(() =>
  import('./components/modals/AvantProjetWorkflowModal').then((m) => ({ default: m.AvantProjetWorkflowModal }))
);

const ZenikaTrainingBotWidget = lazy(() =>
  import('./components/modals/ZenikaTrainingBotWidget').then((m) => ({ default: m.ZenikaTrainingBotWidget }))
);

export function AppContent() {
  const [lang, setLang] = useState<Language>('fr');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBotWidgetOpen, setIsBotWidgetOpen] = useState(false);
  const [selectedAssembly, setSelectedAssembly] = useState<SolutionBlock[]>([]);
  const [selectedModel, setSelectedModel] = useState<OperatingModel | null>(null);

  // Synchronize document language with selected language (Accessibility / SEO)
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    // Ensure the page starts at the top so the opening hero is visible on initial load
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      }
    }
  }, []);

  // Stable callbacks (Rule 5.1 & Re-render optimization)
  const handleOpenContactWithAssembly = useCallback((assembly?: SolutionBlock[]) => {
    setSelectedAssembly(assembly || []);
    setSelectedModel(null);
    setIsContactOpen(true);
  }, []);

  const handleOpenContactWithModel = useCallback((model: OperatingModel) => {
    setSelectedModel(model);
    setSelectedAssembly([]);
    setIsContactOpen(true);
  }, []);

  const handleCloseContact = useCallback(() => {
    setIsContactOpen(false);
  }, []);

  const handleOpenBot = useCallback(() => {
    setIsBotWidgetOpen(true);
  }, []);

  const handleCloseBot = useCallback(() => {
    setIsBotWidgetOpen(false);
  }, []);

  const handleDiscover = useCallback(() => {
    const target =
      document.getElementById('value-stream-grand-sentence') ||
      document.getElementById('value-stream') ||
      document.getElementById('why') ||
      document.getElementById('main-content');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07080B] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-[#E60039] selection:text-white transition-colors duration-200 relative">
      {/* Discreet Multi-Layer Parallax Background */}
      <ParallaxBackground />

      {/* Opening Full-Page Cover with Zenika Logo on Black Background */}
      <HeroOpeningCover
        lang={lang}
        onDiscover={handleDiscover}
      />

      {/* Top Navbar */}
      <Navbar
        lang={lang}
        onLanguageChange={setLang}
        onOpenContact={handleOpenContactWithAssembly}
      />

      {/* Main Content: Version 1 (Fluid Minimal Glass) */}
      <main id="main-content" className="flex-1">
        <Version1Fluid
          lang={lang}
          onOpenContact={handleOpenContactWithAssembly}
          onOpenContactModel={handleOpenContactWithModel}
          onOpenBot={handleOpenBot}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenContact={handleOpenContactWithAssembly}
      />

      {/* Interactive Project Inquiry & Scoping Modal (Code-split with Suspense) */}
      {isContactOpen && (
        <Suspense fallback={null}>
          <AvantProjetWorkflowModal
            isOpen={isContactOpen}
            onClose={handleCloseContact}
            lang={lang}
            preSelectedBlocks={selectedAssembly}
            preSelectedModel={selectedModel}
          />
        </Suspense>
      )}
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
