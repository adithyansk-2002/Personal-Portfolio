'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

interface Rocket {
  id: number;
  x: number;
  delay: number;
}

export default function EasterEggs() {
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [awsToast, setAwsToast] = useState(false);
  const konamiRef = React.useRef(0);

  const launchRockets = useCallback(() => {
    const newRockets: Rocket[] = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 90 + 5,
      delay: Math.random() * 1.5,
    }));
    setRockets(newRockets);
    setTimeout(() => setRockets([]), 4000);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const expected = KONAMI[konamiRef.current];
      if (e.key === expected) {
        konamiRef.current += 1;
        setKonamiIndex(konamiRef.current);
        if (konamiRef.current === KONAMI.length) {
          launchRockets();
          konamiRef.current = 0;
          setKonamiIndex(0);
        }
      } else {
        konamiRef.current = 0;
        setKonamiIndex(0);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [launchRockets]);

  useEffect(() => {
    const handleAwsClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-aws-logo]')) {
        setAwsToast(true);
        setTimeout(() => setAwsToast(false), 3000);
      }
    };
    window.addEventListener('click', handleAwsClick);
    return () => window.removeEventListener('click', handleAwsClick);
  }, []);

  return (
    <>
      {rockets.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
          {rockets.map((rocket) => (
            <div
              key={rocket.id}
              className="absolute bottom-0 text-4xl"
              style={{
                left: `${rocket.x}%`,
                animation: `rocketLaunch 3s cubic-bezier(0.16, 1, 0.3, 1) ${rocket.delay}s forwards`,
              }}
            >
              *
            </div>
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center mx-auto">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5">
                <path d="M12 2L8 8H2l5 4-2 7 7-4 7 4-2-7 5-4h-6L12 2z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-foreground">Konami Code Activated!</p>
            <p className="text-muted-foreground text-sm font-mono">Launching to the cloud...</p>
          </div>
        </div>
      )}

      {awsToast && (
        <div
          className="fixed bottom-8 right-8 z-[100] glass-card border border-accent/40 rounded-2xl px-6 py-4 flex items-center gap-3"
          style={{ animation: 'fadeInUp 0.4s ease-out forwards' }}
          role="alert"
        >
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Cloud infrastructure online.</p>
            <p className="text-xs text-accent font-mono mt-0.5">All systems operational</p>
          </div>
        </div>
      )}

      {konamiIndex > 0 && konamiIndex < KONAMI.length && (
        <div className="fixed bottom-8 left-8 z-[100] glass-card border border-purple/40 rounded-xl px-4 py-2" aria-hidden="true">
          <p className="text-xs font-mono text-purple-light">
            Konami: {konamiIndex}/{KONAMI.length}
          </p>
        </div>
      )}
    </>
  );
}