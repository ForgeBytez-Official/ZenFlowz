import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS, useSound } from '../../../design-system';
import './WipeBtn.css';

export default function WipeBtn({ onClick, className = '' }) {
    const { playClick } = useSound();
    const [isWiping, setIsWiping] = useState(false);

    const handleAction = () => {
        if (isWiping) return;

        setIsWiping(true);
        playClick();

        // Logical "Wipe" sync
        setTimeout(() => {
            onClick();
            setTimeout(() => setIsWiping(false), 600);
        }, 500);
    };

    return (
        <motion.button
            className={`btn-wipe-capsule ${className} ${isWiping ? 'wiping' : ''}`}
            onClick={handleAction}
            layout
            initial={false}
            // Kick Animation: Powerful elastic compression
            whileTap={{
                scale: 0.88,
                transition: { type: "spring", stiffness: 1000, damping: 25 }
            }}
            title="Wipe Session Progress"
        >
            <div className="wipe-inner">
                {/* 1. The Content Layer - Dissolves into the blade */}
                <motion.div
                    className="wipe-elements"
                    animate={{
                        opacity: isWiping ? 0 : 1,
                        filter: isWiping ? 'blur(12px) brightness(2)' : 'blur(0px) brightness(1)',
                        x: isWiping ? 40 : 0,
                        scale: isWiping ? 0.9 : 1
                    }}
                    transition={{
                        duration: 0.4,
                        ease: "easeOut"
                    }}
                >
                    <div className="wipe-icon-box">
                        <ICONS.Pomodoro.Quit size={24} weight="bold" />
                    </div>
                    <span className="wipe-text">Wipe</span>
                </motion.div>

                {/* 2. The Energy Slice (Holographic Blade) */}
                <motion.div
                    className="wiper-blade-hologram"
                    initial={{ left: '-20%', opacity: 0 }}
                    animate={{
                        left: isWiping ? '120%' : '-20%',
                        opacity: isWiping ? [0, 1, 1, 0] : 0,
                        scaleY: isWiping ? [1, 1.2, 1] : 1
                    }}
                    transition={{
                        duration: 0.55,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                />

                {/* 3. The Cleanse Flare */}
                <AnimatePresence>
                    {isWiping && (
                        <motion.div
                            className="wipe-cleanse-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.5, 0] }}
                            transition={{ duration: 0.5 }}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Ambient Deep Berry Core */}
            <div className="wipe-berry-heart"></div>
        </motion.button>
    );
}
