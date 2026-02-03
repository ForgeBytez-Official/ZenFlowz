import React, { memo } from 'react';
import { AnimatePresence } from 'framer-motion';
// Navigate back to src/components/Buttons
import { StartPauseResumeBtn, ResetCheatBtn, WipeBtn } from '../../../../src/components/Buttons';
// Navigate back to src/design-system
import { ICONS } from '../../../../src/design-system';

/**
 * Control Cluster
 * 
 * This component handles the primary user interactions (Start, Stop, Reset).
 * It is memoized to isolate it from the high-frequency updates of the parent timer.
 * By keeping this stable, we ensure that the tactile buttons don't flicker or re-render unnecessarily.
 */
const Controls = memo(function Controls({
    isRunning,      // Is the timer currently ticking?
    isStarted,      // Has the session begun at all? (timeLeft < total)
    isComplete,     // Is the current session finished?
    onToggle,       // Play/Pause handler
    onReset,        // Reset current session handler
    onCheat,        // Instant complete (debug/cheat) handler
    onWipe          // Full cycle reset handler
}) {
    // Determine which label state to show on the main button
    const startPauseState = (!isStarted && !isRunning) ? 'START' : (isRunning ? 'PAUSE' : 'RESUME');

    // Only show secondary actions (Reset/Cheat) if the timer has actually started or is running
    const showSecondary = isRunning || isStarted;

    return (
        <div className="controls-layout">
            <div className="action-group">
                <AnimatePresence mode="popLayout" initial={false}>
                    {/* Primary Interaction Button */}
                    <StartPauseResumeBtn
                        key="main"
                        state={startPauseState}
                        onClick={onToggle}
                    />

                    {/* Secondary Actions (Context Aware) */}
                    {showSecondary && (
                        <ResetCheatBtn
                            key="secondary"
                            label={isRunning ? 'Cheat' : 'Reset'}
                            icon={isRunning ? ICONS.Pomodoro.Drift : ICONS.Pomodoro.Reset}
                            onClick={isRunning ? onCheat : onReset}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* "Nuke it" Button - Always available to clear state */}
            <div className="wipe-btn-wrapper">
                <WipeBtn onClick={onWipe} />
            </div>
        </div>
    );
});

export default Controls;
