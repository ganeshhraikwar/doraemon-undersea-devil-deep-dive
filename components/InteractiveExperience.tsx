'use client';

import React from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { usePointerTorch } from '@/hooks/usePointerTorch';
import { useOceanAudio } from '@/hooks/useOceanAudio';
import { useVibrate } from '@/hooks/useVibrate';
import { useExperience } from '@/store/experience';
import { OceanCanvas } from '@/components/OceanCanvas';
import { TorchOverlay } from '@/components/TorchOverlay';
import { Hud } from '@/components/Hud';
import { EntryGate } from '@/components/EntryGate';
import { QuakeEffect } from '@/components/QuakeEffect';
import { StoryMode } from '@/components/StoryMode';

export function InteractiveExperience() {
  const {
    entered,
    soundOn,
    storyOpen,
    quake,
    storyBeatIndex,
    setEntered,
    setSoundOn,
    toggleSound,
    setStoryOpen,
    openStoryAt,
  } = useExperience();

  const { progress, scrollY } = useScrollProgress();
  const torch = usePointerTorch();
  const { blip, initAudio } = useOceanAudio(soundOn, progress, quake);
  const { vibrate } = useVibrate();

  const handleEnter = (withSound: boolean) => {
    if (withSound) {
      setSoundOn(true);
      initAudio();
    } else {
      setSoundOn(false);
    }
    setEntered(true);
  };

  return (
    <>
      {/* 1. Canvas 2D background ocean simulation (z-0) */}
      <OceanCanvas
        progress={progress}
        scrollY={scrollY}
        torch={torch}
        onPopBubble={(pitch) => blip(pitch)}
        onVibrate={(ms) => vibrate(ms)}
      />

      {/* 2. Torch darkness overlay with pointer/tilt follower hole (z-1) */}
      <TorchOverlay progress={progress} torch={torch} />

      {/* 3. Realtime Heads Up Display (z-4) */}
      {entered && (
        <Hud
          progress={progress}
          soundOn={soundOn}
          onToggleSound={toggleSound}
          onOpenStory={() => openStoryAt(0)}
          isTiltFallback={torch.isTiltFallback}
        />
      )}

      {/* 4. Quake detector for Finale (z-3 red vignette) */}
      <QuakeEffect targetId="finale-section" />

      {/* 5. Voiced Story Mode dialog overlay (z-8) */}
      {storyOpen && (
        <StoryMode
          key={`story-${storyBeatIndex}`}
          isOpen={storyOpen}
          onClose={() => setStoryOpen(false)}
          initialBeatIndex={storyBeatIndex}
        />
      )}

      {/* 6. Initial Welcome Entry Gate (z-9) */}
      <EntryGate entered={entered} onEnter={handleEnter} />
    </>
  );
}
