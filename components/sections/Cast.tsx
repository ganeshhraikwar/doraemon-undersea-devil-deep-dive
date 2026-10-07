'use client';

import React from 'react';
import { Panel } from '@/components/ui/Panel';
import { CAST_LIST } from '@/lib/facts';
import { Users, Mic, Info } from 'lucide-react';

export function CastSection() {
  return (
    <section
      id="cast-section"
      className="min-h-screen flex items-center justify-end px-4 sm:px-8 md:px-16 py-24 select-none"
      aria-label="Voice Cast Details"
    >
      <div className="w-full max-w-3xl">
        <Panel className="border-sky-400/30">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/40 text-xs font-semibold text-indigo-200 mb-4">
            <Users className="w-3.5 h-3.5 text-indigo-300" />
            <span>Abyssal Zone: 4,000m - 6,000m</span>
          </div>

          <h2 className="font-baloo text-3xl sm:text-4xl font-extrabold text-white">
            Official Japanese Voice Cast
          </h2>

          <p className="mt-2 text-sm text-[#a9cbe6]">
            Bringing legendary voices to life in the 45th feature film remake.
          </p>

          {/* 2-Column Voice Cast Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[460px] overflow-y-auto pr-1">
            {CAST_LIST.map((c) => (
              <div
                key={c.character}
                className="p-3.5 rounded-xl bg-sky-950/50 border border-sky-400/20 hover:border-sky-400/40 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-baloo text-base font-bold text-[#ffd84d]">
                    {c.character}
                  </h3>
                  <span className="text-xs font-semibold text-sky-200 font-mono">
                    {c.japaneseActor}
                  </span>
                </div>
                <p className="mt-1 text-xs text-sky-100/75 leading-relaxed">
                  {c.roleDescription}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#a9cbe6]/80 border-t border-sky-900/40 pt-1.5">
                  <Mic className="w-3 h-3 text-sky-400" />
                  <span>Indian dub: </span>
                  <span className="italic text-amber-200/80">not confirmed</span>
                </div>
              </div>
            ))}
          </div>

          {/* Indian Dub Status Callout */}
          <div className="mt-6 p-3.5 rounded-xl bg-sky-950/70 border border-sky-400/30 flex items-start gap-2.5 text-xs text-[#a9cbe6]">
            <Info className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-sky-100">Indian Dub Cast Status: </span>
              While theatrical release across India is confirmed for 2 Oct 2026 in Hindi, Tamil, and Telugu, individual Indian dubbing voice artists remain{' '}
              <span className="text-amber-300 font-semibold underline decoration-dotted">
                not confirmed
              </span>{' '}
              by distributors.
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}
