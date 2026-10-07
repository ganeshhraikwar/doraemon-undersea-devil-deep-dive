'use client';

import React from 'react';
import { Panel } from '@/components/ui/Panel';
import { Button } from '@/components/ui/Button';
import { MOVIE_FACTS } from '@/lib/facts';
import { useExperience } from '@/store/experience';
import { BookOpen, ChevronDown, Sparkles, Anchor, Waves } from 'lucide-react';

interface HeroSectionProps {
  onOpenStory?: () => void;
}

export function HeroSection({ onOpenStory }: HeroSectionProps) {
  const { openStoryAt } = useExperience();

  const handleStory = () => {
    if (onOpenStory) {
      onOpenStory();
    } else {
      openStoryAt(0);
    }
  };
  const scrollToCamp = () => {
    const el = document.getElementById('camp-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-section"
      className="min-h-screen flex items-center justify-start px-4 sm:px-8 md:px-16 py-24 select-none"
      aria-label="Movie Introduction & Dive Start"
    >
      <div className="w-full max-w-2xl">
        <Panel glow className="border-sky-400/35">
          {/* Top meta tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/40 text-xs font-semibold text-sky-200">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              <span>{MOVIE_FACTS.franchisePosition}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-xs font-semibold text-amber-200">
              <Anchor className="w-3.5 h-3.5 text-amber-300" />
              <span>{MOVIE_FACTS.natureOfFilm}</span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-baloo text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Dive Deep into the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd84d] via-amber-200 to-sky-200">
              Undersea Realm
            </span>
          </h1>

          <h2 className="mt-2 text-lg sm:text-2xl font-baloo font-semibold text-sky-200">
            {MOVIE_FACTS.title}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#a9cbe6] leading-relaxed">
            {MOVIE_FACTS.synopsis}
          </p>

          {/* Director's depth note highlight */}
          <div className="mt-6 p-4 rounded-xl bg-sky-950/60 border border-sky-400/25 flex items-start gap-3">
            <Waves className="w-5 h-5 text-sky-300 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-sky-100 font-medium">
              <span className="text-amber-300 font-bold">Director&apos;s Note: </span>
              {MOVIE_FACTS.deepestPointFact}. Scroll down to plunge from sunlit waves to 10,928 meters.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button
              variant="gold"
              size="lg"
              icon={<BookOpen className="w-5 h-5" />}
              onClick={handleStory}
              data-story="hero-cta"
            >
              Watch the story (voiced)
            </Button>

            <Button
              variant="ghost"
              size="lg"
              icon={<ChevronDown className="w-5 h-5" />}
              onClick={scrollToCamp}
            >
              Begin Dive (0m to 10,928m)
            </Button>
          </div>
        </Panel>
      </div>
    </section>
  );
}
