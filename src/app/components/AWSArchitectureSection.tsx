'use client';

import React, { useState } from 'react';

interface ServiceInfo {
  id: string;
  label: string;
  color: string;
  purpose: string;
  config: string;
  implementation: string;
  lesson: string;
  icon: React.ReactNode;
}

const services: ServiceInfo[] = [
  {
    id: 'internet',
    label: 'Internet',
    color: '#94A3B8',
    purpose: 'Public internet traffic entry point for all user requests.',
    config: 'Public DNS resolution via Route 53 hosted zones.',
    implementation: 'User browsers send HTTPS requests to the domain name resolved by Route 53.',
    lesson: 'Always enforce HTTPS at the edge — never allow plain HTTP in production.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: 'route53',
    label: 'Route 53',
    color: '#FF9900',
    purpose: 'AWS managed DNS service routing traffic to the ALB.',
    config: 'A-record alias pointing to Application Load Balancer DNS name.',
    implementation: 'Hosted zone configured with health-check-aware routing for failover.',
    lesson: 'Route 53 health checks enable automatic DNS-level failover with near-zero downtime.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
      </svg>
    ),
  },
  {
    id: 'alb',
    label: 'Load Balancer',
    color: '#22D3EE',
    purpose: 'Distributes incoming HTTP/HTTPS traffic across multiple EC2 instances.',
    config: 'Target group with health checks on port 80. Listeners on 443 with SSL termination.',
    implementation: 'Round-robin load balancing across EC2 instances in multiple AZs.',
    lesson: 'Health checks must match your application\'s actual health endpoint — not just TCP ping.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
        <line x1="5" y1="5" x2="19" y2="5" />
      </svg>
    ),
  },
  {
    id: 'ec2',
    label: 'EC2 Instances',
    color: '#2563EB',
    purpose: 'Amazon Linux 2023 instances running Apache + PHP application.',
    config: 't2.micro instances in private subnets. Security groups allow 80/443 from ALB only.',
    implementation: 'Apache configured as reverse proxy. PHP 8.x with all required extensions.',
    lesson: 'Never expose EC2 instances directly to the internet — always use ALB as the entry point.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="m8 21 4-4 4 4M12 17v4" />
      </svg>
    ),
  },
  {
    id: 'mariadb',
    label: 'MariaDB',
    color: '#7C3AED',
    purpose: 'Relational database for application data storage.',
    config: 'MariaDB 10.x on dedicated EC2. Security group allows MySQL port 3306 from app tier only.',
    implementation: 'Database tier isolated in private subnet. Regular automated backups configured.',
    lesson: 'Database should never be in the same security group as the web tier — defense in depth.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    id: 'ses',
    label: 'Amazon SES',
    color: '#34D399',
    purpose: 'Transactional email delivery for the PHP application.',
    config: 'SMTP credentials configured in PHPMailer. Domain verified with DKIM and SPF records.',
    implementation: 'PHPMailer connects to SES SMTP endpoint on port 587 with TLS encryption.',
    lesson: 'Always verify sending domain in SES and configure SPF/DKIM to avoid emails landing in spam.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

const flowSteps = [
  { from: 'internet', to: 'route53', label: 'DNS Query' },
  { from: 'route53', to: 'alb', label: 'Route Traffic' },
  { from: 'alb', to: 'ec2', label: 'Load Balance' },
  { from: 'ec2', to: 'mariadb', label: 'DB Query' },
  { from: 'ec2', to: 'ses', label: 'Send Email' },
];

export default function AWSArchitectureSection() {
  const [selectedService, setSelectedService] = useState<ServiceInfo | null>(null);

  const handleServiceClick = (service: ServiceInfo) => {
    setSelectedService(prev => prev?.id === service.id ? null : service);
  };

  return (
    <section id="architecture" className="section-reveal relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-4">05 / Architecture</p>
          <h2 className="section-heading text-foreground">
            AWS Infrastructure <span className="text-gradient-primary">Diagram</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Interactive architecture diagram. Click any service to explore its purpose, configuration, and implementation details.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Architecture Flow */}
          <div className="lg:col-span-2 glass-card rounded-2xl border border-border/50 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground">AWS Infrastructure — Live</span>
            </div>

            <div className="space-y-2">
              {services.map((service, idx) => (
                <React.Fragment key={service.id}>
                  <button
                    className="w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 text-left group"
                    style={{
                      borderColor: selectedService?.id === service.id ? service.color : 'rgba(255,255,255,0.06)',
                      background: selectedService?.id === service.id ? `${service.color}12` : 'rgba(255,255,255,0.02)',
                      boxShadow: selectedService?.id === service.id ? `0 0 16px ${service.color}30` : 'none',
                    }}
                    onClick={() => handleServiceClick(service)}
                    aria-label={`View details for ${service.label}`}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{
                        background: selectedService?.id === service.id ? `${service.color}25` : `${service.color}12`,
                        color: service.color,
                      }}
                    >
                      {service.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{service.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{service.purpose.split('.')[0]}</p>
                    </div>
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      className={`shrink-0 transition-all duration-300 ${selectedService?.id === service.id ? 'rotate-90' : ''}`}
                      style={{ color: selectedService?.id === service.id ? service.color : '#64748B' }}
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>

                  {idx < services.length - 1 && (
                    <div className="flex items-center gap-2 pl-5">
                      <div className="flex flex-col items-center">
                        <div className="w-px h-4 bg-gradient-to-b from-border/60 to-border/20" />
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse" />
                        <div className="w-px h-4 bg-gradient-to-b from-border/20 to-border/60" />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground/60">
                        {flowSteps[idx]?.label}
                      </span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-3">
            {selectedService ? (
              <div
                className="glass-card rounded-2xl border p-6 transition-all duration-300"
                style={{ borderColor: `${selectedService.color}40` }}
              >
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/30">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${selectedService.color}20`, color: selectedService.color }}
                  >
                    {selectedService.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-xl">{selectedService.label}</h3>
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded-full border mt-1 inline-block"
                      style={{ color: selectedService.color, borderColor: `${selectedService.color}40`, background: `${selectedService.color}10` }}
                    >
                      AWS Service
                    </span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: 'Purpose',
                      content: selectedService.purpose,
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Configuration',
                      content: selectedService.config,
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Implementation',
                      content: selectedService.implementation,
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Key Lesson',
                      content: selectedService.lesson,
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                      ),
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl p-4 border border-border/30"
                      style={{ background: `${selectedService.color}06` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span style={{ color: selectedService.color }}>{item.icon}</span>
                        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: selectedService.color }}>
                          {item.label}
                        </p>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">{item.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-2xl border border-border/50 p-10 text-center h-full flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">Explore the Architecture</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Select any service from the diagram to view its purpose, configuration, and implementation details.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleServiceClick(s)}
                      className="px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 hover:scale-105"
                      style={{
                        borderColor: `${s.color}40`,
                        color: s.color,
                        background: `${s.color}10`,
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}