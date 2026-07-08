'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Please enter a valid email address.';
  if (!data.subject.trim() || data.subject.trim().length < 3) errors.subject = 'Subject must be at least 3 characters.';
  if (!data.message.trim() || data.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';
  return errors;
}

function FloatingInput({
  label,
  id,
  type = 'text',
  value,
  onChange,
  error,
  multiline,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const baseClass = `w-full bg-secondary/40 border rounded-xl px-4 text-foreground outline-none transition-all duration-300 text-sm font-medium placeholder-transparent ${error
      ? 'border-red-500/60 focus:border-red-500'
      : active
        ? 'border-accent/60 focus:border-accent' : 'border-border/50 hover:border-border/80'
    }`;

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          placeholder={label}
          className={`${baseClass} pt-6 pb-2 resize-none`}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={label}
          className={`${baseClass} h-14 pt-4`}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      <label
        htmlFor={id}
        className={`absolute left-4 font-medium pointer-events-none transition-all duration-200 ${active
            ? 'top-2 text-xs text-accent'
            : multiline
              ? 'top-4 text-sm text-muted-foreground'
              : 'top-1/2 -translate-y-1/2 text-sm text-muted-foreground'
          }`}
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-400 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

const contactLinks = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'adithyansk2002@gmail.com',
    href: 'mailto:adithyansk2002@gmail.com',
    color: '#22D3EE',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 10a16 16 0 0 0 6 6l.27-.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 18h-.08z" />
      </svg>
    ),
    label: 'Phone',
    value: '+91 88911 95211',
    href: 'tel:+918891195211',
    color: '#7C3AED',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    label: 'LinkedIn',
    value: 'linkedin.com/in/adithyansk2002',
    href: 'https://linkedin.com/in/adithyansk2002',
    color: '#2563EB',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    label: 'GitHub',
    value: 'github.com/adithyansk-2002',
    href: 'https://github.com/adithyansk-2002',
    color: '#A78BFA',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Location',
    value: 'Kottayam, Kerala, India',
    href: '#',
    color: '#34D399',
  },
];

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1800));
    setStatus('sent');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('adithyansk2002@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section-reveal relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-4">08 / Contact</p>
          <h2 className="section-heading text-foreground">
            Let&apos;s <span className="text-gradient-primary">Connect</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Open to Cloud Engineering, DevOps, and Infrastructure Engineering opportunities. Let&apos;s talk.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Availability badge */}
            <div className="glass-card rounded-2xl border border-accent/20 p-6 bg-accent/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-foreground">Available for Opportunities</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Currently seeking roles in Cloud Engineering and DevOps. Response time within 24 hours.
              </p>
            </div>

            {/* Contact links */}
            <div className="glass-card rounded-2xl border border-border/50 p-6 space-y-2">
              <h3 className="font-bold text-foreground mb-4">Contact Details</h3>
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/40 transition-all duration-300 group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${item.color}20`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                    <p className="text-sm text-foreground group-hover:text-accent transition-colors truncate">{item.value}</p>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="ml-auto shrink-0 text-muted-foreground/40 group-hover:text-accent transition-colors">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={copyEmail}
                className="w-full btn-outline px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy Email Address
                  </>
                )}
              </button>
              <a
                href="/resume.pdf"
                download
                className="w-full btn-primary px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl border border-border/50 p-8 h-full">
              <div className="mb-6">
                <h3 className="font-bold text-foreground text-xl mb-1">Send a Message</h3>
                <p className="text-sm text-muted-foreground">Fill out the form and I&apos;ll get back to you shortly.</p>
              </div>

              {status === 'sent' ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-foreground text-lg">Message Sent!</h4>
                  <p className="text-muted-foreground text-sm">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-outline px-6 py-2 rounded-xl text-sm font-semibold"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FloatingInput
                      label="Your Name"
                      id="name"
                      value={form.name}
                      onChange={(v) => setForm(f => ({ ...f, name: v }))}
                      error={errors.name}
                    />
                    <FloatingInput
                      label="Email Address"
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm(f => ({ ...f, email: v }))}
                      error={errors.email}
                    />
                  </div>
                  <FloatingInput
                    label="Subject"
                    id="subject"
                    value={form.subject}
                    onChange={(v) => setForm(f => ({ ...f, subject: v }))}
                    error={errors.subject}
                  />
                  <FloatingInput
                    label="Your Message"
                    id="message"
                    value={form.message}
                    onChange={(v) => setForm(f => ({ ...f, message: v }))}
                    error={errors.message}
                    multiline
                  />
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full btn-primary py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}