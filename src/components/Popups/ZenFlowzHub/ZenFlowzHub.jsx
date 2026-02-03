import { motion, AnimatePresence } from 'framer-motion';
import { VERSION_INFO } from '../../../versions/history';
import { ICONS } from '../../../design-system/icons';
import './ZenFlowzHub.css';

export default function ZenFlowzHub({ isOpen, onClose }) {
    const containerVariants = {
        hidden: {
            opacity: 0,
            scale: 0.3,
            y: 60,
            rotateX: 15,
            filter: "blur(5px)"
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 25,
                mass: 1.2,
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        },
        exit: {
            opacity: 0,
            scale: 1.1,
            y: -20,
            filter: "blur(20px)",
            transition: {
                duration: 0.5,
                ease: "easeIn"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { type: "spring", stiffness: 200, damping: 20 }
        }
    };

    const getConceptIcon = (id) => {
        if (id === 'zone') return ICONS.Pomodoro.Zone;
        if (id === 'breath') return ICONS.Pomodoro.Breath;
        if (id === 'drift') return ICONS.Pomodoro.Drift;
        return ICONS.Help.Info;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="hub-overlay"
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(25px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                >
                    <motion.div
                        className="hub-card"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* 1. Header: The Brand & Version */}
                        <motion.div className="hub-header" variants={itemVariants}>
                            <div className="hub-version-badge">
                                <span className="v-pill">{VERSION_INFO.type} {VERSION_INFO.current}</span>
                                <span className="s-pill">{VERSION_INFO.status}</span>
                            </div>
                            <h1 className="hub-title">ZenFlowz Hub</h1>
                            <p className="hub-vision">{VERSION_INFO.vision}</p>
                        </motion.div>

                        <div className="hub-content-split">
                            {/* 2. Onboarding: Concepts */}
                            <motion.div className="hub-section onboarding" variants={itemVariants}>
                                <h3 className="hub-section-label">Core Concepts</h3>
                                <div className="concept-stack">
                                    {VERSION_INFO.concepts.map(concept => {
                                        const Icon = getConceptIcon(concept.id);
                                        return (
                                            <div key={concept.id} className={`hub-concept-item ${concept.id}`}>
                                                <div className="c-icon-wrap">
                                                    <Icon size={20} weight="duotone" />
                                                </div>
                                                <div className="c-info">
                                                    <h4>{concept.label}</h4>
                                                    <p>{concept.desc}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* 3. Status: Refinements */}
                            <motion.div className="hub-section updates" variants={itemVariants}>
                                <h3 className="hub-section-label">Latest Refinements</h3>
                                <div className="update-list-wrap">
                                    <ul className="hub-update-list">
                                        {VERSION_INFO.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="hub-upcoming">
                                    <span className="upcoming-label">NEXT:</span>
                                    <span className="upcoming-text">{VERSION_INFO.upcoming[0]}</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* 4. Footer: Action */}
                        <motion.div className="hub-footer" variants={itemVariants}>
                            <motion.button
                                onClick={onClose}
                                className="hub-cta-btn"
                                whileHover={{ scale: 1.0, letterSpacing: '5px' }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Let's Flow
                                <ICONS.Pomodoro.Start size={20} weight="bold" className="cta-icon" />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
