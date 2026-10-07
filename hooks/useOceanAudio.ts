'use client';

import { useRef, useCallback, useEffect } from 'react';

export function useOceanAudio(soundOn: boolean, depthProgress: number, quakeActive: boolean) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const rumbleGainRef = useRef<GainNode | null>(null);
  const initializedRef = useRef<boolean>(false);

  // Initialize Web Audio graph
  const initAudio = useCallback(() => {
    if (typeof window === 'undefined' || initializedRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(soundOn ? 0.8 : 0, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Brown noise generator
      const bufferDuration = 4;
      const bufferSize = ctx.sampleRate * bufferDuration;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.02 * white) / 1.02;
        output[i] = lastOut * 3.2;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // Lowpass filter: cutoff 900 Hz down to 110 Hz with depth
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(900 - depthProgress * 790, ctx.currentTime);
      lowpass.Q.setValueAtTime(2.5, ctx.currentTime);
      filterRef.current = lowpass;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, ctx.currentTime);

      noiseSource.connect(lowpass);
      lowpass.connect(noiseGain);
      noiseGain.connect(masterGain);
      noiseSource.start();

      // 2. 55 Hz Deep Sine Drone (sub bass abyss drone)
      const droneOsc = ctx.createOscillator();
      droneOsc.type = 'sine';
      droneOsc.frequency.setValueAtTime(55, ctx.currentTime);

      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.04 + depthProgress * 0.3, ctx.currentTime);
      droneGainRef.current = droneGain;

      droneOsc.connect(droneGain);
      droneGain.connect(masterGain);
      droneOsc.start();

      // 3. Quake Rumble Oscillator (38 Hz with wobble LFO)
      const rumbleOsc = ctx.createOscillator();
      rumbleOsc.type = 'sine';
      rumbleOsc.frequency.setValueAtTime(38, ctx.currentTime);

      // LFO for rumble wobble
      const rumbleLfo = ctx.createOscillator();
      rumbleLfo.type = 'sine';
      rumbleLfo.frequency.setValueAtTime(4.5, ctx.currentTime);

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(6, ctx.currentTime);
      rumbleLfo.connect(lfoGain);
      lfoGain.connect(rumbleOsc.frequency);

      const rumbleGain = ctx.createGain();
      rumbleGain.gain.setValueAtTime(quakeActive ? 0.35 : 0, ctx.currentTime);
      rumbleGainRef.current = rumbleGain;

      rumbleOsc.connect(rumbleGain);
      rumbleGain.connect(masterGain);
      rumbleOsc.start();
      rumbleLfo.start();

      initializedRef.current = true;
    } catch (e) {
      console.warn('AudioContext initialization error:', e);
    }
  }, [soundOn, depthProgress, quakeActive]);

  // Handle soundOn mute/unmute
  useEffect(() => {
    if (!audioCtxRef.current) {
      if (soundOn) {
        initAudio();
      }
      return;
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended' && soundOn) {
      ctx.resume().catch(() => {});
    }

    if (masterGainRef.current) {
      const targetGain = soundOn ? 0.8 : 0;
      masterGainRef.current.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.08);
    }
  }, [soundOn, initAudio]);

  // Handle depth changes on filter and drone
  useEffect(() => {
    if (!audioCtxRef.current || !filterRef.current || !droneGainRef.current) return;
    const ctx = audioCtxRef.current;
    const p = Math.max(0, Math.min(1, depthProgress));

    // cutoff from 900 Hz to 110 Hz
    const targetFreq = Math.max(110, 900 - p * 790);
    filterRef.current.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.1);

    // drone gain from 0.04 to 0.35
    droneGainRef.current.gain.setTargetAtTime(0.04 + p * 0.32, ctx.currentTime, 0.1);
  }, [depthProgress]);

  // Handle quake rumble gain
  useEffect(() => {
    if (!audioCtxRef.current || !rumbleGainRef.current) return;
    const ctx = audioCtxRef.current;
    const targetGain = quakeActive && soundOn ? 0.45 : 0;
    rumbleGainRef.current.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.05);
  }, [quakeActive, soundOn]);

  // Bubble pop / blip sound effect
  const blip = useCallback(
    (pitchHz = 880) => {
      if (!audioCtxRef.current || !masterGainRef.current || !soundOn) return;
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Sine wave chirp starting at pitchHz, sweeping up slightly then vanishing
        const now = ctx.currentTime;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitchHz, now);
        osc.frequency.exponentialRampToValueAtTime(pitchHz * 1.3, now + 0.08);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(masterGainRef.current);

        osc.start(now);
        osc.stop(now + 0.14);
      } catch {
        // Safe fail
      }
    },
    [soundOn]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
        initializedRef.current = false;
      }
    };
  }, []);

  return { initAudio, blip };
}
