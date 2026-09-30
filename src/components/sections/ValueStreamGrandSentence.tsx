import React, { useRef, useState, useEffect } from 'react';
import { Language } from '../../types';

interface ValueStreamGrandSentenceProps {
  lang: Language;
}

interface GrandSentenceWord {
  fr: string;
  en: string;
  highlight?: 'red' | 'emerald';
}

interface SentenceLine {
  words: GrandSentenceWord[];
}

const LEFT_PHRASE_LINES: SentenceLine[] = [
  {
    words: [
      { fr: "Maîtriser", en: "Mastering" },
      { fr: "la", en: "the" },
      { fr: "complexité", en: "complexity" },
      { fr: "des", en: "of" },
      { fr: "systèmes", en: "information" },
      { fr: "d’information", en: "systems" },
      { fr: "et", en: "and" },
      { fr: "des", en: "of" },
      { fr: "organisations…", en: "organizations…" },
    ],
  },
];

const RIGHT_PHRASE_LINES: SentenceLine[] = [
  {
    words: [
      { fr: "…", en: "…" },
      { fr: "pour", en: "to" },
      { fr: "traduire", en: "translate" },
      { fr: "les", en: "all" },
      { fr: "investissements", en: "IT" },
      { fr: "IT", en: "investments" },
      { fr: "en", en: "into" },
      { fr: "valeur", en: "measurable", highlight: 'red' },
      { fr: "métier", en: "business", highlight: 'red' },
      { fr: "mesurable", en: "value", highlight: 'red' },
    ],
  },
];

