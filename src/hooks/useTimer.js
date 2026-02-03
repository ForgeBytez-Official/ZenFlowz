import { useState, useEffect, useRef, useCallback } from 'react';

export const useTimer = (durationInSeconds, isRunning, onComplete) => {
    // durationInSeconds expected in seconds
    const [timeLeft, setTimeLeft] = useState(durationInSeconds);
    const [progress, setProgress] = useState(0);

    const endTimeRef = useRef(null);
    const requestRef = useRef(null);
    const tickRef = useRef(null);
    const progressRef = useRef(0);

    // Store latest onComplete to avoid resetting effect
    const onCompleteRef = useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    // Keep progress ref in sync for start/resume calculations
    useEffect(() => {
        progressRef.current = progress;
    }, [progress]);

    // The Tick Function: Updates State
    const tick = useCallback(() => {
        if (!endTimeRef.current) return;

        const now = Date.now();
        const remainingMs = Math.max(0, endTimeRef.current - now);
        const totalDurationMs = durationInSeconds * 1000;

        // Visual Updates
        const newTimeLeft = Math.ceil(remainingMs / 1000);
        const newProgress = totalDurationMs > 0
            ? Math.min(1, Math.max(0, 1 - (remainingMs / totalDurationMs)))
            : 1;

        setTimeLeft(newTimeLeft);
        setProgress(newProgress);

        // Completion Check
        if (remainingMs <= 0) {
            clearInterval(requestRef.current);
            if (onCompleteRef.current) onCompleteRef.current();
        }
    }, [durationInSeconds]);

    // Keep tickRef updated
    useEffect(() => {
        tickRef.current = tick;
    }, [tick]);

    // Main Control Loop: Switched to setInterval for background robustness
    useEffect(() => {
        if (isRunning) {
            const totalDurationMs = durationInSeconds * 1000;
            const currentProgress = progressRef.current;
            const remainingMs = (1 - currentProgress) * totalDurationMs;

            endTimeRef.current = Date.now() + remainingMs;

            // Use setInterval (100ms) to ensure it runs even in background tabs
            requestRef.current = setInterval(() => {
                if (tickRef.current) tickRef.current();
            }, 100);

            // Immediate tick
            if (tickRef.current) tickRef.current();
        } else {
            clearInterval(requestRef.current);
        }

        return () => clearInterval(requestRef.current);
    }, [isRunning, durationInSeconds]);

    const resetTimer = useCallback((newDurationInSeconds) => {
        setTimeLeft(newDurationInSeconds);
        setProgress(0);
        clearInterval(requestRef.current);
    }, []);

    return { timeLeft, progress, setTimeLeft, setProgress, resetTimer };
};
