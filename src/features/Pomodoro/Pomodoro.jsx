import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useSound, THEME, UI_CONSTANTS, POMODORO_MODES, CYCLE_LOGIC } from '../../design-system';
import { useSettings } from '../../context/SettingsContext';
import { useTimer } from '../../hooks/useTimer';
import CycleProgress from './CycleProgress/CycleProgress';
import TimerFace from './components/TimerFace';
import Controls from './components/Controls';
import './Pomodoro.css';

/**
 * ZenFlowz Pomodoro Engine
 * 
 * This is the brain of the application. It orchestrates the timer logic, 
 * manages the session state (Work/Break/Drift), and handles global notifications.
 * 
 * Architecture:
 * - Logic is centralized here.
 * - Visuals are delegated to memoized sub-components (<TimerFace>, <Controls>, <CycleProgress>).
 * - This limits full re-renders to only state changes that actually matter.
 */
export default function Pomodoro({ isSidebarOpen }) {
    // 1. Core Hooks & Settings
    const { durations, cycleSettings, notifications } = useSettings();
    const { playSlide, playStart, playFinish } = useSound();

    // 2. Session State
    const [activeMode, setActiveMode] = useState('ZONE'); // 'ZONE', 'BREATH', 'DRIFT'
    const [isRunning, setIsRunning] = useState(false);

    // 3. Stats & Progression (Initialized from LocalStorage if available)
    const [completedZones, setCompletedZones] = useState(() => {
        const saved = localStorage.getItem('zenflowz_zones');
        return saved ? parseInt(saved) : 0;
    });
    const [completedDrifts, setCompletedDrifts] = useState(() => {
        const saved = localStorage.getItem('zenflowz_drifts');
        return saved ? parseInt(saved) : 0;
    });
    const [zoneQualities, setZoneQualities] = useState(() => {
        const saved = localStorage.getItem('zenflowz_zoneQualities');
        return saved ? JSON.parse(saved) : [];
    });
    const [driftQualities, setDriftQualities] = useState(() => {
        const saved = localStorage.getItem('zenflowz_driftQualities');
        return saved ? JSON.parse(saved) : [];
    });
    const [isFinalStretch, setIsFinalStretch] = useState(false);

    // 4. Toast Notification State
    const [showToast, setShowToast] = useState(null);

    // 5. Persistence Engine
    useEffect(() => {
        localStorage.setItem('zenflowz_zones', completedZones);
        localStorage.setItem('zenflowz_drifts', completedDrifts);
        localStorage.setItem('zenflowz_zoneQualities', JSON.stringify(zoneQualities));
        localStorage.setItem('zenflowz_driftQualities', JSON.stringify(driftQualities));
    }, [completedZones, completedDrifts, zoneQualities, driftQualities]);

    // 6. Cross-Tab Communication (Keeps multiple windows synced)
    useEffect(() => {
        if (typeof BroadcastChannel === 'undefined') return;

        const channel = new BroadcastChannel('zenflowz_notifications');
        channel.onmessage = (event) => {
            if (event.data.type === 'SHOW_TOAST') {
                setShowToast(event.data.payload);
                setTimeout(() => setShowToast(null), 3000);
            }
        };
        return () => channel.close();
    }, []);

    // 6. Timer Initialization
    const totalTime = durations[activeMode] * 60;
    const onCompleteRef = useRef(null);

    // Proxy callback to solve circular dependency with useTimer hook
    const onCompleteProxy = useCallback((quality) => {
        if (onCompleteRef.current) onCompleteRef.current(quality);
    }, []);

    const { timeLeft, progress, setTimeLeft, setProgress, resetTimer } = useTimer(
        totalTime,
        isRunning,
        onCompleteProxy
    );

    /**
     * Celebration Logic
     * Triggered when a massive milestone is reached. Uses canvas-confetti.
     */
    const triggerCelebration = useCallback(() => {
        const duration = UI_CONSTANTS.CONFETTI_DURATION;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
        const colors = [THEME.colors.primary, THEME.colors.accent, THEME.colors.drift].map(c => `rgb(${c})`);
        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeRemaining = animationEnd - Date.now();
            if (timeRemaining <= 0) return clearInterval(interval);

            // Throttle particles based on time remaining
            const particleCount = 50 * (timeRemaining / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors });
        }, 250);

        // Reset Engine after celebration
        setTimeout(() => {
            setCompletedZones(0);
            setCompletedDrifts(0);
            setZoneQualities([]);
            setDriftQualities([]);
            setIsFinalStretch(false);
            setActiveMode('ZONE');
            setTimeLeft(durations.ZONE * 60);
            setProgress(0);
            setIsRunning(false);
        }, CYCLE_LOGIC.FINISHED_RESET_DELAY);
    }, [durations.ZONE, setTimeLeft, setProgress]);

    /**
     * Session Completion Handler
     * Determines where to go next based on current mode and stats.
     */
    const handleSessionComplete = useCallback((quality = 1) => {
        setIsRunning(false);
        playFinish();

        // A. Desktop Notification (System-Level)
        if (notifications.system) {
            const title = activeMode === 'ZONE' ? "Focus Complete!" : "Break Over!";
            const body = activeMode === 'ZONE' ? "Time to recharge." : "Ready to flow?";

            const triggerSystemNotify = () => {
                try {
                    new Notification(title, {
                        body,
                        icon: '/favicon.ico',
                        tag: 'zenflowz-alert', // Replaces previous notification
                        requireInteraction: true,
                        silent: false,
                        vibrate: [200, 100, 200]
                    });
                } catch (e) {
                    console.error("System notification failed", e);
                }
            };

            if (Notification.permission === 'granted') {
                triggerSystemNotify();
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') triggerSystemNotify();
                });
            }
        }

        // B. In-App Toast (Web-Based)
        // Uses BroadcastChannel to propagate to all open tabs of ZenFlowz.
        if (notifications.browser) {
            const toastPayload = {
                message: activeMode === 'ZONE' ? "Zone Complete! Take a breath." : "Break finished. Let's flow.",
                type: 'success'
            };

            // Show locally first
            setShowToast(toastPayload);
            setTimeout(() => setShowToast(null), 3000);

            // Broadcast to other tabs if supported
            if (typeof BroadcastChannel !== 'undefined') {
                const channel = new BroadcastChannel('zenflowz_notifications');
                channel.postMessage({ type: 'SHOW_TOAST', payload: toastPayload });
                setTimeout(() => channel.close(), 100);
            }
        }

        // C. Victory Check
        if (isFinalStretch) {
            triggerCelebration();
            return;
        }

        // D. Cycle Logic (The Brain)
        let nextMode = activeMode;
        if (activeMode === 'ZONE') {
            const newCount = completedZones + 1;
            setCompletedZones(newCount);
            setZoneQualities(prev => [...prev, quality]);

            // Earned a Long Break (Drift)?
            nextMode = newCount >= cycleSettings.zonesUntilDrift ? 'DRIFT' : 'BREATH';
        }
        else if (activeMode === 'BREATH') {
            nextMode = 'ZONE';
        }
        else if (activeMode === 'DRIFT') {
            const newCount = completedDrifts + 1;
            setCompletedDrifts(newCount);
            setDriftQualities(prev => [...prev, quality]);
            setCompletedZones(0); // Reset short-term zones
            setZoneQualities([]);

            // Cycle Complete?
            if (newCount >= cycleSettings.driftsUntilFinish) {
                setIsFinalStretch(true);
                nextMode = 'ZONE'; // Queue final victory lap
            } else {
                nextMode = 'ZONE';
            }
        }

        setActiveMode(nextMode);

        // Auto-Start Check
        setTimeout(() => {
            setIsRunning(true);
            playStart();
        }, CYCLE_LOGIC.AUTO_START_DELAY);

    }, [activeMode, completedZones, completedDrifts, cycleSettings, playFinish, playStart, isFinalStretch, triggerCelebration, notifications]);

    // Update callback ref ensuring latest state access
    useEffect(() => {
        onCompleteRef.current = handleSessionComplete;
    }, [handleSessionComplete]);

    // Timer Reset on Duration Change
    useEffect(() => {
        const newTime = durations[activeMode] * 60;
        resetTimer(newTime);
    }, [activeMode, durations, resetTimer]);

    // Mode Switcher
    const switchMode = useCallback((modeKey) => {
        playSlide();
        setActiveMode(modeKey);
        setIsRunning(false);
        setTimeLeft(durations[modeKey] * 60);
        setProgress(0);
        setIsFinalStretch(false);
    }, [playSlide, durations, setTimeLeft, setProgress]);

    // Cheat Mode (For testing or "I'm done early")
    const handleCheat = useCallback(() => {
        playSlide();
        const quality = progress; // Use progress as effort proxy
        setTimeLeft(0);
        setProgress(1);
        handleSessionComplete(quality);
    }, [playSlide, handleSessionComplete, setTimeLeft, setProgress, progress]);

    // Hard Reset (Wipe Stats)
    const handleQuit = useCallback(() => {
        playSlide();
        setTimeLeft(durations[activeMode] * 60);
        setProgress(0);
        setCompletedZones(0);
        setCompletedDrifts(0);
        setZoneQualities([]);
        setDriftQualities([]);
        setIsFinalStretch(false);
        setIsRunning(false);
    }, [playSlide, durations, activeMode, setTimeLeft, setProgress]);

    // Soft Reset (Restart Timer)
    const handleReset = useCallback(() => {
        playSlide();
        setTimeLeft(durations[activeMode] * 60);
        setProgress(0);
        setIsRunning(false);
    }, [playSlide, durations, activeMode, setTimeLeft, setProgress]);

    // Global Keybindings
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isSidebarOpen || ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

            const actions = {
                'Space': () => { e.preventDefault(); setIsRunning(p => !p); playSlide(); },
                'KeyR': () => handleReset(),
                'KeyZ': () => switchMode('ZONE'),
                'KeyB': () => switchMode('BREATH'),
                'KeyD': () => switchMode('DRIFT'),
                'KeyC': () => handleCheat(),
                'KeyQ': () => handleQuit()
            };

            if (actions[e.code]) actions[e.code]();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSidebarOpen, handleReset, switchMode, handleCheat, handleQuit, playSlide]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // 7. Dynamic Browser Title
    useEffect(() => {
        if (!isRunning && timeLeft === durations[activeMode] * 60) {
            document.title = "ZenFlowz | Calm Focus";
            return;
        }

        const label = activeMode.charAt(0) + activeMode.slice(1).toLowerCase();
        document.title = `${formatTime(timeLeft)} | ${label}`;

        // Cleanup on unmount
        return () => { document.title = "ZenFlowz"; };
    }, [timeLeft, activeMode, isRunning, durations]);

    return (
        <div className="pomodoro-container">
            {/* 1. Mode Switcher (Top Pills) */}
            <div className="mode-selector-wrapper">
                <div className="mode-selector">
                    {Object.keys(POMODORO_MODES).map(key => {
                        const mode = POMODORO_MODES[key];
                        const Icon = mode.icon;
                        const isActive = activeMode === key;
                        return (
                            <button key={key} className={`btn-mode ${isActive ? 'active' : ''}`} onClick={() => switchMode(key)}>
                                {isActive && (
                                    <motion.div layoutId="active-pill" className="active-pill-bg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                                )}
                                <span className="mode-content">
                                    <Icon size={18} weight="bold" />
                                    {mode.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 2. Main Clock (Isolated for Performance) */}
            <div className="timer-circle-wrapper">
                <TimerFace
                    progress={progress}
                    timeLeft={timeLeft}
                    totalTime={totalTime}
                    activeMode={activeMode}
                    color={POMODORO_MODES[activeMode].color}
                    durations={durations}
                />

                {/* Digital Overlay */}
                <div className="digital-display">
                    <div className="time-digits">{formatTime(timeLeft)}</div>
                    <AnimatePresence>
                        {isFinalStretch && (
                            <motion.div
                                className="final-stretch-label"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                {THEME.messages.finalStretch[completedDrifts % THEME.messages.finalStretch.length]}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* 3. Progress Visualization (Crystals) */}
            <CycleProgress
                completedZones={completedZones}
                completedDrifts={completedDrifts}
                zoneQualities={zoneQualities}
                driftQualities={driftQualities}
                cycleSettings={cycleSettings}
                modesConfig={POMODORO_MODES}
            />

            {/* 4. Interactive Controls (Buttons) */}
            <Controls
                isRunning={isRunning}
                isStarted={timeLeft < totalTime}
                isComplete={timeLeft === 0}
                onToggle={() => setIsRunning(!isRunning)}
                onReset={handleReset}
                onCheat={handleCheat}
                onWipe={handleQuit}
            />

            {/* 5. Feedback Toasts */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        className="toast-notification"
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 50, x: '-50%' }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <span className="toast-icon">✨</span>
                        {showToast.message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
