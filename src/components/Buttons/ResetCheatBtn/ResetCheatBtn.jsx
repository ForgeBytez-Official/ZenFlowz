import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../../design-system';
import './ResetCheatBtn.css';

export default function ResetCheatBtn({ label, icon: Icon, onClick, className = '' }) {
    const { playClick } = useSound();

    const handleClick = () => {
        playClick();
        onClick();
    };

    /**
     * Animation Strategy: "Neural Cylinder Roll"
     * Enhanced with staggered vertical rotation and light-reactive variants.
     */
    const containerVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const itemVariants = {
        initial: {
            rotateX: -30,
            y: 15,
            opacity: 0,
            scale: 0.9,
            z: -50
        },
        animate: (i) => ({
            rotateX: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            z: 0,
            transition: {
                type: "spring",
                stiffness: 350,
                damping: 25,
                delay: i * 0.07
            }
        }),
        exit: (i) => ({
            rotateX: 30,
            y: -15,
            opacity: 0,
            scale: 0.9,
            z: -50,
            transition: {
                duration: 0.25,
                ease: "easeInOut",
                delay: i * 0.05
            }
        })
    };

    return (
        <motion.button
            className={`btn-rc-capsule ${className} mode-${label?.toLowerCase()}`}
            onClick={handleClick}
            layout
            initial={false}
            // Kick Animation: Precision snap
            whileTap={{
                scale: 0.92,
                transition: { type: "spring", stiffness: 800, damping: 20 }
            }}
        >
            <div className="rc-portal-nexus">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={label}
                        className="rc-content-flex"
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {/* Staggered Units for mechanical feel */}
                        <motion.div className="rc-unit-box" custom={0} variants={itemVariants}>
                            <div className="rc-icon-frame">
                                {Icon && <Icon size={24} weight="bold" />}
                            </div>
                        </motion.div>

                        <motion.div className="rc-unit-box" custom={1} variants={itemVariants}>
                            <span className="rc-label-text">{label}</span>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Kinetic Pulse Layer */}
            <div className="rc-kinetic-pulse"></div>
        </motion.button>
    );
}
