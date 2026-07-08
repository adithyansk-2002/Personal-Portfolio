'use client';

import React, { useRef, useEffect, useState } from 'react';

interface Skill {
  name: string;
  level: number;
  icon?: string;
}

interface SkillCategory {
  title: string;
  color: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Cloud (AWS)',
    color: '#FF9900',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
      </svg>
    ),
    skills: [
      { name: 'EC2', level: 85 }, { name: 'IAM', level: 80 }, { name: 'VPC', level: 78 },
      { name: 'S3', level: 82 }, { name: 'Route 53', level: 75 }, { name: 'ALB', level: 80 },
      { name: 'Auto Scaling', level: 72 }, { name: 'SES', level: 78 }, { name: 'CloudWatch', level: 70 },
    ],
  },
  {
    title: 'DevOps',
    color: '#22D3EE',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    skills: [
      { name: 'Docker', level: 82 }, { name: 'Jenkins', level: 68 }, { name: 'Terraform', level: 72 },
      { name: 'Ansible', level: 85 }, { name: 'Git', level: 88 }, { name: 'GitHub', level: 88 },
      { name: 'IaC', level: 80 }, { name: 'CI/CD', level: 75 },
    ],
  },
  {
    title: 'Linux',
    color: '#7C3AED',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="m8 21 4-4 4 4M12 17v4" />
      </svg>
    ),
    skills: [
      { name: 'RHEL', level: 85 }, { name: 'Amazon Linux 2023', level: 88 }, { name: 'Ubuntu', level: 80 },
      { name: 'Shell Scripting', level: 78 }, { name: 'Networking', level: 72 }, { name: 'LVM', level: 70 },
      { name: 'Apache', level: 82 }, { name: 'Nginx', level: 80 }, { name: 'MariaDB', level: 75 },
    ],
  },
  {
    title: 'Programming',
    color: '#2563EB',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: [
      { name: 'Python', level: 85 }, { name: 'JavaScript', level: 78 }, { name: 'React', level: 75 },
      { name: 'Flask', level: 72 }, { name: 'Java', level: 68 }, { name: 'SQL', level: 72 },
      { name: 'Solidity', level: 60 }, { name: 'PHP', level: 65 }, { name: 'HTML/CSS', level: 82 },
    ],
  },
  {
    title: 'Machine Learning',
    color: '#A78BFA',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3M6.343 6.343l-.707-.707M10.121 9.879a3 3 0 1 0 4.243 4.242" />
      </svg>
    ),
    skills: [
      { name: 'TensorFlow', level: 68 }, { name: 'Scikit-Learn', level: 72 }, { name: 'LSTM', level: 65 },
      { name: 'NumPy', level: 78 }, { name: 'Pandas', level: 75 }, { name: 'Matplotlib', level: 72 },
    ],
  },
  {
    title: 'Monitoring',
    color: '#34D399',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    skills: [
      { name: 'Prometheus', level: 65 }, { name: 'Grafana', level: 62 },
    ],
  },
];

function SkillBar({ skill, color, animate }: { skill: Skill; color: string; animate: boolean }) {
  return (
    <div className="group/skill">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-mono text-muted-foreground">{skill.name}</span>
        <span className="text-xs font-mono transition-opacity duration-300" style={{ color }}>{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-secondary/60 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animate ? `${skill.level}%` : '0%',
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: animate ? `0 0 6px ${color}60` : 'none',
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-reveal relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-4">02 / Skills</p>
          <h2 className="section-heading text-foreground">
            Technical <span className="text-gradient-primary">Arsenal</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Proficiency levels across cloud, DevOps, and engineering disciplines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillCategories.map((cat, catIdx) => (
            <div
              key={cat.title}
              className="glass-card rounded-2xl p-6 border border-border/50 skill-card-hover group"
              style={{ '--cat-color': cat.color } as React.CSSProperties}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${cat.color}20`, color: cat.color }}
                >
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-foreground">{cat.title}</h3>
                <span className="ml-auto text-xs font-mono text-muted-foreground">{cat.skills.length} skills</span>
              </div>
              <div className="space-y-3">
                {cat.skills.map((skill, skillIdx) => (
                  <div
                    key={skill.name}
                    style={{ transitionDelay: animate ? `${catIdx * 80 + skillIdx * 60}ms` : '0ms' }}
                  >
                    <SkillBar skill={skill} color={cat.color} animate={animate} />
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border/30">
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.slice(0, 4).map((s) => (
                    <span
                      key={s.name}
                      className="px-2 py-0.5 rounded text-xs font-mono border transition-colors duration-300"
                      style={{
                        borderColor: `${cat.color}30`,
                        color: cat.color,
                        background: `${cat.color}10`,
                      }}
                    >
                      {s.name}
                    </span>
                  ))}
                  {cat.skills.length > 4 && (
                    <span className="px-2 py-0.5 rounded text-xs font-mono text-muted-foreground border border-border/30">
                      +{cat.skills.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}