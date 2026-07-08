'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  color: string;
  description: string;
  longDescription: string;
  tech: string[];
  github: string;
  demo?: string;
  period: string;
  challenges: string[];
  lessons: string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 'harvesthub',
    title: 'HarvestHub',
    subtitle: 'Full-Stack Crop Trading Platform',
    type: 'Major Project · Full-Stack + ML + Blockchain',
    color: '#22D3EE',
    period: 'August 2024 – April 2025',
    description: 'Engineered a full-stack crop trading platform enabling direct farmer-to-retailer bidding with LSTM-based crop price prediction and Ethereum smart contracts.',
    longDescription: 'HarvestHub is a comprehensive agricultural platform that connects farmers directly with retailers through a transparent bidding system. It integrates an LSTM model trained on 28 years of historical crop price data (1994–2022) to provide accurate price predictions, and uses Ethereum smart contracts to ensure tamper-resistant transaction records.',
    tech: ['React.js', 'Flask', 'LSTM', 'TensorFlow', 'Solidity', 'Ethereum', 'Firebase', 'Python'],
    github: 'https://github.com/adithyansk-2002',
    challenges: [
      'Training LSTM on 28 years of heterogeneous agricultural data',
      'Integrating Ethereum smart contracts with Flask backend',
      'Designing intuitive UX for non-technical farmers',
    ],
    lessons: [
      'Blockchain adds transparency but increases complexity — design accordingly',
      'LSTM preprocessing requires careful feature engineering for time-series data',
      'Real-world ML models need continuous retraining with fresh data',
    ],
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ae1933df-1781417520026.png",
    imageAlt: 'Green agricultural field with rows of crops, bright daylight, lush farmland, rural India landscape',
    featured: true
  },
  {
    id: 'aws-ha',
    title: 'AWS Highly Available PHP App',
    subtitle: 'Cloud Infrastructure Project',
    type: 'Internship Project · Cloud Infrastructure',
    color: '#FF9900',
    period: 'February 2026 – Present',
    description: 'Designed and deployed a highly available PHP web application on AWS using multiple EC2 instances behind an Application Load Balancer.',
    longDescription: 'A production-grade highly available PHP application deployed on AWS with multiple EC2 instances, an Application Load Balancer for traffic distribution, Apache web server, MariaDB database, and Amazon SES + PHPMailer for secure email delivery.',
    tech: ['AWS EC2', 'AWS ALB', 'Apache', 'MariaDB', 'PHP', 'Amazon SES', 'PHPMailer', 'VPC'],
    github: 'https://github.com/adithyansk-2002',
    challenges: [
      'Configuring ALB health checks for zero-downtime deployments',
      'Setting up SES SMTP authentication within PHP',
      'Managing database connections across multiple EC2 instances',
    ],
    lessons: [
      'Load balancer health checks are critical for seamless failover',
      'IAM roles are more secure than hardcoded credentials for AWS service access',
      'Security groups act as virtual firewalls — layer them carefully',
    ],
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1684f325c-1772376035798.png",
    imageAlt: 'Dark server room with glowing blue rack lights, cloud infrastructure, deep shadows, dramatic IT environment',
    featured: true
  },
  {
    id: 'wordpress-ansible',
    title: 'WordPress Automation',
    subtitle: 'Ansible IaC Deployment',
    type: 'Internship Project · Infrastructure Automation',
    color: '#7C3AED',
    period: 'February 2026 – Present',
    description: 'Automated full deployment of a production-ready WordPress environment on AWS using reusable Ansible playbooks.',
    longDescription: 'Automated the complete deployment lifecycle of WordPress environments on AWS using Ansible. Built version-controlled, reusable playbooks for provisioning Nginx, PHP, MariaDB, SSL certificates, and all supporting services.',
    tech: ['Ansible', 'AWS EC2', 'Nginx', 'MariaDB', 'PHP', 'SSL/TLS', 'YAML', 'IaC'],
    github: 'https://github.com/adithyansk-2002',
    challenges: [
      'Writing idempotent Ansible playbooks for consistent deployments',
      'Handling SSL certificate automation across environments',
      'Managing secrets securely in Ansible Vault',
    ],
    lessons: [
      'Idempotency is the cornerstone of reliable automation',
      'Modular playbook design dramatically improves reusability',
      'Always test playbooks in staging before production',
    ],
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd1d5a94-1772226968376.png",
    imageAlt: 'Abstract server network visualization with dark background, glowing purple and blue connection nodes, infrastructure diagram aesthetic',
    featured: false
  },
  {
    id: 'ihive',
    title: 'iHive',
    subtitle: 'Blockchain Idea Platform',
    type: 'Minor Project · Blockchain',
    color: '#F59E0B',
    period: 'February 2024 – June 2024',
    description: 'Blockchain-based secure idea submission platform using token-based validation for transparency and traceability.',
    longDescription: 'iHive leverages blockchain validation mechanisms to create a transparent, tamper-resistant platform for idea submission. Token-based validation ensures authenticity and traceability of all submitted ideas.',
    tech: ['Blockchain', 'Solidity', 'Token Validation', 'Web3', 'Smart Contracts'],
    github: 'https://github.com/adithyansk-2002',
    challenges: [
      'Designing gas-efficient smart contracts',
      'Implementing secure token validation logic',
    ],
    lessons: [
      'Smart contract security requires multiple audit layers',
      'Token economics must be carefully designed upfront',
    ],
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15b1ba3ed-1767879310858.png",
    imageAlt: 'Abstract blockchain network visualization with golden glowing nodes on dark background, cryptocurrency technology aesthetic',
    featured: false
  },
  {
    id: 'space-jumper',
    title: 'Space Jumper',
    subtitle: 'Interactive Browser Game',
    type: 'Personal Project · Browser Game',
    color: '#34D399',
    period: 'March 2025 – Present',
    description: 'Interactive 2D browser-based platform game with collision detection, jump physics, and level progression.',
    longDescription: 'Space Jumper is a fully interactive 2D browser platform game featuring multiple gameplay mechanics including collision detection, jump physics, progressive difficulty, and level progression built with vanilla JavaScript.',
    tech: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Game Physics', '2D Graphics'],
    github: 'https://github.com/adithyansk-2002',
    challenges: [
      'Implementing smooth physics simulation in JavaScript',
      'Collision detection optimization for performance',
    ],
    lessons: [
      'Game loops require careful timing management',
      'requestAnimationFrame is essential for smooth 60fps gameplay',
    ],
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d0198b2b-1772735884421.png",
    imageAlt: 'Deep space with stars and galaxies, dark cosmic background, astronaut floating in space, green nebula glow',
    featured: false
  }];


