'use client';

import { useEffect, useRef } from 'react';
import * as Tone from 'tone';

// Global audio data for shader
export const audioData = { frequency: 0, volume: 0 };

const AudioEngine = () => {
  const mouseSpeedRef = useRef(0);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(Date.now());
  const analyserRef = useRef<Tone.Analyser | null>(null);

  useEffect(() => {
    const initAudio = async () => {
      await Tone.start();

      // Create a low-pass filtered kick drum
      const kick = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 10,
        oscillator: { type: 'sine' },
        envelope: {
          attack: 0.001,
          decay: 0.4,
          sustain: 0.01,
          release: 1.4,
        },
      });

      const filter = new Tone.Filter(200, 'lowpass');
      const reverb = new Tone.Reverb({ decay: 0.5, wet: 0.2 });
      const analyser = new Tone.Analyser('fft', 32);

      kick.connect(filter);
      filter.connect(reverb);
      reverb.connect(analyser);
      analyser.toDestination();

      analyserRef.current = analyser;

      // Sequence for techno kick
      const seq = new Tone.Sequence((time, note) => {
        kick.triggerAttackRelease('C1', '8n', time);
      }, ['C1'], '4n');

      seq.start();

      Tone.Transport.start();

      // Update audio data for shader
      const updateAudioData = () => {
        if (analyserRef.current) {
          const values = analyserRef.current.getValue() as Float32Array;
          const frequency = values.reduce((sum, val) => sum + Math.abs(val), 0) / values.length;
          const volume = Tone.Destination.volume.value;

          audioData.frequency = frequency;
          audioData.volume = volume;
        }
        requestAnimationFrame(updateAudioData);
      };
      updateAudioData();
    };

    initAudio();

    // Mouse speed detection
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const deltaTime = now - lastTimeRef.current;
      const distance = Math.sqrt(
        Math.pow(e.clientX - lastMousePosRef.current.x, 2) +
        Math.pow(e.clientY - lastMousePosRef.current.y, 2)
      );
      const speed = distance / deltaTime;

      mouseSpeedRef.current = speed;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      lastTimeRef.current = now;

      // Adjust BPM based on mouse speed
      const bpm = Math.min(160, 80 + speed * 10);
      Tone.Transport.bpm.value = bpm;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      Tone.Transport.stop();
    };
  }, []);

  return null;
};

export default AudioEngine;