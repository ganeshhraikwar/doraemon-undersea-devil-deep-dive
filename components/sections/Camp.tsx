'use client';

import React, { useState } from 'react';
import { Panel } from '@/components/ui/Panel';
import { Chip } from '@/components/ui/Chip';
import { CAMP_GADGETS } from '@/lib/facts';
import { Tent, Sparkles, Navigation } from 'lucide-react';

export function CampSection() {
  const [selectedGadgetIndex, setSelectedGadgetIndex] = useState<number>(0);
  const activeGadget = CAMP_GADGETS[selectedGadgetIndex];

  return (
    <section
      id="camp-section"
      className="min-h-screen flex items-center justify-end px-4 sm:px-8 md:px-16 py-24 select-none"
      aria-label="Camp Under the Waves & Gadgets"
    >
      <div className="w-full max-w-2xl">
        <Panel className="border-sky-400/30">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/40 text-xs font-semibold text-teal-200 mb-4">
            <Tent className="w-3.5 h-3.5 text-teal-300" />
            <span>Twilight Zone: 200m - 1,000m</span>
          </div>

          <h2 className="font-baloo text-3xl sm:text-4xl font-extrabold text-white">
            Camp Under the Waves
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#a9cbe6] leading-relaxed">
            When summer plans stall in deadlock, Doraemon pulls out futuristic secrets from the 22nd century. With a single pulse of the Tekio Light, the deep ocean transforms from an inhospitable abyss into an endless playground.
          </p>

          {/* Interactive Chips for Gadgets */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {CAMP_GADGETS.map((g, idx) => (
              <Chip
                key={g.name}
                label={g.name}
                variant={idx === selectedGadgetIndex ? 'gold' : 'blue'}
                active={idx === selectedGadgetIndex}
                onClick={() => setSelectedGadgetIndex(idx)}
              />
            ))}
          </div>

          {/* Selected Gadget Spotlight Card */}
          <div className="mt-6 p-5 rounded-2xl bg-sky-950/60 border border-sky-400/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-baloo text-xl font-bold text-[#ffd84d]">
                {activeGadget.name}
              </h3>
              <span className="text-xs font-mono text-sky-300/80 bg-sky-900/40 px-2 py-0.5 rounded-md">
                {activeGadget.japaneseName}
              </span>
            </div>
            <p className="text-sm text-sky-100 leading-relaxed">
              {activeGadget.description}
            </p>
          </div>

          {/* Lore discovery callout */}
          <div className="mt-6 pt-4 border-t border-sky-900/50 flex items-center justify-between text-xs text-[#a9cbe6]">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-sky-300" />
              <span>Current Depth: ~840 m</span>
            </div>
            <span className="text-amber-300/90 font-medium">Spanish treasure ship spotted</span>
          </div>
        </Panel>
      </div>
    </section>
  );
}
