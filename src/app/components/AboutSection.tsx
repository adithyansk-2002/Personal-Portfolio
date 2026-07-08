'use client';

import React, { useEffect, useRef, useState } from 'react';

const stats = [
  { label: 'AWS Services', value: 5, suffix: '+', color: '#22D3EE' },
  { label: 'Infrastructure Projects', value: 10, suffix: '+', color: '#2563EB' },
  { label: 'Technologies', value: 25, suffix: '+', color: '#7C3AED' },
  { label: 'Tech Articles', value: 8, suffix: '+', color: '#A78BFA' },
];

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ label, value, suffix, color, started }: { label: string; value: number; suffix: string; color: string; started: boolean }) {
  const count = useCountUp(value, 1500, started);
  return (
    <div className="glass-card rounded-2xl p-6 border border-border/50 hover:border-opacity-100 transition-all duration-500 group"
      style={{ '--hover-color': color } as React.CSSProperties}
    >
      <div className="text-4xl font-bold font-mono mb-2" style={{ color }}>
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
      <div className="mt-3 h-0.5 w-0 group-hover:w-full transition-all duration-700 rounded-full" style={{ background: color }} />
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-reveal relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <p className="section-label mb-4">01 / About</p>
              <h2 className="section-heading text-foreground mb-6">
                Building the{' '}
                <span className="text-gradient-cyan">Cloud</span><br />
                from the ground up
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I&apos;m <span className="text-foreground font-semibold">Adithyan Suresh Kumar</span>, a Computer Science Engineering graduate (B.Tech, 2025) from Amal Jyothi College of Engineering, Kottayam, Kerala.
              </p>
              <p>
                Currently working as a <span className="text-accent font-medium">Cloud & DevOps Intern at IPSR Solutions Ltd</span>, where I&apos;m gaining hands-on experience in cloud infrastructure, Linux administration, automation, containerization, and deployment workflows.
              </p>
              <p>
                I enjoy troubleshooting complex systems, automating infrastructure, and building reliable, secure, and scalable cloud solutions. I document my learning through technical articles and project walkthroughs, sharing practical implementation and lessons learned from real-world projects.
              </p>
              <p>
                I&apos;m currently seeking opportunities in <span className="text-primary font-medium">Cloud Engineering, DevOps, and Infrastructure Engineering</span>.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {['AWS', 'Linux', 'Ansible', 'Docker', 'Terraform', 'CI/CD', 'IaC'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono font-semibold border border-primary/30 bg-primary/10 text-primary hover:border-accent/50 hover:bg-accent/10 hover:text-accent transition-all duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Kottayam, Kerala, India
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 10a16 16 0 0 0 6 6l.27-.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 18h-.08z" />
                </svg>
                +91 88911 95211
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent shrink-0">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M20 21a8 8 0 0 0-16 0" />
                </svg>
                <span>B.Tech CSE · Amal Jyothi College of Engineering · 2025</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} started={started} />
              ))}
            </div>

            <div className="glass-card rounded-2xl p-6 border border-border/50 space-y-4">
              <p className="text-sm font-semibold text-foreground">Currently Working On</p>
              <div className="space-y-3">
                {[
                  { task: 'AWS High Availability PHP App', progress: 90, color: '#22D3EE' },
                  { task: 'Ansible WordPress Automation', progress: 85, color: '#2563EB' },
                  { task: 'HarvestHub Platform', progress: 95, color: '#7C3AED' },
                ].map((item) => (
                  <div key={item.task}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{item.task}</span>
                      <span className="font-mono" style={{ color: item.color }}>{item.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: started ? `${item.progress}%` : '0%',
                          background: item.color,
                          transitionDelay: '0.5s',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-border/50">
              <p className="text-sm font-semibold text-foreground mb-3">Languages</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { lang: 'English', level: 'Native/Bilingual' },
                  { lang: 'Malayalam', level: 'Native/Bilingual' },
                  { lang: 'Hindi', level: 'Full Professional' },
                ].map((l) => (
                  <div key={l.lang} className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/40">
                    <span className="text-xs font-semibold text-foreground">{l.lang}</span>
                    <span className="text-xs text-muted-foreground ml-2">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}