import React, { memo } from 'react';
import TickRing from './TickRing';

/**
 * TimerFace Visualization
 * 
 * This component is the visual heart of the Pomodoro engine.
 * It separates the high-frame-rate animation (the progress ring) from the static elements (the ticks).
 * 
 * Performance Note:
 * The primary circle updates 60 times per second via the `progress` prop.
 * The `TickRing` is memoized and only updates when a full minute passes.
 * This architecture ensures buttery smooth 60 FPS performance even on low-power mobile GPUs.
 */
const TimerFace = memo(function TimerFace({
    progress,       // 0 to 1 float, drives the stroke animation
    timeLeft,       // Integer seconds remaining
    totalTime,      // Total duration in seconds
    activeMode,     // 'ZONE', 'BREATH', or 'DRIFT'
    color,          // Dynamic RGB value from theme
    durations       // Map of durations for tick count calculation
}) {
    // 1. SVG Geometry Setup
    const radius = 180;
    const circumference = 2 * Math.PI * radius;

    // Invert progress: 0 = Full Ring, 1 = Empty Ring
    const dashLength = (1 - progress) * circumference;

    // Rotate -90deg to start at top center
    const rotationAngle = -90 + (progress * 360);

    // 2. Active Tick Logic
    // We calculate how many minutes have "passed" to light up the corresponding ticks.
    // Using Math.floor prevents the TickRing from re-rendering on sub-minute updates.
    const minutesPassed = (totalTime - timeLeft) / 60;
    const activeTickIndex = Math.floor(minutesPassed);

    // Get current mode's duration in minutes for the tick count
    const totalMinutes = durations[activeMode];

    return (
        <svg viewBox="0 0 400 400" className="timer-svg">
            {/* 1. Static Background Track */}
            <circle cx="200" cy="200" r={radius} className="circle-bg" />

            {/* 2. High-Frequency Progress Ring */}
            <circle
                cx="200" cy="200" r={radius}
                className="circle-progress"
                transform={`rotate(${rotationAngle} 200 200)`}
                strokeDasharray={`${dashLength} 2000`}
                strokeDashoffset={0}
                style={{
                    stroke: `rgba(${color}, 1)`,
                    // We keep the color transition but AVOID transition on dasharray to prevent lag
                    transition: 'stroke 0.5s ease'
                }}
            />

            {/* 3. Memoized Tick Ring (Updates only once/min) */}
            <TickRing
                count={totalMinutes}
                activeIdx={activeTickIndex}
                color={color}
            />
        </svg>
    );
});

export default TimerFace;
