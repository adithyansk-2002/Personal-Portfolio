'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  content: string;
}

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    '╔══════════════════════════════════════════════════╗',
    '║         AdithyanDev Terminal v1.0.0              ║',
    '╠══════════════════════════════════════════════════╣',
    '  help         Show available commands',
    '  about        About Adithyan',
    '  skills       List technical skills',
    '  projects     View projects',
    '  resume       Resume information',
    '  contact      Contact details',
    '  education    Education history',
    '  experience   Work experience',
    '  linkedin     LinkedIn profile',
    '  github       GitHub profile',
    '  aws          AWS skills & projects',
    '  docker       Docker experience',
    '  terraform    Terraform details',
    '  ansible      Ansible expertise',
    '  whoami       Current user info',
    '  sudo hire-me Special command',
    '  clear        Clear terminal',
    '  history      Command history',
    '╚══════════════════════════════════════════════════╝',
  ],
  about: () => [
    '┌─────────────────────────────────────────────────┐',
    '│  Adithyan Suresh Kumar                          │',
    '│  Cloud & DevOps Engineer                        │',
    '├─────────────────────────────────────────────────┤',
    '│  B.Tech CSE · Amal Jyothi College · 2025        │',
    '│  Cloud & DevOps Intern @ IPSR Solutions Ltd     │',
    '│  Location: Kottayam, Kerala, India              │',
    '│                                                 │',
    '│  Passionate about: AWS · Linux · Ansible        │',
    '│  Docker · Terraform · CI/CD · IaC               │',
    '└─────────────────────────────────────────────────┘',
  ],
  whoami: () => [
    'adithyan@cloud-engineer',
    'uid=1337(adithyan) gid=1337(devops)',
    'groups=aws,linux,docker,terraform,ansible,git',
    'shell=/bin/bash  home=/home/adithyan',
  ],
  skills: () => [
    'Cloud (AWS): EC2, IAM, VPC, S3, Route53, ALB, SES, CloudWatch',
    'DevOps:      Docker, Jenkins, Terraform, Ansible, Git, CI/CD',
    'Linux:       RHEL, Amazon Linux 2023, Ubuntu, Shell Scripting',
    'Programming: Python, JavaScript, React, Flask, Java, Solidity',
    'ML:          TensorFlow, Scikit-Learn, LSTM, NumPy, Pandas',
    'Monitoring:  Prometheus, Grafana',
  ],
  projects: () => [
    '1. HarvestHub           -> React + Flask + LSTM + Blockchain',
    '2. AWS HA PHP App       -> EC2 + ALB + Apache + MariaDB + SES',
    '3. WordPress Automation -> Ansible + Nginx + MariaDB + SSL',
    '4. iHive                -> Blockchain + Token Validation',
    '5. Space Jumper         -> JavaScript + HTML5 Canvas',
    '',
    'Run: project <name> for details',
  ],
  resume: () => [
    'Adithyan Suresh Kumar -- Cloud & DevOps Engineer',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'EXPERIENCE:',
    '  Cloud & DevOps Intern -- IPSR Solutions Ltd (Feb 2026-Present)',
    '  Python Intern         -- Verzeo (Jan-Feb 2022)',
    '',
    'EDUCATION:',
    '  B.Tech CSE -- Amal Jyothi College of Engineering (2021-2025)',
    '',
    'Download: adithyansk2002@gmail.com (request resume)',
  ],
  contact: () => [
    'Email:    adithyansk2002@gmail.com',
    'Phone:    +91 88911 95211',
    'LinkedIn: linkedin.com/in/adithyansk2002',
    'GitHub:   github.com/adithyansk-2002',
    'Location: Kottayam, Kerala, India',
  ],
  education: () => [
    "B.Tech CSE  -- Amal Jyothi College of Engineering (2021-2025)",
    "Higher Sec  -- St. Antony's Public School, Kottayam (2020-2021)",
    "Secondary   -- St. Paul's School, New Delhi (2007-2019)",
  ],
  experience: () => [
    '1. Cloud & DevOps Intern -- IPSR Solutions Ltd (Feb 2026-Present)',
    '   -> Ansible automation, AWS infrastructure, Linux administration',
    '',
    '2. Hackathon Team Lead -- MakerHub IEDC (Sep-Oct 2024)',
    '   -> Led 5-member team in 24-hour hackathon',
    '',
    '3. Python Intern -- Verzeo (Jan-Feb 2022)',
    '   -> ML models with Scikit-learn and Pandas',
  ],
  linkedin: () => [
    'Opening LinkedIn profile...',
    '-> https://linkedin.com/in/adithyansk2002',
    '',
    'Connect with me on LinkedIn!',
  ],
  github: () => [
    'Opening GitHub profile...',
    '-> https://github.com/adithyansk-2002',
    '',
    'Check out my repositories!',
  ],
  aws: () => [
    'AWS Services Experience:',
    '  EC2         -> Multiple instance types, AMIs, key pairs',
    '  IAM         -> Roles, policies, least-privilege access',
    '  VPC         -> Subnets, security groups, NACLs',
    '  S3          -> Buckets, policies, static hosting',
    '  Route 53    -> Hosted zones, A-records, health checks',
    '  ALB         -> Target groups, listeners, SSL termination',
    '  SES         -> SMTP, DKIM, SPF, PHPMailer integration',
    '  CloudWatch  -> Metrics, alarms, log groups',
  ],
  docker: () => [
    'Docker Experience:',
    '  [+] Container creation and management',
    '  [+] Dockerfile authoring and optimization',
    '  [+] Docker Compose for multi-service apps',
    '  [+] Installed on Amazon Linux 2023',
    '  [+] Used in CI/CD deployment workflows',
  ],
  terraform: () => [
    'Terraform Experience:',
    '  [+] Infrastructure as Code (IaC) principles',
    '  [+] AWS resource provisioning with HCL',
    '  [+] State management and workspaces',
    '  [+] Modules for reusable infrastructure',
  ],
  ansible: () => [
    'Ansible Expertise:',
    '  [+] Reusable multi-node playbooks',
    '  [+] WordPress automated deployment on AWS',
    '  [+] Apache, Nginx, PHP, MariaDB provisioning',
    '  [+] SSL certificate automation',
    '  [+] Idempotent task design',
    '  [+] Ansible Vault for secrets management',
  ],
};

