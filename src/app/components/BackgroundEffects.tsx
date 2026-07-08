'use client';

import React, { useEffect, useRef } from 'react';

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const mouse = {
      x: -1000,
      y: -1000,
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    type Particle = { x: number; y: number; vx: number; vy: number; radius: number; baseRadius: number; alpha: number; baseAlpha: number; pulseGlow: number; };

    type Pulse = { id: number; from: number; to: number; progress: number; speed: number; visited: Set<number>; depth: number; };

    const particles: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,

        radius: Math.random() * 1.2 + 0.8,
        baseRadius: Math.random() * 1.2 + 0.8,

        alpha: Math.random() * 0.3 + 0.3,
        baseAlpha: Math.random() * 0.3 + 0.3,

        pulseGlow: 0,
      });
    }

    const activePulses: Pulse[] = [];

    let pulseId = 0;

    let animId: number;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const connections: { from: number; to: number }[] = [];
      const graph = new Map<number, number[]>();

      const glowRadius = 75;

      const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 70);

      glow.addColorStop(0, "rgba(255,255,255,0.10)");
      glow.addColorStop(0.15, "rgba(34,211,238,0.20)");
      glow.addColorStop(0.45, "rgba(34,211,238,0.08)");
      glow.addColorStop(1, "rgba(34,211,238,0)");

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulseGlow *= 0.93;
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const influenceRadius = 180;

        if (distance < 1) return;

        if (distance < influenceRadius) {
          const force = (influenceRadius - distance) / influenceRadius;
          // Gentle attraction
          p.x += (dx / distance) * force * 0.35;
          p.y += (dy / distance) * force * 0.35;

          // Smoothly brighten
          p.alpha += (0.95 - p.alpha) * 0.08;

          // Smoothly grow
          p.radius += (p.baseRadius * 1.2 - p.radius) * 0.08;
        } else {
          // Return to normal
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
          p.radius += (p.baseRadius - p.radius) * 0.05;
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + p.pulseGlow * 1.8, 0, Math.PI * 2);

        const finalAlpha = Math.min(1, p.alpha + p.pulseGlow * 0.8);
        ctx.fillStyle = `rgba(34,211,238,${finalAlpha})`;

        ctx.shadowBlur = 14 * p.pulseGlow;
        ctx.shadowColor = "#22D3EE";
        ctx.fill();

        ctx.shadowBlur = 0;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDistance = 120;

          if (distance < maxDistance) {

            connections.push({
              from: i,
              to: j,
            });

            // Build adjacency list
            if (!graph.has(i)) graph.set(i, []);
            if (!graph.has(j)) graph.set(j, []);

            graph.get(i)!.push(j);
            graph.get(j)!.push(i);

            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;

            const mouseDx = mouse.x - midX;
            const mouseDy = mouse.y - midY;

            const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

            const mouseRadius = 160;

            let mouseBoost = 1;

            if (mouseDistance < mouseRadius) {
              mouseBoost = 1 + ((mouseRadius - mouseDistance) / mouseRadius) * 1;
            }

            const opacity = (1 - distance / maxDistance) * Math.min(p1.alpha, p2.alpha) * 0.35 * mouseBoost;

            const finalOpacity = Math.min(opacity, 0.7);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            ctx.strokeStyle = `rgba(34,211,238,${finalOpacity})`;
            ctx.lineWidth = 1;

            ctx.stroke();
          }
        }
      }

      if (
        activePulses.length === 0 &&
        connections.length > 0 &&
        Math.random() < 0.004
      ) {
        const randomConnection =
          connections[Math.floor(Math.random() * connections.length)];

        activePulses.push({
          id: pulseId++,
          from: randomConnection.from,
          to: randomConnection.to,
          progress: 0,
          speed: 1 / (Math.sqrt(Math.pow(particles[randomConnection.from].x - particles[randomConnection.to].x, 2) + Math.pow(particles[randomConnection.from].y - particles[randomConnection.to].y, 2)) / 2),
          visited: new Set([
            randomConnection.from,
            randomConnection.to,
          ]),
          depth: 0,
        });
      }

      for (let i = activePulses.length - 1; i >= 0; i--) {

        const pulse = activePulses[i];

        pulse.progress += pulse.speed;

        const start = particles[pulse.from];
        const end = particles[pulse.to];

        // Position of pulse along line
        const px = start.x + (end.x - start.x) * pulse.progress;
        const py = start.y + (end.y - start.y) * pulse.progress;

        // Draw glowing section of cable
        const trailLength = 0.15;

        const backProgress = Math.max(0, pulse.progress - trailLength);

        const bx = start.x + (end.x - start.x) * backProgress;
        const by = start.y + (end.y - start.y) * backProgress;

        const segments = 8;

        for (let s = 0; s < segments; s++) {
          const startT = backProgress + ((pulse.progress - backProgress) * s) / segments;

          const endT = backProgress + ((pulse.progress - backProgress) * (s + 1)) / segments;

          const x1 = start.x + (end.x - start.x) * startT;
          const y1 = start.y + (end.y - start.y) * startT;
          const x2 = start.x + (end.x - start.x) * endT;
          const y2 = start.y + (end.y - start.y) * endT;

          // Bell-shaped brightness
          const t = s / (segments - 1);
          const intensity = Math.sin(t * Math.PI);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);

          ctx.lineWidth = 2;

          ctx.strokeStyle = `rgba(210,255,255,${0.12 + intensity * 0.9})`;
          ctx.shadowBlur = 15 * intensity;
          ctx.shadowColor = "#22D3EE";
          ctx.stroke();
        }

        ctx.shadowBlur = 0;

        if (pulse.progress >= 1) {
          end.pulseGlow = 1;

          if (pulse.depth >= 4) {
            activePulses.splice(i, 1);
            continue;
          }

          const neighbours = graph.get(pulse.to) ?? [];

          const available = neighbours.filter(
            n => !pulse.visited.has(n)
          );

          available.sort(() => Math.random() - 0.5);

          const selected = available.slice(
            0,
            Math.min(available.length, Math.random() < 0.7 ? 1 : 2)
          );

          for (const next of selected) {
            if (pulse.visited.has(next))
              continue;

            const nextVisited = new Set(pulse.visited);
            nextVisited.add(next);

            const dx = particles[pulse.to].x - particles[next].x;
            const dy = particles[pulse.to].y - particles[next].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            activePulses.push({
              id: pulseId++,

              from: pulse.to,
              to: next,

              progress: 0,

              speed: 2 / distance,

              visited: nextVisited,

              depth: pulse.depth + 1,
            });
          }
          activePulses.splice(i, 1);
        }
      }
      animId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-infrastructure opacity-100" style={{ animation: 'gridPulse 4s ease-in-out infinite' }} />
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 top-[-10%] left-[-5%]"
        style={{ background: '#2563EB', animation: 'orb1 12s ease-in-out infinite' }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 bottom-[10%] right-[-5%]"
        style={{ background: '#7C3AED', animation: 'orb2 15s ease-in-out infinite' }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-8 top-[50%] left-[50%]"
        style={{ background: '#0B7285', animation: 'orb3 10s ease-in-out infinite' }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-90"
        aria-hidden="true"
      />
    </div>
  );
}