export default function ProjectsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpanded(prev => prev === id ? null : id);
  };

  return (
    <section id="projects" className="section-reveal relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-4">04 / Projects</p>
          <h2 className="section-heading text-foreground">
            What I&apos;ve <span className="text-gradient-primary">Built</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Click any project to expand the full case study with architecture, challenges, and lessons learned.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`glass-card rounded-2xl border overflow-hidden cursor-pointer project-card-expand group ${project.featured ? 'md:col-span-1' : ''
                }`}
              style={{ borderColor: expanded === project.id ? `${project.color}50` : 'rgba(255,255,255,0.06)' }}
              onClick={() => handleToggle(project.id)}
              role="button"
              aria-expanded={expanded === project.id}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleToggle(project.id)}
            >
              <div className="relative h-48 overflow-hidden">
                <AppImage
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span
                    className="px-2 py-1 rounded text-xs font-mono font-semibold"
                    style={{ color: project.color, background: `${project.color}20`, border: `1px solid ${project.color}40` }}
                  >
                    {project.type.split(' · ')[0]}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 rounded-lg bg-background/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-foreground text-xl">{project.title}</h3>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`text-muted-foreground transition-transform duration-300 shrink-0 ${expanded === project.id ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                <p className="text-sm font-medium mb-3" style={{ color: project.color }}>{project.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-xs font-mono bg-secondary/50 text-muted-foreground border border-border/30">{t}</span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-2 py-0.5 rounded text-xs font-mono text-muted-foreground border border-border/30">+{project.tech.length - 4}</span>
                  )}
                </div>

                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: expanded === project.id ? '1200px' : '0px',
                    opacity: expanded === project.id ? 1 : 0,
                  }}
                >
                  <div className="mt-6 pt-6 border-t border-border/30 space-y-5">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <span className="w-4 h-4 rounded flex items-center justify-center" style={{ background: `${project.color}20` }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={project.color} strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                        </span>
                        Full Case Study
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.longDescription}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <span className="w-4 h-4 rounded flex items-center justify-center" style={{ background: `${project.color}20` }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={project.color} strokeWidth="2.5"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>
                        </span>
                        Full Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs font-mono border"
                            style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}10` }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <span className="w-4 h-4 rounded flex items-center justify-center" style={{ background: `${project.color}20` }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={project.color} strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                        </span>
                        Challenges
                      </h4>
                      <ul className="space-y-1">
                        {project.challenges.map((c) => (
                          <li key={c} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="mt-1 shrink-0" style={{ color: project.color }}>→</span> {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <span className="w-4 h-4 rounded flex items-center justify-center" style={{ background: `${project.color}20` }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={project.color} strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                        </span>
                        Lessons Learned
                      </h4>
                      <ul className="space-y-1">
                        {project.lessons.map((l) => (
                          <li key={l} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="mt-1 shrink-0" style={{ color: project.color }}>+</span> {l}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold btn-outline"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                        View Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
