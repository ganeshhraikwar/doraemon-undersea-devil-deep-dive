'use client';

import { useState, useEffect, useRef } from 'react';

export interface TorchState {
  x: number;
  y: number;
  radius: number;
  isTiltFallback: boolean;
}

export function usePointerTorch(baseRadius = 210) {
  const [torch, setTorch] = useState<TorchState>({
    x: 500,
    y: 400,
    radius: baseRadius,
    isTiltFallback: false,
  });

  const stateRef = useRef<{
    currentX: number;
    currentY: number;
    targetX: number;
    targetY: number;
    lastPointerTime: number;
    tiltX: number;
    tiltY: number;
    hasTilt: boolean;
  }>({
    currentX: 500,
    currentY: 400,
    targetX: 500,
    targetY: 400,
    lastPointerTime: 0,
    tiltX: 500,
    tiltY: 400,
    hasTilt: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize center & time
    const w = window.innerWidth;
    const h = window.innerHeight;
    stateRef.current.currentX = w / 2;
    stateRef.current.currentY = h / 2;
    stateRef.current.targetX = w / 2;
    stateRef.current.targetY = h / 2;
    stateRef.current.tiltX = w / 2;
    stateRef.current.tiltY = h / 2;
    stateRef.current.lastPointerTime = Date.now();

    const onPointerMove = (e: PointerEvent | MouseEvent) => {
      stateRef.current.targetX = e.clientX;
      stateRef.current.targetY = e.clientY;
      stateRef.current.lastPointerTime = Date.now();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        stateRef.current.targetX = e.touches[0].clientX;
        stateRef.current.targetY = e.touches[0].clientY;
        stateRef.current.lastPointerTime = Date.now();
      }
    };

    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        stateRef.current.hasTilt = true;
        // gamma: [-90, 90] => X [0, width]
        // beta: [-45, 90] => Y [0, height]
        const clampedGamma = Math.max(-45, Math.min(45, e.gamma));
        const clampedBeta = Math.max(-10, Math.min(80, e.beta));

        const normX = (clampedGamma + 45) / 90;
        const normY = (clampedBeta + 10) / 90;

        stateRef.current.tiltX = normX * window.innerWidth;
        stateRef.current.tiltY = normY * window.innerHeight;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });

    let rafId: number;

    const loop = () => {
      const now = Date.now();
      const isTilt =
        stateRef.current.lastPointerTime > 0 &&
        now - stateRef.current.lastPointerTime > 2500 &&
        stateRef.current.hasTilt;

      const targetX = isTilt ? stateRef.current.tiltX : stateRef.current.targetX;
      const targetY = isTilt ? stateRef.current.tiltY : stateRef.current.targetY;

      // Lerp 0.16
      const nextX = stateRef.current.currentX + (targetX - stateRef.current.currentX) * 0.16;
      const nextY = stateRef.current.currentY + (targetY - stateRef.current.currentY) * 0.16;

      stateRef.current.currentX = nextX;
      stateRef.current.currentY = nextY;

      setTorch({
        x: Math.round(nextX * 10) / 10,
        y: Math.round(nextY * 10) / 10,
        radius: baseRadius,
        isTiltFallback: isTilt,
      });

      rafId = window.requestAnimationFrame(loop);
    };

    rafId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('deviceorientation', onDeviceOrientation);
    };
  }, [baseRadius]);

  return torch;
}
