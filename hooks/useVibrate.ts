'use client';

import { useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useVibrate() {
  const reducedMotion = useReducedMotion();

  const vibrate = useCallback(
    (pattern: number | number[]) => {
      if (reducedMotion) return false;
      if (typeof window === 'undefined' || !('vibrate' in navigator)) return false;

      try {
        return navigator.vibrate(pattern);
      } catch {
        return false;
      }
    },
    [reducedMotion]
  );

  return { vibrate };
}
