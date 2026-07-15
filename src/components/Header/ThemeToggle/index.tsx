'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

function getThemeCookie(): string | undefined {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('theme='))
    ?.split('=')[1];
}

function setThemeCookie(theme: 'dark' | 'light') {
  document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
}

function adoptSystemThemeOnFirstVisit(serverIsDark: boolean): boolean {
  if (getThemeCookie()) return serverIsDark;

  const prefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  if (prefersDark !== serverIsDark) {
    document.documentElement.classList.toggle('dark', prefersDark);
  }
  setThemeCookie(prefersDark ? 'dark' : 'light');
  return prefersDark;
}

interface ThemeToggleProps {
  initialIsDark: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ initialIsDark }) => {
  const [isDark, setIsDark] = useState(initialIsDark);

  useEffect(() => {
    setIsDark(adoptSystemThemeOnFirstVisit(initialIsDark));
  }, [initialIsDark]);

  const toggleTheme = () => {
    const nextIsDark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', nextIsDark);
    setThemeCookie(nextIsDark ? 'dark' : 'light');
    setIsDark(nextIsDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer'
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
