import React, { useEffect, useRef } from 'react';

interface StoryboardCinematicCanvasProps {
  isDark?: boolean;
  step: 1 | 2 | 3;
}

export const StoryboardCinematicCanvas: React.FC<StoryboardCinematicCanvasProps> = ({
  isDark = true,
  step = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetStepRef = useRef<number>(step);
  const currentStepRef = useRef<number>(step);

  useEffect(() => {
    targetStepRef.current = step;
  }, [step]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.024;

      // Smooth step interpolation (ease towards targetStep)
      const target = targetStepRef.current;
      const current = currentStepRef.current;
      const diff = target - current;
      currentStepRef.current += diff * 0.08;

      const p = currentStepRef.current; // floating position 1.0 -> 2.0 -> 3.0

      // Weights for each stage using smooth gaussian-like curve
      const w1 = Math.max(0, 1 - Math.abs(p - 1));
      const w2 = Math.max(0, 1 - Math.abs(p - 2));
      const w3 = Math.max(0, 1 - Math.abs(p - 3));

      // Canvas background
      ctx.fillStyle = isDark ? '#05070B' : '#F8FAFC';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2 - 15;
      const minDim = Math.min(width, height);

      // =====================================================================
      // 1. STAGE 1: HARMONIC SPIROGRAPH & ORBITAL ARROWS
      // =====================================================================
      if (w1 > 0.005) {
        ctx.save();
        ctx.globalAlpha = w1;

        const baseRadius = minDim * 0.23;
        const lineCount = 80;

        ctx.translate(cx, cy);
        ctx.rotate(time * 0.15);

        for (let i = 0; i < lineCount; i++) {
          const theta = (i / lineCount) * Math.PI * 2;
          const r1 = baseRadius + Math.sin(theta * 3 + time * 1.5) * 38;
          const r2 = baseRadius * 0.46 + Math.cos(theta * 2 - time * 1.1) * 30;

          const x1 = Math.cos(theta) * r1;
          const y1 = Math.sin(theta) * r1;

          const nextTheta = theta + Math.PI * 0.64;
          const x2 = Math.cos(nextTheta) * r2;
          const y2 = Math.sin(nextTheta) * r2;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.bezierCurveTo(
            x1 * 0.5 + Math.sin(time + i) * 16,
            y1 * 0.5,
            x2 * 0.5,
            y2 * 0.5 + Math.cos(time + i) * 16,
            x2,
            y2
          );

          const progress = i / lineCount;
          ctx.strokeStyle = isDark
            ? `rgba(${255 - progress * 35}, ${200 - progress * 70}, ${180 + progress * 75}, ${0.35 + Math.sin(i + time) * 0.12})`
            : `rgba(${225 - progress * 40}, ${90}, ${120 + progress * 60}, ${0.4})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        ctx.restore();

        // 3 Large Orbital Flow Arrows circling around Stage 1
        const orbitR = baseRadius * 1.52;
        const arrowCount = 3;
        ctx.save();
        ctx.globalAlpha = w1 * 0.85;
        ctx.translate(cx, cy);
        ctx.rotate(time * 0.22); // Clockwise rotation (sens des aiguilles d'une montre)

        for (let a = 0; a < arrowCount; a++) {
          const angle = (a / arrowCount) * Math.PI * 2;
          const arcStart = angle;
          const arcEnd = angle + Math.PI * 0.44;

          ctx.beginPath();
          ctx.arc(0, 0, orbitR, arcStart, arcEnd);
          ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(15, 23, 42, 0.85)';
          ctx.lineWidth = 2.2;
          ctx.stroke();

          // Large crisp arrowhead
          const headX = Math.cos(arcEnd) * orbitR;
          const headY = Math.sin(arcEnd) * orbitR;
          const tangentAngle = arcEnd + Math.PI / 2;

          ctx.beginPath();
          ctx.moveTo(headX, headY);
          ctx.lineTo(
            headX - Math.cos(tangentAngle - 0.48) * 16,
            headY - Math.sin(tangentAngle - 0.48) * 16
          );
          ctx.lineTo(
            headX - Math.cos(tangentAngle + 0.48) * 16,
            headY - Math.sin(tangentAngle + 0.48) * 16
          );
          ctx.fillStyle = isDark ? '#FFFFFF' : '#0F172A';
          ctx.fill();
        }
        ctx.restore();
      }

      // =====================================================================
      // 2. STAGE 2: 3 OVERLAPPING VENN SPHERES (GUILLOCHE & TRICOLOR)
      // =====================================================================
      if (w2 > 0.005) {
        ctx.save();
        ctx.globalAlpha = w2;

        const d = minDim * 0.13;
        const sphereR = minDim * 0.17;

        const spheres = [
          {
            // Top: Recherche & Vision (Indigo/Blue)
            x: cx,
            y: cy - d,
            color: 'rgba(129, 140, 248, 0.95)',
            glow: 'rgba(99, 102, 241, 0.6)',
            fill: isDark ? 'rgba(99, 102, 241, 0.32)' : 'rgba(99, 102, 241, 0.18)',
          },
          {
            // Right: Excellence & Impact (Carmine Red #E60039)
            x: cx + d * 1.1,
            y: cy + d * 0.65,
            color: 'rgba(230, 0, 57, 0.95)',
            glow: 'rgba(230, 0, 57, 0.6)',
            fill: isDark ? 'rgba(230, 0, 57, 0.34)' : 'rgba(230, 0, 57, 0.2)',
          },
          {
            // Left: Craft & Outils (Warm Amber #F59E0B)
            x: cx - d * 1.1,
            y: cy + d * 0.65,
            color: 'rgba(245, 158, 11, 0.95)',
            glow: 'rgba(245, 158, 11, 0.6)',
            fill: isDark ? 'rgba(245, 158, 11, 0.32)' : 'rgba(245, 158, 11, 0.18)',
          },
        ];

        // Luminous overlapping fills
        spheres.forEach((s) => {
          ctx.beginPath();
          ctx.arc(s.x, s.y, sphereR, 0, Math.PI * 2);
          ctx.fillStyle = s.fill;
          ctx.fill();
        });

        // Fine guilloche concentric rings inside each lobe
        spheres.forEach((s, sIdx) => {
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(time * (sIdx % 2 === 0 ? 0.2 : -0.2));

          const rings = 32;
          for (let r = 1; r <= rings; r++) {
            const rad = (r / rings) * sphereR;
            ctx.beginPath();
            ctx.arc(0, 0, rad, 0, Math.PI * 2);
            ctx.strokeStyle = s.color;
            ctx.globalAlpha = 0.22 + (r / rings) * 0.42;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
          ctx.restore();
        });

        // 3 Orbital flow arrows surrounding the 3 Venn spheres
        const orbitR = sphereR * 2.25;
        const arrowCount = 3;
        ctx.save();
        ctx.globalAlpha = w2 * 0.85;
        ctx.translate(cx, cy);
        ctx.rotate(time * 0.2); // Clockwise rotation (sens des aiguilles d'une montre)

        for (let a = 0; a < arrowCount; a++) {
          const angle = (a / arrowCount) * Math.PI * 2;
          const arcStart = angle;
          const arcEnd = angle + Math.PI * 0.44;

          ctx.beginPath();
          ctx.arc(0, 0, orbitR, arcStart, arcEnd);
          ctx.strokeStyle = isDark ? '#FFFFFF' : '#0F172A';
          ctx.lineWidth = 2.2;
          ctx.stroke();

          const headX = Math.cos(arcEnd) * orbitR;
          const headY = Math.sin(arcEnd) * orbitR;
          const tangentAngle = arcEnd + Math.PI / 2;

          ctx.beginPath();
          ctx.moveTo(headX, headY);
          ctx.lineTo(
            headX - Math.cos(tangentAngle - 0.48) * 16,
            headY - Math.sin(tangentAngle - 0.48) * 16
          );
          ctx.lineTo(
            headX - Math.cos(tangentAngle + 0.48) * 16,
            headY - Math.sin(tangentAngle + 0.48) * 16
          );
          ctx.fillStyle = isDark ? '#FFFFFF' : '#0F172A';
          ctx.fill();
        }
        ctx.restore();

        ctx.restore();
      }

      // =====================================================================
      // 3. STAGE 3: 3D EXTRUDED PERSPECTIVE TUNNEL & DYNAMIC LIGHT CONE
      // =====================================================================
      if (w3 > 0.005) {
        ctx.save();
        ctx.globalAlpha = w3;

        // Vanishing point towards bottom-right (matching SVG extrusion vector)
        const vpX = cx + minDim * 0.28;
        const vpY = cy + minDim * 0.22;

        const ribbonSteps = 48;
        const zRadius = minDim * 0.28;

        // Dynamic perspective tunnel rings radiating outward
        for (let i = ribbonSteps; i >= 0; i--) {
          const t = i / ribbonSteps;
          const scale = 0.12 + t * 0.88;
          const curX = vpX + (cx - vpX) * t;
          const curY = vpY + (cy - vpY) * t;

          const redVal = 230;
          const greenVal = Math.floor(t * 15 + (1 - t) * 180);
          const blueVal = Math.floor(t * 57 + (1 - t) * 200);
          const alpha = (0.12 + t * 0.5) * w3;

          ctx.strokeStyle = `rgba(${redVal}, ${greenVal}, ${blueVal}, ${alpha})`;
          ctx.lineWidth = 0.8 + t * 1.6;

          // Extruded circular and polygon perspective contours
          ctx.beginPath();
          ctx.arc(curX, curY, zRadius * scale, 0, Math.PI * 2);
          ctx.stroke();

          // Connective perspective perspective rays
          if (i % 6 === 0) {
            ctx.beginPath();
            ctx.arc(vpX, vpY, (1 - t) * minDim * 0.45, 0, Math.PI * 2);
            ctx.strokeStyle = isDark ? 'rgba(230, 0, 57, 0.12)' : 'rgba(230, 0, 57, 0.08)';
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // 8 Radiating perspective projection beams from vanishing point to edges
        ctx.save();
        const beamCount = 12;
        ctx.lineWidth = 0.8;
        for (let b = 0; b < beamCount; b++) {
          const angle = (b / beamCount) * Math.PI * 2 + time * 0.08;
          const rayLen = minDim * 0.65;
          const bx = cx + Math.cos(angle) * rayLen;
          const by = cy + Math.sin(angle) * rayLen;

          const grad = ctx.createLinearGradient(vpX, vpY, bx, by);
          grad.addColorStop(0, 'rgba(230, 0, 57, 0.35)');
          grad.addColorStop(0.5, 'rgba(139, 92, 246, 0.15)');
          grad.addColorStop(1, 'transparent');

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(vpX, vpY);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
        ctx.restore();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};
