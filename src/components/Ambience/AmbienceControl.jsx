import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PiCloudRain, PiTrain, PiBooks, PiTree, PiWaves, PiMusicNotes } from 'react-icons/pi';
import { useSound } from '../../design-system';
import './AmbienceControl.css';

/**
 * Ambience Sounds Configuration
 */
const AMBIENCE_OPTIONS = [
    { id: 'rain', label: 'Rain', icon: PiCloudRain, color: '#6ab0ff', file: '/sounds/ambience/rain.mp3' },
    { id: 'train', label: 'Train', icon: PiTrain, color: '#ffbd69', file: '/sounds/ambience/train.mp3' },
    { id: 'library', label: 'Library', icon: PiBooks, color: '#d4a5a5', file: '/sounds/ambience/library.mp3' },
    { id: 'forest', label: 'Forest', icon: PiTree, color: '#95d1cc', file: '/sounds/ambience/forest.mp3' },
    { id: 'ocean', label: 'Ocean Shore', icon: PiWaves, color: '#7fdbff', file: '/sounds/ambience/ocean-shore.mp3' }
];

/**
 * AmbienceControl Component
 * Provides a selection of background sounds to help with focus.
 * Includes persistence logic to remember your favorite sound across refreshes.
 */
export default function AmbienceControl() {
    const [isOpen, setIsOpen] = useState(false);

    // Initialize from LocalStorage
    const [activeAmbience, setActiveAmbience] = useState(() => {
        return localStorage.getItem('zenflowz_ambience') || null;
    });

    const { playClick } = useSound();
    const audioRef = useRef(null);
    const menuRef = useRef(null);

    // Initial mount: If there was a saved sound, start it (requires user interaction usually, 
    // but browsers might block. We'll attempt it or wait for a click).
    useEffect(() => {
        if (activeAmbience) {
            const option = AMBIENCE_OPTIONS.find(opt => opt.id === activeAmbience);
            if (option) {
                audioRef.current = new Audio(option.file);
                audioRef.current.loop = true;
                audioRef.current.volume = 0.5;
                // Note: Auto-play is often blocked until user clicks something on the page.
                audioRef.current.play().catch(() => {
                    console.log("Ambience auto-play deferred until user interaction.");
                });
            }
        }
        return () => {
            if (audioRef.current) audioRef.current.pause();
        };
    }, []);

    // Persist changes
    useEffect(() => {
        if (activeAmbience) {
            localStorage.setItem('zenflowz_ambience', activeAmbience);
        } else {
            localStorage.removeItem('zenflowz_ambience');
        }
    }, [activeAmbience]);

    // Handle clicks outside to close menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    /**
     * Toggles a specific sound on or off.
     */
    const toggleAmbience = (id) => {
        playClick();

        if (activeAmbience === id) {
            // Stopping
            setActiveAmbience(null);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        } else {
            // Switching or Starting
            setActiveAmbience(id);
            const option = AMBIENCE_OPTIONS.find(opt => opt.id === id);

            if (audioRef.current) {
                audioRef.current.pause();
            }

            audioRef.current = new Audio(option.file);
            audioRef.current.loop = true;
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
    };

    return (
        <div className="ambience-control-wrapper" ref={menuRef}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="ambience-menu"
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    >
                        <div className="ambience-grid">
                            {AMBIENCE_OPTIONS.map((opt) => (
                                <button
                                    key={opt.id}
                                    className={`ambience-option ${activeAmbience === opt.id ? 'active' : ''}`}
                                    onClick={() => toggleAmbience(opt.id)}
                                >
                                    <div className="ambience-option-content">
                                        <div className="ambience-icon-box">
                                            <opt.icon size={28} />
                                        </div>
                                        <span className="ambience-label">{opt.label}</span>
                                    </div>

                                    {activeAmbience === opt.id && (
                                        <motion.div
                                            className="active-indicator-bar"
                                            layoutId="ambience-bar"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className={`btn-ambience-toggle ${activeAmbience ? 'playing' : ''}`}
                onClick={() => {
                    playClick();
                    setIsOpen(!isOpen);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Ambience Sounds"
            >
                <div className="ambience-toggle-icon-wrap">
                    <PiMusicNotes size={26} weight="bold" />
                </div>
                {activeAmbience && <div className="ambience-pulse-ring" />}
            </motion.button>
        </div>
    );
}
