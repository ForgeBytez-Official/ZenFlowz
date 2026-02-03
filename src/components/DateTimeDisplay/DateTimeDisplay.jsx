import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import './DateTimeDisplay.css';

/**
 * High-precision clock component with expanded diagnostic metadata.
 * Features a cinematic "pop-layout" reveal for the date and UTC offset.
 */
export default function DateTimeDisplay() {
    const [date, setDate] = useState(new Date());
    const [showDetails, setShowDetails] = useState(false);

    // Heartbeat: aligned to 1000ms. 
    // Optimization: Could use requestAnimationFrame for sub-second precision but 1s is sufficient.
    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const dateObj = new Date(date);
    let h = dateObj.getHours();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    const hours = h.toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const seconds = dateObj.getSeconds().toString().padStart(2, '0');

    const dayShort = dateObj.toLocaleDateString([], { weekday: 'short' }).toUpperCase();
    const dateShort = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' }).toUpperCase();

    // UTC Calculation
    const offset = -dateObj.getTimezoneOffset() / 60;
    const offsetStr = `UTC${offset >= 0 ? '+' : ''}${offset}`;

    return (
        <LayoutGroup>
            <motion.div
                layout
                className={`datetime-wrapper ${showDetails ? 'expanded' : 'compact'}`}
                onClick={() => setShowDetails(!showDetails)}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
            >
                {/* Metadata Layer: Revealed on interaction */}
                <AnimatePresence mode="popLayout">
                    {showDetails && (
                        <motion.div
                            layout
                            className="meta-info"
                            initial={{ opacity: 0, y: -15, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -15, filter: 'blur(10px)' }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="meta-day">{dayShort}</span>
                            <span className="meta-date">{dateShort}</span>
                            <span className="meta-utc">{offsetStr}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Time Display */}
                <motion.div layout className="time-row">
                    <motion.div layout className="time-main-display">
                        {hours}<span className="time-sep">:</span>{minutes}
                    </motion.div>

                    {/* Seconds & AM/PM: Only visible in expanded mode */}
                    <AnimatePresence mode="popLayout">
                        {showDetails && (
                            <motion.div
                                layout
                                initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                                transition={{ duration: 0.4 }}
                                className="time-side-stack"
                            >
                                <span className="side-seconds">{seconds}</span>
                                <span className="side-ampm">{ampm}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </LayoutGroup>
    );
}
