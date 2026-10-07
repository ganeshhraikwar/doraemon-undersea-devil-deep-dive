'use client';

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import { STORY_SPEAKERS, StoryBeat } from '@/lib/story';
import { useVibrate } from './useVibrate';

interface UseSpeechOptions {
  onBeatComplete?: () => void;
  voiceEnabled: boolean;
  isPlaying: boolean;
}

function subscribeSpeech() {
  return () => {};
}

function getSpeechSnapshot() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function getSpeechServerSnapshot() {
  return false;
}

export function useSpeech(
  beat: StoryBeat | null,
  options: UseSpeechOptions
) {
  const { onBeatComplete, voiceEnabled, isPlaying } = options;
  const { vibrate } = useVibrate();
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const speechSupported = useSyncExternalStore(
    subscribeSpeech,
    getSpeechSnapshot,
    getSpeechServerSnapshot
  );

  const tokenRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopUtterance = useCallback(() => {
    tokenRef.current += 1;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    if (!beat || !isPlaying) {
      stopUtterance();
      return;
    }

    const currentToken = ++tokenRef.current;
    const speaker = STORY_SPEAKERS[beat.speakerId] || STORY_SPEAKERS.narrator;

    // If Poseidon line, trigger ominous vibration
    if (beat.isPoseidon) {
      vibrate([180, 70, 240, 70, 350]);
    }

    // Fallback timer duration: 1500ms + 55ms per character
    const fallbackDuration = 1500 + beat.text.length * 55;

    if (voiceEnabled && speechSupported && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(beat.text);
        utterance.lang = 'en-IN';
        utterance.pitch = speaker.pitch;
        utterance.rate = speaker.rate;

        // Try to select an en-IN voice if available, else standard English
        const voices = window.speechSynthesis.getVoices();
        const inVoice = voices.find((v) => v.lang === 'en-IN') || voices.find((v) => v.lang.startsWith('en'));
        if (inVoice) {
          utterance.voice = inVoice;
        }

        utterance.onstart = () => {
          if (tokenRef.current === currentToken) {
            setIsSpeaking(true);
          }
        };

        utterance.onend = () => {
          if (tokenRef.current === currentToken) {
            setIsSpeaking(false);
            if (onBeatComplete) {
              onBeatComplete();
            }
          }
        };

        utterance.onerror = () => {
          if (tokenRef.current === currentToken) {
            setIsSpeaking(false);
            // Fallback advance on error
            timerRef.current = setTimeout(() => {
              if (tokenRef.current === currentToken && onBeatComplete) {
                onBeatComplete();
              }
            }, 800);
          }
        };

        window.speechSynthesis.speak(utterance);

        // Safety watchdog timer in case speech synthesis stalls
        timerRef.current = setTimeout(() => {
          if (tokenRef.current === currentToken) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            if (onBeatComplete) onBeatComplete();
          }
        }, fallbackDuration + 3000);
      } catch {
        // Fallback to simulated reading timer
        setTimeout(() => {
          if (tokenRef.current === currentToken) {
            setIsSpeaking(true);
          }
        }, 0);
        timerRef.current = setTimeout(() => {
          if (tokenRef.current === currentToken) {
            setIsSpeaking(false);
            if (onBeatComplete) onBeatComplete();
          }
        }, fallbackDuration);
      }
    } else {
      // Voice is off or unsupported: run fallback timer
      setTimeout(() => {
        if (tokenRef.current === currentToken) {
          setIsSpeaking(true);
        }
      }, 0);
      timerRef.current = setTimeout(() => {
        if (tokenRef.current === currentToken) {
          setIsSpeaking(false);
          if (onBeatComplete) onBeatComplete();
        }
      }, fallbackDuration);
    }

    return () => {
      stopUtterance();
      setIsSpeaking(false);
    };
  }, [beat, isPlaying, voiceEnabled, speechSupported, onBeatComplete, vibrate, stopUtterance]);

  return { isSpeaking, speechSupported, stopAllSpeech: stopUtterance };
}
