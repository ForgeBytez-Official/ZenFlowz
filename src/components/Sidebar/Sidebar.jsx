import { motion, AnimatePresence } from 'framer-motion';
import { PiX } from 'react-icons/pi';
import './Sidebar.css';

// Side navigation for settings and configurations.
export default function Sidebar({
    isOpen,
    onClose,
    children,
    title = "Settings",
    secondaryContent = null,
    isSecondaryOpen = false,
    onSecondaryClose = null
}) {

    // Touch gesture logic for mobile swipe-to-close
    const handleDragEnd = (_, info) => {
        // If dragged more than 50px to the right, close it
        if (info.offset.x > 50) {
            if (isSecondaryOpen && onSecondaryClose) {
                onSecondaryClose();
            } else {
                onClose();
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Dark background overlay to focus on the sidebar. */}
                    <motion.div
                        className="sidebar-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    >
                        <div className="sidebar-container">

                            {/* Secondary Expansion Layer (Shortcuts etc) */}
                            <AnimatePresence>
                                {isSecondaryOpen && secondaryContent && (
                                    <motion.div
                                        className="sidebar-panel secondary-panel"
                                        initial={{ x: "100%", opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: "100%", opacity: 0 }}
                                        transition={{
                                            type: "spring",
                                            damping: 35,
                                            stiffness: 300,
                                            mass: 1
                                        }}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        onDragEnd={handleDragEnd}
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <div className="sidebar-content">
                                            {secondaryContent}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Slide-in container for main sidebar content. */}
                            <motion.div
                                className="sidebar-panel main-panel"
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                                drag="x" // Allow horizontal drag
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={{ left: 0.05, right: 0.8 }}
                                onDragEnd={handleDragEnd}
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="sidebar-header">
                                    {/* Hidden via CSS but kept for structure if needed later */}
                                </div>

                                <div className="sidebar-content">
                                    {children}
                                </div>

                                <div className="sidebar-footer">
                                    <h2 className="sidebar-title">{title}</h2>
                                    {/* Close action handled by the floating button which stays on top */}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
