export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface StopGradient {
  top: RGB;
  bottom: RGB;
}

// 5 stops from turquoise surface to trench black
export const GRADIENT_KEYFRAMES: { p: number; top: RGB; bottom: RGB }[] = [
  {
    p: 0.0,
    top: { r: 10, g: 154, b: 200 }, // bright turquoise cyan
    bottom: { r: 4, g: 65, b: 122 },
  },
  {
    p: 0.25,
    top: { r: 6, g: 68, b: 130 }, // twilight blue
    bottom: { r: 3, g: 34, b: 78 },
  },
  {
    p: 0.5,
    top: { r: 3, g: 30, b: 72 }, // midnight navy
    bottom: { r: 2, g: 18, b: 46 },
  },
  {
    p: 0.75,
    top: { r: 2, g: 16, b: 42 }, // abyssal dark indigo
    bottom: { r: 1, g: 9, b: 24 },
  },
  {
    p: 1.0,
    top: { r: 1, g: 8, b: 22 }, // trench near-black
    bottom: { r: 0, g: 3, b: 10 },
  },
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpRGB(c1: RGB, c2: RGB, t: number): RGB {
  return {
    r: Math.round(lerp(c1.r, c2.r, t)),
    g: Math.round(lerp(c1.g, c2.g, t)),
    b: Math.round(lerp(c1.b, c2.b, t)),
  };
}

export function getOceanGradient(progress: number): StopGradient {
  const p = Math.max(0, Math.min(1, progress));

  let lower = GRADIENT_KEYFRAMES[0];
  let upper = GRADIENT_KEYFRAMES[GRADIENT_KEYFRAMES.length - 1];

  for (let i = 0; i < GRADIENT_KEYFRAMES.length - 1; i++) {
    if (p >= GRADIENT_KEYFRAMES[i].p && p <= GRADIENT_KEYFRAMES[i + 1].p) {
      lower = GRADIENT_KEYFRAMES[i];
      upper = GRADIENT_KEYFRAMES[i + 1];
      break;
    }
  }

  const range = upper.p - lower.p;
  const factor = range === 0 ? 0 : (p - lower.p) / range;

  return {
    top: lerpRGB(lower.top, upper.top, factor),
    bottom: lerpRGB(lower.bottom, upper.bottom, factor),
  };
}

export function rgbToCss(c: RGB, alpha = 1): string {
  if (alpha === 1) {
    return `rgb(${c.r}, ${c.g}, ${c.b})`;
  }
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
}
