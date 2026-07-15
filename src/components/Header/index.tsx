'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LogoLink from './LogoLink';
import Links from './Links';
import { Menu, X } from 'lucide-react';
import SocialButtons from './SocialButtons';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  initialIsDark: boolean;
}

export default function Header({ initialIsDark }: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);

  const links: { href: string; label: string }[] = [
    { href: '/', label: 'Accueil' },
    ...(hasAccount ? [{ href: '/admin', label: 'Admin' }] : []),
    { href: '/games', label: 'Jeux' },
  ];

  // Close burger menu on page change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const fetchUser = async () => {
      const req = await fetch('/api/users/me');
      const data = await req.json();
      console.log(data);
      if (data.user) {
        setHasAccount(true);
      }
    };
    fetchUser();
  }, []);

  return (
    <header className='flex flex-col items-center pt-8 pb-6 px-8 text-center relative z-50'>
      <div className='backdrop-blur-xs bg-black/10 dark:bg-white/10 container max-w-6xl flex flex-row items-center justify-between w-full border border-black/10 dark:border-white/30 shadow-[0_0_25px_rgba(0,0,0,0.1)] dark:shadow-[0_0_25px_rgba(255,255,255,0.1)] px-6 py-2 rounded-full relative'>
        <LogoLink isActive={pathname === '/'} />

        {/* Desktop section */}
        <div className='hidden md:flex items-center space-x-4'>
          <Links links={links} />
          <ThemeToggle initialIsDark={initialIsDark} />
          <SocialButtons />
        </div>

        {/* Burger button (mobile only) */}
        <button
          className='md:hidden p-2 rounded-lg hover:bg-white/10 transition'
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Ouvrir le menu' : 'Fermer le menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className='absolute top-full left-0 w-full mt-3 bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-2xl border border-black/20 dark:border-white/20 shadow-lg md:hidden animate-fade-in z-50 flex flex-col items-center space-y-4 py-6'>
            <Links links={links} />
            <ThemeToggle initialIsDark={initialIsDark} />
            <SocialButtons />
          </div>
        )}
      </div>
    </header>
  );
}
