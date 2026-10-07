'use client';

import React from 'react';
import { getDepthFromProgress, getZoneFromDepth, getPressureAtmospheres, formatDepthMeters } from '@/lib/zones';
import { SoundToggle } from './SoundToggle';
import { Compass, BookOpen, Waves, ShieldAlert } from 'lucide-react';

interface HudProps {
  progress: number;
  soundOn: boolean;
  onToggleSound: () => void;
  onOpenStory: () => void;
  isTiltFallback?: boolean;
}

export function Hud({
  progress,
  soundOn,
  onToggleSound,
  onOpenStory,
  isTiltFallback = false,
}: HudProps) {
  const depth = getDepthFromProgress(progress);
  const zone = getZoneFromDepth(depth);
  const pressure = getPressureAtmospheres(depth);

  return (
    <aside
      className="fixed inset-0 pointer-events-none select-none z-[4] flex flex-col justify-between"
      style={{
        paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(0.75rem, env(safe-area-inset-left))',
        paddingRight: 'max(0.75rem, env(safe-area-inset-right))',
      }}
      aria-label="Ocean Depth Navigation Heads Up Display"
    >
      {/* Top Bar */}
      <header className="flex items-center justify-between gap-3 px-2 sm:px-4">
        {/* Left: Depth & Zone Gauge */}
        <div className="pointer-events-auto backdrop-blur-md bg-[rgba(3,14,36,0.85)] border border-[rgba(160,230,255,0.3)] rounded-2xl px-4 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4 text-sky-300 animate-[spin_12s_linear_infinite]" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span
                className="font-baloo text-xl sm:text-2xl font-bold tracking-tight text-[#ffd84d]"
                aria-live="off"
              >
                {formatDepthMeters(depth)}
              </span>
              <span className="text-xs font-semibold text-sky-200">METERS</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#a9cbe6]">
              <span className="font-medium text-sky-300">{zone.name}</span>
              <span className="opacity-40">•</span>
              <span>{pressure} atm</span>
            </div>
          </div>
        </div>

        {/* Right: Controls & Story Button */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Quick Story Mode CTA */}
          <button
            onClick={onOpenStory}
            data-story="hud-trigger"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full backdrop-blur-md bg-amber-500/20 border border-amber-400/50 text-amber-200 hover:bg-amber-500/30 hover:border-amber-400/80 transition-all text-xs font-semibold shadow-[0_0_15px_rgba(255,216,77,0.2)] active:scale-95 cursor-pointer"
            aria-label="Open voiced story mode"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">STORY (VOICED)</span>
            <span className="sm:hidden">STORY</span>
          </button>

          {/* Sound Toggle */}
          <SoundToggle soundOn={soundOn} onToggle={onToggleSound} />
        </div>
      </header>

      {/* Tilt Fallback Notification pill if active */}
      {isTiltFallback && (
        <div className="self-center pointer-events-none mb-4 animate-bounce">
          <div className="backdrop-blur-md bg-sky-950/80 border border-sky-400/50 rounded-full px-3.5 py-1 text-xs text-sky-200 flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>Torch steered by device tilt</span>
          </div>
        </div>
      )}

      {/* Bottom Sub-Info: Zone classification & Tectonic warning */}
      <footer className="flex items-end justify-between px-2 sm:px-4">
        <div className="backdrop-blur-md bg-[rgba(3,14,36,0.8)] border border-[rgba(160,230,255,0.22)] rounded-xl px-3 py-1.5 text-xs text-[#a9cbe6] max-w-xs hidden sm:block">
          <div className="flex items-center gap-2 text-sky-300 font-medium">
            <Waves className="w-3.5 h-3.5" />
            <span>{zone.classification}</span>
          </div>
          <p className="text-[11px] text-sky-100/70 truncate">{zone.description}</p>
        </div>

        {depth >= 10000 && (
          <div className="backdrop-blur-md bg-red-950/80 border border-red-500/50 rounded-xl px-3 py-1.5 text-xs text-red-200 flex items-center gap-2 animate-pulse shadow-[0_0_20px_rgba(255,74,61,0.4)]">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span className="font-semibold tracking-wide">HADAL CORE • POSEIDON CITADEL</span>
          </div>
        )}
      </footer>

      {/* Right Edge: Vertical Depth Ruler & Progress Bar */}
      <div
        className="absolute right-2 top-20 bottom-20 w-3 pointer-events-none flex flex-col items-center justify-between"
        aria-hidden="true"
      >
        {/* Track line */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-sky-900/60 rounded-full overflow-hidden">
          <div
            className="w-full bg-gradient-to-b from-sky-400 via-amber-400 to-red-500 transition-all duration-75"
            style={{ height: `${progress * 100}%` }}
          />
        </div>

        {/* Floating Glowing Gold Dot Indicator */}
        <div
          className="absolute w-3 h-3 -left-1 rounded-full bg-[#ffd84d] border-2 border-slate-900 shadow-[0_0_12px_#ffd84d] transition-all duration-75 transform -translate-y-1/2"
          style={{ top: `${Math.max(2, Math.min(98, progress * 100))}%` }}
        />

        {/* Small Depth Tick Labels */}
        <span className="text-[9px] font-mono text-sky-400/80 -rotate-90 origin-right translate-x-2">0m</span>
        <span className="text-[9px] font-mono text-sky-300/60 -rotate-90 origin-right translate-x-2">200m</span>
        <span className="text-[9px] font-mono text-indigo-300/60 -rotate-90 origin-right translate-x-2">1,000m</span>
        <span className="text-[9px] font-mono text-purple-300/60 -rotate-90 origin-right translate-x-2">4,000m</span>
        <span className="text-[9px] font-mono text-red-400/90 -rotate-90 origin-right translate-x-2">10,928m</span>
      </div>
    </aside>
  );
}
