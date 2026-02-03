import { motion, AnimatePresence } from 'framer-motion';
import { ICONS, useSound } from '../../../design-system';
import './StartPauseResumeBtn.css';

export default function StartPauseResumeBtn({ state, onClick, className = '' }) {
    const { playClick } = useSound();

    const handleClick = () => {
        playClick();
        onClick();
    };

    const getIcon = () => {
        if (state === 'PAUSE') return ICONS.Pomodoro.Pause;
        return ICONS.Pomodoro.Start;
    };

    const getLabel = () => {
        if (state === 'PAUSE') return 'Pause';
        if (state === 'RESUME') return 'Resume';
        return 'Start Flow';
    };

    const Icon = getIcon();
    const label = getLabel();

    // Directional Motion Variants
    // Icon: Slide Left (Horizontal)
    const iconVariants = {
        exit: { x: -60, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
        initial: { x: -60, opacity: 0 },
        animate: { x: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } }
    };

    // Label: Slide Up/Down (Vertical)
    const labelVariants = {
        exit: { y: 25, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
        initial: { y: -25, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } }
    };

    return (
        <motion.button
            className={`btn-sp-capsule state-${state?.toLowerCase()} ${className}`}
            onClick={handleClick}
            layout
            initial={false}
            // Kick Animation: Powerful scale down on tap
            whileTap={{
                scale: 0.9,
                transition: { type: "spring", stiffness: 600, damping: 20 }
            }}
        >
            <div className="btn-sp-layout">
                {/* Icon Portal - Edge to Edge Horizontal slide */}
                <div className="portal icon-portal">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={state + '-icon'}
                            variants={iconVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="portal-cell"
                        >
                            <Icon size={28} weight="bold" />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Label Portal - Edge to Edge Vertical slide */}
                <div className="portal label-portal">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={state + '-label'}
                            variants={labelVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="portal-cell text-unit"
                        >
                            {label}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Ambient Kinetic Layer (Always active, no hover required) */}
            <div className="sp-kinetic-flare"></div>
        </motion.button>
    );
}