export const ValueStreamGrandSentence: React.FC<ValueStreamGrandSentenceProps> = ({ lang }) => {
  const sentenceBannerRef = useRef<HTMLDivElement>(null);
  const [sentenceProgress, setSentenceProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sentenceBannerRef.current) {
            const sRect = sentenceBannerRef.current.getBoundingClientRect();
            const vh = window.innerHeight;
            const scrollableDist = sRect.height - vh;

            if (scrollableDist > 0) {
              const scrolled = -sRect.top;
              if (scrolled <= 0) {
                setSentenceProgress(0);
              } else {
                const animProgress = Math.min(1, scrolled / (scrollableDist * 0.70));
                setSentenceProgress(Math.max(0, animProgress));
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const countLettersInLines = (lines: SentenceLine[], currentLang: Language) => {
    let count = 0;
    for (const line of lines) {
      for (const w of line.words) {
        const text = currentLang === 'fr' ? w.fr : w.en;
        count += text ? Array.from(text).length : 0;
      }
    }
    return Math.max(1, count);
  };

  const totalLeftLetters = countLettersInLines(LEFT_PHRASE_LINES, lang);
  const totalRightLetters = countLettersInLines(RIGHT_PHRASE_LINES, lang);

  const renderSentenceWord = (
    word: GrandSentenceWord,
    letterOffset: number,
    totalLetters: number,
    isRightSide: boolean
  ) => {
    const text = lang === 'fr' ? word.fr : word.en;
    if (!text) return null;

    const chars = Array.from(text);

    return (
      <span
        key={`${isRightSide ? 'r-word' : 'l-word'}-${letterOffset}`}
        className="inline-block mr-2 sm:mr-3 lg:mr-3.5 mb-1 whitespace-nowrap will-change-transform"
      >
        {chars.map((char, cIdx) => {
          const charIndex = letterOffset + cIdx;
          let startThreshold = 0;

          if (!isRightSide) {
            startThreshold = (charIndex / totalLetters) * 0.45;
          } else {
            startThreshold = 0.48 + (charIndex / totalLetters) * 0.45;
          }

          const isRevealed = sentenceProgress >= startThreshold;
          const rawFactor = Math.max(0, Math.min(1, (sentenceProgress - startThreshold) / 0.012));
          const factor = rawFactor * rawFactor * (3 - 2 * rawFactor);
          const isCurrentChar = isRevealed && factor < 1;

          let colorClasses = '';
          if (!isRevealed) {
            colorClasses = 'text-slate-400/20 dark:text-white/10 select-none';
          } else if (word.highlight === 'red') {
            colorClasses = isCurrentChar
              ? 'text-[#FF1744] font-black drop-shadow-[0_0_24px_rgba(255,23,68,0.9)]'
              : 'text-[#E60039] font-black drop-shadow-[0_0_18px_rgba(230,0,57,0.75)]';
          } else if (word.highlight === 'emerald') {
            colorClasses = isCurrentChar
              ? 'text-emerald-300 font-black drop-shadow-[0_0_24px_rgba(110,231,183,0.9)]'
              : 'text-emerald-400 font-black drop-shadow-[0_0_18px_rgba(52,211,153,0.75)]';
          } else {
            colorClasses = isCurrentChar
              ? 'text-slate-900 dark:text-white font-black'
              : 'text-slate-900 dark:text-white font-extrabold';
          }

          return (
            <span
              key={`${isRightSide ? 'r-char' : 'l-char'}-${letterOffset}-${cIdx}`}
              className={`inline-block transition-[color,opacity] duration-150 ease-out will-change-transform ${colorClasses}`}
              style={{
                opacity: isRevealed ? 1 : 0.18,
              }}
            >
              {char}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div
      ref={sentenceBannerRef}
      id="value-stream-grand-sentence"
      className="relative w-full z-10"
      style={{ height: isMobile ? '120vh' : '180vh' }}
    >
      {/* Sticky Viewport Container: Centered in viewport */}
      <div className="sticky top-0 min-h-screen h-screen w-full flex flex-col justify-center items-center py-6 sm:py-14 lg:py-20 overflow-hidden z-20">
        <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center my-auto relative">
          {/* Ambient glows behind phrases */}
          <div className="absolute top-10 left-0 w-80 h-80 bg-[#E60039]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#E60039]/8 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 w-full space-y-8 sm:space-y-10 lg:space-y-12 flex flex-col justify-center">
            {/* 1. LEFT PHRASE: À GAUCHE */}
            <div className="text-left max-w-3xl mx-auto md:mx-0 w-full">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[46px] 2xl:text-[50px] font-black font-display leading-[1.14] tracking-tight">
                {LEFT_PHRASE_LINES.map((line, lineIdx) => {
                  let lineLetterOffset = 0;
                  for (let i = 0; i < lineIdx; i++) {
                    for (const w of LEFT_PHRASE_LINES[i].words) {
                      const t = lang === 'fr' ? w.fr : w.en;
                      lineLetterOffset += t ? Array.from(t).length : 0;
                    }
                  }
                  let wordLetterCursor = lineLetterOffset;

                  return (
                    <div key={lineIdx} className="block leading-[1.14]">
                      {line.words.map((w) => {
                        const t = lang === 'fr' ? w.fr : w.en;
                        const wordStart = wordLetterCursor;
                        if (t) {
                          wordLetterCursor += Array.from(t).length;
                        }
                        return renderSentenceWord(w, wordStart, totalLeftLetters, false);
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. RIGHT PHRASE: À DROITE */}
            <div className="text-left md:text-right max-w-3xl mx-auto md:ml-auto md:mr-0 w-full">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[46px] 2xl:text-[50px] font-black font-display leading-[1.14] tracking-tight">
                {RIGHT_PHRASE_LINES.map((line, lineIdx) => {
                  let lineLetterOffset = 0;
                  for (let i = 0; i < lineIdx; i++) {
                    for (const w of RIGHT_PHRASE_LINES[i].words) {
                      const t = lang === 'fr' ? w.fr : w.en;
                      lineLetterOffset += t ? Array.from(t).length : 0;
                    }
                  }
                  let wordLetterCursor = lineLetterOffset;

                  return (
                    <div key={lineIdx} className="block leading-[1.14]">
                      {line.words.map((w) => {
                        const t = lang === 'fr' ? w.fr : w.en;
                        const wordStart = wordLetterCursor;
                        if (t) {
                          wordLetterCursor += Array.from(t).length;
                        }
                        return renderSentenceWord(w, wordStart, totalRightLetters, true);
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueStreamGrandSentence;
