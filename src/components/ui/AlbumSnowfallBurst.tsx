'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  swayAmp: number;
  swayFreq: number;
  swayPhase: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  opacity: number;
  style: number;
  active: boolean;
}

/**
 * 3D Faceted Snowfall Particle Burst Effect for Photo Album Modal.
 * Features 3D perspective tumbling rotation, multi-faceted volumetric ice crystals,
 * and direct downward gravity speed (calm air / no wind conditions).
 */
export function AlbumSnowfallBurst() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Dense cloud burst of 95 3D snowflakes
    const TOTAL_FLAKES = 95;
    const particles: Particle[] = [];

    for (let i = 0; i < TOTAL_FLAKES; i++) {
      // Large 3D crystal size: Radius 13px to 26px (Diameter 26px to 52px)
      const radius = 13 + Math.random() * 13;
      particles.push({
        x: Math.random() * width,
        // Tightly grouped starting Y burst position (-10px to -150px)
        y: -10 - Math.random() * 150,
        radius,
        // Direct downward fall speed (no wind calm air: steady 2.4px to 4.6px/frame drop)
        speedY: 2.4 + Math.random() * 2.2,
        // Minimal to no horizontal drift (No wind condition)
        speedX: (Math.random() - 0.5) * 0.15,
        swayAmp: 0.1 + Math.random() * 0.25,
        swayFreq: 0.02 + Math.random() * 0.02,
        swayPhase: Math.random() * Math.PI * 2,
        // 3D rotation angles for pitch, yaw, and roll
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        rotSpeedX: (Math.random() - 0.5) * 0.03,
        rotSpeedY: (Math.random() - 0.5) * 0.035,
        rotSpeedZ: (Math.random() - 0.5) * 0.025,
        opacity: 0.85 + Math.random() * 0.15,
        style: Math.floor(Math.random() * 3),
        active: true,
      });
    }

    const draw3DSnowflake = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);

      // 3D Perspective tumbling transform
      const scaleX = Math.max(0.18, Math.abs(Math.cos(p.rotY)));
      const scaleY = Math.max(0.18, Math.abs(Math.cos(p.rotX)));

      ctx.rotate(p.rotZ);
      ctx.scale(scaleX, scaleY);
      ctx.globalAlpha = p.opacity;

      const r = p.radius;

      // 1. Soft 3D underside depth shadow
      ctx.save();
      ctx.translate(1.5, 2.5);
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.35)';
      ctx.lineWidth = Math.max(1.8, r / 6);
      ctx.lineCap = 'round';
      ctx.shadowBlur = 0;

      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -r);
        ctx.stroke();
        ctx.rotate((Math.PI * 2) / 6);
      }
      ctx.restore();

      // 2. Primary 3D Ice Glow & Faceted Crystal Render
      ctx.strokeStyle = '#ffffff';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(240, 249, 255, 0.98)';
      ctx.shadowBlur = 10;
      ctx.lineWidth = Math.max(1.6, r / 6.2);
      ctx.lineCap = 'round';

      if (p.style === 0) {
        // 3D Faceted Stellar Crystal
        for (let i = 0; i < 6; i++) {
          // Main stem
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -r);
          ctx.stroke();

          // 3D Facet inner light side highlight line
          ctx.save();
          ctx.strokeStyle = 'rgba(224, 242, 254, 0.85)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(1, 0);
          ctx.lineTo(1, -r * 0.9);
          ctx.stroke();
          ctx.restore();

          // Main branches
          const b1 = r * 0.45;
          const b1Size = r * 0.35;
          ctx.beginPath();
          ctx.moveTo(0, -b1);
          ctx.lineTo(-b1Size, -b1 - b1Size * 0.8);
          ctx.moveTo(0, -b1);
          ctx.lineTo(b1Size, -b1 - b1Size * 0.8);
          ctx.stroke();

          // Secondary tip branches
          const b2 = r * 0.75;
          const b2Size = r * 0.25;
          ctx.beginPath();
          ctx.moveTo(0, -b2);
          ctx.lineTo(-b2Size, -b2 - b2Size * 0.8);
          ctx.moveTo(0, -b2);
          ctx.lineTo(b2Size, -b2 - b2Size * 0.8);
          ctx.stroke();

          ctx.rotate((Math.PI * 2) / 6);
        }

        // 3D Prism Hexagon Core with gradient fill
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const hAngle = (i * Math.PI) / 3;
          const hx = Math.cos(hAngle) * (r * 0.24);
          const hy = Math.sin(hAngle) * (r * 0.24);
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = 'rgba(240, 249, 255, 0.4)';
        ctx.fill();
      } else if (p.style === 1) {
        // 3D Diamond Rhombus Prism
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -r);
          ctx.stroke();

          // 3D Diamond barb on arm
          const mid = r * 0.55;
          const dWidth = r * 0.26;
          ctx.beginPath();
          ctx.moveTo(0, -mid + dWidth);
          ctx.lineTo(-dWidth, -mid);
          ctx.lineTo(0, -mid - dWidth);
          ctx.lineTo(dWidth, -mid);
          ctx.closePath();
          ctx.stroke();

          // Shaded facet inside diamond barb
          ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.7)' : 'rgba(186, 230, 254, 0.5)';
          ctx.fill();

          // Tip dot
          ctx.beginPath();
          ctx.arc(0, -r, r * 0.1, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          ctx.rotate((Math.PI * 2) / 6);
        }

        // Center 3D Faceted Crystal Core
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      } else {
        // 3D Ice Prism Needle Flake
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -r);
          ctx.stroke();

          // 3 pairs of angled side needles
          [0.3, 0.55, 0.8].forEach((factor) => {
            const pos = r * factor;
            const nLen = r * (0.35 - factor * 0.15);
            ctx.beginPath();
            ctx.moveTo(0, -pos);
            ctx.lineTo(-nLen, -pos - nLen * 0.5);
            ctx.moveTo(0, -pos);
            ctx.lineTo(nLen, -pos - nLen * 0.5);
            ctx.stroke();
          });

          ctx.rotate((Math.PI * 2) / 6);
        }

        // Center 3D Star Overlay
        ctx.beginPath();
        for (let i = 0; i < 12; i++) {
          const a = (i * Math.PI) / 6;
          const rad = i % 2 === 0 ? r * 0.2 : r * 0.08;
          const sx = Math.cos(a) * rad;
          const sy = Math.sin(a) * rad;
          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      let activeCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p.active) continue;

        activeCount++;

        // Direct downward motion (no wind)
        p.y += p.speedY;
        p.swayPhase += p.swayFreq;
        p.x += p.speedX + Math.sin(p.swayPhase) * p.swayAmp;

        // Update 3D tumbling rotation
        p.rotX += p.rotSpeedX;
        p.rotY += p.rotSpeedY;
        p.rotZ += p.rotSpeedZ;

        draw3DSnowflake(p);

        // Deactivate flake once it moves past the bottom of the screen
        if (p.y - p.radius > height) {
          p.active = false;
        }
      }

      // Continue animation loop only while active flakes exist
      if (activeCount > 0) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[115] w-full h-full" />
  );
}
