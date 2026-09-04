'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  color: string;
  alpha: number;
  pulsingSpeed: number;
  pulseOffset: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let particles: Particle[] = [];

    // Particle color palettes based on Graphite & Copper theme
    const colors = [
      'rgba(184, 115, 51, ', // Copper primary
      'rgba(217, 119, 54, ', // Amber copper
      'rgba(245, 240, 232, ', // Cream accent
      'rgba(140, 88, 40, ', // Deep bronze
      'rgba(228, 155, 88, ', // Light copper
    ];

    const initParticles = () => {
      particles = [];
      // Calculate particle density based on screen area
      const count = Math.min(Math.floor((width * height) / 12000), 90);

      for (let i = 0; i < count; i++) {
        const baseRadius = Math.random() * 2 + 1;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          baseRadius,
          radius: baseRadius,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.3,
          pulsingSpeed: Math.random() * 0.02 + 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    let step = 0;

    const render = () => {
      step += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid lines
      const gridSize = 60;
      ctx.strokeStyle = 'rgba(184, 115, 51, 0.03)';
      ctx.lineWidth = 1;

      // Draw particles and update positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundary
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x > width) {
          p.x = width;
          p.vx *= -1;
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y > height) {
          p.y = height;
          p.vy *= -1;
        }

        // Mouse interaction: soft repel or attract
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 2.5;
          p.y -= (dy / dist) * force * 2.5;
        }

        // Subtle radius pulse
        p.radius = p.baseRadius + Math.sin(step * p.pulsingSpeed * 50 + p.pulseOffset) * 0.6;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Connect nearby particles with copper lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const p2dx = p.x - p2.x;
          const p2dy = p.y - p2.y;
          const p2dist = Math.sqrt(p2dx * p2dx + p2dy * p2dy);

          const maxDist = 130;
          if (p2dist < maxDist) {
            const lineAlpha = (1 - p2dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(184, 115, 51, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw mouse connection line if close
        if (dist < mouse.radius) {
          const mouseLineAlpha = (1 - dist / mouse.radius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(228, 155, 88, ${mouseLineAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-interactive-canvas"
      className="absolute inset-0 w-full h-full pointer-events-auto opacity-70 transition-opacity duration-1000"
      style={{ filter: 'blur(0px)' }}
    />
  );
}
