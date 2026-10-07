export interface OceanZone {
  readonly name: string;
  readonly classification: string;
  readonly minDepth: number;
  readonly maxDepth: number;
  readonly description: string;
  readonly lightLevel: string;
  readonly bioLife: string;
}

export const MAX_DEPTH_METERS = 10928; // Director's verified depth

export const OCEAN_ZONES: readonly OceanZone[] = [
  {
    name: 'Sunlight Zone',
    classification: 'Epipelagic',
    minDepth: 0,
    maxDepth: 200,
    description: 'Sun-dappled crystalline waters where photosynthesis thrives and playful schools of reef fish wander.',
    lightLevel: 'Full sunlight',
    bioLife: 'Vibrant reef fish, sea turtles, dolphins',
  },
  {
    name: 'Twilight Zone',
    classification: 'Mesopelagic',
    minDepth: 200,
    maxDepth: 1000,
    description: 'Faint blue twilight where daylight rapidly fades into silence. Sunken wrecks linger on quiet ridges.',
    lightLevel: 'Dim blue twilight',
    bioLife: 'Lanternfish, hatchetfish, giant squids',
  },
  {
    name: 'Midnight Zone',
    classification: 'Bathypelagic',
    minDepth: 1000,
    maxDepth: 4000,
    description: 'Perpetual inky blackness punctuated only by bioluminescent pulses and cold ocean currents.',
    lightLevel: 'Total darkness',
    bioLife: 'Anglerfish, bioluminescent jellyfish, gulper eels',
  },
  {
    name: 'Abyssal Zone',
    classification: 'Abyssopelagic',
    minDepth: 4000,
    maxDepth: 6000,
    description: 'Vast oceanic plains near freezing point, bearing crushing pressures and ancient sunken secrets.',
    lightLevel: 'Pitch black',
    bioLife: 'Deep-sea octopods, tripod fish, sea cucumbers',
  },
  {
    name: 'Hadal Zone',
    classification: 'Hadalpelagic (Trench)',
    minDepth: 6000,
    maxDepth: MAX_DEPTH_METERS,
    description: 'The deepest tectonic trenches on Earth. Home to the legendary Castle of the Undersea Devil.',
    lightLevel: 'Abyssal void (revealed by torch beam)',
    bioLife: 'Snailfish, amphipods, ancient robotic guardians',
  },
] as const;

export function getDepthFromProgress(progress: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  return Math.round(clamped * MAX_DEPTH_METERS);
}

export function getZoneFromDepth(depthMeters: number): OceanZone {
  const clamped = Math.max(0, Math.min(MAX_DEPTH_METERS, depthMeters));
  for (const zone of OCEAN_ZONES) {
    if (clamped >= zone.minDepth && clamped <= zone.maxDepth) {
      return zone;
    }
  }
  return OCEAN_ZONES[OCEAN_ZONES.length - 1];
}

export function getPressureAtmospheres(depthMeters: number): number {
  // Pressure: ~1 atm at surface, +1 atm per 10m depth (depth/10 + 1)
  return Math.round((depthMeters / 10 + 1) * 10) / 10;
}

export function formatDepthMeters(depthMeters: number): string {
  return new Intl.NumberFormat('en-IN').format(depthMeters);
}
