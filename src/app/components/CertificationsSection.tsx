'use client';

import React from 'react';

const certifications = [
  {
    title: 'Python for Data Science',
    issuer: 'NPTEL',
    color: '#FF9900',
    category: 'Programming',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Cloud Infrastructure Foundations',
    issuer: 'Oracle Academy',
    color: '#F80000',
    category: 'Cloud',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
      </svg>
    ),
  },
  {
    title: 'Database Foundations',
    issuer: 'Oracle',
    color: '#F80000',
    category: 'Database',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    title: 'Java Foundations',
    issuer: 'Oracle',
    color: '#F80000',
    category: 'Programming',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="m8 21 4-4 4 4M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'Doing More with Google Sheets',
    issuer: 'Google Cloud',
    color: '#4285F4',
    category: 'Cloud',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: 'Deploying SAP on Google Cloud',
    issuer: 'Google Cloud',
    color: '#4285F4',
    category: 'Cloud',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: 'AWS Training Certificate',
    issuer: 'Amazon Web Services',
    color: '#FF9900',
    category: 'Cloud',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: 'NASA Space Apps Challenge',
    issuer: 'NASA / ISAC',
    color: '#0B3D91',
    category: 'Hackathon',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L8 8H2l5 4-2 7 7-4 7 4-2-7 5-4h-6L12 2z" />
      </svg>
    ),
  },
];

const workshops = [
  {
    title: 'LaTeX Typesetting Tool',
    org: 'ACM-AJCE Student Chapter',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: 'Oracle Cloud Infrastructure Foundations',
    org: 'Oracle Academy',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
      </svg>
    ),
  },
  {
    title: 'NASA International Space Apps Challenge',
    org: 'NASA / ISAC',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section-reveal relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-4">07 / Certifications</p>
          <h2 className="section-heading text-foreground">
            Credentials & <span className="text-gradient-primary">Recognition</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {certifications?.map((cert) => (
            <div
              key={cert?.title}
              className="cert-card rounded-2xl p-5 group cursor-default"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${cert?.color}20`, color: cert?.color }}
                >
                  {cert?.icon}
                </div>
                <span
                  className="px-2 py-0.5 rounded text-xs font-mono font-semibold"
                  style={{ color: cert?.color, background: `${cert?.color}15`, border: `1px solid ${cert?.color}30` }}
                >
                  {cert?.category}
                </span>
              </div>
              <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 group-hover:text-accent transition-colors">
                {cert?.title}
              </h3>
              <p className="text-xs text-muted-foreground font-medium">{cert?.issuer}</p>
              <div className="mt-3 h-0.5 w-0 group-hover:w-full transition-all duration-700 rounded-full" style={{ background: cert?.color }} />
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl border border-border/50 p-6">
          <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            Workshops & Seminars
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {workshops?.map((ws) => (
              <div
                key={ws?.title}
                className="rounded-xl bg-secondary/30 border border-border/30 p-4 hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-accent mb-3">
                  {ws?.icon}
                </div>
                <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{ws?.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{ws?.org}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}