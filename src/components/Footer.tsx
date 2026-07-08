import React from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <AppLogo size={28} />
          <span className="text-muted-foreground text-sm">
            © 2026 Adithyan Suresh Kumar
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          <a href="https://linkedin.com/in/adithyansk2002" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
          <a href="https://github.com/adithyansk-2002" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}