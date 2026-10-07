'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  soundOn: boolean;
  onToggle: () => void;
  className?: string;
}

export function SoundToggle({ soundOn, onToggle, className = '' }: SoundToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md transition-all duration-200 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-400 active:scale-95 ${
        soundOn
          ? 'bg-sky-950/80 border border-sky-400/50 text-sky-200 shadow-[0_0_15px_rgba(56,189,248,0.35)]'
          : 'bg-slate-900/80 border border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-500'
      } ${className}`}
      aria-label={soundOn ? 'Mute ocean ambient sound' : 'Unmute ocean ambient sound'}
      title={soundOn ? 'Sound is on (Click to mute)' : 'Sound is muted (Click to unmute)'}
    >
      {soundOn ? (
        <>
          <Volume2 className="w-4 h-4 text-sky-300 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-sky-100 hidden sm:inline">AUDIO ON</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-medium text-slate-300 hidden sm:inline">MUTED</span>
        </>
      )}
    </button>
  );
}
