'use client';

import React from 'react';
import { Panel } from '@/components/ui/Panel';
import { CREW_LIST, MOVIE_FACTS } from '@/lib/facts';
import { Clapperboard, Award, Clock } from 'lucide-react';

export function CrewSection() {
  return (
    <section
      id="crew-section"
      className="min-h-screen flex items-center justify-start px-4 sm:px-8 md:px-16 py-24 select-none"
      aria-label="Production Crew & Creative Credits"
    >
      <div className="w-full max-w-2xl">
        <Panel className="border-sky-400/30">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/40 text-xs font-semibold text-purple-200 mb-4">
            <Clapperboard className="w-3.5 h-3.5 text-purple-300" />
            <span>Abyssal Trench Shelf: ~7,200m</span>
          </div>

          <h2 className="font-baloo text-3xl sm:text-4xl font-extrabold text-white">
            Creative & Production Team
          </h2>

          <p className="mt-2 text-sm text-[#a9cbe6]">
            The visionary animators and composers revitalizing the 1983 undersea epic for modern theatrical screens.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-400/20 text-center">
              <span className="text-[11px] uppercase tracking-wider text-sky-300 font-semibold">Runtime</span>
              <p className="font-baloo text-base font-bold text-white mt-0.5">{MOVIE_FACTS.runtime}</p>
            </div>
            <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-400/20 text-center">
              <span className="text-[11px] uppercase tracking-wider text-sky-300 font-semibold">Format</span>
              <p className="font-baloo text-base font-bold text-white mt-0.5">2D / 4DX / MX4D</p>
            </div>
            <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-400/20 text-center col-span-2 sm:col-span-1">
              <span className="text-[11px] uppercase tracking-wider text-sky-300 font-semibold">Rating (India)</span>
              <p className="font-baloo text-base font-bold text-amber-300 mt-0.5">{MOVIE_FACTS.cbfcRatingIndia} (Universal)</p>
            </div>
          </div>

          {/* Production Crew Table */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-sky-400/25 bg-sky-950/40">
            <table className="w-full text-left text-sm">
              <thead className="bg-sky-900/50 text-sky-200 font-baloo text-xs uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-4 py-3">Production Role</th>
                  <th scope="col" className="px-4 py-3">Creative Lead</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-900/40">
                {CREW_LIST.map((c) => (
                  <tr key={c.role} className="hover:bg-sky-900/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-sky-200/90 whitespace-nowrap">
                      {c.role}
                    </td>
                    <td className="px-4 py-3 text-white font-semibold">
                      {c.name}
                      {c.details && (
                        <span className="block text-xs font-normal text-sky-300/80 mt-0.5">
                          {c.details}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </section>
  );
}
