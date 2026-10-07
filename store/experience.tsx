'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

export interface ExperienceContextType {
  entered: boolean;
  soundOn: boolean;
  storyOpen: boolean;
  quake: boolean;
  storyBeatIndex: number;
  setEntered: (entered: boolean) => void;
  setSoundOn: (soundOn: boolean | ((prev: boolean) => boolean)) => void;
  toggleSound: () => void;
  setStoryOpen: (open: boolean) => void;
  setQuake: (quake: boolean) => void;
  setStoryBeatIndex: (index: number) => void;
  openStoryAt: (index?: number) => void;
}

const ExperienceContext = createContext<ExperienceContextType | null>(null);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(false);
  const [storyOpen, setStoryOpen] = useState<boolean>(false);
  const [quake, setQuake] = useState<boolean>(false);
  const [storyBeatIndex, setStoryBeatIndex] = useState<number>(0);

  const toggleSound = useCallback(() => {
    setSoundOn((prev) => !prev);
  }, []);

  const openStoryAt = useCallback((index = 0) => {
    setStoryBeatIndex(index);
    setStoryOpen(true);
  }, []);

  const value = useMemo(
    () => ({
      entered,
      soundOn,
      storyOpen,
      quake,
      storyBeatIndex,
      setEntered,
      setSoundOn,
      toggleSound,
      setStoryOpen,
      setQuake,
      setStoryBeatIndex,
      openStoryAt,
    }),
    [entered, soundOn, storyOpen, quake, storyBeatIndex, toggleSound, openStoryAt]
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience(): ExperienceContextType {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error('useExperience must be used within an ExperienceProvider');
  }
  return ctx;
}
