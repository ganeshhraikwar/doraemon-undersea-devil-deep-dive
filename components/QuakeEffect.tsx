'use client';

import { useEffect, useRef } from 'react';
import { useExperience } from '@/store/experience';
import { useVibrate } from '@/hooks/useVibrate';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface QuakeEffectProps {
  targetId?: string;
}

export function QuakeEffect({ targetId = 'finale-section' }: QuakeEffectProps) {
  const { setQuake } = useExperience();
  const { vibrate } = useVibrate();
  const reducedMotion = useReducedMotion();
  const hasVibratedRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setQuake(true);
          if (!reducedMotion) {
            document.body.classList.add('quake');
          }
          if (!hasVibratedRef.current) {
            vibrate([200, 80, 200, 80, 500]);
            hasVibratedRef.current = true;
          }
        } else {
          setQuake(false);
          document.body.classList.remove('quake');
          hasVibratedRef.current = false;
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      document.body.classList.remove('quake');
      setQuake(false);
    };
  }, [targetId, setQuake, vibrate, reducedMotion]);

  return null;
}
