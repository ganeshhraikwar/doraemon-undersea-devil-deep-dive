'use client';

import React from 'react';
import { Panel } from '@/components/ui/Panel';
import { RELEASES_LIST } from '@/lib/facts';
import { Globe, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

export function ReleasesSection() {
  return (
    <section
      id="releases-section"
      className="min-h-screen flex items-center justify-end px-4 sm:px-8 md:px-16 py-24 select-none"
      aria-label="Global Theatrical Releases"
    >
      <div className="w-full max-w-3xl">
        <Panel className="border-sky-400/30">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/40 text-xs font-semibold text-blue-200 mb-4">
            <Globe className="w-3.5 h-3.5 text-blue-300" />
            <span>Hadal Trench Approach: ~9,500m</span>
          </div>

          <h2 className="font-baloo text-3xl sm:text-4xl font-extrabold text-white">
            Global Theatrical Releases (2026)
          </h2>

          <p className="mt-2 text-sm text-[#a9cbe6]">
            Screening timeline across Asian and worldwide territories, with India highlighted.
          </p>

          {/* Releases Table with India Highlight */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-sky-400/25 bg-sky-950/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-sky-900/60 text-sky-200 font-baloo text-xs uppercase tracking-wider">
                  <tr>
                    <th scope="col" className="px-4 py-3">Territory</th>
                    <th scope="col" className="px-4 py-3">Release Date</th>
                    <th scope="col" className="px-4 py-3">Theatrical & Box Office Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-900/40">
                  {RELEASES_LIST.map((r) => (
                    <tr
                      key={r.country}
                      className={`transition-colors ${
                        r.isIndia
                          ? 'bg-amber-500/20 hover:bg-amber-500/25 border-l-4 border-l-[#ffd84d]'
                          : 'hover:bg-sky-900/20'
                      }`}
                    >
                      <td className="px-4 py-3 font-semibold text-white flex items-center gap-2">
                        {r.isIndia && <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />}
                        <span>{r.country}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono text-sky-200">
                        {r.date}
                      </td>
                      <td className="px-4 py-3 text-xs text-sky-100/90 leading-relaxed">
                        {r.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Verified Box Office Note */}
          <div className="mt-6 p-4 rounded-xl bg-sky-950/70 border border-sky-400/25 flex items-start gap-3 text-xs text-[#a9cbe6]">
            <AlertCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <p>
                <strong className="text-white">Japan Box Office Milestone: </strong>
                Opened #1 and stayed #1 for its first 6 consecutive weekends, grossing approximately{' '}
                <span className="text-amber-300 font-semibold">$25.5 million</span> in Japan.
              </p>
              <p className="mt-1 text-[11px] text-sky-200/70">
                India Box Office total:{' '}
                <span className="italic text-amber-200">not confirmed</span>.
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}
