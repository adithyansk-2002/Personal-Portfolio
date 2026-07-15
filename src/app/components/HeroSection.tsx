'use client';

import React, { useState, useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import AnimatedBackground from "./AnimatedBackground";

const roles = [
  'Cloud Engineer',
  'DevOps Engineer',
  'Linux Administrator',
  'AWS Enthusiast',
  'Infrastructure Automation Engineer',
  'Open Source Learner'];


export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (typingRef.current) clearTimeout(typingRef.current);
    if (pauseRef.current) clearTimeout(pauseRef.current);

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        typingRef.current = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 100);
      } else {
        pauseRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        typingRef.current = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
      if (pauseRef.current) clearTimeout(pauseRef.current);
    };
  }, [displayText, isDeleting, roleIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height
    });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      onMouseMove={handleMouseMove}
      aria-label="Hero section">
      <AnimatedBackground />

      <div
        className="absolute w-64 h-64 rounded-full pointer-events-none transition-transform duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)',
          left: `calc(50% + ${mousePos.x * 60}px)`,
          top: `calc(50% + ${mousePos.y * 60}px)`,
          transform: 'translate(-50%, -50%)',
          filter: 'blur(40px)'
        }}
        aria-hidden="true" />


      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
        <div className="space-y-8 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-mono font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Available for Opportunities
          </div>

          <div>
            <p className="text-muted-foreground text-lg font-medium mb-2">Hi, I&apos;m</p>
            <h1 className="hero-display text-foreground mb-3">
              Adithyan<br />
              <span className="text-gradient-primary">Suresh Kumar</span>
            </h1>
            <div className="flex items-center gap-2 h-10">
              <span className="text-accent text-xl font-mono font-semibold">
                {displayText}
              </span>
              <span
                className="inline-block w-0.5 h-7 bg-accent"
                style={{ animation: 'blink 1s step-end infinite' }}
                aria-hidden="true" />

            </div>
          </div>

          <p className="text-muted-foreground text-base leading-relaxed max-w-lg">
            Computer Science graduate and Cloud & DevOps Intern passionate about building{' '}
            <span className="text-foreground font-medium">secure, scalable and automated</span>{' '}
            cloud infrastructure using AWS, Linux, Docker, Terraform and Ansible. I enjoy solving
            infrastructure problems and documenting real-world implementations through technical articles.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="m8 21 4-4 4 4M12 17v4" />
              </svg>
              View Projects
            </a>
            <a
              href="/resume.pdf"
              download
              className="btn-outline px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2">

              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>
            <a href="#contact" className="px-6 py-3 rounded-xl font-semibold text-sm border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all duration-300 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Contact Me
            </a>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://linkedin.com/in/adithyansk2002"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-all duration-300"
              aria-label="LinkedIn">

              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://github.com/adithyansk-2002"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all duration-300"
              aria-label="GitHub">

              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a
              href="mailto:adithyansk2002@gmail.com"
              className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-all duration-300"
              aria-label="Email">

              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border border-cyan-400/20 glass-card shadow-[0_20px_50px_rgba(0,0,0,0.30)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(34,211,238,0.25)]">
              <div className="relative">
                {/* Background Glow */}
                <div className="absolute -inset-6 rounded-[2rem] bg-cyan-400/10 blur-[70px] z-0"></div>

                {/* Image Card */}
                <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-2xl overflow-hidden">
                  <AppImage
                    src="/images/me.jpeg"
                    alt="Adithyan Suresh Kumar"
                    fill
                    className="object-cover object-top scale-115 brightness-105 contrast-105 saturate-90 transition-all duration-700 hover:scale-120"
                    priority />
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-card rounded-xl px-4 py-3 border border-accent/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-mono text-muted-foreground">Cloud & DevOps Intern</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground mt-0.5">IPSR Solutions Ltd</p>
                </div>
              </div>
            </div>
            <div
              className="absolute -top-4 -right-4 glass-card rounded-xl px-3 py-2 border border-primary/30 animate-float"
              aria-hidden="true">

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2.5">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <span className="text-xs font-mono text-accent">5+ AWS Services</span>
              </div>
            </div>
            <div
              className="absolute -bottom-7 -left-4 glass-card rounded-xl px-3 py-2 border border-purple/30 animate-float-delayed"
              aria-hidden="true">

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-purple/20 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="m8 12 3 3 5-5" />
                  </svg>
                </div>
                <span className="text-xs font-mono text-purple-light">10+ Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
