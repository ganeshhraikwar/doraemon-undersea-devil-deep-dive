'use client';

import React from 'react';
import { Panel } from '@/components/ui/Panel';
import { Button } from '@/components/ui/Button';
import { CastleSvg } from '@/components/CastleSvg';
import { MOVIE_FACTS } from '@/lib/facts';
import {
  ExternalLink,
  ArrowUp,
  Skull,
  Radio,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

export function FinaleSection() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="finale-section"
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 py-28 relative select-none"
      aria-label="The Castle of the Undersea Devil at 10,928m"
    >
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Sinister Citadel Warning Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-500/60 text-red-200 text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 shadow-[0_0_25px_rgba(255,74,61,0.4)] animate-pulse">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <span>Tectonic Alert: 10,928 Meters Depth</span>
        </div>

        {/* Castle of the Undersea Devil SVG (Citadel of Poseidon) */}
        <div className="w-full mb-8 relative flex items-center justify-center">
          <CastleSvg isMoving={true} />
        </div>

        {/* Glass Panel Narrative & Controls */}
        <Panel glow className="w-full max-w-2xl border-red-500/40 text-center">
          <h2 className="font-baloo text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            10,928 m. <span className="text-[#ff4a3d]">It is moving.</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#eaf6ff] leading-relaxed">
            At the lowest point on Earth, the ancient citadel of Poseidon has awakened. Aim your torch beam over the basalt spires to illuminate the fortress, uncover its barred gates, and witness its glowing sentinel sensors.
          </p>

          <p className="mt-2 text-xs sm:text-sm text-sky-200/80 italic">
            &ldquo;Poseidon: Automated protocol engaged. Prepare for extinction.&rdquo;
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Showtimes link to district.in */}
            <a
              href={MOVIE_FACTS.showtimesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#ffd84d] hover:bg-[#ffe37a] text-[#02050f] font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(255,216,77,0.45)] transition-all cursor-pointer active:scale-95"
            >
              <span>Find showtimes</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Back to surface smooth scroll */}
            <Button
              variant="ghost"
              size="lg"
              icon={<ArrowUp className="w-5 h-5 text-sky-300" />}
              onClick={scrollToTop}
            >
              Back to surface
            </Button>
          </div>
        </Panel>

        {/* Unofficial Fan Disclaimer Footer */}
        <footer className="mt-16 text-center max-w-xl text-[11px] text-[#a9cbe6]/70 leading-relaxed px-4">
          <p>
            Unofficial interactive fan tribute for <em>Doraemon: New Nobita and the Castle of the Undersea Devil</em> (2026).
            Created with pure code (Canvas 2D, procedural Web Audio, Web Speech, and SVG).
          </p>
          <p className="mt-2">
            Original characters and premise &copy; Fujiko F. Fujio, Shin-Ei Animation, and TV Asahi.
            No official posters, trailers, clips, real dialogue, or copyrighted artwork are hosted.
          </p>
        </footer>
      </div>
    </section>
  );
}