const EASTER_EGG = [
  '',
  '╔══════════════════════════════════════════════╗',
  '║  sudo: Access Granted                        ║',
  '║                                              ║',
  '║  [####################] 100%                 ║',
  '║                                              ║',
  '║  Recruiter detected                          ║',
  '║  Loading resume...                           ║',
  '║  Hire successful!                            ║',
  '║                                              ║',
  '║  Contact: adithyansk2002@gmail.com           ║',
  '║  Phone:   +91 88911 95211                    ║',
  '╚══════════════════════════════════════════════╝',
  '',
];

export default function TerminalSection() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', content: 'AdithyanDev Terminal v1.0.0 -- Cloud & DevOps Engineer' },
    { type: 'system', content: 'Type "help" to see available commands.' },
    { type: 'system', content: '' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isInsideTerminal, setIsInsideTerminal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Prevent page scroll when cursor is inside terminal
  useEffect(() => {
    const terminalEl = terminalRef.current;
    if (!terminalEl) return;


    const preventScroll = (e: WheelEvent) => {
      if (isInsideTerminal) {
        e.stopPropagation();
      }
    };

    terminalEl.addEventListener('wheel', preventScroll, { passive: false });
    return () => terminalEl.removeEventListener('wheel', preventScroll);
  }, [isInsideTerminal]);

  useEffect(() => {
    if (!terminalRef.current) return;

    terminalRef.current.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [{ type: 'input', content: `adithyan@cloud:~$ ${cmd}` }];

    if (trimmed === '') {
      setLines(prev => [...prev, ...newLines]);
      return;
    }

    if (trimmed === 'clear') {
      setLines([{ type: 'system', content: 'Terminal cleared. Type "help" for commands.' }]);
      return;
    }

    if (trimmed === 'history') {
      const histLines = history.map((h, i) => ({ type: 'output' as const, content: `  ${i + 1}  ${h}` }));
      setLines(prev => [...prev, ...newLines, ...histLines]);
      return;
    }

    if (trimmed === 'sudo hire-me') {
      const easterLines = EASTER_EGG.map(l => ({ type: 'success' as const, content: l }));
      setLines(prev => [...prev, ...newLines, ...easterLines]);
      return;
    }

    const handler = COMMANDS[trimmed];
    if (handler) {
      const outputLines = handler().map(l => ({ type: 'output' as const, content: l }));
      setLines(prev => [...prev, ...newLines, ...outputLines, { type: 'output', content: '' }]);
    } else {
      setLines(prev => [
        ...prev,
        ...newLines,
        { type: 'error', content: `bash: ${trimmed}: command not found. Type "help" for available commands.` },
        { type: 'output', content: '' },
      ]);
    }
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(input);
      if (input.trim()) setHistory(prev => [input, ...prev]);
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? '' : history[newIndex] || '');
    }
  };

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'input': return 'text-accent';
      case 'error': return 'text-red-400';
      case 'success': return 'text-green-400';
      case 'system': return 'text-purple-light';
      default: return 'text-foreground/80';
    }
  };

  return (
    <section id="terminal" className="section-reveal relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-4">06 / Terminal</p>
          <h2 className="section-heading text-foreground">
            Interactive <span className="text-gradient-primary">Terminal</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            A real Linux-like terminal. Try commands like <code className="text-accent font-mono text-sm">about</code>, <code className="text-accent font-mono text-sm">skills</code>, <code className="text-accent font-mono text-sm">projects</code>, or <code className="text-accent font-mono text-sm">sudo hire-me</code>.
          </p>
        </div>

        <div
          className="glass-card rounded-2xl border border-border/50 overflow-hidden"
          onClick={() => inputRef.current?.focus()}
          onMouseEnter={() => setIsInsideTerminal(true)}
          onMouseLeave={() => setIsInsideTerminal(false)}
        >
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border/40 bg-secondary/20">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-3 text-xs font-mono text-muted-foreground">adithyan@cloud-devops: ~</span>
            <div className="ml-auto flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono text-green-400">connected</span>
            </div>
          </div>

          <div
            ref={terminalRef}
            className="p-6 h-80 overflow-y-auto font-mono text-sm space-y-0.5"
          >
            {lines.map((line, i) => (
              <div key={i} className={`${getLineColor(line.type)} leading-relaxed whitespace-pre-wrap break-all`}>
                {line.content}
              </div>
            ))}
            <div className="flex items-center gap-0">
              <span className="text-accent">adithyan@cloud:~$ </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-foreground outline-none font-mono text-sm caret-accent"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </div>
          </div>

          <div className="px-6 py-3 border-t border-border/30 bg-secondary/10 flex flex-wrap gap-2">
            {['help', 'about', 'skills', 'projects', 'aws', 'sudo hire-me'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => { setInput(cmd); inputRef.current?.focus(); }}
                className="px-3 py-1 rounded text-xs font-mono border border-border/40 text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}