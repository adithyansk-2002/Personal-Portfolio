'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AppLogo from '@/components/ui/AppLogo';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Terminal', href: '#terminal' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setScrolled(currentY > 20);
    if (currentY > lastScrollY && currentY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(currentY);

    const sections = navLinks?.map(l => l?.href?.slice(1));
    for (const id of [...sections]?.reverse()) {
      const el = document.getElementById(id);
      if (el && el?.getBoundingClientRect()?.top <= 120) {
        setActiveSection(id);
        break;
      }
    }
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'
          } ${scrolled ? 'glass-nav' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AppLogo size={32} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
            <span className="font-bold text-lg tracking-tight text-foreground hidden sm:block">
              Adithyan<span className="text-cyan">.</span>dev
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks?.map((link) => (
              <a
                key={link?.href}
                href={link?.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg group ${activeSection === link?.href?.slice(1)
                    ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {link?.label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent rounded-full transition-all duration-300 ${activeSection === link?.href?.slice(1) ? 'w-4/5' : 'w-0 group-hover:w-4/5'
                    }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden lg:flex btn-primary px-4 py-2 rounded-lg text-sm font-semibold items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
              Hire Me
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              aria-label="Open menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] glass-nav flex flex-col justify-center items-center lg:hidden">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-6 text-muted-foreground hover:text-foreground p-2"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <nav className="flex flex-col gap-6 text-center">
            {navLinks?.map((link) => (
              <a
                key={link?.href}
                href={link?.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-medium text-muted-foreground hover:text-accent transition-colors"
              >
                {link?.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 btn-primary px-8 py-3 rounded-xl text-base font-semibold"
            >
              Hire Me
            </a>
          </nav>
        </div>
      )}
    </>
  );
}