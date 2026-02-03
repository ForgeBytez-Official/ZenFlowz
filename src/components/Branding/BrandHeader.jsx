import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import './BrandHeader.css';

export default function BrandHeader() {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <LayoutGroup>
            <motion.div
                layout
                className={`brand-header ${showDetails ? 'show-details' : 'hide-details'}`}
                onClick={() => setShowDetails(!showDetails)}
            >
                <motion.div layout className="brand-signature">
                    <motion.div layout className="brand-identity-stack">
                        <motion.span layout className="sig-main">ZenFlowz</motion.span>
                        <motion.div
                            layout
                            className="brand-underline"
                            animate={{
                                width: showDetails ? '100%' : '25px',
                                opacity: showDetails ? 1 : 0.7
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        />
                    </motion.div>

                    <AnimatePresence mode="popLayout">
                        {showDetails && (
                            <motion.div
                                layout
                                initial={{ opacity: 0, x: -20, filter: 'blur(3px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, x: -20, y: -10, filter: 'blur(3px)' }}
                                transition={{ duration: 0.5, easein: [0.15, 1, 0.3, 1] }}
                                className="sig-details-wrapper"
                            >
                                <span className="sig-divider">By</span>
                                <span className="sig-sub">ForgeBytez</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </LayoutGroup>
    );
}
