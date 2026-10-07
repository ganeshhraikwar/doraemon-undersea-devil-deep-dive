'use client';

import React from 'react';
import { Panel } from '@/components/ui/Panel';
import { Shield, Landmark, AlertTriangle, HeartHandshake } from 'lucide-react';

export function ElMuSection() {
  return (
    <section
      id="el-mu-section"
      className="min-h-screen flex items-center justify-start px-4 sm:px-8 md:px-16 py-24 select-none"
      aria-label="The Mu Federation and El"
    >
      <div className="w-full max-w-2xl">
        <Panel className="border-sky-400/30">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-xs font-semibold text-cyan-200 mb-4">
            <Landmark className="w-3.5 h-3.5 text-cyan-300" />
            <span>Midnight Zone: 1,000m - 4,000m</span>
          </div>

          <h2 className="font-baloo text-3xl sm:text-4xl font-extrabold text-white">
            The Undersea Kingdom of Mu
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#a9cbe6] leading-relaxed">
            Beneath miles of dark ocean lies a civilization untouched by surface time: the Mu Federation. In their domed cities of pearlescent bioluminescence, Sea Dwellers have lived in harmony with the sea for millennia.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* El Profile */}
            <div className="p-4 rounded-xl bg-sky-950/60 border border-sky-400/25">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-400/50 flex items-center justify-center text-teal-300 font-baloo font-bold">
                  El
                </div>
                <div>
                  <h3 className="font-baloo text-base font-bold text-white">El (エル)</h3>
                  <p className="text-[11px] text-teal-300">Sea Dweller Knight</p>
                </div>
              </div>
              <p className="text-xs text-sky-100/90 leading-relaxed">
                A courageous undersea warrior sworn to defend his people. Because surface humans have waged destructive wars and polluted the waters, El initially regards Nobita&apos;s group with deep suspicion.
              </p>
            </div>

            {/* Mu Federation Principles */}
            <div className="p-4 rounded-xl bg-sky-950/60 border border-sky-400/25">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/50 flex items-center justify-center text-sky-300 font-baloo font-bold">
                  Mu
                </div>
                <div>
                  <h3 className="font-baloo text-base font-bold text-white">The Mu Federation</h3>
                  <p className="text-[11px] text-sky-300">Pacifist Undersea Society</p>
                </div>
              </div>
              <p className="text-xs text-sky-100/90 leading-relaxed">
                Guided by their Prime Minister, the Mu people maintain an oath of non-violence. Yet their ancient counterpart, the lost empire of Atlantis, left behind lethal automated warmachines now rumbling to life.
              </p>
            </div>
          </div>

          {/* Conflict Bridge Note */}
          <div className="mt-6 p-4 rounded-xl bg-amber-950/40 border border-amber-400/30 flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-amber-100">
              Only through empathy, sincerity, and shared bravery does the distrust between land and sea dissolve—uniting Nobita, Doraemon, and El as brothers-in-arms against extinction.
            </p>
          </div>
        </Panel>
      </div>
    </section>
  );
}
