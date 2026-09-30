import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ZenikaGraphicDevice } from '../brand/ZenikaGraphicDevice';

export const ParallaxBackground: React.FC = () => {
  const { scrollY } = useScroll();

  // Smooth out scroll value with a balanced spring for subtle, organic deceleration
  const smoothY = useSpring(scrollY, {
    stiffness: 75,
    damping: 24,
    mass: 0.8,
    restDelta: 0.001
  });

  // Discrete multi-layer parallax offsets (gentle rates)
  const orb1Y = useTransform(smoothY, [0, 3000], [0, 240]);
  const orb1Rotate = useTransform(smoothY, [0, 3000], [0, 35]);

  const orb2Y = useTransform(smoothY, [0, 3000], [0, -180]);
  const orb2Scale = useTransform(smoothY, [0, 2000], [0.95, 1.15]);

  const orb3Y = useTransform(smoothY, [0, 4000], [0, 320]);

  const gridY = useTransform(smoothY, [0, 4000], [0, 90]);
  const floatingLinesY = useTransform(smoothY, [0, 3000], [0, -70]);

  // Zenika Graphic Device parallax layers (varying depths and rotation speeds)
  const emblem1Y = useTransform(smoothY, [0, 2500], [0, 340]);
  const emblem1Rotate = useTransform(smoothY, [0, 2500], [0, 50]);

  const emblem2Y = useTransform(smoothY, [0, 3500], [0, -260]);
  const emblem2Rotate = useTransform(smoothY, [0, 3500], [0, -35]);
  const emblem2Scale = useTransform(smoothY, [0, 2500], [0.94, 1.08]);

  const emblem3Y = useTransform(smoothY, [0, 4500], [0, 420]);
  const emblem3Rotate = useTransform(smoothY, [0, 4500], [0, 70]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dynamic Ambient Orb 1: Zenika Crimson Aura (Top Right) */}
      <motion.div
        style={{ y: orb1Y, rotate: orb1Rotate }}
        className="absolute -top-[12vw] -right-[10vw] w-[45vw] max-w-[700px] h-[45vw] max-h-[700px] rounded-full bg-gradient-to-br from-[#E60039]/12 via-[#E60039]/5 to-transparent dark:from-[#E60039]/16 dark:via-[#E60039]/6 dark:to-transparent blur-[90px] lg:blur-[130px]"
      />

      {/* Dynamic Ambient Orb 2: Deep Slate / Indigo Hue (Mid Left) */}
      <motion.div
        style={{ y: orb2Y, scale: orb2Scale }}
        className="absolute top-[35vh] -left-[12vw] w-[40vw] max-w-[650px] h-[40vw] max-h-[650px] rounded-full bg-gradient-to-tr from-slate-300/30 via-slate-400/10 to-transparent dark:from-indigo-950/25 dark:via-purple-950/15 dark:to-transparent blur-[80px] lg:blur-[120px]"
      />

      {/* Dynamic Ambient Orb 3: Warm Ruby Horizon (Lower Right) */}
      <motion.div
        style={{ y: orb3Y }}
        className="absolute top-[80vh] -right-[8vw] w-[36vw] max-w-[550px] h-[36vw] max-h-[550px] rounded-full bg-gradient-to-tl from-[#E60039]/8 via-rose-400/5 to-transparent dark:from-[#E60039]/12 dark:via-rose-950/10 dark:to-transparent blur-[80px] lg:blur-[110px]"
      />

      {/* ========================================================================= */}
      {/* ZENIKA BRAND GRAPHIC DEVICES: Organic Floating Parallax Emblems          */}
      {/* ========================================================================= */}

      {/* Graphic 1: Hero Right Drift (Crisp foreground depth with subtle ambient halo) */}
      <motion.div
        style={{ y: emblem1Y, rotate: emblem1Rotate }}
        className="absolute top-[10vh] right-[3vw] lg:right-[7vw] transition-opacity duration-300 pointer-events-none"
      >
        <div className="relative">
          {/* Subtle soft backlight glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#e52931]/20 to-[#ba115b]/10 blur-2xl scale-125 pointer-events-none" />
          <ZenikaGraphicDevice
            size={190}
            className="w-32 h-32 sm:w-44 sm:h-44 lg:w-52 lg:h-52 drop-shadow-xl"
            opacity={0.16}
          />
        </div>
      </motion.div>

      {/* Graphic 2: Mid-Left Architecture Watermark (Large subtle depth plane) */}
      <motion.div
        style={{ y: emblem2Y, rotate: emblem2Rotate, scale: emblem2Scale }}
        className="absolute top-[48vh] -left-[8vw] sm:-left-[5vw] lg:-left-[3vw] pointer-events-none"
      >
        <div className="relative">
          <ZenikaGraphicDevice
            size={380}
            className="w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
            opacity={0.07}
          />
        </div>
      </motion.div>

      {/* Graphic 3: Lower-Right Velocity Device (Clean mid-range drift) */}
      <motion.div
        style={{ y: emblem3Y, rotate: emblem3Rotate }}
        className="absolute top-[82vh] right-[4vw] lg:right-[9vw] pointer-events-none"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#ba115b]/15 blur-xl scale-110 pointer-events-none" />
          <ZenikaGraphicDevice
            size={160}
            className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44"
            opacity={0.13}
          />
        </div>
      </motion.div>

      {/* Subtle Drift Matrix: High-tech grid pattern moving at micro-speed */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.045]"
      >
        <div
          className="w-full h-[150%]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(120, 120, 140, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(120, 120, 140, 0.25) 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
      </motion.div>

      {/* Discreet Technical Accent Floating Lines */}
      <motion.div
        style={{ y: floatingLinesY }}
        className="absolute inset-0 opacity-20 dark:opacity-30"
      >
        <div className="absolute top-[28vh] left-[4%] w-[220px] h-[1px] bg-gradient-to-r from-transparent via-[#E60039]/40 to-transparent" />
        <div className="absolute top-[65vh] right-[6%] w-[280px] h-[1px] bg-gradient-to-r from-transparent via-slate-400/30 dark:via-white/20 to-transparent" />
      </motion.div>
    </div>
  );
};

