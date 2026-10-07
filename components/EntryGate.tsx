'use client';

import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Compass } from 'lucide-react';

interface EntryGateProps {
  entered: boolean;
  onEnter: (withSound: boolean) => void;
}

export function EntryGate({ entered, onEnter }: EntryGateProps) {
  const gateRef = useRef<HTMLDivElement | null>(null);

  // Lock body scroll until entered
  useEffect(() => {
    if (!entered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [entered]);

  // Request iOS DeviceOrientation permission if required, then enter
  const handleEnterWithSound = async () => {
    if (
      typeof window !== 'undefined' &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> })
        .requestPermission === 'function'
    ) {
      try {
        await (
          DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }
        ).requestPermission();
      } catch {
        // Continue even if rejected
      }
    }
    onEnter(true);
  };

  const handleEnterSilent = () => {
    onEnter(false);
  };

  if (entered) return null;

  return (
    <div
      ref={gateRef}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome Gate - Doraemon: New Nobita and the Castle of the Undersea Devil"
      className="fixed inset-0 z-[9] flex items-center justify-center p-4 sm:p-6 select-none bg-gradient-to-b from-[#0a4b78] via-[#041c3e] to-[#02050f] transition-opacity duration-700"
    >
      {/* Ambient water reflection caustics */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400 via-transparent to-transparent" />

      {/* Center Gate Card */}
      <div className="relative max-w-xl w-full backdrop-blur-xl bg-[rgba(3,14,36,0.85)] border border-[rgba(160,230,255,0.35)] rounded-[26px] p-7 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-center flex flex-col items-center">
        {/* Cinema Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/15 border border-sky-400/40 text-sky-200 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-sky-300" />
          <span>Now playing in cinemas</span>
        </div>

        {/* Doraemon Stylized Logo Text (White with Blue Stroke) */}
        <h2
          className="font-baloo text-4xl sm:text-6xl font-extrabold tracking-wider text-white uppercase drop-shadow-[0_4px_16px_rgba(2,132,199,0.7)]"
          style={{
            WebkitTextStroke: '2.5px #0284c7',
            textShadow: '0 0 25px rgba(56, 189, 248, 0.6)',
          }}
        >
          Doraemon
        </h2>

        {/* Gold Movie Subtitle */}
        <h1 className="mt-2 font-baloo text-2xl sm:text-4xl font-extrabold text-[#ffd84d] leading-snug drop-shadow-[0_2px_12px_rgba(255,216,77,0.4)]">
          New Nobita <br className="hidden sm:inline" />
          and the Castle of the <br />
          Undersea Devil
        </h1>

        {/* 45th Feature Note */}
        <p className="mt-3 text-xs sm:text-sm font-medium text-sky-200/90 tracking-wide">
          45th 2D Feature Film • The Grand Deep Trench Dive
        </p>

        {/* Interactive Exploration Hint */}
        <div className="mt-6 px-4 py-3 rounded-2xl bg-sky-950/40 border border-sky-500/20 text-xs text-[#a9cbe6] leading-relaxed flex items-center gap-3 text-left">
          <Compass className="w-5 h-5 text-sky-300 shrink-0" />
          <span>
            Move your cursor or tilt your phone to steer the torch beam, and tap anywhere in the water to pop rising bubbles.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3.5 w-full justify-center">
          <button
            onClick={handleEnterWithSound}
            autoFocus
            className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#ffd84d] hover:bg-[#ffe37a] text-[#02050f] font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(255,216,77,0.45)] transition-all transform active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
          >
            <Volume2 className="w-5 h-5" />
            <span>Enter with sound</span>
          </button>

          <button
            onClick={handleEnterSilent}
            className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-transparent hover:bg-sky-500/10 border border-sky-300/40 hover:border-sky-300 text-sky-100 font-semibold text-sm sm:text-base transition-all transform active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-300"
          >
            <VolumeX className="w-5 h-5 text-sky-300" />
            <span>Enter silent</span>
          </button>
        </div>

        {/* Unofficial Disclaimer Tag */}
        <p className="mt-6 text-[11px] text-sky-300/60 leading-normal max-w-sm">
          Unofficial fan experience. Non-commercial tribute. Visuals generated programmatically via code.
        </p>
      </div>
    </div>
  );
}
