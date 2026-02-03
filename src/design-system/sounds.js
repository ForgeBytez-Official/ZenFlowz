import { useCallback } from 'react';

/* Sound system using the Web Audio API. Generates UI audio on the fly. */

const playOscillator = (type) => {
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // Helper for simple fading tones
    const playTone = (freq, vol, dur, wave = 'sine', delay = 0) => {
        const t = now + delay;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = wave;
        osc.frequency.setValueAtTime(freq, t);
        osc.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.setValueAtTime(vol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
        osc.start(t);
        osc.stop(t + dur);
    };

    if (type === 'click') {
        // Crisp high-pitch mechanical tick
        playTone(1200, 0.05, 0.05, 'triangle');
        playTone(600, 0.05, 0.05, 'sine');
    }
    else if (type === 'start') {
        // Upward ripple (Major Chord)
        playTone(440, 0.08, 0.8, 'sine', 0);    // A4
        playTone(554, 0.08, 0.8, 'sine', 0.05); // C#5
        playTone(659, 0.08, 0.8, 'sine', 0.1);  // E5
    }
    else if (type === 'finish') {
        // Deep Zen Bell (Additive Synthesis)
        // Fundamental + Harmonics for richness
        playTone(220, 0.3, 3.0, 'sine');      // A3 (Fundamental)
        playTone(440, 0.1, 2.5, 'sine');      // A4 (Octave)
        playTone(660, 0.05, 2.0, 'sine');     // E5 (Perfect 5th)
        playTone(880, 0.02, 1.5, 'sine');     // A5
    }
    else if (type === 'slide') {
        /* A rising whoosh used for transitions and mode switches. */
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(600, now + 0.2);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
    }

    // Cleanup context after sounds finish
    setTimeout(() => ctx.close(), 3500);
};


export const useSound = () => {

    const playClick = useCallback(() => {
        playOscillator('click');
    }, []);

    const playSlide = useCallback(() => {
        playOscillator('slide');
    }, []);

    const playStart = useCallback(() => {
        playOscillator('start');
    }, []);

    const playFinish = useCallback(() => {
        playOscillator('finish');
    }, []);

    return { playClick, playSlide, playStart, playFinish };
};
