'use client';

import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState<number>(0);
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId: number | null = null;

    const updateScroll = () => {
      const doc = document.documentElement;
      const totalScroll = doc.scrollHeight - window.innerHeight;
      const current = window.scrollY || window.pageYOffset || 0;
      setScrollY(current);

      if (totalScroll <= 0) {
        setProgress(0);
      } else {
        const p = Math.max(0, Math.min(1, current / totalScroll));
        setProgress(p);
      }
    };

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        updateScroll();
        rafId = null;
      });
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Initial calculation
    updateScroll();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return { progress, scrollY };
}
