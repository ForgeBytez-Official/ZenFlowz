import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { VERSION_INFO } from '../../versions/versions';

// Modular Sections
import Briefing from './Briefing/Briefing';
import Overview from './Overview/Overview';
import PatchNotes from './PatchNotes/PatchNotes';
import VersionTag from '../VersionTag/VersionTag';

import './ZenFlowzHub.css';

// ZenFlowz Hub - Main container and navigation orchestrator
export default function ZenFlowzHub({ isOpen, onClose, onHighlight }) {
    const [activeTab, setActiveTab] = useState('briefing');
    const [ovHighId, setOvHighId] = useState(null);
    const [targetPatch, setTargetPatch] = useState(null);

    // Navigation logic: Tab + Target ID
    const handleTabNavigate = (tabId, targetId = null) => {
        setOvHighId(null);
        setTargetPatch(null);
        setActiveTab(tabId);

        if (tabId === 'overview' && targetId) {
            setTimeout(() => setOvHighId(targetId), 150);
            setTimeout(() => setOvHighId(null), 6000);
        }

        if (tabId === 'patchNotes' && targetId) {
            setTimeout(() => setTargetPatch(targetId), 150);
        }
    };

    const hubVariants = {
        hidden: { opacity: 0, scale: 0.98, y: 30, filter: 'blur(10px)' },
        visible: {
            opacity: 1, scale: 1, y: 0, filter: 'blur(0px)',
            transition: { 
                type: "spring", 
                stiffness: 280, 
                damping: 32,
                mass: 0.8,
                opacity: { duration: 0.6 }
            }
        },
        exit: {
            opacity: 0, scale: 1.02, y: -20, filter: 'blur(15px)',
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const TABS = [
        { id: 'briefing', label: 'Briefing', color: 'var(--color-accent-1-hex)' },
        { id: 'overview', label: 'Overview', color: 'var(--color-accent-2-hex)' },
        { id: 'patchNotes', label: 'Patches', color: 'var(--color-accent-3-hex)' }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={`hub-overlay-v13 section-${activeTab}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.target.className.includes('hub-overlay-v13') && onClose()}
                >
                    <motion.div
                        className="hub-card-v13"
                        variants={hubVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top navigation bar */}
                        <header className="hub-header-v13">
                            <div className="hub-header-left-v13">
                                <span className="hub-brand-type-v13">ZenFlowz Hub</span>
                            </div>

                            <nav className="hub-nav-v13">
                                <LayoutGroup id="nav-v13">
                                    {TABS.map((tab) => (
                                        <button
                                            key={tab.id}
                                            className={`hub-tab-v13 ${activeTab === tab.id ? 'is-active' : ''}`}
                                            onClick={() => handleTabNavigate(tab.id)}
                                            style={{ '--tab-acc': tab.color }}
                                        >
                                            {activeTab === tab.id && (
                                                <motion.div
                                                    layoutId="h-pill-v13"
                                                    className="hub-pill-v13"
                                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                                />
                                            )}
                                            <span className="hub-label-v13">{tab.label}</span>
                                        </button>
                                    ))}
                                </LayoutGroup>
                            </nav>
                        </header>

                        {/* Main active tab area */}
                        <main className="hub-stage-v13">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    className="hub-stage-wrapper-v13"
                                    initial={{ opacity: 0, scale: 0.99, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 1.01, filter: 'blur(10px)' }}
                                    transition={{ 
                                        duration: 0.45, 
                                        ease: [0.16, 1, 0.3, 1],
                                        opacity: { duration: 0.3 }
                                    }}
                                >
                                    {activeTab === 'briefing' && (
                                        <Briefing key="br-stage" onNavigate={handleTabNavigate} onHighlight={onHighlight} onClose={onClose} />
                                    )}
                                    {activeTab === 'overview' && (
                                        <Overview key="ov-stage" highlightId={ovHighId} onNavigate={handleTabNavigate} />
                                    )}
                                    {activeTab === 'patchNotes' && (
                                        <PatchNotes key="pn-stage" onNavigate={handleTabNavigate} targetPatch={targetPatch} />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </main>

                        {/* Footer with current version info */}
                        <footer className="hub-footer-v13">
                            <div className="hub-footer-info-v13">
                                <p>Navigating to <strong>v{VERSION_INFO.current} {VERSION_INFO.status}</strong> details the system progression.</p>
                            </div>

                            <div className="hub-footer-actions-v13">
                                <motion.button
                                    className="hub-close-v13"
                                    onClick={onClose}
                                    whileHover={{ y: -3, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span>INITIALIZE VOID SESSION</span>
                                    <div className="hub-close-glow-v13" />
                                </motion.button>
                            </div>
                        </footer>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
