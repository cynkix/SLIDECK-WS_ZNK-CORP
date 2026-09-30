import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('zenika_theme') as Theme;
        if (saved === 'light' || saved === 'dark') return saved;
      } catch {
        // Sandboxed iframe fallback
      }
    }
    return 'light'; // default theme
  });

  const applyThemeClasses = (t: Theme) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const body = document.body;
    if (t === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
      if (body) {
        body.classList.add('dark');
        body.classList.remove('light');
      }
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
      if (body) {
        body.classList.add('light');
        body.classList.remove('dark');
      }
    }
  };

  useEffect(() => {
    applyThemeClasses(theme);
    try {
      localStorage.setItem('zenika_theme', theme);
    } catch {
      // Ignored
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    applyThemeClasses(newTheme);
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      applyThemeClasses(next);
      try {
        localStorage.setItem('zenika_theme', next);
      } catch {
        // Ignored
      }
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
