'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  STORY_BEATS,
  STORY_SPEAKERS,
  STORY_CHAPTERS,
  STORY_DISCLAIMER,
} from '@/lib/story';
import { useSpeech } from '@/hooks/useSpeech';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Info,
  Sparkles,
} from 'lucide-react';

interface StoryModeProps {
  isOpen: boolean;
  onClose: () => void;
  initialBeatIndex?: number;
}

export function StoryMode({ isOpen, onClose, initialBeatIndex = 0 }: StoryModeProps) {
  const [currentBeatIndex, setCurrentBeatIndex] = useState<number>(initialBeatIndex);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const currentBeat = STORY_BEATS[currentBeatIndex] || STORY_BEATS[0];
  const speaker = STORY_SPEAKERS[currentBeat.speakerId] || STORY_SPEAKERS.narrator;

  const handleNext = useCallback(() => {
    setCurrentBeatIndex((prev) => {
      if (prev < STORY_BEATS.length - 1) {
        return prev + 1;
      }
      setIsPlaying(false);
      return prev;
    });
  }, []);

  const handleBack = useCallback(() => {
    setCurrentBeatIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleReplay = useCallback(() => {
    // Re-trigger current beat
    const cur = currentBeatIndex;
    setCurrentBeatIndex(-1);
    setTimeout(() => {
      setCurrentBeatIndex(cur);
      setIsPlaying(true);
    }, 50);
  }, [currentBeatIndex]);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Hook for Web Speech API and fallback timer
  const { isSpeaking, speechSupported } = useSpeech(
    isOpen ? currentBeat : null,
    {
      voiceEnabled,
      isPlaying,
      onBeatComplete: handleNext,
    }
  );

  // Keyboard navigation: Esc, Left, Right, Space
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleBack();
      } else if (e.key === ' ') {
        e.preventDefault();
        handleTogglePlay();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose, handleNext, handleBack, handleTogglePlay]);

  if (!isOpen) return null;

  const progressPercent = ((currentBeatIndex + 1) / STORY_BEATS.length) * 100;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Story Mode - Doraemon: Undersea Devil Retelling"
      ref={dialogRef}
      className="fixed inset-0 z-[8] flex items-center justify-center p-3 sm:p-6 backdrop-blur-xl bg-[#02050f]/85 select-none"
    >
      <div className="relative w-full max-w-2xl bg-[rgba(3,14,36,0.92)] border border-[rgba(160,230,255,0.35)] rounded-[26px] p-6 sm:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col justify-between max-h-[90vh] overflow-y-auto">
        {/* Top Header */}
        <header className="flex items-center justify-between pb-4 border-b border-sky-900/50">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
              Chapter {currentBeat.chapterIndex + 1} of {STORY_CHAPTERS.length}
            </span>
            <h3 className="font-baloo text-base sm:text-lg font-bold text-sky-100">
              {currentBeat.chapterTitle}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Voice toggle */}
            <button
              onClick={() => setVoiceEnabled((v) => !v)}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                voiceEnabled
                  ? 'border-sky-400/50 bg-sky-950/60 text-sky-200'
                  : 'border-slate-700 bg-slate-900/60 text-slate-400'
              }`}
              title={voiceEnabled ? 'Device Voice Enabled (Click to mute)' : 'Device Voice Muted'}
              aria-label={voiceEnabled ? 'Mute speech voices' : 'Enable speech voices'}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-sky-400/30 bg-sky-950/60 text-sky-200 hover:bg-sky-900/80 hover:text-white transition-all cursor-pointer"
              aria-label="Close Story Mode"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Gold Progress Bar */}
        <div className="w-full bg-sky-950 h-1.5 rounded-full overflow-hidden my-4">
          <div
            className="bg-gradient-to-r from-amber-400 to-[#ffd84d] h-full transition-all duration-300 rounded-full shadow-[0_0_8px_#ffd84d]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Main Content Stage */}
        <main className="py-4 sm:py-6 flex flex-col items-center text-center">
          {/* Speaker Badge & Pulsing Avatar */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-baloo text-lg font-bold border-2 transition-transform ${
                isSpeaking ? 'scale-110 shadow-lg' : 'scale-100'
              }`}
              style={{
                backgroundColor: speaker.badgeBg,
                borderColor: speaker.color,
                color: speaker.color,
                boxShadow: isSpeaking ? `0 0 20px ${speaker.color}66` : 'none',
              }}
            >
              {speaker.name.charAt(0)}
            </div>

            <div className="text-left">
              <h4 className="font-baloo text-lg sm:text-xl font-bold" style={{ color: speaker.color }}>
                {speaker.name}
              </h4>
              <p className="text-xs text-sky-200/70">{speaker.role}</p>
            </div>
          </div>

          {/* Dialogue Text */}
          <div className="min-h-[140px] flex items-center justify-center px-2 sm:px-6">
            <p
              className={`text-lg sm:text-2xl leading-relaxed text-[#eaf6ff] font-medium transition-opacity duration-200 ${
                currentBeat.speakerId === 'narrator' ? 'italic text-[#a9cbe6]' : ''
              } ${currentBeat.isPoseidon ? 'text-red-300 font-mono tracking-wide' : ''}`}
            >
              &ldquo;{currentBeat.text}&rdquo;
            </p>
          </div>

          {/* Indicator of reading/speech */}
          <div className="mt-4 flex items-center gap-2 text-xs text-sky-300/80">
            {isSpeaking && (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Speaking beat {currentBeatIndex + 1} of {STORY_BEATS.length}</span>
              </>
            )}
            {!isSpeaking && isPlaying && (
              <span className="text-slate-400">Paused or transitioning...</span>
            )}
          </div>
        </main>

        {/* Controls Bar */}
        <footer className="pt-4 border-t border-sky-900/50 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={handleBack}
              disabled={currentBeatIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-sky-400/30 text-sky-200 hover:bg-sky-950 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {/* Center Controls: Replay, Play/Pause */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleReplay}
                className="p-2.5 rounded-full border border-sky-400/30 text-sky-200 hover:bg-sky-950 transition-all cursor-pointer active:scale-95"
                title="Replay current beat"
                aria-label="Replay current beat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleTogglePlay}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#ffd84d] hover:bg-[#ffe37a] text-[#02050f] font-bold text-sm shadow-[0_0_20px_rgba(255,216,77,0.4)] transition-all cursor-pointer active:scale-95"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Play</span>
                  </>
                )}
              </button>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={currentBeatIndex === STORY_BEATS.length - 1}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-sky-400/30 text-sky-200 hover:bg-sky-950 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold cursor-pointer active:scale-95"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Keyboard shortcut hint */}
          <div className="flex items-center justify-center gap-4 text-[11px] text-sky-300/60 hidden sm:flex">
            <span>Esc: Close</span>
            <span>•</span>
            <span>← / →: Prev / Next</span>
            <span>•</span>
            <span>Space: Play / Pause</span>
          </div>

          {/* Mandatory Spoiler & Voice Disclaimer */}
          <div className="rounded-xl bg-sky-950/40 p-2.5 text-[11px] text-sky-200/60 flex items-start gap-2 text-left">
            <Info className="w-3.5 h-3.5 text-sky-300 shrink-0 mt-0.5" />
            <p>{STORY_DISCLAIMER}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
