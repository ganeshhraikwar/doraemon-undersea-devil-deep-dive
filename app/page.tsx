import React from 'react';
import { InteractiveExperience } from '@/components/InteractiveExperience';
import { HeroSection } from '@/components/sections/Hero';
import { CampSection } from '@/components/sections/Camp';
import { ElMuSection } from '@/components/sections/ElMu';
import { CastSection } from '@/components/sections/Cast';
import { CrewSection } from '@/components/sections/Crew';
import { ReleasesSection } from '@/components/sections/Releases';
import { FinaleSection } from '@/components/sections/Finale';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#02050f]">
      {/* Client-side immersive systems: Canvas 2D, Torch Beam, Audio & HUD */}
      <InteractiveExperience />

      {/* Main page content sections (z-2, shook by earthquake when active) */}
      <main className="quake-container relative z-[2] w-full max-w-7xl mx-auto flex flex-col justify-start">
        <HeroSection />
        <CampSection />
        <ElMuSection />
        <CastSection />
        <CrewSection />
        <ReleasesSection />
        <FinaleSection />
      </main>
    </div>
  );
}
