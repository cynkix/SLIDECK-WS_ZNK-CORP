import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface ZenikaExtrudedMonogramProps {
  size?: number;
  className?: string;
  glow?: boolean;
  interactive?: boolean;
}

export const ZenikaExtrudedMonogram: React.FC<ZenikaExtrudedMonogramProps> = ({
  size = 280,
  className = '',
  glow = true,
  interactive = true,
}) => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // 3D rotation based on mouse coordinates
  const rotateY = mousePos.x * 24;
  const rotateX = -mousePos.y * 20;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{
        width: size,
        height: size,
        perspective: 1000,
      }}
    >
      {/* Dynamic Ambient Glow Halo */}
      {glow && (
        <div
          className="absolute -inset-10 rounded-full pointer-events-none transition-opacity duration-700 blur-3xl opacity-75 dark:opacity-90"
          style={{
            background: 'radial-gradient(circle, rgba(230,0,57,0.38) 0%, rgba(139,92,246,0.18) 45%, transparent 72%)',
            transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
          }}
        />
      )}

      {/* 3D Perspective Card Container */}
      <motion.div
        animate={{
          rotateX,
          rotateY,
          scale: mousePos.x !== 0 || mousePos.y !== 0 ? 1.05 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 24,
        }}
        className="relative w-full h-full flex items-center justify-center transform-gpu"
      >
        {/* Render the Official Extruded SVG Monogram */}
        <img
          src={`${import.meta.env.BASE_URL}zenika-extruded-monogram.svg`}
          alt="Zenika Extruded Monogram Z"
          width={size}
          height={size}
          className="w-full h-full object-contain filter drop-shadow-[0_12px_32px_rgba(230,0,57,0.45)] transition-transform duration-300"
          style={{
            transform: 'translateZ(20px)',
          }}
          loading="eager"
        />

        {/* Luminous Specular Sheen Overlay on hover */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay opacity-0 hover:opacity-40 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${50 + mousePos.x * 60}% ${50 + mousePos.y * 60}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
          }}
        />
      </motion.div>
    </div>
  );
};
