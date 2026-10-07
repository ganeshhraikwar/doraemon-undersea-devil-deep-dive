'use client';

import React from 'react';
import { TorchState } from '@/hooks/usePointerTorch';

interface TorchOverlayProps {
  progress: number;
  torch: TorchState;
}

export function TorchOverlay({ progress, torch }: TorchOverlayProps) {
  // alpha = clamp((p - 0.16) * 1.35, 0, 0.95)
  const darknessAlpha = Math.max(0, Math.min(0.95, (progress - 0.16) * 1.35));

  // If near surface, don't obstruct daylight
  if (darknessAlpha <= 0.005) {
    return null;
  }

  const { x, y, radius } = torch;

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none transition-opacity duration-300"
      style={{
        zIndex: 1,
        background: `radial-gradient(circle ${radius}px at ${x}px ${y}px, rgba(2, 5, 15, 0) 0%, rgba(2, 5, 15, 0.05) 55%, rgba(2, 5, 15, ${
          darknessAlpha * 0.7
        }) 80%, rgba(2, 5, 15, ${darknessAlpha}) 100%)`,
      }}
      aria-hidden="true"
    >
      {/* Subtle beam edge warmth highlight */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle ${radius * 1.06}px at ${x}px ${y}px, rgba(255, 216, 77, ${
            0.08 * (darknessAlpha / 0.95)
          }) 0%, rgba(56, 189, 248, ${
            0.05 * (darknessAlpha / 0.95)
          }) 75%, transparent 100%)`,
        }}
      />
    </div>
  );
}
